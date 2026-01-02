import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import RedThreadVisual from '../components/RedThreadVisual';
import ElementVisualization from '../components/ElementVisualization';
import { Element } from '../data/elementsCycle';
import { ZodiacAnimal } from '../types';
import { calculateYuanFen, BirthData } from '../astrology/compatibility';
import { getElementFromYear } from '../astrology/elements';
import { getZodiacFromYear } from '../astrology/zodiac';
import { ChineseZodiac } from '../data/zodiacData';

const { width, height } = Dimensions.get('window');

interface PotentialMatch {
  id: string;
  name: string;
  element: Element;
  zodiac: ZodiacAnimal;
  yuanFenScore: number;
  birthData: BirthData;
}

// Mock data for testing - represents potential matches
const MOCK_MATCHES: PotentialMatch[] = [
  {
    id: '1',
    name: 'Sarah',
    element: Element.FIRE,
    zodiac: 'Horse' as ZodiacAnimal,
    yuanFenScore: 88,
    birthData: { year: 1990, month: 6, day: 15, hour: 14 },
  },
  {
    id: '2',
    name: 'Emily',
    element: Element.WATER,
    zodiac: 'Pig' as ZodiacAnimal,
    yuanFenScore: 92,
    birthData: { year: 1995, month: 8, day: 20, hour: 10 },
  },
  {
    id: '3',
    name: 'Jessica',
    element: Element.EARTH,
    zodiac: 'Ox' as ZodiacAnimal,
    yuanFenScore: 76,
    birthData: { year: 1985, month: 3, day: 10, hour: 8 },
  },
  {
    id: '4',
    name: 'Michelle',
    element: Element.WOOD,
    zodiac: 'Rabbit' as ZodiacAnimal,
    yuanFenScore: 84,
    birthData: { year: 1987, month: 11, day: 5, hour: 16 },
  },
  {
    id: '5',
    name: 'Amanda',
    element: Element.METAL,
    zodiac: 'Rooster' as ZodiacAnimal,
    yuanFenScore: 71,
    birthData: { year: 1993, month: 4, day: 25, hour: 12 },
  },
];

// Mock current user data
const MOCK_USER = {
  name: 'You',
  element: Element.WOOD,
  zodiac: 'Tiger' as ZodiacAnimal,
  birthData: { year: 1986, month: 7, day: 12, hour: 9 },
};

export default function RedThreadPath({ navigation }: any) {
  const [threadsRevealed, setThreadsRevealed] = useState(false);
  const [dailyExtensionsLeft, setDailyExtensionsLeft] = useState(3);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const threadAnimations = useRef(
    MOCK_MATCHES.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Fade in the screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Scale in the user's element
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Reveal threads one by one with staggered animation
    const threadSequence = threadAnimations.map((anim, index) =>
      Animated.sequence([
        Animated.delay(1000 + index * 300),
        Animated.spring(anim, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel(threadSequence).start(() => {
      setThreadsRevealed(true);
    });
  }, []);

  const handleThreadPress = (match: PotentialMatch) => {
    // Navigate to Compatibility Story screen (to be implemented)
    console.log(`Navigating to compatibility story for ${match.name}`);
    // navigation.navigate('CompatibilityStory', { matchId: match.id });
  };

  const handleExtendThread = () => {
    if (dailyExtensionsLeft > 0) {
      setDailyExtensionsLeft(dailyExtensionsLeft - 1);
      // Logic to fetch and reveal new threads
      console.log('Extending threads... Extensions left:', dailyExtensionsLeft - 1);
    }
  };

  // Calculate angles for each thread (evenly distributed)
  const getThreadAngle = (index: number, total: number) => {
    // Distribute threads in a circle, starting from top-right
    return (index * 360) / total + 30;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Red Thread of Fate</Text>
          <Text style={styles.subtitle}>
            Discover your destined connections
          </Text>
        </View>

        {/* Main visualization area */}
        <View style={styles.visualizationContainer}>
          {/* User's element in the center */}
          <Animated.View
            style={[
              styles.centerElement,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.userElementContainer}>
              <View style={[styles.userElement, { backgroundColor: '#2ECC71' }]}>
                <Text style={styles.userElementEmoji}>🌳</Text>
              </View>
              <Text style={styles.userLabel}>You</Text>
            </View>
          </Animated.View>

          {/* Red threads extending to matches */}
          {MOCK_MATCHES.map((match, index) => {
            const angle = getThreadAngle(index, MOCK_MATCHES.length);
            const threadAnim = threadAnimations[index];

            return (
              <Animated.View
                key={match.id}
                style={{
                  opacity: threadAnim,
                  transform: [
                    {
                      scale: threadAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  onPress={() => handleThreadPress(match)}
                  activeOpacity={0.8}
                >
                  <RedThreadVisual
                    yuanFenScore={match.yuanFenScore}
                    matchElement={match.element}
                    matchZodiac={match.zodiac}
                    angle={angle}
                    distance={180}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Bottom info section */}
        <View style={styles.bottomSection}>
          {/* Daily extensions counter */}
          <View style={styles.extensionsCard}>
            <Text style={styles.extensionsLabel}>Daily Thread Extensions</Text>
            <View style={styles.extensionsDots}>
              {[1, 2, 3].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.extensionDot,
                    index < dailyExtensionsLeft && styles.extensionDotActive,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.extensionsText}>
              {dailyExtensionsLeft}/3 remaining today
            </Text>
          </View>

          {/* Action button */}
          <TouchableOpacity
            style={[
              styles.extendButton,
              dailyExtensionsLeft === 0 && styles.extendButtonDisabled,
            ]}
            onPress={handleExtendThread}
            disabled={dailyExtensionsLeft === 0}
          >
            <Text style={styles.extendButtonText}>
              {dailyExtensionsLeft > 0 ? 'Extend Threads' : 'Come Back Tomorrow'}
            </Text>
          </TouchableOpacity>

          {/* Hint */}
          <Text style={styles.hint}>
            Tap a thread to discover your compatibility story
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  content: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  visualizationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerElement: {
    position: 'absolute',
    zIndex: 10,
  },
  userElementContainer: {
    alignItems: 'center',
  },
  userElement: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    elevation: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  userElementEmoji: {
    fontSize: 30,
  },
  userLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomSection: {
    padding: 24,
    paddingBottom: 40,
  },
  extensionsCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  extensionsLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  extensionsDots: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  extensionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3A3A3A',
    borderWidth: 1,
    borderColor: '#555',
  },
  extensionDotActive: {
    backgroundColor: '#C41E3A',
    borderColor: '#FFD700',
    shadowColor: '#C41E3A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  extensionsText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  extendButton: {
    backgroundColor: '#C41E3A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#C41E3A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  extendButtonDisabled: {
    backgroundColor: '#3A3A3A',
    shadowOpacity: 0.2,
  },
  extendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hint: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
