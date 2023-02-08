import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';

export default function GroupDetailScreen({route}) {
  const id = route.params.id;
  const my = {memberid: 'lhj', isMember: false, userId: 'test123'};
  const [heartCnt, setIsHeartCnt] = useState(0);
  const [isClickHeart, setIsClickHeart] = useState(0);
  const [text, setText] = useState('');
  const [item, setItem] = useState({});
  // useState({"achievementRate": 0, "boardId": 0, "categoryId": 0, "clickLikes": false, "content": "내용 바꿈ㅋㅋ", "currentMember": 2, "downloads": 0, "endDate": "2023-03-07", "endRecruitDate": null, "fileList": null, "goal": 89.24, "groupId": 1, "groupMemberList": [{"acceptInvitation": false, "achievementRate": 0, "groupId": 1, "groupMemberId": 2, "on_off": false, "userId": "test123", "userName": "test123"}], "groupName": "공주들", "groupRecruitReplyList": [{"board_id": 1, "content": "저를 받아주십시오.", "includedGroup": false, "msg": null, "registered_time": "2023-02-06T00:55:18.777+00:00", "reply_id": 1, "success": true, "userName": "test456", "user_id": "test456"}], "hits": 10, "likes": 0, "maximumMember": 5, "modifiedTime": "2023-02-06T11:21:30.166614", "msg": null, "penalty": "대가리 박박 밀기", "period": 5, "registeredTime": "2023-02-06T09:38:04.421357", "replyList": null, "replySize": 1, "routineId": 0, "routineList": [{"name": "루틴 1 _ test22", "routineId": 3}], "sharePost": true, "startDate": "2023-03-03", "startRecruitDate": null, "success": true, "title": "제목도 바꿔부러", "userId": "test1xoa", "userName": null});
  const [Reply, setReply] = useState([]);
  useEffect(async () => {
    const data = (
      await axios.get(`http://70.12.246.116:8080/group/recruit/${id}`)
    ).data;
    console.log(data);
    setItem(data);
    setReply(data.groupRecruitReplyList);
    setIsHeartCnt(data.likes);
    setIsClickHeart(data.clickLikes);
  }, []);
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
      await axios.delete(`http://70.12.246.116:8080/group/recruit/${id}`)
    ).data;
    if (result) navigation.navigate('MainMyPageScreen');
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
    );
    // setReply(Reply.push({memberid: my.memberid, commentText: text, isMember: my.isMember}));
    console.log(uploadReply);
    // setReply((await axios.get('http://70.12.246.116:8080/group/recruit/'+id)).data.groupRecruitReplyList);
    setText('');
  };

  const deleteReply = async replyId => {
    const result = (
      await axios.delete(
        `http://70.12.246.116:8080/group/recruit/${id}/${replyId}`,
      )
    ).data;
  };

  return (
    <View style={{flex: 1}}>
      <Text variant="headlineLarge" style={{fontWeight: 'bold', marginTop: 10}}>
        {' '}
        {item.title}{' '}
      </Text>
      <View style={{margin: 20}}>
        <Title style={{fontSize: 25}}> {item.name} </Title>
        <Text style={[styles.box, {fontSize: 15, alignItems: 'flex-end'}]}>
          <Title style={{fontSize: 15}}> 인원 </Title>
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
      <FlatList
        data={Reply}
        ItemSeparatorComponent={() => <View />}
        renderItem={({item}) => {
          <View>
            <ReplyScreen reply={item} groupId={id} />
            <Button onPress={() => deleteReply(item.reply_id)}>
              댓글 삭제하기
            </Button>
          </View>;
        }}
        keyExtractor={item => item.id}
        style={{flex: 2}}
      />
      <View>
        <TextInput
          label="댓글을 입력하세요"
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
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 8,
    backgroundColor: 'aliceblue',
    maxHeight: 400,
  },
  box: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
});
