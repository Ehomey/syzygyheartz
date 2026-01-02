/**
 * Chinese Zodiac Compatibility Matrix
 * Scores range from 0-100 representing compatibility between zodiac pairs
 */

import { ChineseZodiac } from './zodiacData';

export type CompatibilityMatrix = Record<ChineseZodiac, Record<ChineseZodiac, number>>;

/**
 * Compatibility scores based on traditional Chinese astrology
 * 90-100: Excellent match (San He trinity or Liu He pairs)
 * 70-89: Very good match
 * 50-69: Good match, requires effort
 * 30-49: Challenging match, significant differences
 * 0-29: Difficult match (Conflicting pairs)
 */
export const COMPATIBILITY_SCORES: CompatibilityMatrix = {
  [ChineseZodiac.RAT]: {
    [ChineseZodiac.RAT]: 55,
    [ChineseZodiac.OX]: 95,      // Liu He pair
    [ChineseZodiac.TIGER]: 45,
    [ChineseZodiac.RABBIT]: 40,
    [ChineseZodiac.DRAGON]: 97,  // San He trinity
    [ChineseZodiac.SNAKE]: 60,
    [ChineseZodiac.HORSE]: 25,   // Conflicting pair
    [ChineseZodiac.GOAT]: 50,
    [ChineseZodiac.MONKEY]: 98,  // San He trinity
    [ChineseZodiac.ROOSTER]: 35,
    [ChineseZodiac.DOG]: 65,
    [ChineseZodiac.PIG]: 70
  },
  [ChineseZodiac.OX]: {
    [ChineseZodiac.RAT]: 95,     // Liu He pair
    [ChineseZodiac.OX]: 50,
    [ChineseZodiac.TIGER]: 30,   // Challenging
    [ChineseZodiac.RABBIT]: 55,
    [ChineseZodiac.DRAGON]: 35,  // Challenging
    [ChineseZodiac.SNAKE]: 96,   // San He trinity
    [ChineseZodiac.HORSE]: 45,
    [ChineseZodiac.GOAT]: 28,    // Conflicting pair
    [ChineseZodiac.MONKEY]: 75,
    [ChineseZodiac.ROOSTER]: 97, // San He trinity
    [ChineseZodiac.DOG]: 50,
    [ChineseZodiac.PIG]: 65
  },
  [ChineseZodiac.TIGER]: {
    [ChineseZodiac.RAT]: 45,
    [ChineseZodiac.OX]: 30,      // Challenging
    [ChineseZodiac.TIGER]: 48,
    [ChineseZodiac.RABBIT]: 60,
    [ChineseZodiac.DRAGON]: 72,
    [ChineseZodiac.SNAKE]: 35,   // Challenging
    [ChineseZodiac.HORSE]: 96,   // San He trinity
    [ChineseZodiac.GOAT]: 55,
    [ChineseZodiac.MONKEY]: 25,  // Conflicting pair
    [ChineseZodiac.ROOSTER]: 42,
    [ChineseZodiac.DOG]: 98,     // San He trinity
    [ChineseZodiac.PIG]: 93      // Liu He pair
  },
  [ChineseZodiac.RABBIT]: {
    [ChineseZodiac.RAT]: 40,
    [ChineseZodiac.OX]: 55,
    [ChineseZodiac.TIGER]: 60,
    [ChineseZodiac.RABBIT]: 52,
    [ChineseZodiac.DRAGON]: 58,
    [ChineseZodiac.SNAKE]: 68,
    [ChineseZodiac.HORSE]: 62,
    [ChineseZodiac.GOAT]: 95,    // San He trinity
    [ChineseZodiac.MONKEY]: 50,
    [ChineseZodiac.ROOSTER]: 27, // Conflicting pair
    [ChineseZodiac.DOG]: 94,     // Liu He pair
    [ChineseZodiac.PIG]: 97      // San He trinity
  },
  [ChineseZodiac.DRAGON]: {
    [ChineseZodiac.RAT]: 97,     // San He trinity
    [ChineseZodiac.OX]: 35,      // Challenging
    [ChineseZodiac.TIGER]: 72,
    [ChineseZodiac.RABBIT]: 58,
    [ChineseZodiac.DRAGON]: 38,  // Challenging
    [ChineseZodiac.SNAKE]: 78,
    [ChineseZodiac.HORSE]: 65,
    [ChineseZodiac.GOAT]: 55,
    [ChineseZodiac.MONKEY]: 96,  // San He trinity
    [ChineseZodiac.ROOSTER]: 93, // Liu He pair
    [ChineseZodiac.DOG]: 26,     // Conflicting pair
    [ChineseZodiac.PIG]: 62
  },
  [ChineseZodiac.SNAKE]: {
    [ChineseZodiac.RAT]: 60,
    [ChineseZodiac.OX]: 96,      // San He trinity
    [ChineseZodiac.TIGER]: 35,   // Challenging
    [ChineseZodiac.RABBIT]: 68,
    [ChineseZodiac.DRAGON]: 78,
    [ChineseZodiac.SNAKE]: 53,
    [ChineseZodiac.HORSE]: 58,
    [ChineseZodiac.GOAT]: 62,
    [ChineseZodiac.MONKEY]: 94,  // Liu He pair
    [ChineseZodiac.ROOSTER]: 98, // San He trinity
    [ChineseZodiac.DOG]: 48,
    [ChineseZodiac.PIG]: 24      // Conflicting pair
  },
  [ChineseZodiac.HORSE]: {
    [ChineseZodiac.RAT]: 25,     // Conflicting pair
    [ChineseZodiac.OX]: 45,
    [ChineseZodiac.TIGER]: 96,   // San He trinity
    [ChineseZodiac.RABBIT]: 62,
    [ChineseZodiac.DRAGON]: 65,
    [ChineseZodiac.SNAKE]: 58,
    [ChineseZodiac.HORSE]: 50,
    [ChineseZodiac.GOAT]: 95,    // Liu He pair
    [ChineseZodiac.MONKEY]: 55,
    [ChineseZodiac.ROOSTER]: 38,
    [ChineseZodiac.DOG]: 97,     // San He trinity
    [ChineseZodiac.PIG]: 68
  },
  [ChineseZodiac.GOAT]: {
    [ChineseZodiac.RAT]: 50,
    [ChineseZodiac.OX]: 28,      // Conflicting pair
    [ChineseZodiac.TIGER]: 55,
    [ChineseZodiac.RABBIT]: 95,  // San He trinity
    [ChineseZodiac.DRAGON]: 55,
    [ChineseZodiac.SNAKE]: 62,
    [ChineseZodiac.HORSE]: 95,   // Liu He pair
    [ChineseZodiac.GOAT]: 54,
    [ChineseZodiac.MONKEY]: 73,
    [ChineseZodiac.ROOSTER]: 42,
    [ChineseZodiac.DOG]: 32,     // Challenging
    [ChineseZodiac.PIG]: 96      // San He trinity
  },
  [ChineseZodiac.MONKEY]: {
    [ChineseZodiac.RAT]: 98,     // San He trinity
    [ChineseZodiac.OX]: 75,
    [ChineseZodiac.TIGER]: 25,   // Conflicting pair
    [ChineseZodiac.RABBIT]: 50,
    [ChineseZodiac.DRAGON]: 96,  // San He trinity
    [ChineseZodiac.SNAKE]: 94,   // Liu He pair
    [ChineseZodiac.HORSE]: 55,
    [ChineseZodiac.GOAT]: 73,
    [ChineseZodiac.MONKEY]: 51,
    [ChineseZodiac.ROOSTER]: 60,
    [ChineseZodiac.DOG]: 58,
    [ChineseZodiac.PIG]: 33      // Challenging
  },
  [ChineseZodiac.ROOSTER]: {
    [ChineseZodiac.RAT]: 35,
    [ChineseZodiac.OX]: 97,      // San He trinity
    [ChineseZodiac.TIGER]: 42,
    [ChineseZodiac.RABBIT]: 27,  // Conflicting pair
    [ChineseZodiac.DRAGON]: 93,  // Liu He pair
    [ChineseZodiac.SNAKE]: 98,   // San He trinity
    [ChineseZodiac.HORSE]: 38,
    [ChineseZodiac.GOAT]: 42,
    [ChineseZodiac.MONKEY]: 60,
    [ChineseZodiac.ROOSTER]: 36, // Challenging
    [ChineseZodiac.DOG]: 45,
    [ChineseZodiac.PIG]: 52
  },
  [ChineseZodiac.DOG]: {
    [ChineseZodiac.RAT]: 65,
    [ChineseZodiac.OX]: 50,
    [ChineseZodiac.TIGER]: 98,   // San He trinity
    [ChineseZodiac.RABBIT]: 94,  // Liu He pair
    [ChineseZodiac.DRAGON]: 26,  // Conflicting pair
    [ChineseZodiac.SNAKE]: 48,
    [ChineseZodiac.HORSE]: 97,   // San He trinity
    [ChineseZodiac.GOAT]: 32,    // Challenging
    [ChineseZodiac.MONKEY]: 58,
    [ChineseZodiac.ROOSTER]: 45,
    [ChineseZodiac.DOG]: 49,
    [ChineseZodiac.PIG]: 72
  },
  [ChineseZodiac.PIG]: {
    [ChineseZodiac.RAT]: 70,
    [ChineseZodiac.OX]: 65,
    [ChineseZodiac.TIGER]: 93,   // Liu He pair
    [ChineseZodiac.RABBIT]: 97,  // San He trinity
    [ChineseZodiac.DRAGON]: 62,
    [ChineseZodiac.SNAKE]: 24,   // Conflicting pair
    [ChineseZodiac.HORSE]: 68,
    [ChineseZodiac.GOAT]: 96,    // San He trinity
    [ChineseZodiac.MONKEY]: 33,  // Challenging
    [ChineseZodiac.ROOSTER]: 52,
    [ChineseZodiac.DOG]: 72,
    [ChineseZodiac.PIG]: 47
  }
};

/**
 * Get compatibility score between two zodiac signs
 */
export function getZodiacCompatibility(sign1: ChineseZodiac, sign2: ChineseZodiac): number {
  return COMPATIBILITY_SCORES[sign1][sign2];
}

/**
 * Get compatibility level description
 */
export function getCompatibilityLevel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 50) return 'Good';
  if (score >= 30) return 'Challenging';
  return 'Difficult';
}
