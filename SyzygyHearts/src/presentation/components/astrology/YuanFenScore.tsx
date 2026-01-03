/**
 * YuanFenScore - Displays the Yuan Fen (destiny/fate) compatibility score
 * Extracted from App.tsx
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../core/constants';

interface YuanFenScoreProps {
  score: number;
  size?: number;
}

function getThreadColor(score: number): string {
  if (score >= 90) return COLORS.imperialGold;
  if (score >= 80) return COLORS.chineseRed;
  if (score >= 60) return COLORS.jadeGreen;
  return COLORS.gray;
}

export default function YuanFenScore({ score, size = 100 }: YuanFenScoreProps) {
  const borderColor = getThreadColor(score);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.circle, { borderColor }]}>
        <Text style={[styles.score, { fontSize: size * 0.32 }]}>{score}</Text>
        <Text style={[styles.label, { fontSize: size * 0.12 }]}>缘分</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.inkBlack,
  },
  score: {
    fontWeight: 'bold',
    color: COLORS.creamWhite,
  },
  label: {
    color: COLORS.imperialGold,
    marginTop: 4,
  },
});
