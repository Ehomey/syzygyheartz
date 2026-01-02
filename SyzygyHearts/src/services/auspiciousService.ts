/**
 * Auspicious Timing Service
 *
 * Calculates favorable times for activities based on:
 * - User's Day Master element (from BaZi chart)
 * - Current date and time
 * - Chinese hour system (shichen)
 * - Five Elements generating and same element relationships
 */

import { FiveElement, BaZiChart } from '../types';
import {
  CHINESE_HOURS,
  ChineseHour,
  ELEMENT_ACTIVITIES,
  DAILY_INSIGHTS,
  ACTIVITY_TEMPLATES,
  LUNAR_PHASE_MODIFIERS,
} from '../data/auspiciousData';
import { GENERATING_CYCLE } from '../data/elementsCycle';

/**
 * Auspicious time period
 */
export interface AuspiciousTime {
  startHour: number;
  endHour: number;
  hourName: string;
  chineseName: string;
  element: FiveElement;
  strength: 'Excellent' | 'Good' | 'Moderate';
  activity: string;
  reason: string;
}

/**
 * Daily auspicious insight
 */
export interface DailyInsight {
  date: Date;
  userElement: FiveElement;
  overallStrength: number; // 0-100
  insight: string;
  favorableActivities: string[];
  communication: string;
  energy: string;
  auspiciousTimes: AuspiciousTime[];
}

/**
 * Get the Chinese hour for a given time
 */
export function getChineseHour(date: Date): ChineseHour {
  const hour = date.getHours();

  // Handle midnight crossing (23:00-01:00)
  if (hour === 23 || hour === 0) {
    return CHINESE_HOURS[0]; // Zi hour
  }

  // Find the matching Chinese hour
  for (const chineseHour of CHINESE_HOURS) {
    if (hour >= chineseHour.startHour && hour < chineseHour.endHour) {
      return chineseHour;
    }
  }

  // Default to first hour if something goes wrong
  return CHINESE_HOURS[0];
}

/**
 * Calculate element strength for a given date
 * Takes into account lunar phase (simplified approximation)
 */
export function getElementStrength(userElement: FiveElement, date: Date): number {
  // Base strength
  let strength = 50;

  // Simplified lunar phase calculation based on day of month
  const dayOfMonth = date.getDate();
  let lunarPhase: string;

  if (dayOfMonth >= 1 && dayOfMonth <= 7) {
    lunarPhase = 'New Moon';
    strength += 10;
  } else if (dayOfMonth >= 8 && dayOfMonth <= 14) {
    lunarPhase = 'Waxing';
    strength += 15;
  } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
    lunarPhase = 'Full Moon';
    strength += 20;
  } else {
    lunarPhase = 'Waning';
    strength += 12;
  }

  // Apply lunar phase modifier
  const modifier = LUNAR_PHASE_MODIFIERS[lunarPhase]?.[userElement] || 1.0;
  strength = strength * modifier;

  // Day of week influence (simplified)
  const dayOfWeek = date.getDay();
  const dayModifier = 0.9 + (dayOfWeek % 5) * 0.05; // Varies between 0.9 and 1.1
  strength = strength * dayModifier;

  // Ensure within bounds
  return Math.min(100, Math.max(0, Math.round(strength)));
}

/**
 * Check if an hour is auspicious for the user's element
 * Auspicious when:
 * 1. Hour element is the same as user element (same element harmony)
 * 2. Hour element generates user element (receiving support)
 * 3. User element generates hour element (giving support, still harmonious)
 */
export function isHourAuspicious(
  userElement: FiveElement,
  hourElement: FiveElement
): { isAuspicious: boolean; strength: 'Excellent' | 'Good' | 'Moderate'; reason: string } {
  // Same element - Good harmony
  if (userElement === hourElement) {
    return {
      isAuspicious: true,
      strength: 'Excellent',
      reason: 'Your element is strong during this hour',
    };
  }

  // Hour element generates user element - Receiving support
  if (GENERATING_CYCLE[hourElement] === userElement) {
    return {
      isAuspicious: true,
      strength: 'Excellent',
      reason: 'You receive natural support and energy',
    };
  }

  // User element generates hour element - Giving support
  if (GENERATING_CYCLE[userElement] === hourElement) {
    return {
      isAuspicious: true,
      strength: 'Good',
      reason: 'Your energy flows naturally and productively',
    };
  }

  // Not particularly auspicious
  return {
    isAuspicious: false,
    strength: 'Moderate',
    reason: 'Neutral energy',
  };
}

/**
 * Get auspicious times for a given date and user element
 * Returns top 2-3 most favorable times during waking hours
 */
