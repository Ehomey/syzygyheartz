/**
 * RedThreadCard - Swipeable profile card with Chinese-inspired design
 * Features Yuan Fen score, element badges, and traditional border patterns
 * Extracted from App.tsx
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { COLORS, ELEMENT_ATTRIBUTES } from '../../../core/constants';
import { FiveElement } from '../../../core/types';
import ElementBadge from '../astrology/ElementBadge';
import RedThreadLine from '../astrology/RedThreadLine';

const { width } = Dimensions.get('window');

export interface ProfileData {
  id: number;
  name: string;
  age: number;
  chineseSign: string;
  chineseEmoji: string;
  element: FiveElement;
  yuanFenScore: number;
  luckyNumbers: number[];
}

interface RedThreadCardProps {
  profile: ProfileData;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function RedThreadCard({ profile, onSwipe }: RedThreadCardProps) {
  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = pan.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          Animated.spring(pan, {
            toValue: { x: width + 100, y: gesture.dy },
            useNativeDriver: false,
          }).start(() => onSwipe('right'));
        } else if (gesture.dx < -120) {
          Animated.spring(pan, {
            toValue: { x: -width - 100, y: gesture.dy },
            useNativeDriver: false,
          }).start(() => onSwipe('left'));
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const elementAttributes = ELEMENT_ATTRIBUTES[profile.element];

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate },
          ],
        },
      ]}
    >
      {/* Top border pattern */}
      <View style={styles.borderTop}>
        <Text style={styles.borderText}>☁ 回 ☁ 回 ☁ 回 ☁</Text>
      </View>

      {/* Profile image section */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>{profile.chineseEmoji}</Text>
        </View>

        {/* Yuan Fen Score Badge */}
        <View style={styles.yuanFenBadge}>
          <Text style={styles.yuanFenScore}>{profile.yuanFenScore}</Text>
          <Text style={styles.yuanFenLabel}>缘分</Text>
          <Text style={styles.yuanFenSubtext}>Yuan Fen</Text>
        </View>
      </View>

      {/* Red Thread Connection */}
      <RedThreadLine score={profile.yuanFenScore} />

      {/* Card Info */}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {profile.name}, {profile.age}
          </Text>
          <Text style={styles.sign}>
            {profile.chineseEmoji} {profile.chineseSign}
          </Text>
        </View>

        {/* Five Element Badge */}
        <View style={styles.elementRow}>
          <ElementBadge element={profile.element} size={50} />
          <View style={styles.elementInfo}>
            <Text style={styles.elementName}>
              Element: {profile.element}
            </Text>
            <Text style={styles.elementChinese}>
              {elementAttributes?.chinese || ''}
            </Text>
          </View>
        </View>

        {/* Lucky Numbers */}
        <View style={styles.luckyRow}>
          <Text style={styles.luckyLabel}>Lucky Numbers: </Text>
          {profile.luckyNumbers.map((num, idx) => (
            <View key={idx} style={styles.luckyBadge}>
              <Text style={styles.luckyText}>{num}</Text>
            </View>
          ))}
        </View>

        {/* Destiny Message */}
        <View style={styles.destinyContainer}>
          <Text style={styles.destinyText}>
            "Red threads connect those destined to meet, regardless of time,
            place, or circumstance."
          </Text>
        </View>
      </View>

      {/* Bottom border pattern */}
      <View style={styles.borderBottom}>
        <Text style={styles.borderText}>✿ 回 ✿ 回 ✿ 回 ✿</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    minHeight: 520,
    backgroundColor: COLORS.darkGray,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  borderTop: {
    backgroundColor: COLORS.inkBlack,
    paddingVertical: 8,
  },
  borderBottom: {
    backgroundColor: COLORS.inkBlack,
    paddingVertical: 8,
  },
  borderText: {
    fontSize: 12,
    color: COLORS.imperialGold,
    textAlign: 'center',
    opacity: 0.7,
  },
  imageContainer: {
    height: 280,
    backgroundColor: COLORS.inkBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmoji: {
    fontSize: 48,
  },
  yuanFenBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.chineseRed,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  yuanFenScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.creamWhite,
  },
  yuanFenLabel: {
    fontSize: 14,
    color: COLORS.imperialGold,
  },
  yuanFenSubtext: {
    fontSize: 10,
    color: COLORS.creamWhite,
    marginTop: 2,
  },
  info: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    color: COLORS.creamWhite,
    fontSize: 24,
    fontWeight: 'bold',
  },
  sign: {
    fontSize: 16,
    color: COLORS.imperialGold,
  },
  elementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  elementInfo: {
    marginLeft: 12,
  },
  elementName: {
    fontSize: 14,
    color: COLORS.creamWhite,
  },
  elementChinese: {
    fontSize: 24,
    color: COLORS.imperialGold,
    fontWeight: 'bold',
  },
  luckyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    flexWrap: 'wrap',
  },
  luckyLabel: {
    fontSize: 14,
    color: COLORS.creamWhite,
  },
  luckyBadge: {
    backgroundColor: COLORS.imperialGold,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  luckyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.inkBlack,
  },
  destinyContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.inkBlack,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.chineseRed,
  },
  destinyText: {
    fontSize: 12,
    color: COLORS.creamWhite,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
