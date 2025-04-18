import { View, Text, TouchableOpacity,FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import ModalComponent from '../../components/bottomSheetModal'
import BalanceCard from '../../components/card/balanceCard'

const transactions = [
  {
    id: 1,
    title: "Groceries",
    amount: 31400,
    date: "2023-06-01",
    icon: "shopping-basket",
    iconColor: "yellow-500",
    background: "bg-yellow-200",
  },
  {
    id: 2,
    title: "Transport",
    amount: 29500,
    date: "2023-06-01",
    icon: "bus",
    iconColor: "blue",
    background: "bg-blue-200",
  },
  {
    id: 3,
    title: "Support/Gift",
    amount: 62000,
    date: "2023-06-01",
    icon: "diamond",
    iconColor: "purple",
    background: "bg-purple-200",
  },
  {
    id: 4,
    title: "Food",
    amount: 82550,
    date: "2023-06-01",
    icon: "cutlery",
    iconColor: "green",
    background: "bg-green-200",
  },
  {
    id: 5,
    title: "Utilities",
    amount: 18000,
    date: "2023-06-01",
    icon: "ticket",
    iconColor: "red",
    background: "bg-red-200",
  },
  {
    id: 6,
    title: "Personal Care",
    amount: 5000,
    date: "2023-06-01",
    icon: "ticket",
    iconColor: "red",
    background: "bg-red-200",
  }
]

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalVisible(true);
  }
  const handleCloseModal = () => {
    setIsModalVisible(false);
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
      <BalanceCard />
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
          data={transactions}
          renderItem={({ item }) => (
            <View className="bg-[#FFFFFF] p-4 mb-2 rounded-[12px]  ">
              <View className="flex flex-row justify-between items-center">
               <View className="flex flex-row items-center gap-2">
                <FontAwesome name={item.icon} size={20} color={item.iconColor} className={`p-4 ${item.background} rounded-[16px]`} />
               <View className="flex flex-col">
                  <Text className="text-[16px] leading-[22px] font-medium text-[rgb(33,33,33)]">{item.title}</Text>
                  <Text className="text-[12px] leading-[22px] font-normal text-[rgb(61,61,78)]">{item.date}</Text>
                </View>
               </View>
                <Text className="text-[18px] leading-[22px] font-[600px] text-[rgb(61,61,78)]">{item.amount}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          // className="flex-1"
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