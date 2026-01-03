/**
 * Syzygy Hearts - Core Constants
 * Re-exports all constants from a single entry point
 *
 * Usage: import { COLORS, ELEMENT_ATTRIBUTES } from '@/core/constants';
 */

// Colors
export {
  BRAND_COLORS,
  ELEMENT_COLORS,
  ELEMENT_GRADIENTS,
  ELEMENT_TEXT_COLORS,
  SEMANTIC_COLORS,
  UI_COLORS,
  COLORS,
  getCompatibilityColor,
  getElementColor,
  getElementTextColor,
  getElementGradient,
} from './colors';

// Elements & Astrology
export {
  // Cycles
  GENERATING_CYCLE,
  CONTROLLING_CYCLE,
  WEAKENING_CYCLE,
  getElementRelationship,

  // Attributes
  ELEMENT_ATTRIBUTES,
  ZODIAC_ATTRIBUTES,

  // Stem & Branch mappings
  STEM_ELEMENTS,
  STEM_CHINESE,
  BRANCH_ELEMENTS,
  BRANCH_CHINESE,
  BRANCH_ZODIAC,

  // Ordered lists
  ELEMENTS_ORDER,
  STEMS_ORDER,
  BRANCHES_ORDER,
  ZODIAC_ORDER,
} from './elements';

export type { ElementAttributes, ZodiacAttributes } from './elements';
