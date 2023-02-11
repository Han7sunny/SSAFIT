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
  }, [route.params, ip]);
  const getData = async () => {
    if (ip === '') return;
    const data = (
      await axios.get(`http://${ip}/group/myGroupList`, {
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
      <Text
        variant="headlineLarge"
        style={{fontWeight: 'bold', margin: 10, marginBottom: 30}}>
        {' ' + userId}
        님의 그룹 목록{' '}
      </Text>
      <View style={{maxHeight: 570, minHeight: 570}}>
        <FlatList
          data={Lists}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <MyGroupSimple item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.name.toString()}
        />
      </View>
      <Button
        mode="contained"
        buttonColor="black"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => navigation.navigate('CreateGroupScreen')}>
        그룹 생성하기
      </Button>
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
