/**
 * Syzygy Hearts - Five Elements Constants
 * SINGLE SOURCE OF TRUTH for all Five Elements (Wu Xing) data
 */

import { FiveElement, HeavenlyStem, EarthlyBranch, ZodiacAnimal, ElementRelationship } from '../types';

// ============================================================================
// ELEMENT CYCLES
// ============================================================================

/**
 * Generating Cycle (Sheng) - Element that nurtures
 * Wood -> Fire -> Earth -> Metal -> Water -> Wood
 */
export const GENERATING_CYCLE: Record<FiveElement, FiveElement> = {
  Wood: 'Fire',    // Wood feeds Fire
  Fire: 'Earth',   // Fire creates Earth (ash)
  Earth: 'Metal',  // Earth bears Metal
  Metal: 'Water',  // Metal collects Water
  Water: 'Wood',   // Water nourishes Wood
} as const;

/**
 * Controlling Cycle (Ke) - Element that controls
 * Wood -> Earth -> Water -> Fire -> Metal -> Wood
 */
export const CONTROLLING_CYCLE: Record<FiveElement, FiveElement> = {
  Wood: 'Earth',   // Wood parts Earth (roots)
  Earth: 'Water',  // Earth absorbs Water
  Water: 'Fire',   // Water extinguishes Fire
  Fire: 'Metal',   // Fire melts Metal
  Metal: 'Wood',   // Metal chops Wood
} as const;

/**
 * Weakening Cycle (reverse of Generating)
 */
export const WEAKENING_CYCLE: Record<FiveElement, FiveElement> = {
  Fire: 'Wood',    // Fire exhausts Wood
  Earth: 'Fire',   // Earth exhausts Fire
  Metal: 'Earth',  // Metal exhausts Earth
  Water: 'Metal',  // Water exhausts Metal
  Wood: 'Water',   // Wood exhausts Water
} as const;

/**
 * Get the relationship between two elements
 */
export function getElementRelationship(element1: FiveElement, element2: FiveElement): ElementRelationship {
  if (element1 === element2) return 'same';
  if (GENERATING_CYCLE[element1] === element2) return 'generating';
  if (CONTROLLING_CYCLE[element1] === element2) return 'controlling';
  if (WEAKENING_CYCLE[element1] === element2) return 'weakening';
  if (CONTROLLING_CYCLE[element2] === element1) return 'insulting';
  return 'same'; // Fallback
}

// ============================================================================
// ELEMENT ATTRIBUTES
// ============================================================================

/**
 * Element attributes and associations
 */
export interface ElementAttributes {
  name: FiveElement;
  chinese: string;
  emoji: string;
  season: string;
  direction: string;
  planet: string;
  organ: string;
  emotion: string;
  taste: string;
  traits: string[];
}

export const ELEMENT_ATTRIBUTES: Record<FiveElement, ElementAttributes> = {
  Wood: {
    name: 'Wood',
    chinese: '木',
    emoji: '🌳',
    season: 'Spring',
    direction: 'East',
    planet: 'Jupiter',
    organ: 'Liver',
    emotion: 'Anger',
    taste: 'Sour',
    traits: ['Growth', 'Flexibility', 'Kindness', 'Creativity'],
  },
  Fire: {
    name: 'Fire',
    chinese: '火',
    emoji: '🔥',
    season: 'Summer',
    direction: 'South',
    planet: 'Mars',
    organ: 'Heart',
    emotion: 'Joy',
    taste: 'Bitter',
    traits: ['Passion', 'Enthusiasm', 'Leadership', 'Warmth'],
  },
  Earth: {
    name: 'Earth',
    chinese: '土',
    emoji: '⛰️',
    season: 'Late Summer',
    direction: 'Center',
    planet: 'Saturn',
    organ: 'Spleen',
    emotion: 'Worry',
    taste: 'Sweet',
    traits: ['Stability', 'Reliability', 'Nurturing', 'Practicality'],
  },
  Metal: {
    name: 'Metal',
    chinese: '金',
    emoji: '⚪',
    season: 'Autumn',
    direction: 'West',
    planet: 'Venus',
    organ: 'Lungs',
    emotion: 'Grief',
    taste: 'Spicy',
    traits: ['Strength', 'Determination', 'Precision', 'Justice'],
  },
  Water: {
    name: 'Water',
    chinese: '水',
    emoji: '💧',
    season: 'Winter',
    direction: 'North',
    planet: 'Mercury',
    organ: 'Kidneys',
    emotion: 'Fear',
    taste: 'Salty',
    traits: ['Wisdom', 'Adaptability', 'Intuition', 'Persistence'],
  },
} as const;

