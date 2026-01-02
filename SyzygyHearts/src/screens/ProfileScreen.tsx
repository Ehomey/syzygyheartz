import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getBirthChart } from '../services/astrology';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [chart, setChart] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Load or generate chart
    const loadChart = async () => {
      // Assume birth data is stored
      const birthData = { date: '1990-01-01', time: '12:00', latitude: 0, longitude: 0 };
      const data = await getBirthChart(birthData);
      setChart(data);
    };
    loadChart();
  }, []);

  const handleSave = () => {
    // Save profile to Firestore
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <Text style={styles.subtitle}>Your Birth Chart</Text>
      {chart ? (
        <View style={styles.chart}>
          <Text>Sun: {chart.sun.sign}</Text>
          <Text>Moon: {chart.moon.sign}</Text>
          {/* Render SVG wheel here */}
        </View>
      ) : (
        <Text>Loading chart...</Text>
      )}
      <Button title="Save Profile" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  subtitle: { fontSize: 18, marginTop: 20 },
  chart: { marginTop: 10 },
});

export default ProfileScreen;