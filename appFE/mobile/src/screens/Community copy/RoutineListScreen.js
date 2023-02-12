import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import RoutineListItem from '../../components/RoutineItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RoutineListScreen({navigation}) {
  const [routineList, setRoutineList] = useState([]);
  const [accessToken, setAccessToken] = useState('');
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
    });
  }, []);
  useEffect(() => {
    if (accessToken === '') return;
    axios({
      method: 'get',
      url: `http://${ip}/board/shareRoutine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log(res.data);
        setRoutineList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [accessToken]);
  return (
    <View>
      <Text> Routine List Screen </Text>
      <FlatList
        data={routineList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RoutineDetailScreen', {
                routineId: item.routineId,
              })
            }>
            <RoutineListItem routineId={item.routineId} name={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
