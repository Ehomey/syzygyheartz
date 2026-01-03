/**
 * BirthInputScreen - Birth date/time/location input
 * Collects user birth information for BaZi chart calculation
 * Extracted from App.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../../../core/constants';
import { StarsBackground } from '../../components';

type BirthInputScreenNavigationProp = StackNavigationProp<any, 'BirthInput'>;

interface Props {
  navigation: BirthInputScreenNavigationProp;
}

export default function BirthInputScreen({ navigation }: Props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    if (!date || !time || !location) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    const birthDate = new Date(date + 'T' + time);
    if (birthDate >= new Date()) {
      Alert.alert('Invalid Date', 'Birth date must be in the past');
      return;
    }

    try {
      await AsyncStorage.setItem(
        'birthData',
        JSON.stringify({ date, time, location })
      );
      navigation.navigate('Permissions');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.icon}>🌙</Text>
        <Text style={styles.title}>Your Cosmic Blueprint</Text>
        <Text style={styles.subtitle}>
          Enter your birth details to unlock your celestial profile
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={COLORS.gray}
            value={date}
            onChangeText={setDate}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Time</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM (24-hour format)"
            placeholderTextColor={COLORS.gray}
            value={time}
            onChangeText={setTime}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Location</Text>
          <TextInput
            style={styles.input}
            placeholder="City, Country"
            placeholderTextColor={COLORS.gray}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Calculate My Chart</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.lightGray,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 12,
    padding: 16,
    color: COLORS.creamWhite,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  button: {
    backgroundColor: COLORS.chineseRed,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.creamWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
