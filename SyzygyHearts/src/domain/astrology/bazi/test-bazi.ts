/**
 * Simple BaZi Calculator Test Script
 * Run with: npx ts-node src/domain/astrology/bazi/test-bazi.ts
 */

import {
  calculateBaZi,
  getDayPillar,
  getYearPillar,
} from './calculator';
import { gregorianToJDN, getCycleDayFromJDN } from './julian-day';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`✓ ${message}`);
    passed++;
  } else {
    console.log(`✗ ${message}`);
    failed++;
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  assert(actual === expected, `${message}: expected ${expected}, got ${actual}`);
}

console.log('\n=== Julian Day Number Tests ===\n');

// Test JDN for known date
const jdn2000 = gregorianToJDN(2000, 1, 1);
assertEqual(jdn2000, 2451545, 'January 1, 2000 should be JDN 2451545');

// Test cycle day
const cycle2000 = getCycleDayFromJDN(jdn2000);
assertEqual(cycle2000, 6, 'January 1, 2000 should be cycle day 6 (Jia-Wu)');

console.log('\n=== Year Pillar Tests ===\n');

// Test 1990 - Year of the Metal Horse
const year1990 = getYearPillar(1990, 6, 15);
assertEqual(year1990.heavenlyStem, 'Geng', '1990 year stem should be Geng');
assertEqual(year1990.earthlyBranch, 'Wu', '1990 year branch should be Wu');
assertEqual(year1990.zodiac, 'Horse', '1990 zodiac should be Horse');
assertEqual(year1990.stemElement, 'Metal', '1990 stem element should be Metal');

// Test 2000 - Year of the Metal Dragon
const year2000 = getYearPillar(2000, 6, 15);
assertEqual(year2000.heavenlyStem, 'Geng', '2000 year stem should be Geng');
assertEqual(year2000.earthlyBranch, 'Chen', '2000 year branch should be Chen');
assertEqual(year2000.zodiac, 'Dragon', '2000 zodiac should be Dragon');

// Test 2024 - Year of the Wood Dragon
const year2024 = getYearPillar(2024, 6, 15);
assertEqual(year2024.heavenlyStem, 'Jia', '2024 year stem should be Jia');
assertEqual(year2024.earthlyBranch, 'Chen', '2024 year branch should be Chen');
assertEqual(year2024.stemElement, 'Wood', '2024 stem element should be Wood');

console.log('\n=== Day Pillar Tests ===\n');

// Test determinism
const day1 = getDayPillar(1990, 5, 15);
const day2 = getDayPillar(1990, 5, 15);
assertEqual(day1.heavenlyStem, day2.heavenlyStem, 'Same date should produce same stem');
assertEqual(day1.earthlyBranch, day2.earthlyBranch, 'Same date should produce same branch');

// Test consecutive days are sequential
const jdn1 = gregorianToJDN(2000, 1, 1);
const jdn2 = gregorianToJDN(2000, 1, 2);
const cycle1 = getCycleDayFromJDN(jdn1);
const cycle2 = getCycleDayFromJDN(jdn2);
assertEqual((cycle2 - cycle1 + 60) % 60, 1, 'Consecutive days should be 1 apart in cycle');

console.log('\n=== Full BaZi Chart Tests ===\n');

const chart = calculateBaZi(1990, 5, 15, 12);

assert(chart.year !== undefined, 'Chart should have year pillar');
assert(chart.month !== undefined, 'Chart should have month pillar');
assert(chart.day !== undefined, 'Chart should have day pillar');
assert(chart.hour !== undefined, 'Chart should have hour pillar');

assert(chart.elementBalance.Wood >= 0, 'Element balance should include Wood');
assert(chart.elementBalance.Fire >= 0, 'Element balance should include Fire');
assert(chart.elementBalance.Earth >= 0, 'Element balance should include Earth');
assert(chart.elementBalance.Metal >= 0, 'Element balance should include Metal');
assert(chart.elementBalance.Water >= 0, 'Element balance should include Water');

assertEqual(chart.dayMasterElement, chart.day.stemElement, 'Day master should match day stem element');

console.log('\n=== Bug Fix Verification ===\n');

// Different dates should produce different results
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

const uniquePillars = new Set(dayPillars);
assert(uniquePillars.size > 1, 'Different dates should produce different day pillars');

console.log('\n=== Test Summary ===\n');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed > 0) {
  process.exit(1);
}
