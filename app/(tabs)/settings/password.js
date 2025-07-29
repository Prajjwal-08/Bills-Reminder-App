import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Password() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#249e8e' },
});