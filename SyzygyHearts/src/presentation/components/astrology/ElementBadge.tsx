/**
 * ElementBadge - Displays a Five Elements badge
 * Extracted from App.tsx
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FiveElement } from '../../../core/types';
import { ELEMENT_ATTRIBUTES, getElementColor, getElementTextColor } from '../../../core/constants';

interface ElementBadgeProps {
  element: FiveElement;
  size?: number;
  showName?: boolean;
}

export default function ElementBadge({ element, size = 40, showName = true }: ElementBadgeProps) {
  const attributes = ELEMENT_ATTRIBUTES[element];
  const backgroundColor = getElementColor(element);
  const textColor = getElementTextColor(element);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.emoji, { fontSize: size * 0.4 }]}>
        {attributes.emoji}
      </Text>
      {showName && (
        <Text style={[styles.character, { color: textColor, fontSize: size * 0.3 }]}>
          {attributes.chinese}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFDD0',
  },
  emoji: {
    textAlign: 'center',
  },
  character: {
    fontWeight: 'bold',
  },
});
