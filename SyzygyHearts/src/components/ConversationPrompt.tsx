/**
 * ConversationPrompt Component
 * Displays conversation starter prompts based on compatibility
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated
} from 'react-native';
import { ConversationPrompt as Prompt, PromptType } from '../data/conversationPrompts';
import { Element } from '../data/elementsCycle';

interface ConversationPromptProps {
  prompts: Prompt[];
  onSelectPrompt: (promptText: string) => void;
  userElement: Element;
  matchElement: Element;
}

const ConversationPrompt: React.FC<ConversationPromptProps> = ({
  prompts,
  onSelectPrompt,
  userElement,
  matchElement
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  // Show 3 prompts at a time
  const visiblePrompts = prompts.slice(currentPromptIndex, currentPromptIndex + 3);

  const handleRefresh = () => {
    // Cycle through prompts
    const nextIndex = (currentPromptIndex + 3) % prompts.length;
    setCurrentPromptIndex(nextIndex);
  };

  const getPromptIcon = (type: PromptType): string => {
    switch (type) {
      case PromptType.ELEMENT:
        return '🌟';
      case PromptType.ZODIAC:
        return '🐉';
      case PromptType.COMPLEMENTARY:
        return '☯️';
      case PromptType.GENERAL:
        return '💬';
      default:
        return '💭';
    }
  };

  const getElementColor = (element: Element): string => {
    const colors: Record<Element, string> = {
      [Element.WOOD]: '#4CAF50',
      [Element.FIRE]: '#FF5722',
      [Element.EARTH]: '#D4A574',
      [Element.METAL]: '#CFD8DC',
      [Element.WATER]: '#2196F3'
    };
    return colors[element];
  };

  if (prompts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.headerIcon}>💡</Text>
        <Text style={styles.headerText}>
          {isExpanded ? 'Hide' : 'Show'} Conversation Starters
        </Text>
        <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {/* Expanded Prompts */}
      {isExpanded && (
        <View style={styles.promptsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.promptsScroll}
          >
            {visiblePrompts.map((prompt, index) => (
              <TouchableOpacity
                key={prompt.id}
                style={[
                  styles.promptCard,
                  index === 0 && styles.firstPromptCard
                ]}
                onPress={() => onSelectPrompt(prompt.text)}
                activeOpacity={0.8}
              >
                <View style={styles.promptHeader}>
                  <Text style={styles.promptIcon}>
                    {getPromptIcon(prompt.type)}
                  </Text>
                  {prompt.targetElement && (
                    <View
                      style={[
                        styles.elementIndicator,
                        { backgroundColor: getElementColor(prompt.targetElement) }
                      ]}
                    />
                  )}
                </View>
                <Text style={styles.promptText}>{prompt.text}</Text>
                <Text style={styles.tapHint}>Tap to use</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Refresh Button */}
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            <Text style={styles.refreshIcon}>🔄</Text>
            <Text style={styles.refreshText}>More</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 8,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2A2A2A'
  },
  headerIcon: {
    fontSize: 18,
    marginRight: 8
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700'
  },
  expandIcon: {
    fontSize: 12,
    color: '#FFD700'
  },
  promptsContainer: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 12
  },
  promptsScroll: {
    paddingLeft: 12
  },
  promptCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 14,
    marginRight: 10,
    width: 240,
    borderWidth: 1,
    borderColor: '#FFD700'
  },
  firstPromptCard: {
    marginLeft: 0
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  promptIcon: {
    fontSize: 16,
    marginRight: 6
  },
  elementIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 'auto'
  },
  promptText: {
    fontSize: 14,
    color: '#FFFDD0',
    lineHeight: 20,
    marginBottom: 6
  },
  tapHint: {
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic'
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFD700'
  },
  refreshIcon: {
    fontSize: 14,
    marginRight: 4
  },
  refreshText: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: '600'
  }
});

export default ConversationPrompt;
