/**
 * BaZi (Four Pillars of Destiny) Calculator
 *
 * This is the CORRECT implementation using Julian Day Number
 * for accurate sexagenary cycle calculations.
 */

import {
  FiveElement,
  HeavenlyStem,
  EarthlyBranch,
  ZodiacAnimal,
  Pillar,
  BaZiChart,
  Polarity,
} from '../../../core/types';

import {
  STEM_ELEMENTS,
  BRANCH_ELEMENTS,
  BRANCH_ZODIAC,
  STEMS_ORDER,
  BRANCHES_ORDER,
} from '../../../core/constants';

import {
  gregorianToJDN,
  getCycleDayFromJDN,
  getStemIndexFromCycleDay,
  getBranchIndexFromCycleDay,
} from './julian-day';

// ============================================================================
// STEM & BRANCH HELPERS
// ============================================================================

/**
 * Get Heavenly Stem polarity (Yin/Yang)
 * Odd index = Yang, Even index = Yin
 */
function getStemPolarity(stem: HeavenlyStem): Polarity {
  const index = STEMS_ORDER.indexOf(stem);
  return index % 2 === 0 ? 'Yang' : 'Yin';
}

/**
 * Get hidden stems for an Earthly Branch
 * Each branch contains hidden stems that affect the chart
 */
function getHiddenStems(branch: EarthlyBranch): HeavenlyStem[] {
  const hiddenStemsMap: Record<EarthlyBranch, HeavenlyStem[]> = {
    Zi: ['Gui'],                    // Water
    Chou: ['Ji', 'Gui', 'Xin'],     // Earth, Water, Metal
    Yin: ['Jia', 'Bing', 'Wu'],     // Wood, Fire, Earth
    Mao: ['Yi'],                    // Wood
    Chen: ['Wu', 'Yi', 'Gui'],      // Earth, Wood, Water
    Si: ['Bing', 'Wu', 'Geng'],     // Fire, Earth, Metal
    Wu: ['Ding', 'Ji'],             // Fire, Earth
    Wei: ['Ji', 'Ding', 'Yi'],      // Earth, Fire, Wood
    Shen: ['Geng', 'Ren', 'Wu'],    // Metal, Water, Earth
    You: ['Xin'],                   // Metal
    Xu: ['Wu', 'Xin', 'Ding'],      // Earth, Metal, Fire
    Hai: ['Ren', 'Jia'],            // Water, Wood
  };
  return hiddenStemsMap[branch];
}

// ============================================================================
// YEAR PILLAR
// ============================================================================

/**
 * Calculate Year Pillar
 *
 * Note: Chinese year starts at Li Chun (立春, Start of Spring),
 * typically around Feb 3-5. For simplicity, we use lunar new year
 * approximation here. Production code should use precise solar terms.
 *
 * @param year - Gregorian year
 * @param month - Month (1-12)
 * @param day - Day of month
 */
export function getYearPillar(year: number, month: number, day: number): Pillar {
  // Adjust year if before Li Chun (approximately Feb 4)
  // This is simplified - precise calculation needs solar term data
  let adjustedYear = year;
  if (month === 1 || (month === 2 && day < 4)) {
    adjustedYear -= 1;
  }

  // Reference: 1984 is Jia-Zi (甲子) year
  // 1984 = Stem 0 (Jia), Branch 0 (Zi)
  const yearOffset = adjustedYear - 1984;

  let stemIndex = yearOffset % 10;
  let branchIndex = yearOffset % 12;

  // Normalize negative values
  if (stemIndex < 0) stemIndex += 10;
  if (branchIndex < 0) branchIndex += 12;

  const stem = STEMS_ORDER[stemIndex];
  const branch = BRANCHES_ORDER[branchIndex];

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
    stemPolarity: getStemPolarity(stem),
    zodiac: BRANCH_ZODIAC[branch],
    hiddenStems: getHiddenStems(branch),
  };
}

// ============================================================================
// MONTH PILLAR
// ============================================================================

/**
 * Calculate Month Pillar
 *
 * Month stems follow a pattern based on the year stem.
 * Month branches are fixed to solar months.
 *
 * @param month - Gregorian month (1-12)
 * @param day - Day of month
 * @param yearStem - The year's Heavenly Stem
 */
