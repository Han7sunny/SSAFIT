import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, StyleSheet, ScrollView} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';

export default function GroupDetailScreen({navigation, route}) {
  const groupId = route.params.id;
  const [heartCnt, setHeartCnt] = useState(0);
  const [registeredTime, setRegisteredTime] = useState('');

  const [isClickHeart, setIsClickHeart] = useState(0);
  const [text, setText] = useState('');
  const [info, setInfo] = useState({});

  const [role, setRole] = useState('USER');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');

  const [Reply, setReply] = useState([]);
  const [changeReply, setChangeReply] = useState(false);
  const [isChange, setIsChange] = useState(role === 'ADMIN');
  const [Routines, setRoutines] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
      setRole(UserInfo.role);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [accessToken, groupId, changeReply]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`${ip}/group/recruit/${groupId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    console.log(data);
    setInfo(data);
    setReply(data.groupRecruitReplyList);
    setHeartCnt(data.likes);
    setIsClickHeart(data.clickLikes);
    setRoutines(data.routineList);
    const date = data.registeredTime.split('T');
    setRegisteredTime(date[0] + ' ' + date[1].substring(0, 5));
    setIsChange(role === 'ADMIN' || userId === data.userId);
    setChangeReply(false);
  };
  const clickHeart = async () => {
    const result = (
      await axios.get(`${ip}/group/recruit/${groupId}/likes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setIsClickHeart(result);
    setHeartCnt(heartCnt + (result ? 1 : -1));
  };
  const deleteRecruit = async () => {
    const result = await axios.delete(`${ip}/group/recruit/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    });
    console.log(result);
    // if (result) navigation.navigate('MyPage', {screen:'MainMyPageScreen'});
  };
  const deleteReply = isDelete => {
    console.log(isDelete);
    if (isDelete) setChangeReply(true);
  };
  const addReply = async () => {
    if (text.length === 0) return;
    const uploadReply = await axios.post(
      `${ip}/group/recruit/${groupId}/regist`,
      {
        board_id: Number(info.boardId),
        content: text,
        registered_time: new Date(),
        reply_id: Number(0),
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      },
    );
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
              navigation.navigate('CreateGroupScreen', {data: info})
            }>
            수정
          </Button>
          <Button
            mode="contained"
            buttonColor="red"
            style={styles.button}
            labelStyle={styles.label}
            onPress={deleteRecruit}>
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
          {' ' + info.title + ' '}
        </Text>
      </View>
      {/* <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 2,
            justifyContent: 'space-around',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              variant="titleLarge"
              style={{
                fontWeight: 'bold',
                borderRightWidth: 1,
                paddingRight: 5,
              }}>
              {info.userId}
            </Text>
            <Text> {registeredTime}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{'조회 ' + info.hits}</Text>
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
          <ScrollView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>모집기간 : </Text>
              <Text>
                {info.startRecruitDate} ~ {info.endRecruitDate}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>운동기간 : </Text>
              <Text>
                {info.startDate} ~ {info.endDate}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>그룹목표 : </Text>
              <Text>{info.goal}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>인원 : </Text>
              <Text>
                {info.currentMember}/{info.maximumMember} 명
              </Text>
            </View>
            <View>
              <Text style={{fontWeight: 'bold'}}>운동 루틴 </Text>
              <FlatList
                data={info.routineList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({item}) => <Text>{item.name}</Text>}
                keyExtractor={item => item.routineId}
                style={{maxHeight: 100, padding: 0, height: 100}}
              />
            </View>
            <Text
              style={{marginBottom: 20, height: 175, backgroundColor: 'blue'}}>
              {info.content}
            </Text>
          </ScrollView>
        </View>
      </View>*/}

      <View style={{alignItems: 'center'}}>
        <View
          style={[
            styles.container,
            {maxHeight: isChange ? 400 : 435, minHeight: isChange ? 400 : 435},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 2,
              justifyContent: 'space-around',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                variant="titleLarge"
                style={{
                  fontWeight: 'bold',
                  borderRightWidth: 1,
                  paddingRight: 5,
                }}>
                {info.userId}
              </Text>
              <Text> {registeredTime}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>{'조회 ' + info.hits}</Text>
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
          <ScrollView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>모집 기간</Text>
              <Text
                style={{marginLeft: 30, paddingLeft: 20, borderLeftWidth: 2}}>
                {info.startRecruitDate} ~ {info.endRecruitDate}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>운동 기간</Text>
              <Text
                style={{marginLeft: 30, paddingLeft: 20, borderLeftWidth: 2}}>
                {info.startDate} ~ {info.endDate}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>그룹 목표</Text>
              <Text
                style={{marginLeft: 30, paddingLeft: 20, borderLeftWidth: 2}}>
                {info.goal}
              </Text>
              {/* <Text
                style={{
                  marginLeft: 30,
                  paddingLeft: 20,
                  borderLeftWidth: 2,
                }}
              />
              <View
                style={{
                  borderWidth: 1,
                  width: '60%',
                  height: 20,
                  flexDirection: 'row',
                }}>
                <View style={{backgroundColor: 'red', width: `${item.goal}%`}}>
                  <Text> </Text>
                </View>
                <Text style={{paddingLeft: 15}}>{item.goal}</Text>
              </View> */}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>인원</Text>
              <Text
                style={{marginLeft: 71, paddingLeft: 20, borderLeftWidth: 2}}>
                {info.currentMember}/{info.maximumMember} 명
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>그룹 패널티</Text>
              <Text
                style={{
                  marginLeft: 12,
                  paddingLeft: 20,
                  borderLeftWidth: 2,
                  width: '65%',
                }}>
                {info.penalty}
              </Text>
            </View>
            <Text style={{fontSize: 20, fontWeight: 600}}>루틴정보</Text>
            <View style={{alignItems: 'center'}}>
              {Routines.map(item => (
                <RoutineSimpleScreen
                  navigation={navigation}
                  id={item.routineId}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      {/* <ReplyScreen reply={Reply} groupId={id} /> */}

      <FlatList
        data={Reply}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <ReplyScreen
            reply={item}
            leader={info.userId}
            groupId={groupId}
            send={deleteReply}
          />
        )}
        keyExtractor={item => item.reply_id}
      />
      <TextInput
        mode="outlined"
        label="댓글을 입력하세요"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon icon="import" onPress={addReply} />}
        style={{margin: 10}}
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
    minHeight: 435,
    maxHeight: 435,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    // margin: 20,
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
