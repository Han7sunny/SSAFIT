import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyRecordScreen({navigation}) {
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [recordData, setRecordData] = useState([]);
  const [ip, setIP] = useState('');
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
    axios({
      method: 'get',
      url: `http://${ip}/record/get-exercise-record/${userId}?year=2023&month=2&day=8`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('운동기록 : ', res.data);
        setRecordData(res.data);
      })
      .catch(err => {
        console.log('My record screen 실패 ', err);
      });
  }, []);

  return (
    <View>
      <Text style={styles.title}> 나의 운동 기록 </Text>
      {/* 누적 운동 날짜 */}
      {/* 오늘 운동한 시간 */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
});