// ============================================================================
// STEM & BRANCH MAPPINGS
// ============================================================================

/**
 * Heavenly Stem to Element mapping
 */
export const STEM_ELEMENTS: Record<HeavenlyStem, FiveElement> = {
  Jia: 'Wood',   Yi: 'Wood',
  Bing: 'Fire',  Ding: 'Fire',
  Wu: 'Earth',   Ji: 'Earth',
  Geng: 'Metal', Xin: 'Metal',
  Ren: 'Water',  Gui: 'Water',
} as const;

/**
 * Heavenly Stem Chinese characters
 */
export const STEM_CHINESE: Record<HeavenlyStem, string> = {
  Jia: '甲', Yi: '乙',
  Bing: '丙', Ding: '丁',
  Wu: '戊', Ji: '己',
  Geng: '庚', Xin: '辛',
  Ren: '壬', Gui: '癸',
} as const;

/**
 * Earthly Branch to Element mapping
 */
export const BRANCH_ELEMENTS: Record<EarthlyBranch, FiveElement> = {
  Zi: 'Water',   Chou: 'Earth',
  Yin: 'Wood',   Mao: 'Wood',
  Chen: 'Earth', Si: 'Fire',
  Wu: 'Fire',    Wei: 'Earth',
  Shen: 'Metal', You: 'Metal',
  Xu: 'Earth',   Hai: 'Water',
} as const;

/**
 * Earthly Branch Chinese characters
 */
export const BRANCH_CHINESE: Record<EarthlyBranch, string> = {
  Zi: '子', Chou: '丑',
  Yin: '寅', Mao: '卯',
  Chen: '辰', Si: '巳',
  Wu: '午', Wei: '未',
  Shen: '申', You: '酉',
  Xu: '戌', Hai: '亥',
} as const;

/**
 * Earthly Branch to Zodiac Animal mapping
 */
export const BRANCH_ZODIAC: Record<EarthlyBranch, ZodiacAnimal> = {
  Zi: 'Rat',     Chou: 'Ox',
  Yin: 'Tiger',  Mao: 'Rabbit',
  Chen: 'Dragon', Si: 'Snake',
  Wu: 'Horse',   Wei: 'Goat',
  Shen: 'Monkey', You: 'Rooster',
  Xu: 'Dog',     Hai: 'Pig',
} as const;

// ============================================================================
// ZODIAC DATA
// ============================================================================

/**
 * Zodiac animal attributes
 */
export interface ZodiacAttributes {
  animal: ZodiacAnimal;
  chinese: string;
  emoji: string;
  element: FiveElement;
  polarity: 'Yin' | 'Yang';
  traits: string[];
  compatible: ZodiacAnimal[];
  incompatible: ZodiacAnimal[];
}

