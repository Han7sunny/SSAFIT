import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function MyRecordScreen({ navigation }){
  return (
    <View>
      <Text style={styles.title}> 나의 운동 기록 </Text>
      {/* 누적 운동 날짜 */}
      {/* 오늘 운동한 시간 */}
      
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30
  }
})