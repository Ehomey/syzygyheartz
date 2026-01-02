import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { getCompatibility } from '../services/astrology';

const MatchFeedScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load potential matches from Firestore
    // For now, mock data
    setProfiles([
      { id: 1, name: 'Alice', sign: 'Leo', photo: 'url', chart: {} },
      { id: 2, name: 'Bob', sign: 'Scorpio', photo: 'url', chart: {} },
    ]);
  }, []);

  const onSwipedLeft = () => {
    // Pass
  };

  const onSwipedRight = () => {
    // Like
  };

  const renderCard = (profile: any) => (
    <View style={styles.card}>
      <Image source={{ uri: profile.photo }} style={styles.photo} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text>{profile.sign}</Text>
      <Text>Compatibility: 85%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Swiper
        cards={profiles}
        renderCard={renderCard}
        onSwipedLeft={onSwipedLeft}
        onSwipedRight={onSwipedRight}
        cardIndex={currentIndex}
        stackSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flex: 1, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  photo: { width: 200, height: 200, borderRadius: 100 },
  name: { fontSize: 24, marginTop: 10 },
});

export default MatchFeedScreen;