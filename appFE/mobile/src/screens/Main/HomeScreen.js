import React from "react";
<<<<<<< HEAD
import { View, StyleSheet, ScrollView } from 'react-native'
=======
import { View, StyleSheet } from 'react-native'
>>>>>>> 16d5a01b1e0962cd01e85f851c39959e735c0b65
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import TodayRoutine from "./TodayRoutine";
import RecordScreen from "./RecordScreen";
import MyGroup from "./MyGroup";

export default function HomeScreen({ navigation }) {
  return (
<<<<<<< HEAD
    <ScrollView>
=======
    <View>
>>>>>>> 16d5a01b1e0962cd01e85f851c39959e735c0b65
      <Text style={styles.text}> 운동 시작한지 N일 </Text>
      <RecordScreen />
      <TodayRoutine />
      <MyGroup navigation={navigation}/>
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
<<<<<<< HEAD
    </ScrollView>
=======
    </View>
>>>>>>> 16d5a01b1e0962cd01e85f851c39959e735c0b65
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40
  }
})