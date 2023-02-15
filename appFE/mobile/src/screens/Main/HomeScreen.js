import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {IconButton, Text, Button, SegmentedButtons} from 'react-native-paper';
import CommunitySimpleScreen from './CommunitySimpleScreen';
import RecordScreen from './RecordScreen';
import MyGroupListScreen from '../Group/MyGroupListScreen';
import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';
import MyRoutineListScreen from './MyRoutineListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const date = new Date();
const today = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
export default function HomeScreen({navigation}) {
  const [value, setValue] = useState('Exercise');
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
    <ScrollView style={styles.container}>
      <Text style={styles.text}> 운동 시작한지 N일 </Text>
      <RecordScreen />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
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
      {value === 'Exercise' && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}> 오늘의 운동 </Text>
            <Button
              onPress={() => navigation.navigate('RoutineReservationScreen')}>
              오늘의 운동 추가하기
            </Button>
          </View>
          {todayRoutine.length === 0 && (
            <View>
              <Text>오늘 추가된 운동이 없습니다.</Text>
              <Text>운동을 추가해보세요</Text>
            </View>
          )}
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() =>
              navigation.navigate('RoutineDetailScreen', {
                routineId: todayRoutine[0].routineId,
              })
            }>
            {todayRoutine.map(item => (
              <RoutineSimpleScreen id={item.routineId} />
            ))}
          </TouchableOpacity>
        </View>
      )}
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
