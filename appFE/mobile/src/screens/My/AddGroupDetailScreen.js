import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MemberScreen from '../Group/MemberScreen';
import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';

export default function AddGroupScreen({navigation, route}) {
  console.log(route.params.id);
  const id = route.params.id;
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  const [item, setItem] = useState('');
  const [Members, setMembers] = useState([]);
  const [Routines, setRoutines] = useState([]);
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
    console.log(ip, accessToken);
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
    console.log('data', data);
  };
  return (
    <View>
      <Text
        variant="displayLarge"
        style={{fontWeight: 'bold', margin: 10, marginBottom: 0}}>
        {item.name}
      </Text>
      <View style={{alignItems: 'center'}}>
        <View style={styles.container}>
          <ScrollView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../Group/icon.png')}
                style={{width: 50, height: 50, margin: 10}}
              />
              <View>
                <Text style={{fontSize: 30, fontWeight: 600}}>닉네임</Text>
                <Text>sfg</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>운동 기간</Text>
              <Text
                style={{marginLeft: 30, paddingLeft: 20, borderLeftWidth: 2}}>
                {item.start_date} ~ {item.end_date}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>그룹 목표</Text>
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
              <Text style={{fontSize: 20, fontWeight: 600}}>그룹 패널티</Text>
              <Text
                style={{
                  marginLeft: 12,
                  paddingLeft: 20,
                  borderLeftWidth: 2,
                  width: '65%',
                }}>
                {item.penalty}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>그룹 달성률</Text>
              {/* <Text
                style={{
                  marginLeft: 10,
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
                <View
                  style={{
                    backgroundColor: 'red',
                    width: `${item.achievement_rate}%`,
                  }}>
                  <Text> </Text>
                </View>
                <Text style={{paddingLeft: 15}}>{item.achievement_rate}</Text>
              </View> */}
            </View>

            <Text style={{fontSize: 20, fontWeight: 600}}>그룹원</Text>
            {Members.map(item => (
              <MemberScreen member={item} />
            ))}
            <Text style={{fontSize: 20, fontWeight: 600}}>루틴정보</Text>
            <View style={{alignItems: 'center'}}>
              {Routines.map(item => (
                <RoutineSimpleScreen
                  navigation={navigation}
                  id={item.routineId}
                />
                // <Text>
                //   {item.name}, {item.routineId}
                // </Text>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          mode="contained"
          buttonColor="black"
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => navigation.navigate('AddScreen', {id: id})}>
          수락
        </Button>
        <Button
          mode="contained"
          buttonColor="red"
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => navigation.navigate('CancelScreen', {id: id})}>
          거절
        </Button>
      </View>
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
    margin: 5,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
  container: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 0,
    width: '90%',
    maxHeight: 550,
    minHeight: 550,
  },
});
