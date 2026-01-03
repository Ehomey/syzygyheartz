/**
 * Julian Day Number Calculations
 *
 * The Julian Day Number (JDN) is a continuous count of days since the
 * beginning of the Julian Period (January 1, 4713 BC in the proleptic
 * Julian calendar). It's essential for accurate BaZi calculations.
 */

/**
 * Convert Gregorian date to Julian Day Number
 *
 * This uses the standard algorithm that handles the Gregorian calendar
 * reform correctly (dates after October 15, 1582).
 *
 * @param year - Full year (e.g., 1990)
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns Julian Day Number
 */
export function gregorianToJDN(year: number, month: number, day: number): number {
  // Adjust for months January and February
  // (treat them as months 13 and 14 of the previous year)
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  // Gregorian calendar calculation
  const jdn = day
    + Math.floor((153 * m + 2) / 5)
    + 365 * y
    + Math.floor(y / 4)
    - Math.floor(y / 100)
    + Math.floor(y / 400)
    - 32045;

  return jdn;
}

/**
 * Convert Julian Day Number to Gregorian date
 *
 * @param jdn - Julian Day Number
 * @returns Object with year, month, day
 */
export function jdnToGregorian(jdn: number): { year: number; month: number; day: number } {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor(146097 * b / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor(1461 * d / 4);
  const m = Math.floor((5 * e + 2) / 153);

  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);

  return { year, month, day };
}

/**
 * Get the day of the week from JDN
 *
 * @param jdn - Julian Day Number
 * @returns Day of week (0 = Monday, 6 = Sunday)
 */
export function getDayOfWeek(jdn: number): number {
  return jdn % 7;
}

/**
 * Reference point for sexagenary cycle calculations
 *
 * January 1, 2000 (JDN 2451545) corresponds to:
 * - Day: Jia-Wu (甲午) - Stem index 0, Branch index 6
 * - This is day 7 of the 60-day cycle (0-indexed)
 */
export const REFERENCE_JDN = 2451545; // January 1, 2000
export const REFERENCE_CYCLE_DAY = 6; // Jia-Wu is 7th day (0-indexed = 6)

/**
 * Calculate the sexagenary cycle day number (0-59) for a given JDN
 *
 * @param jdn - Julian Day Number
 * @returns Cycle day (0-59)
 */
export function getCycleDayFromJDN(jdn: number): number {
  // Calculate offset from reference date
  const offset = jdn - REFERENCE_JDN;

  // Add reference cycle day and normalize to 0-59 range
  let cycleDay = (REFERENCE_CYCLE_DAY + offset) % 60;

  // Handle negative results
  if (cycleDay < 0) {
    cycleDay += 60;
  }

  return cycleDay;
}

/**
 * Get stem index (0-9) from cycle day
 */
export function getStemIndexFromCycleDay(cycleDay: number): number {
  return cycleDay % 10;
}

/**
 * Get branch index (0-11) from cycle day
 */
export function getBranchIndexFromCycleDay(cycleDay: number): number {
  return cycleDay % 12;
}
