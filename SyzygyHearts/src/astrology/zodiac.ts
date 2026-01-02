/**
 * Chinese Zodiac System
 * Calculates zodiac animals from birth years and provides compatibility functions
 */

import {
  ChineseZodiac,
  ZODIAC_DATA,
  ZodiacTraits,
  SAN_HE_GROUPS,
  LIU_HE_PAIRS,
  CONFLICTING_PAIRS
} from '../data/zodiacData';

/**
 * Calculate Chinese Zodiac animal from birth year
 * The Chinese zodiac follows a 12-year cycle starting from Rat
 * Base year 1924 is Year of the Rat
 */
export function getZodiacFromYear(year: number): ChineseZodiac {
  // 1924 is Year of the Rat (start of a cycle)
  // The zodiac follows this order: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig
  const baseYear = 1924;
  const offset = (year - baseYear) % 12;

  // Ensure positive offset
  const normalizedOffset = offset >= 0 ? offset : offset + 12;

  const zodiacOrder: ChineseZodiac[] = [
    ChineseZodiac.RAT,
    ChineseZodiac.OX,
    ChineseZodiac.TIGER,
    ChineseZodiac.RABBIT,
    ChineseZodiac.DRAGON,
    ChineseZodiac.SNAKE,
    ChineseZodiac.HORSE,
    ChineseZodiac.GOAT,
    ChineseZodiac.MONKEY,
    ChineseZodiac.ROOSTER,
    ChineseZodiac.DOG,
    ChineseZodiac.PIG
  ];

  return zodiacOrder[normalizedOffset];
}

/**
 * Get zodiac traits for a specific animal
 */
export function getZodiacTraits(zodiac: ChineseZodiac): ZodiacTraits {
  return ZODIAC_DATA[zodiac];
}

/**
 * Get all personality traits for a zodiac sign
 */
export function getPersonalityTraits(zodiac: ChineseZodiac): {
  positive: string[];
  negative: string[];
  personality: string;
} {
  return ZODIAC_DATA[zodiac].traits;
}

/**
 * Check if two zodiac signs form a San He (Trinity) relationship
 * San He groups are highly compatible trine relationships
 */
export function isSanHe(zodiac1: ChineseZodiac, zodiac2: ChineseZodiac): boolean {
  return SAN_HE_GROUPS.some(group =>
    group.includes(zodiac1) && group.includes(zodiac2)
  );
}

/**
 * Check if two zodiac signs form a Liu He (Secret Friend) pair
 * Liu He pairs are special paired relationships with deep understanding
 */
export function isLiuHe(zodiac1: ChineseZodiac, zodiac2: ChineseZodiac): boolean {
  return LIU_HE_PAIRS.some(pair =>
    (pair[0] === zodiac1 && pair[1] === zodiac2) ||
    (pair[0] === zodiac2 && pair[1] === zodiac1)
  );
}

/**
 * Check if two zodiac signs are in conflict (opposition)
 * Conflicting pairs are 6 years apart and face challenges
 */
export function isConflicting(zodiac1: ChineseZodiac, zodiac2: ChineseZodiac): boolean {
  return CONFLICTING_PAIRS.some(pair =>
    (pair[0] === zodiac1 && pair[1] === zodiac2) ||
    (pair[0] === zodiac2 && pair[1] === zodiac1)
  );
}

/**
 * Get the San He group for a zodiac sign
 */
export function getSanHeGroup(zodiac: ChineseZodiac): ChineseZodiac[] {
  const group = SAN_HE_GROUPS.find(g => g.includes(zodiac));
  return group ? group.filter(z => z !== zodiac) : [];
}

/**
 * Get the Liu He partner for a zodiac sign
 */
export function getLiuHePartner(zodiac: ChineseZodiac): ChineseZodiac | null {
  const pair = LIU_HE_PAIRS.find(p => p.includes(zodiac));
  if (!pair) return null;
  return pair[0] === zodiac ? pair[1] : pair[0];
}

/**
 * Get the conflicting (opposite) zodiac sign
 */
export function getConflictingSign(zodiac: ChineseZodiac): ChineseZodiac | null {
  const pair = CONFLICTING_PAIRS.find(p => p.includes(zodiac));
  if (!pair) return null;
  return pair[0] === zodiac ? pair[1] : pair[0];
}

/**
 * Calculate basic zodiac compatibility score (0-100)
 * This is based on the compatibility matrix from zodiacData
 */
