import { FlatList, FlatListProps, RefreshControl, View, Text } from 'react-native'
import React from 'react'

interface ReusableFlatListProps<T> extends Omit<FlatListProps<T>, 'refreshControl'> {
  refreshing?: boolean
  onRefresh?: () => void
  showRefreshControl?: boolean
  emptyMessage?: string
  emptyComponent?: React.ComponentType
}

function ReusableFlatList<T>({
  refreshing = false,
  onRefresh,
  showRefreshControl = true,
  emptyMessage = "No items found",
  emptyComponent: EmptyComponent,
  ...flatListProps
}: ReusableFlatListProps<T>) {
  
  const refreshControl = showRefreshControl && onRefresh ? (
    <RefreshControl 
      refreshing={refreshing} 
      onRefresh={onRefresh}
      colors={['#0000ff']} // Android
      tintColor="#0000ff" // iOS
    />
  ) : undefined

  const defaultEmptyComponent = () => (
    <View className="flex-1 justify-center items-center py-8">
      <Text className="text-gray-500 text-center">{emptyMessage}</Text>
    </View>
  )

  return (
    <FlatList
      {...flatListProps}
      refreshControl={refreshControl}
      ListEmptyComponent={EmptyComponent || defaultEmptyComponent}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default ReusableFlatList