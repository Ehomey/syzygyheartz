/**
 * Five Elements (Wu Xing) System
 * Determines elements from birth data and calculates element-based compatibility
 */

import {
  Element,
  ELEMENT_ATTRIBUTES,
  ElementAttributes,
  GENERATING_CYCLE,
  CONTROLLING_CYCLE,
  ELEMENT_COMPATIBILITY,
  getElementRelationship,
  ElementRelationship,
  getElementCompatibilityScore,
  areElementsHarmonious
} from '../data/elementsCycle';

/**
 * Determine element from birth year
 * Each element rules for 2 consecutive years in the cycle
 * The pattern repeats every 10 years
 */
export function getElementFromYear(year: number): Element {
  // The cycle starts with Metal in years ending in 0-1
  // Based on the last digit of the year
  const lastDigit = year % 10;

  switch (lastDigit) {
    case 0:
    case 1:
      return Element.METAL;
    case 2:
    case 3:
      return Element.WATER;
    case 4:
    case 5:
      return Element.WOOD;
    case 6:
    case 7:
      return Element.FIRE;
    case 8:
    case 9:
      return Element.EARTH;
    default:
      return Element.EARTH;
  }
}

/**
 * Determine Yin or Yang aspect of the element
 * Even years are Yang, odd years are Yin
 */
export function getYinYang(year: number): 'Yin' | 'Yang' {
  return year % 2 === 0 ? 'Yang' : 'Yin';
}

/**
 * Get full element with Yin/Yang designation
 * e.g., "Yang Wood", "Yin Fire"
 */
export function getFullElement(year: number): string {
  const element = getElementFromYear(year);
  const yinYang = getYinYang(year);
  return `${yinYang} ${element}`;
}

/**
 * Determine element from birth month (for more detailed readings)
 * Based on Chinese seasonal associations
 */
export function getElementFromMonth(month: number): Element {
  // Spring months (Feb-Apr): Wood
  if (month >= 2 && month <= 4) return Element.WOOD;

  // Summer months (May-Jul): Fire
  if (month >= 5 && month <= 7) return Element.FIRE;

  // Autumn months (Aug-Oct): Metal
  if (month >= 8 && month <= 10) return Element.METAL;

  // Winter months (Nov-Jan): Water
  if (month === 11 || month === 12 || month === 1) return Element.WATER;

  // Earth (transition months, though not used in this simple calculation)
  return Element.EARTH;
}

/**
 * Determine element from birth hour (for BaZi calculations)
 * Each element rules specific hours of the day
 */
export function getElementFromHour(hour: number): Element {
  // 23-01: Water
  if (hour === 23 || hour === 0) return Element.WATER;

  // 01-03: Water
  if (hour >= 1 && hour < 3) return Element.WATER;

  // 03-05: Wood
  if (hour >= 3 && hour < 5) return Element.WOOD;

  // 05-07: Wood
  if (hour >= 5 && hour < 7) return Element.WOOD;

  // 07-09: Earth
  if (hour >= 7 && hour < 9) return Element.EARTH;

  // 09-11: Fire
  if (hour >= 9 && hour < 11) return Element.FIRE;

  // 11-13: Fire
  if (hour >= 11 && hour < 13) return Element.FIRE;

  // 13-15: Earth
  if (hour >= 13 && hour < 15) return Element.EARTH;

  // 15-17: Metal
  if (hour >= 15 && hour < 17) return Element.METAL;

  // 17-19: Metal
  if (hour >= 17 && hour < 19) return Element.METAL;

  // 19-21: Earth
  if (hour >= 19 && hour < 21) return Element.EARTH;

  // 21-23: Water
  if (hour >= 21 && hour < 23) return Element.WATER;

  return Element.EARTH;
}

/**
 * Get element attributes
 */
export function getElementAttributes(element: Element): ElementAttributes {
  return ELEMENT_ATTRIBUTES[element];
}

/**
 * Calculate element balance from multiple elements
 * Used in BaZi Four Pillars analysis
 */
export interface ElementBalance {
  elements: Record<Element, number>;
  dominant: Element;
  weak: Element[];
  balanced: boolean;
}

export function calculateElementBalance(elements: Element[]): ElementBalance {
  const counts: Record<Element, number> = {
    [Element.WOOD]: 0,
    [Element.FIRE]: 0,
    [Element.EARTH]: 0,
    [Element.METAL]: 0,
    [Element.WATER]: 0
  };

  // Count occurrences of each element
  elements.forEach(element => {
    counts[element]++;
  });

  // Find dominant element
  let dominant = Element.EARTH;
  let maxCount = 0;
  Object.entries(counts).forEach(([element, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = element as Element;
    }
  });

  // Find weak elements (count of 0 or 1 when there are 4+ elements)
  const weak: Element[] = [];
  if (elements.length >= 4) {
    Object.entries(counts).forEach(([element, count]) => {
      if (count <= 1) {
        weak.push(element as Element);
      }
    });
  }

  // Check if balanced (no element appears more than twice when there are 4+ elements)
  const balanced = elements.length >= 4 ? maxCount <= 2 : true;

  return {
    elements: counts,
    dominant,
    weak,
    balanced
  };
}

/**
 * Get element that needs strengthening based on balance
 */
