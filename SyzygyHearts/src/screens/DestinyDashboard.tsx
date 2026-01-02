import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ElementVisualization from '../components/ElementVisualization';
import DailyInsightCard from '../components/DailyInsightCard';
import BaZiChartInteractive from '../components/BaZiChartInteractive';
import { calculateBaZi, BaZiChart } from '../astrology/bazi';
import { Element } from '../data/elementsCycle';

export default function DestinyDashboard() {
  const [baziChart, setBaziChart] = useState<BaZiChart | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  // Keep a safe, always-defined list to avoid runtime crashes if the chart fails to populate
  const elementList = Array.isArray(baziChart?.elements) ? baziChart!.elements : [];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Load user birth data from AsyncStorage
      const birthDataStr = await AsyncStorage.getItem('birthData');
      const name = await AsyncStorage.getItem('userName') || 'Friend';

      setUserName(name);

      if (birthDataStr) {
        const birthData = JSON.parse(birthDataStr);
        // birthData is stored as { date: "YYYY-MM-DD", time: "HH:MM", location: "..." }
        const { date, time } = birthData;

        // Parse date string (YYYY-MM-DD)
        const dateParts = date ? date.split('-') : [];
        const year = dateParts[0] ? parseInt(dateParts[0]) : 1990;
        const month = dateParts[1] ? parseInt(dateParts[1]) : 1;
        const day = dateParts[2] ? parseInt(dateParts[2]) : 1;

        // Parse time string (HH:MM)
        const timeParts = time ? time.split(':') : [];
        const hour = timeParts[0] ? parseInt(timeParts[0]) : 12;

        // Calculate BaZi chart
        const chart = calculateBaZi(
          year,
          month,
          day,
          hour
        );

        setBaziChart(chart);
      } else {
        // For demo purposes, create a sample chart
        const chart = calculateBaZi(1995, 6, 15, 14);
        setBaziChart(chart);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Create a demo chart on error
      const chart = calculateBaZi(1995, 6, 15, 14);
      setBaziChart(chart);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Calculating your destiny chart...</Text>
      </View>
    );
  }

  if (!baziChart) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load your chart</Text>
      </View>
    );
  }

  const greetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Guard against unexpected/null element values
  const safeDayMaster = (value: Element | undefined) => {
    const validElements = Object.values(Element);
    return value && validElements.includes(value) ? value : Element.EARTH;
  };
  const dayMaster = safeDayMaster(baziChart.dayMaster);
  const totalElements = elementList.length || 1;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{greetingTime()}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Element Visualization - Large and Engaging */}
        <View style={styles.elementSection}>
          <ElementVisualization element={dayMaster} size={180} />
          <Text style={styles.elementDescription}>
            Your Day Master Element
          </Text>
        </View>

        {/* Daily Insight Card */}
        <DailyInsightCard element={dayMaster} />

        {/* Element Distribution */}
        <View style={styles.distributionCard}>
          <Text style={styles.cardTitle}>Element Balance</Text>
          <Text style={styles.cardSubtitle}>
            Your elemental composition from the Four Pillars
          </Text>

          <View style={styles.elementBars}>
            {Object.entries(Element).map(([key, element]) => {
              const count = elementList.filter((e) => e === element).length;
              const percentage = (count / totalElements) * 100;

              return (
                <View key={element} style={styles.elementBarContainer}>
                  <View style={styles.elementBarHeader}>
                    <Text style={styles.elementBarLabel}>{element}</Text>
                    <Text style={styles.elementBarCount}>{count}</Text>
                  </View>
                  <View style={styles.elementBarBackground}>
                    <View
                      style={[
                        styles.elementBarFill,
                        {
                          width: `${percentage}%`,
                          backgroundColor: getElementColor(element),
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.dominantElementBadge}>
            <Text style={styles.dominantLabel}>Dominant Element:</Text>
            <Text
              style={[
                styles.dominantValue,
                { color: getElementColor(baziChart.dominantElement || Element.EARTH) },
              ]}
            >
              {baziChart.dominantElement}
            </Text>
          </View>
        </View>

        {/* Four Pillars Chart */}
        <BaZiChartInteractive
          yearPillar={baziChart.year}
          monthPillar={baziChart.month}
          dayPillar={baziChart.day}
          hourPillar={baziChart.hour}
        />

        {/* Auspicious Time Widget */}
        <View style={styles.auspiciousCard}>
          <Text style={styles.cardTitle}>Today's Auspicious Hours</Text>
          <Text style={styles.cardSubtitle}>
            Times aligned with your {dayMaster} energy
          </Text>

          <View style={styles.timeSlots}>
            {getAuspiciousHours(dayMaster).map((slot, index) => (
              <View key={index} style={styles.timeSlot}>
                <Text style={styles.timeText}>{slot.time}</Text>
                <Text style={styles.activityText}>{slot.activity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Helper function to get element colors
function getElementColor(element: Element): string {
  const colors: Record<Element, string> = {
    [Element.WOOD]: '#2ECC71',
    [Element.FIRE]: '#E74C3C',
    [Element.EARTH]: '#F39C12',
    [Element.METAL]: '#95A5A6',
    [Element.WATER]: '#3498DB',
  };
  return colors[element];
}

// Helper function to get auspicious hours
function getAuspiciousHours(element?: Element): Array<{ time: string; activity: string }> {
  const activities: Record<Element, Array<{ time: string; activity: string }>> = {
    [Element.WOOD]: [
      { time: '6:00 - 8:00 AM', activity: 'Creative projects' },
      { time: '12:00 - 2:00 PM', activity: 'Social connections' },
      { time: '6:00 - 8:00 PM', activity: 'Planning & growth' },
    ],
    [Element.FIRE]: [
      { time: '9:00 - 11:00 AM', activity: 'Bold initiatives' },
      { time: '1:00 - 3:00 PM', activity: 'Networking' },
      { time: '7:00 - 9:00 PM', activity: 'Passionate pursuits' },
    ],
    [Element.EARTH]: [
      { time: '7:00 - 9:00 AM', activity: 'Building foundations' },
      { time: '1:00 - 3:00 PM', activity: 'Practical work' },
      { time: '7:00 - 9:00 PM', activity: 'Nurturing relationships' },
    ],
    [Element.METAL]: [
      { time: '5:00 - 7:00 AM', activity: 'Focused work' },
      { time: '3:00 - 5:00 PM', activity: 'Organization' },
      { time: '9:00 - 11:00 PM', activity: 'Refinement' },
    ],
    [Element.WATER]: [
      { time: '5:00 - 7:00 AM', activity: 'Meditation' },
      { time: '11:00 AM - 1:00 PM', activity: 'Deep thinking' },
      { time: '9:00 - 11:00 PM', activity: 'Reflection' },
    ],
  };

  // Return activities for element, or default to Earth if not found
  return (element && activities[element]) || activities[Element.EARTH] || [];
}

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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFDD0',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#C41E3A',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFDD0',
  },
  elementSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  elementDescription: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  distributionCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 20,
  },
  elementBars: {
    marginBottom: 20,
  },
  elementBarContainer: {
    marginBottom: 16,
  },
  elementBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  elementBarLabel: {
    fontSize: 14,
    color: '#FFFDD0',
    fontWeight: '600',
  },
  elementBarCount: {
    fontSize: 14,
    color: '#999',
  },
  elementBarBackground: {
    height: 8,
    backgroundColor: '#1C1C1C',
    borderRadius: 4,
    overflow: 'hidden',
  },
  elementBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  dominantElementBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  dominantLabel: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
  dominantValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  auspiciousCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 20,
  },
  timeSlots: {
    marginTop: 16,
  },
  timeSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  activityText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
});
