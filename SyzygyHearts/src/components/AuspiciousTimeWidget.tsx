/**
 * Auspicious Time Widget
 *
 * Displays 2-3 favorable time periods for the user based on their BaZi element.
 * Features:
 * - Dark theme with gold accents
 * - Visual timeline or list format
 * - Highlights current hour if auspicious
 * - Shows personalized activity recommendations
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FiveElement, BaZiChart } from '../types';
import {
  getAuspiciousTimes,
  isCurrentTimeAuspicious,
  formatTimeRange,
  getCurrentHourRecommendation,
  AuspiciousTime,
} from '../services/auspiciousService';
import { ELEMENT_COLORS } from '../constants';

interface AuspiciousTimeWidgetProps {
  baziChart: BaZiChart;
  compact?: boolean; // If true, shows condensed version
}

export const AuspiciousTimeWidget: React.FC<AuspiciousTimeWidgetProps> = ({
  baziChart,
  compact = false,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [auspiciousTimes, setAuspiciousTimes] = useState<AuspiciousTime[]>([]);
  const [isCurrentAuspicious, setIsCurrentAuspicious] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState('');

  const userElement = baziChart.dayMasterElement;

  // Update time every minute
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setCurrentTime(now);
      setAuspiciousTimes(getAuspiciousTimes(userElement, now));

      const { isAuspicious } = isCurrentTimeAuspicious(userElement, now);
      setIsCurrentAuspicious(isAuspicious);

      setCurrentRecommendation(getCurrentHourRecommendation(userElement, now));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [userElement]);

  // Check if a time period is currently active
  const isTimePeriodActive = (period: AuspiciousTime): boolean => {
    const currentHour = currentTime.getHours();

    // Handle midnight crossing
    if (period.startHour === 23 && period.endHour === 1) {
      return currentHour === 23 || currentHour === 0;
    }

    return currentHour >= period.startHour && currentHour < period.endHour;
  };

  // Get strength color
  const getStrengthColor = (strength: 'Excellent' | 'Good' | 'Moderate'): string => {
    switch (strength) {
      case 'Excellent':
        return '#FFD700'; // Gold
      case 'Good':
        return '#FFA500'; // Orange-gold
      case 'Moderate':
        return '#DAA520'; // Dark goldenrod
      default:
        return '#FFD700';
    }
  };

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactHeader}>
          <Text style={styles.compactTitle}>Auspicious Times</Text>
          <View style={[styles.elementBadge, { backgroundColor: ELEMENT_COLORS[userElement] }]}>
            <Text style={styles.elementBadgeText}>{userElement}</Text>
          </View>
        </View>
        <Text style={styles.compactRecommendation}>{currentRecommendation}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Auspicious Times Today</Text>
        <View style={[styles.elementBadge, { backgroundColor: ELEMENT_COLORS[userElement] }]}>
          <Text style={styles.elementBadgeText}>{userElement} Element</Text>
        </View>
      </View>

      {/* Current Status */}
      {isCurrentAuspicious && (
        <View style={styles.currentStatusContainer}>
          <View style={styles.currentStatusIndicator} />
          <Text style={styles.currentStatusText}>You're in an auspicious period right now!</Text>
        </View>
      )}

      {/* Time Periods */}
      <ScrollView
        style={styles.timePeriodsList}
        showsVerticalScrollIndicator={false}
      >
        {auspiciousTimes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No strongly auspicious times today.
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Stay open to possibilities throughout the day.
            </Text>
          </View>
        ) : (
          auspiciousTimes.map((period, index) => {
            const isActive = isTimePeriodActive(period);
            const strengthColor = getStrengthColor(period.strength);

            return (
              <View
                key={index}
                style={[
                  styles.timePeriodCard,
                  isActive && styles.timePeriodCardActive,
                ]}
              >
                {/* Left accent bar */}
                <View
                  style={[
                    styles.accentBar,
                    { backgroundColor: strengthColor },
                    isActive && styles.accentBarActive,
                  ]}
                />

                {/* Content */}
                <View style={styles.timePeriodContent}>
                  {/* Time Range */}
                  <View style={styles.timeHeader}>
                    <Text style={[styles.timeRange, isActive && styles.timeRangeActive]}>
                      {formatTimeRange(period.startHour, period.endHour)}
                    </Text>
                    {isActive && (
                      <View style={styles.nowBadge}>
                        <Text style={styles.nowBadgeText}>NOW</Text>
                      </View>
                    )}
                  </View>

                  {/* Chinese Hour Name */}
                  <Text style={styles.chineseHourName}>
                    {period.chineseName} • {period.element} Hour
                  </Text>

                  {/* Strength Indicator */}
                  <View style={styles.strengthContainer}>
                    <View style={[styles.strengthDot, { backgroundColor: strengthColor }]} />
                    <Text style={[styles.strengthText, { color: strengthColor }]}>
                      {period.strength}
                    </Text>
                  </View>

                  {/* Activity Recommendation */}
                  <Text style={styles.activityText}>{period.activity}</Text>

                  {/* Reason */}
                  <Text style={styles.reasonText}>{period.reason}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Footer Tip */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Times are based on your {userElement} day master element
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Container
  container: {
    backgroundColor: '#1C1C1C', // Dark background
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFD700', // Gold
  },
  elementBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  elementBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Current Status
  currentStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  currentStatusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    marginRight: 10,
  },
  currentStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
    flex: 1,
  },

  // Time Periods List
  timePeriodsList: {
    maxHeight: 400,
  },
  timePeriodCard: {
    backgroundColor: '#2A2A2A', // Card background
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  timePeriodCardActive: {
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  accentBar: {
    width: 4,
  },
  accentBarActive: {
    width: 6,
  },
  timePeriodContent: {
    flex: 1,
    padding: 16,
  },

  // Time Header
  timeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeRange: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  timeRangeActive: {
    color: '#FFD700',
  },
  nowBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  nowBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1C1C1C',
  },

  // Chinese Hour Name
  chineseHourName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#B0B0B0',
    marginBottom: 8,
  },

  // Strength Indicator
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  strengthDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  strengthText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Activity & Reason
  activityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 20,
  },
  reasonText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#999999',
    fontStyle: 'italic',
    lineHeight: 18,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    textAlign: 'center',
  },

  // Footer
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#888888',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Compact Version
  compactContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
  },
  compactRecommendation: {
    fontSize: 14,
    fontWeight: '500',
    color: '#CCCCCC',
    lineHeight: 20,
  },
});

export default AuspiciousTimeWidget;
