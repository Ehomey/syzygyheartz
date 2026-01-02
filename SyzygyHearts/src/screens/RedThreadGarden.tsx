import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ConnectionThread, { ConnectionData } from '../components/ConnectionThread';
import { Element } from '../data/elementsCycle';

// Mock data for demonstration
const MOCK_CONNECTIONS: ConnectionData[] = [
  {
    id: '1',
    matchName: 'Sarah',
    element: Element.WATER,
    zodiac: 'Rabbit',
    threadStrength: 15,
    daysSinceLastMessage: 8,
  },
  {
    id: '2',
    matchName: 'Emma',
    element: Element.FIRE,
    zodiac: 'Dragon',
    threadStrength: 45,
    daysSinceLastMessage: 3,
  },
  {
    id: '3',
    matchName: 'Olivia',
    element: Element.EARTH,
    zodiac: 'Ox',
    threadStrength: 85,
    daysSinceLastMessage: 0,
  },
  {
    id: '4',
    matchName: 'Ava',
    element: Element.WOOD,
    zodiac: 'Tiger',
    threadStrength: 0,
    daysSinceLastMessage: 15,
  },
  {
    id: '5',
    matchName: 'Mia',
    element: Element.METAL,
    zodiac: 'Monkey',
    threadStrength: 60,
    daysSinceLastMessage: 2,
  },
];

export default function RedThreadGarden() {
  const [connections, setConnections] = useState<ConnectionData[]>(MOCK_CONNECTIONS);
  const [refreshing, setRefreshing] = useState(false);

  // Sort connections by strength (weakest first to encourage engagement)
  const sortedConnections = useMemo(() => {
    return [...connections].sort((a, b) => a.threadStrength - b.threadStrength);
  }, [connections]);

  // Calculate garden statistics
  const stats = useMemo(() => {
    const total = connections.length;
    const flourishing = connections.filter(c => c.threadStrength >= 80).length;
    const withering = connections.filter(c => c.threadStrength === 0).length;
    const needsAttention = connections.filter(c => c.threadStrength > 0 && c.threadStrength < 25).length;

    return { total, flourishing, withering, needsAttention };
  }, [connections]);

  const handleWater = (connectionId: string) => {
    // Simulate sending a message / watering the thread
    setConnections(prevConnections =>
      prevConnections.map(conn =>
        conn.id === connectionId
          ? {
              ...conn,
              threadStrength: Math.min(100, conn.threadStrength + 5),
              daysSinceLastMessage: 0,
            }
          : conn
      )
    );
  };

  const handleConnectionPress = (connectionId: string) => {
    // Navigate to chat or profile
    console.log('Connection pressed:', connectionId);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#1C1C1C', '#0F0F0F', '#1C1C1C']}
        style={styles.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Red Thread Garden</Text>
        <Text style={styles.subtitle}>Nurture your connections to help them flourish</Text>
      </View>

      {/* Garden Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Threads</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#FFD700' }]}>{stats.flourishing}</Text>
          <Text style={styles.statLabel}>Flourishing</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#E67E22' }]}>{stats.needsAttention}</Text>
          <Text style={styles.statLabel}>Need Care</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#C41E3A' }]}>{stats.withering}</Text>
          <Text style={styles.statLabel}>Withered</Text>
        </View>
      </View>

      {/* Connections List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FFD700"
            colors={['#FFD700']}
          />
        }
      >
        {sortedConnections.length > 0 ? (
          <>
            {/* Withering/Warning Connections First */}
            {sortedConnections.filter(c => c.threadStrength < 25).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🌱 Needs Your Attention</Text>
                {sortedConnections
                  .filter(c => c.threadStrength < 25)
                  .map(connection => (
                    <ConnectionThread
                      key={connection.id}
                      connection={connection}
                      onWater={handleWater}
                      onPress={handleConnectionPress}
                    />
                  ))}
              </View>
            )}

            {/* Stable & Growing Connections */}
            {sortedConnections.filter(c => c.threadStrength >= 25 && c.threadStrength < 80).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🌿 Growing Strong</Text>
                {sortedConnections
                  .filter(c => c.threadStrength >= 25 && c.threadStrength < 80)
                  .map(connection => (
                    <ConnectionThread
                      key={connection.id}
                      connection={connection}
                      onWater={handleWater}
                      onPress={handleConnectionPress}
                    />
                  ))}
              </View>
            )}

            {/* Flourishing Connections */}
            {sortedConnections.filter(c => c.threadStrength >= 80).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>✨ Flourishing</Text>
                {sortedConnections
                  .filter(c => c.threadStrength >= 80)
                  .map(connection => (
                    <ConnectionThread
                      key={connection.id}
                      connection={connection}
                      onWater={handleWater}
                      onPress={handleConnectionPress}
                    />
                  ))}
              </View>
            )}
          </>
        ) : (
          // Empty State
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🌱</Text>
            <Text style={styles.emptyTitle}>Your Garden Awaits</Text>
            <Text style={styles.emptyText}>
              Plant your first seeds by extending threads to your matches
            </Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Explore Matches</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Garden Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsText}>
          💡 Threads grow stronger with messages, questions, and time spent together
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 12,
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1C',
  },
  tipsContainer: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
  },
  tipsText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});
