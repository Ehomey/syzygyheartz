import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';

const PermissionsScreen: React.FC = () => {
  const requestPermissions = async () => {
    const { status: locationStatus } = await Permissions.askAsync(Permissions.LOCATION);
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
    if (locationStatus === 'granted' && cameraStatus === 'granted') {
      // Navigate to main app
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permissions Needed</Text>
      <Text>We need location for birth chart accuracy and camera for photos.</Text>
      <Button title="Grant Permissions" onPress={requestPermissions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});

export default PermissionsScreen;