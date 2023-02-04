import axios from 'axios'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { IconButton as Btn, MD3Colors } from 'react-native-paper'
// import { useNavigation  } from '@react-navigation/native'

export default function RoutineListItem(props) {
  // const navigation = useNavigation()
  function addTodayRoutine() {
    axios({
      method: 'post',
      url: 'http://70.12.246.102:8080/routine/add-routine',
      data: {
        "routineId": props.routineId,
        "userId": "asdf1234"
      }
    })
    .then((res) => {
      console.log('response :', res.data)
    })
    .catch((err) => {
      console.log('에러')
    })
  }
  return (
    <View style={styles.container}> 
      <Btn
        // mode="contained"
        icon="add"
        onPress={() => addTodayRoutine}
      >
        오늘의 운동 루틴으로 추가
      </Btn>
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