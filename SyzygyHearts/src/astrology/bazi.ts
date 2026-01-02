/**
 * BaZi (Four Pillars of Destiny) Calculator
 * Calculates Heavenly Stems and Earthly Branches from birth date and time
 */

import { Element, GENERATING_CYCLE, CONTROLLING_CYCLE } from '../data/elementsCycle';
import { ChineseZodiac } from '../data/zodiacData';
import { getElementFromYear, getElementFromMonth, getElementFromHour } from './elements';
import { getZodiacFromYear } from './zodiac';

/**
 * Heavenly Stems (Tian Gan) - 10 stems
 */
export enum HeavenlyStem {
  JIA = 'Jia',     // 甲 - Yang Wood
  YI = 'Yi',       // 乙 - Yin Wood
  BING = 'Bing',   // 丙 - Yang Fire
  DING = 'Ding',   // 丁 - Yin Fire
  WU = 'Wu',       // 戊 - Yang Earth
  JI = 'Ji',       // 己 - Yin Earth
  GENG = 'Geng',   // 庚 - Yang Metal
  XIN = 'Xin',     // 辛 - Yin Metal
  REN = 'Ren',     // 壬 - Yang Water
  GUI = 'Gui'      // 癸 - Yin Water
}

/**
 * Earthly Branches (Di Zhi) - 12 branches
 * These correspond to the 12 Chinese Zodiac animals
 */
export enum EarthlyBranch {
  ZI = 'Zi',       // 子 - Rat
  CHOU = 'Chou',   // 丑 - Ox
  YIN = 'Yin',     // 寅 - Tiger
  MAO = 'Mao',     // 卯 - Rabbit
  CHEN = 'Chen',   // 辰 - Dragon
  SI = 'Si',       // 巳 - Snake
  WU = 'Wu',       // 午 - Horse
  WEI = 'Wei',     // 未 - Goat
  SHEN = 'Shen',   // 申 - Monkey
  YOU = 'You',     // 酉 - Rooster
  XU = 'Xu',       // 戌 - Dog
  HAI = 'Hai'      // 亥 - Pig
}

/**
 * Stem to Element mapping
 */
export const STEM_ELEMENTS: Record<HeavenlyStem, Element> = {
  [HeavenlyStem.JIA]: Element.WOOD,
  [HeavenlyStem.YI]: Element.WOOD,
  [HeavenlyStem.BING]: Element.FIRE,
  [HeavenlyStem.DING]: Element.FIRE,
  [HeavenlyStem.WU]: Element.EARTH,
  [HeavenlyStem.JI]: Element.EARTH,
  [HeavenlyStem.GENG]: Element.METAL,
  [HeavenlyStem.XIN]: Element.METAL,
  [HeavenlyStem.REN]: Element.WATER,
  [HeavenlyStem.GUI]: Element.WATER
};

/**
 * Branch to Element mapping
 */
export const BRANCH_ELEMENTS: Record<EarthlyBranch, Element> = {
  [EarthlyBranch.ZI]: Element.WATER,
  [EarthlyBranch.CHOU]: Element.EARTH,
  [EarthlyBranch.YIN]: Element.WOOD,
  [EarthlyBranch.MAO]: Element.WOOD,
  [EarthlyBranch.CHEN]: Element.EARTH,
  [EarthlyBranch.SI]: Element.FIRE,
  [EarthlyBranch.WU]: Element.FIRE,
  [EarthlyBranch.WEI]: Element.EARTH,
  [EarthlyBranch.SHEN]: Element.METAL,
  [EarthlyBranch.YOU]: Element.METAL,
  [EarthlyBranch.XU]: Element.EARTH,
  [EarthlyBranch.HAI]: Element.WATER
};

/**
 * Branch to Zodiac mapping
 */
export const BRANCH_ZODIAC: Record<EarthlyBranch, ChineseZodiac> = {
  [EarthlyBranch.ZI]: ChineseZodiac.RAT,
  [EarthlyBranch.CHOU]: ChineseZodiac.OX,
  [EarthlyBranch.YIN]: ChineseZodiac.TIGER,
  [EarthlyBranch.MAO]: ChineseZodiac.RABBIT,
  [EarthlyBranch.CHEN]: ChineseZodiac.DRAGON,
  [EarthlyBranch.SI]: ChineseZodiac.SNAKE,
  [EarthlyBranch.WU]: ChineseZodiac.HORSE,
  [EarthlyBranch.WEI]: ChineseZodiac.GOAT,
  [EarthlyBranch.SHEN]: ChineseZodiac.MONKEY,
  [EarthlyBranch.YOU]: ChineseZodiac.ROOSTER,
  [EarthlyBranch.XU]: ChineseZodiac.DOG,
  [EarthlyBranch.HAI]: ChineseZodiac.PIG
};

