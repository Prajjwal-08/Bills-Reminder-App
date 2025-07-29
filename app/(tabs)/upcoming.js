import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const mockBills = [
  { id: '1', name: 'Electricity', dueDate: '2024-07-10', amount: 120.5, category: 'Utilities' },
  { id: '2', name: 'Internet', dueDate: '2024-07-12', amount: 60.0, category: 'Utilities' },
  { id: '3', name: 'Groceries', dueDate: '2024-07-15', amount: 200.0, category: 'Groceries' },
  { id: '4', name: 'Rent', dueDate: '2024-07-01', amount: 950.0, category: 'Rent' },
  { id: '5', name: 'Phone', dueDate: '2024-07-18', amount: 45.0, category: 'Utilities' },
];

function UpcomingScreen() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBills(mockBills);
      setLoading(false);
    }, 1000);
  }, []);

  const renderBill = ({ item }) => (
    <View style={styles.billCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.billName}>{item.name}</Text>
        <Text style={styles.billCategory}>{item.category}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.billAmount}>${item.amount.toFixed(2)}</Text>
        <Text style={styles.billDueDate}>Due: {item.dueDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Bills</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#249e8e" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={bills}
          keyExtractor={item => item.id}
          renderItem={renderBill}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#249e8e', marginBottom: 16 },
  billCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e6fbf7',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  billName: { fontSize: 18, fontWeight: '600', color: '#1a1a2e' },
  billCategory: { fontSize: 14, color: '#249e8e', marginTop: 2 },
  billAmount: { fontSize: 18, fontWeight: 'bold', color: '#249e8e' },
  billDueDate: { fontSize: 13, color: '#888', marginTop: 2 },
});

export default UpcomingScreen; 