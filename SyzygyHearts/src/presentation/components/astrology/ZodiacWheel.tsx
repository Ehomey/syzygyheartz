/**
 * ZodiacWheel - Rotating Chinese zodiac wheel component
 * Displays the 12 Chinese zodiac animals in a circular arrangement
 * Extracted from App.tsx
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, ZODIAC_ATTRIBUTES } from '../../../core/constants';
import { ZodiacAnimal } from '../../../core/types';

const { width } = Dimensions.get('window');

interface ZodiacData {
  animal: ZodiacAnimal;
  emoji: string;
  character: string;
}

interface ZodiacWheelProps {
  onAnimalSelect?: (animal: ZodiacData) => void;
}

const chineseZodiacOrder: ZodiacData[] = [
  { animal: 'Rat', emoji: '🐭', character: '鼠' },
  { animal: 'Ox', emoji: '🐮', character: '牛' },
  { animal: 'Tiger', emoji: '🐯', character: '虎' },
  { animal: 'Rabbit', emoji: '🐰', character: '兔' },
  { animal: 'Dragon', emoji: '🐲', character: '龙' },
  { animal: 'Snake', emoji: '🐍', character: '蛇' },
  { animal: 'Horse', emoji: '🐴', character: '马' },
  { animal: 'Goat', emoji: '🐐', character: '羊' },
  { animal: 'Monkey', emoji: '🐵', character: '猴' },
  { animal: 'Rooster', emoji: '🐔', character: '鸡' },
  { animal: 'Dog', emoji: '🐶', character: '狗' },
  { animal: 'Pig', emoji: '🐷', character: '猪' },
];

export default function ZodiacWheel({ onAnimalSelect }: ZodiacWheelProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateWheel = (): void => {
      Animated.timing(rotation, {
        toValue: 360,
        duration: 30000,
        useNativeDriver: true,
      }).start(() => {
        rotation.setValue(0);
        rotateWheel();
      });
    };

    rotateWheel();

    return () => {
      rotation.stopAnimation();
    };
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wheel,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        {chineseZodiacOrder.map((zodiac, index) => {
          const angle = (index * 30 - 90) * (Math.PI / 180);
          const radius = 110;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <TouchableOpacity
              key={zodiac.animal}
              style={[
                styles.animal,
                {
                  left: width / 2 + x - 20,
                  top: 150 + y - 20,
                },
              ]}
              onPress={() => onAnimalSelect?.(zodiac)}
            >
              <Text style={styles.emoji}>{zodiac.emoji}</Text>
              <Text style={styles.character}>{zodiac.character}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <View style={styles.center}>
        <Text style={styles.centerText}>缘</Text>
        <Text style={styles.centerSubtext}>Yuan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  wheel: {
    width: width,
    height: 300,
    position: 'relative',
  },
  animal: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  character: {
    fontSize: 10,
    color: COLORS.imperialGold,
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.chineseRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.imperialGold,
  },
  centerText: {
    fontSize: 24,
    color: COLORS.creamWhite,
    fontWeight: 'bold',
  },
  centerSubtext: {
    fontSize: 10,
    color: COLORS.creamWhite,
  },
});
