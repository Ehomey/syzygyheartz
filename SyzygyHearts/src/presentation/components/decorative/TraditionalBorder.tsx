/**
 * TraditionalBorder - Chinese-inspired decorative border pattern
 * Wraps content with traditional pattern characters
 * Extracted from App.tsx
 */

import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../core/constants';

type BorderPattern = 'cloud' | 'lattice' | 'lotus';

interface TraditionalBorderProps {
  children: ReactNode;
  pattern?: BorderPattern;
}

const patternChars: Record<BorderPattern, string> = {
  cloud: '☁',
  lattice: '回',
  lotus: '✿',
};

export default function TraditionalBorder({
  children,
  pattern = 'cloud',
}: TraditionalBorderProps) {
  const char = patternChars[pattern];
  const patternString = char.repeat(20);

  return (
    <View style={styles.container}>
      <Text style={styles.pattern}>{patternString}</Text>
      {children}
      <Text style={styles.pattern}>{patternString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.imperialGold,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pattern: {
    fontSize: 10,
    color: COLORS.imperialGold,
    textAlign: 'center',
    opacity: 0.5,
  },
});
