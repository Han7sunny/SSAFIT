import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import axios from 'axios'

// 받아온 id에 맞는 루틴 상세 보여주기
// axios 요청
export default function RoutineDetail(props) {
  return (
    <View style={styles.container}> 
      <Text>Routine Detail</Text>
      <Text>{props.id}</Text>
      <Text>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2
  }
})