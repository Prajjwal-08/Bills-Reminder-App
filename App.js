import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import DashboardScreen from './screens/DashboardScreen';
import TabBarIcon from './components/TabBarIcon';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{name} Screen</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name={route.name} color={color} />,
          tabBarActiveTintColor: '#249e8e',
          tabBarInactiveTintColor: '#249e8e99',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Upcoming" children={() => <PlaceholderScreen name="Upcoming" />} />
        <Tab.Screen name="Calendar" children={() => <PlaceholderScreen name="Calendar" />} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Categories" children={() => <PlaceholderScreen name="Categories" />} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 