import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddGroupScreen({navigation, route}) {
  const id = route.params.id;
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  const [userId, setUserId] = useState('');
  const [groupName, setGroupName] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
      setUserId(UserInfo.id);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [id, accessToken]);
  const getData = async () => {
    console.log(ip, accessToken);
    if (accessToken === '') return;
    const data = (
      await axios.get(`http://${ip}/group/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    // setItem(data);
    setGroupName(data.name);
    console.log('data', data);
  };

  const accept = async () => {
    const result = (
      await axios.get(`http://${ip}/group/invitation/accept/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (result) navigation.navigate('AddScreen', {id: id});
  };
  const deny = async () => {
    const result = (
      await axios.get(`http://${ip}/group/invitation/deny/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (result) navigation.navigate('CancelScreen', {id: id});
  };

  return (
    <View>
      <Text variant="displaySmall" style={{margin: 30}}>
        {' 그룹 초대 요청 '}
      </Text>
      <View style={{alignItems: 'center', marginTop: 40}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../Group/icon.png')}
            style={{width: 150, height: 150, marginBottom: 15}}
          />
          <Text variant="headlineMedium">{userId}님</Text>
        </View>
        <Text variant="titleLarge" style={{margin: 30}}>
          {groupName}그룹 초대 요청을 수락하시겠습니까?
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          mode="contained"
          buttonColor="black"
          style={styles.button}
          labelStyle={styles.label}
          onPress={accept}>
          수락
        </Button>
        <Button
          mode="contained"
          buttonColor="red"
          style={styles.button}
          labelStyle={styles.label}
          onPress={deny}>
          거절
        </Button>
        <Button
          mode="contained"
          buttonColor="black"
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => navigation.navigate('AddGroupDetailScreen', {id: id})}>
          상세보기
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 50,
    margin: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
});
