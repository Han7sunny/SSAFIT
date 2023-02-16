import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton, MD3Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import RoutineSimpleScreen from '../screens/Routine/RoutineSimpleScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RoutineListItem(props) {
  const navigation = useNavigation();
  const data = props.data;
  console.log('data', data);
  const [isClickHeart, setIsClickHeart] = useState(data.clickHeart);
  const [heartCnt, setHeartCnt] = useState(data.likes);
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');

  const date = data.registeredTime.split('T');

  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result);
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setAccessToken(UserInfo.token);
    });
  }, []);

  const clickHeart = async () => {
    const result = (
      await axios.get(`${ip}/board/${data.boardId}/likes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setIsClickHeart(result);
    setHeartCnt(heartCnt + (result ? 1 : -1));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Community', {
            screen: 'RoutineArticleDetailScreen',
            params: {
              boardId: data.boardId,
              routineId: data.routineId,
            },
          })
        }>
        <Text variant="titleMedium">{data.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{date[0] + ' ' + date[1].substring(0, 5)}</Text>
          <View style={[styles.center, {marginRight: 25}]}>
            <View style={styles.center}>
              <IconButton
                icon={isClickHeart ? 'heart' : 'heart-outline'}
                iconColor={isClickHeart ? 'red' : 'black'}
                size={20}
                onPress={clickHeart}
                style={styles.iconButton}
              />
              <Text>{heartCnt}</Text>
            </View>
            <View style={styles.center}>
              <IconButton
                icon="message-reply-text-outline"
                size={20}
                style={styles.iconButton}
              />
              <Text>{data.replySize}</Text>
            </View>
            <View style={styles.center}>
              <IconButton
                icon="cursor-default-click-outline"
                size={20}
                style={styles.iconButton}
              />
              <Text>{data.hits}</Text>
            </View>
            <View style={styles.center}>
              <IconButton icon="download" size={20} style={styles.iconButton} />
              <Text>{data.downloads}</Text>
            </View>
          </View>
        </View>
        <RoutineSimpleScreen id={data.routineId} />
      </TouchableOpacity>
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
  routineName: {
    fontSize: 20,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
