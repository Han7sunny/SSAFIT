import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, IconButton, MD3Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function RoutineSimpleScreen({id}) {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
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
      <TouchableOpacity
        key={item.recordId}
        style={{alignSelf: 'center', width: '100%'}}
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'RoutineDetailScreen',
            params: {
              id: id,
            },
          })
        }>
        <Text variant="titleMedium">루틴명 : {item.routineName}</Text>
        <Text>운동부위</Text>
        {exercises.map((item, idx) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{idx}. </Text>
            <Text
              style={{
                paddingLeft: 10,
              }}>
              {item.exerciseArea} - {item.exerciseTypeName}
            </Text>
          </View>
        ))}
      </TouchableOpacity>
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
    marginBottom: 2,
    alignSelf: 'center',
  },
  routineName: {
    fontSize: 20,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 2,
  },
});
