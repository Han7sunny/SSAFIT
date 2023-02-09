import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, TextInput, IconButton, Text, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReplyScreen({groupId, reply, send}) {
  const [userId, setUserId] = useState('');
  const [isMember, setIsMembe] = useState(reply.includedGroup);
  const [role, setRole] = useState('user');
  const [accessToken, setAccessToken] = useState('');
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
  const changeMember = async () => {
    const result = await axios.post(
      `http://70.12.246.116:8080/group/recruit/${groupId}/${reply.user_id}/` +
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
    );
    if (!result) {
      console.log('error');
      return;
    }
    if (isMember) setIsMembe(false);
    else setIsMembe(true);

    console.log('click');
  };

  const deleteReply = async replyId => {
    const result = (
      await axios.delete(
        `http://70.12.246.116:8080/group/recruit/${groupId}/${reply.user_id}`,
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
          <Avatar.Icon icon="account" size={30} />
          <Text variant="titleLarge">{reply.userName}</Text>
          <IconButton
            icon={isMember ? 'alpha-x-circle-outline' : 'plus-circle-outline'}
            size={30}
            onPress={changeMember}
            style={{margin: 0}}
          />
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
    // <View style={styles.container}>
    //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //     <Image source={require('./icon.png')} />
    //     <Text>{reply.userName}</Text>
    //     <IconButton
    //       icon={isMember ? 'alpha-x-circle-outline' : 'plus-circle-outline'}
    //       size={30}
    //       onPress={changeMember}
    //       style={styles.iconButton}
    //     />
    //   </View>
    //   <Text style={[styles.routineName, {marginLeft: 20}]}>
    //     {reply.content}
    //   </Text>
    //   <Button onPress={() => deleteReply(item.reply_id)}>댓글 삭제하기</Button>
    // </View>
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
