import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import DestinyDashboard from './src/screens/DestinyDashboard';
const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Chinese-Inspired Color Palette
const colors = {
  // Primary Colors
  chineseRed: '#C41E3A',      // Primary action color
  imperialGold: '#FFD700',     // Secondary accent
  jadeGreen: '#00A86B',        // Success/positive accent
  inkBlack: '#1C1C1C',         // Background
  creamWhite: '#FFFDD0',       // Text

  // Five Elements (Wu Xing)
  metal: '#E8E8E8',            // Metal - 金
  wood: '#00A86B',             // Wood - 木 (same as jade)
  water: '#003366',            // Water - 水
  fire: '#C41E3A',             // Fire - 火 (same as red)
  earth: '#CC7722',            // Earth - 土

  // Neutral tones
  gray: '#666666',
  darkGray: '#333333',

  // Legacy support (for gradual migration)
  primary: '#1C1C1C',
  secondary: '#2a2a2a',
  accent: '#C41E3A',
  gold: '#FFD700',
  white: '#FFFDD0',
  lightGray: '#E8E8E8',
};

const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

// Chinese Zodiac Animals (生肖)
const chineseZodiac = [
  { animal: 'Rat', emoji: '🐭', element: 'water', character: '鼠' },
  { animal: 'Ox', emoji: '🐮', element: 'earth', character: '牛' },
  { animal: 'Tiger', emoji: '🐯', element: 'wood', character: '虎' },
  { animal: 'Rabbit', emoji: '🐰', element: 'wood', character: '兔' },
  { animal: 'Dragon', emoji: '🐲', element: 'earth', character: '龙' },
  { animal: 'Snake', emoji: '🐍', element: 'fire', character: '蛇' },
  { animal: 'Horse', emoji: '🐴', element: 'fire', character: '马' },
  { animal: 'Goat', emoji: '🐐', element: 'earth', character: '羊' },
  { animal: 'Monkey', emoji: '🐵', element: 'metal', character: '猴' },
  { animal: 'Rooster', emoji: '🐔', element: 'metal', character: '鸡' },
  { animal: 'Dog', emoji: '🐶', element: 'earth', character: '狗' },
  { animal: 'Pig', emoji: '🐷', element: 'water', character: '猪' },
];

// Five Elements (Wu Xing - 五行)
const fiveElements = {
  metal: { name: '金', emoji: '⚪', color: colors.metal },
  wood: { name: '木', emoji: '🌳', color: colors.wood },
  water: { name: '水', emoji: '💧', color: colors.water },
  fire: { name: '火', emoji: '🔥', color: colors.fire },
  earth: { name: '土', emoji: '⬜', color: colors.earth },
};

const mockProfiles = [
  {
    id: 1,
    name: 'Mei Lin',
    age: 26,
    sign: 'Pisces',
    symbol: '♓',
    chineseSign: 'Rabbit',
    chineseEmoji: '🐰',
    element: 'wood',
    yuanFenScore: 94,
    luckyNumbers: [3, 6, 9],
  },
  {
    id: 2,
    name: 'Li Wei',
    age: 24,
    sign: 'Scorpio',
    symbol: '♏',
    chineseSign: 'Dragon',
    chineseEmoji: '🐲',
    element: 'earth',
    yuanFenScore: 87,
    luckyNumbers: [8, 16, 24],
  },
  {
    id: 3,
    name: 'Xiao Yun',
    age: 28,
    sign: 'Leo',
    symbol: '♌',
    chineseSign: 'Tiger',
    chineseEmoji: '🐯',
    element: 'wood',
    yuanFenScore: 82,
    luckyNumbers: [1, 3, 7],
  },
  {
    id: 4,
    name: 'Chen Hui',
    age: 25,
    sign: 'Libra',
    symbol: '♎',
    chineseSign: 'Monkey',
    chineseEmoji: '🐵',
    element: 'metal',
    yuanFenScore: 79,
    luckyNumbers: [4, 9, 13],
  },
  {
    id: 5,
    name: 'Jing Wen',
    age: 27,
    sign: 'Cancer',
    symbol: '♋',
    chineseSign: 'Snake',
    chineseEmoji: '🐍',
    element: 'fire',
    yuanFenScore: 91,
    luckyNumbers: [2, 8, 9],
  },
];

function StarsBackground() {
  const stars = useRef(
    Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      opacity: new Animated.Value(Math.random()),
    }))
  ).current;

  useEffect(() => {
    stars.forEach((star) => {
      const twinkle = () => {
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 2000 + 1000,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.3,
            duration: Math.random() * 2000 + 1000,
            useNativeDriver: true,
          }),
        ]).start(twinkle);
      };
      twinkle();
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {stars.map((star, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            borderRadius: star.size / 2,
            backgroundColor: colors.white,
            opacity: star.opacity,
          }}
        />
      ))}
    </View>
  );
}

// Five Elements Badge Component
function ElementBadge({ element, size = 40 }) {
  const elementData = fiveElements[element];
  if (!elementData) return null;

  return (
    <View style={[styles.elementBadge, { width: size, height: size, backgroundColor: elementData.color }]}>
      <Text style={styles.elementEmoji}>{elementData.emoji}</Text>
      <Text style={styles.elementCharacter}>{elementData.name}</Text>
    </View>
  );
}

