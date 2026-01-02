/**
 * Auspicious Timing Data
 *
 * Contains mappings of elements to favorable activities and insight templates
 * based on Chinese hour system (shichen) and Five Elements theory.
 */

import { FiveElement } from '../types';

/**
 * Chinese Hour System (Shichen) - 12 two-hour periods
 * Each hour is associated with an element
 */
export interface ChineseHour {
  name: string;           // Chinese name (Pinyin)
  chineseName: string;    // Chinese characters
  startHour: number;      // 24-hour format (0-23)
  endHour: number;        // 24-hour format (0-23)
  element: FiveElement;
  earthlyBranch: string;
}

export const CHINESE_HOURS: ChineseHour[] = [
  {
    name: 'Zi',
    chineseName: '子时',
    startHour: 23,
    endHour: 1,
    element: 'Water',
    earthlyBranch: 'Zi',
  },
  {
    name: 'Chou',
    chineseName: '丑时',
    startHour: 1,
    endHour: 3,
    element: 'Earth',
    earthlyBranch: 'Chou',
  },
  {
    name: 'Yin',
    chineseName: '寅时',
    startHour: 3,
    endHour: 5,
    element: 'Wood',
    earthlyBranch: 'Yin',
  },
  {
    name: 'Mao',
    chineseName: '卯时',
    startHour: 5,
    endHour: 7,
    element: 'Wood',
    earthlyBranch: 'Mao',
  },
  {
    name: 'Chen',
    chineseName: '辰时',
    startHour: 7,
    endHour: 9,
    element: 'Earth',
    earthlyBranch: 'Chen',
  },
  {
    name: 'Si',
    chineseName: '巳时',
    startHour: 9,
    endHour: 11,
    element: 'Fire',
    earthlyBranch: 'Si',
  },
  {
    name: 'Wu',
    chineseName: '午时',
    startHour: 11,
    endHour: 13,
    element: 'Fire',
    earthlyBranch: 'Wu',
  },
  {
    name: 'Wei',
    chineseName: '未时',
    startHour: 13,
    endHour: 15,
    element: 'Earth',
    earthlyBranch: 'Wei',
  },
  {
    name: 'Shen',
    chineseName: '申时',
    startHour: 15,
    endHour: 17,
    element: 'Metal',
    earthlyBranch: 'Shen',
  },
  {
    name: 'You',
    chineseName: '酉时',
    startHour: 17,
    endHour: 19,
    element: 'Metal',
    earthlyBranch: 'You',
  },
  {
    name: 'Xu',
    chineseName: '戌时',
    startHour: 19,
    endHour: 21,
    element: 'Earth',
    earthlyBranch: 'Xu',
  },
  {
    name: 'Hai',
    chineseName: '亥时',
    startHour: 21,
    endHour: 23,
    element: 'Water',
    earthlyBranch: 'Hai',
  },
];

/**
 * Favorable activities for each element
 */
export const ELEMENT_ACTIVITIES: Record<FiveElement, {
  favorable: string[];
  unfavorable: string[];
  communication: string;
  energy: string;
}> = {
  Wood: {
    favorable: [
      'Creative conversations',
      'Planning future dates',
      'Outdoor activities',
      'Starting new relationships',
      'Brainstorming together',
    ],
    unfavorable: [
      'Making final commitments',
      'Confrontational discussions',
      'Rigid planning',
    ],
    communication: 'Be open and growth-oriented',
    energy: 'Expansive and creative',
  },
  Fire: {
    favorable: [
      'Passionate conversations',
      'Expressing emotions',
      'Bold declarations',
      'Social gatherings',
      'Physical activities',
    ],
    unfavorable: [
      'Cold analysis',
      'Pessimistic topics',
      'Passive-aggressive behavior',
    ],
    communication: 'Be direct and enthusiastic',
    energy: 'Dynamic and transformative',
  },
  Earth: {
    favorable: [
      'Building trust',
      'Deep conversations',
      'Sharing meals',
      'Making commitments',
      'Practical planning',
    ],
    unfavorable: [
      'Impulsive decisions',
      'Frequent changes',
      'Unstable situations',
    ],
    communication: 'Be patient and nurturing',
    energy: 'Stable and grounding',
  },
  Metal: {
    favorable: [
      'Honest discussions',
      'Setting boundaries',
      'Quality time',
      'Intellectual debates',
      'Clear communication',
    ],
    unfavorable: [
      'Emotional manipulation',
      'Vague commitments',
      'Disorganized activities',
    ],
    communication: 'Be precise and authentic',
    energy: 'Focused and refined',
  },
  Water: {
    favorable: [
      'Intuitive connection',
      'Emotional sharing',
      'Going with the flow',
      'Deep listening',
      'Reflective activities',
    ],
    unfavorable: [
      'Forcing outcomes',
      'Rigid schedules',
      'Surface-level chat',
    ],
    communication: 'Flow with conversations naturally',
    energy: 'Adaptive and intuitive',
  },
};

