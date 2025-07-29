import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_Height = Dimensions.get('window').height;

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

function getMarkedDates(bills, selectedDate) {
  const marked = {};
  const billsByDate = {};
  bills.forEach(bill => {
    if (!billsByDate[bill.dueDate]) billsByDate[bill.dueDate] = [];
    billsByDate[bill.dueDate].push(bill);
  });
  Object.keys(billsByDate).forEach(date => {
    marked[date] = {
      marked: true,
      dotColor: '#249e8e',
      // customText property removed to hide bill count
    };
  });
  if (selectedDate) {
    marked[selectedDate] = {
      ...(marked[selectedDate] || {}),
      selected: true,
      selectedColor: '#249e8e',
    };
  }
  return marked;
}

function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [billsForDate, setBillsForDate] = useState([]);

  useEffect(() => {
    setMarkedDates(getMarkedDates(mockBills, selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      setBillsForDate(mockBills.filter(bill => bill.dueDate === selectedDate));
    } else {
      setBillsForDate([]);
    }
  }, [selectedDate]);

  const [selectedBill, setSelectedBill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openBillDetails = (bill) => {
    setSelectedBill(bill);
    setModalVisible(true);
  };

  const renderBill = ({ item }) => (
    <TouchableOpacity 
      style={styles.billCard}
      onPress={() => openBillDetails(item)}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.billName}>{item.name}</Text>
        <Text style={styles.billCategory}>{item.category}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.billAmount}>${item.amount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  // Custom day component (keep size 32x32)
  const renderDay = ({ date, state }) => {
    const dateString = date.dateString;
    const mark = markedDates[dateString];
    const isBillDay = mark && mark.marked;
    const isSelected = mark && mark.selected;
    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(dateString)}
        activeOpacity={0.7}
        style={{ alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}
      >
        <View
          style={{
            backgroundColor: isBillDay ? '#249e8e' : 'transparent',
            borderRadius: 16,
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? '#1a1a2e' : 'transparent',
          }}
        >
          <Text
            style={{
              color: isBillDay ? '#fff' : state === 'disabled' ? '#ccc' : '#1a1a2e',
              fontWeight: isSelected ? 'bold' : 'normal',
              fontSize: 16,
            }}
          >
            {date.day}
          </Text>
        </View>
        {/* Bill count text hidden as requested */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#249e8e', marginVertical: 10, paddingHorizontal: 16 }}>Bills Calendar</Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={day => setSelectedDate(day.dateString)}
        theme={{
          todayTextColor: '#249e8e',
          selectedDayBackgroundColor: '#249e8e',
          arrowColor: '#249e8e',
          calendarWidth: SCREEN_WIDTH - 16,
          'stylesheet.calendar.main': {
            container: {
              paddingLeft: 0,
              paddingRight: 0,
            },
            week: {
              marginTop: 2,
              marginBottom: 2,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
        }}
        dayComponent={renderDay}
        current={todayString}
        style={styles.calendar}
        hideExtraDays={false}
        enableSwipeMonths={true}
      />
      {selectedDate && billsForDate.length > 0 && (
        <>
          <Text style={styles.subHeader}>Bills due on {selectedDate}:</Text>
          <FlatList
            data={billsForDate}
            keyExtractor={item => item.id}
            renderItem={renderBill}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </>
      )}
      {selectedDate && billsForDate.length === 0 && (
        <Text style={styles.noBills}>No bills due on this date.</Text>
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
              <ScrollView contentContainerStyle={styles.modalScrollContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedBill.name}</Text>
                  <TouchableOpacity 
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.billDetailRow}>
                  <Text style={styles.billDetailLabel}>Category:</Text>
                  <Text style={styles.billDetailValue}>{selectedBill.category}</Text>
                </View>
                
                <View style={styles.billDetailRow}>
                  <Text style={styles.billDetailLabel}>Amount:</Text>
                  <Text style={styles.billDetailValue}>${selectedBill.amount.toFixed(2)}</Text>
                </View>
                
                <View style={styles.billDetailRow}>
                  <Text style={styles.billDetailLabel}>Due Date:</Text>
                  <Text style={styles.billDetailValue}>{selectedBill.dueDate}</Text>
                </View>
                
                <View style={styles.billDetailRow}>
                  <Text style={styles.billDetailLabel}>Status:</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Upcoming</Text>
                  </View>
                </View>
                
                <View style={styles.billDetailSection}>
                  <Text style={styles.billDetailSectionTitle}>Payment Options</Text>
                  <TouchableOpacity style={styles.paymentButton}>
                    <Text style={styles.paymentButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.paymentButton, styles.scheduleButton]}>
                    <Text style={styles.scheduleButtonText}>Schedule Payment</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.billDetailSection}>
                  <Text style={styles.billDetailSectionTitle}>Payment History</Text>
                  <View style={styles.historyItem}>
                    <Text style={styles.historyDate}>June 10, 2025</Text>
                    <Text style={styles.historyAmount}>$120.50</Text>
                  </View>
                  <View style={styles.historyItem}>
                    <Text style={styles.historyDate}>May 10, 2025</Text>
                    <Text style={styles.historyAmount}>$118.75</Text>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 8 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#249e8e', marginBottom: 16 },
  calendar: { marginBottom: 16, borderRadius: 12, overflow: 'hidden', alignSelf: 'center', height: SCREEN_Height / 2, width: SCREEN_WIDTH - 16, paddingHorizontal: 0 },
  subHeader: { fontSize: 18, fontWeight: 'bold', color: '#1a1a2e', marginTop: 18, marginBottom: 6 },
  noBills: { color: '#888', fontSize: 16, marginTop: 16, textAlign: 'center' },
  billCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e6fbf7',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  billName: { fontSize: 18, fontWeight: '600', color: '#1a1a2e' },
  billCategory: { fontSize: 14, color: '#249e8e', marginTop: 2 },
  billAmount: { fontSize: 18, fontWeight: 'bold', color: '#249e8e' },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: SCREEN_Height * 0.8,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#555',
    fontWeight: 'bold',
  },
  billDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  billDetailLabel: {
    fontSize: 16,
    color: '#687076',
  },
  billDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  statusBadge: {
    backgroundColor: '#249e8e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  billDetailSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  billDetailSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  paymentButton: {
    backgroundColor: '#249e8e',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  scheduleButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#249e8e',
  },
  scheduleButtonText: {
    color: '#249e8e',
    fontWeight: '600',
    fontSize: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  historyDate: {
    fontSize: 15,
    color: '#687076',
  },
  historyAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});

export default CalendarScreen;