/**
 * Conversation Prompts for Chat Screen
 * Astrology-themed prompts based on Chinese zodiac and Five Elements compatibility
 */

import { Element } from './elementsCycle';
import { ChineseZodiac } from './zodiacData';

export enum PromptType {
  ELEMENT = 'element',
  ZODIAC = 'zodiac',
  GENERAL = 'general',
  COMPLEMENTARY = 'complementary'
}

export interface ConversationPrompt {
  id: string;
  type: PromptType;
  text: string;
  targetElement?: Element;
  targetZodiac?: ChineseZodiac;
  elementPair?: [Element, Element]; // For complementary element prompts
}

// Element-specific prompts
export const ELEMENT_PROMPTS: Record<Element, ConversationPrompt[]> = {
  [Element.WOOD]: [
    {
      id: 'wood_1',
      type: PromptType.ELEMENT,
      text: "What creative project are you most excited about right now?",
      targetElement: Element.WOOD
    },
    {
      id: 'wood_2',
      type: PromptType.ELEMENT,
      text: "How do you nurture your personal growth?",
      targetElement: Element.WOOD
    },
    {
      id: 'wood_3',
      type: PromptType.ELEMENT,
      text: "What new skill or hobby would you love to explore?",
      targetElement: Element.WOOD
    },
    {
      id: 'wood_4',
      type: PromptType.ELEMENT,
      text: "Tell me about a time when flexibility helped you succeed",
      targetElement: Element.WOOD
    },
    {
      id: 'wood_5',
      type: PromptType.ELEMENT,
      text: "What kind of environment helps you feel most creative?",
      targetElement: Element.WOOD
    }
  ],
  [Element.FIRE]: [
    {
      id: 'fire_1',
      type: PromptType.ELEMENT,
      text: "What sparks your passion and creativity?",
      targetElement: Element.FIRE
    },
    {
      id: 'fire_2',
      type: PromptType.ELEMENT,
      text: "Tell me about a time you took a bold risk",
      targetElement: Element.FIRE
    },
    {
      id: 'fire_3',
      type: PromptType.ELEMENT,
      text: "What drives your ambition?",
      targetElement: Element.FIRE
    },
    {
      id: 'fire_4',
      type: PromptType.ELEMENT,
      text: "How do you channel your energy when you're excited about something?",
      targetElement: Element.FIRE
    },
    {
      id: 'fire_5',
      type: PromptType.ELEMENT,
      text: "What makes you feel truly alive and inspired?",
      targetElement: Element.FIRE
    }
  ],
  [Element.EARTH]: [
    {
      id: 'earth_1',
      type: PromptType.ELEMENT,
      text: "What traditions or routines bring you comfort?",
      targetElement: Element.EARTH
    },
    {
      id: 'earth_2',
      type: PromptType.ELEMENT,
      text: "How do you create stability in your life?",
      targetElement: Element.EARTH
    },
    {
      id: 'earth_3',
      type: PromptType.ELEMENT,
      text: "What does 'home' mean to you?",
      targetElement: Element.EARTH
    },
    {
      id: 'earth_4',
      type: PromptType.ELEMENT,
      text: "Tell me about someone you've nurtured or supported",
      targetElement: Element.EARTH
    },
    {
      id: 'earth_5',
      type: PromptType.ELEMENT,
      text: "What long-term goal are you patiently working toward?",
      targetElement: Element.EARTH
    }
  ],
  [Element.METAL]: [
    {
      id: 'metal_1',
      type: PromptType.ELEMENT,
      text: "What principles or values guide your decisions?",
      targetElement: Element.METAL
    },
    {
      id: 'metal_2',
      type: PromptType.ELEMENT,
      text: "How do you maintain discipline in pursuing your goals?",
      targetElement: Element.METAL
    },
    {
      id: 'metal_3',
      type: PromptType.ELEMENT,
      text: "What achievement are you most proud of?",
      targetElement: Element.METAL
    },
    {
      id: 'metal_4',
      type: PromptType.ELEMENT,
      text: "How do you approach solving complex problems?",
      targetElement: Element.METAL
    },
    {
      id: 'metal_5',
      type: PromptType.ELEMENT,
      text: "What does excellence mean to you?",
      targetElement: Element.METAL
    }
  ],
  [Element.WATER]: [
    {
      id: 'water_1',
      type: PromptType.ELEMENT,
      text: "What do you do when you need to recharge?",
      targetElement: Element.WATER
    },
    {
      id: 'water_2',
      type: PromptType.ELEMENT,
      text: "How do you process your deepest emotions?",
      targetElement: Element.WATER
    },
    {
      id: 'water_3',
      type: PromptType.ELEMENT,
      text: "What kind of wisdom have you gained from difficult times?",
      targetElement: Element.WATER
    },
    {
      id: 'water_4',
      type: PromptType.ELEMENT,
      text: "How do you adapt to unexpected changes?",
      targetElement: Element.WATER
    },
    {
      id: 'water_5',
      type: PromptType.ELEMENT,
      text: "What helps you connect with your intuition?",
      targetElement: Element.WATER
    }
  ]
};