// Yuan Fen Score Display Component
function YuanFenScore({ score, size = 100 }) {

  const getThreadColor = () => {
    if (score >= 90) return colors.imperialGold;
    if (score >= 80) return colors.chineseRed;
    if (score >= 60) return colors.jadeGreen;
    return colors.gray;
  };

  return (
    <View style={[styles.yuanFenContainer, { width: size, height: size }]}>
      <View style={[styles.yuanFenCircle, { borderColor: getThreadColor() }]}>
        <Text style={styles.yuanFenScore}>{score}</Text>
        <Text style={styles.yuanFenLabel}>缘分</Text>
      </View>
    </View>
  );
}

// Red Thread Connection Component
function RedThreadLine({ score }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(pulse);
    };
    pulse();
  }, []);

  return (
    <Animated.View
      style={[
        styles.redThread,
        {
          opacity: pulseAnim.interpolate({
            inputRange: [1, 1.2],
            outputRange: [0.6, 1],
          }),
        },
      ]}
    >
      <Text style={styles.threadText}>━━━🧧━━━</Text>
    </Animated.View>
  );
}

// Zodiac Wheel Component
function ZodiacWheel({ onAnimalSelect }) {
  const rotation = useRef(new Animated.Value(0)).current;

  const rotateWheel = () => {
    Animated.timing(rotation, {
      toValue: 360,
      duration: 30000,
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0);
      rotateWheel();
    });
  };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    rotateWheel();
  }, []);

  return (
    <View style={styles.zodiacWheelContainer}>
      <Animated.View
        style={[
          styles.zodiacWheel,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        {chineseZodiac.map((animal, index) => {
          const angle = (index * 30 - 90) * (Math.PI / 180);
          const radius = 110;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <TouchableOpacity
              key={animal.animal}
              style={[
                styles.zodiacAnimal,
                {
                  left: width / 2 + x - 20,
                  top: 150 + y - 20,
                },
              ]}
              onPress={() => onAnimalSelect && onAnimalSelect(animal)}
            >
              <Text style={styles.zodiacAnimalEmoji}>{animal.emoji}</Text>
              <Text style={styles.zodiacAnimalChar}>{animal.character}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <View style={styles.zodiacCenter}>
        <Text style={styles.zodiacCenterText}>缘</Text>
        <Text style={styles.zodiacCenterSubtext}>Yuan</Text>
      </View>
    </View>
  );
}

// Traditional Border Pattern Component
function TraditionalBorder({ children, pattern = 'cloud' }) {
  const patternChars = {
    cloud: '☁',
    lattice: '回',
    lotus: '✿',
  };

  return (
    <View style={styles.traditionalBorderContainer}>
      <Text style={styles.borderPattern}>{patternChars[pattern].repeat(20)}</Text>
      {children}
      <Text style={styles.borderPattern}>{patternChars[pattern].repeat(20)}</Text>
    </View>
  );
}

function OnboardingWelcome({ navigation }) {
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
  }, []);

  return (
    <View style={styles.container}>
      <StarsBackground />
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        <Text style={styles.zodiacRing}>{zodiacSymbols.join(' ')}</Text>
        <Text style={styles.heroTitle}>Syzygy Hearts</Text>
        <Text style={styles.heroSubtitle}>Find love written in the stars</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>Where cosmic connections become lasting bonds</Text>
      </Animated.View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('BirthInput')}>
        <Text style={styles.primaryButtonText}>Begin Your Journey ✨</Text>
      </TouchableOpacity>
    </View>
  );
}

function BirthInput({ navigation }) {
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
      await AsyncStorage.setItem('birthData', JSON.stringify({ date, time, location }));
      navigation.navigate('Permissions');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionIcon}>🌙</Text>
        <Text style={styles.pageTitle}>Your Cosmic Blueprint</Text>
        <Text style={styles.pageSubtitle}>Enter your birth details to unlock your celestial profile</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birth Date</Text>
          <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor={colors.gray} value={date} onChangeText={setDate} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birth Time</Text>
          <TextInput style={styles.input} placeholder="HH:MM (24-hour format)" placeholderTextColor={colors.gray} value={time} onChangeText={setTime} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birth Location</Text>
          <TextInput style={styles.input} placeholder="City, Country" placeholderTextColor={colors.gray} value={location} onChangeText={setLocation} />
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>Calculate My Chart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Permissions({ navigation }) {
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
      <View style={styles.centerContent}>
        <Text style={styles.sectionIcon}>📍</Text>
        <Text style={styles.pageTitle}>Location Access</Text>
        <Text style={styles.pageSubtitle}>Allow location access to find matches near you</Text>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionIcon}>🌍</Text>
          <Text style={styles.permissionTitle}>Find Nearby Souls</Text>
          <Text style={styles.permissionDesc}>Discover compatible matches in your area</Text>
        </View>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionIcon}>🔮</Text>
          <Text style={styles.permissionTitle}>Precise Horoscopes</Text>
          <Text style={styles.permissionDesc}>Get location-specific celestial insights</Text>
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