export const ZODIAC_ATTRIBUTES: Record<ZodiacAnimal, ZodiacAttributes> = {
  Rat: {
    animal: 'Rat',
    chinese: '鼠',
    emoji: '🐭',
    element: 'Water',
    polarity: 'Yang',
    traits: ['Clever', 'Quick-witted', 'Resourceful'],
    compatible: ['Dragon', 'Monkey', 'Ox'],
    incompatible: ['Horse', 'Goat'],
  },
  Ox: {
    animal: 'Ox',
    chinese: '牛',
    emoji: '🐮',
    element: 'Earth',
    polarity: 'Yin',
    traits: ['Diligent', 'Dependable', 'Strong'],
    compatible: ['Rat', 'Snake', 'Rooster'],
    incompatible: ['Tiger', 'Dragon', 'Horse', 'Goat'],
  },
  Tiger: {
    animal: 'Tiger',
    chinese: '虎',
    emoji: '🐯',
    element: 'Wood',
    polarity: 'Yang',
    traits: ['Brave', 'Confident', 'Competitive'],
    compatible: ['Dragon', 'Horse', 'Pig'],
    incompatible: ['Ox', 'Tiger', 'Snake', 'Monkey'],
  },
  Rabbit: {
    animal: 'Rabbit',
    chinese: '兔',
    emoji: '🐰',
    element: 'Wood',
    polarity: 'Yin',
    traits: ['Gentle', 'Quiet', 'Elegant'],
    compatible: ['Goat', 'Dog', 'Pig'],
    incompatible: ['Snake', 'Rooster'],
  },
  Dragon: {
    animal: 'Dragon',
    chinese: '龙',
    emoji: '🐲',
    element: 'Earth',
    polarity: 'Yang',
    traits: ['Confident', 'Intelligent', 'Enthusiastic'],
    compatible: ['Rooster', 'Rat', 'Monkey'],
    incompatible: ['Ox', 'Goat', 'Dog'],
  },
  Snake: {
    animal: 'Snake',
    chinese: '蛇',
    emoji: '🐍',
    element: 'Fire',
    polarity: 'Yin',
    traits: ['Wise', 'Intuitive', 'Enigmatic'],
    compatible: ['Dragon', 'Rooster'],
    incompatible: ['Tiger', 'Rabbit', 'Snake', 'Goat', 'Pig'],
  },
  Horse: {
    animal: 'Horse',
    chinese: '马',
    emoji: '🐴',
    element: 'Fire',
    polarity: 'Yang',
    traits: ['Active', 'Energetic', 'Free-spirited'],
    compatible: ['Tiger', 'Goat', 'Rabbit'],
    incompatible: ['Rat', 'Ox', 'Rooster'],
  },
  Goat: {
    animal: 'Goat',
    chinese: '羊',
    emoji: '🐐',
    element: 'Earth',
    polarity: 'Yin',
    traits: ['Gentle', 'Sympathetic', 'Creative'],
    compatible: ['Horse', 'Rabbit', 'Pig'],
    incompatible: ['Ox', 'Tiger', 'Dog'],
  },
  Monkey: {
    animal: 'Monkey',
    chinese: '猴',
    emoji: '🐵',
    element: 'Metal',
    polarity: 'Yang',
    traits: ['Sharp', 'Curious', 'Mischievous'],
    compatible: ['Rat', 'Dragon'],
    incompatible: ['Tiger', 'Pig'],
  },
  Rooster: {
    animal: 'Rooster',
    chinese: '鸡',
    emoji: '🐔',
    element: 'Metal',
    polarity: 'Yin',
    traits: ['Observant', 'Hardworking', 'Courageous'],
    compatible: ['Ox', 'Snake'],
    incompatible: ['Rabbit', 'Horse', 'Rooster', 'Dog'],
  },
  Dog: {
    animal: 'Dog',
    chinese: '狗',
    emoji: '🐶',
    element: 'Earth',
    polarity: 'Yang',
    traits: ['Loyal', 'Honest', 'Prudent'],
    compatible: ['Rabbit'],
    incompatible: ['Dragon', 'Goat', 'Rooster'],
  },
  Pig: {
    animal: 'Pig',
    chinese: '猪',
    emoji: '🐷',
    element: 'Water',
    polarity: 'Yin',
    traits: ['Compassionate', 'Generous', 'Diligent'],
    compatible: ['Tiger', 'Rabbit', 'Goat'],
    incompatible: ['Snake', 'Monkey'],
  },
} as const;

// ============================================================================
// ORDERED LISTS
// ============================================================================

/**
 * All elements in cycle order
 */
export const ELEMENTS_ORDER: readonly FiveElement[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

/**
 * All Heavenly Stems in order
 */
export const STEMS_ORDER: readonly HeavenlyStem[] = [
  'Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'
];

/**
 * All Earthly Branches in order
 */
export const BRANCHES_ORDER: readonly EarthlyBranch[] = [
  'Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'
];

/**
 * All Zodiac Animals in order
 */
export const ZODIAC_ORDER: readonly ZodiacAnimal[] = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];
