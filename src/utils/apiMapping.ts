import type { ActivityData, WorkshopWithAPIData } from '../types/card';

/**
 * Extract key terms from a title for better matching
 */
function extractKeyTerms(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/^(workshop|เวิร์คช็อป|workshop\s*\d*:?\s*)/i, '') // Remove workshop prefix
    .replace(/[^\w\s\u0E00-\u0E7F]/g, ' ') // Keep only letters, numbers, spaces, and Thai chars
    .split(/\s+/)
    .filter(term => term.length > 2) // Filter out short terms
    .filter(term => !['the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'lab', 'workshop'].includes(term)); // Remove common words
}

/**
 * Calculate similarity score between two title arrays
 * Prioritizes consecutive word matches and exact matches
 */
function calculateSimilarity(terms1: string[], terms2: string[]): number {
  if (terms1.length === 0 || terms2.length === 0) return 0;
  
  // Check for consecutive word sequences (higher weight)
  let consecutiveMatches = 0;
  for (let i = 0; i <= terms1.length - 2; i++) {
    for (let j = 0; j <= terms2.length - 2; j++) {
      if (terms1[i] === terms2[j] && terms1[i + 1] === terms2[j + 1]) {
        consecutiveMatches += 2; // Weight consecutive matches higher
      }
    }
  }
  
  // Check for individual word matches
  const individualMatches = terms1.filter(term1 => 
    terms2.some(term2 => 
      term1 === term2 || // Exact match (highest priority)
      (term1.length > 3 && term2.length > 3 && // Only for longer words
       (term1.includes(term2) || term2.includes(term1)))
    )
  );
  
  // Special case: if shorter array is completely contained in longer array
  const shorterArray = terms1.length <= terms2.length ? terms1 : terms2;
  const longerArray = terms1.length > terms2.length ? terms1 : terms2;
  
  if (shorterArray.length > 0 && longerArray.length > shorterArray.length) {
    const allShorterTermsMatch = shorterArray.every(shortTerm => 
      longerArray.some(longTerm => shortTerm === longTerm)
    );
    
    if (allShorterTermsMatch) {
      // If all terms from shorter array match, give high score
      return 0.9; // 90% similarity for complete containment
    }
  }
  
  // Calculate weighted score
  const totalPossibleMatches = Math.max(terms1.length, terms2.length);
  const weightedScore = (consecutiveMatches + individualMatches.length) / totalPossibleMatches;
  
  return weightedScore;
}

/**
 * Map API activities to workshop content by matching titles
 * This function attempts to match workshop titles with API activity titles
 */
export function mapAPIDataToWorkshop(
  workshopData: any, // Original workshop content
  apiActivities: ActivityData[]
): WorkshopWithAPIData {
  const workshopTitle = workshopData.title;
  const workshopTerms = extractKeyTerms(workshopTitle);
  
  // Find matching activities from API
  const matchingActivities = apiActivities.filter(activity => {
    const apiTitle = activity.title.trim();
    const apiTerms = extractKeyTerms(apiTitle);
    
    // Calculate similarity score
    const similarity = calculateSimilarity(workshopTerms, apiTerms);
    
    // Debug logging for specific workshops
    if ((workshopTitle.toLowerCase().includes('motor') || 
         workshopTitle.toLowerCase().includes('sensors')) && similarity > 0.1) {
      console.log(`🔍 Debug: "${workshopTitle}" vs "${apiTitle}"`);
      console.log(`   Workshop terms: [${workshopTerms.join(', ')}]`);
      console.log(`   API terms: [${apiTerms.join(', ')}]`);
      console.log(`   Similarity: ${(similarity * 100).toFixed(1)}%`);
    }
    
    // If similarity is high enough, consider it a match
    // Higher threshold to avoid false positives
    return similarity >= 0.6; // 60% similarity threshold
  });
  
  if (matchingActivities.length === 0) {
    return {
      ...workshopData,
      apiData: undefined
    };
  }
  
  // Process time slots
  const timeSlots = matchingActivities.map(activity => {
    const maxParticipants = activity.max_participants === "unlimited" ? "unlimited" : activity.max_participants;
    const currentParticipants = activity.current_register_participants;
    const isFull = maxParticipants !== "unlimited" && currentParticipants >= maxParticipants;
    const availableSlots = maxParticipants === "unlimited" ? "unlimited" : Math.max(0, maxParticipants - currentParticipants);
    
    return {
      date: activity.date,
      start_time: activity.start_time,
      end_time: activity.end_time,
      location: activity.location,
      max_participants: maxParticipants,
      current_register_participants: currentParticipants,
      isFull,
      availableSlots
    };
  });
  
  // Calculate totals
  const totalParticipants = matchingActivities.reduce((sum, activity) => 
    sum + activity.current_register_participants, 0
  );
  
  let totalMaxParticipants: number | "unlimited" = 0;
  let hasUnlimited = false;
  
  for (const activity of matchingActivities) {
    if (activity.max_participants === "unlimited") {
      hasUnlimited = true;
      break;
    } else {
      totalMaxParticipants = (totalMaxParticipants as number) + activity.max_participants;
    }
  }
  
  if (hasUnlimited) {
    totalMaxParticipants = "unlimited";
  }
  
  const isFullyBooked = totalMaxParticipants !== "unlimited" && 
    matchingActivities.every(activity => 
      activity.max_participants !== "unlimited" && 
      activity.current_register_participants >= activity.max_participants
    );
  
  const department = matchingActivities[0]?.department?.name_th || matchingActivities[0]?.department?.name_en || '';
  
  return {
    ...workshopData,
    apiData: {
      timeSlots,
      totalParticipants,
      totalMaxParticipants,
      isFullyBooked,
      department
    }
  };
}

/**
 * Fetch activities from API
 */
export async function fetchActivities(): Promise<ActivityData[]> {
  try {
    const response = await fetch('https://openhouse.kmutt.ac.th/api/v1/external/getActivities?page=1&limit=400');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.activities || [];
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

/**
 * Get workshop mapping suggestions for debugging
 */
export function getWorkshopMappingSuggestions(
  workshopTitle: string,
  apiActivities: ActivityData[]
): Array<{ activity: ActivityData; similarity: number; reason: string }> {
  const suggestions: Array<{ activity: ActivityData; similarity: number; reason: string }> = [];
  const workshopTerms = extractKeyTerms(workshopTitle);
  
  apiActivities.forEach(activity => {
    const apiTitle = activity.title.trim();
    const apiTerms = extractKeyTerms(apiTitle);
    const similarity = calculateSimilarity(workshopTerms, apiTerms);
    
    if (similarity > 0.1) { // Only include suggestions with >10% similarity
      suggestions.push({ 
        activity, 
        similarity, 
        reason: `Similarity: ${(similarity * 100).toFixed(1)}%` 
      });
    }
  });
  
  return suggestions.sort((a, b) => b.similarity - a.similarity);
}