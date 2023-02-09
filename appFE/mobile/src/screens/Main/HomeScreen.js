import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import Button from '../../components/Button'
import TodayRoutine from "./TodayRoutine";
import RecordScreen from "./RecordScreen";
import RoutineListItem from "../../components/RoutineListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const date = new Date()
const today = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()
export default function HomeScreen({ navigation }) {
  const [todayRoutine, setTodayRoutine] = useState([])
  // const [routineName, setRoutineName] = useState('')
  // const [routineId, setRoutineId] = useState(0)
  // const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  // const navigation = useNavigation()
  useEffect(() => {
    AsyncStorage.getItem('username', (err,result) => {
      const UserInfo = JSON.parse(result)
      // setUserId(UserInfo.id)
      setAccessToken(UserInfo.token)
    })
  },[])
  useEffect(() => {
    // console.log(accessToken)
    console.log('Home Screen 토큰',accessToken)
    axios({
      method: 'get',
      url: `http://70.12.246.116:8080/record/get-schedule?year=${year}&month=${month}&day=${today}`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      console.log('today routine screen 성공',res.data)
      setTodayRoutine(res.data)

    })
    .catch((err) => {
      console.log('today routine screen 실패',err)
    })
  },[accessToken])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}> 운동 시작한지 N일 </Text>
      <RecordScreen />
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}> 오늘의 운동 </Text>
          <IconButton
            icon="plus-circle-outline"
            iconColor="black"
            size={50}
            onPress={() => navigation.navigate('RoutineReservationScreen')}
            // style={styles.iconButton}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('RoutineDetailScreen', {routineId: todayRoutine[0].routineId})}
        >
          <FlatList 
            data={todayRoutine}
            renderItem={({item}) => (
              <RoutineListItem 
                routineId={item.routineId}
                name={item.name}
              />
            )}
          />
        </TouchableOpacity>
      </View>

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
  },
  container: {
    borderWidth: 2,
    // padding: 10,
    // margin: 10,
  },
  row: {
    justifyContent: "center"
  }
})