/**
 * Pillar represents one of the four pillars (Year, Month, Day, Hour)
 */
export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  element: Element;
  zodiac?: ChineseZodiac;
}

/**
 * Complete BaZi chart with all four pillars
 */
export interface BaZiChart {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
  dayMaster: Element;  // The day stem element is the "self" in BaZi
  elements: Element[];
  dominantElement: Element;
}

/**
 * Calculate Heavenly Stem from year
 */
export function getYearStem(year: number): HeavenlyStem {
  // Base year 1924 is Jia (start of 60-year cycle)
  const baseYear = 1924;
  const offset = (year - baseYear) % 10;
  const normalizedOffset = offset >= 0 ? offset : offset + 10;

  const stems = Object.values(HeavenlyStem);
  return stems[normalizedOffset];
}

/**
 * Calculate Earthly Branch from year
 */
export function getYearBranch(year: number): EarthlyBranch {
  // Base year 1924 is Zi (Rat)
  const baseYear = 1924;
  const offset = (year - baseYear) % 12;
  const normalizedOffset = offset >= 0 ? offset : offset + 12;

  const branches = Object.values(EarthlyBranch);
  return branches[normalizedOffset];
}

/**
 * Calculate Heavenly Stem from month
 * Month stems depend on both the month and the year stem
 */
export function getMonthStem(month: number, yearStem: HeavenlyStem): HeavenlyStem {
  // Simplified calculation for month stem
  // The actual calculation is complex and depends on solar calendar
  const stemIndex = Object.values(HeavenlyStem).indexOf(yearStem);
  const monthOffset = (month - 1) * 2;
  const totalOffset = (stemIndex + monthOffset) % 10;

  const stems = Object.values(HeavenlyStem);
  return stems[totalOffset];
}

/**
 * Calculate Earthly Branch from month
 * Based on Chinese solar calendar months
 */
export function getMonthBranch(month: number): EarthlyBranch {
  // Simplified mapping (actual BaZi uses solar calendar)
  // Starting from Tiger (Yin) in February
  const branchMap: Record<number, EarthlyBranch> = {
    1: EarthlyBranch.CHOU,  // Ox - January
    2: EarthlyBranch.YIN,   // Tiger - February
    3: EarthlyBranch.MAO,   // Rabbit - March
    4: EarthlyBranch.CHEN,  // Dragon - April
    5: EarthlyBranch.SI,    // Snake - May
    6: EarthlyBranch.WU,    // Horse - June
    7: EarthlyBranch.WEI,   // Goat - July
    8: EarthlyBranch.SHEN,  // Monkey - August
    9: EarthlyBranch.YOU,   // Rooster - September
    10: EarthlyBranch.XU,   // Dog - October
    11: EarthlyBranch.HAI,  // Pig - November
    12: EarthlyBranch.ZI    // Rat - December
  };

  return branchMap[month] || EarthlyBranch.YIN;
}

/**
 * Calculate Day Stem and Branch
 * This is simplified - actual calculation requires Julian day number
 */
export function getDayStem(year: number, month: number, day: number): HeavenlyStem {
  // Simplified calculation based on a hash of the date
  const dateValue = year * 10000 + month * 100 + day;
  const stemIndex = dateValue % 10;

  const stems = Object.values(HeavenlyStem);
  return stems[stemIndex];
}

export function getDayBranch(year: number, month: number, day: number): EarthlyBranch {
  // Simplified calculation based on a hash of the date
  const dateValue = year * 10000 + month * 100 + day;
  const branchIndex = dateValue % 12;

  const branches = Object.values(EarthlyBranch);
  return branches[branchIndex];
}

/**
 * Calculate Hour Stem
 * Hour stem depends on the day stem
 */
