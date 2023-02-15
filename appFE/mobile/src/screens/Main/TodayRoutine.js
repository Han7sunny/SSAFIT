import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import axios from 'axios';
import Button from '../../components/Button';
import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const date = new Date();
const today = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
export default function TodayRoutine() {
  const navigation = useNavigation();
  const [todayRoutine, setTodayRoutine] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    if (accessToken === '') return;
    axios({
      method: 'get',
      url: `${ip}/record/get-schedule?year=${year}&month=${month}&day=${today}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('today routine screen 성공', res.data);
        setTodayRoutine(res.data);
      })
      .catch(err => {
        console.log('today routine screen 실패', err);
      });
  }, [accessToken]);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <Text variant="headlineLarge">{' 오늘의 운동 '}</Text>
        <Button
          onPress={() =>
            navigation.navigate('Home', {
              screen: 'RoutineReservationScreen',
            })
          }>
          오늘의 운동 추가하기
        </Button>
      </View>
      {todayRoutine.length === 0 && (
        <View>
          <Text variant="titleLarge">오늘 추가된 운동이 없습니다.</Text>
          <Text variant="titleLarge">운동을 추가해보세요</Text>
        </View>
      )}
      <TouchableOpacity
        style={{alignSelf: 'center', width: '100%'}}
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'RoutineDetailScreen',
            params: {
              routineId: todayRoutine[0].routineId,
            },
          })
        }>
        {todayRoutine.map(item => (
          <RoutineSimpleScreen id={item.routineId} key={item.routineId} />
        ))}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 2,
  },
  exercise: {
    margin: 3,
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  set: {
    fontSize: 20,
  },
});
