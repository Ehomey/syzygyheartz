/**
 * RedThreadLine - Animated red thread connection visualization
 * Based on the Chinese legend of the Red Thread of Fate
 * Extracted from App.tsx
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../core/constants';

interface RedThreadLineProps {
  score?: number;
}

export default function RedThreadLine({ score }: RedThreadLineProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = (): void => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(pulse);
    };
    pulse();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: pulseAnim.interpolate({
            inputRange: [1, 1.2],
            outputRange: [0.6, 1],
          }),
        },
      ]}
    >
      <Text style={styles.text}>━━━🧧━━━</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 24,
    color: COLORS.chineseRed,
  },
});
