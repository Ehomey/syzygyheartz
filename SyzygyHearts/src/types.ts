/**
 * Syzygy Hearts - Core Type Definitions
 *
 * This file contains all shared TypeScript types and interfaces used across the app.
 * All agents should import types from this central location.
 */

// ============================================================================
// ASTROLOGY TYPES
// ============================================================================

/**
 * The Five Elements (Wu Xing) in Chinese philosophy
 */
export type FiveElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

/**
 * The 12 Chinese Zodiac Animals
 */
export type ZodiacAnimal =
  | 'Rat'
  | 'Ox'
  | 'Tiger'
  | 'Rabbit'
  | 'Dragon'
  | 'Snake'
  | 'Horse'
  | 'Goat'
  | 'Monkey'
  | 'Rooster'
  | 'Dog'
  | 'Pig';

/**
 * The 10 Heavenly Stems (Tian Gan)
 */
export type HeavenlyStem =
  | 'Jia' | 'Yi'      // Wood
  | 'Bing' | 'Ding'   // Fire
  | 'Wu' | 'Ji'       // Earth
  | 'Geng' | 'Xin'    // Metal
  | 'Ren' | 'Gui';    // Water

/**
 * The 12 Earthly Branches (Di Zhi)
 */
export type EarthlyBranch =
  | 'Zi' | 'Chou' | 'Yin' | 'Mao'
  | 'Chen' | 'Si' | 'Wu' | 'Wei'
  | 'Shen' | 'You' | 'Xu' | 'Hai';

/**
 * Polarity in Chinese cosmology
 */
export type Polarity = 'Yin' | 'Yang';

/**
 * A single pillar in the Four Pillars (BaZi) system
 */
export interface Pillar {
  heavenlyStem: HeavenlyStem;
  earthlyBranch: EarthlyBranch;
  stemElement: FiveElement;
  branchElement: FiveElement;
  hiddenElements: FiveElement[];
}

/**
 * The Four Pillars of Destiny (BaZi Chart)
 */
export interface FourPillars {
  year: Pillar;   // Year Pillar (年柱) - Ancestral influence
  month: Pillar;  // Month Pillar (月柱) - Parents influence
  day: Pillar;    // Day Pillar (日柱) - Self & spouse
  hour: Pillar;   // Hour Pillar (时柱) - Children & legacy
}

/**
 * Element balance in a BaZi chart
 */
export interface ElementBalance {
  Wood: number;
  Fire: number;
  Earth: number;
  Metal: number;
  Water: number;
}

/**
 * Complete BaZi (Four Pillars) Chart
 */
export interface BaZiChart {
  id: string;
  userId: string;
  fourPillars: FourPillars;
  elementBalance: ElementBalance;
  dominantElement: FiveElement;
  weakestElement: FiveElement;
  luckyElements: FiveElement[];
  unluckyElements: FiveElement[];
  zodiacAnimal: ZodiacAnimal;
  dayMasterElement: FiveElement;  // The element of day stem (most important)
  dayMasterPolarity: Polarity;
  calculatedAt: Date;
}

// ============================================================================
// BIRTH DATA TYPES
// ============================================================================

/**
 * User's birth information for BaZi calculation
 */
export interface BirthData {
  dateOfBirth: string;        // ISO 8601 format: YYYY-MM-DD
  timeOfBirth: string;        // 24-hour format: HH:MM
  placeOfBirth: string;       // City name
  timezone: string;           // e.g., "America/New_York"
  latitude?: number;          // Optional for precise calculations
  longitude?: number;         // Optional for precise calculations
  isTimeUnknown?: boolean;    // If true, use noon as default
}

/**
 * Gender options
 */
export type Gender = 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';

// ============================================================================
// USER PROFILE TYPES
// ============================================================================

/**
 * User preferences for matching
 */
export interface MatchPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  distance: number;           // in kilometers
  genderPreference: Gender[];
  elementPreference?: FiveElement[];
  zodiacPreference?: ZodiacAnimal[];
  minCompatibilityScore?: number;
}

