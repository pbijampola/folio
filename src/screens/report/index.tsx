import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, startOfMonth, endOfMonth } from 'date-fns';


const ReportScreen = () => {

    const expenses = [
        { id: 1, title: 'Groceries', amount: 31400, date: '2023-06-01', categoryId: 1 },
        { id: 2, title: 'Transport', amount: 29500, date: '2023-06-01', categoryId: 2 },
        { id: 3, title: 'Support/Gift', amount: 62000, date: '2023-06-01', categoryId: 3 },
    ];
    
    const categories = [
        { id: 1, name: 'Groceries', color: '#FFC107', icon: 'cart-outline' },
        { id: 2, name: 'Transport', color: '#3F51B5', icon: 'bus' },
        { id: 3, name: 'Support/Gift', color: '#E91E63', icon: 'gift' },
    ]
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Get current month expenses
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  // Calculate total for current month
  const monthTotal = currentMonthExpenses.reduce((total, expense) => total + expense.amount, 0);

  // Get expenses by category
  const expensesByCategory = categories.map(category => {
    const amount = currentMonthExpenses
      .filter(expense => expense.categoryId === category.id)
      .reduce((total, expense) => total + expense.amount, 0);
    
    return {
      ...category,
      amount,
      percentage: monthTotal > 0 ? (amount / monthTotal) * 100 : 0,
    };
  }).sort((a, b) => b.amount - a.amount);

  return (
    <ScrollView className='flex-1 bg-primary'>
      <View className='p-6' >
        <Text className='mt-6 text-[24px] font-bold'>
          {format(currentDate, 'MMMM yyyy')}
        </Text>
        <Text className='text-[16px] mt-3'>
          Expense Summary
        </Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>/= {monthTotal.toLocaleString()}</Text>
      </View>

      <Text style={styles.sectionTitle}>Expenses by Category</Text>
      
      {expensesByCategory.filter(cat => cat.amount > 0).map(category => (
        <View key={category.id} style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <Ionicons name={category.icon} size={24} color="#fff" />
            </View>
            <View style={styles.categoryDetails}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryAmount}>/= {category.amount.toLocaleString()}</Text>
            </View>
            <Text style={styles.categoryPercentage}>
              {category.percentage.toFixed(1)}%
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  width: `${category.percentage}%`,
                  backgroundColor: category.color
                }
              ]} 
            />
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      
      {expenses
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(expense => {
          const category = categories.find(cat => cat.id === expense.categoryId) || 
            { name: 'Uncategorized', color: '#999', icon: 'help-circle-outline' };
          
          return (
            <View key={expense.id} style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon} size={20} color="#fff" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{expense.title}</Text>
                <Text style={styles.transactionDate}>
                  {format(new Date(expense.date), 'dd MMM yyyy')}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>/= {expense.amount.toLocaleString()}</Text>
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
    marginBottom: 8,
    color: '#333',
  },
  categoryCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryDetails: {
    flex: 1,
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#666',
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ReportScreen;