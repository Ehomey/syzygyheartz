import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Element } from '../data/elementsCycle';
import { ELEMENT_COLORS } from '../constants';

interface DailyInsightCardProps {
  element: Element;
  dayOfWeek?: string;
}

export default function DailyInsightCard({ element, dayOfWeek }: DailyInsightCardProps) {
  // Generate personalized insight based on element and current day
  const getInsight = (): { energy: string; description: string } => {
    const date = new Date();
    const dayNumber = date.getDay();

    // Energy states based on day of week and element
    const energyStates = ['strong', 'balanced', 'calm', 'vibrant', 'flowing', 'steady', 'dynamic'];
    const energyIndex = (dayNumber + Object.values(Element).indexOf(element)) % energyStates.length;
    const energy = energyStates[energyIndex];

    const insights: Record<Element, string[]> = {
      [Element.WOOD]: [
        'Your creative energy is flourishing. Perfect day for new beginnings.',
        'Growth and expansion are favored. Nurture your ideas.',
        'Flexibility will be your strength today. Adapt and thrive.',
        'Your compassionate nature will attract positive connections.',
        'Innovation flows through you. Trust your creative instincts.',
      ],
      [Element.FIRE]: [
        'Your passion ignites opportunities. Share your enthusiasm.',
        'Dynamic energy surrounds you. Take bold action.',
        'Your charisma is at its peak. Connect with others.',
        'Transformation is in the air. Embrace change fearlessly.',
        'Your warmth draws people to you. Be the light.',
      ],
      [Element.EARTH]: [
        'Stability grounds your decisions. Build solid foundations.',
        'Your patience will be rewarded. Trust the process.',
        'Nurturing energy flows through you. Support others.',
        'Practical wisdom guides you. Focus on what matters.',
        'Your reliability makes you a trusted partner.',
      ],
      [Element.METAL]: [
        'Precision and clarity mark your path. Cut through confusion.',
        'Your determination strengthens resolve. Stay focused.',
        'Structure brings success. Organize and execute.',
        'Your integrity shines. Lead by example.',
        'Refinement and quality are your gifts today.',
      ],
      [Element.WATER]: [
        'Deep intuition guides you. Trust your inner voice.',
        'Adaptability is your superpower. Flow with circumstances.',
        'Wisdom comes from reflection. Take time to contemplate.',
        'Your perceptive nature reveals hidden truths.',
        'Emotional depth connects you to others profoundly.',
      ],
    };

    const elementInsights = insights[element];
    const description = elementInsights[dayNumber % elementInsights.length];

    return { energy, description };
  };

  const { energy, description } = getInsight();
  const elementColor = ELEMENT_COLORS[element];

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <View style={[styles.card, { borderLeftColor: elementColor }]}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{today}</Text>
        <View style={[styles.energyBadge, { backgroundColor: elementColor + '20' }]}>
          <Text style={[styles.energyText, { color: elementColor }]}>
            {energy.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.insightTitle}>Your {element} Energy</Text>

      <Text style={styles.insightDescription}>{description}</Text>

      <View style={styles.footer}>
        <View style={styles.elementIndicator}>
          <View style={[styles.elementDot, { backgroundColor: elementColor }]} />
          <Text style={styles.elementLabel}>Day Master Element</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 20,
    borderLeftWidth: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  energyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  energyText: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  insightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginBottom: 12,
  },
  insightDescription: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  elementIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  elementLabel: {
    fontSize: 12,
    color: '#999',
  },
});
