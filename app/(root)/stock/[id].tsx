import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const StockItems = () => {

    const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>StockItems {id}</Text>
    </View>
  )
}

export default StockItems