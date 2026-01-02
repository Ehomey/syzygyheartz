/**
 * Syzygy Hearts - Application Constants
 *
 * This file contains all shared constants used across the app.
 * All agents should import constants from this central location.
 */

import { FiveElement, ZodiacAnimal, ElementRelationship, ZodiacRelationship } from './types';

// ============================================================================
// COLOR PALETTE
// ============================================================================

/**
 * Element colors based on traditional Five Elements theory
 */
export const ELEMENT_COLORS = {
  Wood: '#2ECC71',    // Green - growth, vitality
  Fire: '#E74C3C',     // Red - passion, energy
  Earth: '#F39C12',    // Orange/Brown - stability, grounding
  Metal: '#95A5A6',    // Silver/Gray - strength, precision
  Water: '#3498DB',    // Blue - flow, wisdom
} as const;

/**
 * Element gradient colors for visual effects
 */
export const ELEMENT_GRADIENTS = {
  Wood: ['#27AE60', '#2ECC71', '#58D68D'],
  Fire: ['#C0392B', '#E74C3C', '#EC7063'],
  Earth: ['#D68910', '#F39C12', '#F8C471'],
  Metal: ['#717D7E', '#95A5A6', '#B2BABB'],
  Water: ['#2874A6', '#3498DB', '#5DADE2'],
} as const;

/**
 * App color palette - Light theme
 */
export const COLORS_LIGHT = {
  // Primary brand colors
  primary: '#8B5CF6',        // Purple - mystical, cosmic
  primaryDark: '#7C3AED',
  primaryLight: '#A78BFA',

  // Secondary colors
  secondary: '#EC4899',      // Pink - love, romance
  secondaryDark: '#DB2777',
  secondaryLight: '#F472B6',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceElevated: '#F3F4F6',

  // Text colors
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Special UI
  like: '#10B981',          // Green for like
  pass: '#EF4444',          // Red for pass
  superlike: '#3B82F6',     // Blue for superlike

  // Compatibility score colors
  excellent: '#10B981',      // 85-100
  veryGood: '#3B82F6',       // 70-84
  good: '#8B5CF6',           // 55-69
  fair: '#F59E0B',           // 40-54
  challenging: '#EF4444',    // 0-39
} as const;

/**
 * App color palette - Dark theme
 */
export const COLORS_DARK = {
  // Primary brand colors
  primary: '#A78BFA',
  primaryDark: '#8B5CF6',
  primaryLight: '#C4B5FD',

  // Secondary colors
  secondary: '#F472B6',
  secondaryDark: '#EC4899',
  secondaryLight: '#F9A8D4',

  // Background colors
  background: '#111827',
  backgroundSecondary: '#1F2937',
  surface: '#1F2937',
  surfaceElevated: '#374151',

  // Text colors
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  textInverse: '#111827',

  // Border colors
  border: '#374151',
  borderLight: '#4B5563',
  borderDark: '#1F2937',

  // Status colors
  success: '#34D399',
  error: '#F87171',
  warning: '#FBBF24',
  info: '#60A5FA',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',

  // Special UI
  like: '#34D399',
  pass: '#F87171',
  superlike: '#60A5FA',

  // Compatibility score colors
  excellent: '#34D399',
  veryGood: '#60A5FA',
  good: '#A78BFA',
  fair: '#FBBF24',
  challenging: '#F87171',
} as const;

// ============================================================================
// ZODIAC ANIMALS
// ============================================================================

/**
 * Array of all zodiac animals in order
 */
export const ZODIAC_ANIMALS: ZodiacAnimal[] = [
  'Rat',
  'Ox',
  'Tiger',
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
];

/**
 * Zodiac animal traits and characteristics
 */
