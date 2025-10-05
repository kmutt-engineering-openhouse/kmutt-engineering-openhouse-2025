import type { ActivityData, WorkshopWithAPIData } from '../types/card';

/**
 * Map API activities to workshop content by matching titles
 * This function attempts to match workshop titles with API activity titles
 */
export function mapAPIDataToWorkshop(
  workshopData: any, // Original workshop content
  apiActivities: ActivityData[]
): WorkshopWithAPIData {
  const workshopTitle = workshopData.title;
  
  // Find matching activities from API
  const matchingActivities = apiActivities.filter(activity => {
    // Try different matching strategies
    const apiTitle = activity.title.trim();
    const workshopTitleLower = workshopTitle.toLowerCase();
    const apiTitleLower = apiTitle.toLowerCase();
    
    // Strategy 1: Exact match (case insensitive)
    if (apiTitleLower === workshopTitleLower) {
      return true;
    }
    
    // Strategy 2: Check if workshop title is contained in API title
    if (apiTitleLower.includes(workshopTitleLower)) {
      return true;
    }
    
    // Strategy 3: Check if API title is contained in workshop title
    if (workshopTitleLower.includes(apiTitleLower)) {
      return true;
    }
    
    // Strategy 4: Remove common prefixes/suffixes and match
    const cleanWorkshopTitle = workshopTitleLower
      .replace(/^(workshop|เวิร์คช็อป|workshop\s*\d*:?\s*)/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    const cleanApiTitle = apiTitleLower
      .replace(/^(workshop|เวิร์คช็อป|workshop\s*\d*:?\s*)/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanApiTitle === cleanWorkshopTitle) {
      return true;
    }
    
    // Strategy 5: Check for key words match (for complex titles)
    const workshopKeywords = cleanWorkshopTitle.split(' ').filter((word: string) => word.length > 2);
    const apiKeywords = cleanApiTitle.split(' ').filter((word: string) => word.length > 2);
    
    const matchingKeywords = workshopKeywords.filter((keyword: string) => 
      apiKeywords.some((apiKeyword: string) => 
        apiKeyword.includes(keyword) || keyword.includes(apiKeyword)
      )
    );
    
    // If more than 50% of keywords match, consider it a match
    if (workshopKeywords.length > 0 && matchingKeywords.length / workshopKeywords.length > 0.5) {
      return true;
    }
    
    return false;
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
  
  apiActivities.forEach(activity => {
    const apiTitle = activity.title.trim();
    const workshopTitleLower = workshopTitle.toLowerCase();
    const apiTitleLower = apiTitle.toLowerCase();
    
    let similarity = 0;
    let reason = '';
    
    // Calculate similarity score
    if (apiTitleLower === workshopTitleLower) {
      similarity = 100;
      reason = 'Exact match';
    } else if (apiTitleLower.includes(workshopTitleLower)) {
      similarity = 80;
      reason = 'API title contains workshop title';
    } else if (workshopTitleLower.includes(apiTitleLower)) {
      similarity = 80;
      reason = 'Workshop title contains API title';
    } else {
      // Calculate keyword similarity
      const cleanWorkshopTitle = workshopTitleLower
        .replace(/^(workshop|เวิร์คช็อป|workshop\s*\d*:?\s*)/i, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      const cleanApiTitle = apiTitleLower
        .replace(/^(workshop|เวิร์คช็อป|workshop\s*\d*:?\s*)/i, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      const workshopKeywords = cleanWorkshopTitle.split(' ').filter(word => word.length > 2);
      const apiKeywords = cleanApiTitle.split(' ').filter(word => word.length > 2);
      
      const matchingKeywords = workshopKeywords.filter(keyword => 
        apiKeywords.some(apiKeyword => 
          apiKeyword.includes(keyword) || keyword.includes(apiKeyword)
        )
      );
      
      if (workshopKeywords.length > 0) {
        similarity = (matchingKeywords.length / workshopKeywords.length) * 100;
        reason = `Keyword similarity: ${matchingKeywords.length}/${workshopKeywords.length}`;
      }
    }
    
    if (similarity > 20) { // Only include suggestions with >20% similarity
      suggestions.push({ activity, similarity, reason });
    }
  });
  
  return suggestions.sort((a, b) => b.similarity - a.similarity);
}
