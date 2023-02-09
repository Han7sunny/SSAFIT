import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReplyScreen({reply, send}) {
  const [userId, setUserId] = useState('12sd');
  const [accessToken, setAccessToken] = useState('');
  const [role, setRole] = useState('user');
  const [text, setText] = useState(reply.content);
  const [isClick, setIsCkick] = useState(false);
  const [isChange, setIsChange] = useState(
    role === 'ADMIN' || userId === reply.user_id,
  );
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
      setRole(UserInfo.role);
      setUserId(UserInfo.id);
      setIsChange(UserInfo.role === 'ADMIN' || UserInfo.id === reply.user_id);
    });
  }, []);
  const click = () => {
    setText(reply.content);
    setIsCkick(true);
  };
  const deleteReply = async () => {
    const result = (
      await axios.delete(
        `http://70.12.246.116:8080/notice/${reply.board_id}/${reply.reply_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data;
    if (result) send(true);
  };

  const changeReply = async () => {
    const result = (
      await axios.put(
        `http://70.12.246.116:8080/notice/${reply.board_id}/${reply.reply_id}`,
        {
          board_id: Number(reply.board_id),
          content: text,
          reply_id: Number(reply.reply_id),
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
    setIsCkick(false);
  };

  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <View
        style={{
          alignContent: 'center',
          width: isChange ? '85%' : '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
          }}>
          <Image source={require('../Group/icon.png')} />
          <Text>{reply.user_id}</Text>
        </View>
        {!isClick && (
          <Text style={[styles.routineName, {marginLeft: 20}]}>{text}</Text>
        )}
        {isClick && (
          <TextInput
            value={text}
            onChangeText={text => setText(text)}
            right={<TextInput.Icon icon="import" onPress={changeReply} />}
          />
        )}
      </View>
      {isChange && (
        <View>
          <Button
            mode="text"
            style={styles.button}
            labelStyle={styles.label}
            onPress={click}>
            수정
          </Button>
          <Button
            mode="text"
            style={styles.button}
            labelStyle={styles.label}
            onPress={deleteReply}>
            삭제
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 0.5,
  },
  routineName: {
    fontSize: 20,
  },
  button: {
    width: '10%',
    height: 35,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    verticalAlign: 'top',
  },
});
