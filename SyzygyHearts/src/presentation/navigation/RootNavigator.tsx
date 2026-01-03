/**
 * RootNavigator - Main navigation container
 * Handles onboarding flow and main app navigation
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import { COLORS } from '../../core/constants';
import {
  WelcomeScreen,
  BirthInputScreen,
  PermissionsScreen,
} from '../screens';
import MainTabs from './MainTabs';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarded = async () => {
      try {
        const value = await AsyncStorage.getItem('onboarded');
        if (value === 'true') setOnboarded(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkOnboarded();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>✨</Text>
        <Text style={styles.loadingText}>Aligning the stars...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!onboarded ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="BirthInput" component={BirthInputScreen} />
            <Stack.Screen name="Permissions" component={PermissionsScreen} />
          </>
        ) : null}
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.inkBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    color: COLORS.lightGray,
    fontSize: 18,
  },
});