export function getHourStem(hour: number, dayStem: HeavenlyStem): HeavenlyStem {
  const stemIndex = Object.values(HeavenlyStem).indexOf(dayStem);
  const hourOffset = Math.floor(hour / 2);
  const totalOffset = (stemIndex + hourOffset) % 10;

  const stems = Object.values(HeavenlyStem);
  return stems[totalOffset];
}

/**
 * Calculate Hour Branch based on hour of day
 */
export function getHourBranch(hour: number): EarthlyBranch {
  // Each branch represents a 2-hour period
  const hourBranchMap: Record<number, EarthlyBranch> = {
    23: EarthlyBranch.ZI, 0: EarthlyBranch.ZI,      // 23-01: Rat
    1: EarthlyBranch.CHOU, 2: EarthlyBranch.CHOU,   // 01-03: Ox
    3: EarthlyBranch.YIN, 4: EarthlyBranch.YIN,     // 03-05: Tiger
    5: EarthlyBranch.MAO, 6: EarthlyBranch.MAO,     // 05-07: Rabbit
    7: EarthlyBranch.CHEN, 8: EarthlyBranch.CHEN,   // 07-09: Dragon
    9: EarthlyBranch.SI, 10: EarthlyBranch.SI,      // 09-11: Snake
    11: EarthlyBranch.WU, 12: EarthlyBranch.WU,     // 11-13: Horse
    13: EarthlyBranch.WEI, 14: EarthlyBranch.WEI,   // 13-15: Goat
    15: EarthlyBranch.SHEN, 16: EarthlyBranch.SHEN, // 15-17: Monkey
    17: EarthlyBranch.YOU, 18: EarthlyBranch.YOU,   // 17-19: Rooster
    19: EarthlyBranch.XU, 20: EarthlyBranch.XU,     // 19-21: Dog
    21: EarthlyBranch.HAI, 22: EarthlyBranch.HAI    // 21-23: Pig
  };

  return hourBranchMap[hour] || EarthlyBranch.ZI;
}

/**
 * Calculate complete BaZi chart from birth data
 */
export function calculateBaZi(
  year: number,
  month: number,
  day: number,
  hour: number
): BaZiChart {
  // Calculate Year Pillar
  const yearStem = getYearStem(year);
  const yearBranch = getYearBranch(year);
  const yearPillar: Pillar = {
    stem: yearStem,
    branch: yearBranch,
    element: STEM_ELEMENTS[yearStem],
    zodiac: BRANCH_ZODIAC[yearBranch]
  };

  // Calculate Month Pillar
  const monthStem = getMonthStem(month, yearStem);
  const monthBranch = getMonthBranch(month);
  const monthPillar: Pillar = {
    stem: monthStem,
    branch: monthBranch,
    element: STEM_ELEMENTS[monthStem],
    zodiac: BRANCH_ZODIAC[monthBranch]
  };

  // Calculate Day Pillar
  const dayStem = getDayStem(year, month, day);
  const dayBranch = getDayBranch(year, month, day);
  const dayPillar: Pillar = {
    stem: dayStem,
    branch: dayBranch,
    element: STEM_ELEMENTS[dayStem],
    zodiac: BRANCH_ZODIAC[dayBranch]
  };

  // Calculate Hour Pillar
  const hourStem = getHourStem(hour, dayStem);
  const hourBranch = getHourBranch(hour);
  const hourPillar: Pillar = {
    stem: hourStem,
    branch: hourBranch,
    element: STEM_ELEMENTS[hourStem],
    zodiac: BRANCH_ZODIAC[hourBranch]
  };

  // Collect all elements from the chart
  const elements: Element[] = [
    STEM_ELEMENTS[yearStem],
    BRANCH_ELEMENTS[yearBranch],
    STEM_ELEMENTS[monthStem],
    BRANCH_ELEMENTS[monthBranch],
    STEM_ELEMENTS[dayStem],
    BRANCH_ELEMENTS[dayBranch],
    STEM_ELEMENTS[hourStem],
    BRANCH_ELEMENTS[hourBranch]
  ];

  // Determine dominant element
  const elementCounts: Record<Element, number> = {
    [Element.WOOD]: 0,
    [Element.FIRE]: 0,
    [Element.EARTH]: 0,
    [Element.METAL]: 0,
    [Element.WATER]: 0
  };

  elements.forEach(element => {
    elementCounts[element]++;
  });

  let dominantElement = Element.EARTH;
  let maxCount = 0;
  Object.entries(elementCounts).forEach(([element, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantElement = element as Element;
    }
  });

  // Day stem element is the "Day Master" - represents the self
  const dayMaster = STEM_ELEMENTS[dayStem];

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    dayMaster,
    elements,
    dominantElement
  };
}

