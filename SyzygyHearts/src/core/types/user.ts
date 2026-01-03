/**
 * Syzygy Hearts - User Type Definitions
 * SINGLE SOURCE OF TRUTH for all user-related types
 */

import { BaZiChart, ZodiacAnimal, FiveElement } from './astrology';

// ============================================================================
// BIRTH DATA
// ============================================================================

/**
 * User's birth information for BaZi calculation
 */
export interface BirthData {
  date: string;        // ISO date string: "YYYY-MM-DD"
  time: string;        // 24-hour format: "HH:MM"
  location: string;    // City, Country
  timezone?: string;   // IANA timezone
  latitude?: number;
  longitude?: number;
}

// ============================================================================
// USER PROFILE
// ============================================================================

/**
 * User gender for matching preferences
 */
export type Gender = 'male' | 'female' | 'non-binary' | 'other';

/**
 * User's matching preferences
 */
export interface MatchPreferences {
  genderPreference: Gender[];
  ageRange: {
    min: number;
    max: number;
  };
  maxDistance?: number;  // in kilometers
  elementPreferences?: FiveElement[];
  zodiacPreferences?: ZodiacAnimal[];
}

/**
 * User profile status
 */
export type ProfileStatus = 'incomplete' | 'active' | 'paused' | 'banned';

/**
 * Complete user profile
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: Gender;

  // Birth & astrology
  birthData: BirthData;
  baziChart?: BaZiChart;
  zodiacAnimal?: ZodiacAnimal;
  dayMasterElement?: FiveElement;

  // Profile content
  bio?: string;
  photos: string[];
  interests?: string[];

  // Location
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };

  // Preferences & settings
  preferences: MatchPreferences;
  notificationSettings?: NotificationSettings;

  // Status
  status: ProfileStatus;
  isVerified: boolean;
  isPremium: boolean;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}

// ============================================================================
// SETTINGS
// ============================================================================

/**
 * Notification preferences
 */
export interface NotificationSettings {
  matches: boolean;
  messages: boolean;
  dailyHoroscope: boolean;
  auspiciousTimes: boolean;
  promotions: boolean;
}

/**
 * App settings
 */
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
  privacy: {
    showOnlineStatus: boolean;
    showLastActive: boolean;
    showBirthChart: boolean;
  };
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token: string | null;
  error: string | null;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  birthData: BirthData;
  gender: Gender;
}

// ============================================================================
// ONBOARDING
// ============================================================================

/**
 * Onboarding progress tracking
 */
export interface OnboardingState {
  completed: boolean;
  currentStep: OnboardingStep;
  birthDataEntered: boolean;
  permissionsGranted: boolean;
  profileCompleted: boolean;
}

export type OnboardingStep =
  | 'welcome'
  | 'birth-input'
  | 'permissions'
  | 'profile-setup'
  | 'completed';