export const ZODIAC_TRAITS: Record<ZodiacAnimal, {
  element: FiveElement;
  traits: string[];
  strengths: string[];
  loveStyle: string;
  emoji: string;
}> = {
  Rat: {
    element: 'Water',
    traits: ['Intelligent', 'Adaptable', 'Quick-witted', 'Charming'],
    strengths: ['Resourceful', 'Versatile', 'Clever'],
    loveStyle: 'Passionate and devoted once committed',
    emoji: '🐀',
  },
  Ox: {
    element: 'Earth',
    traits: ['Diligent', 'Dependable', 'Strong', 'Determined'],
    strengths: ['Patient', 'Reliable', 'Honest'],
    loveStyle: 'Loyal and steady, values commitment',
    emoji: '🐂',
  },
  Tiger: {
    element: 'Wood',
    traits: ['Brave', 'Confident', 'Competitive', 'Charismatic'],
    strengths: ['Courageous', 'Active', 'Ambitious'],
    loveStyle: 'Passionate and adventurous',
    emoji: '🐅',
  },
  Rabbit: {
    element: 'Wood',
    traits: ['Gentle', 'Quiet', 'Elegant', 'Alert'],
    strengths: ['Compassionate', 'Artistic', 'Graceful'],
    loveStyle: 'Romantic and sensitive',
    emoji: '🐇',
  },
  Dragon: {
    element: 'Earth',
    traits: ['Confident', 'Intelligent', 'Enthusiastic', 'Charismatic'],
    strengths: ['Bold', 'Energetic', 'Ambitious'],
    loveStyle: 'Passionate and generous',
    emoji: '🐉',
  },
  Snake: {
    element: 'Fire',
    traits: ['Wise', 'Enigmatic', 'Graceful', 'Soft-spoken'],
    strengths: ['Intuitive', 'Sophisticated', 'Analytical'],
    loveStyle: 'Intense and possessive',
    emoji: '🐍',
  },
  Horse: {
    element: 'Fire',
    traits: ['Energetic', 'Independent', 'Warm-hearted', 'Enthusiastic'],
    strengths: ['Active', 'Cheerful', 'Popular'],
    loveStyle: 'Free-spirited and passionate',
    emoji: '🐴',
  },
  Goat: {
    element: 'Earth',
    traits: ['Calm', 'Gentle', 'Creative', 'Sympathetic'],
    strengths: ['Artistic', 'Kind', 'Peaceful'],
    loveStyle: 'Tender and nurturing',
    emoji: '🐐',
  },
  Monkey: {
    element: 'Metal',
    traits: ['Sharp', 'Smart', 'Curious', 'Mischievous'],
    strengths: ['Clever', 'Flexible', 'Inventive'],
    loveStyle: 'Playful and charming',
    emoji: '🐵',
  },
  Rooster: {
    element: 'Metal',
    traits: ['Observant', 'Hardworking', 'Courageous', 'Talented'],
    strengths: ['Confident', 'Practical', 'Punctual'],
    loveStyle: 'Devoted and protective',
    emoji: '🐓',
  },
  Dog: {
    element: 'Earth',
    traits: ['Loyal', 'Honest', 'Friendly', 'Faithful'],
    strengths: ['Trustworthy', 'Sincere', 'Responsible'],
    loveStyle: 'Faithful and protective',
    emoji: '🐕',
  },
  Pig: {
    element: 'Water',
    traits: ['Generous', 'Compassionate', 'Diligent', 'Easygoing'],
    strengths: ['Honest', 'Tolerant', 'Optimistic'],
    loveStyle: 'Affectionate and giving',
    emoji: '🐖',
  },
};

// ============================================================================
// FIVE ELEMENTS
// ============================================================================

/**
 * Array of all five elements in order of productive cycle
 */
export const FIVE_ELEMENTS: FiveElement[] = [
  'Wood',
  'Fire',
  'Earth',
  'Metal',
  'Water',
];

/**
 * Element personality traits
 */