// Red Thread Card - Replaces SwipeCard with Chinese-inspired design
function RedThreadCard({ profile, onSwipe }) {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = pan.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        Animated.spring(pan, { toValue: { x: width + 100, y: gesture.dy }, useNativeDriver: false }).start(() => onSwipe('right'));
      } else if (gesture.dx < -120) {
        Animated.spring(pan, { toValue: { x: -width - 100, y: gesture.dy }, useNativeDriver: false }).start(() => onSwipe('left'));
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });

  return (
    <Animated.View {...panResponder.panHandlers} style={[styles.redThreadCard, { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }] }]}>
      {/* Traditional border pattern */}
      <View style={styles.cardBorderTop}>
        <Text style={styles.borderPatternText}>☁ 回 ☁ 回 ☁ 回 ☁</Text>
      </View>

      {/* Profile image section */}
      <View style={styles.cardImageContainer}>
        <View style={styles.cardImagePlaceholder}>
          <Text style={styles.cardImageEmoji}>{profile.chineseEmoji}</Text>
        </View>

        {/* Yuan Fen Score Badge */}
        <View style={styles.yuanFenBadge}>
          <Text style={styles.yuanFenBadgeScore}>{profile.yuanFenScore}</Text>
          <Text style={styles.yuanFenBadgeLabel}>缘分</Text>
          <Text style={styles.yuanFenBadgeSubtext}>Yuan Fen</Text>
        </View>
      </View>

      {/* Red Thread Connection */}
      <RedThreadLine score={profile.yuanFenScore} />

      {/* Card Info */}
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{profile.name}, {profile.age}</Text>
          <Text style={styles.chineseSignText}>{profile.chineseEmoji} {profile.chineseSign}</Text>
        </View>

        {/* Five Element Badge */}
        <View style={styles.elementRow}>
          <ElementBadge element={profile.element} size={50} />
          <View style={styles.elementInfo}>
            <Text style={styles.elementName}>Element: {profile.element.charAt(0).toUpperCase() + profile.element.slice(1)}</Text>
            <Text style={styles.elementCharacter}>{fiveElements[profile.element].name}</Text>
          </View>
        </View>

        {/* Lucky Numbers */}
        <View style={styles.luckyNumbersRow}>
          <Text style={styles.luckyNumbersLabel}>Lucky Numbers: </Text>
          {profile.luckyNumbers.map((num, idx) => (
            <View key={idx} style={styles.luckyNumberBadge}>
              <Text style={styles.luckyNumberText}>{num}</Text>
            </View>
          ))}
        </View>

        {/* Destiny Message */}
        <View style={styles.destinyMessage}>
          <Text style={styles.destinyText}>
            "Red threads connect those destined to meet, regardless of time, place, or circumstance."
          </Text>
        </View>
      </View>

      {/* Bottom border */}
      <View style={styles.cardBorderBottom}>
        <Text style={styles.borderPatternText}>✿ 回 ✿ 回 ✿ 回 ✿</Text>
      </View>
    </Animated.View>
  );
}