export function getMonthPillar(month: number, day: number, yearStem: HeavenlyStem): Pillar {
  // Solar month to branch mapping (approximate dates)
  // Yin (Tiger) starts around Feb 4 (Li Chun)
  const solarMonthBranches: EarthlyBranch[] = [
    'Chou',  // Jan (~Jan 6 - Feb 3)
    'Yin',   // Feb (~Feb 4 - Mar 5) - Start of year
    'Mao',   // Mar (~Mar 6 - Apr 4)
    'Chen',  // Apr (~Apr 5 - May 5)
    'Si',    // May (~May 6 - Jun 5)
    'Wu',    // Jun (~Jun 6 - Jul 6)
    'Wei',   // Jul (~Jul 7 - Aug 7)
    'Shen',  // Aug (~Aug 8 - Sep 7)
    'You',   // Sep (~Sep 8 - Oct 7)
    'Xu',    // Oct (~Oct 8 - Nov 6)
    'Hai',   // Nov (~Nov 7 - Dec 6)
    'Zi',    // Dec (~Dec 7 - Jan 5)
  ];

  // Simplified solar term boundary (around 6th of each month)
  // Production code should use precise solar term calculations
  let monthIndex = month - 1;
  if (day < 6 && month > 1) {
    monthIndex = month - 2;
    if (monthIndex < 0) monthIndex = 11;
  }

  const branch = solarMonthBranches[monthIndex];

  // Month stem calculation based on year stem
  // Formula: (Year Stem Index * 2 + Month Branch Index) % 10
  const yearStemIndex = STEMS_ORDER.indexOf(yearStem);
  const branchIndex = BRANCHES_ORDER.indexOf(branch);

  // Calculate month stem using traditional formula
  // Jia/Ji year: Yin month starts with Bing (index 2)
  // Yi/Geng year: Yin month starts with Wu (index 4)
  // Bing/Xin year: Yin month starts with Geng (index 6)
  // Ding/Ren year: Yin month starts with Ren (index 8)
  // Wu/Gui year: Yin month starts with Jia (index 0)
  const yinStartStems = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // For each year stem
  const yinStemStart = yinStartStems[yearStemIndex];

  // Month offset from Yin (Tiger month)
  let monthOffset = branchIndex - 2; // Yin is index 2
  if (monthOffset < 0) monthOffset += 12;

  const stemIndex = (yinStemStart + monthOffset) % 10;
  const stem = STEMS_ORDER[stemIndex];

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
    stemPolarity: getStemPolarity(stem),
    zodiac: BRANCH_ZODIAC[branch],
    hiddenStems: getHiddenStems(branch),
  };
}

// ============================================================================
// DAY PILLAR (CRITICAL FIX)
// ============================================================================

/**
 * Calculate Day Pillar using Julian Day Number
 *
 * THIS IS THE CRITICAL FIX - uses proper astronomical calculation
 * instead of the broken modulo hash that was there before.
 *
 * @param year - Gregorian year
 * @param month - Month (1-12)
 * @param day - Day of month
 */
export function getDayPillar(year: number, month: number, day: number): Pillar {
  // Convert to Julian Day Number
  const jdn = gregorianToJDN(year, month, day);

  // Get position in 60-day sexagenary cycle
  const cycleDay = getCycleDayFromJDN(jdn);

  // Extract stem and branch indices
  const stemIndex = getStemIndexFromCycleDay(cycleDay);
  const branchIndex = getBranchIndexFromCycleDay(cycleDay);

  const stem = STEMS_ORDER[stemIndex];
  const branch = BRANCHES_ORDER[branchIndex];

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
    stemPolarity: getStemPolarity(stem),
    zodiac: BRANCH_ZODIAC[branch],
    hiddenStems: getHiddenStems(branch),
  };
}

// ============================================================================
// HOUR PILLAR
// ============================================================================

/**
 * Calculate Hour Pillar
 *
 * Each Chinese hour (时辰) spans 2 Western hours.
 * Hour stem depends on the day stem.
 *
 * @param hour - Hour in 24-hour format (0-23)
 * @param dayStem - The day's Heavenly Stem
 */
