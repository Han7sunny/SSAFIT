import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GroupDetailScreen({route}) {
  const id = route.params.id;
  const my = {memberid: 'lhj', isMember: false, userId: 'test123'};
  const [heartCnt, setIsHeartCnt] = useState(0);
  const [isClickHeart, setIsClickHeart] = useState(0);
  const [text, setText] = useState('');
  const [item, setItem] = useState({});

  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  // useState({"achievementRate": 0, "boardId": 0, "categoryId": 0, "clickLikes": false, "content": "내용 바꿈ㅋㅋ", "currentMember": 2, "downloads": 0, "endDate": "2023-03-07", "endRecruitDate": null, "fileList": null, "goal": 89.24, "groupId": 1, "groupMemberList": [{"acceptInvitation": false, "achievementRate": 0, "groupId": 1, "groupMemberId": 2, "on_off": false, "userId": "test123", "userName": "test123"}], "groupName": "공주들", "groupRecruitReplyList": [{"board_id": 1, "content": "저를 받아주십시오.", "includedGroup": false, "msg": null, "registered_time": "2023-02-06T00:55:18.777+00:00", "reply_id": 1, "success": true, "userName": "test456", "user_id": "test456"}], "hits": 10, "likes": 0, "maximumMember": 5, "modifiedTime": "2023-02-06T11:21:30.166614", "msg": null, "penalty": "대가리 박박 밀기", "period": 5, "registeredTime": "2023-02-06T09:38:04.421357", "replyList": null, "replySize": 1, "routineId": 0, "routineList": [{"name": "루틴 1 _ test22", "routineId": 3}], "sharePost": true, "startDate": "2023-03-03", "startRecruitDate": null, "success": true, "title": "제목도 바꿔부러", "userId": "test1xoa", "userName": null});
  const [Reply, setReply] = useState([]);
  const [changeReply, setChangeReply] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  });
  useEffect(() => {
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
    };
    getData();
    setChangeReply(false);
  }, [id, changeReply]);
  const clickHeart = async () => {
    const data = await axios.get(
      `http://70.12.246.116:8080/group/recruit/${id}/likes`,
    ).data;
    setIsClickHeart(data);
    setIsHeartCnt(heartCnt + (data ? 1 : -1));
    console.log(data);
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
    console.log(result);
  };

  const addReply = async () => {
    // console.log(text)
    if (text.length === 0) return;
    console.log(text);
    const uploadReply = await axios.post(
      `http://70.12.246.116:8080/group/recruit/${id}/regist`,
      {
        board_id: Number(item.boardId),
        content: text,
        registered_time: '2023-02-07T02:01:16.776Z',
        reply_id: Number(0),
        user_id: my.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      },
    );
    console.log(uploadReply);
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
        <View style={{flexDirection: 'row'}}>
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
      <View style={{flexDirection: 'row', alignContent: 'center'}}>
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
            <ReplyScreen reply={item} groupId={id} />
          </View>
        )}
        keyExtractor={item => item.reply_id.toString()}
        style={{height: 115, padding: 0}}
      />
      <View>
        <TextInput
          label="댓글을 입력하세요"
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button onPress={addReply}>댓글 작성하기</Button>
      </View>
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
