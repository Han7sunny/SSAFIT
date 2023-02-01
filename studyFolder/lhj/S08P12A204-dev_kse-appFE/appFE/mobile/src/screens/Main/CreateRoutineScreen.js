import React, { useState } from 'react'
import { View, Button as Btn, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import RoutineInput from '../../components/RoutineInput'
// import axios from 'axios'

export default function CreateRoutineScreen({ navigation }) {
  const [countNum, setCountNum] = useState([0])

  const onAddRoutine = () => {
    let countArr = [...countNum]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)
    setCountNum(countArr)
  }

  return (
    <ScrollView>
      <Text> Create New Routine! </Text>
      <RoutineInput countNum={countNum}/>
      <Btn onPress={onAddRoutine} title="+"
      style={styles.btn}>
      </Btn>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('RoutineListScreen')}
      >
        생성하기
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 5
  }
})