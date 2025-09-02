import React, { useState, useCallback, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalComponent from '../../components/bottomSheetModal';
import { getAllExpense } from '../../../lib/actions/expense'; 
import ExpensesList from '../../components/widgets/expenseList';
import { ExpenseData } from '../../../types/expense/type';

interface ExpensesScreenProps {
  deleteExpense?: (id: string) => void;
  updateExpense?: (expense: ExpenseData) => void;
  navigation: any;
}

const ExpensesScreen: React.FC<ExpensesScreenProps> = ({ 
  deleteExpense, 
  updateExpense, 
  navigation 
}) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const loadExpenses = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
     
      const data = await getAllExpense();
      console.log("The List all of expenses is", data);
      
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      Alert.alert('Error', 'Failed to load expenses. Please try again.');
      setExpenses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const filteredExpenses = useCallback(() => {
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
  }, [expenses, filter]);

  const confirmDelete = (expense: ExpenseData) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            if (deleteExpense) {
              deleteExpense(expense.id);
            }
            // Remove from local state immediately for better UX
            setExpenses(prev => prev.filter(e => e.id !== expense.id));
          }
        }
      ]
    );
  };

  const handleExpensePress = (expense: ExpenseData) => {
    navigation.navigate('Edit', { expense });
  };

  const handleExpenseLongPress = (expense: ExpenseData) => {
    confirmDelete(expense);
  };

  const sortedFilteredExpenses = filteredExpenses().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const FilterButton: React.FC<{
    title: string;
    filterValue: typeof filter;
    isActive: boolean;
    onPress: () => void;
  }> = ({ title, isActive, onPress }) => (
    <TouchableOpacity 
      className={`py-2 px-4 rounded-full mr-2 ${
        isActive ? 'bg-green-500' : 'bg-gray-200'
      }`}
      onPress={onPress}
    >
      <Text className={`text-sm ${
        isActive ? 'text-white font-bold' : 'text-gray-600'
      }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const EmptyExpensesComponent = () => (
    <View className='flex-1 items-center justify-center p-4'>
      <Ionicons name="receipt-outline" size={80} color="#ccc" />
      <Text className='text-[16px] leading-7 font-bold text-secondary mt-4 mb-6'>
        No expenses found
      </Text>
      <TouchableOpacity 
        className='p-4 bg-tertiary items-center rounded-[24px] px-6 py-4'
        onPress={handleOpenModal}
      >
        <Text className='text-[16px] leading-7 font-bold text-primary'>
          Add New Expense
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      {/* Filter Buttons */}
      <View className='flex flex-row justify-between p-3 bg-secondary border-b border-gray-200 items-center rounded-full'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton
            title="All"
            filterValue="all"
            isActive={filter === 'all'}
            onPress={() => setFilter('all')}
          />
          <FilterButton
            title="Today"
            filterValue="today"
            isActive={filter === 'today'}
            onPress={() => setFilter('today')}
          />
          <FilterButton
            title="This Week"
            filterValue="week"
            isActive={filter === 'week'}
            onPress={() => setFilter('week')}
          />
          <FilterButton
            title="This Month"
            filterValue="month"
            isActive={filter === 'month'}
            onPress={() => setFilter('month')}
          />
        </ScrollView>
      </View>

      {/* Expenses List */}
      <View className="flex-1 p-4">
        <ExpensesList
          transactions={sortedFilteredExpenses}
          refreshing={refreshing}
          onRefresh={() => loadExpenses(true)}
          onItemPress={handleExpensePress}
          emptyMessage={`No expenses found for ${filter === 'all' ? 'any period' : filter}`}
          currencySymbol="/= "
          showRefreshControl={true}
        />
      </View>

      <ModalComponent
        isVisible={isModalVisible}
        onClose={handleCloseModal} 
      />
    </SafeAreaView>
  );
};

export default ExpensesScreen;