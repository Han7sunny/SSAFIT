import axios from 'axios'
import React, { useState } from 'react'
import { View, Button as Btn, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import RoutineInput from '../../components/RoutineInput'
// import axios from 'axios'


// axios 요청 보낼 함수
// function onPost() {
//   axios({
//     method: 'post',
//     path: '/routine/generate-routine',
//     headers: {
//       authorization: `Bearer ${accessToken}`
//     }
//   })
//   .then(function (response) {
//     console.log(response.data)
//   })
//   .catch(function (error) {
//     console.log(error)
//   })
// }

let routineList = Array()
export default function CreateRoutineScreen({ navigation }) {
  // RoutineInput 추가 코드
  const [countNum, setCountNum] = useState([0])
  const onAddRoutine = () => {
    let countArr = [...countNum]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)
    setCountNum(countArr)
  }

  // routine 정보 주고 받을 함수
  const routineInfo = ({data}) => {
    console.log(`======================`)
    console.log('data', data)
    console.log(data[1])
    // 유효성 검증을 먼저?~?
    if (data[0] === (undefined||'') || data[1] === 0 || data[2] === 0 || data[3] === 0) {
    } else {
      routineList.push(data)
    }
    console.log('루틴 리스트 :', routineList)
    console.log('======================')
  }

  return (
    <ScrollView>
      <Text> Create New Routine! </Text>
      <RoutineInput countNum={countNum} routineInfo={routineInfo}/>
      <Btn onPress={onAddRoutine} title="+"
      style={styles.btn}>
      </Btn>

      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('RoutineListScreen'); 
          // onPost()
        }}
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