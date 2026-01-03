/**
 * HoroscopeScreen - Daily horoscope display
 * Shows love, career, and wellness horoscopes with transits
 * Extracted from App.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../../core/constants';
import { StarsBackground } from '../../components';

type HoroscopeTab = 'love' | 'career' | 'wellness';

const horoscopes: Record<HoroscopeTab, string> = {
  love: 'Venus enters your seventh house today, bringing harmony to relationships. A chance encounter could spark something beautiful.',
  career: 'Mercury aligns with Jupiter in your tenth house. Professional opportunities abound—speak your ideas confidently.',
  wellness: 'The Moon in your sixth house emphasizes self-care. Prioritize rest and mindful activities.',
};

const tabs: { key: HoroscopeTab; icon: string; label: string }[] = [
  { key: 'love', icon: '💕', label: 'Love' },
  { key: 'career', icon: '💼', label: 'Career' },
  { key: 'wellness', icon: '🧘', label: 'Wellness' },
];

export default function HoroscopeScreen() {
  const [activeTab, setActiveTab] = useState<HoroscopeTab>('love');

  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Daily Horoscope</Text>
        <Text style={styles.subtitle}>December 14, 2025</Text>

        <View style={styles.zodiacDisplay}>
          <Text style={styles.bigZodiac}>♍</Text>
          <Text style={styles.zodiacName}>Virgo</Text>
          <Text style={styles.zodiacDates}>Aug 23 - Sep 22</Text>
        </View>

        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.horoscopeCard}>
          <Text style={styles.horoscopeText}>{horoscopes[activeTab]}</Text>
        </View>

        <View style={styles.transitCard}>
          <Text style={styles.transitTitle}>Today's Transits</Text>
          <View style={styles.transitItem}>
            <Text style={styles.transitPlanet}>☿ Mercury</Text>
            <Text style={styles.transitSign}>→ Capricorn</Text>
          </View>
          <View style={styles.transitItem}>
            <Text style={styles.transitPlanet}>♀ Venus</Text>
            <Text style={styles.transitSign}>→ Aquarius</Text>
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
  zodiacDisplay: {
    alignItems: 'center',
    marginVertical: 24,
  },
  bigZodiac: {
    fontSize: 64,
    color: COLORS.imperialGold,
  },
  zodiacName: {
    color: COLORS.creamWhite,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  zodiacDates: {
    color: COLORS.gray,
    fontSize: 14,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.darkGray,
  },
  activeTab: {
    backgroundColor: COLORS.chineseRed,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  activeTabText: {
    color: COLORS.creamWhite,
    fontWeight: 'bold',
  },
  horoscopeCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  horoscopeText: {
    color: COLORS.lightGray,
    fontSize: 16,
    lineHeight: 24,
  },
  transitCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 20,
  },
  transitTitle: {
    color: COLORS.creamWhite,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inkBlack,
  },
  transitPlanet: {
    color: COLORS.imperialGold,
    fontSize: 16,
  },
  transitSign: {
    color: COLORS.lightGray,
    fontSize: 16,
  },
});
