import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
// import LogContext from '../../../contexts/LogContext'
import RoutineItem from '../../components/RoutineItem'
import Button from '../../components/Button'
// import axios from 'axios'

const DATA = [
  // 리스트로 출력할 루틴 데이터
  // axios로 받아오기
  {
    id: '1',
    title: '등 운동'
  },
  {
    id: '2',
    title: '전신 운동'
  },
  {
    id: '3',
    title: '하체 운동'
  },
]

export default function RoutineListScreen({ navigation }) {

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
        data={DATA}
        renderItem={({item}) => (
          <RoutineItem 
            id={item.id}
            title={item.title}
          />
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