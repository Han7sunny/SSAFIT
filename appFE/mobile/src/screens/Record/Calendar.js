import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


const reserved = {key:'reserved', color: 'blue', selectedDotcolor: 'blue'}
export default function Calendar(props) {
  const [selectedDay, setSelectedDay] = useState(format(new Date(), "yyyy-MM-dd"))
  // const [selectedMonth, setSelectedMonth] = useState('')
  // const [selectedYear, setSelectedYear] = useState('')
  const [getRoutines, setGetRoutines] = useState(false)
  const [isDateSelected, setIsDateSelected] = useState(false)

  const markedDates = props.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd')
    acc[formattedDate] = {marked: true}
    return acc
  }, [])
  const markedSelectedDate = {
    ...markedSelectedDate,
    [selectedDay]: {
      selected: true,
      marked: markedDates[selectedDay]?.marked
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      setUserId(UserInfo.id)
      setAccessToken(UserInfo.token)
    })
  }, [])
  
  return (
    <ScrollView style={styles.container}>
      <Text>루틴 예약하기!</Text>
      <Calendar style={styles.calendar}
        // initialDate={today}
        markedDates={markedSelectedDate}
        onDayPress={day => {
          console.log('selected day', day);
          setSelectedDay(day.dateString)
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />
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