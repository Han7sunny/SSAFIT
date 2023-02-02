import React from "react";
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import TodayRoutine from "../../components/TodayRoutine";
import RecordScreen from "./RecordScreen";

export default function MainScreen({ navigation }) {
  return (
    <View>
      <Text style={styles.text}> 운동 시작한지 N일 </Text>
      <RecordScreen />
      <TodayRoutine />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateRoutineScreen')}
      >
        운동 루틴 만들기
      </Button> 
      <Button
        mode="contained"
        onPress={() => navigation.navigate('MyGroupListScreen')}
      >
        나의 그룹
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40
  }
})