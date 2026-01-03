/**
 * TabIcon - Tab bar icon component
 * Displays different emoji icons based on route and focus state
 * Extracted from App.tsx
 */

import React from 'react';
import { Text, StyleSheet } from 'react-native';

type TabName = 'Home' | 'Horoscope' | 'Messages' | 'Profile' | 'Community';

interface TabIconProps {
  name: TabName;
  focused: boolean;
}

const icons: Record<TabName, { focused: string; unfocused: string }> = {
  Home: { focused: '🏠', unfocused: '🏡' },
  Horoscope: { focused: '🔮', unfocused: '🌟' },
  Messages: { focused: '💬', unfocused: '✉️' },
  Profile: { focused: '👤', unfocused: '👥' },
  Community: { focused: '🌍', unfocused: '🌐' },
};

export default function TabIcon({ name, focused }: TabIconProps) {
  const iconSet = icons[name];
  const icon = focused ? iconSet.focused : iconSet.unfocused;

  return <Text style={styles.icon}>{icon}</Text>;
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
});
