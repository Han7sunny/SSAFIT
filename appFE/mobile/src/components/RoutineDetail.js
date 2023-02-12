import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function RoutineDetail(props) {
  console.log(props)
  return (
    <View style={styles.container}>
      {/* <Text>{props.name}</Text> */}
      <Text>부위 : {props.exerciseArea}</Text>
      <Text>운동 종류 : {props.exerciseTypeName}</Text>
      <Text>세트 : {props.exerciseSet} 회</Text>
      <Text>반복 횟수 : {props.reps} 회</Text>
      <Text>휴식 시간 : {props.restTimeMinutes}분 {props.restTimeSeconds}초</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2.5,
    justifyContent: "center"
  }
})