import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import MyGroupSimple from './MyGroupSimple';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyGroupListScreen({navigation, route}) {
  const [Lists, setLists] = useState([]);
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [route.params, accessToken]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`${ip}/group/myGroupList`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setLists(data);
    console.log(data);
  };

  return (
    <View>
      <Button
        mode="contained"
        buttonColor="black"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() =>
          navigation.navigate('Group', {
            screen: 'CreateGroupScreen',
            params: {data: false},
          })
        }>
        그룹 생성하기
      </Button>
      {Lists.map(item => (
        <MyGroupSimple item={item} navigation={navigation} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  button: {
    width: 350,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
});
