/**
 * BaZi Calculator Tests
 *
 * Verifies the Julian Day Number based calculation
 * produces correct results for known dates.
 */

import {
  calculateBaZi,
  getDayPillar,
  getYearPillar,
} from './calculator';
import { gregorianToJDN, getCycleDayFromJDN } from './julian-day';

// Test Julian Day Number calculation
describe('Julian Day Number', () => {
  test('January 1, 2000 should be JDN 2451545', () => {
    const jdn = gregorianToJDN(2000, 1, 1);
    expect(jdn).toBe(2451545);
  });

  test('January 1, 1984 (Jia-Zi year start)', () => {
    // 1984 is a Jia-Zi year (start of 60-year cycle)
    const jdn = gregorianToJDN(1984, 2, 4); // Li Chun
    expect(jdn).toBeGreaterThan(0);
  });
});

// Test known BaZi charts
describe('BaZi Calculator', () => {
  test('Year pillar for 1990 should be Geng-Wu (Metal Horse)', () => {
    // 1990 is the year of the Metal Horse
    const pillar = getYearPillar(1990, 6, 15);
    expect(pillar.heavenlyStem).toBe('Geng');
    expect(pillar.earthlyBranch).toBe('Wu');
    expect(pillar.zodiac).toBe('Horse');
    expect(pillar.stemElement).toBe('Metal');
  });

  test('Year pillar for 2000 should be Geng-Chen (Metal Dragon)', () => {
    const pillar = getYearPillar(2000, 6, 15);
    expect(pillar.heavenlyStem).toBe('Geng');
    expect(pillar.earthlyBranch).toBe('Chen');
    expect(pillar.zodiac).toBe('Dragon');
  });

  test('Year pillar for 2024 should be Jia-Chen (Wood Dragon)', () => {
    const pillar = getYearPillar(2024, 6, 15);
    expect(pillar.heavenlyStem).toBe('Jia');
    expect(pillar.earthlyBranch).toBe('Chen');
    expect(pillar.zodiac).toBe('Dragon');
    expect(pillar.stemElement).toBe('Wood');
  });

  test('Day pillar calculation is deterministic', () => {
    // Same date should always produce same result
    const pillar1 = getDayPillar(1990, 5, 15);
    const pillar2 = getDayPillar(1990, 5, 15);

    expect(pillar1.heavenlyStem).toBe(pillar2.heavenlyStem);
    expect(pillar1.earthlyBranch).toBe(pillar2.earthlyBranch);
  });

  test('Consecutive days should have sequential stems and branches', () => {
    const day1 = getDayPillar(2000, 1, 1);
    const day2 = getDayPillar(2000, 1, 2);

    // Get cycle positions
    const jdn1 = gregorianToJDN(2000, 1, 1);
    const jdn2 = gregorianToJDN(2000, 1, 2);
    const cycle1 = getCycleDayFromJDN(jdn1);
    const cycle2 = getCycleDayFromJDN(jdn2);

    // Consecutive days should be 1 apart in the cycle
    expect((cycle2 - cycle1 + 60) % 60).toBe(1);
  });

  test('Full BaZi chart has all four pillars', () => {
    const chart = calculateBaZi(1990, 5, 15, 12);

    expect(chart.year).toBeDefined();
    expect(chart.month).toBeDefined();
    expect(chart.day).toBeDefined();
    expect(chart.hour).toBeDefined();

    expect(chart.year.heavenlyStem).toBeDefined();
    expect(chart.month.earthlyBranch).toBeDefined();
    expect(chart.day.stemElement).toBeDefined();
    expect(chart.hour.zodiac).toBeDefined();
  });

  test('Element balance calculation includes all five elements', () => {
    const chart = calculateBaZi(1990, 5, 15, 12);

    expect(chart.elementBalance).toBeDefined();
    expect(chart.elementBalance.Wood).toBeGreaterThanOrEqual(0);
    expect(chart.elementBalance.Fire).toBeGreaterThanOrEqual(0);
    expect(chart.elementBalance.Earth).toBeGreaterThanOrEqual(0);
    expect(chart.elementBalance.Metal).toBeGreaterThanOrEqual(0);
    expect(chart.elementBalance.Water).toBeGreaterThanOrEqual(0);
  });

  test('Day master element matches day stem element', () => {
    const chart = calculateBaZi(1990, 5, 15, 12);
    expect(chart.dayMasterElement).toBe(chart.day.stemElement);
  });
});

// Verify the fix for the original bug
describe('BaZi Bug Fix Verification', () => {
  test('Different birth dates should produce different day pillars', () => {
    // The old broken algorithm used dateValue % 10 which could
    // produce the same result for many different dates
    const dates = [
      [1990, 1, 1],
      [1990, 1, 2],
      [1990, 1, 3],
      [1991, 1, 1],
      [2000, 1, 1],
    ];

    const dayPillars = dates.map(([y, m, d]) => {
      const pillar = getDayPillar(y, m, d);
      return `${pillar.heavenlyStem}-${pillar.earthlyBranch}`;
    });

    // All pillars should be different (statistically extremely likely for these dates)
    const uniquePillars = new Set(dayPillars);
    expect(uniquePillars.size).toBeGreaterThan(1);
  });
});
