import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Button as Btn, IconButton } from 'react-native-paper'
import LogContext from '../../../contexts/LogContext'
import RoutineListItem from '../../components/RoutineListItem'
import Button from '../../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MyRoutineListScreen({ navigation }) {
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [routineData, setRoutineData] = useState([])
  // let userId = ''
  // let accessToken = ''
  useEffect(() => {
    async function getUserInfo() {
      await AsyncStorage.getItem('username', (err, result) => {
        const UserInfo = JSON.parse(result)
        setAccessToken(UserInfo.token)
        setUserId(UserInfo.id)
      })
    }
  getUserInfo()
  },[])
  useEffect(() => {
    axios({
        method: 'get',
        url: `http://70.12.246.116:8080/routine/get-user-routine`,
        headers: {
          "authorization": `Bearer ${accessToken}`,
          "X-AUTH-TOKEN":`${accessToken}`
        }
      })
      .then((res) => {
        console.log('My routine list screen 성공 :',res.data)
        setRoutineData(res.data)
      })
      .catch((err) => {
        console.log("My routine list screen 실패 :",err)
    })
  }, [accessToken])

  function onDelete() {
    axios({
      method: 'put',
      url: `http://70.12.246.116:8080/routine/delete-routine`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      console.log('루틴 삭제 성공',res.data)
    })
    .catch((err) => {
      console.log('루틴 삭제 실패',err)
    })
  }

  return (
    <ScrollView>
      <Text style={styles.title}> 나의 운동 루틴 목록 </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateRoutineScreen')}
      >
        운동 루틴 만들기
      </Button> 
        {/* <IconButton 
          icon="trash-cah-outline"
          onPress={onDelete}
        /> */}
      <FlatList
        data={routineData}
        renderItem={({item}) => (
          <View style={{ flexDirection: "row"}}>
          <IconButton 
            icon="trash-can-outline"
            onPress={() => {onDelete, console.log('루틴 삭제')}}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('RoutineDetailScreen', { routineId : item.routineId })}
          >
          <View style={{ flexDirection: "row" }}>
            <RoutineListItem 
              routineId={item.routineId}
              name={item.name}
              userId={userId}
              />
          </View>
          </TouchableOpacity>
        </View>
        )}
        />
      {/* <LogContext.Consumer>
        {(value) => <Text>{value}</Text>}
      </LogContext.Consumer> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  }
})