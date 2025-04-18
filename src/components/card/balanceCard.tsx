import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const BalanceCard = () => {
  return (
    <View className="bg-[#50A65C] flex flex-col  width-[374px] h-[201px] rounded-[20px] mt-4 shadow-lg">
        <View className="flex flex-col justify-center items-center mt-10">
          <Text className="text-lg text-primary font-normal">Total Balance</Text>
          <Text className="text-[48px] text-primary font-normal ml-2">
            {/* <FontAwesome name="dollar" size={36} color="black" className='mr-2 text-primary' /> */}
            192,000</Text>
        </View>
        <View className="flex flex-row justify-between mx-16 my-4">
          <View className="flex flex-col items-center gap-1">
            <Text className="text-sm text-primary font-normal">Income</Text>
            <Text className="text-[13px] text-primary font-semibold ml-3">300,000</Text>
          </View>
          <View className="flex flex-col items-center gap-1">
            <Text className="text-sm text-primary font-normal">Expenses</Text>
            <Text className="text-[13px] text-primary font-semibold ">192,000</Text>
          </View>
        </View>
      </View>
  )
}

export default BalanceCard