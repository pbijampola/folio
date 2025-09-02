import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import ModalComponent from '../../components/bottomSheetModal'
import BalanceCard from '../../components/card/balanceCard'
import { expensesSummary,} from '../../../lib/actions/expense'
import ExpensesList from '../../components/widgets/expenseList'
import { useNavigation } from '@react-navigation/native'
import { ExpenseSummary } from '../../../types/expense/type'

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [expenseSummary, setExpenseSummary] = useState<ExpenseSummary>()
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)

const navigate = useNavigation()
  
  const loadExpenses = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      const summary = await expensesSummary();
      console.log("The summary of expenses is",summary)
      setExpenseSummary(summary)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }
  
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  const handleRefresh = () => {
    loadExpenses(true)
  }

  const handleViewAll = () => {
    navigate.navigate('Expense')
  }

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <View className="flex flex-col px-4 gap-4">
        {/* Header Section */}
        <View className='flex flex-row gap-3 justify-between'>
          <TouchableOpacity className='items-center' onPress={() => { console.log('profile') }}>
            <View className="flex flex-col items-start">
              <Text className="text-[16px] leading-7 font-normal text-[rgb(61,61,78)]">Hello!</Text>
              <Text className="text-[16px] leading-7 font-bold text-[rgb(61,61,78)]">Patrick Bijampola</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='p-4 bg-gray-200 items-center rounded-full' onPress={() => { console.log('search') }}>
            <FontAwesome name="search" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard totalExpenses={expenseSummary?.totalExpenses || 0} />

        {/* Recent Expenses Section */}
        <View className="flex flex-col mt-4 gap-4">
          <View className="flex flex-row justify-between">
            <Text className="text-[18px] leading-[22px] font-normal text-[#222223]">Recent Expenses</Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text className="text-[14px] leading-[22px] font-normal text-[rgb(61,61,78)]">View all</Text>
            </TouchableOpacity>
          </View>
          
          <ExpensesList 
            transactions={expenseSummary?.recentExpenses || []}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity 
        onPress={isModalVisible ? handleCloseModal : handleOpenModal}
        className="absolute bottom-[120px] right-[20px] z-10 items-center justify-center bg-[#E7E6B4] rounded-full w-[60px] h-[60px] shadow-md">
        <FontAwesome name={isModalVisible ? "close" : "plus"} size={16} color="black"/>
      </TouchableOpacity>

      <ModalComponent
        isVisible={isModalVisible}
        onClose={handleCloseModal} 
      />
    </SafeAreaView>
  )
}