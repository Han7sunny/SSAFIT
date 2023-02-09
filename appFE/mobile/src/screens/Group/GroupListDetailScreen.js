import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GroupDetailScreen({route}) {
  const id = route.params.id;
  const [heartCnt, setIsHeartCnt] = useState(0);
  const [isClickHeart, setIsClickHeart] = useState(0);
  const [text, setText] = useState('');
  const [item, setItem] = useState({});

  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [Reply, setReply] = useState([]);
  const [changeReply, setChangeReply] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
    getData();
  }, []);
  const getData = async () => {
    const data = (
      await axios.get(`http://70.12.246.116:8080/group/recruit/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    // console.log(data);
    setItem(data);
    setReply(data.groupRecruitReplyList);
    setIsHeartCnt(data.likes);
    setIsClickHeart(data.clickLikes);
    setChangeReply(false);
  };
  useEffect(() => {
    getData();
  }, [id, changeReply]);
  const clickHeart = async () => {
    const data = await axios.get(
      `http://70.12.246.116:8080/group/recruit/${id}/likes`,
    ).data;
    setIsClickHeart(data);
    setIsHeartCnt(heartCnt + (data ? 1 : -1));
  };
  const deleteRecruit = async () => {
    const result = (
      await axios.delete(`http://70.12.246.116:8080/group/recruit/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (result) navigation.navigate('MainMyPageScreen');
  };
  const deleteReply = isDelete => {
    console.log(isDelete);
    if (isDelete) setChangeReply(true);
  };
  const addReply = async () => {
    // console.log(text)
    if (text.length === 0) return;
    // console.log(text);
    const uploadReply = await axios.post(
      `http://70.12.246.116:8080/group/recruit/${id}/regist`,
      {
        board_id: Number(item.boardId),
        content: text,
        registered_time: '2023-02-07T02:01:16.776Z',
        reply_id: Number(0),
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      },
    );
    // console.log(uploadReply);
    setChangeReply(true);
    setText('');
  };
  console.log('hi: ', heartCnt, isClickHeart, text, item, Reply);
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
          {' '}
          {item.title}{' '}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            mode="contained"
            buttonColor="black"
            style={styles.button}
            labelStyle={styles.label}
            onPress={{}}>
            수정
          </Button>
          <Button
            mode="contained"
            buttonColor="red"
            style={styles.button}
            labelStyle={styles.label}
            onPress={deleteRecruit}>
            삭제
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={{fontSize: 25}}> {item.name} </Text>
        <Text style={[styles.box, {fontSize: 15, alignItems: 'flex-end'}]}>
          <Text style={{fontSize: 15}}> 인원 </Text>
          {item.currentMember}/{item.maximumMember} 명
        </Text>
        <Text style={{marginBottom: 20}}>{item.content}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={isClickHeart ? 'heart' : 'heart-outline'}
            iconColor={isClickHeart ? 'red' : 'black'}
            size={40}
            onPress={clickHeart}
            style={styles.iconButton}
          />
          <Text>{heartCnt}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('./comment.png')} />
        <Text>{Reply ? Reply.length : 0}</Text>
      </View>
      {/* <ReplyScreen reply={Reply} groupId={id} /> */}
      <FlatList
        data={Reply}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          // console.log(item);
          <View>
            <ReplyScreen reply={item} groupId={id} send={deleteReply} />
          </View>
        )}
        keyExtractor={item => item.reply_id.toString()}
        style={{height: 115, padding: 0}}
      />
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
    minHeight: 400,
    maxHeight: 400,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 20,
  },
  box: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
});
