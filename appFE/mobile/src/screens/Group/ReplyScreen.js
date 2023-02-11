import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, TextInput, IconButton, Text, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReplyScreen({groupId, reply, leader, send}) {
  const [userId, setUserId] = useState('');
  const [isMember, SetIsMember] = useState(reply.includedGroup); // 0: 비회원, 1: 회원, 2: 대기중
  const [role, setRole] = useState('user');
  const [accessToken, setAccessToken] = useState('');
  const [text, setText] = useState(reply.content);
  const [isClick, setIsCkick] = useState(false);
  const [isChange, setIsChange] = useState(
    role === 'ADMIN' || userId === reply.user_id || userId === leader,
  );
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
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
  const changeMember = async () => {
    const result = (
      await axios.post(
        `http://${ip}/group/recruit/${groupId}/${reply.user_id}/` +
          (isMember ? 'delete' : 'add'),
        {
          acceptInvitation: isMember ? false : true,
          groupId: groupId,
          userId: reply.user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data;
    console.log(result);

    if (isMember === 0 && result) SetIsMember(1);
    else if (isMember === 1 && !result) SetIsMember(0);
  };

  const deleteReply = async () => {
    const result = (
      await axios.delete(
        `http://${ip}/group/recruit/${groupId}/${reply.reply_id}`,
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
        `http://${ip}/notice/${reply.board_id}/${reply.reply_id}`,
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
          <Avatar.Icon icon="account" size={30} />
          <Text variant="titleLarge">{reply.userName}</Text>
          {userId !== leader && (
            <IconButton
              icon={
                isMember === 0
                  ? 'plus-circle-outline'
                  : isMember === 1
                  ? 'alpha-x-circle-outline'
                  : 'minus-circle-outline'
              }
              size={30}
              onPress={changeMember}
              style={{margin: 0}}
            />
          )}
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
