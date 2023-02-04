import React from 'react'
import { Text } from 'react-native-paper'
import { View, StyleSheet, FlatList } from 'react-native'
import Button from '../../components/Button'
import RoutineDetail from '../../components/RoutineDetail'
import axios from 'axios'


// 받아온 id에 맞는 루틴 상세 보여주기
// axios 요청
// routineName도 보내달라고 해야됨
let routineInfo = []

export default function RoutineDetailScreen({ route ,navigation }) {
  let { routineId } = route.params
  axios({
    method: 'get',
    url: 'http://70.12.246.102:8080/routine/get-exercise-info/' + `${routineId}`,
    headers: {
      authorization: `${23546576}`
    }
  }) 
  .then(function (response) {
    routineInfo = response.data
  }) 
  .catch(function (error) {
    console.log(error)
  })
  return (
    <View style={styles.container}> 
      <Text> Routine Detail Screen! </Text>
      <FlatList
        data={routineInfo}
        renderItem={({item}) => (
          <RoutineDetail 
            exerciseTypeName={item.exerciseTypeName}
            exerciseArea={item.exerciseArea}
            exerciseSet={item.exerciseSet}
            reps={item.reps}
            restTimeMinutes={item.restTimeMinutes}
            restTimeSeconds={item.restTimeSeconds}
            name={item.name}
          />
        )}
      />
        {/* <Text>{routineId}</Text> */}
        {/* <Text>{routineTitle}</Text> */}
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2
  }
})