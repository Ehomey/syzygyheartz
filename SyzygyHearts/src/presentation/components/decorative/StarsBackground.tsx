/**
 * StarsBackground - Animated starfield background
 * Extracted from App.tsx
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS } from '../../../core/constants';

const { width, height } = Dimensions.get('window');

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: Animated.Value;
}

interface StarsBackgroundProps {
  starCount?: number;
}

export default function StarsBackground({ starCount = 50 }: StarsBackgroundProps) {
  const stars = useRef<Star[]>(
    Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      opacity: new Animated.Value(Math.random()),
    }))
  ).current;

  useEffect(() => {
    const animations = stars.map((star) => {
      const twinkle = (): void => {
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 2000 + 1000,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.3,
            duration: Math.random() * 2000 + 1000,
            useNativeDriver: true,
          }),
        ]).start(twinkle);
      };
      twinkle();
      return star.opacity;
    });

    // Cleanup function to stop animations
    return () => {
      animations.forEach((anim) => anim.stopAnimation());
    };
  }, [stars]);

  return (
    <View style={StyleSheet.absoluteFill}>
      {stars.map((star, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            borderRadius: star.size / 2,
            backgroundColor: COLORS.creamWhite,
            opacity: star.opacity,
          }}
        />
      ))}
    </View>
  );
}
