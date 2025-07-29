import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const settingsItems = [
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'View and edit your user profile',
      icon: 'user',
      action: () => router.push('/settings/profile')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage push/email alerts',
      icon: 'bell',
      action: () => router.push('/settings/notifications')
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      description: 'Add/manage payment options (UPI, card, etc.)',
      icon: 'credit-card',
      action: () => router.push('/settings/payment')
    },
    {
      id: 'password',
      title: 'Change Password',
      description: 'Update login credentials',
      icon: 'lock',
      action: () => router.push('/settings/password')
    },
    {
      id: 'theme',
      title: 'App Theme',
      description: 'Switch between light/dark mode',
      icon: isDarkMode ? 'sun' : 'moon',
      isSwitch: true,
      value: isDarkMode,
      action: () => setIsDarkMode(!isDarkMode)
    },
    {
      id: 'language',
      title: 'Language',
      description: 'Set preferred language',
      icon: 'globe',
      action: () => router.push('/settings/language')
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      description: 'Manage data and app permissions',
      icon: 'shield',
      action: () => router.push('/settings/privacy')
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'FAQs, Contact, Troubleshooting',
      icon: 'help-circle',
      action: () => router.push('/settings/help')
    },
    {
      id: 'about',
      title: 'About App',
      description: 'Version info, developer credits',
      icon: 'info',
      action: () => router.push('/settings/about')
    },
    {
      id: 'logout',
      title: 'Logout',
      description: 'Sign out of the app',
      icon: 'log-out',
      action: () => console.log('Logout pressed'),
      danger: true
    }
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.settingItem, item.danger && styles.dangerItem]}
      onPress={item.action}
      activeOpacity={0.7}
    >
      <View style={styles.settingItemLeft}>
        <View style={[styles.iconContainer, item.danger && styles.dangerIcon]}>
          <Feather name={item.icon} size={20} color={item.danger ? '#e74c3c' : '#249e8e'} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, item.danger && styles.dangerText]}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
      </View>
      {item.isSwitch ? (
        <Switch
          value={item.value}
          onValueChange={item.action}
          trackColor={{ false: '#e6fbf7', true: '#b2f2e9' }}
          thumbColor={item.value ? '#249e8e' : '#f4f3f4'}
        />
      ) : (
        <Feather name="chevron-right" size={20} color={item.danger ? '#e74c3c' : '#1a1a2e'} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#249e8e', marginVertical: 20, paddingHorizontal: 16 }}>Settings</Text>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.settingsList}>
          {settingsItems.map(renderSettingItem)}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1
  },

  settingsList: {
    padding: 16
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6fbf7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  dangerIcon: {
    backgroundColor: '#fde8e7'
  },
  textContainer: {
    flex: 1
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4
  },
  settingDescription: {
    fontSize: 14,
    color: '#666'
  },
  dangerItem: {
    borderBottomWidth: 0
  },
  dangerText: {
    color: '#e74c3c'
  }
});

export default SettingsScreen;