import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const iconMap = {
  Dashboard: 'dashboard',
  Upcoming: 'event',
  Calendar: 'calendar-today',
  Categories: 'category',
  Settings: 'settings',
};

const TabBarIcon = ({ name, color }) => {
  const iconName = iconMap[name.charAt(0).toUpperCase() + name.slice(1)] || 'help-outline';
  return <MaterialIcons name={iconName} size={24} color={color} />;
};

export default TabBarIcon; 