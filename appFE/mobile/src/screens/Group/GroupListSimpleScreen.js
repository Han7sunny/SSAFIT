import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Modal, IconButton, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GroupSearchScreen({navigation, item}) {
  const [isClickHeart, setIsClickHeart] = useState(item.clickLikes);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [heartCnt, setIsHeartCnt] = useState(item.likes);
  const [accessToken, setAccessToken] = useState('');
  const showModal = () => setIsOpenModal(true);
  const hideModal = () => setIsOpenModal(false);
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
    });
  }, []);
  const clickHeart = async () => {
    const result = (
      await axios.get(
        `http://70.12.246.116:8080/group/recruit/${item.groupId}/likes`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data;
    setIsClickHeart(result);
    setIsHeartCnt(heartCnt + (result ? 1 : -1));
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GroupListDetailScreen', {id: item.groupId})
      }>
      <View
        style={[
          styles.container,
          {
            flex: 1,
            flexDirection: 'row',
            padding: 10,
            flex: 1,
            height: 150,
            alignContent: 'space-around',
          },
        ]}>
        <View style={{flex: 3}}>
          <Text style={styles.box}>{item.title}</Text>
          <Text style={styles.box}>{item.content}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
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
            <View style={{flexDirection: 'row'}}>
              <IconButton
                icon="message-reply-text-outline"
                size={40}
                style={styles.iconButton}
              />
              <Text>
                {item.groupRecruitReplyList
                  ? item.groupRecruitReplyList.length
                  : 0}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={[styles.box, {flex: 1, fontSize: 15, alignItems: 'flex-end'}]}>
          {item.currentMember}/{item.maximumMember} 명
        </Text>
      </View>
      <Modal visible={isOpenModal} onDismiss={hideModal}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    maxWidth: 380,
    alignSelf: 'center',
  },
  box: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
});
