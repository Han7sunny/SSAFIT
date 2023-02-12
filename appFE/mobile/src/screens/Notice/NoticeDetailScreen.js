import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import {TextInput, Text, Button, IconButton} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoticeDetailScreen({navigation, route}) {
  const id = route.params.id;
  const [Notices, setNotices] = useState([]);
  const [changeReply, setChangeReply] = useState(false);
  const [text, setText] = useState('');
  const [registeredTime, setRegisteredTime] = useState('');

  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('USER1');
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
      setRole(UserInfo.role);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [accessToken, id, changeReply]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`http://${ip}/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;

    console.log(data);
    setNotices(data);
    setChangeReply(false);
    const date = data.registeredTime.split('T');
    setRegisteredTime(date[0] + ' ' + date[1].substring(0, 5));
  };

  const deleteNotice = async () => {
    const data = (
      await axios.delete(`http://${ip}/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (data) {
      Alert.alert(`글 삭제 성공`, `${Notices.title} 글을 삭제하셨습니다.`, [
        {
          text: '확인',
          onPress: () =>
            navigation.navigate('NoticeListScreen', {change: true}),
        },
      ]);
    }
  };
  const deleteReply = isDelete => {
    console.log(isDelete);
    if (isDelete) setChangeReply(true);
  };
  const addReply = async () => {
    if (text.length === 0) return;
    const data = (
      await axios.post(
        `http://${ip}/notice/${id}/regist`,
        {
          board_id: Number(id),
          content: text,
          reply_id: Number(0),
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data;
    setChangeReply(true);
    setText('');
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="headlineLarge"
          style={{fontWeight: 'bold', marginTop: 10}}>
          {Notices.title}
        </Text>
        {role === 'ADMIN' && (
          <View style={{flexDirection: 'row'}}>
            <Button
              mode="contained"
              buttonColor="black"
              style={styles.button}
              labelStyle={styles.label}
              onPress={() =>
                navigation.navigate('AddNoticeScreen', {data: Notices})
              }>
              수정
            </Button>
            <Button
              mode="contained"
              buttonColor="red"
              style={styles.button}
              labelStyle={styles.label}
              onPress={() =>
                Alert.alert(
                  `해당 글을 삭제하시겠습니까?`,
                  `현재 글은 ${Notices.title} 입니다.`,
                  [
                    {
                      text: '아니요',
                      style: 'cancel',
                    },
                    {
                      text: '네',
                      onPress: () => deleteNotice(),
                    },
                  ],
                )
              }>
              삭제
            </Button>
          </View>
        )}
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 2,
            justifyContent: 'space-around',
            height: 40,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              variant="titleLarge"
              style={{
                fontWeight: 'bold',
                borderRightWidth: 1,
                paddingRight: 5,
              }}>
              {Notices.userId}
            </Text>
            <Text> {registeredTime}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{'조회 ' + Notices.hits}</Text>
          </View>
        </View>
        <View>
          <Text>내용</Text>
          <Text>{Notices.content}</Text>
        </View>
      </View>
      <View>
        <Text variant="titleLarge">댓글</Text>
        <FlatList
          data={Notices.replyList}
          style={{height: 220}}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <ReplyScreen reply={item} send={deleteReply} />
          )}
          keyExtractor={item => item.reply_id}
        />
      </View>
      <TextInput
        label="댓글을 입력하세요"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon icon="import" onPress={addReply} />}
      />
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
    minHeight: 370,
    maxHeight: 370,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 10,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
