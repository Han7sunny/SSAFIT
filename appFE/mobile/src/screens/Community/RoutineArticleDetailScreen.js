import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  IconButton,
  MD3Colors,
  Snackbar,
} from 'react-native-paper';
import RoutineDetail from '../../components/RoutineDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ReplyScreen from './ReplyScreen';

export default function RoutineArticleDetailScreen({route, navigation}) {
  let {boardId, routineId} = route.params;
  console.log('커뮤니티 루틴 디테일 게시글 id :', boardId);
  const [articleInfo, setArticleInfo] = useState([]);
  const [routineInfo, setRoutineInfo] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState(false);
  const [routineName, setRoutineName] = useState('');

  const [heartCnt, setHeartCnt] = useState(0);
  const [isClickHeart, setIsClickHeart] = useState(false);
  const [text, setText] = useState('');
  const [registeredTime, setRegisteredTime] = useState('');
  const [isChange, setIsChange] = useState(role === 'ADMIN');

  const [role, setRole] = useState('USER');
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
      url: `http://${ip}/board/${boardId}`,
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
      })
      .catch(err => {
        console.log(err);
      });

    // 루틴 디테일 정보 가져오기
    axios({
      method: 'get',
      url: `http://${ip}/routine/get-exercise-info/${routineId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(function (response) {
        console.log('community routine detail : ', response.data);
        setRoutineName(response.data.routineName);
        setRoutineInfo(response.data.exerciseInfoList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken, boardId, routineId, changeReply]);
  const onToggleSnackBar = () => setSnackBarToggle(true);
  function addToMyRoutine() {
    axios({
      method: 'post',
      url: `http://${ip}/routine/add-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
      data: {
        routineId: routineId,
        userId: userId,
      },
    })
      .then(res => {
        console.log('response :', res.data);
      })
      .catch(err => {
        console.log('에러');
      });
  }

  const clickHeart = async () => {
    const result = (
      await axios.get(`http://${ip}/board/${boardId}/likes`, {
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
      await axios.delete(`http://${ip}/board/${boardId}`, {
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
          onPress: () => navigation.navigate('CommunityScreen', {change: true}),
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
        `http://${ip}/board/${boardId}/regist`,
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
    <View>
      {isChange && (
        <View style={{flexDirection: 'row'}}>
          <Button
            mode="contained"
            buttonColor="black"
            style={styles.button}
            labelStyle={styles.label}
            onPress={() =>
              navigation.navigate('CreateArticleScreen', {data: articleInfo})
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
        <Text variant="titleLarge" style={{fontWeight: 'bold', marginTop: 10}}>
          {articleInfo.title}
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
              {articleInfo.userId}
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
        <View>
          <Text>내용</Text>
          <Text>{articleInfo.content}</Text>
        </View>
        <View>
          <IconButton
            // mode="contained"
            icon="plus-circle-outline"
            onPress={() => {
              addToMyRoutine, console.log('나의 루틴에 추가');
            }}
          />
          <FlatList
            data={routineInfo}
            renderItem={({item}) => (
              <RoutineDetail
                exerciseTypeName={item.exerciseTypeName}
                exerciseArea={item.exerciseArea}
                exerciseSet={item.exerciseSet}
                reps={item.reps}
                restTimeMinutes={item.restTimeMinutes}
                restTimeSeconds={item.restTimeSeconds}
                name={item.name}
              />
            )}
          />
        </View>
      </View>
      <View>
        <Text variant="titleLarge">댓글</Text>
        <FlatList
          data={articleInfo.replyList}
          style={{height: 220}}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <ReplyScreen reply={item} send={deleteReply} />
          )}
          keyExtractor={item => item.reply_id}
        />
      </View>
      <TextInput
        label="댓글을 입력하세요"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon icon="import" onPress={addReply} />}
      />
    </View>

    // <View style={styles.container}>
    //   <Text> Community Routine Detail </Text>
    //   <Text style={styles.title}>{articleInfo.title}</Text>
    //   <IconButton
    //     // mode="contained"
    //     icon="plus-circle-outline"
    //     onPress={() => {
    //       addToMyRoutine, console.log('나의 루틴에 추가');
    //     }}
    //   />
    //   <FlatList
    //     data={routineInfo}
    //     renderItem={({item}) => (
    //       <RoutineDetail
    //         exerciseTypeName={item.exerciseTypeName}
    //         exerciseArea={item.exerciseArea}
    //         exerciseSet={item.exerciseSet}
    //         reps={item.reps}
    //         restTimeMinutes={item.restTimeMinutes}
    //         restTimeSeconds={item.restTimeSeconds}
    //         name={item.name}
    //       />
    //     )}
    //   />
    //   <View>
    //     <Text>{articleInfo.content}</Text>
    //     <View style={{flexDirection: 'row'}}>
    //       <IconButton
    //         icon={articleInfo ? 'heart' : 'blackheart'}
    //         iconColor={MD3Colors.error50}
    //         size={50}
    //       />
    //       <Text>좋아요 : {articleInfo.likes}</Text>
    //     </View>
    //     <Text>조회수 : {articleInfo.hits}</Text>
    //     <Text>공유 : {articleInfo.downloads}</Text>
    //   </View>

    //   {/* 내가 쓴 글인 경우에만 수정 및 삭제 가능 */}
    //   {isUser && (
    //     <View style={styles.delete}>
    //       <Button
    //         onPress={() =>
    //           navigation.navigate('CreateRoutineScreen', {
    //             routineInfo: routineInfo,
    //           })
    //         }>
    //         수정하기
    //       </Button>
    //       <Button
    //         onPress={() => {
    //           onToggleSnackBar;
    //           axios({
    //             method: 'post',
    //             url: `${boardId}`,
    //             headers: {
    //               authorization: `Bearer ${accessToken}`,
    //               'X-AUTH-TOKEN': `${accessToken}`,
    //             },
    //           })
    //             .then(res => {
    //               console.log('커뮤 루틴 공유 글 삭제 : ', res.data);
    //               // Alert.alert(
    //               //   '알림', '글을 삭제하였습니다.', [
    //               //     {text: '확인', onPress:() => navigation.reset({
    //               //       index: 0,
    //               //       routes: [{ name: 'RoutineListScreen'}]
    //               //     })}
    //               //   ]
    //               // )
    //             })
    //             .catch(err => {
    //               console.log(err);
    //             });
    //         }}>
    //         삭제하기
    //       </Button>
    //       <Snackbar
    //         visible={snackBarToggle}
    //         onDismiss={() => setSnackBarToggle(false)}
    //         action={{
    //           label: '확인',
    //           onPress: () => {
    //             navigation.reset({
    //               index: 0,
    //               routes: [{name: 'RoutineListScreen'}],
    //             });
    //           },
    //         }}>
    //         글을 삭제하였습니다.
    //       </Snackbar>
    //     </View>
    //   )}
    // </View>
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
    Height: 370,
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
