import React, {useState, useEffect} from 'react';
import {Text, IconButton, MD3Colors, Snackbar} from 'react-native-paper';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Button from '../../components/Button';
import RoutineDetail from '../../components/RoutineDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function RoutineArticleDetailScreen({route, navigation}) {
  const [articleInfo, setArticleInfo] = useState([]);
  const [routineInfo, setRoutineInfo] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState(false);
  const [routineName, setRoutineName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  let {boardId, routineId} = route.params;
  console.log('커뮤니티 루틴 디테일 게시글 id :', boardId);
  const [ip, setIP] = useState('');
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
    });
  }, []);
  useEffect(() => {
    if (accessToken === '') return;
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
        console.log(res.data);
        setArticleInfo(res.data);
        if (res.data.userId === userId) {
          setIsUser(true);
        }
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
  }, [accessToken]);
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
  return (
    <View style={styles.container}>
      <Text> Community Routine Detail </Text>
      <Text style={styles.title}>{articleInfo.title}</Text>
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
      <View>
        <Text>{articleInfo.content}</Text>
        <View style={{flexDirection: 'row'}}>
          <IconButton
            icon={articleInfo ? heart : blackheart}
            iconColor={MD3Colors.error50}
            size={50}
          />
          <Text>좋아요 : {articleInfo.likes}</Text>
        </View>
        <Text>조회수 : {articleInfo.hits}</Text>
        <Text>공유 : {articleInfo.downloads}</Text>
      </View>

      {/* 내가 쓴 글인 경우에만 수정 및 삭제 가능 */}
      {isUser && (
        <View style={styles.delete}>
          <Button
            onPress={() =>
              navigation.navigate('CreateRoutineScreen', {
                routineInfo: routineInfo,
              })
            }>
            수정하기
          </Button>
          <Button
            onPress={() => {
              onToggleSnackBar;
              axios({
                method: 'post',
                url: `${boardId}`,
                headers: {
                  authorization: `Bearer ${accessToken}`,
                  'X-AUTH-TOKEN': `${accessToken}`,
                },
              })
                .then(res => {
                  console.log('커뮤 루틴 공유 글 삭제 : ', res.data);
                  // Alert.alert(
                  //   '알림', '글을 삭제하였습니다.', [
                  //     {text: '확인', onPress:() => navigation.reset({
                  //       index: 0,
                  //       routes: [{ name: 'RoutineListScreen'}]
                  //     })}
                  //   ]
                  // )
                })
                .catch(err => {
                  console.log(err);
                });
            }}>
            삭제하기
          </Button>
          <Snackbar
            visible={snackBarToggle}
            onDismiss={() => setSnackBarToggle(false)}
            action={{
              label: '확인',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'RoutineListScreen'}],
                });
              },
            }}>
            글을 삭제하였습니다.
          </Snackbar>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
  title: {
    fontSize: 30,
  },
  delete: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
