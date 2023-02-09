import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import {Button, IconButton, MD3Colors, Text, Avatar} from 'react-native-paper';
import MemberScreen from './MemberScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyGroupSimple({navigation, route}) {
  const id = route.params.id;

  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('USER1');
  const [accessToken, setAccessToken] = useState('');
  const [item, setItem] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setRole(UserInfo.role);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    console.log(id);
    const getData = async () => {
      const data = (
        await axios.get(`http://70.12.246.116:8080/group/` + Number(id), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        })
      ).data;
      setItem(data);
      console.log(data);
    };
    getData();
  }, [id]);
  const deleteGroup = async () => {
    const result = (
      await axios.delete(`http://70.12.246.116:8080/group/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-AUTH-TOKEN': `${token}`,
        },
      })
    ).data;
    if (result) navigation.navigate('MainMyPageScreen');
  };
  return (
    <View>
      <Text
        variant="displayLarge"
        style={{fontWeight: 'bold', margin: 20, marginBottom: 0}}>
        {item.name}
      </Text>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./icon.png')}
            style={{width: 70, height: 70, margin: 10}}
          />
          <View>
            <Text style={{fontSize: 30, fontWeight: 600}}>닉네임</Text>
            <Text>sfg</Text>
          </View>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 600}}>운동 기간</Text>
          <Text>
            {item.start_date} ~ {item.end_date}
          </Text>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 600}}>그룹 목표</Text>
          <Text>{item.goal}</Text>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 600}}>그룹 패널티</Text>
          <Text>{item.penalty}</Text>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 600}}>그룹 달성률</Text>
          <Text>{item.totalResult}</Text>
        </View>

        <Text style={{fontSize: 20, fontWeight: 600}}>그룹원</Text>
        <FlatList
          data={item.groupMemberList}
          style={{height: 290}}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => <MemberScreen member={item} />}
          keyExtractor={item => item.userName.toString()}
        />
      </View>
      <Button
        mode="contained"
        buttonColor="red"
        style={styles.button}
        labelStyle={styles.label}
        onPress={deleteGroup}>
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
    minHeight: 550,
    maxHeight: 550,
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
