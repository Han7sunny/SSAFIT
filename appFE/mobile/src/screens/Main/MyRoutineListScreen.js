import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button as Btn } from 'react-native-paper'
// import LogContext from '../../../contexts/LogContext'
import RoutineListItem from '../../components/RoutineItem'
import Button from '../../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MyRoutineListScreen({ navigation }) {
  const [routineData, setRoutineData] = useState([])
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    async function getUserInfo() {
      await AsyncStorage.getItem('username', (err, result) => {
        const UserInfo = JSON.parse(result)
        setAccessToken(UserInfo.token)
        setUserId(UserInfo.id)
      })
    }
    getUserInfo()
  // console.log(accessToken)
  const getData = async() => {
    // console.log('my routine list screen : ', accessToken)
    await axios({
      method: 'get',
      url: `http://70.12.246.116:8080/routine/get-user-routine`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      console.log('[나의 루틴 리스트] :',res.data)
      setRoutineData(res.data)
      // console.log('routineData :', routineData)
      // console.log('데이터를 받아왔다~ : ', routineData)
    })
    .catch((err) => {
      console.log("My routine list screen",err)
    })
  }
  getData()
  }, [])

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
              userId={userId}
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