import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Element, getElementRelationship, ElementRelationship, ELEMENT_ATTRIBUTES } from '../data/elementsCycle';

interface ElementFusionProps {
  userElement: Element;
  matchElement: Element;
}

export default function ElementFusion({ userElement, matchElement }: ElementFusionProps) {
  // Animation values
  const leftPosition = useRef(new Animated.Value(0)).current;
  const rightPosition = useRef(new Animated.Value(0)).current;
  const fusionOpacity = useRef(new Animated.Value(0)).current;
  const fusionScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Sequence animation: circles move toward center, then fusion appears
    Animated.sequence([
      Animated.delay(500), // Initial delay
      Animated.parallel([
        Animated.timing(leftPosition, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(rightPosition, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fusionOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(fusionScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [leftPosition, rightPosition, fusionOpacity, fusionScale]);

  const relationship = getElementRelationship(userElement, matchElement);
  const relationshipText = getRelationshipText(relationship, userElement, matchElement);

  const leftTranslateX = leftPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const rightTranslateX = rightPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Element Interaction</Text>

      <View style={styles.fusionContainer}>
        {/* Left Element Circle */}
        <Animated.View
          style={[
            styles.elementCircle,
            {
              backgroundColor: getElementColor(userElement),
              transform: [{ translateX: leftTranslateX }],
            },
          ]}
        >
          <Text style={styles.elementText}>{userElement}</Text>
        </Animated.View>

        {/* Center Fusion Effect */}
        <Animated.View
          style={[
            styles.fusionCenter,
            {
              opacity: fusionOpacity,
              transform: [{ scale: fusionScale }],
            },
          ]}
        >
          <View
            style={[
              styles.fusionGlow,
              { backgroundColor: getRelationshipColor(relationship) },
            ]}
          />
          <Text style={styles.fusionSymbol}>
            {getRelationshipSymbol(relationship)}
          </Text>
        </Animated.View>

        {/* Right Element Circle */}
        <Animated.View
          style={[
            styles.elementCircle,
            {
              backgroundColor: getElementColor(matchElement),
              transform: [{ translateX: rightTranslateX }],
            },
          ]}
        >
          <Text style={styles.elementText}>{matchElement}</Text>
        </Animated.View>
      </View>

      {/* Relationship Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{relationshipText}</Text>
      </View>

      {/* Additional Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Your Element:</Text>
          <Text style={[styles.infoValue, { color: getElementColor(userElement) }]}>
            {userElement}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Their Element:</Text>
          <Text style={[styles.infoValue, { color: getElementColor(matchElement) }]}>
            {matchElement}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Relationship:</Text>
          <Text style={[styles.infoValue, { color: getRelationshipColor(relationship) }]}>
            {relationship}
          </Text>
        </View>
      </View>
    </View>
  );
}

function getElementColor(element: Element): string {
  const colors: Record<Element, string> = {
    [Element.WOOD]: '#2ECC71',
    [Element.FIRE]: '#E74C3C',
    [Element.EARTH]: '#F39C12',
    [Element.METAL]: '#BDC3C7',
    [Element.WATER]: '#3498DB',
  };
  return colors[element];
}

function getRelationshipColor(relationship: ElementRelationship): string {
  switch (relationship) {
    case ElementRelationship.GENERATING:
    case ElementRelationship.BEING_GENERATED:
      return '#2ECC71'; // Green for harmonious
    case ElementRelationship.SAME:
      return '#FFD700'; // Gold for same
    case ElementRelationship.CONTROLLING:
    case ElementRelationship.BEING_CONTROLLED:
      return '#E67E22'; // Orange for challenging
    default:
      return '#95A5A6'; // Grey for neutral
  }
}

function getRelationshipSymbol(relationship: ElementRelationship): string {
  switch (relationship) {
    case ElementRelationship.GENERATING:
      return '→';
    case ElementRelationship.BEING_GENERATED:
      return '←';
    case ElementRelationship.SAME:
      return '≈';
    case ElementRelationship.CONTROLLING:
      return '⚡';
    case ElementRelationship.BEING_CONTROLLED:
      return '⚡';
    default:
      return '~';
  }
}

function getRelationshipText(
  relationship: ElementRelationship,
  userElement: Element,
  matchElement: Element
): string {
  switch (relationship) {
    case ElementRelationship.GENERATING:
      return `Your ${userElement} naturally nurtures their ${matchElement}. You provide support and fuel their growth, creating a harmonious and supportive dynamic.`;
    case ElementRelationship.BEING_GENERATED:
      return `Their ${matchElement} naturally nurtures your ${userElement}. They provide support and fuel your growth, creating a nourishing relationship.`;
    case ElementRelationship.SAME:
      return `You both share the ${userElement} element. This creates deep understanding and shared values, though you may occasionally compete for the same resources.`;
    case ElementRelationship.CONTROLLING:
      return `Your ${userElement} naturally controls ${matchElement}. This can bring balance but requires conscious effort to avoid dominating the relationship.`;
    case ElementRelationship.BEING_CONTROLLED:
      return `Their ${matchElement} naturally controls ${userElement}. This can bring structure but requires understanding and mutual respect to thrive.`;
    default:
      return `Your ${userElement} and their ${matchElement} create a unique dynamic that requires balance and understanding.`;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFDD0',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  fusionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  elementCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFDD0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  elementText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  fusionCenter: {
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fusionGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.3,
  },
  fusionSymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  descriptionText: {
    fontSize: 15,
    color: '#FFFDD0',
    lineHeight: 22,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
