import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Modal, IconButton, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GroupSearchScreen({navigation, item}) {
  console.log(navigation, item);
  const [isClickHeart, setIsClickHeart] = useState(item.clickLikes);
  const [heartCnt, setIsHeartCnt] = useState(item.likes);
  const [accessToken, setAccessToken] = useState('');
  const [state, setState] = useState(false);
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
    });
    // console.log(isClickHeart, heartCnt, accessToken, state);
  }, []);
  const clickHeart = async () => {
    const result = (
      await axios.get(`${ip}/group/recruit/${item.groupId}/likes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    // console.log(result);
    setIsClickHeart(result);
    setIsHeartCnt(heartCnt + (result ? 1 : -1));
    if (result) setState(!state);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          flex: 1,
          minHeight: 180,
          maxHeight: 250,
          alignContent: 'space-around',
          color: 'black',
        },
      ]}
      onPress={() => {
        navigation.navigate('GroupListDetailScreen', {
          id: item.groupId,
          state: state,
        });
      }}>
      <View style={{flex: 5}}>
        <Text
          variant="headlineSmall"
          style={{fontWeight: 'bold', color: 'black'}}>
          {item.title}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', color: 'black'}}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>모집기간 : </Text>
          <Text style={{color: 'black'}}>
            {item.startRecruitDate} ~ {item.endRecruitDate}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', color: 'black'}}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>운동기간 : </Text>
          <Text style={{color: 'black'}}>
            {item.startDate} ~ {item.endDate}
          </Text>
        </View>
        <Text variant="titleMedium" style={{color: 'black'}}>
          {item.content}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              icon={isClickHeart ? 'heart' : 'heart-outline'}
              iconColor={isClickHeart ? 'red' : 'black'}
              size={40}
              onPress={clickHeart}
              style={styles.iconButton}
            />
            <Text variant="titleLarge" style={{color: 'black'}}>
              {heartCnt}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              icon="message-reply-text-outline"
              iconColor="black"
              size={40}
              style={styles.iconButton}
            />
            <Text variant="titleLarge" style={{color: 'black'}}>
              {item.replySize ? item.replySize : 0}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={[styles.box, {flex: 1, fontSize: 15, alignItems: 'flex-end'}]}>
        {item.currentMember}/{item.maximumMember} 명
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 8,
    backgroundColor: 'aliceblue',
    maxHeight: 400,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    maxWidth: 380,
    alignSelf: 'center',
  },
  box: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
});
