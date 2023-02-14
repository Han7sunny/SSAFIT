import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton, MD3Colors} from 'react-native-paper';
// import { useNavigation  } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RoutineListItem(props) {
  // const navigation = useNavigation()
  // console.log(props.routineId)
  // console.log(props.userId)
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
    });
  }, []);
  function addTodayRoutine() {
    axios({
      method: 'post',
      url: `${ip}/routine/add-routine`,
      data: {
        routineId: props.routineId,
        userId: props.userId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('오늘의 루틴으로 추가 성공 :', res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <View style={styles.container}>
      {/* <IconButton
        // mode="contained"
        icon="plus-circle-outline"
        onPress={addTodayRoutine}
      /> */}
      <Text>{props.routineId}</Text>
      <Text style={styles.routineName}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 0.5,
  },
  routineName: {
    fontSize: 20,
  },
});
