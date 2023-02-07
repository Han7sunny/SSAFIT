import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import RoutineListItem from '../../components/RoutineItem'
import axios from 'axios'

export default function RoutineListScreen({ navigation }) {
  const [routineList, setRoutineList] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://70.12.246.116:8080/board/shareRoutine'
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