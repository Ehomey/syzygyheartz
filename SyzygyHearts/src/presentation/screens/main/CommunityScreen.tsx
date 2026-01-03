/**
 * CommunityScreen - Community events and discussions
 * Features events and posts from other users
 * Extracted from App.tsx
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../../core/constants';
import { StarsBackground } from '../../components';

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
}

interface Event {
  id: number;
  title: string;
  date: string;
  attendees: number;
}

const posts: Post[] = [
  {
    id: 1,
    author: 'StarGazer22',
    content: 'Anyone else feeling the Neptune retrograde? Dreams have been intense!',
    likes: 24,
  },
  {
    id: 2,
    author: 'MoonChild',
    content: 'Best compatible signs for Scorpio rising? Looking for insight 🦂',
    likes: 18,
  },
];

const events: Event[] = [
  { id: 1, title: 'Full Moon Meditation', date: 'Dec 27', attendees: 156 },
  { id: 2, title: 'Venus in Aquarius Chat', date: 'Jan 3', attendees: 89 },
];

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <StarsBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Connect with fellow star seekers</Text>

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
              <TouchableOpacity>
                <Text style={styles.postActionText}>❤️ {post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.postActionText}>💬 Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  sectionTitle: {
    color: COLORS.creamWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 180,
    alignItems: 'center',
  },
  eventIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  eventTitle: {
    color: COLORS.creamWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  eventDate: {
    color: COLORS.imperialGold,
    fontSize: 14,
    marginTop: 4,
  },
  eventAttendees: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
  },
  joinButton: {
    backgroundColor: COLORS.chineseRed,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 12,
  },
  joinButtonText: {
    color: COLORS.creamWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.imperialGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postAuthor: {
    color: COLORS.creamWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  postContent: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  postActionText: {
    color: COLORS.gray,
    fontSize: 14,
  },
});
