import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Pressable, Alert} from 'react-native';
import {Button, IconButton, MD3Colors, Text, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';

export default function MainMyPageScreen({navigation, route}) {
  // console.log(route.params);
  const [photo, setPhoto] = useState('null');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [changeState, setChangeState] = useState(false);
  const [infos, setInfos] = useState(undefined);

  const groups = [
    {id: 0, name: '유현준'},
    {id: 1, name: '송경삼'},
    {id: 2, name: '강권우'},
    {id: 3, name: '김성은'},

    {id: 4, name: '한선희'},
    {id: 4, name: '한선희'},
    {id: 4, name: '한선희'},
  ];
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setUserId(UserInfo.id);
      setRole(UserInfo.role);
      setAccessToken(UserInfo.token);
      setPhoto(UserInfo.imageUri);
      console.log(UserInfo.token);
      console.log(photo);
    });
  }, [route.params]);
  useEffect(() => {
    getData();
  }, [accessToken, changeState, route.params]);

  const getData = async () => {
    if (accessToken === '') return;
    console.log(ip, accessToken);
    const data = (
      await axios.get(`http://${ip}/user/get-mypage`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setInfos(data);
    console.log('data', data);
    setChangeState(false);
    setPhoto(`data:image/png;base64,${data.myImage}`);
  };

  const deleteUser = async () => {
    const result = (
      await axios.delete(`http://${ip}/user/user_delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    if (result) navigation.navigate('LoginScreen');
  };
  const deleteNotification = async id => {
    const result = (
      await axios.delete(
        `http://${ip}/notification/delete-notification/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data;
    if (result) setChangeState(true);
  };
  return (
    <View>
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <View style={{width: 100, height: 100}}>
          <Avatar.Image
            size={100}
            source={
              photo === 'null' ? require('../Group/icon.png') : {uri: photo}
            }
            style={{backgroundColor: '#fff'}}
          />
          <IconButton
            icon="plus-circle-outline"
            size={35}
            style={{
              bottom: 45,
              right: -55,
              zIndex: 1,
              backgroundColor: 'white',
              padding: 5,
            }}
            onPress={() =>
              navigation.navigate('ChangeImageScreen', {uri: photo})
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            margin: 0,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', margin: 0}}>
            {infos === undefined ? '' : infos.name + ' 님'}
          </Text>
          <IconButton
            icon="cog"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          />
        </View>
      </View>
      <View>
        <IconButton
          icon={
            infos !== undefined && infos.groupInvitationList.length > 0
              ? 'bell'
              : 'bell-outline'
          }
          size={40}
          iconColor={groups.length > 0 ? 'yellow' : ''}
          // onPress={() => deleteNotification()}
        />
        <Text>그룹</Text>
        <View style={styles.container}>
          <FlatList
            data={infos !== undefined && infos.groupInvitationList}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  deleteNotification(item.notificationId);
                  // navigation.navigate('AddGroupScreen', {id: item.groupId})
                }}>
                <Text variant="titleMedium">{item.notificationMessage}</Text>
              </Pressable>
            )}
            keyExtractor={item => item.notificationId.toString()}
          />
        </View>
      </View>
      <View>
        <IconButton
          icon={
            infos !== undefined && infos.notificationList.length > 0
              ? 'bell'
              : 'bell-outline'
          }
          size={40}
          iconColor={groups.length > 0 ? 'yellow' : ''}
          // onPress={() => deleteNotification()}
        />
        <View style={styles.container}>
          <FlatList
            data={infos !== undefined && infos.notificationList}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  // deleteNotification(item.notificationId);
                  {
                    switch (item.notification_type) {
                      case 1:
                        navigation.navigate('AddGroupScreen', {id: item.id});
                        break; // 커뮤니티글 댓글
                      case 2:
                        navigation.navigate('GroupListDetailScreen', {
                          id: item.groupId,
                          state: state,
                        });
                        break; // 그룹모집글 댓글
                      case 3:
                        navigation.navigate('NoticeDetailScreen', {
                          id: item.boardId,
                        });
                        break; // 공지글 댓글
                      case 4:
                        navigation.navigate('AddGroupScreen', {id: item.id});
                        break; // 운동 안한경우
                    }
                  }
                  // navigation.navigate('AddGroupScreen', {id: item.id})
                }}>
                <Text variant="titleMedium">{item.notificationMessage}</Text>
              </Pressable>
            )}
            keyExtractor={item => item.notificationId.toString()}
          />
        </View>
      </View>

      <Button
        mode="contained"
        buttonColor="red"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() =>
          Alert.alert('회원 탈퇴확인', `회원 탈퇴를 하시겠습니까?.`, [
            {
              text: '아니요',
              style: 'cancel',
            },
            {
              text: '네',
              onPress: () => deleteUser(),
            },
          ])
        }>
        회원 탈퇴
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'black',
    height: 1,
  },
  container: {
    marginTop: 8,
    backgroundColor: 'aliceblue',
    minHeight: 200,
    maxHeight: 200,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 20,
  },
  box: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
  button: {
    width: 350,
    height: 50,
    // marginTop: 150,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
});
