import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReplyScreen({groupId, reply}) {
  console.log(reply);
  const [isMember, setIsMembe] = useState(reply.includedGroup);
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
    });
  }, []);
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
        `http://70.12.246.116:8080/group/recruit/${id}/${replyId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data;
    console.log(result);
    setChangeReply(true);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('./icon.png')} />
        <Text>{reply.userName}</Text>
        <IconButton
          icon={isMember ? 'alpha-x-circle-outline' : 'plus-circle-outline'}
          size={30}
          onPress={changeMember}
          style={styles.iconButton}
        />
      </View>
      <Text style={[styles.routineName, {marginLeft: 20}]}>
        {reply.content}
      </Text>
      <Button onPress={() => deleteReply(item.reply_id)}>댓글 삭제하기</Button>
      {/* <IconButton
        icon={isClickHeart ? 'heart' : 'heart-outline'}
        iconColor={isClickHeart ? 'red' : 'black'}
        size={40}
        onPress={clickHeart}
        style={styles.iconButton}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: 100,
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 0.5,
    marginTop: 0,
  },
  routineName: {
    fontSize: 20,
  },
});