export const ELEMENT_PERSONALITIES: Record<FiveElement, {
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  loveStyle: string;
}> = {
  Wood: {
    traits: ['Creative', 'Compassionate', 'Expansive', 'Flexible'],
    strengths: ['Growth-oriented', 'Idealistic', 'Collaborative'],
    weaknesses: ['Overly idealistic', 'Indecisive', 'Scattered'],
    loveStyle: 'Romantic and nurturing, seeks growth together',
  },
  Fire: {
    traits: ['Passionate', 'Dynamic', 'Charismatic', 'Enthusiastic'],
    strengths: ['Inspiring', 'Courageous', 'Expressive'],
    weaknesses: ['Impulsive', 'Impatient', 'Temperamental'],
    loveStyle: 'Intense and passionate, craves excitement',
  },
  Earth: {
    traits: ['Stable', 'Practical', 'Reliable', 'Grounded'],
    strengths: ['Nurturing', 'Patient', 'Loyal'],
    weaknesses: ['Stubborn', 'Resistant to change', 'Worrying'],
    loveStyle: 'Steady and committed, values security',
  },
  Metal: {
    traits: ['Determined', 'Strong-willed', 'Precise', 'Disciplined'],
    strengths: ['Organized', 'Principled', 'Resilient'],
    weaknesses: ['Rigid', 'Critical', 'Detached'],
    loveStyle: 'Loyal and protective, shows love through actions',
  },
  Water: {
    traits: ['Wise', 'Intuitive', 'Flowing', 'Reflective'],
    strengths: ['Adaptable', 'Philosophical', 'Perceptive'],
    weaknesses: ['Overly cautious', 'Passive', 'Fearful'],
    loveStyle: 'Deep and intuitive, values emotional connection',
  },
};

// ============================================================================
// ELEMENT RELATIONSHIPS
// ============================================================================

/**
 * Element productive cycle (生)
 * Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal collects Water, Water nourishes Wood
 */
export const ELEMENT_PRODUCTIVE_CYCLE: Record<FiveElement, FiveElement> = {
  Wood: 'Fire',
  Fire: 'Earth',
  Earth: 'Metal',
  Metal: 'Water',
  Water: 'Wood',
};

/**
 * Element destructive cycle (克)
 * Wood parts Earth, Earth absorbs Water, Water quenches Fire, Fire melts Metal, Metal chops Wood
 */
export const ELEMENT_DESTRUCTIVE_CYCLE: Record<FiveElement, FiveElement> = {
  Wood: 'Earth',
  Earth: 'Water',
  Water: 'Fire',
  Fire: 'Metal',
  Metal: 'Wood',
};

/**
 * Get relationship between two elements
 */
export const getElementRelationship = (
  element1: FiveElement,
  element2: FiveElement
): ElementRelationship => {
  if (element1 === element2) return 'Same';
  if (ELEMENT_PRODUCTIVE_CYCLE[element1] === element2) return 'Productive';
  if (ELEMENT_DESTRUCTIVE_CYCLE[element1] === element2) return 'Destructive';
  if (ELEMENT_PRODUCTIVE_CYCLE[element2] === element1) return 'Weakening';
  return 'Neutral';
};

// ============================================================================
// ZODIAC COMPATIBILITY
// ============================================================================

/**
 * Zodiac Trinity (三合) - Perfect harmony groups
 */
export const ZODIAC_TRINITY: ZodiacAnimal[][] = [
  ['Rat', 'Dragon', 'Monkey'],    // Water trinity
  ['Ox', 'Snake', 'Rooster'],      // Metal trinity
  ['Tiger', 'Horse', 'Dog'],       // Fire trinity
  ['Rabbit', 'Goat', 'Pig'],       // Wood trinity
];

/**
 * Zodiac Six Harmonies (六合) - Perfect pairs
 */
export const ZODIAC_HARMONY_PAIRS: [ZodiacAnimal, ZodiacAnimal][] = [
  ['Rat', 'Ox'],
  ['Tiger', 'Pig'],
  ['Rabbit', 'Dog'],
  ['Dragon', 'Rooster'],
  ['Snake', 'Monkey'],
  ['Horse', 'Goat'],
];

/**
 * Zodiac clashes (相冲) - Conflicting pairs
 */
export const ZODIAC_CLASH_PAIRS: [ZodiacAnimal, ZodiacAnimal][] = [
  ['Rat', 'Horse'],
  ['Ox', 'Goat'],
  ['Tiger', 'Monkey'],
  ['Rabbit', 'Rooster'],
  ['Dragon', 'Dog'],
  ['Snake', 'Pig'],
];

