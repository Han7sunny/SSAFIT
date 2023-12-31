import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, Text, Avatar, ProgressBar} from 'react-native-paper';
import MemberScreen from './MemberScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';

export default function MyGroupSimple({navigation, route}) {
  const id = route.params.id;
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('USER1');
  const [accessToken, setAccessToken] = useState('');
  const [item, setItem] = useState({});
  const [Members, setMembers] = useState([]);
  const [Routines, setRoutines] = useState([]);
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setRole(UserInfo.role);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [id, accessToken]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`${ip}/group/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setItem(data);
    setMembers(data.groupMemberList);
    setRoutines(data.routineList);
  };
  const deleteGroup = async () => {
    const result = (
      await axios.delete(`${ip}/group/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (result)
      navigation.navigate('MyPage', {
        screen: 'MainMyPageScreen',
        params: {state: true},
      });
  };
  return (
    <View>
      <View style={styles.container}>
        <ScrollView>
          <Text
            variant="headlineLarge"
            style={{fontWeight: 'bold', marginLeft: 20, marginBottom: 0}}>
            {item.name}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 600, flex: 1.5}}>
              운동 기간
            </Text>
            <Text style={{flex: 3, borderLeftWidth: 2, paddingLeft: 10}}>
              {item.start_date} ~ {item.end_date}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 600, flex: 1.5}}>
              그룹 목표
            </Text>
            {/* <ProgressBar progress={item.goal / 100.0} color="red" /> */}
            {/* <Text
              style={{
                marginLeft: 30,
                paddingLeft: 20,
                borderLeftWidth: 2,
              }}
            />
            <View
              style={{
                borderWidth: 1,
                width: '60%',
                height: 20,
                flexDirection: 'row',
              }}>
              <View style={{backgroundColor: 'red', width: `${item.goal}%`}}>
                <Text> </Text>
              </View>
              <Text style={{paddingLeft: 15}}>{item.goal}</Text>
            </View> */}
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 600, flex: 1.5}}>
              그룹 패널티
            </Text>
            <Text style={{flex: 3, borderLeftWidth: 2, paddingLeft: 10}}>
              {item.penalty}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 600, flex: 1.5}}>
              그룹 달성률
            </Text>
            <Text style={{flex: 3, borderLeftWidth: 2, paddingLeft: 10}}>
              {item.totalResult}
            </Text>
          </View>

          <Text style={{fontSize: 20, fontWeight: 600, flex: 1.5}}>그룹원</Text>
          {Members.map(item => (
            <MemberScreen member={item} />
          ))}
          {Routines.map(item => (
            <RoutineSimpleScreen navigation={navigation} id={item.routineId} />
          ))}
        </ScrollView>
      </View>
      <Button
        mode="contained"
        buttonColor="red"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() =>
          Alert.alert(`그룹을 탈퇴하시겠습니까?`, `${item.name}탈퇴합니다.`, [
            {
              text: '아니요',
              style: 'cancel',
            },
            {
              text: '네',
              onPress: () => deleteGroup(),
            },
          ])
        }>
        그룹 탈퇴
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  container: {
    marginTop: 8,
    backgroundColor: 'aliceblue',
    minHeight: 615,
    maxHeight: 615,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 20,
  },
  button: {
    width: 370,
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
