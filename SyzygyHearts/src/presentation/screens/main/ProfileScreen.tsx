/**
 * ProfileScreen - User profile with BaZi chart
 * Displays four pillars, five elements balance, and birth data
 * Extracted from App.tsx
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ELEMENT_ATTRIBUTES } from '../../../core/constants';
import { FiveElement } from '../../../core/types';
import { StarsBackground } from '../../components';

interface BirthData {
  date: string;
  time: string;
  location: string;
}

interface PillarData {
  heavenly: string;
  earthly: string;
  element: FiveElement;
}

interface BaZiData {
  year: PillarData;
  month: PillarData;
  day: PillarData;
  hour: PillarData;
}

// Mock BaZi data (Four Pillars)
const mockBaZiData: BaZiData = {
  year: { heavenly: '甲', earthly: '子', element: 'Wood' },
  month: { heavenly: '丙', earthly: '寅', element: 'Fire' },
  day: { heavenly: '戊', earthly: '辰', element: 'Earth' },
  hour: { heavenly: '庚', earthly: '午', element: 'Metal' },
};

const fiveElementsList: { key: FiveElement; name: string; emoji: string }[] = [
  { key: 'Metal', name: '金', emoji: '⚪' },
  { key: 'Wood', name: '木', emoji: '🌳' },
  { key: 'Water', name: '水', emoji: '💧' },
  { key: 'Fire', name: '火', emoji: '🔥' },
  { key: 'Earth', name: '土', emoji: '⬜' },
];

export default function ProfileScreen() {
  const [birthData, setBirthData] = useState<BirthData | null>(null);

  useEffect(() => {
    const loadBirthData = async () => {
      try {
        const data = await AsyncStorage.getItem('birthData');
        if (data) setBirthData(JSON.parse(data));
      } catch (error) {
        console.error(error);
      }
    };
    loadBirthData();
  }, []);

  const getElementColor = (element: FiveElement): string => {
    return ELEMENT_ATTRIBUTES[element]?.color || COLORS.gray;
  };

  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🐲</Text>
          </View>
          <Text style={styles.profileName}>Your Profile</Text>
          <Text style={styles.signText}>🐲 Dragon • 龙</Text>
          <Text style={styles.elementText}>Earth Element • 土</Text>
        </View>

        {/* BaZi Chart */}
        <View style={styles.baziContainer}>
          <Text style={styles.baziTitle}>八字 BaZi Chart</Text>
          <Text style={styles.baziSubtitle}>Four Pillars of Destiny</Text>

          <View style={styles.pillars}>
            {(['year', 'month', 'day', 'hour'] as const).map((pillarKey) => {
              const pillar = mockBaZiData[pillarKey];
              const labels = {
                year: '年 Year',
                month: '月 Month',
                day: '日 Day',
                hour: '时 Hour',
              };

              return (
                <View key={pillarKey} style={styles.pillar}>
                  <Text style={styles.pillarLabel}>{labels[pillarKey]}</Text>
                  <View
                    style={[
                      styles.pillarBox,
                      { backgroundColor: getElementColor(pillar.element) },
                    ]}
                  >
                    <Text style={styles.pillarHeavenly}>{pillar.heavenly}</Text>
                    <Text style={styles.pillarEarthly}>{pillar.earthly}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Five Elements Balance */}
        <View style={styles.elementsContainer}>
          <Text style={styles.elementsTitle}>五行 Five Elements Balance</Text>
          <View style={styles.elementsRow}>
            {fiveElementsList.map((element) => (
              <View key={element.key} style={styles.elementItem}>
                <Text style={styles.elementEmoji}>{element.emoji}</Text>
                <Text style={styles.elementName}>{element.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Birth Data */}
        {birthData ? (
          <View style={styles.birthDataCard}>
            <Text style={styles.birthDataTitle}>出生信息 Birth Information</Text>
            <View style={styles.birthDataRow}>
              <Text style={styles.birthDataLabel}>📅 Date</Text>
              <Text style={styles.birthDataValue}>{birthData.date}</Text>
            </View>
            <View style={styles.birthDataRow}>
              <Text style={styles.birthDataLabel}>⏰ Time</Text>
              <Text style={styles.birthDataValue}>{birthData.time}</Text>
            </View>
            <View style={styles.birthDataRow}>
              <Text style={styles.birthDataLabel}>📍 Location</Text>
              <Text style={styles.birthDataValue}>{birthData.location}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noBirthData}>No birth data found</Text>
        )}

        {/* Lucky Numbers and Colors */}
        <View style={styles.luckyCard}>
          <Text style={styles.luckyTitle}>吉祥 Lucky Information</Text>
          <View style={styles.luckyRow}>
            <Text style={styles.luckyLabel}>Lucky Numbers:</Text>
            <View style={styles.luckyNumbers}>
              {[3, 6, 9].map((num, idx) => (
                <View key={idx} style={styles.luckyBadge}>
                  <Text style={styles.luckyText}>{num}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.luckyRow}>
            <Text style={styles.luckyLabel}>Auspicious Colors:</Text>
            <View style={styles.luckyColors}>
              <View style={[styles.colorSwatch, { backgroundColor: COLORS.chineseRed }]} />
              <View style={[styles.colorSwatch, { backgroundColor: COLORS.imperialGold }]} />
              <View style={[styles.colorSwatch, { backgroundColor: COLORS.jadeGreen }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inkBlack,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.imperialGold,
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  profileName: {
    color: COLORS.creamWhite,
    fontSize: 24,
    fontWeight: 'bold',
  },
  signText: {
    fontSize: 16,
    color: COLORS.imperialGold,
  },
  elementText: {
    fontSize: 14,
    color: COLORS.jadeGreen,
    marginTop: 4,
  },
  baziContainer: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  baziTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.imperialGold,
    textAlign: 'center',
  },
  baziSubtitle: {
    fontSize: 14,
    color: COLORS.creamWhite,
    textAlign: 'center',
    marginBottom: 20,
  },
  pillars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pillar: {
    alignItems: 'center',
  },
  pillarLabel: {
    fontSize: 12,
    color: COLORS.creamWhite,
    marginBottom: 8,
  },
  pillarBox: {
    width: 70,
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.inkBlack,
  },
  pillarHeavenly: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.inkBlack,
  },
  pillarEarthly: {
    fontSize: 20,
    color: COLORS.inkBlack,
    marginTop: 4,
  },
  elementsContainer: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.jadeGreen,
  },
  elementsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.jadeGreen,
    marginBottom: 16,
  },
  elementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  elementItem: {
    alignItems: 'center',
  },
  elementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  elementName: {
    fontSize: 16,
    color: COLORS.creamWhite,
    fontWeight: 'bold',
  },
  birthDataCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.imperialGold,
  },
  birthDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.imperialGold,
    marginBottom: 16,
  },
  birthDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inkBlack,
  },
  birthDataLabel: {
    color: COLORS.gray,
    fontSize: 14,
  },
  birthDataValue: {
    color: COLORS.creamWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noBirthData: {
    color: COLORS.gray,
    textAlign: 'center',
    marginVertical: 20,
  },
  luckyCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.chineseRed,
  },
  luckyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.chineseRed,
    marginBottom: 16,
  },
  luckyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  luckyLabel: {
    fontSize: 14,
    color: COLORS.creamWhite,
    marginRight: 12,
  },
  luckyNumbers: {
    flexDirection: 'row',
    gap: 8,
  },
  luckyBadge: {
    backgroundColor: COLORS.chineseRed,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  luckyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.creamWhite,
  },
  luckyColors: {
    flexDirection: 'row',
    gap: 12,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.creamWhite,
  },
});
