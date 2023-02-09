import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'
import RoutineListItem from '../../components/RoutineItem'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TodayRoutine(props) {
  // props : today routine []
  const navigation = useNavigation()
 
  return(
    <View 
      style={styles.container}
      // onPress={() => navigation.navigate('RoutineDetailScreen', {})}
    >
      <Text style={styles.exercise}> 오늘의 운동 </Text>

      <Button
        onPress={() => navigation.navigate('MyRoutineListScreen')}
      >나의 루틴 목록 보기</Button>
      <Button
        onPress={() => navigation.navigate('RoutineReservationScreen')}
      >루틴 예약하러 가기</Button>

      {/* <Text style={styles.exercise}> {todayRoutine.routineName} </Text> */}
      <RoutineListItem 
        routineId={props.exerciseId}
        name={props.routineName}
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