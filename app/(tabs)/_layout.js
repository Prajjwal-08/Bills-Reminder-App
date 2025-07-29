import { Tabs } from 'expo-router';
import TabBarIcon from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => <TabBarIcon name={route.name} color={color} />,
        tabBarActiveTintColor: '#249e8e',
        tabBarInactiveTintColor: '#249e8e99',
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="upcoming" options={{ title: 'Upcoming' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="categories" options={{ title: 'Categories' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settingsssss' }} />
    </Tabs>
  );
} 