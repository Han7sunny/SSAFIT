import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import TextInput from './TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateReply(props) {
  const [reply, setReply] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  // console.log('게시글 번호:', props)
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  }, []);
  const onPost = () => {
    axios({
      method: 'post',
      url: `${ip}/board/${props.boardId}/regist`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
      data: {
        board_id: props.boardId,
        content: reply,
        registered_time: '',
        reply_id: 0,
        user_id: `${userId}`,
      },
    })
      .then(res => {
        console.log('댓글 post 성공');
      })
      .then(err => {
        console.log('댓글 post 실패 :', err);
      });
  };
  return (
    <View style={styles.container}>
      <Text> 댓글 입력 컴포넌트</Text>
      <TextInput
        label="댓글을 입력하세요"
        value={reply}
        onChangeText={value => setReply(value)}
      />
      <Button onPress={() => onPost()}>댓글 작성하기</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'space-between',
  },
});
