/**
 * Five Elements (Wu Xing) Cycles and Relationships
 * The foundation of Chinese metaphysics and compatibility
 */

export enum Element {
  WOOD = 'Wood',
  FIRE = 'Fire',
  EARTH = 'Earth',
  METAL = 'Metal',
  WATER = 'Water'
}

export interface ElementAttributes {
  element: Element;
  chineseName: string;
  direction: string;
  season: string;
  color: string[];
  personality: string[];
  yin: boolean;
}

export const ELEMENT_ATTRIBUTES: Record<Element, ElementAttributes> = {
  [Element.WOOD]: {
    element: Element.WOOD,
    chineseName: '木',
    direction: 'East',
    season: 'Spring',
    color: ['Green', 'Teal'],
    personality: ['Creative', 'Expansive', 'Growing', 'Flexible', 'Social'],
    yin: false
  },
  [Element.FIRE]: {
    element: Element.FIRE,
    chineseName: '火',
    direction: 'South',
    season: 'Summer',
    color: ['Red', 'Orange', 'Purple'],
    personality: ['Passionate', 'Dynamic', 'Transformative', 'Charismatic', 'Energetic'],
    yin: false
  },
  [Element.EARTH]: {
    element: Element.EARTH,
    chineseName: '土',
    direction: 'Center',
    season: 'Late Summer',
    color: ['Yellow', 'Brown', 'Beige'],
    personality: ['Stable', 'Nurturing', 'Reliable', 'Patient', 'Grounded'],
    yin: true
  },
  [Element.METAL]: {
    element: Element.METAL,
    chineseName: '金',
    direction: 'West',
    season: 'Autumn',
    color: ['White', 'Gold', 'Silver'],
    personality: ['Precise', 'Disciplined', 'Strong', 'Righteous', 'Determined'],
    yin: true
  },
  [Element.WATER]: {
    element: Element.WATER,
    chineseName: '水',
    direction: 'North',
    season: 'Winter',
    color: ['Black', 'Blue', 'Navy'],
    personality: ['Flowing', 'Adaptive', 'Intuitive', 'Reflective', 'Deep'],
    yin: true
  }
};

/**
 * Generating (Productive) Cycle - Sheng Cycle
 * Each element generates/nourishes the next:
 * Wood → Fire → Earth → Metal → Water → Wood
 */
export const GENERATING_CYCLE: Record<Element, Element> = {
  [Element.WOOD]: Element.FIRE,    // Wood feeds Fire
  [Element.FIRE]: Element.EARTH,   // Fire creates Earth (ash)
  [Element.EARTH]: Element.METAL,  // Earth contains Metal
  [Element.METAL]: Element.WATER,  // Metal enriches Water
  [Element.WATER]: Element.WOOD    // Water nourishes Wood
};

/**
 * Controlling (Overcoming) Cycle - Ke Cycle
 * Each element controls/weakens another:
 * Wood → Earth → Water → Fire → Metal → Wood
 */
export const CONTROLLING_CYCLE: Record<Element, Element> = {
  [Element.WOOD]: Element.EARTH,   // Wood depletes Earth
  [Element.EARTH]: Element.WATER,  // Earth dams Water
  [Element.WATER]: Element.FIRE,   // Water extinguishes Fire
  [Element.FIRE]: Element.METAL,   // Fire melts Metal
  [Element.METAL]: Element.WOOD    // Metal cuts Wood
};

/**
 * Weakening (Being Generated From) Cycle - Reverse of Generating
 * Each element is weakened by generating another:
 */
export const WEAKENING_CYCLE: Record<Element, Element> = {
  [Element.FIRE]: Element.WOOD,    // Fire weakens Wood
  [Element.EARTH]: Element.FIRE,   // Earth weakens Fire
  [Element.METAL]: Element.EARTH,  // Metal weakens Earth
  [Element.WATER]: Element.METAL,  // Water weakens Metal
  [Element.WOOD]: Element.WATER    // Wood weakens Water
};

/**
 * Insulting (Being Controlled By) Cycle - Reverse of Controlling
 * When an element becomes too strong, it can insult/overwhelm its controller:
 */
export const INSULTING_CYCLE: Record<Element, Element> = {
  [Element.EARTH]: Element.WOOD,   // Earth insults Wood
  [Element.WATER]: Element.EARTH,  // Water insults Earth
  [Element.FIRE]: Element.WATER,   // Fire insults Water
  [Element.METAL]: Element.FIRE,   // Metal insults Fire
  [Element.WOOD]: Element.METAL    // Wood insults Metal
};