/**
 * Zodiac harms (相害) - Harmful pairs
 */
export const ZODIAC_HARM_PAIRS: [ZodiacAnimal, ZodiacAnimal][] = [
  ['Rat', 'Goat'],
  ['Ox', 'Horse'],
  ['Tiger', 'Snake'],
  ['Rabbit', 'Dragon'],
  ['Monkey', 'Pig'],
  ['Rooster', 'Dog'],
];

/**
 * Get zodiac relationship between two animals
 */
export const getZodiacRelationship = (
  animal1: ZodiacAnimal,
  animal2: ZodiacAnimal
): ZodiacRelationship => {
  if (animal1 === animal2) return 'Neutral';

  // Check trinity
  const inSameTrinity = ZODIAC_TRINITY.some(
    trinity => trinity.includes(animal1) && trinity.includes(animal2)
  );
  if (inSameTrinity) return 'Perfect Match';

  // Check harmony pairs
  const isHarmonyPair = ZODIAC_HARMONY_PAIRS.some(
    ([a, b]) => (a === animal1 && b === animal2) || (a === animal2 && b === animal1)
  );
  if (isHarmonyPair) return 'Perfect Match';

  // Check clash
  const isClash = ZODIAC_CLASH_PAIRS.some(
    ([a, b]) => (a === animal1 && b === animal2) || (a === animal2 && b === animal1)
  );
  if (isClash) return 'Clash';

  // Check harm
  const isHarm = ZODIAC_HARM_PAIRS.some(
    ([a, b]) => (a === animal1 && b === animal2) || (a === animal2 && b === animal1)
  );
  if (isHarm) return 'Harm';

  return 'Good Match';
};

// ============================================================================
// COMPATIBILITY THRESHOLDS
// ============================================================================

/**
 * Score ranges for compatibility ratings
 */
export const COMPATIBILITY_THRESHOLDS = {
  EXCELLENT: 85,       // 85-100
  VERY_GOOD: 70,       // 70-84
  GOOD: 55,            // 55-69
  FAIR: 40,            // 40-54
  CHALLENGING: 0,      // 0-39
} as const;

/**
 * Scoring weights for compatibility calculation
 */
export const COMPATIBILITY_WEIGHTS = {
  ELEMENT: 0.40,        // 40% - Element compatibility
  ZODIAC: 0.30,         // 30% - Zodiac compatibility
  DAY_PILLAR: 0.20,     // 20% - Day pillar (most important for relationships)
  BALANCE: 0.10,        // 10% - How well the charts balance each other
} as const;

/**
 * Minimum compatibility score to show as a match
 */
export const MIN_MATCH_SCORE = 40;

/**
 * Excellent match threshold for special highlighting
 */
export const EXCELLENT_MATCH_THRESHOLD = 85;

// ============================================================================
// APP CONFIGURATION
// ============================================================================

/**
 * User profile limits
 */
export const PROFILE_LIMITS = {
  MIN_AGE: 18,
  MAX_AGE: 100,
  MAX_PHOTOS: 6,
  MIN_PHOTOS: 1,
  MAX_BIO_LENGTH: 500,
  MAX_NAME_LENGTH: 50,
} as const;

/**
 * Matching preferences limits
 */
export const MATCHING_LIMITS = {
  MIN_DISTANCE_KM: 5,
  MAX_DISTANCE_KM: 500,
  DEFAULT_DISTANCE_KM: 50,
  MIN_AGE_RANGE: 3,
  MAX_AGE_RANGE: 50,
} as const;

/**
 * Discovery settings
 */
export const DISCOVERY_SETTINGS = {
  CARDS_PER_BATCH: 10,
  PRELOAD_COUNT: 3,
  MAX_DAILY_SWIPES: 100,      // Free tier limit
  SUPERLIKE_DAILY_LIMIT: 1,   // Free tier limit
} as const;

/**
 * Animation durations (milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  CARD_SWIPE: 400,
  FADE: 250,
} as const;

// ============================================================================
// SPACING & LAYOUT
// ============================================================================

/**
 * Spacing scale
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Border radius
 */
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/**
 * Font sizes
 */
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// ============================================================================
// HEAVENLY STEMS & EARTHLY BRANCHES
// ============================================================================

