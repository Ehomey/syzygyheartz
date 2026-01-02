/**
 * Example usage and tests for Auspicious Service
 * This file demonstrates how the service works
 */

import { FiveElement, BaZiChart } from '../types';
import {
  getAuspiciousTimes,
  getDailyInsight,
  isCurrentTimeAuspicious,
  formatTimeRange,
  getChineseHour,
  getElementStrength,
} from './auspiciousService';

// Example: Mock BaZi chart for a Water element user
const mockWaterBaziChart: Partial<BaZiChart> = {
  dayMasterElement: 'Water' as FiveElement,
  userId: 'user123',
};

// Example 1: Get auspicious times for a Water user
console.log('=== Example 1: Auspicious Times for Water User ===');
const auspiciousTimes = getAuspiciousTimes('Water', new Date());
console.log('Number of auspicious periods:', auspiciousTimes.length);
auspiciousTimes.forEach((time, index) => {
  console.log(`\nPeriod ${index + 1}:`);
  console.log(`  Time: ${formatTimeRange(time.startHour, time.endHour)}`);
  console.log(`  Chinese Hour: ${time.chineseName} (${time.hourName})`);
  console.log(`  Element: ${time.element}`);
  console.log(`  Strength: ${time.strength}`);
  console.log(`  Activity: ${time.activity}`);
  console.log(`  Reason: ${time.reason}`);
});

// Example 2: Get daily insight
console.log('\n=== Example 2: Daily Insight ===');
const insight = getDailyInsight(mockWaterBaziChart as BaZiChart);
console.log('User Element:', insight.userElement);
console.log('Overall Strength:', insight.overallStrength);
console.log('Insight:', insight.insight);
console.log('Communication Style:', insight.communication);
console.log('Energy Type:', insight.energy);
console.log('Favorable Activities:', insight.favorableActivities.join(', '));

// Example 3: Check if current time is auspicious
console.log('\n=== Example 3: Current Time Check ===');
const { isAuspicious, currentPeriod } = isCurrentTimeAuspicious('Water');
if (isAuspicious && currentPeriod) {
  console.log('Current time IS auspicious!');
  console.log(`Period: ${formatTimeRange(currentPeriod.startHour, currentPeriod.endHour)}`);
  console.log(`Activity: ${currentPeriod.activity}`);
} else {
  console.log('Current time is not in an auspicious period');
}

// Example 4: Get Chinese hour for current time
console.log('\n=== Example 4: Current Chinese Hour ===');
const currentHour = getChineseHour(new Date());
console.log('Hour Name:', currentHour.name);
console.log('Chinese Name:', currentHour.chineseName);
console.log('Element:', currentHour.element);
console.log('Time Range:', formatTimeRange(currentHour.startHour, currentHour.endHour));

// Example 5: Element strength calculation
console.log('\n=== Example 5: Element Strength ===');
const elements: FiveElement[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
elements.forEach(element => {
  const strength = getElementStrength(element, new Date());
  console.log(`${element}: ${strength}/100`);
});

// Example 6: Test different elements
console.log('\n=== Example 6: Auspicious Times by Element ===');
elements.forEach(element => {
  const times = getAuspiciousTimes(element);
  console.log(`\n${element} (${times.length} periods):`);
  times.forEach(time => {
    console.log(`  - ${formatTimeRange(time.startHour, time.endHour)} (${time.strength})`);
  });
});

/*
Expected behavior:

For Water element user:
- Auspicious during Water hours (11pm-1am, 9-11pm) - Same element
- Auspicious during Metal hours (3-5pm, 5-7pm) - Metal generates Water
- Auspicious during Wood hours (3-5am, 5-7am) - Water generates Wood

For Fire element user:
- Auspicious during Fire hours (9-11am, 11am-1pm) - Same element
- Auspicious during Wood hours (3-5am, 5-7am) - Wood generates Fire
- Auspicious during Earth hours (1-3am, 7-9am, 1-3pm, 7-9pm) - Fire generates Earth

And so on for other elements...
*/
