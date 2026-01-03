/**
 * HomeScreen - Main discovery screen with swipeable cards
 * Features zodiac wheel and Red Thread matching
 * Extracted from App.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../../../core/constants';
import { FiveElement } from '../../../core/types';
import { StarsBackground, ZodiacWheel, RedThreadCard } from '../../components';
import type { ProfileData } from '../../components';

const mockProfiles: ProfileData[] = [
  {
    id: 1,
    name: 'Mei Lin',
    age: 26,
    chineseSign: 'Rabbit',
    chineseEmoji: '🐰',
    element: 'Wood',
    yuanFenScore: 94,
    luckyNumbers: [3, 6, 9],
  },
  {
    id: 2,
    name: 'Li Wei',
    age: 24,
    chineseSign: 'Dragon',
    chineseEmoji: '🐲',
    element: 'Earth',
    yuanFenScore: 87,
    luckyNumbers: [8, 16, 24],
  },
  {
    id: 3,
    name: 'Xiao Yun',
    age: 28,
    chineseSign: 'Tiger',
    chineseEmoji: '🐯',
    element: 'Wood',
    yuanFenScore: 82,
    luckyNumbers: [1, 3, 7],
  },
  {
    id: 4,
    name: 'Chen Hui',
    age: 25,
    chineseSign: 'Monkey',
    chineseEmoji: '🐵',
    element: 'Metal',
    yuanFenScore: 79,
    luckyNumbers: [4, 9, 13],
  },
  {
    id: 5,
    name: 'Jing Wen',
    age: 27,
    chineseSign: 'Snake',
    chineseEmoji: '🐍',
    element: 'Fire',
    yuanFenScore: 91,
    luckyNumbers: [2, 8, 9],
  },
];

interface ZodiacData {
  animal: string;
  emoji: string;
  character: string;
}

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWheel, setShowWheel] = useState(true);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      Alert.alert(
        '红线已连! (Red Thread Connected!)',
        `Fate has connected you with ${mockProfiles[currentIndex].name}`
      );
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleAnimalSelect = (animal: ZodiacData) => {
    Alert.alert('Filter by ' + animal.character, `Showing ${animal.animal} matches`);
  };

  return (
    <View style={styles.container}>
      <StarsBackground />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.chineseTitle}>缘分发现</Text>
        <Text style={styles.title}>Destiny Discovery</Text>
        <Text style={styles.subtitle}>Follow the red thread to your fated match</Text>
      </View>

      {/* Zodiac Wheel Section */}
      {showWheel && currentIndex < mockProfiles.length && (
        <View style={styles.wheelSection}>
          <ZodiacWheel onAnimalSelect={handleAnimalSelect} />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowWheel(false)}
          >
            <Text style={styles.toggleText}>Hide Wheel</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showWheel && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowWheel(true)}
        >
          <Text style={styles.toggleText}>Show Zodiac Wheel</Text>
        </TouchableOpacity>
      )}

      {/* Card Stack */}
      <View style={styles.cardStack}>
        {currentIndex < mockProfiles.length ? (
          <RedThreadCard
            profile={mockProfiles[currentIndex]}
            onSwipe={handleSwipe}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🧧</Text>
            <Text style={styles.emptyTitle}>缘分已尽</Text>
            <Text style={styles.emptySubtitle}>No more destined connections for today</Text>
            <Text style={styles.emptyMessage}>Check back tomorrow for new fated matches</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleSwipe('left')}
        >
          <Text style={styles.actionIcon}>✕</Text>
          <Text style={styles.actionLabel}>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.destinyButton}>
          <Text style={styles.actionIcon}>🔮</Text>
          <Text style={styles.actionLabel}>Read Destiny</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleSwipe('right')}
        >
          <Text style={styles.actionIcon}>🧧</Text>
          <Text style={styles.actionLabel}>Accept Fate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inkBlack,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    alignItems: 'center',
  },
  chineseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.imperialGold,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.creamWhite,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 4,
  },
  wheelSection: {
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: COLORS.darkGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.imperialGold,
    marginVertical: 10,
  },
  toggleText: {
    color: COLORS.imperialGold,
    fontSize: 14,
  },
  cardStack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    color: COLORS.creamWhite,
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptySubtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 8,
  },
  emptyMessage: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20,
  },
  rejectButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  destinyButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  acceptButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.chineseRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  actionIcon: {
    fontSize: 24,
    color: COLORS.creamWhite,
  },
  actionLabel: {
    fontSize: 10,
    color: COLORS.creamWhite,
    marginTop: 4,
  },
});
