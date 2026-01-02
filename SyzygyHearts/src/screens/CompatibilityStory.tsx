import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import VideoGate from '../components/VideoGate';
import ElementFusion from '../components/ElementFusion';
import { calculateYuanFen, BirthData } from '../astrology/compatibility';
import { Element } from '../data/elementsCycle';

// Navigation types
type RootStackParamList = {
  CompatibilityStory: {
    match: {
      id: string;
      name: string;
      age: number;
      birthData: BirthData;
      element?: Element;
    };
    userBirthData: BirthData;
    userElement?: Element;
  };
  RedThreadPath: undefined;
};

type CompatibilityStoryRouteProp = RouteProp<RootStackParamList, 'CompatibilityStory'>;
type CompatibilityStoryNavigationProp = StackNavigationProp<RootStackParamList>;

export default function CompatibilityStory() {
  const navigation = useNavigation<CompatibilityStoryNavigationProp>();
  const route = useRoute<CompatibilityStoryRouteProp>();

  const { match, userBirthData, userElement } = route.params || {};

  const [videoComplete, setVideoComplete] = useState(false);
  const [compatibility, setCompatibility] = useState(() => {
    if (match?.birthData && userBirthData) {
      return calculateYuanFen(userBirthData, match.birthData);
    }
    return null;
  });

  // Fallback data for testing
  const matchName = match?.name || 'Sarah';
  const matchAge = match?.age || 28;
  const finalUserElement = userElement || compatibility?.elementInfo.person1 || Element.WATER;
  const finalMatchElement = match?.element || compatibility?.elementInfo.person2 || Element.FIRE;
  const yuanFenScore = compatibility?.total || 85;
  const recommendation = compatibility?.recommendation || 'Very Good Match';
  const strengths = compatibility?.strengths || [
    'Strong zodiac compatibility',
    'Harmonious element pairing',
    'Day Masters are harmonious',
  ];
  const challenges = compatibility?.challenges || [
    'Different communication styles require patience',
  ];

  const handleVideoComplete = () => {
    setVideoComplete(true);
  };

  const handleNotAligned = () => {
    // Navigate back with graceful rejection
    navigation.goBack();
  };

  const handleExtendThread = () => {
    // Navigate back with interest expressed
    navigation.goBack();
    // In a real app, this would save the match/like
  };

  if (!videoComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Discovering Connection</Text>
            <Text style={styles.headerSubtitle}>
              Take a moment to truly see them
            </Text>
          </View>

          <VideoGate matchName={matchName} onComplete={handleVideoComplete} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitial}>{matchName.charAt(0)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{matchName}</Text>
              <Text style={styles.profileAge}>{matchAge} years old</Text>
            </View>
          </View>
        </View>

        {/* Element Fusion Animation */}
        <View style={styles.fusionSection}>
          <ElementFusion
            userElement={finalUserElement}
            matchElement={finalMatchElement}
          />
        </View>

        {/* Yuan Fen Score Display */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreSectionTitle}>Yuan Fen Score</Text>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>{yuanFenScore}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
            <Text style={styles.scoreLabel}>{recommendation}</Text>
          </View>
          <Text style={styles.scoreDescription}>
            Yuan Fen measures the destined connection between two souls, combining
            zodiac harmony, element compatibility, and BaZi chart alignment.
          </Text>
        </View>

        {/* BaZi Compatibility Explanation */}
        <View style={styles.compatibilityCard}>
          <Text style={styles.cardTitle}>Compatibility Insights</Text>

          {compatibility?.baziInfo && (
            <View style={styles.baziSection}>
              <View style={styles.baziRow}>
                <Text style={styles.baziLabel}>Day Master Harmony:</Text>
                <Text style={styles.baziValue}>
                  {compatibility.baziInfo.dayMasterHarmony}%
                </Text>
              </View>
              <View style={styles.baziRow}>
                <Text style={styles.baziLabel}>Pillar Harmonies:</Text>
                <Text style={styles.baziValue}>
                  {compatibility.baziInfo.pillarHarmonies} shared
                </Text>
              </View>
              <View style={styles.baziRow}>
                <Text style={styles.baziLabel}>Overall Alignment:</Text>
                <Text style={styles.baziValue}>
                  {compatibility.baziInfo.score}%
                </Text>
              </View>
            </View>
          )}

          <Text style={styles.compatibilityExplanation}>
            Your Four Pillars charts reveal how your energies interact. The Day
            Master harmony shows core personality compatibility, while pillar
            harmonies indicate shared life themes and values.
          </Text>
        </View>

        {/* Strengths */}
        <View style={styles.strengthsCard}>
          <Text style={styles.cardTitle}>Relationship Strengths</Text>
          {strengths.map((strength, index) => (
            <View key={index} style={styles.strengthItem}>
              <Text style={styles.strengthBullet}>+</Text>
              <Text style={styles.strengthText}>{strength}</Text>
            </View>
          ))}
        </View>

        {/* Challenges */}
        {challenges.length > 0 && (
          <View style={styles.challengesCard}>
            <Text style={styles.cardTitle}>Growth Opportunities</Text>
            {challenges.map((challenge, index) => (
              <View key={index} style={styles.challengeItem}>
                <Text style={styles.challengeBullet}>~</Text>
                <Text style={styles.challengeText}>{challenge}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Compatibility Reading */}
        {compatibility?.compatibilityReading && (
          <View style={styles.readingCard}>
            <Text style={styles.cardTitle}>Your Story Together</Text>
            <Text style={styles.readingText}>
              {compatibility.compatibilityReading.overview}
            </Text>
            {compatibility.compatibilityReading.advice && (
              <View style={styles.adviceContainer}>
                <Text style={styles.adviceLabel}>Guidance:</Text>
                <Text style={styles.adviceText}>
                  {compatibility.compatibilityReading.advice}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Bottom padding before actions */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Fixed Bottom Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.passButton}
          onPress={handleNotAligned}
          activeOpacity={0.8}
        >
          <Text style={styles.passButtonText}>Not Aligned</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.likeButton}
          onPress={handleExtendThread}
          activeOpacity={0.8}
        >
          <Text style={styles.likeButtonText}>Extend Thread</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
    marginRight: 16,
  },
  profileInitial: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginBottom: 4,
  },
  profileAge: {
    fontSize: 16,
    color: '#999',
  },
  fusionSection: {
    paddingVertical: 20,
  },
  scoreSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  scoreSectionTitle: {
    fontSize: 14,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: '#FFD700',
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  scoreMax: {
    fontSize: 18,
    color: '#999',
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFDD0',
    textAlign: 'center',
  },
  scoreDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  compatibilityCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginBottom: 16,
  },
  baziSection: {
    marginBottom: 16,
  },
  baziRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  baziLabel: {
    fontSize: 14,
    color: '#999',
  },
  baziValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  compatibilityExplanation: {
    fontSize: 14,
    color: '#FFFDD0',
    lineHeight: 20,
    opacity: 0.8,
  },
  strengthsCard: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  strengthBullet: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginRight: 12,
    marginTop: -2,
  },
  strengthText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFDD0',
    lineHeight: 20,
  },
  challengesCard: {
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#E67E22',
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeBullet: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E67E22',
    marginRight: 12,
    marginTop: -2,
  },
  challengeText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFDD0',
    lineHeight: 20,
  },
  readingCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  readingText: {
    fontSize: 15,
    color: '#FFFDD0',
    lineHeight: 22,
    marginBottom: 16,
  },
  adviceContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  adviceLabel: {
    fontSize: 12,
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 14,
    color: '#FFFDD0',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1C1C1C',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  passButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 16,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#3A3A3A',
  },
  passButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    textAlign: 'center',
  },
  likeButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 10,
  },
  likeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1C',
    textAlign: 'center',
  },
});
