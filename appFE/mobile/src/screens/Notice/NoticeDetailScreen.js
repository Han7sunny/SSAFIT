import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoticeDetailScreen({navigation, route}) {
  const id = route.params.id;
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('USER1');
  const [accessToken, setAccessToken] = useState('');
  const [Notices, setNotices] = useState([]);
  const [changeReply, setChangeReply] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setRole(UserInfo.role);
      setAccessToken(UserInfo.token);
    });
  }, []);
  const getData = async () => {
    const data = (
      await axios.get(`http://70.12.246.116:8080/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setNotices(data);
    setChangeReply(false);
  };
  useEffect(() => {
    getData();
  }, [id, changeReply]);
  const deleteReply = isDelete => {
    console.log(isDelete);
    if (isDelete) setChangeReply(true);
  };
  const deleteNotice = async () => {
    const data = (
      await axios.delete(`http://70.12.246.116:8080/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (data) navigation.navigate('NoticeListScreen', {change: true});
  };
  const addReply = async () => {
    if (text.length === 0) return;
    const data = (
      await axios.post(
        `http://70.12.246.116:8080/notice/${id}/regist`,
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
              onPress={() => {
                navigation.navigate('AddNoticeScreen', {data: Notices});
              }}>
              수정
            </Button>
            <Button
              mode="contained"
              buttonColor="red"
              style={styles.button}
              labelStyle={styles.label}
              onPress={deleteNotice}>
              삭제
            </Button>
          </View>
        )}
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text>작성일자 - </Text>
          <Text>{Notices.modifiedTime}</Text>
        </View>
        <View>
          <Text>내용</Text>
          <Text>{Notices.content}</Text>
        </View>
      </View>
      <View>
        <Text>댓글</Text>
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
    width: 70,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
