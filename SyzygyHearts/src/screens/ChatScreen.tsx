import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ref, onValue, push } from 'firebase/database';
import { realtimeDb } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import ConversationPrompt from '../components/ConversationPrompt';
import {
  getPromptsForElementPair,
  getPromptsForZodiac,
  getDailyConnectionTip
} from '../data/conversationPrompts';
import { Element } from '../data/elementsCycle';
import { ChineseZodiac } from '../data/zodiacData';

interface ChatScreenParams {
  chatId: string;
  matchName?: string;
  matchElement?: Element;
  matchZodiac?: ChineseZodiac;
  userElement?: Element;
}

const ChatScreen: React.FC<{ route: any }> = ({ route }) => {
  const params: ChatScreenParams = route.params;
  const { chatId, matchName, matchElement, matchZodiac, userElement } = params;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const { user } = useAuth();

  // Default elements if not provided (fallback)
  const defaultUserElement = userElement || Element.FIRE;
  const defaultMatchElement = matchElement || Element.WATER;
  const defaultMatchZodiac = matchZodiac || ChineseZodiac.DRAGON;

  // Get prompts based on compatibility
  const conversationPrompts = getPromptsForElementPair(defaultUserElement, defaultMatchElement);
  const zodiacPrompts = getPromptsForZodiac(defaultMatchZodiac);
  const allPrompts = [...conversationPrompts, ...zodiacPrompts];

  // Get daily connection tip
  const dailyTip = getDailyConnectionTip(defaultUserElement, defaultMatchElement);

  useEffect(() => {
    const messagesRef = ref(realtimeDb, `chats/${chatId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgs = Object.values(data);
        setMessages(msgs as any[]);
      }
    });
  }, [chatId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const messagesRef = ref(realtimeDb, `chats/${chatId}/messages`);
    push(messagesRef, {
      text,
      sender: user?.uid,
      timestamp: Date.now(),
    });
    setText('');
  };

  const handleSelectPrompt = (promptText: string) => {
    setText(promptText);
  };

  const renderMessage = ({ item }: any) => (
    <View style={[styles.message, item.sender === user?.uid ? styles.myMessage : styles.theirMessage]}>
      <Text style={item.sender === user?.uid ? styles.myMessageText : styles.theirMessageText}>
        {item.text}
      </Text>
    </View>
  );

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

  return (
    <View style={styles.container}>
      {/* Header with compatibility info */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{matchName || 'Chat'}</Text>
          <View style={styles.compatibilityBadges}>
            <View style={[styles.badge, { backgroundColor: getElementColor(defaultMatchElement) }]}>
              <Text style={styles.badgeText}>{defaultMatchElement}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{defaultMatchZodiac}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Daily Connection Tip */}
      <View style={styles.tipContainer}>
        <Text style={styles.tipIcon}>✨</Text>
        <Text style={styles.tipLabel}>Today's Connection Tip:</Text>
        <Text style={styles.tipText}>{dailyTip}</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
      />

      {/* Conversation Prompts */}
      <ConversationPrompt
        prompts={allPrompts}
        onSelectPrompt={handleSelectPrompt}
        userElement={defaultUserElement}
        matchElement={defaultMatchElement}
      />

      {/* Input Container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!text.trim()}
          activeOpacity={0.7}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C'
  },
  header: {
    backgroundColor: '#2A2A2A',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700'
  },
  headerInfo: {
    flexDirection: 'column'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginBottom: 8
  },
  compatibilityBadges: {
    flexDirection: 'row',
    gap: 8
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#3A3A3A'
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFDD0',
    fontWeight: '600'
  },
  tipContainer: {
    backgroundColor: '#2A2A2A',
    padding: 12,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700'
  },
  tipIcon: {
    fontSize: 16,
    marginBottom: 4
  },
  tipLabel: {
    fontSize: 11,
    color: '#FFD700',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4
  },
  tipText: {
    fontSize: 13,
    color: '#FFFDD0',
    lineHeight: 18,
    fontStyle: 'italic'
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  message: {
    padding: 12,
    margin: 5,
    borderRadius: 16,
    maxWidth: '75%'
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFD700',
    borderBottomRightRadius: 4
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2A2A2A',
    borderBottomLeftRadius: 4
  },
  myMessageText: {
    color: '#1C1C1C',
    fontSize: 15
  },
  theirMessageText: {
    color: '#FFFDD0',
    fontSize: 15
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#2A2A2A',
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#3A3A3A',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFFDD0',
    fontSize: 15,
    maxHeight: 100,
    minHeight: 40
  },
  sendButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70
  },
  sendButtonDisabled: {
    backgroundColor: '#3A3A3A',
    opacity: 0.5
  },
  sendButtonText: {
    color: '#1C1C1C',
    fontSize: 15,
    fontWeight: '700'
  }
});

export default ChatScreen;
