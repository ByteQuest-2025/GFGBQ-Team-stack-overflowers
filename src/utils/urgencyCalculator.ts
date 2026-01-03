export interface UrgencyBreakdown {
  baseScore: number;
  durationBonus: number;
  vulnerableGroupBonus: number;
  safetyKeywordBonus: number;
}

export interface UrgencyResult {
  level: 'Critical' | 'High' | 'Medium' | 'Low';
  score: number;
  breakdown: UrgencyBreakdown;
  color: string;
}

const BASE_SCORES: Record<string, number> = {
  "Public Safety": 75,
  "Water Supply": 65,
  "Healthcare": 65,
  "Sanitation & Waste": 60,
  "Roads & Infrastructure": 55,
  "Education": 45,
  "Street Lights": 35,
  "Other": 30,
};

const CRITICAL_KEYWORDS = [
  "emergency", "urgent", "danger", "critical", "life threatening", 
  "accident", "death", "fire", "collapse", "flood", "electrocution",
  "आपातकाल", "खतरनाक", "जरूरी", "आग", "हादसा"
];

const VULNERABLE_KEYWORDS = [
  "children", "elderly", "pregnant", "disabled", "sick", "hospital",
  "school", "old age", "senior citizen", "infant", "baby",
  "बच्चे", "बुजुर्ग", "गर्भवती", "विकलांग", "बीमार"
];

export function calculateUrgency(text: string, category: string): UrgencyResult {
  const breakdown: UrgencyBreakdown = {
    baseScore: 0,
    durationBonus: 0,
    vulnerableGroupBonus: 0,
    safetyKeywordBonus: 0,
  };

  // Base score from category
  breakdown.baseScore = BASE_SCORES[category] || 30;

  const lower = text.toLowerCase();

  // Critical keywords (+10 each, max 30)
  let criticalCount = 0;
  CRITICAL_KEYWORDS.forEach((word) => {
    if (lower.includes(word)) criticalCount++;
  });
  breakdown.safetyKeywordBonus = Math.min(criticalCount * 10, 30);

  // Vulnerable groups (+8 each, max 24)
  let vulnerableCount = 0;
  VULNERABLE_KEYWORDS.forEach((word) => {
    if (lower.includes(word)) vulnerableCount++;
  });
  breakdown.vulnerableGroupBonus = Math.min(vulnerableCount * 8, 24);

  // Duration mentions
  if (lower.match(/\d+\s*(week|weeks|हफ्ते|सप्ताह)/)) {
    breakdown.durationBonus += 20;
  } else if (lower.match(/\d+\s*(day|days|दिन)/)) {
    breakdown.durationBonus += 15;
  } else if (lower.match(/\d+\s*(month|months|महीने)/)) {
    breakdown.durationBonus += 25;
  }

  // Calculate total score (max 100)
  const score = Math.min(
    breakdown.baseScore +
      breakdown.durationBonus +
      breakdown.vulnerableGroupBonus +
      breakdown.safetyKeywordBonus,
    100
  );

  // Determine urgency level
  let level: UrgencyResult['level'];
  let color: string;

  if (score >= 75) {
    level = 'Critical';
    color = 'critical';
  } else if (score >= 55) {
    level = 'High';
    color = 'high';
  } else if (score >= 35) {
    level = 'Medium';
    color = 'medium';
  } else {
    level = 'Low';
    color = 'low';
  }

  return { level, score, breakdown, color };
}

export function detectLanguage(text: string): 'en' | 'hi' | 'hi-en' {
  const hindiPattern = /[\u0900-\u097F]/;
  const englishPattern = /[a-zA-Z]/;
  
  const hasHindi = hindiPattern.test(text);
  const hasEnglish = englishPattern.test(text);
  
  if (hasHindi && hasEnglish) return 'hi-en';
  if (hasHindi) return 'hi';
  return 'en';
}

export function getLanguageLabel(lang: 'en' | 'hi' | 'hi-en'): string {
  switch (lang) {
    case 'hi': return 'हिंदी';
    case 'hi-en': return 'Hinglish';
    default: return 'English';
  }
}
