import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface ThreadStrengthMeterProps {
  strength: number; // 0-100
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  animated?: boolean;
}

export default function ThreadStrengthMeter({
  strength,
  size = 'medium',
  showLabel = true,
  animated = true,
}: ThreadStrengthMeterProps) {
  const fillAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Clamp strength between 0 and 100
  const clampedStrength = Math.max(0, Math.min(100, strength));

  // Get label based on strength
  const getLabel = () => {
    if (clampedStrength >= 80) return 'Flourishing';
    if (clampedStrength >= 50) return 'Growing';
    if (clampedStrength >= 25) return 'Stable';
    return 'Withering';
  };

  // Get color based on strength (gradient from Red to Gold)
  const getColor = () => {
    if (clampedStrength >= 80) return '#FFD700'; // Gold - Flourishing
    if (clampedStrength >= 50) return '#2ECC71'; // Green - Growing
    if (clampedStrength >= 25) return '#E67E22'; // Orange - Stable
    return '#C41E3A'; // Red - Withering
  };

  // Get size dimensions
  const getDimensions = () => {
    switch (size) {
      case 'small':
        return { height: 6, borderRadius: 3, fontSize: 10 };
      case 'large':
        return { height: 12, borderRadius: 6, fontSize: 14 };
      default:
        return { height: 8, borderRadius: 4, fontSize: 12 };
    }
  };

  const dimensions = getDimensions();
  const color = getColor();
  const label = getLabel();

  useEffect(() => {
    if (animated) {
      // Animate fill to current strength
      Animated.timing(fillAnim, {
        toValue: clampedStrength,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();

      // Pulse animation for withering threads
      if (clampedStrength < 25) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    } else {
      fillAnim.setValue(clampedStrength);
    }
  }, [clampedStrength, animated]);

  const fillWidth = animated
    ? fillAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      })
    : `${clampedStrength}%`;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.meterContainer,
          {
            height: dimensions.height,
            borderRadius: dimensions.borderRadius,
          },
        ]}
      >
        {/* Background track */}
        <View style={styles.track} />

        {/* Filled portion */}
        <Animated.View
          style={[
            styles.fill,
            {
              width: fillWidth,
              backgroundColor: color,
              borderRadius: dimensions.borderRadius,
              transform: clampedStrength < 25 ? [{ scale: pulseAnim }] : [],
            },
          ]}
        />
      </View>

      {/* Label */}
      {showLabel && (
        <Text
          style={[
            styles.label,
            {
              color: color,
              fontSize: dimensions.fontSize,
              fontWeight: clampedStrength < 25 ? 'bold' : '600',
            },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  meterContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  track: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
});