/**
 * Element Compatibility Scores
 * Based on the five element relationships
 */
export const ELEMENT_COMPATIBILITY: Record<Element, Record<Element, number>> = {
  [Element.WOOD]: {
    [Element.WOOD]: 70,   // Same element - understanding but can compete
    [Element.FIRE]: 95,   // Generating - Wood feeds Fire (very harmonious)
    [Element.EARTH]: 30,  // Controlling - Wood depletes Earth (challenging)
    [Element.METAL]: 25,  // Being controlled - Metal cuts Wood (difficult)
    [Element.WATER]: 85   // Being generated - Water nourishes Wood (harmonious)
  },
  [Element.FIRE]: {
    [Element.WOOD]: 85,   // Being generated - Wood feeds Fire
    [Element.FIRE]: 68,   // Same element - passionate but can burn out
    [Element.EARTH]: 93,  // Generating - Fire creates Earth
    [Element.METAL]: 28,  // Controlling - Fire melts Metal
    [Element.WATER]: 20   // Being controlled - Water extinguishes Fire
  },
  [Element.EARTH]: {
    [Element.WOOD]: 25,   // Being controlled - Wood depletes Earth
    [Element.FIRE]: 87,   // Being generated - Fire creates Earth
    [Element.EARTH]: 72,  // Same element - stable and grounded
    [Element.METAL]: 94,  // Generating - Earth contains Metal
    [Element.WATER]: 32   // Controlling - Earth dams Water
  },
  [Element.METAL]: {
    [Element.WOOD]: 30,   // Controlling - Metal cuts Wood
    [Element.FIRE]: 22,   // Being controlled - Fire melts Metal
    [Element.EARTH]: 86,  // Being generated - Earth contains Metal
    [Element.METAL]: 66,  // Same element - strong but rigid
    [Element.WATER]: 92   // Generating - Metal enriches Water
  },
  [Element.WATER]: {
    [Element.WOOD]: 90,   // Generating - Water nourishes Wood
    [Element.FIRE]: 26,   // Controlling - Water extinguishes Fire
    [Element.EARTH]: 28,  // Being controlled - Earth dams Water
    [Element.METAL]: 88,  // Being generated - Metal enriches Water
    [Element.WATER]: 74   // Same element - deep understanding, can be overwhelming
  }
};

/**
 * Get the relationship type between two elements
 */
export enum ElementRelationship {
  SAME = 'Same Element',
  GENERATING = 'Generating',
  BEING_GENERATED = 'Being Generated',
  CONTROLLING = 'Controlling',
  BEING_CONTROLLED = 'Being Controlled'
}

export function getElementRelationship(element1: Element, element2: Element): ElementRelationship {
  if (element1 === element2) {
    return ElementRelationship.SAME;
  }
  if (GENERATING_CYCLE[element1] === element2) {
    return ElementRelationship.GENERATING;
  }
  if (GENERATING_CYCLE[element2] === element1) {
    return ElementRelationship.BEING_GENERATED;
  }
  if (CONTROLLING_CYCLE[element1] === element2) {
    return ElementRelationship.CONTROLLING;
  }
  return ElementRelationship.BEING_CONTROLLED;
}

/**
 * Get element compatibility score
 */
export function getElementCompatibilityScore(element1: Element, element2: Element): number {
  return ELEMENT_COMPATIBILITY[element1][element2];
}

/**
 * Determine if elements are harmonious (score >= 70)
 */
export function areElementsHarmonious(element1: Element, element2: Element): boolean {
  return ELEMENT_COMPATIBILITY[element1][element2] >= 70;
}

/**
 * Get description of element relationship
 */
export function getRelationshipDescription(relationship: ElementRelationship): string {
  switch (relationship) {
    case ElementRelationship.SAME:
      return 'Share the same nature and understanding, though may compete for resources';
    case ElementRelationship.GENERATING:
      return 'One naturally supports and nourishes the other - highly harmonious';
    case ElementRelationship.BEING_GENERATED:
      return 'One receives natural support and nourishment - harmonious relationship';
    case ElementRelationship.CONTROLLING:
      return 'One naturally controls the other - can be challenging without balance';
    case ElementRelationship.BEING_CONTROLLED:
      return 'One is naturally controlled by the other - requires effort and understanding';
  }
}
