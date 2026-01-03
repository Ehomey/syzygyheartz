/**
 * MessagesScreen - Chat and messaging hub
 * Features red envelope gifting and icebreakers
 * Extracted from App.tsx
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS } from '../../../core/constants';
import { StarsBackground } from '../../components';

interface Conversation {
  id: number;
  name: string;
  emoji: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Mei Lin',
    emoji: '🐰',
    lastMessage: 'Our Yuan Fen score is amazing!',
    time: '2h ago',
    unread: 2,
  },
  {
    id: 2,
    name: 'Li Wei',
    emoji: '🐲',
    lastMessage: 'What is your birth hour? 🌙',
    time: '5h ago',
    unread: 0,
  },
  {
    id: 3,
    name: 'Xiao Yun',
    emoji: '🐯',
    lastMessage: 'Our elements are so harmonious',
    time: '1d ago',
    unread: 0,
  },
];

const redEnvelopeAmounts = [
  'Good Luck (8)',
  'Prosperity (88)',
  'Fortune (168)',
  'Abundance (888)',
];

const icebreakers = [
  "What's your Chinese zodiac sign?",
  'Do you believe in Yuan Fen?',
  'What element defines you?',
  "What's your lucky number?",
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <StarsBackground />

      <View style={styles.header}>
        <Text style={styles.chineseTitle}>消息</Text>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Red thread conversations</Text>
      </View>

      <ScrollView style={styles.messageList}>
        {conversations.map((conv) => (
          <TouchableOpacity key={conv.id} style={styles.messageItem}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>{conv.emoji}</Text>
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageName}>{conv.name}</Text>
                <Text style={styles.messageTime}>{conv.time}</Text>
              </View>
              <Text style={styles.messagePreview} numberOfLines={1}>
                {conv.lastMessage}
              </Text>
            </View>
            {conv.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{conv.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Red Envelope Quick Actions */}
        <View style={styles.redEnvelopeSection}>
          <Text style={styles.sectionTitle}>🧧 Red Envelope Quick Send</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {redEnvelopeAmounts.map((amount, i) => (
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
          <Text style={styles.sectionTitle}>开场白 Icebreakers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {icebreakers.map((question, i) => (
              <View key={i} style={styles.icebreaker}>
                <Text style={styles.icebreakerText}>{question}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inkBlack,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    alignItems: 'center',
  },
  chineseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.imperialGold,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.creamWhite,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 4,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.imperialGold + '40',
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.chineseRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageName: {
    color: COLORS.creamWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageTime: {
    color: COLORS.gray,
    fontSize: 12,
  },
  messagePreview: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 4,
  },
  unreadBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.chineseRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.imperialGold,
  },
  unreadText: {
    color: COLORS.creamWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  redEnvelopeSection: {
    marginTop: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.creamWhite,
    marginBottom: 12,
  },
  redEnvelopeButton: {
    backgroundColor: COLORS.chineseRed,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.imperialGold,
  },
  redEnvelopeEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  redEnvelopeText: {
    color: COLORS.creamWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  icebreakersSection: {
    marginTop: 24,
  },
  icebreaker: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 220,
    borderWidth: 1,
    borderColor: COLORS.jadeGreen,
  },
  icebreakerText: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
});
