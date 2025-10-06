import type { ActivityData, WorkshopWithAPIData } from '../types/card';

/**
 * Workshop to API mapping table
 * Maps workshop titles to API activity titles
 */
const WORKSHOP_API_MAPPING: Record<string, string[]> = {
  // Computer Engineering
  'kimi no logical': ['workshop 1: kimi no logical'],
  'aitagorithm': ['workshop 2: aitagorithm'],
  'cmd fortune': ['workshop 3: cmd เสี่ยงทาย'],
  'cmd เสี่ยงทาย': ['workshop 3: cmd เสี่ยงทาย'],
  'river no cybe': ['workshop 4: river no cyber'],
  'ai rotation': ['workshop 5: ai rotation'],
  
  // Mechanical Engineering
  'hands on me': ['hands on me'],
  'solidworks': ['hands on me'],
  'me lab tour': ['me lab tour'],
  
  // Production Engineering
  'pro(duct)x1e 1st mini album': ['pro(duct)x1e 1st mini album', 'pro(duct)x1e 1st mini album '],
  
  // Tool and Materials Engineering
  'star stamp station': ['star stamp station'],
  'butter bear bookmark': ['butter bear bookmark'],
  
  // Civil Engineering
  'geotechnical engineering': ['geotechnical'],
  'geo': ['geotechnical'],
  'ธรณี': ['geotechnical'],
  'concrete engineering': ['concrete'],
  'concrete': ['concrete'],
  'คอนกรีต': ['concrete'],
  'structural engineering': ['structural'],
  'structural': ['structural'],
  'โครงสร้าง': ['structural'],
  'water resources engineering': ['water resources'],
  'water resources': ['water resources'],
  'ทรัพยากรน้ำ': ['water resources'],
  'survey': ['survey'],
  'เซอร์เวย์': ['survey'],
  
  // Environmental Engineering
  'dream fo green': ['envi dream stage : เส้นทางความฝัน วิศวกรรมสิ่งแวดล้อม'],
  'dream for green': ['envi dream stage : เส้นทางความฝัน วิศวกรรมสิ่งแวดล้อม'],
  'escape room': ['envi mission (ปริศนาไอดอลพิทักษ์โลก)'],
  'envi mission': ['envi mission (ปริศนาไอดอลพิทักษ์โลก)'],
  
  // Chemical Engineering
  'จุดเริ่มต้น chemeng idol': ['จุดเริ่มต้น chemeng idol'],
  'โปรแกรมลับก่อนเดบิวต์': ['โปรแกรมลับก่อนเดบิวต์'],
  'ลานฝึกคอมโบเวท': ['ลานฝึกคอมโบเวท'],
  'สกัดพลังเสียง': ['สกัดพลังเสียง'],
  'หอกลั่นเสน่ห์': ['หอกลั่นเสน่ห์'],
  'เชื่อมหัวใจเมมเบอร์': ['เชื่อมหัวใจเมมเบอร์'],
  'เวทีกรองใจ': ['เวทีกรองใจ'],
  
  // Electrical Engineering
  'motor control lab': ['motor control'],
  'measurement lab': ['measurement lab'],
  'melody of electricity lab': ['the melody of electricity- เสียงดนตรีจากวง(โค)จร'],
  'melody lab': ['the melody of electricity- เสียงดนตรีจากวง(โค)จร'],
  
  // Electronics Engineering
  'cooltech': ['cooltech: ปลุกลมอัจฉริยะด้วยอุณหภูมิ'],
  'cool tech': ['cooltech: ปลุกลมอัจฉริยะด้วยอุณหภูมิ'],
  
  // Instrumentation and Control
  'sensors lab': ['sensors lab'],
  'plc lab': ['program logic control (plc) lab'],
  'pid lab': ['water flow control (pid) lab'],
  'water flow control': ['water flow control (pid) lab'],
};

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
 */
function calculateSimilarity(terms1: string[], terms2: string[]): number {
  if (terms1.length === 0 || terms2.length === 0) return 0;
  
  // Check for individual word matches
  const individualMatches = terms1.filter(term1 => 
    terms2.some(term2 => 
      term1 === term2 || // Exact match (highest priority)
      (term1.length > 3 && term2.length > 3 && // Only for longer words
       (term1.includes(term2) || term2.includes(term1)))
    )
  );
  
  // Calculate weighted score
  const totalPossibleMatches = Math.max(terms1.length, terms2.length);
  const weightedScore = individualMatches.length / totalPossibleMatches;
  
  return weightedScore;
}

/**
 * Map API activities to workshop content by matching titles
 */
export function mapAPIDataToWorkshop(
  workshopData: any, // Original workshop content
  apiActivities: ActivityData[]
): WorkshopWithAPIData {
  const workshopTitle = workshopData.title;
  const workshopTitleLower = workshopTitle.toLowerCase();
  
  // First, try exact mapping from table
  let matchingActivities: ActivityData[] = [];
  
  for (const [workshopKey, apiTitles] of Object.entries(WORKSHOP_API_MAPPING)) {
    if (workshopTitleLower.includes(workshopKey) || workshopKey.includes(workshopTitleLower)) {
      matchingActivities = apiActivities.filter(activity => 
        apiTitles.some(apiTitle => 
          activity.title.toLowerCase().includes(apiTitle.toLowerCase()) ||
          apiTitle.toLowerCase().includes(activity.title.toLowerCase())
        )
      );
      break;
    }
  }
  
  // If no exact mapping found, try similarity matching
  if (matchingActivities.length === 0) {
    const workshopTerms = extractKeyTerms(workshopTitle);
    
    matchingActivities = apiActivities.filter(activity => {
      const apiTitle = activity.title.trim();
      const apiTerms = extractKeyTerms(apiTitle);
      const similarity = calculateSimilarity(workshopTerms, apiTerms);
      
      // Debug logging
      if (similarity > 0.3) {
        console.log(`🔍 Similarity Match: "${workshopTitle}" vs "${apiTitle}"`);
        console.log(`   Workshop terms: [${workshopTerms.join(', ')}]`);
        console.log(`   API terms: [${apiTerms.join(', ')}]`);
        console.log(`   Similarity: ${(similarity * 100).toFixed(1)}%`);
      }
      
      return similarity >= 0.6; // 60% similarity threshold
    });
  }
  
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