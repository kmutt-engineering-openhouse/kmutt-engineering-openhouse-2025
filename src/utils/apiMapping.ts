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
    .filter(term => !['the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by'].includes(term)); // Remove common words
}

/**
 * Calculate similarity score between two title arrays
 */
function calculateSimilarity(terms1: string[], terms2: string[]): number {
  if (terms1.length === 0 || terms2.length === 0) return 0;
  
  const matches = terms1.filter(term1 => 
    terms2.some(term2 => 
      term1.includes(term2) || term2.includes(term1) || 
      term1 === term2
    )
  );
  
  return matches.length / Math.max(terms1.length, terms2.length);
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
    
    // If similarity is high enough, consider it a match
    return similarity >= 0.3; // 30% similarity threshold
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