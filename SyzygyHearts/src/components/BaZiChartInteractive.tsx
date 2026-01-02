import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Pillar } from '../astrology/bazi';
import { Element } from '../data/elementsCycle';
import { ELEMENT_COLORS } from '../constants';

interface BaZiChartInteractiveProps {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
}

export default function BaZiChartInteractive({
  yearPillar,
  monthPillar,
  dayPillar,
  hourPillar,
}: BaZiChartInteractiveProps) {
  const [selectedPillar, setSelectedPillar] = useState<{
    name: string;
    pillar: Pillar;
    description: string;
  } | null>(null);

  const pillarDescriptions = {
    Year: 'Represents your ancestral roots, family heritage, and the foundation of your personality. Influences your early years and inherited traits.',
    Month: 'Reflects your parents influence, career path, and social relationships. Shows how you interact with society and your professional life.',
    Day: 'The most important pillar - represents yourself and your spouse. Your Day Master element defines your core nature and romantic compatibility.',
    Hour: 'Indicates your children, legacy, and later life. Shows your future prospects and what you will leave behind.',
  };

  const renderPillar = (name: string, pillar: Pillar) => {
    const elementColor = ELEMENT_COLORS[pillar.element];

    return (
      <TouchableOpacity
        style={styles.pillarContainer}
        onPress={() => setSelectedPillar({ name, pillar, description: pillarDescriptions[name as keyof typeof pillarDescriptions] })}
        activeOpacity={0.7}
      >
        <View style={[styles.pillarCard, { borderTopColor: elementColor }]}>
          <Text style={styles.pillarName}>{name}</Text>

          {/* Heavenly Stem */}
          <View style={[styles.stemBox, { backgroundColor: elementColor + '30' }]}>
            <Text style={[styles.stemText, { color: elementColor }]}>
              {pillar.stem}
            </Text>
            <Text style={styles.elementLabel}>{pillar.element}</Text>
          </View>

          {/* Earthly Branch */}
          <View style={styles.branchBox}>
            <Text style={styles.branchText}>{pillar.branch}</Text>
            {pillar.zodiac && (
              <Text style={styles.zodiacText}>{pillar.zodiac}</Text>
            )}
          </View>

          {/* Tap hint */}
          <Text style={styles.tapHint}>Tap to learn</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Four Pillars</Text>
      <Text style={styles.subtitle}>Ba Zi Chart - The Blueprint of Your Destiny</Text>

      <View style={styles.pillarsRow}>
        {renderPillar('Year', yearPillar)}
        {renderPillar('Month', monthPillar)}
      </View>

      <View style={styles.pillarsRow}>
        {renderPillar('Day', dayPillar)}
        {renderPillar('Hour', hourPillar)}
      </View>

      {/* Detail Modal */}
      <Modal
        visible={selectedPillar !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPillar(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedPillar(null)}
        >
          <View style={styles.modalContent}>
            {selectedPillar && (
              <>
                <Text style={styles.modalTitle}>{selectedPillar.name} Pillar</Text>

                <View style={styles.modalPillarInfo}>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Heavenly Stem:</Text>
                    <Text style={styles.modalValue}>{selectedPillar.pillar.stem}</Text>
                  </View>

                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Earthly Branch:</Text>
                    <Text style={styles.modalValue}>{selectedPillar.pillar.branch}</Text>
                  </View>

                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Element:</Text>
                    <View
                      style={[
                        styles.modalElementBadge,
                        { backgroundColor: ELEMENT_COLORS[selectedPillar.pillar.element] },
                      ]}
                    >
                      <Text style={styles.modalElementText}>
                        {selectedPillar.pillar.element}
                      </Text>
                    </View>
                  </View>

                  {selectedPillar.pillar.zodiac && (
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Zodiac Animal:</Text>
                      <Text style={styles.modalValue}>{selectedPillar.pillar.zodiac}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.descriptionBox}>
                  <Text style={styles.descriptionTitle}>Significance</Text>
                  <Text style={styles.descriptionText}>{selectedPillar.description}</Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedPillar(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFDD0',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  pillarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pillarContainer: {
    flex: 1,
    marginHorizontal: 6,
  },
  pillarCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    borderTopWidth: 4,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pillarName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stemBox: {
    width: '100%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  stemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  elementLabel: {
    fontSize: 11,
    color: '#FFFDD0',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  branchBox: {
    width: '100%',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  branchText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFDD0',
    marginBottom: 4,
  },
  zodiacText: {
    fontSize: 11,
    color: '#999',
  },
  tapHint: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#C41E3A',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalPillarInfo: {
    marginBottom: 20,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalLabel: {
    fontSize: 14,
    color: '#999',
  },
  modalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFDD0',
  },
  modalElementBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  modalElementText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFDD0',
  },
  descriptionBox: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#C41E3A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFDD0',
  },
});