// Home Screen with Zodiac Wheel Discovery
function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showWheel, setShowWheel] = useState(true);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      Alert.alert('红线已连! (Red Thread Connected!)', `Fate has connected you with ${mockProfiles[currentIndex].name}`);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
    Alert.alert('Filter by ' + animal.character, `Showing ${animal.animal} matches`);
  };

  return (
    <View style={styles.container}>
      <StarsBackground />

      {/* Header with Chinese styling */}
      <View style={styles.chineseHeader}>
        <Text style={styles.chineseHeaderTitle}>缘分发现</Text>
        <Text style={styles.headerTitle}>Destiny Discovery</Text>
        <Text style={styles.headerSubtitle}>Follow the red thread to your fated match</Text>
      </View>

      {/* Zodiac Wheel Section */}
      {showWheel && currentIndex < mockProfiles.length && (
        <View style={styles.wheelSection}>
          <ZodiacWheel onAnimalSelect={handleAnimalSelect} />
          <TouchableOpacity
            style={styles.toggleWheelButton}
            onPress={() => setShowWheel(false)}
          >
            <Text style={styles.toggleWheelText}>Hide Wheel</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showWheel && (
        <TouchableOpacity
          style={styles.toggleWheelButton}
          onPress={() => setShowWheel(true)}
        >
          <Text style={styles.toggleWheelText}>Show Zodiac Wheel</Text>
        </TouchableOpacity>
      )}

      {/* Card Stack with Red Thread Cards */}
      <View style={styles.cardStack}>
        {currentIndex < mockProfiles.length ? (
          <RedThreadCard profile={mockProfiles[currentIndex]} onSwipe={handleSwipe} />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🧧</Text>
            <Text style={styles.emptyTitle}>缘分已尽</Text>
            <Text style={styles.emptySubtitle}>No more destined connections for today</Text>
            <Text style={styles.emptyMessage}>Check back tomorrow for new fated matches</Text>
          </View>
        )}
      </View>

      {/* Action Buttons with Chinese Red Theme */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.rejectButton} onPress={() => handleSwipe('left')}>
          <Text style={styles.actionIcon}>✕</Text>
          <Text style={styles.actionLabel}>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.destinyButton}>
          <Text style={styles.actionIcon}>🔮</Text>
          <Text style={styles.actionLabel}>Read Destiny</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={() => handleSwipe('right')}>
          <Text style={styles.actionIcon}>🧧</Text>
          <Text style={styles.actionLabel}>Accept Fate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HoroscopeScreen() {
  const [activeTab, setActiveTab] = useState('love');
  const horoscopes = {
    love: 'Venus enters your seventh house today, bringing harmony to relationships. A chance encounter could spark something beautiful.',
    career: 'Mercury aligns with Jupiter in your tenth house. Professional opportunities abound—speak your ideas confidently.',
    wellness: 'The Moon in your sixth house emphasizes self-care. Prioritize rest and mindful activities.',
  };

  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Daily Horoscope</Text>
        <Text style={styles.headerSubtitle}>December 14, 2025</Text>
        <View style={styles.zodiacDisplay}>
          <Text style={styles.bigZodiac}>♍</Text>
          <Text style={styles.zodiacName}>Virgo</Text>
          <Text style={styles.zodiacDates}>Aug 23 - Sep 22</Text>
        </View>
        <View style={styles.tabRow}>
          {['love', 'career', 'wellness'].map((tab) => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
              <Text style={styles.tabIcon}>{tab === 'love' ? '💕' : tab === 'career' ? '💼' : '🧘'}</Text>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.horoscopeCard}>
          <Text style={styles.horoscopeText}>{horoscopes[activeTab]}</Text>
        </View>
        <View style={styles.transitCard}>
          <Text style={styles.transitTitle}>Today's Transits</Text>
          <View style={styles.transitItem}>
            <Text style={styles.transitPlanet}>☿ Mercury</Text>
            <Text style={styles.transitSign}>→ Capricorn</Text>
          </View>
          <View style={styles.transitItem}>
            <Text style={styles.transitPlanet}>♀ Venus</Text>
            <Text style={styles.transitSign}>→ Aquarius</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Messages Screen with Red Envelope Gifting
function MessagesScreen() {

  const conversations = [
    { id: 1, name: 'Mei Lin', emoji: '🐰', lastMessage: 'Our Yuan Fen score is amazing!', time: '2h ago', unread: 2 },
    { id: 2, name: 'Li Wei', emoji: '🐲', lastMessage: 'What is your birth hour? 🌙', time: '5h ago', unread: 0 },
    { id: 3, name: 'Xiao Yun', emoji: '🐯', lastMessage: 'Our elements are so harmonious', time: '1d ago', unread: 0 },
  ];

  return (
    <View style={styles.container}>
      <StarsBackground />
      <View style={styles.chineseHeader}>
        <Text style={styles.chineseHeaderTitle}>消息</Text>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Red thread conversations</Text>
      </View>
      <ScrollView style={styles.messageList}>
        {conversations.map((conv) => (
          <TouchableOpacity key={conv.id} style={styles.chineseMessageItem}>
            <View style={styles.chineseAvatarCircle}>
              <Text style={styles.avatarEmoji}>{conv.emoji}</Text>
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageName}>{conv.name}</Text>
                <Text style={styles.messageTime}>{conv.time}</Text>
              </View>
              <Text style={styles.messagePreview} numberOfLines={1}>{conv.lastMessage}</Text>
            </View>
            {conv.unread > 0 && (
              <View style={styles.chineseUnreadBadge}>
                <Text style={styles.unreadText}>{conv.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Red Envelope Quick Actions */}
        <View style={styles.redEnvelopeSection}>
          <Text style={styles.redEnvelopeTitle}>🧧 Red Envelope Quick Send</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Good Luck (8)', 'Prosperity (88)', 'Fortune (168)', 'Abundance (888)'].map((amount, i) => (
              <TouchableOpacity
                key={i}
                style={styles.redEnvelopeButton}
                onPress={() => Alert.alert('Red Envelope', `Send ${amount}?`)}
              >
                <Text style={styles.redEnvelopeEmoji}>🧧</Text>
                <Text style={styles.redEnvelopeText}>{amount}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Chinese Icebreakers */}
        <View style={styles.icebreakersSection}>
          <Text style={styles.icebreakerTitle}>开场白 Icebreakers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              "What's your Chinese zodiac sign?",
              'Do you believe in Yuan Fen?',
              'What element defines you?',
              "What's your lucky number?"
            ].map((q, i) => (
              <View key={i} style={styles.chineseIcebreaker}>
                <Text style={styles.icebreakerText}>{q}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

// Profile Screen with BaZi Chart
function ProfileScreen() {
  const [birthData, setBirthData] = useState(null);

  useEffect(() => {
    const loadBirthData = async () => {
      try {
        const data = await AsyncStorage.getItem('birthData');
        if (data) setBirthData(JSON.parse(data));
      } catch (error) {
        console.error(error);
      }
    };
    loadBirthData();
  }, []);

  // Mock BaZi data (Four Pillars)
  const baziData = {
    year: { heavenly: '甲', earthly: '子', element: 'wood' },
    month: { heavenly: '丙', earthly: '寅', element: 'fire' },
    day: { heavenly: '戊', earthly: '辰', element: 'earth' },
    hour: { heavenly: '庚', earthly: '午', element: 'metal' },
  };

  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header with Chinese Zodiac */}
        <View style={styles.chineseProfileHeader}>
          <View style={styles.chineseProfileAvatar}>
            <Text style={styles.profileAvatarText}>🐲</Text>
          </View>
          <Text style={styles.profileName}>Your Profile</Text>
          <Text style={styles.chineseSignText}>🐲 Dragon • 龙</Text>
          <Text style={styles.profileElement}>Earth Element • 土</Text>
        </View>

        {/* BaZi Chart (Four Pillars of Destiny) */}
        <View style={styles.baziChartContainer}>
          <Text style={styles.baziTitle}>八字 BaZi Chart</Text>
          <Text style={styles.baziSubtitle}>Four Pillars of Destiny</Text>

          <View style={styles.baziPillars}>
            {/* Year Pillar */}
            <View style={styles.baziPillar}>
              <Text style={styles.pillarLabel}>年 Year</Text>
              <View style={[styles.pillarBox, { backgroundColor: fiveElements[baziData.year.element].color }]}>
                <Text style={styles.pillarHeavenly}>{baziData.year.heavenly}</Text>
                <Text style={styles.pillarEarthly}>{baziData.year.earthly}</Text>
              </View>
            </View>

            {/* Month Pillar */}
            <View style={styles.baziPillar}>
              <Text style={styles.pillarLabel}>月 Month</Text>
              <View style={[styles.pillarBox, { backgroundColor: fiveElements[baziData.month.element].color }]}>
                <Text style={styles.pillarHeavenly}>{baziData.month.heavenly}</Text>
                <Text style={styles.pillarEarthly}>{baziData.month.earthly}</Text>
              </View>
            </View>

            {/* Day Pillar */}
            <View style={styles.baziPillar}>
              <Text style={styles.pillarLabel}>日 Day</Text>
              <View style={[styles.pillarBox, { backgroundColor: fiveElements[baziData.day.element].color }]}>
                <Text style={styles.pillarHeavenly}>{baziData.day.heavenly}</Text>
                <Text style={styles.pillarEarthly}>{baziData.day.earthly}</Text>
              </View>
            </View>

            {/* Hour Pillar */}
            <View style={styles.baziPillar}>
              <Text style={styles.pillarLabel}>时 Hour</Text>
              <View style={[styles.pillarBox, { backgroundColor: fiveElements[baziData.hour.element].color }]}>
                <Text style={styles.pillarHeavenly}>{baziData.hour.heavenly}</Text>
                <Text style={styles.pillarEarthly}>{baziData.hour.earthly}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Five Elements Balance */}
        <View style={styles.elementsBalanceContainer}>
          <Text style={styles.elementsTitle}>五行 Five Elements Balance</Text>
          <View style={styles.elementsRow}>
            {Object.entries(fiveElements).map(([key, value]) => (
              <View key={key} style={styles.elementBalanceItem}>
                <Text style={styles.elementBalanceEmoji}>{value.emoji}</Text>
                <Text style={styles.elementBalanceName}>{value.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Birth Data */}
        {birthData ? (
          <View style={styles.chineseBirthDataCard}>
            <Text style={styles.birthDataTitle}>出生信息 Birth Information</Text>
            <View style={styles.birthDataRow}>
              <Text style={styles.birthDataLabel}>📅 Date</Text>
              <Text style={styles.birthDataValue}>{birthData.date}</Text>
            </View>
            <View style={styles.birthDataRow}>
              <Text style={styles.birthDataLabel}>⏰ Time</Text>
              <Text style={styles.birthDataValue}>{birthData.time}</Text>
            </View>
            <View style={styles.birthDataRow}>
              <Text style={styles.birthDataLabel}>📍 Location</Text>
              <Text style={styles.birthDataValue}>{birthData.location}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noBirthData}>No birth data found</Text>
        )}

        {/* Lucky Numbers and Colors */}
        <View style={styles.luckyInfoCard}>
          <Text style={styles.luckyInfoTitle}>吉祥 Lucky Information</Text>
          <View style={styles.luckyInfoRow}>
            <Text style={styles.luckyInfoLabel}>Lucky Numbers:</Text>
            <View style={styles.luckyNumbersContainer}>
              {[3, 6, 9].map((num, idx) => (
                <View key={idx} style={styles.luckyNumberBadgeLarge}>
                  <Text style={styles.luckyNumberTextLarge}>{num}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.luckyInfoRow}>
            <Text style={styles.luckyInfoLabel}>Auspicious Colors:</Text>
            <View style={styles.luckyColorsContainer}>
              <View style={[styles.luckyColorSwatch, { backgroundColor: colors.chineseRed }]} />
              <View style={[styles.luckyColorSwatch, { backgroundColor: colors.imperialGold }]} />
              <View style={[styles.luckyColorSwatch, { backgroundColor: colors.jadeGreen }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function CommunityScreen() {
  const posts = [
    { id: 1, author: 'StarGazer22', content: 'Anyone else feeling the Neptune retrograde? Dreams have been intense!', likes: 24 },
    { id: 2, author: 'MoonChild', content: 'Best compatible signs for Scorpio rising? Looking for insight 🦂', likes: 18 },
  ];
  const events = [
    { id: 1, title: 'Full Moon Meditation', date: 'Dec 27', attendees: 156 },
    { id: 2, title: 'Venus in Aquarius Chat', date: 'Jan 3', attendees: 89 },
  ];

  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSubtitle}>Connect with fellow star seekers</Text>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <Text style={styles.eventIcon}>🌟</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventAttendees}>{event.attendees} attending</Text>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>Recent Discussions</Text>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Text>{post.author[0]}</Text>
              </View>
              <Text style={styles.postAuthor}>{post.author}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity><Text style={styles.postActionText}>❤️ {post.likes}</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.postActionText}>💬 Reply</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function TabIcon({ name, focused }) {
  const icons = {
    Home: focused ? '🏠' : '🏡',
    Horoscope: focused ? '🔮' : '🌟',
    Messages: focused ? '💬' : '✉️',
    Profile: focused ? '👤' : '👥',
    Community: focused ? '🌍' : '🌐',
  };
  return <Text style={{ fontSize: 24 }}>{icons[name]}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopColor: colors.secondary,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DestinyDashboard} />
      <Tab.Screen name="Horoscope" component={HoroscopeScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
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
            <Stack.Screen name="Welcome" component={OnboardingWelcome} />
            <Stack.Screen name="BirthInput" component={BirthInput} />
            <Stack.Screen name="Permissions" component={Permissions} />
          </>
        ) : null}
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  loadingContainer: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  loadingEmoji: { fontSize: 48, marginBottom: 16 },
  loadingText: { color: colors.lightGray, fontSize: 18 },
  scrollContent: { padding: 20, paddingTop: 60 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.white, textAlign: 'center' },
  headerSubtitle: { fontSize: 14, color: colors.gray, textAlign: 'center', marginTop: 4 },
  zodiacRing: { fontSize: 20, color: colors.gold, marginBottom: 20, letterSpacing: 8 },
  heroTitle: { fontSize: 36, fontWeight: 'bold', color: colors.white, textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { fontSize: 18, color: colors.accent, textAlign: 'center', fontStyle: 'italic' },
  divider: { width: 60, height: 2, backgroundColor: colors.gold, marginVertical: 24 },
  tagline: { fontSize: 14, color: colors.gray, textAlign: 'center', paddingHorizontal: 40 },
  primaryButton: { backgroundColor: colors.accent, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, marginTop: 40 },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  secondaryButton: { paddingVertical: 16, paddingHorizontal: 40, marginTop: 12 },
  secondaryButtonText: { color: colors.gray, fontSize: 14 },
  sectionIcon: { fontSize: 48, textAlign: 'center', marginBottom: 16 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: colors.white, textAlign: 'center', marginBottom: 8 },
  pageSubtitle: { fontSize: 14, color: colors.gray, textAlign: 'center', marginBottom: 32, paddingHorizontal: 20 },
  inputContainer: { marginBottom: 20 },
  inputLabel: { color: colors.lightGray, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: colors.secondary, borderRadius: 12, padding: 16, color: colors.white, fontSize: 16, borderWidth: 1, borderColor: colors.gray },
  permissionCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20, width: '100%', marginBottom: 16, alignItems: 'center' },
  permissionIcon: { fontSize: 36, marginBottom: 8 },
  permissionTitle: { color: colors.white, fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  permissionDesc: { color: colors.gray, fontSize: 14, textAlign: 'center' },
  cardStack: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  matchCard: { width: width - 40, height: 450, backgroundColor: colors.secondary, borderRadius: 20, overflow: 'hidden', position: 'absolute' },
  cardImageContainer: { height: 280, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  cardImagePlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' },
  cardImageEmoji: { fontSize: 48 },
  compatibilityBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: colors.accent, borderRadius: 12, padding: 12, alignItems: 'center' },
  compatibilityText: { color: colors.white, fontSize: 24, fontWeight: 'bold' },
  compatibilityLabel: { color: colors.white, fontSize: 10, opacity: 0.8 },
  cardInfo: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardName: { color: colors.white, fontSize: 24, fontWeight: 'bold' },
  cardSign: { color: colors.gold, fontSize: 16 },
  aspectRow: { flexDirection: 'row', gap: 12 },
  aspectBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  aspectEmoji: { fontSize: 14, marginRight: 6 },
  aspectLabel: { color: colors.lightGray, fontSize: 12 },
  actionButtons: { flexDirection: 'row', justifyContent: 'center', gap: 20, paddingVertical: 20 },
  actionButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.gray },
  superLikeButton: { borderColor: colors.gold },
  likeButton: { borderColor: colors.accent, backgroundColor: colors.accent },
  actionIcon: { fontSize: 24, color: colors.white },
  emptyState: { alignItems: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { color: colors.white, fontSize: 20, fontWeight: 'bold' },
  emptySubtitle: { color: colors.gray, fontSize: 14, marginTop: 8 },
  zodiacDisplay: { alignItems: 'center', marginVertical: 24 },
  bigZodiac: { fontSize: 64, color: colors.gold },
  zodiacName: { color: colors.white, fontSize: 24, fontWeight: 'bold', marginTop: 8 },
  zodiacDates: { color: colors.gray, fontSize: 14 },
  tabRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
  tab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: colors.secondary },
  activeTab: { backgroundColor: colors.accent },
  tabIcon: { fontSize: 16, marginRight: 6 },
  tabText: { color: colors.gray, fontSize: 14 },
  activeTabText: { color: colors.white, fontWeight: 'bold' },
  horoscopeCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20, marginBottom: 20 },
  horoscopeText: { color: colors.lightGray, fontSize: 16, lineHeight: 24 },
  transitCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20 },
  transitTitle: { color: colors.white, fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  transitItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.primary },
  transitPlanet: { color: colors.gold, fontSize: 16 },
  transitSign: { color: colors.lightGray, fontSize: 16 },
  messageList: { flex: 1, paddingHorizontal: 20 },
  messageItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 16, padding: 16, marginBottom: 12 },
  avatarCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: colors.white, fontSize: 20, fontWeight: 'bold' },
  messageContent: { flex: 1, marginLeft: 12 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  messageName: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  messageTime: { color: colors.gray, fontSize: 12 },
  messagePreview: { color: colors.gray, fontSize: 14, marginTop: 4 },
  unreadBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  unreadText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
  icebreakersSection: { marginTop: 24 },
  icebreakerTitle: { color: colors.white, fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  icebreaker: { backgroundColor: colors.secondary, borderRadius: 12, padding: 16, marginRight: 12, width: 200 },
  icebreakerText: { color: colors.lightGray, fontSize: 14 },
  profileHeader: { alignItems: 'center', marginBottom: 24 },
  profileAvatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.accent, marginBottom: 16 },
  profileAvatarText: { fontSize: 40 },
  profileName: { color: colors.white, fontSize: 24, fontWeight: 'bold' },
  profileSign: { color: colors.gold, fontSize: 16, marginTop: 4 },
  chartWheel: { alignItems: 'center', marginVertical: 24 },
  chartOuter: { width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: colors.gold, justifyContent: 'center', alignItems: 'center' },
  chartSymbol: { position: 'absolute', fontSize: 16, color: colors.gold },
  chartInner: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' },
  chartCenterText: { color: colors.lightGray, fontSize: 12 },
  birthDataCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20, marginBottom: 24 },
  birthDataRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.primary },
  birthDataLabel: { color: colors.gray, fontSize: 14 },
  birthDataValue: { color: colors.white, fontSize: 14, fontWeight: 'bold' },
  noBirthData: { color: colors.gray, textAlign: 'center', marginVertical: 20 },
  placementsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  placementItem: { alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 16, padding: 16, width: 100 },
  placementSymbol: { fontSize: 24, marginBottom: 8 },
  placementLabel: { color: colors.gray, fontSize: 12 },
  placementSign: { color: colors.white, fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  sectionTitle: { color: colors.white, fontSize: 20, fontWeight: 'bold', marginTop: 24, marginBottom: 16 },
  eventCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20, marginRight: 16, width: 180, alignItems: 'center' },
  eventIcon: { fontSize: 32, marginBottom: 8 },
  eventTitle: { color: colors.white, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  eventDate: { color: colors.gold, fontSize: 14, marginTop: 4 },
  eventAttendees: { color: colors.gray, fontSize: 12, marginTop: 4 },
  joinButton: { backgroundColor: colors.accent, paddingVertical: 8, paddingHorizontal: 24, borderRadius: 20, marginTop: 12 },
  joinButtonText: { color: colors.white, fontSize: 14, fontWeight: 'bold' },
  postCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 16, marginBottom: 16 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  postAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gold, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  postAuthor: { color: colors.white, fontSize: 14, fontWeight: 'bold' },
  postContent: { color: colors.lightGray, fontSize: 14, lineHeight: 20, marginBottom: 12 },
  postActions: { flexDirection: 'row', gap: 16 },
  postActionText: { color: colors.gray, fontSize: 14 },

  // Chinese-Inspired Component Styles
  // Element Badge
  elementBadge: { borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.creamWhite },
  elementEmoji: { fontSize: 20 },
  elementCharacter: { fontSize: 14, fontWeight: 'bold', color: colors.inkBlack },

  // Yuan Fen Score
  yuanFenContainer: { justifyContent: 'center', alignItems: 'center' },
  yuanFenCircle: { width: '100%', height: '100%', borderRadius: 50, borderWidth: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.inkBlack },
  yuanFenScore: { fontSize: 32, fontWeight: 'bold', color: colors.creamWhite },
  yuanFenLabel: { fontSize: 12, color: colors.imperialGold, marginTop: 4 },

  // Red Thread
  redThread: { alignItems: 'center', paddingVertical: 10 },
  threadText: { fontSize: 24, color: colors.chineseRed },

  // Zodiac Wheel
  zodiacWheelContainer: { height: 300, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  zodiacWheel: { width: width, height: 300, position: 'relative' },
  zodiacAnimal: { position: 'absolute', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  zodiacAnimalEmoji: { fontSize: 24 },
  zodiacAnimalChar: { fontSize: 10, color: colors.imperialGold },
  zodiacCenter: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -30 }, { translateY: -30 }], width: 60, height: 60, borderRadius: 30, backgroundColor: colors.chineseRed, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.imperialGold },
  zodiacCenterText: { fontSize: 24, color: colors.creamWhite, fontWeight: 'bold' },
  zodiacCenterSubtext: { fontSize: 10, color: colors.creamWhite },

  // Traditional Border
  traditionalBorderContainer: { borderWidth: 1, borderColor: colors.imperialGold, borderRadius: 8, overflow: 'hidden' },
  borderPattern: { fontSize: 10, color: colors.imperialGold, textAlign: 'center', opacity: 0.5 },

  // Red Thread Card
  redThreadCard: { width: width - 40, minHeight: 520, backgroundColor: colors.secondary, borderRadius: 20, overflow: 'hidden', position: 'absolute', borderWidth: 2, borderColor: colors.imperialGold },
  cardBorderTop: { backgroundColor: colors.inkBlack, paddingVertical: 8 },
  cardBorderBottom: { backgroundColor: colors.inkBlack, paddingVertical: 8 },
  borderPatternText: { fontSize: 12, color: colors.imperialGold, textAlign: 'center', opacity: 0.7 },
  yuanFenBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: colors.chineseRed, borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 2, borderColor: colors.imperialGold },
  yuanFenBadgeScore: { fontSize: 28, fontWeight: 'bold', color: colors.creamWhite },
  yuanFenBadgeLabel: { fontSize: 14, color: colors.imperialGold },
  yuanFenBadgeSubtext: { fontSize: 10, color: colors.creamWhite, marginTop: 2 },
  chineseSignText: { fontSize: 16, color: colors.imperialGold },
  elementRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  elementInfo: { marginLeft: 12 },
  elementName: { fontSize: 14, color: colors.creamWhite },
  elementCharacterLarge: { fontSize: 24, color: colors.imperialGold, fontWeight: 'bold' },
  luckyNumbersRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12, flexWrap: 'wrap' },
  luckyNumbersLabel: { fontSize: 14, color: colors.creamWhite },
  luckyNumberBadge: { backgroundColor: colors.imperialGold, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, marginLeft: 8 },
  luckyNumberText: { fontSize: 12, fontWeight: 'bold', color: colors.inkBlack },
  destinyMessage: { marginTop: 12, padding: 12, backgroundColor: colors.inkBlack, borderRadius: 12, borderLeftWidth: 3, borderLeftColor: colors.chineseRed },
  destinyText: { fontSize: 12, color: colors.creamWhite, fontStyle: 'italic', lineHeight: 18 },

  // Chinese Header
  chineseHeader: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 15, alignItems: 'center' },
  chineseHeaderTitle: { fontSize: 32, fontWeight: 'bold', color: colors.imperialGold, marginBottom: 4 },

  // Wheel Section
  wheelSection: { alignItems: 'center' },
  toggleWheelButton: { backgroundColor: colors.secondary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: colors.imperialGold, marginVertical: 10 },
  toggleWheelText: { color: colors.imperialGold, fontSize: 14 },

  // Updated Action Buttons
  rejectButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.darkGray, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.gray },
  destinyButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.imperialGold },
  acceptButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.chineseRed, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.imperialGold },
  actionLabel: { fontSize: 10, color: colors.creamWhite, marginTop: 4 },

  // Empty State
  emptyMessage: { fontSize: 12, color: colors.gray, textAlign: 'center', marginTop: 8 },

  // Chinese Messages
  chineseMessageItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.imperialGold + '40' },
  chineseAvatarCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.chineseRed, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.imperialGold },
  avatarEmoji: { fontSize: 28 },
  chineseUnreadBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.chineseRed, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.imperialGold },

  // Red Envelope Section
  redEnvelopeSection: { marginTop: 24, paddingVertical: 16 },
  redEnvelopeTitle: { fontSize: 18, fontWeight: 'bold', color: colors.creamWhite, marginBottom: 12 },
  redEnvelopeButton: { backgroundColor: colors.chineseRed, borderRadius: 16, padding: 16, marginRight: 12, width: 140, alignItems: 'center', borderWidth: 2, borderColor: colors.imperialGold },
  redEnvelopeEmoji: { fontSize: 36, marginBottom: 8 },
  redEnvelopeText: { color: colors.creamWhite, fontSize: 14, fontWeight: 'bold' },

  // Chinese Icebreaker
  chineseIcebreaker: { backgroundColor: colors.secondary, borderRadius: 12, padding: 16, marginRight: 12, width: 220, borderWidth: 1, borderColor: colors.jadeGreen },

  // Chinese Profile
  chineseProfileHeader: { alignItems: 'center', marginBottom: 24 },
  chineseProfileAvatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.imperialGold, marginBottom: 16 },
  profileElement: { fontSize: 14, color: colors.jadeGreen, marginTop: 4 },

  // BaZi Chart
  baziChartContainer: { backgroundColor: colors.secondary, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 2, borderColor: colors.imperialGold },
  baziTitle: { fontSize: 24, fontWeight: 'bold', color: colors.imperialGold, textAlign: 'center' },
  baziSubtitle: { fontSize: 14, color: colors.creamWhite, textAlign: 'center', marginBottom: 20 },
  baziPillars: { flexDirection: 'row', justifyContent: 'space-around' },
  baziPillar: { alignItems: 'center' },
  pillarLabel: { fontSize: 12, color: colors.creamWhite, marginBottom: 8 },
  pillarBox: { width: 70, height: 90, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.inkBlack },
  pillarHeavenly: { fontSize: 28, fontWeight: 'bold', color: colors.inkBlack },
  pillarEarthly: { fontSize: 20, color: colors.inkBlack, marginTop: 4 },

  // Elements Balance
  elementsBalanceContainer: { backgroundColor: colors.secondary, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: colors.jadeGreen },
  elementsTitle: { fontSize: 20, fontWeight: 'bold', color: colors.jadeGreen, marginBottom: 16 },
  elementsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  elementBalanceItem: { alignItems: 'center' },
  elementBalanceEmoji: { fontSize: 32, marginBottom: 8 },
  elementBalanceName: { fontSize: 16, color: colors.creamWhite, fontWeight: 'bold' },

  // Chinese Birth Data Card
  chineseBirthDataCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: colors.imperialGold },
  birthDataTitle: { fontSize: 18, fontWeight: 'bold', color: colors.imperialGold, marginBottom: 16 },

  // Lucky Info Card
  luckyInfoCard: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 2, borderColor: colors.chineseRed },
  luckyInfoTitle: { fontSize: 18, fontWeight: 'bold', color: colors.chineseRed, marginBottom: 16 },
  luckyInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  luckyInfoLabel: { fontSize: 14, color: colors.creamWhite, marginRight: 12 },
  luckyNumbersContainer: { flexDirection: 'row', gap: 8 },
  luckyNumberBadgeLarge: { backgroundColor: colors.chineseRed, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 2, borderColor: colors.imperialGold },
  luckyNumberTextLarge: { fontSize: 18, fontWeight: 'bold', color: colors.creamWhite },
  luckyColorsContainer: { flexDirection: 'row', gap: 12 },
  luckyColorSwatch: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: colors.creamWhite },
});
