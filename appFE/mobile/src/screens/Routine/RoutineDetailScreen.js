import React, {useState, useEffect} from 'react';
import {Text, IconButton} from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';
import Button from '../../components/Button';
import RoutineDetail from '../../components/RoutineDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function RoutineDetailScreen({route}) {
  const id = route.params.id;
  const [item, setItem] = useState({});
  const [exercises, setExercises] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [ip, setIP] = useState('');
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setAccessToken(UserInfo.token);
      setUserId(UserInfo.id);
    });
  }, []);
  useEffect(() => {
    if (accessToken === '') return;
    console.log('id', id);
    axios
      .get(`${ip}/routine/get-exercise-info/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
      .then(res => {
        console.log('routine detail : ', res.data);
        setItem(res.data);
        setExercises(res.data.exerciseInfoList);
      })
      .catch(err => console.log(err));
  }, [id, accessToken]);

  function addTodayRoutine() {
    axios({
      method: 'post',
      url: `${ip}/routine/add-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
      data: {
        routineId: routineId,
        userId: userId,
      },
    })
      .then(res => {
        console.log('response :', res.data);
      })
      .catch(err => {
        console.log('에러');
      });
  }
  return (
    <ScrollView style={styles.container}>
      <Text variant="titleMedium">루틴명 : {item.routineName}</Text>

      <IconButton
        // mode="contained"
        icon="plus-circle-outline"
        onPress={() => {
          addTodayRoutine, console.log('오늘의 운동으로 추가');
        }}
      />
      {exercises.map(item => (
        <View>
          <View style={styles.separator} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>운동 부위</Text>
                <Text
                  style={{marginLeft: 50, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.exerciseArea} - {item.exerciseTypeName}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>세트 수</Text>
                <Text
                  style={{marginLeft: 63, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.exerciseSet} {' 세트'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>세트별 횟수</Text>
                <Text
                  style={{marginLeft: 37, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.reps}
                  {' 회'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>세트별 쉬는 시간</Text>
                <Text
                  style={{marginLeft: 8, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.restTimeMinutes} : {item.restTimeSeconds}
                </Text>
              </View>
            </View>
            <Image
              source={require('../s.png')}
              style={{width: 70, height: 70}}
            />
          </View>
        </View>
      ))}
      <Button
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CreateRoutineScreen',
            params: {routineInfo: routineInfo},
          })
        }>
        수정하기
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
  title: {
    fontSize: 30,
  },
});