/**
 * Calculate BaZi compatibility score between two charts
 */
export interface BaZiCompatibility {
  score: number;
  dayMasterHarmony: number;
  elementBalance: number;
  pillarClashes: number;
  pillarHarmonies: number;
  compatible: boolean;
}

export function calculateBaZiCompatibility(
  chart1: BaZiChart,
  chart2: BaZiChart
): BaZiCompatibility {
  let score = 50; // Base score

  // Compare Day Masters (most important)
  const dayMaster1 = chart1.dayMaster;
  const dayMaster2 = chart2.dayMaster;

  // Check if day masters are harmonious
  let dayMasterHarmony = 50;
  if (dayMaster1 === dayMaster2) {
    dayMasterHarmony = 70; // Same element
    score += 10;
  } else {
    // Check generating relationship
    
    if (GENERATING_CYCLE[dayMaster1] === dayMaster2) {
      dayMasterHarmony = 90;
      score += 20;
    } else if (GENERATING_CYCLE[dayMaster2] === dayMaster1) {
      dayMasterHarmony = 85;
      score += 15;
    } else if (CONTROLLING_CYCLE[dayMaster1] === dayMaster2 ||
               CONTROLLING_CYCLE[dayMaster2] === dayMaster1) {
      dayMasterHarmony = 30;
      score -= 10;
    }
  }

  // Check for pillar clashes (same branch in opposition)
  let pillarClashes = 0;
  let pillarHarmonies = 0;

  const branches1 = [chart1.year.branch, chart1.month.branch, chart1.day.branch, chart1.hour.branch];
  const branches2 = [chart2.year.branch, chart2.month.branch, chart2.day.branch, chart2.hour.branch];

  // Count matching branches (harmonies)
  branches1.forEach(branch1 => {
    if (branches2.includes(branch1)) {
      pillarHarmonies++;
      score += 5;
    }
  });

  // Check element balance between charts
  const elementBalance = calculateElementBalanceScore(chart1, chart2);
  score += (elementBalance - 50) * 0.3;

  // Ensure score is within 0-100
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    dayMasterHarmony,
    elementBalance,
    pillarClashes,
    pillarHarmonies,
    compatible: score >= 60
  };
}

/**
 * Helper function to calculate element balance score between two charts
 */
function calculateElementBalanceScore(chart1: BaZiChart, chart2: BaZiChart): number {
  // Count elements in both charts
  const combinedElements = [...chart1.elements, ...chart2.elements];
  const elementCounts: Record<Element, number> = {
    [Element.WOOD]: 0,
    [Element.FIRE]: 0,
    [Element.EARTH]: 0,
    [Element.METAL]: 0,
    [Element.WATER]: 0
  };

  combinedElements.forEach(element => {
    elementCounts[element]++;
  });

  // Calculate how balanced the elements are
  const counts = Object.values(elementCounts);
  const average = counts.reduce((a, b) => a + b, 0) / counts.length;
  const variance = counts.reduce((sum, count) => sum + Math.pow(count - average, 2), 0) / counts.length;

  // Lower variance = more balanced = higher score
  // Variance of 0 = 100, variance of 10+ = 0
  const balanceScore = Math.max(0, 100 - variance * 10);

  return balanceScore;
}

/**
 * Get simplified BaZi summary for user display
 */
export function getBaZiSummary(chart: BaZiChart): {
  dayMaster: string;
  dominantElement: string;
  yearAnimal: string;
  elementDistribution: Record<Element, number>;
} {
  const elementDistribution: Record<Element, number> = {
    [Element.WOOD]: 0,
    [Element.FIRE]: 0,
    [Element.EARTH]: 0,
    [Element.METAL]: 0,
    [Element.WATER]: 0
  };

  chart.elements.forEach(element => {
    elementDistribution[element]++;
  });

  return {
    dayMaster: chart.dayMaster,
    dominantElement: chart.dominantElement,
    yearAnimal: chart.year.zodiac || 'Unknown',
    elementDistribution
  };
}