export function getAuspiciousTimes(
  userElement: FiveElement,
  date: Date = new Date()
): AuspiciousTime[] {
  const auspiciousTimes: AuspiciousTime[] = [];

  // Filter to waking hours (6 AM - 11 PM for most people)
  const wakingHours = CHINESE_HOURS.filter(
    (hour) => hour.startHour >= 6 || hour.startHour === 23
  );

  // Calculate auspiciousness for each hour
  for (const hour of wakingHours) {
    const { isAuspicious, strength, reason } = isHourAuspicious(
      userElement,
      hour.element
    );

    if (isAuspicious) {
      // Get appropriate activity based on time of day
      let activity: string;
      const startHour = hour.startHour;

      if (startHour >= 5 && startHour < 12) {
        activity = ACTIVITY_TEMPLATES[userElement].morning;
      } else if (startHour >= 12 && startHour < 17) {
        activity = ACTIVITY_TEMPLATES[userElement].afternoon;
      } else if (startHour >= 17 && startHour < 21) {
        activity = ACTIVITY_TEMPLATES[userElement].evening;
      } else {
        activity = ACTIVITY_TEMPLATES[userElement].night;
      }

      auspiciousTimes.push({
        startHour: hour.startHour,
        endHour: hour.endHour,
        hourName: hour.name,
        chineseName: hour.chineseName,
        element: hour.element,
        strength,
        activity,
        reason,
      });
    }
  }

  // Sort by strength (Excellent first, then Good)
  auspiciousTimes.sort((a, b) => {
    const strengthOrder = { Excellent: 3, Good: 2, Moderate: 1 };
    return strengthOrder[b.strength] - strengthOrder[a.strength];
  });

  // Return top 2-3 times
  return auspiciousTimes.slice(0, 3);
}

/**
 * Format hour range for display
 */
export function formatTimeRange(startHour: number, endHour: number): string {
  const formatHour = (hour: number): string => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  // Handle midnight crossing
  if (startHour === 23 && endHour === 1) {
    return '11 PM - 1 AM';
  }

  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

/**
 * Get time period name (Morning, Afternoon, Evening, Night)
 */
export function getTimePeriod(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Night';
}

/**
 * Check if current time is within an auspicious period
 */
export function isCurrentTimeAuspicious(
  userElement: FiveElement,
  date: Date = new Date()
): { isAuspicious: boolean; currentPeriod?: AuspiciousTime } {
  const auspiciousTimes = getAuspiciousTimes(userElement, date);
  const currentHour = date.getHours();

  for (const period of auspiciousTimes) {
    // Handle midnight crossing
    if (period.startHour === 23 && period.endHour === 1) {
      if (currentHour === 23 || currentHour === 0) {
        return { isAuspicious: true, currentPeriod: period };
      }
    } else if (currentHour >= period.startHour && currentHour < period.endHour) {
      return { isAuspicious: true, currentPeriod: period };
    }
  }

  return { isAuspicious: false };
}

/**
 * Get daily insight for a user based on their BaZi chart
 */
export function getDailyInsight(
  baziChart: BaZiChart,
  date: Date = new Date()
): DailyInsight {
  const userElement = baziChart.dayMasterElement;
  const overallStrength = getElementStrength(userElement, date);

  // Get a random insight from the element's insights
  const insights = DAILY_INSIGHTS[userElement];
  const randomIndex = Math.floor(Math.random() * insights.length);
  const insight = insights[randomIndex];

  // Get element activities
  const activities = ELEMENT_ACTIVITIES[userElement];

  // Get auspicious times
  const auspiciousTimes = getAuspiciousTimes(userElement, date);

  return {
    date,
    userElement,
    overallStrength,
    insight,
    favorableActivities: activities.favorable,
    communication: activities.communication,
    energy: activities.energy,
    auspiciousTimes,
  };
}

/**
 * Get the next auspicious time period
 */
export function getNextAuspiciousTime(
  userElement: FiveElement,
  date: Date = new Date()
): AuspiciousTime | null {
  const auspiciousTimes = getAuspiciousTimes(userElement, date);
  const currentHour = date.getHours();

  // Find the next auspicious time after current hour
  for (const period of auspiciousTimes) {
    if (period.startHour > currentHour) {
      return period;
    }
  }

  // If no time found today, return the first auspicious time (it's for later/tomorrow)
  return auspiciousTimes.length > 0 ? auspiciousTimes[0] : null;
}

/**
 * Get simple recommendation text for current hour
 */
export function getCurrentHourRecommendation(
  userElement: FiveElement,
  date: Date = new Date()
): string {
  const { isAuspicious, currentPeriod } = isCurrentTimeAuspicious(userElement, date);

  if (isAuspicious && currentPeriod) {
    return `Right now is ${currentPeriod.strength.toLowerCase()} for: ${currentPeriod.activity}`;
  }

  const nextTime = getNextAuspiciousTime(userElement, date);
  if (nextTime) {
    const timeRange = formatTimeRange(nextTime.startHour, nextTime.endHour);
    return `Next favorable period: ${timeRange}`;
  }

  return 'Stay open to possibilities throughout the day';
}