/**
 * Complete user profile
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: Gender;
  photos: string[];           // Array of image URLs
  bio: string;
  location: {
    city: string;
    state?: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  birthData: BirthData;
  baziChart?: BaZiChart;      // Calculated chart
  preferences: MatchPreferences;
  isProfileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
}

// ============================================================================
// COMPATIBILITY TYPES
// ============================================================================

/**
 * Compatibility rating levels
 */
export type CompatibilityRating =
  | 'Excellent'      // 85-100
  | 'Very Good'      // 70-84
  | 'Good'           // 55-69
  | 'Fair'           // 40-54
  | 'Challenging';   // 0-39

/**
 * Element relationship types
 */
export type ElementRelationship =
  | 'Productive'     // Generating cycle (生)
  | 'Destructive'    // Controlling cycle (克)
  | 'Weakening'      // Draining
  | 'Same'           // Same element
  | 'Neutral';       // No strong relationship

/**
 * Zodiac relationship types
 */
export type ZodiacRelationship =
  | 'Perfect Match'  // 三合/六合 (Trinity/Harmony)
  | 'Good Match'     // Compatible
  | 'Neutral'        // No strong connection
  | 'Clash'          // 相冲 (Conflicting)
  | 'Harm';          // 相害 (Harmful)

/**
 * Detailed compatibility breakdown
 */
export interface CompatibilityBreakdown {
  elementScore: number;           // 0-100
  elementRelationship: ElementRelationship;
  elementInsight: string;

  zodiacScore: number;            // 0-100
  zodiacRelationship: ZodiacRelationship;
  zodiacInsight: string;

  dayPillarScore: number;         // 0-100 (most important for relationships)
  dayPillarInsight: string;

  yearPillarScore: number;        // 0-100
  yearPillarInsight: string;

  balanceScore: number;           // 0-100 (how well charts balance each other)
  balanceInsight: string;
}

/**
 * Complete compatibility result between two users
 */
export interface CompatibilityResult {
  id: string;
  user1Id: string;
  user2Id: string;
  overallScore: number;           // Weighted average: 0-100
  rating: CompatibilityRating;
  breakdown: CompatibilityBreakdown;
  strengths: string[];            // Positive aspects
  challenges: string[];           // Areas of potential conflict
  advice: string[];               // Relationship guidance
  calculatedAt: Date;
}

// ============================================================================
// DESTINY READING TYPES
// ============================================================================

/**
 * Fortune period (Luck Pillar / 大运)
 */
export interface LuckPillar {
  pillar: Pillar;
  startAge: number;
  endAge: number;
  element: FiveElement;
  isFavorable: boolean;
  description: string;
}

/**
 * Daily fortune reading
 */
export interface DailyFortune {
  date: string;                   // ISO 8601 date
  overallLuck: number;            // 0-100
  loveScore: number;              // 0-100
  careerScore: number;            // 0-100
  healthScore: number;            // 0-100
  wealthScore: number;            // 0-100
  luckyElement: FiveElement;
  luckyColor: string;
  luckyNumber: number;
  advice: string;
  warning?: string;
}

/**
 * Personality traits derived from BaZi
 */
export interface PersonalityTraits {
  dominantTraits: string[];       // Based on day master element
  strengths: string[];
  weaknesses: string[];
  loveStyle: string;
  careerFit: string[];
  compatibleTypes: string[];
}

/**
 * Complete destiny reading
 */
export interface DestinyReading {
  userId: string;
  baziChart: BaZiChart;
  personalityTraits: PersonalityTraits;
  currentLuckPillar?: LuckPillar;
  nextLuckPillar?: LuckPillar;
  lifePhases: LuckPillar[];
  dailyFortune?: DailyFortune;
  yearlyFortune?: {
    year: number;
    element: FiveElement;
    outlook: string;
    score: number;
  };
  generatedAt: Date;
}

// ============================================================================
// MATCHING & DISCOVERY TYPES
// ============================================================================

