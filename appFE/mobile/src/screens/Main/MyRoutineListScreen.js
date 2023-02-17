import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Text, Button, IconButton} from 'react-native-paper';
import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyRoutineListScreen() {
  const navigation = useNavigation();
  const [change, setChange] = useState(false);
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [routineData, setRoutineData] = useState([]);
  // let userId = ''
  // let accessToken = ''
  const [ip, setIP] = useState('');
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    async function getUserInfo() {
      await AsyncStorage.getItem('username', (err, result) => {
        const UserInfo = JSON.parse(result);
        setAccessToken(UserInfo.token);
        setUserId(UserInfo.id);
      });
    }
    getUserInfo();
  }, []);
  useEffect(() => {
    if (accessToken === '') return;
    axios({
      method: 'get',
      url: `${ip}/routine/get-user-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('My routine list screen 성공 :', res.data);
        setRoutineData(res.data);
        setChange(false);
      })
      .catch(err => {
        console.log('My routine list screen 실패 :', err);
      });
  }, [accessToken, change]);

  function onDelete() {
    axios({
      method: 'put',
      url: `${ip}/routine/delete-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('루틴 삭제 성공', res.data);
      })
      .catch(err => {
        console.log('루틴 삭제 실패', err);
      });
  }

  return (
    <View>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.label}
        buttonColor="#29b6f6"
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CreateRoutineScreen',
            params: {data: false},
          })
        }>
        운동 루틴 만들기
      </Button>
      {routineData.map(item => (
        <TouchableOpacity
          style={{alignItems: 'center', width: '100%', margin: 0}}
          onPress={() =>
            navigation.navigate('Home', {
              screen: 'RoutineDetailScreen',
              params: {
                id: item.routineId,
              },
            })
          }>
          <RoutineSimpleScreen id={item.routineId} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '95%',
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    color: '#29b6f6',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