// Zodiac-specific prompts
export const ZODIAC_PROMPTS: Record<ChineseZodiac, ConversationPrompt[]> = {
  [ChineseZodiac.RAT]: [
    {
      id: 'rat_1',
      type: PromptType.ZODIAC,
      text: "What opportunity did you spot that others might have missed?",
      targetZodiac: ChineseZodiac.RAT
    },
    {
      id: 'rat_2',
      type: PromptType.ZODIAC,
      text: "How do you use your resourcefulness in everyday life?",
      targetZodiac: ChineseZodiac.RAT
    }
  ],
  [ChineseZodiac.OX]: [
    {
      id: 'ox_1',
      type: PromptType.ZODIAC,
      text: "What's something you've worked steadily toward for a long time?",
      targetZodiac: ChineseZodiac.OX
    },
    {
      id: 'ox_2',
      type: PromptType.ZODIAC,
      text: "How do you stay committed when things get challenging?",
      targetZodiac: ChineseZodiac.OX
    }
  ],
  [ChineseZodiac.TIGER]: [
    {
      id: 'tiger_1',
      type: PromptType.ZODIAC,
      text: "What's the most courageous thing you've ever done?",
      targetZodiac: ChineseZodiac.TIGER
    },
    {
      id: 'tiger_2',
      type: PromptType.ZODIAC,
      text: "How do you lead and inspire others?",
      targetZodiac: ChineseZodiac.TIGER
    }
  ],
  [ChineseZodiac.RABBIT]: [
    {
      id: 'rabbit_1',
      type: PromptType.ZODIAC,
      text: "What brings harmony and peace to your life?",
      targetZodiac: ChineseZodiac.RABBIT
    },
    {
      id: 'rabbit_2',
      type: PromptType.ZODIAC,
      text: "How do you express your artistic or creative side?",
      targetZodiac: ChineseZodiac.RABBIT
    }
  ],
  [ChineseZodiac.DRAGON]: [
    {
      id: 'dragon_1',
      type: PromptType.ZODIAC,
      text: "What ambitious goal are you pursuing right now?",
      targetZodiac: ChineseZodiac.DRAGON
    },
    {
      id: 'dragon_2',
      type: PromptType.ZODIAC,
      text: "Tell me about a time your charisma helped you succeed",
      targetZodiac: ChineseZodiac.DRAGON
    }
  ],
  [ChineseZodiac.SNAKE]: [
    {
      id: 'snake_1',
      type: PromptType.ZODIAC,
      text: "What's the deepest insight you've gained about yourself?",
      targetZodiac: ChineseZodiac.SNAKE
    },
    {
      id: 'snake_2',
      type: PromptType.ZODIAC,
      text: "How do you trust your intuition in important decisions?",
      targetZodiac: ChineseZodiac.SNAKE
    }
  ],
  [ChineseZodiac.HORSE]: [
    {
      id: 'horse_1',
      type: PromptType.ZODIAC,
      text: "What adventure are you dreaming of next?",
      targetZodiac: ChineseZodiac.HORSE
    },
    {
      id: 'horse_2',
      type: PromptType.ZODIAC,
      text: "How do you balance freedom with commitment?",
      targetZodiac: ChineseZodiac.HORSE
    }
  ],
  [ChineseZodiac.GOAT]: [
    {
      id: 'goat_1',
      type: PromptType.ZODIAC,
      text: "What creative expression means the most to you?",
      targetZodiac: ChineseZodiac.GOAT
    },
    {
      id: 'goat_2',
      type: PromptType.ZODIAC,
      text: "How do you nurture the people you care about?",
      targetZodiac: ChineseZodiac.GOAT
    }
  ],
  [ChineseZodiac.MONKEY]: [
    {
      id: 'monkey_1',
      type: PromptType.ZODIAC,
      text: "What's the cleverest solution you've come up with recently?",
      targetZodiac: ChineseZodiac.MONKEY
    },
    {
      id: 'monkey_2',
      type: PromptType.ZODIAC,
      text: "How do you keep life fun and exciting?",
      targetZodiac: ChineseZodiac.MONKEY
    }
  ],
  [ChineseZodiac.ROOSTER]: [
    {
      id: 'rooster_1',
      type: PromptType.ZODIAC,
      text: "What details do others often overlook that you notice?",
      targetZodiac: ChineseZodiac.ROOSTER
    },
    {
      id: 'rooster_2',
      type: PromptType.ZODIAC,
      text: "How do you maintain your high standards?",
      targetZodiac: ChineseZodiac.ROOSTER
    }
  ],
  [ChineseZodiac.DOG]: [
    {
      id: 'dog_1',
      type: PromptType.ZODIAC,
      text: "What does loyalty mean to you in relationships?",
      targetZodiac: ChineseZodiac.DOG
    },
    {
      id: 'dog_2',
      type: PromptType.ZODIAC,
      text: "How do you stand up for what you believe in?",
      targetZodiac: ChineseZodiac.DOG
    }
  ],
  [ChineseZodiac.PIG]: [
    {
      id: 'pig_1',
      type: PromptType.ZODIAC,
      text: "What simple pleasures bring you the most joy?",
      targetZodiac: ChineseZodiac.PIG
    },
    {
      id: 'pig_2',
      type: PromptType.ZODIAC,
      text: "How do you spread generosity and kindness?",
      targetZodiac: ChineseZodiac.PIG
    }
  ]
};

