import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import MyRoutineListScreen from './MyRoutineListScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import axios from 'axios';

const date = new Date()

export default function RoutineReservationScreen({ navigation }) {
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [routineId, setRoutineId] = useState(0)
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  // const [selectedDay, setSelectedDay] = useState('')
  const [isDateSelected, setIsDateSelected] = useState(false)
  // const currentDay = date.getDate()
  // const currentMonth = date.getMonth() + 1
  // const currentYear = date.getFullYear()
  // const today = `${currentYear}-${currentMonth}-${currentDay}`
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      setUserId(UserInfo.id)
      setAccessToken(UserInfo.token)
  })
  }, [])
  const onPost = () => {
    axios({
      method: 'post',
      url: `http://70.12.246.116:8080/record/record-registration`,
      headers: {
        authorization: `${accessToken}`
      },
      data: {
        "routineId": routineId,
        "startDay": selectedDay,
        "startMonth": selectedMonth,
        "startYear": selectedYear,
        "userId": userId
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onChangeDay = () => {
    // 선택한 날짜에 예약된 운동 루틴 가져오기
    axios({
      method: 'get',
      url: `http://70.12.246.116:8080/record/get-schedule/${userId}`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      // 저장된 데이터가 있으면 정보 뿌려주고, 
      // 없으면 예약 컴포넌트 띄워주기
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <Text>루틴 예약하기!</Text>
      <Calendar style={styles.calendar}
        // initialDate={today}
        onDayPress={day => {
          console.log('selected day', day);
          setIsDateSelected(!isDateSelected)
          setSelectedDay(day.day)
          setSelectedMonth(day.month)
          setSelectedYear(day.year)
          // onChangeDay
        }}
        firstDay={1}

        enableSwipeMonths={true}
      />
    {isDateSelected && <View>
      <Text> 루틴 고르기 </Text>
      {/* RoutineItem 뿌려주기 */}
      <Button
        mode="contained"
        onPress={onPost}
      >루틴 저장하기</Button>
    </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
})