export function getHourPillar(hour: number, dayStem: HeavenlyStem): Pillar {
  // Map Western hour to Chinese hour (Earthly Branch)
  // Each branch covers 2 hours, starting from Zi (23:00-00:59)
  const hourBranches: EarthlyBranch[] = [
    'Zi',   // 23:00 - 00:59
    'Chou', // 01:00 - 02:59
    'Yin',  // 03:00 - 04:59
    'Mao',  // 05:00 - 06:59
    'Chen', // 07:00 - 08:59
    'Si',   // 09:00 - 10:59
    'Wu',   // 11:00 - 12:59
    'Wei',  // 13:00 - 14:59
    'Shen', // 15:00 - 16:59
    'You',  // 17:00 - 18:59
    'Xu',   // 19:00 - 20:59
    'Hai',  // 21:00 - 22:59
  ];

  // Calculate branch index
  let branchIndex: number;
  if (hour === 23) {
    branchIndex = 0; // Zi hour starts at 23:00
  } else {
    branchIndex = Math.floor((hour + 1) / 2);
  }

  const branch = hourBranches[branchIndex];

  // Hour stem calculation based on day stem
  // Similar pattern to month stems
  const dayStemIndex = STEMS_ORDER.indexOf(dayStem);

  // Zi hour starting stem for each day stem:
  // Jia/Ji day: Zi hour starts with Jia (index 0)
  // Yi/Geng day: Zi hour starts with Bing (index 2)
  // Bing/Xin day: Zi hour starts with Wu (index 4)
  // Ding/Ren day: Zi hour starts with Geng (index 6)
  // Wu/Gui day: Zi hour starts with Ren (index 8)
  const ziStartStems = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const ziStemStart = ziStartStems[dayStemIndex];

  const stemIndex = (ziStemStart + branchIndex) % 10;
  const stem = STEMS_ORDER[stemIndex];

  return {
    heavenlyStem: stem,
    earthlyBranch: branch,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
    stemPolarity: getStemPolarity(stem),
    zodiac: BRANCH_ZODIAC[branch],
    hiddenStems: getHiddenStems(branch),
  };
}

// ============================================================================
// COMPLETE BAZI CHART
// ============================================================================

/**
 * Calculate complete BaZi chart from birth date and time
 *
 * @param year - Birth year
 * @param month - Birth month (1-12)
 * @param day - Birth day (1-31)
 * @param hour - Birth hour (0-23)
 * @returns Complete BaZi chart
 */
export function calculateBaZi(
  year: number,
  month: number,
  day: number,
  hour: number
): BaZiChart {
  // Calculate all four pillars
  const yearPillar = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(month, day, yearPillar.heavenlyStem);
  const dayPillar = getDayPillar(year, month, day);
  const hourPillar = getHourPillar(hour, dayPillar.heavenlyStem);

  // Day Master is the day stem element - represents "self"
  const dayMasterElement = dayPillar.stemElement;
  const dayMasterPolarity = dayPillar.stemPolarity;

  // Count all elements in the chart (stems + branches)
  const elementBalance = calculateElementBalance([
    yearPillar, monthPillar, dayPillar, hourPillar
  ]);

  // Find dominant and weakest elements
  const { dominant, weakest } = findDominantAndWeakest(elementBalance);

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    dayMasterElement,
    dayMasterPolarity,
    elementBalance,
    dominantElement: dominant,
    weakestElement: weakest,
  };
}

/**
 * Calculate element balance from pillars
 */
function calculateElementBalance(pillars: Pillar[]): Record<FiveElement, number> {
  const balance: Record<FiveElement, number> = {
    Wood: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0,
  };

  pillars.forEach(pillar => {
    // Count stem element (weight: 1)
    balance[pillar.stemElement] += 1;

    // Count branch element (weight: 1)
    balance[pillar.branchElement] += 1;

    // Count hidden stems (weight: 0.5 each)
    pillar.hiddenStems?.forEach(hiddenStem => {
      balance[STEM_ELEMENTS[hiddenStem]] += 0.5;
    });
  });

  return balance;
}

/**
 * Find dominant and weakest elements
 */
function findDominantAndWeakest(
  balance: Record<FiveElement, number>
): { dominant: FiveElement; weakest: FiveElement } {
  let dominant: FiveElement = 'Earth';
  let weakest: FiveElement = 'Earth';
  let maxCount = -1;
  let minCount = Infinity;

  (Object.entries(balance) as [FiveElement, number][]).forEach(([element, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = element;
    }
    if (count < minCount) {
      minCount = count;
      weakest = element;
    }
  });

  return { dominant, weakest };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  getYearPillar,
  getMonthPillar,
  getDayPillar,
  getHourPillar,
  getStemPolarity,
  getHiddenStems,
};
