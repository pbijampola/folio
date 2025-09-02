import { ListRenderItem } from 'react-native'
import React from 'react'
import ExpenseItem from './expenseItem'
import ReusableFlatList from '../ReusableFlatList'
import { ExpenseData } from '../../../types/expense/type' // Changed from Expenses to ExpenseData

interface ExpensesListProps {
  transactions: ExpenseData[] // Changed from Expenses[] to ExpenseData[]
  refreshing?: boolean
  onRefresh?: () => void
  showRefreshControl?: boolean
  onItemPress?: (transaction: ExpenseData) => void 
  onItemLongPress?: (transaction: ExpenseData) => void
  emptyMessage?: string
  showAmount?: boolean
  currencySymbol?: string
}

const ExpensesList: React.FC<ExpensesListProps> = ({ 
  transactions, 
  refreshing = false, 
  onRefresh,
  showRefreshControl = true,
  onItemPress,
  onItemLongPress,
  emptyMessage = "No expenses found",
  showAmount = true,
  currencySymbol = '$'
}) => {

  const renderExpenseItem: ListRenderItem<ExpenseData> = ({ item }) => (
    <ExpenseItem 
      transaction={item}
      onPress={onItemPress}
      onLongPress={onItemLongPress}
      showAmount={showAmount}
      currencySymbol={currencySymbol}
    />
  )

  return (
    <ReusableFlatList
      data={transactions}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      showRefreshControl={showRefreshControl}
      emptyMessage={emptyMessage}
    />
  )
}

export default ExpensesList