import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

const DashboardScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const screenWidth = Dimensions.get('window').width - 32; // Full width minus padding
  
  // Sample data - in a real app, this would come from your API or state management
  const [activeTab, setActiveTab] = useState('monthly');
  
  // Monthly expense data
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [450, 380, 520, 390, 600, 450],
        color: () => '#0a7ea4', // line color
        strokeWidth: 2
      }
    ],
    legend: ["Expenses"]
  };
  
  // Category data for pie chart
  const categoryData = [
    {
      name: "Housing",
      amount: 1200,
      color: "#FF6384",
      legendFontColor: colors.text,
      legendFontSize: 12
    },
    {
      name: "Food",
      amount: 450,
      color: "#36A2EB",
      legendFontColor: colors.text,
      legendFontSize: 12
    },
    {
      name: "Transport",
      amount: 300,
      color: "#FFCE56",
      legendFontColor: colors.text,
      legendFontSize: 12
    },
    {
      name: "Utilities",
      amount: 280,
      color: "#4BC0C0",
      legendFontColor: colors.text,
      legendFontSize: 12
    },
    {
      name: "Other",
      amount: 190,
      color: "#9966FF",
      legendFontColor: colors.text,
      legendFontSize: 12
    }
  ];
  
  // Weekly expense data
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [65, 40, 80, 35, 90, 120, 70],
        color: () => '#0a7ea4',
        strokeWidth: 2
      }
    ],
    legend: ["Daily Expenses"]
  };
  
  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(10, 126, 164, ${opacity})`,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#0a7ea4"
    }
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={[styles.header, { color: colors.text }]}>Financial Dashboard</Text>
        </View>
        
        {/* Summary Card */}
        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1E2A38' : '#e6fbf7' }]}>
          <Text style={[styles.cardTitle, { color: colorScheme === 'dark' ? '#ECEDEE' : '#249e8e' }]}>Monthly Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>$2,420</Text>
              <Text style={[styles.summaryLabel, { color: colors.icon }]}>Spent</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>$3,500</Text>
              <Text style={[styles.summaryLabel, { color: colors.icon }]}>Budget</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#4BC0C0' }]}>$1,080</Text>
              <Text style={[styles.summaryLabel, { color: colors.icon }]}>Remaining</Text>
            </View>
          </View>
        </View>

        {/* Expense Trend Card */}
        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1E2A38' : '#e6fbf7' }]}>
          <Text style={[styles.cardTitle, { color: colorScheme === 'dark' ? '#ECEDEE' : '#249e8e' }]}>Expense Trends</Text>
          
          {/* Tab selector */}
          <View style={styles.tabSelector}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
              onPress={() => setActiveTab('weekly')}
            >
              <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
              onPress={() => setActiveTab('monthly')}
            >
              <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>Monthly</Text>
            </TouchableOpacity>
          </View>
          
          {/* Line Chart */}
          <LineChart
            data={activeTab === 'monthly' ? monthlyData : weeklyData}
            width={screenWidth - 40} // Account for card padding
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Category Breakdown Card */}
        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1E2A38' : '#e6fbf7' }]}>
          <Text style={[styles.cardTitle, { color: colorScheme === 'dark' ? '#ECEDEE' : '#249e8e' }]}>Category Breakdown</Text>
          <PieChart
            data={categoryData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
        
        {/* Recent Transactions Preview */}
        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1E2A38' : '#e6fbf7' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colorScheme === 'dark' ? '#ECEDEE' : '#249e8e' }]}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Transaction items would go here */}
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.transactionItem}>
              <View style={styles.transactionIcon}></View>
              <View style={styles.transactionDetails}>
                <Text style={[styles.transactionTitle, { color: colors.text }]}>Grocery Shopping</Text>
                <Text style={[styles.transactionDate, { color: colors.icon }]}>Oct 15, 2023</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: colors.text }]}>-$85.40</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tabSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  activeTab: {
    backgroundColor: '#0a7ea4',
  },
  tabText: {
    fontSize: 14,
    color: '#687076',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '500',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#0a7ea4',
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 126, 164, 0.2)',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;