export function getElementToStrengthen(balance: ElementBalance): Element | null {
  // If one element is very weak or missing, it should be strengthened
  if (balance.weak.length > 0) {
    // Return the first weak element that would be beneficial
    // Prefer elements that generate the dominant element or control it if too strong
    const dominant = balance.dominant;

    // If dominant element is too strong (appears 3+ times), strengthen its controlling element
    if (balance.elements[dominant] >= 3) {
      const controllingElement = Object.entries(CONTROLLING_CYCLE).find(
        ([_, controlled]) => controlled === dominant
      )?.[0] as Element | undefined;

      if (controllingElement && balance.weak.includes(controllingElement)) {
        return controllingElement;
      }
    }

    // Otherwise, strengthen element that generates dominant element
    const generatingElement = Object.entries(GENERATING_CYCLE).find(
      ([_, generated]) => generated === dominant
    )?.[0] as Element | undefined;

    if (generatingElement && balance.weak.includes(generatingElement)) {
      return generatingElement;
    }

    // Default to first weak element
    return balance.weak[0];
  }

  return null;
}

/**
 * Calculate element compatibility between two people
 */
export interface ElementCompatibilityResult {
  score: number;
  relationship: ElementRelationship;
  harmonious: boolean;
  description: string;
  advice: string;
}

export function calculateElementCompatibility(
  element1: Element,
  element2: Element
): ElementCompatibilityResult {
  const score = getElementCompatibilityScore(element1, element2);
  const relationship = getElementRelationship(element1, element2);
  const harmonious = areElementsHarmonious(element1, element2);

  let description = '';
  let advice = '';

  switch (relationship) {
    case ElementRelationship.SAME:
      description = `Both partners share ${element1} energy, creating deep understanding and similar approaches to life.`;
      advice = 'Embrace your similarities but ensure you maintain individual growth and don\'t become too set in your ways.';
      break;

    case ElementRelationship.GENERATING:
      description = `${element1} generates ${element2}, creating a naturally supportive and nourishing dynamic where one partner energizes the other.`;
      advice = 'The generating partner should be mindful not to give too much, while the receiving partner should show appreciation and reciprocate.';
      break;

    case ElementRelationship.BEING_GENERATED:
      description = `${element2} generates ${element1}, providing natural support and nourishment to the relationship.`;
      advice = 'Show gratitude for the support received and find ways to give back to maintain balance in the relationship.';
      break;

    case ElementRelationship.CONTROLLING:
      description = `${element1} controls ${element2}, which can create structure but may also lead to feelings of restriction.`;
      advice = 'The controlling partner should practice flexibility, while the controlled partner should communicate their needs clearly.';
      break;

    case ElementRelationship.BEING_CONTROLLED:
      description = `${element2} controls ${element1}, requiring conscious effort to maintain balance and mutual respect.`;
      advice = 'Focus on finding the positive aspects of this dynamic - structure and boundaries can be beneficial when balanced with freedom.';
      break;
  }

  return {
    score,
    relationship,
    harmonious,
    description,
    advice
  };
}

/**
 * Determine if two people have complementary elements
 * Complementary means they balance each other's element profiles
 */
export function haveComplementaryElements(
  balance1: ElementBalance,
  balance2: ElementBalance
): boolean {
  // Check if one person's dominant element generates the other's
  if (GENERATING_CYCLE[balance1.dominant] === balance2.dominant) {
    return true;
  }
  if (GENERATING_CYCLE[balance2.dominant] === balance1.dominant) {
    return true;
  }

  // Check if one person's weak element is the other's strong element
  const person1Strong = balance1.dominant;
  const person2Strong = balance2.dominant;

  if (balance2.weak.includes(person1Strong) || balance1.weak.includes(person2Strong)) {
    return true;
  }

  return false;
}

/**
 * Get element harmony score between two element balances
 * Considers how well the element profiles complement each other
 */
export function getElementHarmonyScore(
  balance1: ElementBalance,
  balance2: ElementBalance
): number {
  let score = 50; // Base score

  // Bonus if dominant elements are compatible
  const dominantCompatibility = getElementCompatibilityScore(balance1.dominant, balance2.dominant);
  score += (dominantCompatibility - 50) * 0.5;

  // Bonus if they have complementary elements
  if (haveComplementaryElements(balance1, balance2)) {
    score += 15;
  }

  // Bonus if both are balanced
  if (balance1.balanced && balance2.balanced) {
    score += 10;
  }

  // Slight bonus if one can help balance the other
  if (!balance1.balanced && balance2.weak.length === 0) {
    score += 5;
  }
  if (!balance2.balanced && balance1.weak.length === 0) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Get recommended activities or colors based on element
 */
export function getElementRecommendations(element: Element): {
  colors: string[];
  activities: string[];
  foods: string[];
} {
  const attributes = ELEMENT_ATTRIBUTES[element];

  const recommendations: Record<Element, { activities: string[]; foods: string[] }> = {
    [Element.WOOD]: {
      activities: ['Nature walks', 'Gardening', 'Creative projects', 'Morning activities'],
      foods: ['Green vegetables', 'Sprouts', 'Sour foods', 'Spring foods']
    },
    [Element.FIRE]: {
      activities: ['Dancing', 'Social events', 'Outdoor activities', 'Passionate pursuits'],
      foods: ['Spicy foods', 'Red foods', 'Bitter foods', 'Barbecue']
    },
    [Element.EARTH]: {
      activities: ['Cooking', 'Building projects', 'Meditation', 'Grounding activities'],
      foods: ['Root vegetables', 'Sweet foods', 'Yellow foods', 'Grains']
    },
    [Element.METAL]: {
      activities: ['Organization', 'Precision work', 'Autumn activities', 'Structured exercise'],
      foods: ['White foods', 'Pungent foods', 'Rice', 'Protein-rich foods']
    },
    [Element.WATER]: {
      activities: ['Swimming', 'Reflection', 'Winter activities', 'Intuitive practices'],
      foods: ['Seafood', 'Salty foods', 'Black foods', 'Soups and liquids']
    }
  };

  return {
    colors: attributes.color,
    activities: recommendations[element].activities,
    foods: recommendations[element].foods
  };
}
