/**
 * Services Index
 * Central export point for all service modules
 */

// Auspicious Timing Service
export {
  getAuspiciousTimes,
  getElementStrength,
  isHourAuspicious,
  isCurrentTimeAuspicious,
  getDailyInsight,
  getNextAuspiciousTime,
  getCurrentHourRecommendation,
  formatTimeRange,
  getTimePeriod,
  getChineseHour,
} from './auspiciousService';

export type {
  AuspiciousTime,
  DailyInsight,
} from './auspiciousService';

// Re-export astrology service if it exists
export * from './astrology';
