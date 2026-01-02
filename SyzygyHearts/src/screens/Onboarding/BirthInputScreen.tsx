import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BirthInputScreen: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    // Save birth data and navigate
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Birth Details</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setDate(selectedDate || date)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Location (City, Country)"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default BirthInputScreen;