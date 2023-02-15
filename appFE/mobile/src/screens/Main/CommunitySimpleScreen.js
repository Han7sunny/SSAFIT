import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import ArticleItem from '../../components/ArticleItem';
import RoutineListItem from '../../components/RoutineListItem';
import axios from 'axios';
import {ArticleDataAction} from '../../redux/actions/actionCreators';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 함수형 컴포넌트 내에 setState 코드를 작성하면 무한 렌더링 현상이 발생

export default function CommunitySimpleScreen({navigation}) {
  const [QA, setQA] = useState([]);
  const [shareRoutine, setShareRoutine] = useState([]);

  const [accessToken, setAccessToken] = useState('');
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
    });
  }, []);
  useEffect(() => {
    if (accessToken === '') return;
    axios({
      method: 'get',
      url: `${ip}/board/`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(function (res) {
        console.log(res.data);
        const newData = res.data;
        setQA(newData.slice(0, 4));
        setShareRoutine(newData.slice(4, 7));
        ArticleDataAction.getArticleData({
          newData,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [accessToken]);
  // const articleData = state => state.articleData

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Community', {
              screen: 'CommunityScreen',
              params: {
                community: 'QA',
                state: false,
              },
            })
          }>
          <Text style={styles.title}> 질문 게시판 </Text>
        </TouchableOpacity>
        <View>
          {QA.length > 0 &&
            QA.map(item => <ArticleItem data={item} key={item.boardId} />)}
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Community', {
              screen: 'CommunityScreen',
              params: {
                community: 'shareRoutine',
                state: false,
              },
            })
          }>
          <Text style={styles.title}>
            {' 다른 유저의 운동 루틴을 살펴보세용! '}
          </Text>
        </TouchableOpacity>
        <View>
          {shareRoutine.length > 0 &&
            shareRoutine.map(item => (
              <TouchableOpacity
                style={styles.container}
                key={item.boardId}
                onPress={() =>
                  navigation.navigate('Community', {
                    screen: 'RoutineArticleDetailScreen',
                    params: {
                      boardId: item.boardId,
                      routineId: item.routineId,
                    },
                  })
                }>
                <RoutineListItem routineId={item.routineId} name={item.title} />
                <Text>조회수 : {item.hits}</Text>
                <Text>공유수 : {item.downloads}</Text>
                <Text>좋아요 : {item.likes}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    justifyContent: 'center',
    borderWidth: 2,
    // marginVertical: 30,
    borderRadius: 5,
    marginBottom: 2,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
  },
});
