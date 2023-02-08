import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button as Btn } from 'react-native-paper'
// import LogContext from '../../../contexts/LogContext'
<<<<<<< HEAD
import RoutineListItem from '../../components/RoutineItem'
import Button from '../../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MyRoutineListScreen({ navigation }) {
  const [routineData, setRoutineData] = useState([])
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      // const UserInfo = result
      const UserInfo = JSON.parse(result)       // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id)
      setAccessToken(UserInfo.token)
    })
    axios({
      method: 'get',
      url: `http://70.12.246.116:8080/routine/get-user-routine/${userId}`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then(function (res) {
      console.log('[나의 루틴 리스트] :',res.data)
      setRoutineData(res.data)
      // console.log('routineData :', routineData)
      // console.log('데이터를 받아왔다~ : ', routineData)
    })
    .catch(function (err) {
      console.log("My routine list screen",err)
    })
  }, [])
=======
import RoutineListItem from '../../components/RoutineListItem'
import Button from '../../components/Button'
import axios from 'axios'

// const routineData = [
//   // 리스트로 출력할 루틴 데이터
//   // axios로 받아오기
//   {
//     routineId: '1',
//     name: '오늘의 루틴'
//   },
//   {
//     routineId: '2',
//     name: '전신 운동'
//   },
//   {
//     routineId: '3',
//     name: '하체 운동'
//   },
// ]
let routineData = []
export default function MyRoutineListScreen({ navigation }) {
  // const [routineData, setRoutineData] = useState([])
  //   useEffect(() => {
  //     async function getData() {
        axios({
          method: 'get',
          url: 'http://70.12.246.102:8080/routine/get-user-routine/asdf1234',
        
        })
        .then(function (res) {
          // console.log('res.data :',res.data)
          // console.log(res.data[0].routineId)
          // console.log(res.data[0].name)
          const newData = res.data[0]
          routineData.push(newData)
          console.log('routineData :', routineData)
          // console.log('데이터를 받아왔다~ : ', routineData)
        })
        .catch(function (err) {
          console.log(err)
        })
      // }
      // getData()
    // })
>>>>>>> 16d5a01b1e0962cd01e85f851c39959e735c0b65

  return (
    <View>
      <Text style={styles.title}> 나의 운동 루틴 목록 </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateRoutineScreen')}
      >
        운동 루틴 만들기
      </Button> 
      
      <FlatList
        data={routineData}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RoutineDetailScreen', { routineId : item.routineId })}
          >
            <RoutineListItem 
              routineId={item.routineId}
              name={item.name}
<<<<<<< HEAD
              userId={userId}
=======
>>>>>>> 16d5a01b1e0962cd01e85f851c39959e735c0b65
              />
          </TouchableOpacity>
        )}
      />
      {/* <LogContext.Consumer>
        {(value) => <Text>{value}</Text>}
      </LogContext.Consumer> */}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  }
})