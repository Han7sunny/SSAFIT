import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, Alert} from 'react-native';
import {Text, TextInput, IconButton, Button} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArticleDetailScreen({navigation, route}) {
  const id = route.params.id;
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  const [role, setRole] = useState('USER');

  const [heartCnt, setHeartCnt] = useState(0);
  const [isClickHeart, setIsClickHeart] = useState(false);
  const [text, setText] = useState('');
  const [articleData, setArticleData] = useState([]);
  const [registeredTime, setRegisteredTime] = useState('');
  const [changeReply, setChangeReply] = useState(false);
  const [isChange, setIsChange] = useState(false);
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
    axios
      .get(`${ip}/board/${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
      .then(res => {
        console.log('------', res.data);
        setArticleData(res.data);
        setHeartCnt(res.data.likes);
        setIsClickHeart(res.data.clickLikes);
        const date = res.data.registeredTime.split('T');
        setRegisteredTime(date[0] + ' ' + date[1].substring(0, 5));
        setIsChange(role === 'ADMIN' || userId === res.data.userId);
        console.log(
          '------------',
          role,
          userId,
          role === 'ADMIN' || userId === res.data.userId,
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, [accessToken, id, changeReply]);
  useEffect(() => {}, [isChange]);

  const clickHeart = async () => {
    const result = (
      await axios.get(`${ip}/board/${id}/likes`, {
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
      await axios.delete(`${ip}/board/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (data) {
      Alert.alert(`글 삭제 성공`, `${articleData.title} 글을 삭제하셨습니다.`, [
        {
          text: '확인',
          onPress: () =>
            navigation.navigate('Community', {
              screen: 'CommunityScreen',
              params: {
                community: 'QA',
                state: true,
              },
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
        `${ip}/board/${id}/regist`,
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
    console.log(data);
    setChangeReply(true);
    setText('');
  };

  return (
    <View>
      {isChange && (
        <View style={{flexDirection: 'row'}}>
          <Button
            mode="contained"
            buttonColor="black"
            style={styles.button}
            labelStyle={styles.label}
            onPress={() =>
              navigation.navigate('Community', {
                screen: 'CreateArticleScreen',
                params: {
                  data: articleData,
                  categoryId: 2,
                },
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
                `현재 글은 ${articleData.title} 입니다.`,
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
        <Text variant="titleLarge" style={{fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>
          {articleData.title}
        </Text>
      </View>
      <View style={[styles.container, {height: isChange ? 335 : 370}]}>
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
              {articleData.userId}
            </Text>
            <Text> {registeredTime}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{'조회  ' + articleData.hits}</Text>
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
        <View style={{ margin: 10}}>
          {/* <Text>내용</Text> */}
          <Text>{articleData.content}</Text>
        </View>
      </View>
      <View>
        {/* <Text variant="titleLarge">댓글</Text> */}
        <FlatList
          data={articleData.replyList}
          // style={{height: 220}}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <ReplyScreen reply={item} send={deleteReply} />
          )}
          keyExtractor={item => item.reply_id}
        />
      </View>
      <TextInput
        mode="outlined"
        label="댓글을 입력하세요"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon icon="import" onPress={addReply} />}
        style={{ margin: 10 }}
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
});
