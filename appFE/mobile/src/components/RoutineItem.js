import axios from 'axios'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { IconButton, MD3Colors } from 'react-native-paper'
// import { useNavigation  } from '@react-navigation/native'

export default function RoutineListItem(props) {
  // const navigation = useNavigation()
  console.log(props.routineId)
  console.log(props.userId)
  function addTodayRoutine() {
    axios({
      method: 'post',
      url: 'http://70.12.246.102:8080/routine/add-routine',
      data: {
        "routineId": props.routineId,
        "userId": props.userId
      }
    })
    .then((res) => {
      console.log('오늘의 루틴으로 추가 성공 :', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <View style={styles.container}> 
      {/* <IconButton
        // mode="contained"
        icon="plus-circle-outline"
        onPress={addTodayRoutine}
      /> */}
        <Text>{props.routineId}</Text>
        <Text style={styles.routineName}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 0.5
  },
  routineName: {
    fontSize: 20
  }
})