import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Element, ELEMENT_ATTRIBUTES } from '../data/elementsCycle';
import { ELEMENT_COLORS, ELEMENT_GRADIENTS } from '../constants';

interface ElementVisualizationProps {
  element: Element;
  size?: number;
}

export default function ElementVisualization({ element, size = 180 }: ElementVisualizationProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const attributes = ELEMENT_ATTRIBUTES[element];
  const elementColor = ELEMENT_COLORS[element];
  const gradientColors = ELEMENT_GRADIENTS[element];

  // Map element names to display emojis
  const elementEmojis: Record<Element, string> = {
    [Element.WOOD]: '🌳',
    [Element.FIRE]: '🔥',
    [Element.EARTH]: '⛰️',
    [Element.METAL]: '⚪',
    [Element.WATER]: '💧',
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      {/* Outer glow ring */}
      <Animated.View
        style={[
          styles.glowRing,
          {
            width: size + 40,
            height: size + 40,
            borderRadius: (size + 40) / 2,
            borderColor: elementColor,
            opacity: glowOpacity,
          },
        ]}
      />

      {/* Main element circle */}
      <Animated.View
        style={[
          styles.elementCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: elementColor,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        {/* Element emoji */}
        <Text style={[styles.elementEmoji, { fontSize: size * 0.4 }]}>
          {elementEmojis[element]}
        </Text>
      </Animated.View>

      {/* Element name */}
      <Text style={styles.elementName}>{element}</Text>

      {/* Element attributes */}
      <View style={styles.attributesContainer}>
        <Text style={styles.attributeText}>{attributes.season}</Text>
        <Text style={styles.attributeDot}>•</Text>
        <Text style={styles.attributeText}>{attributes.direction}</Text>
      </View>

      {/* Particle effects */}
      {[...Array(8)].map((_, index) => {
        const angle = (index * 360) / 8;
        const particleAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.loop(
            Animated.sequence([
              Animated.delay(index * 200),
              Animated.timing(particleAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
              }),
              Animated.timing(particleAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
              }),
            ])
          ).start();
        }, []);

        const translateX = particleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.cos((angle * Math.PI) / 180) * 30],
        });

        const translateY = particleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.sin((angle * Math.PI) / 180) * 30],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                backgroundColor: elementColor,
                opacity: particleAnim,
                transform: [{ translateX }, { translateY }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  glowRing: {
    position: 'absolute',
    borderWidth: 3,
  },
  elementCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  elementEmoji: {
    textAlign: 'center',
  },
  elementName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  attributesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  attributeText: {
    fontSize: 14,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  attributeDot: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
