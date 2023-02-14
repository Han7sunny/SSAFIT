import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text, IconButton, MD3Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RoutineSimpleScreen({navigation, id}) {
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  const [Select, setSelect] = useState(false);
  const [item, setItem] = useState({});
  const [exercises, setExercises] = useState([]);

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

  useEffect(() => {
    getData();
  }, [id, accessToken]);
  const getData = async () => {
    if (accessToken === '') return;
    console.log('id', id);
    const data = (
      await axios.get(`${ip}/routine/get-exercise-info/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setItem(data);
    setExercises(data.exerciseInfoList);
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">루틴명 : {item.routineName}</Text>
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
      {/* <Text>{props.routineId}</Text>
      <Text style={styles.routineName}>{props.name}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    justifyContent: 'center',
    borderWidth: 2,
    // marginVertical: 30,
    borderRadius: 5,
    marginBottom: 0.5,
  },
  routineName: {
    fontSize: 20,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 2,
  },
});
