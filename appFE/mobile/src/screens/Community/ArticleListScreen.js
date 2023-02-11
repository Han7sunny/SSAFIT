import React, {useState, useEffect} from 'react';
import {ScrollView, Text, FlatList, View, StyleSheet} from 'react-native';
import ArticleItem from '../../components/ArticleItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArticleListScreen({navigation}) {
  const [data, setData] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setAccessToken(UserInfo.token);
    });
    axios({
      method: 'get',
      url: `http://${ip}/board/QA`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(function (res) {
        // console.log(res.data)
        const newData = res.data;
        setData(newData);
        // ArticleDataAction.getArticleData({
        //   newData,
        // })
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ArticleItem
            id={item.board_id}
            title={item.title}
            replyList={item.replyList}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
});
