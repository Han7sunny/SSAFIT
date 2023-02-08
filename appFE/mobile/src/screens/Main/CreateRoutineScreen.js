import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Button as Btn, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import RoutineInput from '../../components/RoutineInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useSelector } from 'react-redux'

// const userData = useSelector(store=>store.userData)
export default function CreateRoutineScreen({ navigation }) {
  let exerciseList = []  // RoutineInput.js에서 사용자가 입력한 루틴 정보를 저장할 리스트
  const [routineName, setRoutineName] = useState()
  const [accessToken, setAccessToken] = useState()
  const [userId, setUserId] = useState('')
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      // console.log(UserInfo)
      setAccessToken(UserInfo.token)
      setUserId(UserInfo.id)
      // console.log('[루틴생성] 토큰 :' , accessToken)
    })
  }, [])
// axios 요청 보낼 함수
function onPost() {
  axios({
    method: 'post',
    url: 'http://70.12.246.116:8080/routine/generate-routine',
    headers: {
      "authorization": `Bearer ${accessToken}`,
      "X-AUTH-TOKEN":`${accessToken}`
    },
    data: {
      "routineName": `${routineName}`,
      "userId": userId,
      "exerciseList": exerciseList,
      "routineId": 0
    }
  })
  .then(function (response) {
    console.log(response.data)
    console.log('==== 루틴 생성 성공 ======')
    // console.log('routineName :', routineName)
    // console.log('exerciseList :', exerciseList)
  })
  .catch(function (error) {
    console.log('==== 루틴 생성 실패 ======')
    // console.log('routineName :', routineName)
    // console.log('exerciseList :', exerciseList)
    console.log(error)
  })
}

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
    // console.log(`========== sendData : ${sendData} ============`)
    exerciseList.push(sendData)
    console.log('저장한 루틴 리스트 :', exerciseList)
    // console.log('======================')
  }

  return (
    <ScrollView>
      <Text> Create New Routine! </Text>
      <TextInput
        label="루틴 이름을 설정하세요!"
        value={routineName}
        onChangeText={(text) => {
          setRoutineName(text)
        }}
        // onEndEditing={() => {console.log('routineName 외않되 : ',routineName)}}
      />
      <RoutineInput countNum={countNum} routineInfo={routineInfo}/>
      <Btn onPress={onAddRoutine} title="+"
      style={styles.btn}>
      </Btn>

      <Button
        mode="contained"
        onPress={() => {
          onPost()
          navigation.navigate('MyRoutineListScreen'); 
          // navigator 인덱스 초기화하기
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
const styles = StyleSheet.create({
  btn: {
    width: 5
  }
})