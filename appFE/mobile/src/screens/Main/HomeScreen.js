import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Text, SegmentedButtons} from 'react-native-paper';
import CommunitySimpleScreen from './CommunitySimpleScreen';
import TodayRoutine from './TodayRoutine';
import RecordScreen from './RecordScreen';
import MyGroupListScreen from '../Group/MyGroupListScreen';
import MyRoutineListScreen from './MyRoutineListScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const [value, setValue] = useState('Exercise');
  const [period, setPeriod] = useState('0');
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
    axios
      .get(`${ip}/record/continuous-period`, {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      })
      .then(res => {
        console.log(res.data);
        setPeriod(res.data);
      })
      .catch(err => console.log(err));
  }, [accessToken]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}> {period}일째 연속 운동중 </Text>
      {/* <RecordScreen /> */}
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        showSelectedCheck={true}
        shadowColor="#29b6f6"
        buttons={[
          {
            value: 'Exercise',
            label: '오늘의 운동',
          },
          {
            value: 'Routine',
            label: '나의 루틴',
          },
          {
            value: 'Group',
            label: '가입된 그룹',
          },
          {
            value: 'Community',
            label: '커뮤니티',
          },
        ]}
      />
      {value === 'Exercise' && <TodayRoutine />}
      {value === 'Routine' && <MyRoutineListScreen />}
      {value === 'Group' && (
        <MyGroupListScreen navigation={navigation} route={false} />
      )}
      {value === 'Community' && (
        <CommunitySimpleScreen navigation={navigation} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  container: {
    borderWidth: 2,
    // padding: 10,
    // margin: 10,
  },
  row: {
    justifyContent: 'center',
  },
});