export function getBasicZodiacCompatibility(zodiac1: ChineseZodiac, zodiac2: ChineseZodiac): number {
  const traits1 = ZODIAC_DATA[zodiac1];

  // Check for best matches
  if (traits1.compatibility.best.includes(zodiac2)) {
    return 95;
  }

  // Check for good matches
  if (traits1.compatibility.good.includes(zodiac2)) {
    return 75;
  }

  // Check for challenging matches
  if (traits1.compatibility.challenging.includes(zodiac2)) {
    return 35;
  }

  // Default to moderate compatibility
  return 55;
}

/**
 * Get detailed compatibility information between two zodiac signs
 */
export interface ZodiacCompatibilityInfo {
  score: number;
  isSanHe: boolean;
  isLiuHe: boolean;
  isConflicting: boolean;
  relationship: 'San He Trinity' | 'Liu He Pair' | 'Conflicting' | 'Neutral';
  bonusPoints: number;
}

export function getZodiacCompatibilityInfo(
  zodiac1: ChineseZodiac,
  zodiac2: ChineseZodiac
): ZodiacCompatibilityInfo {
  const sanHe = isSanHe(zodiac1, zodiac2);
  const liuHe = isLiuHe(zodiac1, zodiac2);
  const conflicting = isConflicting(zodiac1, zodiac2);

  let relationship: ZodiacCompatibilityInfo['relationship'] = 'Neutral';
  let bonusPoints = 0;

  if (sanHe) {
    relationship = 'San He Trinity';
    bonusPoints = 15;
  } else if (liuHe) {
    relationship = 'Liu He Pair';
    bonusPoints = 12;
  } else if (conflicting) {
    relationship = 'Conflicting';
    bonusPoints = -10;
  }

  const baseScore = getBasicZodiacCompatibility(zodiac1, zodiac2);
  const finalScore = Math.max(0, Math.min(100, baseScore + bonusPoints));

  return {
    score: finalScore,
    isSanHe: sanHe,
    isLiuHe: liuHe,
    isConflicting: conflicting,
    relationship,
    bonusPoints
  };
}

/**
 * Check if zodiac signs share the same Yin/Yang energy
 */
export function haveSameYinYang(zodiac1: ChineseZodiac, zodiac2: ChineseZodiac): boolean {
  return ZODIAC_DATA[zodiac1].yin === ZODIAC_DATA[zodiac2].yin;
}

/**
 * Get compatible zodiac signs for dating/matching
 * Returns signs sorted by compatibility (best first)
 */
export function getCompatibleZodiacs(zodiac: ChineseZodiac): ChineseZodiac[] {
  const traits = ZODIAC_DATA[zodiac];
  const compatible: ChineseZodiac[] = [];

  // Add best matches first
  compatible.push(...traits.compatibility.best);

  // Add good matches
  compatible.push(...traits.compatibility.good);

  // Add San He partners if not already included
  const sanHePartners = getSanHeGroup(zodiac);
  sanHePartners.forEach(partner => {
    if (!compatible.includes(partner)) {
      compatible.unshift(partner); // Add to beginning
    }
  });

  // Add Liu He partner if not already included
  const liuHePartner = getLiuHePartner(zodiac);
  if (liuHePartner && !compatible.includes(liuHePartner)) {
    compatible.unshift(liuHePartner); // Add to beginning
  }

  return compatible;
}

/**
 * Calculate zodiac age compatibility
 * Some age differences have special meanings in Chinese astrology
 */
export function getAgeCompatibility(yearDiff: number): {
  compatible: boolean;
  note: string;
} {
  const absDiff = Math.abs(yearDiff);

  // Same age or very close
  if (absDiff <= 1) {
    return {
      compatible: true,
      note: 'Similar life stages and experiences'
    };
  }

  // 4 years apart - San He harmony
  if (absDiff === 4 || absDiff === 8) {
    return {
      compatible: true,
      note: 'San He harmony - natural understanding'
    };
  }

  // 6 years apart - Conflicting signs
  if (absDiff === 6) {
    return {
      compatible: false,
      note: 'Conflicting signs - requires extra effort'
    };
  }

  // 3 years apart - generally good
  if (absDiff === 3 || absDiff === 9) {
    return {
      compatible: true,
      note: 'Harmonious age difference'
    };
  }

  return {
    compatible: true,
    note: 'Neutral age compatibility'
  };
}