/**
 * Daily insight templates for each element
 * ${element} will be replaced with the user's element
 */
export const DAILY_INSIGHTS: Record<FiveElement, string[]> = {
  Wood: [
    "Your creative energy is strong today. Great time to explore new connections and share your ideas.",
    "Growth-oriented conversations will flourish. Be open to new possibilities in your relationships.",
    "Your natural flexibility shines today. Adapt to changing plans and go with the flow.",
    "Social energy is high. Reach out to matches and initiate engaging conversations.",
    "Plant seeds for future connections. Your charm and optimism are particularly magnetic.",
  ],
  Fire: [
    "Your passionate nature is amplified today. Express yourself boldly and authentically.",
    "Dynamic energy surrounds you. Perfect for exciting dates and heartfelt declarations.",
    "Your charisma is at its peak. Don't hold back from showing your true feelings.",
    "Transformative conversations await. Your enthusiasm can ignite deep connections.",
    "Bold energy today. Take the initiative and let your light shine brightly.",
  ],
  Earth: [
    "Stability and trust are your strengths today. Focus on building solid foundations.",
    "Your nurturing energy creates safe spaces. Perfect for deep, meaningful conversations.",
    "Patience and reliability attract the right connections. Stay grounded and authentic.",
    "Your steady presence is comforting. Ideal for making commitments and long-term plans.",
    "Grounding energy flows through you. Share meals and create lasting memories.",
  ],
  Metal: [
    "Clarity and precision guide you today. Honest communication strengthens bonds.",
    "Your refined taste and standards attract quality connections. Be authentic.",
    "Focused energy helps you see through superficiality. Trust your discernment.",
    "Structured conversations bring results. Set clear intentions and boundaries.",
    "Your integrity shines. Perfect for meaningful, authentic interactions.",
  ],
  Water: [
    "Flow with conversations today. Your intuition guides you to the right connections.",
    "Deep emotional currents run strong. Listen to your inner wisdom.",
    "Adaptive energy serves you well. Be flexible and receptive to others.",
    "Your reflective nature attracts kindred spirits. Share your depths carefully.",
    "Intuitive insights are powerful today. Trust your feelings and go with the flow.",
  ],
};

/**
 * Time-specific activity recommendations
 */
export interface ActivityRecommendation {
  timeRange: string;
  activity: string;
  reason: string;
}

export const ACTIVITY_TEMPLATES: Record<FiveElement, {
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
}> = {
  Wood: {
    morning: "Start fresh conversations and plan new adventures",
    afternoon: "Engage in creative activities together",
    evening: "Share dreams and future visions",
    night: "Reflect on growth and possibilities",
  },
  Fire: {
    morning: "Express yourself with confidence",
    afternoon: "Engage in passionate discussions",
    evening: "Perfect for romantic dates and bold moves",
    night: "Let emotions flow naturally",
  },
  Earth: {
    morning: "Build foundations with steady communication",
    afternoon: "Share a meal and create comfort",
    evening: "Deep conversations about commitment",
    night: "Nurture emotional bonds",
  },
  Metal: {
    morning: "Clear, honest communication",
    afternoon: "Engage in intellectual pursuits",
    evening: "Quality time with focused attention",
    night: "Refine understanding and set intentions",
  },
  Water: {
    morning: "Listen to intuition about connections",
    afternoon: "Go with the flow of conversation",
    evening: "Deep, reflective sharing",
    night: "Emotional intimacy flows naturally",
  },
};

/**
 * Element strength modifiers by lunar phase (simplified)
 * In a full implementation, this would use actual lunar calculations
 */
export const LUNAR_PHASE_MODIFIERS: Record<string, Record<FiveElement, number>> = {
  'New Moon': {
    Wood: 1.1,
    Fire: 0.9,
    Earth: 1.0,
    Metal: 0.9,
    Water: 1.2,
  },
  'Waxing': {
    Wood: 1.2,
    Fire: 1.1,
    Earth: 1.0,
    Metal: 0.9,
    Water: 1.0,
  },
  'Full Moon': {
    Wood: 1.0,
    Fire: 1.2,
    Earth: 1.0,
    Metal: 1.1,
    Water: 1.1,
  },
  'Waning': {
    Wood: 0.9,
    Fire: 0.9,
    Earth: 1.1,
    Metal: 1.2,
    Water: 1.0,
  },
};
