import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'
import RoutineListItem from '../../components/RoutineListItem'

let todayRoutine = {
    exerciseId: 1,
    routineName: '칼로리를 불태우는 궁극의 전신 운동',
    exerciseTypeName: '전신',
    exerciseSet: '3',
  }

// 오늘의 운동 루틴 가져올 함수 -> component Mount 되자마자 바로 불러오기
// function getTodayRoutine() {
//   return (
//     axios({
//       method: 'get',
//       url: '',
//       headers: ``
//     })
//     .then(function (response) {
//       const todayRoutine = response.data
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
//   )
// }

export default function TodayRoutine() {
  return(
    <View 
      style={styles.container}
      // onPress={() => navigation.navigate('RoutineDetailScreen', {})}
    >
      <Text style={styles.exercise}> 오늘의 운동 </Text>
      {/* <Text style={styles.exercise}> {todayRoutine.routineName} </Text> */}
      <RoutineListItem 
        routineId={todayRoutine.exerciseId}
        name={todayRoutine.routineName}
      />
      {/* <View>
        <View>
          <Text style={styles.set}> 운동 부위 : {todayRoutine.exerciseTypeName} </Text>
          <Text style={styles.set}> {todayRoutine.exerciseSet} SET </Text>
        </View>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 2
  },
  exercise: {
    margin: 3,
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center"
  },
  set: {
    fontSize: 20
  }
})