/**
 * Swipe action types
 */
export type SwipeAction = 'like' | 'pass' | 'superlike';

/**
 * Match status
 */
export type MatchStatus = 'pending' | 'matched' | 'unmatched' | 'blocked';

/**
 * A potential match card
 */
export interface DiscoveryCard {
  user: UserProfile;
  compatibilityScore?: number;
  distanceKm?: number;
  previewInsight: string;         // Quick compatibility insight
  isOnline: boolean;
}

/**
 * A confirmed match between two users
 */
export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  user1: UserProfile;
  user2: UserProfile;
  compatibility: CompatibilityResult;
  status: MatchStatus;
  matchedAt: Date;
  lastMessageAt?: Date;
  unreadCount: number;
}

/**
 * Swipe interaction record
 */
export interface SwipeInteraction {
  id: string;
  fromUserId: string;
  toUserId: string;
  action: SwipeAction;
  timestamp: Date;
}

// ============================================================================
// MESSAGING TYPES
// ============================================================================

/**
 * Message type
 */
export type MessageType = 'text' | 'image' | 'destiny_share' | 'compatibility_share';

/**
 * Chat message
 */
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  type: MessageType;
  content: string;
  metadata?: {
    destinyReadingId?: string;
    compatibilityResultId?: string;
    imageUrl?: string;
  };
  isRead: boolean;
  sentAt: Date;
  readAt?: Date;
}

/**
 * Conversation/Chat
 */
export interface Conversation {
  matchId: string;
  participants: [UserProfile, UserProfile];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

/**
 * Stack navigation params for type-safe navigation
 */
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  BirthDataInput: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Discovery: undefined;
  Matches: undefined;
  Destiny: undefined;
  Profile: undefined;
};

export type DiscoveryStackParamList = {
  DiscoveryHome: undefined;
  ProfileDetail: { userId: string };
  CompatibilityDetail: { userId: string; compatibilityId?: string };
};

export type MatchesStackParamList = {
  MatchesList: undefined;
  Chat: { matchId: string };
  MatchCompatibility: { matchId: string };
};

export type DestinyStackParamList = {
  DestinyDashboard: undefined;
  DetailedReading: undefined;
  DailyFortune: undefined;
  LuckPillars: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  EditBirthData: undefined;
  Settings: undefined;
  Preferences: undefined;
};

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

/**
 * Auth state
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Signup data
 */
export interface SignupData {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
}

// ============================================================================
// THEME TYPES
// ============================================================================

/**
 * Color palette
 */
export interface ColorPalette {
  // Element colors
  wood: string;
  fire: string;
  earth: string;
  metal: string;
  water: string;

  // UI colors
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;

  // Gradients
  gradient: {
    primary: string[];
    secondary: string[];
  };
}

/**
 * Theme configuration
 */
export interface Theme {
  mode: 'light' | 'dark';
  colors: ColorPalette;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    body: TextStyle;
    caption: TextStyle;
  };
}

/**
 * Text style configuration
 */
export interface TextStyle {
  fontSize: number;
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  lineHeight?: number;
  letterSpacing?: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Loading state wrapper
 */
export interface LoadingState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Form validation error
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * App configuration
 */
export interface AppConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  enableAnalytics: boolean;
  enableCrashReporting: boolean;
  maxPhotos: number;
  minAge: number;
  maxAge: number;
  maxDistance: number;
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Re-export all types for convenient importing
 */
export type {
  // Core already exported above
};

/**
 * Type guards for runtime checking
 */
export const isFiveElement = (value: any): value is FiveElement => {
  return ['Wood', 'Fire', 'Earth', 'Metal', 'Water'].includes(value);
};

export const isZodiacAnimal = (value: any): value is ZodiacAnimal => {
  return ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
          'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'].includes(value);
};

export const isCompatibilityRating = (value: any): value is CompatibilityRating => {
  return ['Excellent', 'Very Good', 'Good', 'Fair', 'Challenging'].includes(value);
};
