import React from 'react'
import { Text } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import Button from '../../components/Button'

const basicURL = '8081'
const accessToken = ''
let routineInfo = []
// 받아온 id에 맞는 루틴 상세 보여주기
// axios 요청

export default function RoutineDetailScreen({ route, navigation }) {
  let { routineId, routineTitle } = route.params
  // axios({
  //   method: 'get',
  //   url: `${basicURL}`+ '/routine/get-exercise-info' + `${routineId}`,
  //   headers: {
  //     authorization: `Bearer ${accessToken}`
  //   }
  // }) 
  // .then(function (response) {
  //   routineInfo = response.data
  // }) 
  // .catch(function (error) {
  //   console.log(error)
  // })
  return (
    <View>
      <Text> Routine Detail Screen! </Text>
      <View style={styles.container}> 
        <Text>{routineId}</Text>
        <Text>{routineTitle}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2
  }
})