
import React, { useState, useEffect } from 'react'
import { Text, IconButton } from 'react-native-paper'
import { View, StyleSheet, FlatList } from 'react-native'
import Button from '../../components/Button'
import RoutineDetail from '../../components/RoutineDetail'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function RoutineDetailScreen({ route ,navigation }) {
  const [routineInfo, setRoutineInfo] = useState([])
  const [accessToken, setAccessToken] = useState('')
  let { routineId } = route.params
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      setAccessToken(UserInfo.token)
    })
    axios({
      method: 'get',
      url: `http://70.12.246.102:8080/routine/get-exercise-info/${routineId}`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    }) 
    .then(function (response) {
      setRoutineInfo(response.data)
    }) 
    .catch(function (error) {
      console.log(error)
    })
  }, [])

  return (
    <View style={styles.container}> 
      <Text> Routine Detail Screen! </Text>
      <FlatList
        data={routineInfo}
        renderItem={({item}) => (
          <RoutineDetail 
            exerciseTypeName={item.exerciseTypeName}
            exerciseArea={item.exerciseArea}
            exerciseSet={item.exerciseSet}
            reps={item.reps}
            restTimeMinutes={item.restTimeMinutes}
            restTimeSeconds={item.restTimeSeconds}
            name={item.name}
          />
        )}
      />
        {/* <Text>{routineId}</Text> */}
        {/* <Text>{routineTitle}</Text> */}
      <Button
        onPress={() => navigation.navigate('CreateRoutineScreen', {routineInfo: routineInfo})}
      >수정하기</Button>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2
  }
})