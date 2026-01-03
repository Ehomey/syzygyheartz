/**
 * MainTabs - Bottom tab navigation for main app screens
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../../core/constants';
import { TabIcon } from '../components';
import {
  HomeScreen,
  HoroscopeScreen,
  MessagesScreen,
  ProfileScreen,
  CommunityScreen,
} from '../screens';

// Import existing DestinyDashboard from legacy location
import DestinyDashboard from '../../screens/DestinyDashboard';

const Tab = createBottomTabNavigator();

type TabName = 'Home' | 'Horoscope' | 'Messages' | 'Profile' | 'Community';

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name as TabName} focused={focused} />
        ),
        tabBarStyle: {
          backgroundColor: COLORS.inkBlack,
          borderTopColor: COLORS.darkGray,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: COLORS.chineseRed,
        tabBarInactiveTintColor: COLORS.gray,
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
