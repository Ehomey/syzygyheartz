/**
 * Master Compatibility Engine
 * Calculates comprehensive Yuan Fen (缘分) Score combining all astrology systems
 */

import { ChineseZodiac } from '../data/zodiacData';
import { Element, getElementRelationship } from '../data/elementsCycle';
import { getZodiacCompatibility } from '../data/compatibilityMatrix';
import { generateCompatibilityReading, CompatibilityReading } from '../data/destinyReadings';
import {
  getZodiacFromYear,
  getZodiacCompatibilityInfo,
  isSanHe,
  isLiuHe
} from './zodiac';
import {
  getElementFromYear,
  calculateElementCompatibility,
  calculateElementBalance,
  getElementHarmonyScore
} from './elements';
import {
  calculateBaZi,
  calculateBaZiCompatibility,
  BaZiChart,
  BaZiCompatibility
} from './bazi';

/**
 * Birth data interface
 */
export interface BirthData {
  year: number;
  month: number;
  day: number;
  hour: number;
}

/**
 * Comprehensive compatibility result
 */
export interface YuanFenScore {
  total: number;                        // 0-100 overall compatibility
  breakdown: {
    zodiacScore: number;                // 30% weight
    elementScore: number;               // 25% weight
    baziScore: number;                  // 25% weight
    specialBonuses: number;             // 20% weight (San He, Liu He)
  };
  zodiacInfo: {
    person1: ChineseZodiac;
    person2: ChineseZodiac;
    compatibility: number;
    isSanHe: boolean;
    isLiuHe: boolean;
    relationship: string;
  };
  elementInfo: {
    person1: Element;
    person2: Element;
    compatibility: number;
    relationship: string;
    harmonious: boolean;
  };
  baziInfo: BaZiCompatibility;
  strengths: string[];
  challenges: string[];
  compatibilityReading: CompatibilityReading;
  recommendation: 'Excellent Match' | 'Very Good Match' | 'Good Match' | 'Challenging Match' | 'Difficult Match';
}

/**
 * Calculate comprehensive Yuan Fen compatibility score
 */