/**
 * Heavenly Stems with their elements
 */
export const HEAVENLY_STEMS = {
  Jia: { element: 'Wood' as FiveElement, polarity: 'Yang' },
  Yi: { element: 'Wood' as FiveElement, polarity: 'Yin' },
  Bing: { element: 'Fire' as FiveElement, polarity: 'Yang' },
  Ding: { element: 'Fire' as FiveElement, polarity: 'Yin' },
  Wu: { element: 'Earth' as FiveElement, polarity: 'Yang' },
  Ji: { element: 'Earth' as FiveElement, polarity: 'Yin' },
  Geng: { element: 'Metal' as FiveElement, polarity: 'Yang' },
  Xin: { element: 'Metal' as FiveElement, polarity: 'Yin' },
  Ren: { element: 'Water' as FiveElement, polarity: 'Yang' },
  Gui: { element: 'Water' as FiveElement, polarity: 'Yin' },
} as const;

/**
 * Earthly Branches with their elements and zodiac animals
 */
export const EARTHLY_BRANCHES = {
  Zi: { element: 'Water' as FiveElement, zodiac: 'Rat' as ZodiacAnimal },
  Chou: { element: 'Earth' as FiveElement, zodiac: 'Ox' as ZodiacAnimal },
  Yin: { element: 'Wood' as FiveElement, zodiac: 'Tiger' as ZodiacAnimal },
  Mao: { element: 'Wood' as FiveElement, zodiac: 'Rabbit' as ZodiacAnimal },
  Chen: { element: 'Earth' as FiveElement, zodiac: 'Dragon' as ZodiacAnimal },
  Si: { element: 'Fire' as FiveElement, zodiac: 'Snake' as ZodiacAnimal },
  Wu: { element: 'Fire' as FiveElement, zodiac: 'Horse' as ZodiacAnimal },
  Wei: { element: 'Earth' as FiveElement, zodiac: 'Goat' as ZodiacAnimal },
  Shen: { element: 'Metal' as FiveElement, zodiac: 'Monkey' as ZodiacAnimal },
  You: { element: 'Metal' as FiveElement, zodiac: 'Rooster' as ZodiacAnimal },
  Xu: { element: 'Earth' as FiveElement, zodiac: 'Dog' as ZodiacAnimal },
  Hai: { element: 'Water' as FiveElement, zodiac: 'Pig' as ZodiacAnimal },
} as const;

// ============================================================================
// API CONFIGURATION
// ============================================================================

/**
 * API endpoints (to be configured based on environment)
 */
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  BAZI: '/bazi',
  MATCHES: '/matches',
  MESSAGES: '/messages',
  DISCOVERY: '/discovery',
} as const;

/**
 * API timeout settings
 */
export const API_TIMEOUT = {
  DEFAULT: 10000,       // 10 seconds
  UPLOAD: 30000,        // 30 seconds for photo uploads
  CALCULATION: 5000,    // 5 seconds for BaZi calculations
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

/**
 * User-friendly error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_IN_USE: 'This email is already registered.',
  INVALID_BIRTH_DATA: 'Please enter valid birth information.',
  CALCULATION_FAILED: 'Unable to calculate your destiny chart. Please try again.',
  PROFILE_INCOMPLETE: 'Please complete your profile to continue.',
  NO_MATCHES: 'No more matches available. Check back later!',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ELEMENT_COLORS,
  ELEMENT_GRADIENTS,
  COLORS_LIGHT,
  COLORS_DARK,
  ZODIAC_ANIMALS,
  ZODIAC_TRAITS,
  FIVE_ELEMENTS,
  ELEMENT_PERSONALITIES,
  COMPATIBILITY_THRESHOLDS,
  COMPATIBILITY_WEIGHTS,
  PROFILE_LIMITS,
  MATCHING_LIMITS,
  DISCOVERY_SETTINGS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  API_ENDPOINTS,
  ERROR_MESSAGES,
};
