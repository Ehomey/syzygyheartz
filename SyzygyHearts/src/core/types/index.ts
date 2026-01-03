/**
 * Syzygy Hearts - Core Type Definitions
 * Re-exports all types from a single entry point
 *
 * Usage: import { FiveElement, UserProfile, Message } from '@/core/types';
 */

// Astrology types
export type {
  FiveElement,
  ElementRelationship,
  ZodiacAnimal,
  ZodiacRelationship,
  HeavenlyStem,
  EarthlyBranch,
  Polarity,
  Pillar,
  BaZiChart,
  ElementBalance,
  CompatibilityResult,
  MatchProfile,
  AuspiciousTime,
  DailyInsight,
} from './astrology';

// User types
export type {
  BirthData,
  Gender,
  MatchPreferences,
  ProfileStatus,
  UserProfile,
  NotificationSettings,
  AppSettings,
  AuthState,
  LoginCredentials,
  RegistrationData,
  OnboardingState,
  OnboardingStep,
} from './user';

// Messaging types
export type {
  MatchStatus,
  Match,
  MessageType,
  MessageStatus,
  Message,
  Conversation,
  ConversationWithDetails,
  IcebreakerCategory,
  Icebreaker,
  NotificationType,
  AppNotification,
} from './messaging';
