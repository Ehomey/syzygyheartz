/**
 * WelcomeScreen - Onboarding welcome screen
 * First screen users see with animated title and CTA
 * Extracted from App.tsx
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../../../core/constants';
import { StarsBackground } from '../../components';

type WelcomeScreenNavigationProp = StackNavigationProp<any, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function WelcomeScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StarsBackground />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.zodiacRing}>{zodiacSymbols.join(' ')}</Text>
        <Text style={styles.title}>Syzygy Hearts</Text>
        <Text style={styles.subtitle}>Find love written in the stars</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>
          Where cosmic connections become lasting bonds
        </Text>
      </Animated.View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BirthInput')}
      >
        <Text style={styles.buttonText}>Begin Your Journey</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inkBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  zodiacRing: {
    fontSize: 20,
    color: COLORS.imperialGold,
    marginBottom: 20,
    letterSpacing: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.creamWhite,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.chineseRed,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.imperialGold,
    marginVertical: 24,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: COLORS.chineseRed,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 40,
  },
  buttonText: {
    color: COLORS.creamWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
