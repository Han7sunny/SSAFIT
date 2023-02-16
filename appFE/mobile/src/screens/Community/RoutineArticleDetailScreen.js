import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert, ScrollView} from 'react-native';
import {Text, Button, TextInput, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ReplyScreen from './ReplyScreen';
import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';

export default function RoutineArticleDetailScreen({route, navigation}) {
  let {boardId} = route.params;
  console.log('커뮤니티 루틴 디테일 게시글 id :', boardId);
  const [articleInfo, setArticleInfo] = useState([]);
  const [routineId, setRoutineId] = useState(0);

  const [heartCnt, setHeartCnt] = useState(0);
  const [isClickHeart, setIsClickHeart] = useState(false);
  const [text, setText] = useState('');
  const [registeredTime, setRegisteredTime] = useState('');

  const [role, setRole] = useState('USER');
  const [isChange, setIsChange] = useState(role === 'ADMIN');
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [ip, setIP] = useState('');
  const [changeReply, setChangeReply] = useState(false);
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setAccessToken(UserInfo.token);
      setUserId(UserInfo.id);
      setRole(UserInfo.role);
    });
  }, []);
  useEffect(() => {
    if (accessToken === '') return;
    setChangeReply(false);
    // 게시글 디테일 정보 가져오기
    axios({
      method: 'get',
      url: `${ip}/board/${boardId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('------', res.data);
        setArticleInfo(res.data);
        setHeartCnt(res.data.likes);
        setIsClickHeart(res.data.clickLikes);
        const date = res.data.registeredTime.split('T');
        setRegisteredTime(date[0] + ' ' + date[1].substring(0, 5));
        setIsChange(role === 'ADMIN' || res.data.userId === userId);
        setRoutineId(res.data.routineId);
      })
      .catch(err => {
        console.log(err);
      });
  }, [accessToken, boardId, changeReply]);
  function addToMyRoutine() {
    axios({
      method: 'post',
      url: `${ip}/routine/add-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
      data: {
        routineId: routineId,
      },
    })
      .then(res => {
        console.log('response :', res.data);
        console.log('나의 루틴에 추가');
        // Alert.alert("알림","나의 루틴에 추가되었습니다.", [{text: "확인"}])
      })
      .catch(err => {
        console.log('에러', err);
      });
  }

  const clickHeart = async () => {
    const result = (
      await axios.get(`${ip}/board/${boardId}/likes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setIsClickHeart(result);
    setHeartCnt(heartCnt + (result ? 1 : -1));
  };

  const deleteArticle = async () => {
    const data = (
      await axios.delete(`${ip}/board/${boardId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (data) {
      Alert.alert(`글 삭제 성공`, `${articleInfo.title} 글을 삭제하셨습니다.`, [
        {
          text: '확인',
          onPress: () =>
            navigation.navigate('CommunityScreen', {
              community: 'shareRoutine',
              state: true,
            }),
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
        `${ip}/board/${boardId}/regist`,
        {
          board_id: Number(boardId),
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
    console.log(data);
    setChangeReply(true);
    setText('');
  };

  return (
    <ScrollView>
      {isChange && (
        <View style={{flexDirection: 'row'}}>
          <Button
            mode="contained"
            buttonColor="black"
            style={styles.button}
            labelStyle={styles.label}
            onPress={() =>
              navigation.navigate('CreateArticleScreen', {
                data: articleInfo,
                categoryId: 3,
              })
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
                `현재 글은 ${articleInfo.title} 입니다.`,
                [
                  {
                    text: '아니요',
                    style: 'cancel',
                  },
                  {
                    text: '네',
                    onPress: () => deleteArticle(),
                  },
                ],
              )
            }>
            삭제
          </Button>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="titleLarge"
          style={{fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>
          {articleInfo.title}
        </Text>
      </View>
      <View
        style={[
          styles.container,
          {maxHeight: isChange ? 335 : 370, minHeight: isChange ? 335 : 370},
        ]}>
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
              {articleInfo.userName}
            </Text>
            <Text> {registeredTime}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{'조회  ' + articleInfo.hits}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconButton
                icon={isClickHeart ? 'heart' : 'heart-outline'}
                iconColor={isClickHeart ? 'red' : 'black'}
                size={20}
                onPress={clickHeart}
                style={styles.iconButton}
              />
              <Text>{heartCnt}</Text>
            </View>
          </View>
        </View>
        <View style={{maxHeight: 330, minHeight: 330}}>
          <ScrollView>
            <Text style={{margin: 10, paddingBottom: 20}}>
              {articleInfo.content}
            </Text>
            <View>
              <Button onPress={() => addToMyRoutine()}>루틴 퍼가기</Button>
              <View style={{alignItems: 'center'}}>
                <RoutineSimpleScreen navigation={navigation} id={routineId} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View>
        {/* <Text variant="titleLarge">댓글</Text> */}
        <FlatList
          data={articleInfo.replyList}
          // style={{height: 220}}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <ReplyScreen reply={item} send={deleteReply} />
          )}
          keyExtractor={item => item.reply_id}
          style={{margin: 10}}
        />
      </View>
      <TextInput
        mode="outlined"
        placeholder="댓글을 입력하세요"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon icon="import" onPress={addReply} />}
        style={{
          margin: 10,
          backgroundColor: 'white',
          borderRadius: 20,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      />
    </ScrollView>
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
    maxHeight: 370,
    minHeight: 370,
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
  title: {
    fontSize: 30,
  },
  delete: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
