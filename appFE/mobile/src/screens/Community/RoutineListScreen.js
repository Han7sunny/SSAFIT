import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import RoutineListItem from '../../components/RoutineItem'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RoutineListScreen({ navigation }) {
  const [routineList, setRoutineList] = useState([])
  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      setAccessToken(UserInfo.token)
    })
    axios({
      method: 'get',
      url: 'http://70.12.246.116:8080/board/shareRoutine',
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      console.log(res.data)
      setRoutineList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  return(
    <View>
      <Text> Routine List Screen </Text>
      <FlatList
        data={routineList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RoutineDetailScreen', { routineId : item.routineId })}
          >
            <RoutineListItem 
              routineId={item.routineId}
              name={item.name}
              />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}