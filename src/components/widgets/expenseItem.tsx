import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { styling } from '../../../constants/categoryIcons'
import { ExpenseData } from '../../../types/expense/type' // Import ExpenseData type

interface ExpenseItemProps {
  transaction: ExpenseData 
  onPress?: (transaction: ExpenseData) => void 
  onLongPress?: (transaction: ExpenseData) => void
  showAmount?: boolean
  currencySymbol?: string
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ 
  transaction, 
  onPress,
  showAmount = true,
  onLongPress,
  currencySymbol = '$'
}) => {
  const getCategoryStyle = (categoryName: string) => {
    const style = styling.find(style => style.category === categoryName)
    
    return style || {
      category: "Other",
      icon: "question-circle" as const, 
      iconColor: "gray",
      background: "bg-gray-200",
    }
  }

  const categoryStyle = getCategoryStyle(transaction.categories.name)

  const handlePress = () => {
    if (onPress) {
      onPress(transaction)
    }
  }

  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(transaction)
    }
  }

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const ItemContent = (
    <View className="bg-[#FFFFFF] p-4 mb-2 rounded-[12px]">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-2">
          <View className={`p-3 ${categoryStyle.background} rounded-[16px]`}>
            <FontAwesome 
              name={categoryStyle.icon} 
              size={20} 
              color={categoryStyle.iconColor} 
            />
          </View>
          <View className="flex flex-col">
            <Text className="text-[16px] leading-[22px] font-medium text-[rgb(33,33,33)]">
              {transaction.title}
            </Text>
            <Text className="text-[12px] leading-[22px] font-normal text-[rgb(61,61,78)]">
              {formatDate(transaction.date)}
            </Text>
          </View>
        </View>
        {showAmount && (
          <Text className="text-[18px] leading-[22px] font-semibold text-[rgb(61,61,78)]">
           {Intl.NumberFormat().format(transaction.amount)}{currencySymbol}
          </Text>
        )}
      </View>
    </View>
  )

  if (onPress || onLongPress) {
    return (
      <TouchableOpacity 
        onPress={handlePress} 
        onLongPress={handleLongPress}
        activeOpacity={0.7}
      >
        {ItemContent}
      </TouchableOpacity>
    )
  }

  return ItemContent
}

export default ExpenseItem