export function calculateYuanFen(
  person1: BirthData,
  person2: BirthData
): YuanFenScore {
  // 1. ZODIAC COMPATIBILITY (30% weight)
  const zodiac1 = getZodiacFromYear(person1.year);
  const zodiac2 = getZodiacFromYear(person2.year);
  const zodiacCompatInfo = getZodiacCompatibilityInfo(zodiac1, zodiac2);
  const zodiacMatrixScore = getZodiacCompatibility(zodiac1, zodiac2);
  const zodiacScore = Math.round((zodiacCompatInfo.score + zodiacMatrixScore) / 2);

  // 2. ELEMENT COMPATIBILITY (25% weight)
  const element1 = getElementFromYear(person1.year);
  const element2 = getElementFromYear(person2.year);
  const elementCompatResult = calculateElementCompatibility(element1, element2);
  const elementScore = elementCompatResult.score;

  // 3. BAZI COMPATIBILITY (25% weight)
  const baziChart1 = calculateBaZi(person1.year, person1.month, person1.day, person1.hour);
  const baziChart2 = calculateBaZi(person2.year, person2.month, person2.day, person2.hour);
  const baziCompatResult = calculateBaZiCompatibility(baziChart1, baziChart2);
  const baziScore = baziCompatResult.score;

  // Also consider element balance harmony
  const elementBalance1 = calculateElementBalance(baziChart1.elements);
  const elementBalance2 = calculateElementBalance(baziChart2.elements);
  const elementHarmony = getElementHarmonyScore(elementBalance1, elementBalance2);
  const adjustedBaziScore = Math.round((baziScore * 0.7) + (elementHarmony * 0.3));

  // 4. SPECIAL BONUSES (20% weight)
  let specialBonuses = 50; // Base score

  // San He Trinity bonus (+20 points)
  if (isSanHe(zodiac1, zodiac2)) {
    specialBonuses += 20;
  }

  // Liu He Secret Friend bonus (+15 points)
  if (isLiuHe(zodiac1, zodiac2)) {
    specialBonuses += 15;
  }

  // Element harmony bonus (+15 points)
  if (elementCompatResult.harmonious) {
    specialBonuses += 15;
  }

  // BaZi pillar harmonies bonus (+5 points per harmony, max 15)
  const pillarHarmonyBonus = Math.min(15, baziCompatResult.pillarHarmonies * 5);
  specialBonuses += pillarHarmonyBonus;

  // Day Master harmony bonus (up to +10 points)
  if (baziCompatResult.dayMasterHarmony >= 85) {
    specialBonuses += 10;
  } else if (baziCompatResult.dayMasterHarmony >= 70) {
    specialBonuses += 5;
  }

  // Ensure special bonuses don't exceed 100
  specialBonuses = Math.min(100, specialBonuses);

  // CALCULATE WEIGHTED TOTAL
  const total = Math.round(
    (zodiacScore * 0.30) +
    (elementScore * 0.25) +
    (adjustedBaziScore * 0.25) +
    (specialBonuses * 0.20)
  );

  // Ensure total is within 0-100
  const finalTotal = Math.max(0, Math.min(100, total));

  // Identify strengths and challenges
  const strengths: string[] = [];
  const challenges: string[] = [];

  if (zodiacScore >= 70) {
    strengths.push(`Strong zodiac compatibility between ${zodiac1} and ${zodiac2}`);
  } else if (zodiacScore < 50) {
    challenges.push(`Zodiac signs ${zodiac1} and ${zodiac2} require extra understanding`);
  }

  if (elementCompatResult.harmonious) {
    strengths.push(`Harmonious ${element1}-${element2} element pairing`);
  } else {
    challenges.push(`${element1} and ${element2} elements require balance and effort`);
  }

  if (zodiacCompatInfo.isSanHe) {
    strengths.push('San He trinity connection - natural allies and deep understanding');
  }

  if (zodiacCompatInfo.isLiuHe) {
    strengths.push('Liu He secret friends - special paired relationship');
  }

  if (baziCompatResult.dayMasterHarmony >= 70) {
    strengths.push('Day Masters are harmonious - compatible core personalities');
  } else if (baziCompatResult.dayMasterHarmony < 50) {
    challenges.push('Day Master elements require conscious effort to harmonize');
  }

  if (baziCompatResult.pillarHarmonies >= 2) {
    strengths.push(`${baziCompatResult.pillarHarmonies} shared pillar energies create understanding`);
  }

  if (elementBalance1.balanced && elementBalance2.balanced) {
    strengths.push('Both charts show elemental balance - stable partnership potential');
  }

  // Generate compatibility reading
  const elementRelationship = getElementRelationship(element1, element2);
  const compatibilityReading = generateCompatibilityReading(
    zodiac1,
    zodiac2,
    element1,
    element2,
    elementRelationship,
    finalTotal
  );

  // Determine recommendation
  let recommendation: YuanFenScore['recommendation'];
  if (finalTotal >= 90) {
    recommendation = 'Excellent Match';
  } else if (finalTotal >= 70) {
    recommendation = 'Very Good Match';
  } else if (finalTotal >= 50) {
    recommendation = 'Good Match';
  } else if (finalTotal >= 30) {
    recommendation = 'Challenging Match';
  } else {
    recommendation = 'Difficult Match';
  }

  return {
    total: finalTotal,
    breakdown: {
      zodiacScore,
      elementScore,
      baziScore: adjustedBaziScore,
      specialBonuses
    },
    zodiacInfo: {
      person1: zodiac1,
      person2: zodiac2,
      compatibility: zodiacScore,
      isSanHe: zodiacCompatInfo.isSanHe,
      isLiuHe: zodiacCompatInfo.isLiuHe,
      relationship: zodiacCompatInfo.relationship
    },
    elementInfo: {
      person1: element1,
      person2: element2,
      compatibility: elementScore,
      relationship: elementCompatResult.relationship,
      harmonious: elementCompatResult.harmonious
    },
    baziInfo: baziCompatResult,
    strengths,
    challenges,
    compatibilityReading,
    recommendation
  };
}

/**
 * Quick compatibility check (simplified version without time of birth)
 */
