import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RoutineListItem from '../../components/RoutineListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import axios from 'axios';

const date = new Date()
const reserved = {key:'reserved', color: 'blue', selectedDotcolor: 'blue'}
export default function RoutineReservationScreen({ navigation }) {
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [routineId, setRoutineId] = useState(0)
  const [routineList, setRoutineList] = useState([])
  const [stringDate, setStringDate] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [getRoutines, setGetRoutines] = useState(false)
  const [isDateSelected, setIsDateSelected] = useState(false)
  const [acc, setAcc] = useState({})

  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      setUserId(UserInfo.id)
      setAccessToken(UserInfo.token)
    })
  }, [])
  const onRegistration = () => {
    axios({
      method: 'post',
      url: `http://70.12.246.116:8080/record/record-registration`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
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
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onChangeDay = () => {
    // 선택한 날짜에 예약된 운동 루틴 가져오기
    // console.log('예약된 운동 가져오기')
    axios({
      method: 'get',
      url: `http://70.12.246.116:8080/record/get-schedule?year=${selectedYear}&month=${selectedMonth}&day=${selectedDay}`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      console.log('예약된 운동 : ',res.data)
      // 어떻게 정보 보내는지 형태 알아야 함.
      // 저장된 데이터가 있으면 정보 뿌려주고, 
      // 없으면 예약 컴포넌트 띄워주기
      if (res.data.length === 0) {
        console.log('예약된 운동이 없음')
        axios({
          method: 'get',
          url: `http://70.12.246.116:8080/routine/get-user-routine`,
          headers: {
            "authorization": `Bearer ${accessToken}`,
            "X-AUTH-TOKEN":`${accessToken}`
          }
        })
        .then((res) => {
          console.log('get my routine 요청 성공 ', res.data)
          setRoutineList(res.data)
        })
        .catch((err) => {
          console.log('reservation / get my routine',err)
        })
      } else {
        console.log('예약된 운동이 있음')
        setRoutineList(res.data)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const markedDates = (stringDate) => {
    // const formattedDate = format(new Date(current.date), 'yyyy-MM-dd')
    let arr = []
    arr[stringDate] = {marked: true}
    console.log('acc : ', arr)
    setAcc(arr)
  }

  const markedSelectedDate = {
    ...markedSelectedDate,
    [stringDate]: {
      selected: true,
      marked: markedDates[stringDate]?.marked
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text>루틴 예약하기!</Text>
      <Calendar style={styles.calendar}
        // initialDate={today}
        markedDates={markedSelectedDate}
        onDayPress={day => {
          console.log('selected day', day);
          setIsDateSelected(true)
          setSelectedDay(day.day)
          setSelectedMonth(day.month)
          setSelectedYear(day.year)
          setStringDate(day.stringDate)
          markedDates(day.stringDate)
          onChangeDay()
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />
      {/* 달력에서 날짜 선택하면 보여주기 */}
      {isDateSelected && <View>
        <Text> 루틴 고르기 </Text>
        {/* RoutineItem 뿌려주기 */}
        <FlatList 
          data={routineList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setRoutineId(item.routineId)
                setGetRoutines(true)
              }}>
              <RoutineListItem 
                routineId={item.routineId}
                name={item.name}
              />
            </TouchableOpacity>
            )}
          />
        {getRoutines && <View>
          <Button
            mode="contained"
            onPress={() => {
              onRegistration()
              navigation.navigate('RoutineReservationScreen')
              // console.log('예약하기 누름ㅇ리ㅓㄷ라ㅣㅇ러 getRoutines : ', getRoutines)
            }}
          >루틴 예약하기</Button>
          </View>}
        </View>}
      </ScrollView>
    // </View>
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