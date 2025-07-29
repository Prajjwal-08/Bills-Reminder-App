import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

const mockMonthlyData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      data: [120, 90, 140, 110, 160, 130, 170, 150, 180, 140, 120, 160],
      color: (opacity = 1) => `rgba(36, 158, 142, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const mockCategoryData = [
  { name: 'Utilities', amount: 400, color: '#249e8e', legendFontColor: '#1a1a2e', legendFontSize: 14 },
  { name: 'Groceries', amount: 300, color: '#b2f2e9', legendFontColor: '#1a1a2e', legendFontSize: 14 },
  { name: 'Rent', amount: 800, color: '#e6fbf7', legendFontColor: '#1a1a2e', legendFontSize: 14 },
  { name: 'Transport', amount: 150, color: '#f6c90e', legendFontColor: '#1a1a2e', legendFontSize: 14 },
  { name: 'Other', amount: 100, color: '#f67280', legendFontColor: '#1a1a2e', legendFontSize: 14 },
];

function DashboardScreen() {
  const [monthlyData, setMonthlyData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMonthlyData(mockMonthlyData);
      setCategoryData(mockCategoryData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#249e8e', marginVertical: 20, paddingHorizontal: 16 }}>Dashboard</Text>

      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#249e8e" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>
        ) : (
          <>
            {/* Monthly Totals Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Monthly Totals for Past Year</Text>
              {monthlyData && (
                <LineChart
                  data={monthlyData}
                  width={screenWidth}
                  height={180}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              )}
            </View>
            {/* Category Totals Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Category Totals for Past Year</Text>
              {categoryData && (
                <PieChart
                  data={categoryData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={"amount"}
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  style={styles.chart}
                />
              )}
            </View>
          </>
        )}
      </ScrollView>
     
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#e6fbf7',
  backgroundGradientTo: '#e6fbf7',
  color: (opacity = 1) => `rgba(36, 158, 142, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(26, 26, 46, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, paddingBottom: 32 },

  card: { backgroundColor: '#e6fbf7', borderRadius: 28, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 20, fontWeight: '600', color: '#249e8e', marginBottom: 16 },
  chart: { borderRadius: 16 },
});

export default DashboardScreen;