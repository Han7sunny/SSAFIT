import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import TodayRoutine from "./TodayRoutine";
import RecordScreen from "./RecordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [todayRoutine, setTodayRoutine] = useState([])
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  // const navigation = useNavigation()
  useEffect(() => {
    AsyncStorage.getItem('username', (err,result) => {
      const UserInfo = JSON.parse(result)
      console.log('today routine 토큰',UserInfo.token)
      setUserId(UserInfo.id)
      setAccessToken(UserInfo.token)
    })
    axios({
      method: 'get',
      url: `http://70.12.246.116:8080/record/get-schedule/${userId}?year=2023&month=2&day=8`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      console.log('today routine screen',res.data)
      setTodayRoutine(res.data)
    })
    .catch((err) => {
      console.log('today routine screen',err)
    })
  },[])

  return (
    <ScrollView>
      <Text style={styles.text}> 운동 시작한지 N일 </Text>
      <RecordScreen />
      <TodayRoutine todayRoutine={todayRoutine}/>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateRoutineScreen')}
      >
        운동 루틴 만들기
      </Button> 
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CommunityScreen')}
      >
        커뮤니티
      </Button> 
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateGroupScreen')}
      >
        나의 그룹
      </Button>
    </ScrollView>


  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40
  }
})