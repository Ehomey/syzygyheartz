/**
 * Syzygy Hearts - Messaging Type Definitions
 * SINGLE SOURCE OF TRUTH for all messaging-related types
 */

import { UserProfile } from './user';
import { CompatibilityResult } from './astrology';

// ============================================================================
// MATCHES
// ============================================================================

/**
 * Match status
 */
export type MatchStatus = 'pending' | 'matched' | 'unmatched' | 'blocked';

/**
 * A match between two users
 */
export interface Match {
  id: string;
  users: [string, string];  // User IDs
  status: MatchStatus;
  compatibility: CompatibilityResult;
  yuanFenScore: number;
  matchedAt: string;
  lastMessageAt?: string;
}

// ============================================================================
// MESSAGES
// ============================================================================

/**
 * Message types
 */
export type MessageType =
  | 'text'
  | 'image'
  | 'voice'
  | 'bazi-share'      // Sharing BaZi chart
  | 'red-envelope'    // Lucky red envelope
  | 'icebreaker';     // Suggested conversation starter

/**
 * Message delivery status
 */
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

/**
 * A single message
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string;
  status: MessageStatus;
  createdAt: string;
  readAt?: string;

  // Optional attachments
  imageUrl?: string;
  voiceUrl?: string;
  duration?: number;  // For voice messages

  // Red envelope data
  redEnvelope?: {
    amount: number;
    message: string;
    claimed: boolean;
  };
}

// ============================================================================
// CONVERSATIONS
// ============================================================================

/**
 * A conversation between matched users
 */
export interface Conversation {
  id: string;
  matchId: string;
  participants: [string, string];  // User IDs

  // Last message preview
  lastMessage?: Message;
  lastMessageAt?: string;

  // Unread tracking
  unreadCount: number;

  // Status
  isActive: boolean;
  isPinned: boolean;
  isMuted: boolean;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

/**
 * Conversation with participant details (for list display)
 */
export interface ConversationWithDetails extends Conversation {
  otherUser: UserProfile;
  compatibility: CompatibilityResult;
}

// ============================================================================
// ICEBREAKERS
// ============================================================================

/**
 * Icebreaker categories
 */
export type IcebreakerCategory =
  | 'zodiac'
  | 'element'
  | 'destiny'
  | 'general'
  | 'fun';

/**
 * An icebreaker prompt
 */
export interface Icebreaker {
  id: string;
  category: IcebreakerCategory;
  question: string;
  chineseText?: string;  // Optional Chinese translation
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

/**
 * In-app notification types
 */
export type NotificationType =
  | 'new-match'
  | 'new-message'
  | 'red-envelope'
  | 'daily-horoscope'
  | 'auspicious-time'
  | 'profile-view';

/**
 * An in-app notification
 */
export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}