// Complementary element prompts (for different element pairings)
export const COMPLEMENTARY_PROMPTS: ConversationPrompt[] = [
  // Water-Fire balance
  {
    id: 'comp_water_fire_1',
    type: PromptType.COMPLEMENTARY,
    text: "How do you balance intensity with calm?",
    elementPair: [Element.WATER, Element.FIRE]
  },
  {
    id: 'comp_water_fire_2',
    type: PromptType.COMPLEMENTARY,
    text: "What have you learned from people who approach life differently than you?",
    elementPair: [Element.WATER, Element.FIRE]
  },
  // Wood-Metal balance
  {
    id: 'comp_wood_metal_1',
    type: PromptType.COMPLEMENTARY,
    text: "How do you blend flexibility with structure?",
    elementPair: [Element.WOOD, Element.METAL]
  },
  {
    id: 'comp_wood_metal_2',
    type: PromptType.COMPLEMENTARY,
    text: "What's your approach to balancing spontaneity and planning?",
    elementPair: [Element.WOOD, Element.METAL]
  },
  // Earth-Water balance
  {
    id: 'comp_earth_water_1',
    type: PromptType.COMPLEMENTARY,
    text: "How do you stay grounded while remaining adaptable?",
    elementPair: [Element.EARTH, Element.WATER]
  },
  {
    id: 'comp_earth_water_2',
    type: PromptType.COMPLEMENTARY,
    text: "What helps you balance stability with going with the flow?",
    elementPair: [Element.EARTH, Element.WATER]
  },
  // Fire-Earth balance
  {
    id: 'comp_fire_earth_1',
    type: PromptType.COMPLEMENTARY,
    text: "How do you channel your energy into lasting results?",
    elementPair: [Element.FIRE, Element.EARTH]
  },
  {
    id: 'comp_fire_earth_2',
    type: PromptType.COMPLEMENTARY,
    text: "What's your secret to maintaining passion while building something solid?",
    elementPair: [Element.FIRE, Element.EARTH]
  },
  // Metal-Water balance
  {
    id: 'comp_metal_water_1',
    type: PromptType.COMPLEMENTARY,
    text: "How do you combine logic with intuition?",
    elementPair: [Element.METAL, Element.WATER]
  },
  {
    id: 'comp_metal_water_2',
    type: PromptType.COMPLEMENTARY,
    text: "What's your approach to balancing discipline with emotional depth?",
    elementPair: [Element.METAL, Element.WATER]
  }
];

// General relationship-building prompts
export const GENERAL_PROMPTS: ConversationPrompt[] = [
  {
    id: 'gen_1',
    type: PromptType.GENERAL,
    text: "What's one thing that always makes you smile?"
  },
  {
    id: 'gen_2',
    type: PromptType.GENERAL,
    text: "If you could have dinner with anyone, living or historical, who would it be?"
  },
  {
    id: 'gen_3',
    type: PromptType.GENERAL,
    text: "What's your idea of a perfect weekend?"
  },
  {
    id: 'gen_4',
    type: PromptType.GENERAL,
    text: "What's something you're grateful for today?"
  },
  {
    id: 'gen_5',
    type: PromptType.GENERAL,
    text: "What kind of legacy do you want to leave?"
  },
  {
    id: 'gen_6',
    type: PromptType.GENERAL,
    text: "What's the best advice you've ever received?"
  },
  {
    id: 'gen_7',
    type: PromptType.GENERAL,
    text: "What makes you feel most connected to others?"
  },
  {
    id: 'gen_8',
    type: PromptType.GENERAL,
    text: "How do you celebrate your wins, big or small?"
  },
  {
    id: 'gen_9',
    type: PromptType.GENERAL,
    text: "What's a childhood memory that still influences you?"
  },
  {
    id: 'gen_10',
    type: PromptType.GENERAL,
    text: "What are you learning about yourself lately?"
  }
];