export function quickCompatibilityCheck(
  year1: number,
  year2: number
): {
  score: number;
  zodiac1: ChineseZodiac;
  zodiac2: ChineseZodiac;
  element1: Element;
  element2: Element;
  compatible: boolean;
} {
  const zodiac1 = getZodiacFromYear(year1);
  const zodiac2 = getZodiacFromYear(year2);
  const element1 = getElementFromYear(year1);
  const element2 = getElementFromYear(year2);

  const zodiacScore = getZodiacCompatibility(zodiac1, zodiac2);
  const elementResult = calculateElementCompatibility(element1, element2);

  // Simple weighted average
  const score = Math.round((zodiacScore * 0.6) + (elementResult.score * 0.4));

  return {
    score,
    zodiac1,
    zodiac2,
    element1,
    element2,
    compatible: score >= 60
  };
}

/**
 * Filter potential matches by minimum Yuan Fen score
 */
export function filterByYuanFen(
  userBirthData: BirthData,
  potentialMatches: Array<{ id: string; birthData: BirthData }>,
  minScore: number = 60
): Array<{ id: string; yuanFenScore: number; birthData: BirthData }> {
  return potentialMatches
    .map(match => ({
      id: match.id,
      birthData: match.birthData,
      yuanFenScore: calculateYuanFen(userBirthData, match.birthData).total
    }))
    .filter(match => match.yuanFenScore >= minScore)
    .sort((a, b) => b.yuanFenScore - a.yuanFenScore);
}

/**
 * Get top matches sorted by Yuan Fen score
 */
export function getTopMatches(
  userBirthData: BirthData,
  potentialMatches: Array<{ id: string; birthData: BirthData }>,
  limit: number = 10
): Array<{ id: string; yuanFenScore: number; recommendation: string }> {
  const scoredMatches = potentialMatches.map(match => {
    const result = calculateYuanFen(userBirthData, match.birthData);
    return {
      id: match.id,
      yuanFenScore: result.total,
      recommendation: result.recommendation
    };
  });

  return scoredMatches
    .sort((a, b) => b.yuanFenScore - a.yuanFenScore)
    .slice(0, limit);
}

/**
 * Filter by element harmony
 */
export function filterByElementHarmony(
  userYear: number,
  potentialMatches: Array<{ id: string; year: number }>
): Array<{ id: string; year: number }> {
  const userElement = getElementFromYear(userYear);

  return potentialMatches.filter(match => {
    const matchElement = getElementFromYear(match.year);
    const compatibility = calculateElementCompatibility(userElement, matchElement);
    return compatibility.harmonious;
  });
}

/**
 * Highlight San He (Trinity) matches
 */
export function findSanHeMatches(
  userYear: number,
  potentialMatches: Array<{ id: string; year: number }>
): Array<{ id: string; year: number }> {
  const userZodiac = getZodiacFromYear(userYear);

  return potentialMatches.filter(match => {
    const matchZodiac = getZodiacFromYear(match.year);
    return isSanHe(userZodiac, matchZodiac);
  });
}

/**
 * Find Liu He (Secret Friend) matches
 */
export function findLiuHeMatches(
  userYear: number,
  potentialMatches: Array<{ id: string; year: number }>
): Array<{ id: string; year: number }> {
  const userZodiac = getZodiacFromYear(userYear);

  return potentialMatches.filter(match => {
    const matchZodiac = getZodiacFromYear(match.year);
    return isLiuHe(userZodiac, matchZodiac);
  });
}

/**
 * Get compatibility insights for display
 */
export function getCompatibilityInsights(yuanFen: YuanFenScore): {
  level: string;
  color: string;
  icon: string;
  summary: string;
} {
  const score = yuanFen.total;

  if (score >= 90) {
    return {
      level: 'Excellent',
      color: '#FF1493',
      icon: '💖',
      summary: 'An exceptional cosmic connection! The stars align beautifully for this pairing.'
    };
  } else if (score >= 70) {
    return {
      level: 'Very Good',
      color: '#FF69B4',
      icon: '💕',
      summary: 'Strong compatibility with great potential for a lasting relationship.'
    };
  } else if (score >= 50) {
    return {
      level: 'Good',
      color: '#FFA07A',
      icon: '💗',
      summary: 'Promising match with opportunities for growth and understanding.'
    };
  } else if (score >= 30) {
    return {
      level: 'Challenging',
      color: '#FFD700',
      icon: '⚠️',
      summary: 'Requires significant effort and mutual understanding to succeed.'
    };
  } else {
    return {
      level: 'Difficult',
      color: '#A9A9A9',
      icon: '🌙',
      summary: 'Significant obstacles that require exceptional commitment from both partners.'
    };
  }
}
