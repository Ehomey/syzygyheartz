/**
 * Destiny Readings and Compatibility Text Templates
 * Generates personalized compatibility descriptions based on zodiac and element combinations
 */

import { ChineseZodiac } from './zodiacData';
import { Element, ElementRelationship } from './elementsCycle';

export interface CompatibilityReading {
  headline: string;
  overview: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

/**
 * Compatibility headlines based on score ranges
 */
export const COMPATIBILITY_HEADLINES: Record<string, string[]> = {
  excellent: [
    'A Match Written in the Stars',
    'Destined Souls Unite',
    'Cosmic Harmony Awaits',
    'The Universe Smiles Upon You',
    'A Rare Celestial Connection'
  ],
  veryGood: [
    'Strong Cosmic Alignment',
    'Promising Celestial Bond',
    'Harmonious Energy Flow',
    'A Beautiful Balance',
    'Bright Stars Align'
  ],
  good: [
    'Potential for Deep Connection',
    'Growing Together Through Balance',
    'Complementary Energies',
    'A Journey of Discovery',
    'Building Bridges Between Stars'
  ],
  challenging: [
    'Opposites Can Attract',
    'Growth Through Differences',
    'A Test of Compatibility',
    'Learning Through Contrast',
    'Finding Balance in Diversity'
  ],
  difficult: [
    'A Challenging Path Ahead',
    'Significant Differences to Navigate',
    'Requires Exceptional Effort',
    'The Stars Present Obstacles',
    'A Difficult Cosmic Journey'
  ]
};

/**
 * Zodiac-specific relationship strengths
 */
export const ZODIAC_PAIR_STRENGTHS: Partial<Record<string, string[]>> = {
  // San He Trinities (highest compatibility)
  'Rat-Dragon': [
    'Both are ambitious and intelligent, creating a powerhouse partnership',
    'Natural understanding of each other\'s drive for success',
    'Excellent communication and mutual respect'
  ],
  'Rat-Monkey': [
    'Share quick wit and clever problem-solving abilities',
    'Dynamic and exciting relationship full of adventure',
    'Strong mental connection and playful energy'
  ],
  'Tiger-Horse': [
    'Both love freedom and adventure, creating exciting experiences together',
    'Passionate and energetic relationship',
    'Mutual respect for independence and personal space'
  ],
  'Tiger-Dog': [
    'Deep loyalty and trust form the foundation',
    'Shared values of honesty and justice',
    'Protective and supportive of each other\'s dreams'
  ],
  'Rabbit-Goat': [
    'Create a peaceful, artistic, and harmonious home together',
    'Both appreciate beauty and emotional connection',
    'Gentle understanding and nurturing relationship'
  ],
  'Rabbit-Pig': [
    'Share optimism and kindness toward each other',
    'Create a loving and supportive partnership',
    'Both value peace and emotional security'
  ],
  'Ox-Snake': [
    'Deep intellectual connection and mutual respect',
    'Both value stability and long-term planning',
    'Calm, sophisticated partnership built on trust'
  ],
  'Ox-Rooster': [
    'Hardworking and dedicated to shared goals',
    'Practical approach to life and relationships',
    'Strong foundation built on honesty and reliability'
  ],
  // Liu He Pairs (secret friends)
  'Rat-Ox': [
    'Perfect balance of innovation and stability',
    'Rat brings excitement while Ox provides security',
    'Complementary strengths create powerful synergy'
  ],
  'Tiger-Pig': [
    'Tiger\'s passion balanced by Pig\'s gentleness',
    'Mutual admiration and genuine affection',
    'Support each other\'s dreams and aspirations'
  ],
  'Rabbit-Dog': [
    'Dog\'s loyalty complements Rabbit\'s need for security',
    'Both value honesty and emotional connection',
    'Create a safe, loving environment together'
  ],
  'Dragon-Rooster': [
    'Dragon\'s charisma enhanced by Rooster\'s attention to detail',
    'Both are confident and capable',
    'Admire and respect each other\'s strengths'
  ],
  'Snake-Monkey': [
    'Snake\'s wisdom balanced by Monkey\'s cleverness',
    'Intellectually stimulating partnership',
    'Keep each other mentally engaged and entertained'
  ],
  'Horse-Goat': [
    'Horse provides adventure while Goat creates harmony',
    'Complementary approach to life and love',
    'Freedom balanced with emotional connection'
  ]
};

/**
 * Zodiac-specific relationship challenges
 */
export const ZODIAC_PAIR_CHALLENGES: Partial<Record<string, string[]>> = {
  // Conflicting pairs (opposite signs)
  'Rat-Horse': [
    'Fundamentally different approaches to life and freedom',
    'Rat seeks security while Horse craves independence',
    'May struggle with trust and commitment issues'
  ],
  'Ox-Goat': [
    'Ox\'s rigidity clashes with Goat\'s need for flexibility',
    'Different values regarding responsibility and spontaneity',
    'Communication style differences can cause friction'
  ],
  'Tiger-Monkey': [
    'Both compete for dominance and attention',
    'Tiger\'s directness conflicts with Monkey\'s cunning',
    'Trust issues and power struggles are common'
  ],
  'Rabbit-Rooster': [
    'Rooster\'s critical nature wounds sensitive Rabbit',
    'Different communication styles cause misunderstandings',
    'Rabbit needs peace while Rooster stirs things up'
  ],
  'Dragon-Dog': [
    'Dragon\'s arrogance irritates Dog\'s sense of justice',
    'Dog questions Dragon\'s grand schemes',
    'Fundamental differences in worldview and values'
  ],
  'Snake-Pig': [
    'Snake\'s suspicion conflicts with Pig\'s trusting nature',
    'Different approaches to social life and relationships',
    'Pig\'s openness clashes with Snake\'s secretive nature'
  ]
};

/**
 * Element relationship descriptions for compatibility readings
 */
export const ELEMENT_RELATIONSHIP_READINGS: Record<ElementRelationship, { strength: string; challenge: string }> = {
  [ElementRelationship.SAME]: {
    strength: 'Deep understanding of each other\'s core nature and energy',
    challenge: 'May compete for the same resources or fall into similar patterns'
  },
  [ElementRelationship.GENERATING]: {
    strength: 'One partner naturally supports and energizes the other, creating harmonious flow',
    challenge: 'The supporting partner may sometimes feel drained if balance is not maintained'
  },
  [ElementRelationship.BEING_GENERATED]: {
    strength: 'One partner receives natural nourishment and support from the other',
    challenge: 'The nourished partner must remember to give back and not become dependent'
  },
  [ElementRelationship.CONTROLLING]: {
    strength: 'Can provide necessary structure and boundaries to the relationship',
    challenge: 'One partner may feel dominated or restricted by the other\'s energy'
  },
  [ElementRelationship.BEING_CONTROLLED]: {
    strength: 'Teaches important lessons about flexibility and adaptation',
    challenge: 'May feel overpowered or limited without conscious effort to maintain balance'
  }
};

/**
 * Advice based on compatibility score ranges
 */
export const RELATIONSHIP_ADVICE: Record<string, string[]> = {
  excellent: [
    'Your natural compatibility is a gift - nurture it with communication and appreciation',
    'This strong foundation allows you to weather any storm together',
    'Use your natural harmony to build something truly special and lasting',
    'While compatibility is high, never take each other for granted'
  ],
  veryGood: [
    'You have excellent potential - focus on building on your natural strengths',
    'Your differences are minor and can add interesting dimensions to your relationship',
    'Open communication will help you maximize your strong compatibility',
    'This is a promising match that can deepen with time and effort'
  ],
  good: [
    'Success requires conscious effort to understand and appreciate each other',
    'Focus on your shared values while respecting your differences',
    'Regular communication and compromise will strengthen your bond',
    'Your relationship can grow stronger through mutual understanding'
  ],
  challenging: [
    'This match requires significant effort and understanding from both partners',
    'Focus on finding common ground and respecting fundamental differences',
    'Success is possible but demands patience, communication, and compromise',
    'Consider whether you\'re both willing to work through the challenges'
  ],
  difficult: [
    'This pairing faces significant obstacles that require exceptional commitment',
    'Both partners must be willing to grow and change for the relationship to work',
    'Consider whether the relationship brings out the best in both of you',
    'Sometimes the wisest path is to remain friends rather than romantic partners'
  ]
};

/**
 * Generate compatibility reading key for zodiac pair
 */
export function getZodiacPairKey(zodiac1: ChineseZodiac, zodiac2: ChineseZodiac): string {
  // Create consistent key regardless of order
  const animals = [zodiac1, zodiac2].sort();
  return `${animals[0]}-${animals[1]}`;
}

/**
 * Get random item from array
 */
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get compatibility level from score
 */
export function getCompatibilityLevel(score: number): string {
  if (score >= 90) return 'excellent';
  if (score >= 70) return 'veryGood';
  if (score >= 50) return 'good';
  if (score >= 30) return 'challenging';
  return 'difficult';
}

/**
 * Generate complete compatibility reading
 */
export function generateCompatibilityReading(
  zodiac1: ChineseZodiac,
  zodiac2: ChineseZodiac,
  element1: Element,
  element2: Element,
  elementRelationship: ElementRelationship,
  yuanFenScore: number
): CompatibilityReading {
  const level = getCompatibilityLevel(yuanFenScore);
  const pairKey = getZodiacPairKey(zodiac1, zodiac2);

  // Get headline
  const headline = getRandomItem(COMPATIBILITY_HEADLINES[level]);

  // Build overview
  const overview = `The ${zodiac1} and ${zodiac2} pairing scores ${yuanFenScore} out of 100 on the Yuan Fen scale, ` +
    `indicating a ${level.replace(/([A-Z])/g, ' $1').toLowerCase()} cosmic connection. ` +
    `Your elemental pairing of ${element1} and ${element2} creates a ${elementRelationship.toLowerCase()} dynamic.`;

  // Get strengths
  const strengths: string[] = [];
  const pairSpecificStrengths = ZODIAC_PAIR_STRENGTHS[pairKey];
  if (pairSpecificStrengths) {
    strengths.push(...pairSpecificStrengths);
  } else {
    // Generic strengths based on level
    if (level === 'excellent' || level === 'veryGood') {
      strengths.push('Natural understanding and compatibility');
      strengths.push('Complementary energies that enhance each other');
    } else if (level === 'good') {
      strengths.push('Potential for growth through mutual understanding');
      strengths.push('Opportunities to learn from each other\'s differences');
    }
  }

  // Add element-based strength
  strengths.push(ELEMENT_RELATIONSHIP_READINGS[elementRelationship].strength);

  // Get challenges
  const challenges: string[] = [];
  const pairSpecificChallenges = ZODIAC_PAIR_CHALLENGES[pairKey];
  if (pairSpecificChallenges) {
    challenges.push(...pairSpecificChallenges);
  } else {
    // Generic challenges based on level
    if (level === 'excellent' || level === 'veryGood') {
      challenges.push('May become too comfortable and stop growing');
      challenges.push('Need to maintain individual identities');
    } else if (level === 'good') {
      challenges.push('Requires consistent effort to understand differences');
      challenges.push('May need to compromise on fundamental approaches');
    } else {
      challenges.push('Fundamental differences in values and approach to life');
      challenges.push('Requires exceptional patience and understanding');
    }
  }

  // Add element-based challenge
  challenges.push(ELEMENT_RELATIONSHIP_READINGS[elementRelationship].challenge);

  // Get advice
  const advice = getRandomItem(RELATIONSHIP_ADVICE[level]);

  return {
    headline,
    overview,
    strengths,
    challenges,
    advice
  };
}
