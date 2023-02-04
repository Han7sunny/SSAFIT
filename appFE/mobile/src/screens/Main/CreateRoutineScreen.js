import axios from 'axios'
import React, { useState } from 'react'
import { View, Button as Btn, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import RoutineInput from '../../components/RoutineInput'
let exerciseList = []  // RoutineInput.js에서 사용자가 입력한 루틴 정보를 저장할 리스트
let routineName = ''

// axios 요청 보낼 함수
function onPost() {
  axios({
    method: 'post',
    url: 'http://70.12.246.102:8080/routine/generate-routine',
    headers: {
      authorization: `${1232546579990}`
      // react native - jwt 라이브러리
    },
    data: {
      "routineName": `${routineName}`,
      "userId": 'asdf1234',
      "exerciseList": exerciseList
    }
  })
  .then(function (response) {
    console.log(response.data)
    console.log('==== 데이터 POST 성공 ======')
    console.log('routineName :', routineName)
    console.log('exerciseList :', exerciseList)
  })
  .catch(function (error) {
    console.log('==== 데이터 POST 실패 ======')
    console.log('routineName :', routineName)
    console.log('exerciseList :', exerciseList)
    console.log(error)
  })
}

export default function CreateRoutineScreen({ navigation }) {
  // const [routineName, setRoutineName] = useState('')
  // RoutineInput 컴포넌트 추가 코드

  const [countNum, setCountNum] = useState([0])
  const onAddRoutine = () => {
    let countArr = [...countNum]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)
    setCountNum(countArr)
  }

  // routine 정보 주고 받을 함수
  const routineInfo = ({sendData}) => {
    // sendData.push({"name" : "1번운동 별칭"})
    console.log(`========== sendData : ${sendData} ============`)
    exerciseList.push(sendData)
    console.log('루틴 리스트 :', exerciseList)
    console.log('======================')
  }

  return (
    <ScrollView>
      <Text> Create New Routine! </Text>
      <TextInput
        label="루틴 이름을 설정하세요!"
        value={routineName.value}
        onChangeText={(text) => {
          routineName = text
        }}
        onEndEditing={() => {console.log('routineName 외않되 : ',routineName)}}
      />
      <RoutineInput countNum={countNum} routineInfo={routineInfo}/>
      <Btn onPress={onAddRoutine} title="+"
      style={styles.btn}>
      </Btn>

      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('MyRoutineListScreen'); 
          // navigator 인덱스 초기화하기
          onPost()
        }}
      >
        저장하기
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 5
  }
})