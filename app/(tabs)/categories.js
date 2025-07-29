import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';

// Get today's date in YYYY-MM-DD format
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayString = `${yyyy}-${mm}-${dd}`;

// Generate dates for the current year
const generateDateForMonth = (month, day) => {
  const date = new Date(yyyy, month - 1, day);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Mock bills data - same as in calendar.js for consistency
const mockBills = [
  // Current month bills
  { id: '1', name: 'Electricity', dueDate: todayString, amount: 120.5, category: 'Utilities' },
  
  // Past months bills (using months before current month)
  { id: '2', name: 'Internet', dueDate: generateDateForMonth(1, 15), amount: 60.0, category: 'Utilities' },
  { id: '3', name: 'Groceries', dueDate: generateDateForMonth(2, 20), amount: 200.0, category: 'Groceries' },
  { id: '4', name: 'Rent', dueDate: generateDateForMonth(3, 1), amount: 950.0, category: 'Rent' },
  { id: '5', name: 'Phone', dueDate: generateDateForMonth(4, 18), amount: 45.0, category: 'Utilities' },
  { id: '6', name: 'Water', dueDate: generateDateForMonth(5, 15), amount: 80.0, category: 'Utilities' },
  { id: '7', name: 'Insurance', dueDate: generateDateForMonth(6, 25), amount: 150.0, category: 'Insurance' },
  
  // Future months bills (using months after current month)
  { id: '8', name: 'Streaming', dueDate: generateDateForMonth(8, 5), amount: 20.0, category: 'Entertainment' },
  { id: '9', name: 'Gym', dueDate: generateDateForMonth(9, 10), amount: 55.0, category: 'Health' },
  { id: '10', name: 'Credit Card', dueDate: generateDateForMonth(10, 20), amount: 300.0, category: 'Finance' },
  { id: '11', name: 'Car Insurance', dueDate: generateDateForMonth(11, 15), amount: 175.0, category: 'Insurance' },
  { id: '12', name: 'Property Tax', dueDate: generateDateForMonth(12, 1), amount: 450.0, category: 'Taxes' },
];

// Category colors - matching dashboard.js
const categoryColors = {
  'Utilities': '#249e8e',
  'Groceries': '#b2f2e9',
  'Rent': '#e6fbf7',
  'Transport': '#f6c90e',
  'Insurance': '#3498db',
  'Entertainment': '#9b59b6',
  'Health': '#2ecc71',
  'Finance': '#e74c3c',
  'Taxes': '#f39c12',
  'Other': '#f67280'
};

function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryBills, setCategoryBills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  // Calculate categories and their totals
  useEffect(() => {
    const categoryMap = {};
    
    mockBills.forEach(bill => {
      if (!categoryMap[bill.category]) {
        categoryMap[bill.category] = {
          name: bill.category,
          total: 0,
          count: 0,
          color: categoryColors[bill.category] || '#f67280' // Default to 'Other' color if not found
        };
      }
      categoryMap[bill.category].total += bill.amount;
      categoryMap[bill.category].count += 1;
    });
    
    const categoriesArray = Object.values(categoryMap).sort((a, b) => b.total - a.total);
    setCategories(categoriesArray);
  }, []);

  // Handle category selection
  const handleCategoryPress = (category) => {
    const filteredBills = mockBills.filter(bill => bill.category === category.name);
    setCategoryBills(filteredBills);
    setSelectedCategory(category);
  };

  // Handle bill selection
  const handleBillPress = (bill) => {
    setSelectedBill(bill);
    setModalVisible(true);
  };

  // Render a category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { borderLeftColor: item.color }]} 
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.categoryContent}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.count} {item.count === 1 ? 'bill' : 'bills'}</Text>
      </View>
      <View style={styles.categoryAmount}>
        <Text style={styles.amountText}>${item.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render a bill item
  const renderBillItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.billCard} 
      onPress={() => handleBillPress(item)}
    >
      <View style={styles.billContent}>
        <Text style={styles.billName}>{item.name}</Text>
        <Text style={styles.billDate}>Due: {item.dueDate}</Text>
      </View>
      <View style={styles.billAmount}>
        <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#249e8e', marginVertical: 10, paddingHorizontal: 16 }}>Categories</Text>
      <View style={styles.container}>

      {selectedCategory ? (
        <View style={styles.container}>
          <View style={styles.categoryHeader}>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={[styles.categoryTitle, { color: selectedCategory.color }]}>
              {selectedCategory.name}
            </Text>
            <Text style={styles.categoryTotal}>
              Total: ${selectedCategory.total.toFixed(2)}
            </Text>
          </View>
          
          <FlatList
            data={categoryBills}
            keyExtractor={item => item.id}
            renderItem={renderBillItem}
            contentContainerStyle={styles.billsList}
          />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={item => item.name}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.categoriesList}
        />
      )}

      {/* Bill Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBill && (
              <>
                <Text style={styles.modalTitle}>{selectedBill.name}</Text>
                <View style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Category:</Text>
                  <Text style={styles.modalValue}>{selectedBill.category}</Text>
                </View>
                <View style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Amount:</Text>
                  <Text style={styles.modalValue}>${selectedBill.amount.toFixed(2)}</Text>
                </View>
                <View style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Due Date:</Text>
                  <Text style={styles.modalValue}>{selectedBill.dueDate}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    flex: 1, 
    padding: 16 
  },

  categoriesList: { 
    padding: 16 
  },
  categoryCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#f8f8f8', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    borderLeftWidth: 6, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    shadowOffset: { width: 0, height: 2 } 
  },
  categoryContent: { 
    flex: 1 
  },
  categoryName: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#1a1a2e', 
    marginBottom: 4 
  },
  categoryCount: { 
    fontSize: 14, 
    color: '#666' 
  },
  categoryAmount: { 
    backgroundColor: '#e6fbf7', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 8 
  },
  amountText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#249e8e' 
  },
  categoryHeader: { 
    marginBottom: 20 
  },
  backButton: { 
    fontSize: 16, 
    color: '#249e8e', 
    marginBottom: 8 
  },
  categoryTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  categoryTotal: { 
    fontSize: 18, 
    color: '#666' 
  },
  billsList: { 
    paddingBottom: 24 
  },
  billCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#f0f0f0', 
    elevation: 1, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 2, 
    shadowOffset: { width: 0, height: 1 } 
  },
  billContent: { 
    flex: 1 
  },
  billName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1a1a2e', 
    marginBottom: 4 
  },
  billDate: { 
    fontSize: 14, 
    color: '#666' 
  },
  billAmount: { 
    backgroundColor: '#f8f8f8', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 8 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 24, 
    width: '80%', 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 } 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1a1a2e', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  modalDetail: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12, 
    paddingBottom: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  modalLabel: { 
    fontSize: 16, 
    color: '#666' 
  },
  modalValue: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1a1a2e' 
  },
  closeButton: { 
    backgroundColor: '#249e8e', 
    borderRadius: 8, 
    padding: 12, 
    alignItems: 'center', 
    marginTop: 16 
  },
  closeButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  }
});

export default CategoriesScreen;