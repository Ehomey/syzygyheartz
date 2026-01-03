/**
 * Syzygy Hearts - Astrology Type Definitions
 * SINGLE SOURCE OF TRUTH for all astrology-related types
 */

// ============================================================================
// FIVE ELEMENTS (Wu Xing)
// ============================================================================

/**
 * The Five Elements in Chinese philosophy
 */
export type FiveElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

/**
 * Element interaction relationships
 */
export type ElementRelationship =
  | 'generating'   // Sheng cycle - nurtures
  | 'controlling'  // Ke cycle - controls
  | 'weakening'    // Reverse generating
  | 'insulting'    // Reverse controlling
  | 'same';        // Same element

// ============================================================================
// CHINESE ZODIAC
// ============================================================================

/**
 * The 12 Chinese Zodiac Animals
 */
export type ZodiacAnimal =
  | 'Rat' | 'Ox' | 'Tiger' | 'Rabbit'
  | 'Dragon' | 'Snake' | 'Horse' | 'Goat'
  | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';

/**
 * Zodiac compatibility relationships
 */
export type ZodiacRelationship =
  | 'allies'       // San He - Triangle harmony
  | 'secret'       // Liu He - Secret friend
  | 'clash'        // Chong - Direct clash
  | 'harm'         // Hai - Harm relationship
  | 'neutral';

// ============================================================================
// HEAVENLY STEMS & EARTHLY BRANCHES
// ============================================================================

/**
 * The 10 Heavenly Stems (Tian Gan)
 */
export type HeavenlyStem =
  | 'Jia' | 'Yi'      // Wood (Yang/Yin)
  | 'Bing' | 'Ding'   // Fire (Yang/Yin)
  | 'Wu' | 'Ji'       // Earth (Yang/Yin)
  | 'Geng' | 'Xin'    // Metal (Yang/Yin)
  | 'Ren' | 'Gui';    // Water (Yang/Yin)

/**
 * The 12 Earthly Branches (Di Zhi)
 */
export type EarthlyBranch =
  | 'Zi' | 'Chou' | 'Yin' | 'Mao'
  | 'Chen' | 'Si' | 'Wu' | 'Wei'
  | 'Shen' | 'You' | 'Xu' | 'Hai';

/**
 * Yin/Yang polarity
 */
export type Polarity = 'Yin' | 'Yang';

// ============================================================================
// BAZI (FOUR PILLARS)
// ============================================================================

/**
 * A single pillar in the Four Pillars system
 */
export interface Pillar {
  heavenlyStem: HeavenlyStem;
  earthlyBranch: EarthlyBranch;
  stemElement: FiveElement;
  branchElement: FiveElement;
  stemPolarity: Polarity;
  zodiac: ZodiacAnimal;
  hiddenStems?: HeavenlyStem[];
}

/**
 * Complete BaZi (Four Pillars) Chart
 */
export interface BaZiChart {
  year: Pillar;      // Year Pillar - Ancestral influence
  month: Pillar;     // Month Pillar - Parents/career
  day: Pillar;       // Day Pillar - Self & spouse
  hour: Pillar;      // Hour Pillar - Children/legacy

  dayMasterElement: FiveElement;  // The "self" element
  dayMasterPolarity: Polarity;

  elementBalance: Record<FiveElement, number>;
  dominantElement: FiveElement;
  weakestElement: FiveElement;
}

/**
 * Element balance analysis
 */
export interface ElementBalance {
  Wood: number;
  Fire: number;
  Earth: number;
  Metal: number;
  Water: number;
  total: number;
}

// ============================================================================
// COMPATIBILITY
// ============================================================================

/**
 * Compatibility analysis result
 */
export interface CompatibilityResult {
  overallScore: number;           // 0-100

  // Component scores
  dayMasterHarmony: number;       // Day Master element compatibility
  elementBalance: number;         // Combined element balance
  zodiacHarmony: number;          // Zodiac relationships

  // Detailed analysis
  strengths: string[];
  challenges: string[];
  advice: string;

  // Relationship indicators
  romanticScore: number;
  friendshipScore: number;
  businessScore: number;
}

/**
 * Match profile with compatibility info
 */
export interface MatchProfile {
  id: string;
  name: string;
  age: number;

  // Astrology data
  zodiacAnimal: ZodiacAnimal;
  dayMasterElement: FiveElement;
  baziChart?: BaZiChart;

  // Compatibility with current user
  compatibility?: CompatibilityResult;
  yuanFenScore: number;  // "Destined connection" score

  // Profile data
  bio?: string;
  photos?: string[];
  location?: string;
}

// ============================================================================
// AUSPICIOUS TIMING
// ============================================================================

/**
 * Auspicious time period
 */
export interface AuspiciousTime {
  startHour: number;
  endHour: number;
  branch: EarthlyBranch;
  element: FiveElement;
  quality: 'excellent' | 'good' | 'neutral' | 'avoid';
  activities: string[];
}

/**
 * Daily insight based on BaZi
 */
export interface DailyInsight {
  date: string;
  dayElement: FiveElement;
  dayZodiac: ZodiacAnimal;
  generalAdvice: string;
  loveAdvice: string;
  luckyHours: AuspiciousTime[];
  luckyColors: string[];
  luckyNumbers: number[];
}
