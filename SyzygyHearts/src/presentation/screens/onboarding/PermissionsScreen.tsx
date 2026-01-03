/**
 * PermissionsScreen - Location permission request screen
 * Final onboarding step before main app
 * Extracted from App.tsx
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../../../core/constants';
import { StarsBackground } from '../../components';

type PermissionsScreenNavigationProp = StackNavigationProp<any, 'Permissions'>;

interface Props {
  navigation: PermissionsScreenNavigationProp;
}

export default function PermissionsScreen({ navigation }: Props) {
  const handleFinish = async () => {
    try {
      await AsyncStorage.setItem('onboarded', 'true');
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <StarsBackground />
      <View style={styles.content}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.title}>Location Access</Text>
        <Text style={styles.subtitle}>
          Allow location access to find matches near you
        </Text>

        <View style={styles.permissionCard}>
          <Text style={styles.cardIcon}>🌍</Text>
          <Text style={styles.cardTitle}>Find Nearby Souls</Text>
          <Text style={styles.cardDesc}>
            Discover compatible matches in your area
          </Text>
        </View>

        <View style={styles.permissionCard}>
          <Text style={styles.cardIcon}>🔮</Text>
          <Text style={styles.cardTitle}>Precise Horoscopes</Text>
          <Text style={styles.cardDesc}>
            Get location-specific celestial insights
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleFinish}>
          <Text style={styles.primaryButtonText}>Allow & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleFinish}>
          <Text style={styles.secondaryButtonText}>Maybe Later</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.creamWhite,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  permissionCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  cardTitle: {
    color: COLORS.creamWhite,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    color: COLORS.gray,
    fontSize: 14,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.chineseRed,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  primaryButtonText: {
    color: COLORS.creamWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: COLORS.gray,
    fontSize: 14,
  },
});