/**
 * Get prompts based on compatibility between two elements
 */
export function getPromptsForElementPair(
  userElement: Element,
  matchElement: Element
): ConversationPrompt[] {
  const prompts: ConversationPrompt[] = [];

  // Add element-specific prompts for match
  prompts.push(...ELEMENT_PROMPTS[matchElement].slice(0, 2));

  // Add complementary prompts if elements are different
  if (userElement !== matchElement) {
    const complementary = COMPLEMENTARY_PROMPTS.filter(p => {
      if (!p.elementPair) return false;
      const [e1, e2] = p.elementPair;
      return (e1 === userElement && e2 === matchElement) ||
             (e1 === matchElement && e2 === userElement);
    });
    prompts.push(...complementary);
  }

  // Add some general prompts
  prompts.push(...GENERAL_PROMPTS.slice(0, 3));

  return prompts;
}

/**
 * Get prompts based on zodiac sign
 */
export function getPromptsForZodiac(zodiac: ChineseZodiac): ConversationPrompt[] {
  return ZODIAC_PROMPTS[zodiac] || [];
}

/**
 * Get daily connection tip based on elements
 */
export function getDailyConnectionTip(userElement: Element, matchElement: Element): string {
  const tips: Record<string, string> = {
    // Same elements
    'Wood-Wood': "Two Wood souls grow together - share your visions and support each other's creativity.",
    'Fire-Fire': "Twin flames burn bright - channel your shared passion into meaningful experiences.",
    'Earth-Earth': "Grounded together - build something lasting with patience and care.",
    'Metal-Metal': "Precision meets precision - appreciate each other's dedication to excellence.",
    'Water-Water': "Deep calls to deep - create space for emotional honesty and vulnerability.",

    // Generating cycle (harmonious)
    'Wood-Fire': "Wood feeds Fire - your growth inspires their passion. Share your creative ideas.",
    'Fire-Earth': "Fire creates Earth - your energy grounds into stability together. Celebrate wins.",
    'Earth-Metal': "Earth contains Metal - your nurturing supports their discipline. Be patient.",
    'Metal-Water': "Metal enriches Water - your structure provides clarity to their depths. Listen deeply.",
    'Water-Wood': "Water nourishes Wood - your wisdom fuels their growth. Encourage dreams.",

    // Being generated (also harmonious)
    'Fire-Wood': "Fire draws from Wood - let their creativity inspire your enthusiasm. Stay curious.",
    'Earth-Fire': "Earth is shaped by Fire - embrace their energy to build something real. Take action.",
    'Metal-Earth': "Metal forms in Earth - their stability supports your precision. Trust the process.",
    'Water-Metal': "Water flows from Metal - their clarity channels your intuition. Share feelings.",
    'Wood-Water': "Wood grows from Water - their depth nourishes your expansion. Be grateful.",

    // Challenging combinations
    'Wood-Metal': "Wood meets Metal - balance flexibility with structure. Find common ground.",
    'Metal-Wood': "Metal cuts Wood - appreciate differences. Their precision can refine your ideas.",
    'Fire-Water': "Fire and Water - intensity meets calm. Create space for both passion and peace.",
    'Water-Fire': "Water meets Fire - your depth balances their heat. Embrace the contrast.",
    'Earth-Wood': "Earth and Wood - stability meets growth. Support their expansion while staying grounded.",
    'Wood-Earth': "Wood draws from Earth - your growth needs their support. Express gratitude.",
    'Metal-Fire': "Metal meets Fire - transformation ahead. Let passion reshape your boundaries.",
    'Fire-Metal': "Fire melts Metal - your intensity can soften their edges. Be gentle.",
    'Water-Earth': "Water and Earth - flow meets form. Find harmony between change and stability.",
    'Earth-Water': "Earth dams Water - your stability can contain their depths. Create safe space."
  };

  const key = `${userElement}-${matchElement}`;
  return tips[key] || "Every connection is a chance to learn and grow together.";
}
