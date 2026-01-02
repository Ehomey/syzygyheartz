import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Element } from '../data/elementsCycle';
import { ELEMENT_COLORS, ZODIAC_TRAITS } from '../constants';
import { ZodiacAnimal } from '../types';

interface RedThreadVisualProps {
  yuanFenScore: number;
  matchElement: Element;
  matchZodiac: ZodiacAnimal;
  angle: number; // Angle from center to position this thread (0-360 degrees)
  distance?: number; // Distance from center (default 150)
  onPress?: () => void;
}

export default function RedThreadVisual({
  yuanFenScore,
  matchElement,
  matchZodiac,
  angle,
  distance = 150,
}: RedThreadVisualProps) {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for the endpoint
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation for thread
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Calculate thread thickness based on compatibility (2-6px)
  const threadThickness = 2 + (yuanFenScore / 100) * 4;

  // Convert angle to radians
  const radians = (angle * Math.PI) / 180;

  // Calculate endpoint position
  const endX = Math.cos(radians) * distance;
  const endY = Math.sin(radians) * distance;

  // Interpolate glow opacity
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  // Interpolate pulse scale
  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  // Get element color and zodiac emoji
  const elementColor = ELEMENT_COLORS[matchElement];
  const zodiacEmoji = ZODIAC_TRAITS[matchZodiac].emoji;

  // Create thread segments for visual effect
  const numSegments = 8;
  const threadSegments = Array.from({ length: numSegments }, (_, i) => {
    const t = i / numSegments;
    // Quadratic bezier curve approximation
    const controlX = endX * 0.5 + Math.cos(radians + Math.PI / 2) * 30;
    const controlY = endY * 0.5 + Math.sin(radians + Math.PI / 2) * 30;

    const x = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * controlX + t * t * endX;
    const y = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * controlY + t * t * endY;

    return { x, y, opacity: 0.8 + t * 0.2 };
  });

  return (
    <View style={[styles.container, { transform: [{ translateX: endX }, { translateY: endY }] }]}>
      {/* Red Thread visualization using dots */}
      {threadSegments.map((segment, index) => (
        <Animated.View
          key={index}
          style={[
            styles.threadDot,
            {
              width: threadThickness,
              height: threadThickness,
              borderRadius: threadThickness / 2,
              backgroundColor: '#C41E3A',
              position: 'absolute',
              left: -segment.x,
              top: -segment.y,
              opacity: segment.opacity * glowOpacity,
            },
          ]}
        />
      ))}

      {/* Glow dots along thread */}
      {threadSegments.filter((_, i) => i % 2 === 0).map((segment, index) => (
        <Animated.View
          key={`glow-${index}`}
          style={[
            styles.threadGlow,
            {
              width: threadThickness * 2.5,
              height: threadThickness * 2.5,
              borderRadius: threadThickness * 1.25,
              position: 'absolute',
              left: -segment.x,
              top: -segment.y,
              opacity: glowOpacity.interpolate({
                inputRange: [0.5, 1],
                outputRange: [0.2, 0.4],
              }),
            },
          ]}
        />
      ))}

      {/* Match Preview at endpoint */}
      <Animated.View
        style={[
          styles.matchPreview,
          {
            transform: [{ scale: pulseScale }],
          },
        ]}
      >
        {/* Element background with glow */}
        <Animated.View
          style={[
            styles.elementGlow,
            {
              backgroundColor: elementColor,
              opacity: glowOpacity.interpolate({
                inputRange: [0.5, 1],
                outputRange: [0.3, 0.5],
              }),
            },
          ]}
        />

        {/* Element circle */}
        <View
          style={[
            styles.elementCircle,
            {
              backgroundColor: elementColor,
            },
          ]}
        >
          {/* Zodiac emoji */}
          <Text style={styles.zodiacEmoji}>{zodiacEmoji}</Text>
        </View>

        {/* Yuan Fen score badge */}
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>{yuanFenScore}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  threadDot: {
    elevation: 2,
    shadowColor: '#C41E3A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  threadGlow: {
    backgroundColor: '#C41E3A',
  },
  matchPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  elementGlow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  elementCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    elevation: 5,
    shadowColor: '#C41E3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  zodiacEmoji: {
    fontSize: 24,
  },
  scoreBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: '#C41E3A',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  scoreText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1C1C1C',
  },
});
