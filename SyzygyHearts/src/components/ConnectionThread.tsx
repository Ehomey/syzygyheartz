import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Element } from '../data/elementsCycle';
import { ZodiacAnimal } from '../types';
import { ELEMENT_COLORS, ZODIAC_TRAITS } from '../constants';
import ThreadStrengthMeter from './ThreadStrengthMeter';

export interface ConnectionData {
  id: string;
  matchName: string;
  element: Element;
  zodiac: ZodiacAnimal;
  threadStrength: number; // 0-100
  daysSinceLastMessage: number;
  lastMessageAt?: Date;
}

interface ConnectionThreadProps {
  connection: ConnectionData;
  onWater: (connectionId: string) => void;
  onPress?: (connectionId: string) => void;
}

export default function ConnectionThread({
  connection,
  onWater,
  onPress,
}: ConnectionThreadProps) {
  const isWithering = connection.threadStrength === 0;
  const isWarning = connection.threadStrength < 25 && connection.threadStrength > 0;
  const elementColor = ELEMENT_COLORS[connection.element];
  const zodiacEmoji = ZODIAC_TRAITS[connection.zodiac].emoji;

  const handlePress = () => {
    if (onPress) {
      onPress(connection.id);
    }
  };

  const handleWater = () => {
    onWater(connection.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isWithering && styles.witheringContainer,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Match Info */}
      <View style={styles.header}>
        {/* Element Icon */}
        <View
          style={[
            styles.elementIcon,
            {
              backgroundColor: isWithering ? '#3A3A3A' : elementColor,
              opacity: isWithering ? 0.4 : 1,
            },
          ]}
        >
          <Text style={styles.zodiacEmoji}>{zodiacEmoji}</Text>
        </View>

        {/* Name and Element */}
        <View style={styles.info}>
          <Text
            style={[
              styles.name,
              isWithering && styles.witheringText,
            ]}
          >
            {connection.matchName}
          </Text>
          <Text
            style={[
              styles.element,
              { color: isWithering ? '#666' : elementColor },
            ]}
          >
            {connection.element}
          </Text>
        </View>

        {/* Warning Icon for withering/warning state */}
        {(isWithering || isWarning) && (
          <View style={styles.warningBadge}>
            <Text style={styles.warningIcon}>{isWithering ? '💀' : '⚠️'}</Text>
          </View>
        )}
      </View>

      {/* Thread Strength Meter */}
      <View style={styles.meterSection}>
        <ThreadStrengthMeter
          strength={connection.threadStrength}
          size="medium"
          showLabel={true}
          animated={true}
        />
      </View>

      {/* Time Since Last Message */}
      <View style={styles.footer}>
        <Text style={styles.timeText}>
          {connection.daysSinceLastMessage === 0
            ? 'Today'
            : connection.daysSinceLastMessage === 1
            ? '1 day ago'
            : `${connection.daysSinceLastMessage} days ago`}
        </Text>

        {/* Water Button */}
        <TouchableOpacity
          style={[
            styles.waterButton,
            isWithering && styles.reviveButton,
          ]}
          onPress={handleWater}
          activeOpacity={0.8}
        >
          <Text style={styles.waterIcon}>{isWithering ? '🌱' : '💧'}</Text>
          <Text style={styles.waterText}>
            {isWithering ? 'Revive' : 'Water'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Withering Overlay */}
      {isWithering && <View style={styles.witheringOverlay} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  witheringContainer: {
    borderColor: '#C41E3A',
    borderWidth: 1.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  elementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    marginRight: 12,
  },
  zodiacEmoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 2,
  },
  witheringText: {
    color: '#666',
  },
  element: {
    fontSize: 14,
    fontWeight: '600',
  },
  warningBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C41E3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningIcon: {
    fontSize: 18,
  },
  meterSection: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  waterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498DB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#3498DB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
  },
  reviveButton: {
    backgroundColor: '#2ECC71',
    shadowColor: '#2ECC71',
  },
  waterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  waterText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  witheringOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    pointerEvents: 'none',
  },
});
