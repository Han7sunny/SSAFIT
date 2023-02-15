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
  const [data, setData] = useState([]);
  const [value, setValue] = useState('QA');

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
        setData(newData);
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
      <View style={styles.container}>
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
          <FlatList
            data={data.slice(0, 4)}
            renderItem={({item}) => (
              <ArticleItem id={item.boardId} title={item.title} />
            )}
          />
        </View>
      </View>

      <View style={styles.container}>
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
          <FlatList
            data={data.slice(4, 7)}
            renderItem={({item}) => (
              <TouchableOpacity
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
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
  },
});
