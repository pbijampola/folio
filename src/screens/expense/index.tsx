
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import ModalComponent from '../../components/bottomSheetModal';

const ExpensesScreen = ({ expenses, categories, deleteExpense, updateExpense, navigation }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalVisible(true);
  }
  const handleCloseModal = () => {
    setIsModalVisible(false);
  }
  
  const getCategoryById = (id) => {
    return categories.find(category => category.id === id) || { name: 'Uncategorized', color: '#999', icon: 'help-circle-outline' };
  };

  const filteredExpenses = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    switch (filter) {
      case 'today':
        return expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= today;
        });
      case 'week':
        return expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= oneWeekAgo;
        });
      case 'month':
        return expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= oneMonthAgo;
        });
      default:
        return expenses;
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteExpense(id) }
      ]
    );
  };

  const renderExpenseItem = ({ item }) => {
    const category = getCategoryById(item.categoryId);
    return (
      <TouchableOpacity 
        style={styles.expenseItem}
        onPress={() => navigation.navigate('Edit', { expense: item })}
        onLongPress={() => confirmDelete(item.id)}
      >
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={24} color="#fff" />
        </View>
        <View style={styles.expenseDetails}>
          <Text style={styles.expenseTitle}>{item.title}</Text>
          <Text style={styles.expenseDate}>
            {format(new Date(item.date), 'dd/MM/yyyy')}
          </Text>
          {item.notes ? (
            <Text style={styles.expenseNotes} numberOfLines={1}>
              {item.notes}
            </Text>
          ) : null}
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.expenseAmount}>/= {item.amount.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <View className='flex flex-row justify-between p-3 bg-secondary border-b border-gray-200 items-center rounded-full'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'today' && styles.activeFilterButton]}
            onPress={() => setFilter('today')}
          >
            <Text style={[styles.filterText, filter === 'today' && styles.activeFilterText]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'week' && styles.activeFilterButton]}
            onPress={() => setFilter('week')}
          >
            <Text style={[styles.filterText, filter === 'week' && styles.activeFilterText]}>
              This Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'month' && styles.activeFilterButton]}
            onPress={() => setFilter('month')}
          >
            <Text style={[styles.filterText, filter === 'month' && styles.activeFilterText]}>
              This Month
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {filteredExpenses()?.length > 0 ? (
        <FlatList
          data={filteredExpenses().sort((a, b) => new Date(b.date) - new Date(a.date))}
          renderItem={renderExpenseItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View className='flex-1 items-center justify-center p-4'>
          <Ionicons name="receipt-outline" size={80} color="#ccc" />
          <Text className='text-[16px] leading-7 font-bold text-secondary mt-4 mb-6'>No expenses found</Text>
          <TouchableOpacity 
            className='p-4 bg-tertiary items-center rounded-[24px] px-6 py-4'
            onPress={handleOpenModal}
          >
            <Text className='text-[16px] leading-7 font-bold text-primary'>Add New Expense</Text>
          </TouchableOpacity>
        </View>
      )}

<ModalComponent
    isVisible={isModalVisible}
    onClose={handleCloseModal} 
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: '#4EA65A',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  expenseNotes: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  amountContainer: {
    justifyContent: 'center',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
 

  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpensesScreen;