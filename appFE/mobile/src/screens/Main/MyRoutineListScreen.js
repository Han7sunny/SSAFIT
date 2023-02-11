import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button as Btn} from 'react-native-paper';
// import LogContext from '../../../contexts/LogContext'
import RoutineListItem from '../../components/RoutineItem';
import Button from '../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyRoutineListScreen({navigation}) {
  const [routineData, setRoutineData] = useState([]);
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      // const UserInfo = result
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [accessToken]);

  const getData = async () => {
    if (accessToken === '') return;
    await axios({
      method: 'get',
      url: `http://${ip}/routine/get-user-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(function (res) {
        console.log('[나의 루틴 리스트] :', res.data);
        setRoutineData(res.data);
        // console.log('routineData :', routineData)
        // console.log('데이터를 받아왔다~ : ', routineData)
      })
      .catch(function (err) {
        console.log('My routine list screen', err);
      });
  };

  return (
    <View>
      <Text style={styles.title}> 나의 운동 루틴 목록 </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateRoutineScreen')}>
        운동 루틴 만들기
      </Button>

      <FlatList
        data={routineData}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RoutineDetailScreen', {
                routineId: item.routineId,
              })
            }>
            <RoutineListItem
              routineId={item.routineId}
              name={item.name}
              userId={userId}
            />
          </TouchableOpacity>
        )}
      />
      {/* <LogContext.Consumer>
        {(value) => <Text>{value}</Text>}
      </LogContext.Consumer> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
});
