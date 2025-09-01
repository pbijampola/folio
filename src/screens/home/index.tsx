import { View, Text, TouchableOpacity,FlatList, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { startTransition, useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import ModalComponent from '../../components/bottomSheetModal'
import BalanceCard from '../../components/card/balanceCard'
import { expensesSummary, ExpenseSummary,} from '../../../lib/actions/expense'

const styling = [
  {
    category: "Groceries",
    amount: 31400,
    date: "2023-06-01",
    icon: "shopping-basket",
    iconColor: "yellow-500",
    background: "bg-yellow-200",
  },
  {
    
    category: "Transport",
    icon: "bus",
    iconColor: "blue",
    background: "bg-blue-200",
  },
  {
    
    category: "Support/Gift",
    icon: "diamond",
    iconColor: "purple",
    background: "bg-purple-200",
  },
  {
    
    category: "Food",
    icon: "cutlery",
    iconColor: "green",
    background: "bg-green-200",
  },
  {
    
    category: "Utilities",
    icon: "ticket",
    iconColor: "red",
    background: "bg-red-200",
  },
  {
    
    category: "Personal Care",
    icon: "ticket",
    iconColor: "red",
    background: "bg-red-200",
  }
]

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [expenseSummary, setExpenseSummary] = useState<ExpenseSummary>();
  const [loading, setIsLoading]= useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  useEffect(() => {
    startTransition(async () => {
      setIsLoading(true);
      setRefreshing(true);
    const loadExpense = async () => {
        try {
            setIsLoading(true);
            const summary = await expensesSummary();
            console.log("The summary of expenses is",summary.recentExpenses)
            setExpenseSummary(summary);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };
    loadExpense();
    })
}, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  }
  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const getCategoryStyle = (categoryName: string) => {
    // Find the style object that matches the category name
    const style = styling.find(style => style.category === categoryName);
    
    // Return a default style if none is found, to avoid errors
    return style || {
      category: "Other",
      icon: "question-circle" as const, // Use 'as const' for FontAwesome icon names
      iconColor: "gray",
      background: "bg-gray-200",
    };
  };

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
      {/* Recent Expenses */}
      <BalanceCard totalExpenses={expenseSummary?.totalExpenses || 0}  />
      <View className="flex flex-col mt-4 gap-4">
        <View className="flex flex-row justify-between">
         <Text className="text-[18px] leading-[22px] font-normal text-[#222223]"> Recent Expenses</Text>
         <TouchableOpacity onPress={() => { console.log('view all') }}>
          <Text className="text-[14px] leading-[22px] font-normal text-[rgb(61,61,78)]">View all</Text>
         </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={isModalVisible ? handleCloseModal : handleOpenModal}
          className="absolute bottom-[120px] right-[20px] z-10 items-center justify-center bg-[#E7E6B4] rounded-full w-[60px] h-[60px] shadow-md">
          <FontAwesome name={isModalVisible ? "close" : "plus"} size={16} color="black"/>
        </TouchableOpacity>
        <FlatList
  data={expenseSummary?.recentExpenses || []}
  renderItem={({ item }) => {
    // Get the style for this expense's category
    const categoryStyle = getCategoryStyle(item.categories.name);
    
    return (
      <View className="bg-[#FFFFFF] p-4 mb-2 rounded-[12px]  ">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-2">
            {/* Apply the dynamic styles here */}
            <View className={`p-3 ${categoryStyle.background} rounded-[16px]`}>
              <FontAwesome 
                name={categoryStyle.icon} 
                size={20} 
                color={categoryStyle.iconColor} 
              />
            </View>
            <View className="flex flex-col">
              <Text className="text-[16px] leading-[22px] font-medium text-[rgb(33,33,33)]">
                {item.title || ''}
              </Text>
              <Text className="text-[12px] leading-[22px] font-normal text-[rgb(61,61,78)]">
                {item.date || ''}
              </Text>
            </View>
          </View>
          <Text className="text-[18px] leading-[22px] font-[600px] text-[rgb(61,61,78)]">
            {Intl.NumberFormat().format(item.amount || 0)}
          </Text>
        </View>
      </View>
    );
  }}
  keyExtractor={(item) => item.id}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { console.log('refreshing') }} />}
/>
      </View>
    </View>
    <ModalComponent
    isVisible={isModalVisible}
    onClose={handleCloseModal} 
    />


  </SafeAreaView>
  )
}