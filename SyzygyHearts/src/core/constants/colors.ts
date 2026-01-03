/**
 * Syzygy Hearts - Color Constants
 * SINGLE SOURCE OF TRUTH for all colors in the app
 *
 * Chinese-inspired palette with Five Elements integration
 */

import { FiveElement } from '../types';

// ============================================================================
// BRAND COLORS
// ============================================================================

/**
 * Primary brand colors - Chinese-inspired palette
 */
export const BRAND_COLORS = {
  // Primary
  chineseRed: '#C41E3A',       // Primary action color (Chinese lucky red)
  imperialGold: '#FFD700',      // Secondary accent (Imperial gold)
  jadeGreen: '#00A86B',         // Success/positive accent

  // Backgrounds
  inkBlack: '#1C1C1C',          // Primary background
  charcoal: '#2A2A2A',          // Surface/card background
  darkCharcoal: '#333333',      // Elevated surface

  // Text
  creamWhite: '#FFFDD0',        // Primary text
  pearl: '#F5F5F5',             // Secondary text
  silver: '#999999',            // Muted text
  ash: '#666666',               // Disabled text
} as const;

// ============================================================================
// ELEMENT COLORS
// ============================================================================

/**
 * Five Elements color palette
 */
export const ELEMENT_COLORS: Record<FiveElement, string> = {
  Wood: '#00A86B',    // Jade green - growth, vitality
  Fire: '#C41E3A',    // Chinese red - passion, energy
  Earth: '#CC7722',   // Ochre/amber - stability, grounding
  Metal: '#E8E8E8',   // Silver/white - strength, precision
  Water: '#003366',   // Deep blue - flow, wisdom
} as const;

/**
 * Element gradient colors for visual effects
 */
export const ELEMENT_GRADIENTS: Record<FiveElement, readonly [string, string, string]> = {
  Wood: ['#008B5C', '#00A86B', '#2ECC71'],
  Fire: ['#A01830', '#C41E3A', '#E74C3C'],
  Earth: ['#A65F1A', '#CC7722', '#E8A838'],
  Metal: ['#C0C0C0', '#E8E8E8', '#FFFFFF'],
  Water: ['#002244', '#003366', '#004488'],
} as const;

/**
 * Element text colors (for use on element backgrounds)
 */
export const ELEMENT_TEXT_COLORS: Record<FiveElement, string> = {
  Wood: '#FFFFFF',
  Fire: '#FFFFFF',
  Earth: '#1C1C1C',
  Metal: '#1C1C1C',
  Water: '#FFFFFF',
} as const;

// ============================================================================
// SEMANTIC COLORS
// ============================================================================

/**
 * Semantic/status colors
 */
export const SEMANTIC_COLORS = {
  // Status
  success: '#00A86B',           // Same as jade
  error: '#C41E3A',             // Same as chinese red
  warning: '#FFD700',           // Same as imperial gold
  info: '#3498DB',              // Info blue

  // Actions
  like: '#00A86B',              // Swipe right / accept
  pass: '#666666',              // Swipe left / pass
  superLike: '#FFD700',         // Super like

  // Compatibility scores
  excellent: '#00A86B',         // 85-100 - jade green
  veryGood: '#3498DB',          // 70-84 - blue
  good: '#FFD700',              // 55-69 - gold
  fair: '#CC7722',              // 40-54 - amber
  challenging: '#C41E3A',       // 0-39 - red
} as const;

// ============================================================================
// UI COLORS
// ============================================================================

/**
 * UI component colors
 */
export const UI_COLORS = {
  // Borders
  border: '#333333',
  borderLight: '#444444',
  borderAccent: '#FFD70040',    // Gold with transparency

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',

  // Shadows
  shadow: '#000000',

  // Input
  inputBackground: '#2A2A2A',
  inputBorder: '#444444',
  inputFocusBorder: '#FFD700',
  placeholder: '#666666',
} as const;

// ============================================================================
// THEME (Combined)
// ============================================================================

/**
 * Complete dark theme (default for this app)
 */
export const COLORS = {
  ...BRAND_COLORS,
  ...SEMANTIC_COLORS,
  ...UI_COLORS,

  // Element shortcuts
  elementWood: ELEMENT_COLORS.Wood,
  elementFire: ELEMENT_COLORS.Fire,
  elementEarth: ELEMENT_COLORS.Earth,
  elementMetal: ELEMENT_COLORS.Metal,
  elementWater: ELEMENT_COLORS.Water,

  // Legacy aliases (for gradual migration from old code)
  primary: BRAND_COLORS.inkBlack,
  secondary: BRAND_COLORS.charcoal,
  accent: BRAND_COLORS.chineseRed,
  gold: BRAND_COLORS.imperialGold,
  white: BRAND_COLORS.creamWhite,
  gray: BRAND_COLORS.ash,
  lightGray: BRAND_COLORS.pearl,
  darkGray: BRAND_COLORS.darkCharcoal,
} as const;

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Get color for a compatibility score
 */
export function getCompatibilityColor(score: number): string {
  if (score >= 85) return SEMANTIC_COLORS.excellent;
  if (score >= 70) return SEMANTIC_COLORS.veryGood;
  if (score >= 55) return SEMANTIC_COLORS.good;
  if (score >= 40) return SEMANTIC_COLORS.fair;
  return SEMANTIC_COLORS.challenging;
}

/**
 * Get color for an element
 */
export function getElementColor(element: FiveElement): string {
  return ELEMENT_COLORS[element];
}

/**
 * Get text color for use on element background
 */
export function getElementTextColor(element: FiveElement): string {
  return ELEMENT_TEXT_COLORS[element];
}

/**
 * Get gradient colors for an element
 */
export function getElementGradient(element: FiveElement): readonly [string, string, string] {
  return ELEMENT_GRADIENTS[element];
}
