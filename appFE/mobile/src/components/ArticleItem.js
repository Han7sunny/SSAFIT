import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArticleItem(props) {
  const navigation = useNavigation();
  console.log(props);
  const [isClickHeart, setIsClickHeart] = useState(false);
  const [heartCnt, setIsHeartCnt] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  const [role, setRole] = useState('');
  const [ip, setIP] = useState('');
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setRole(UserInfo.role);
      setAccessToken(UserInfo.token);
    });
  }, []);

  const clickHeart = async () => {
    const data = (
      await axios.get(`http://${ip}/group/recruit/${props.id}/likes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setIsClickHeart(data);
    setIsHeartCnt(heartCnt + (data ? 1 : -1));
  };
  // console.log('Article Item : ',props.id)
  const replyNum = props.replyList;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ArticleDetailScreen', {id: props.id})
        }>
        <Text> Show Article Item </Text>
        <Text>글 번호 : {props.id}</Text>
        <Text>제목 : {props.title}</Text>
        <IconButton
          icon={isClickHeart ? 'heart' : 'heart-outline'}
          iconColor={isClickHeart ? 'red' : 'black'}
          size={20}
          onPress={clickHeart}
          style={styles.iconButton}
        />
        <Text> 좋아요 수 : {heartCnt}</Text>
        <Text>댓글 개수 : {props.replySize}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
  },
});
