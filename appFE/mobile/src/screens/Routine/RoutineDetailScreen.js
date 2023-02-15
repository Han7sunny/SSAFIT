import React, {useState, useEffect} from 'react';
import {Text, IconButton} from 'react-native-paper';
import {View, StyleSheet, FlatList} from 'react-native';
import Button from '../../components/Button';
import RoutineDetail from '../../components/RoutineDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function RoutineDetailScreen({route, navigation}) {
  const [routineInfo, setRoutineInfo] = useState([]);
  const [routineName, setRoutineName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  let {routineId} = route.params;
  console.log('루틴 아이디:', routineId);
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
    axios({
      method: 'get',
      url: `${ip}/routine/get-exercise-info/${routineId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(function (response) {
        console.log('routine detail : ', response.data);
        setRoutineName(response.data.routineName);
        setRoutineInfo(response.data.exerciseInfoList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

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
    <View style={styles.container}>
      <Text> Routine Detail Screen! </Text>
      <Text style={styles.title}>{routineName}</Text>
      <IconButton
        // mode="contained"
        icon="plus-circle-outline"
        onPress={() => {
          addTodayRoutine, console.log('오늘의 운동으로 추가');
        }}
      />
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
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CreateRoutineScreen',
            params: {routineInfo: routineInfo},
          })
        }>
        수정하기
      </Button>
    </View>
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
