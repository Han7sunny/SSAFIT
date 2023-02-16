import React, {useState, useEffect} from 'react';
import {Text, IconButton} from 'react-native-paper';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import Button from '../../components/Button';
import RoutineDetail from '../../components/RoutineDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const images = [
  '',
  require(`../images/스쿼트.png`),
  require(`../images/런지.png`),
  require(`../images/팔굽혀펴기.png`),
  require(`../images/플랭크.png`),
  '',
  require(`../images/딥스.png`),
  require(`../images/벤치프레스.png`),
  require(`../images/파이크푸쉬업.png`),
  '',
  require(`../images/덤벨프레스.png`),
  require(`../images/윗몸일으키기.png`),
  '',
  '',
  require(`../images/데드리프트.png`),
  require(`../images/사이드플랭크.png`),
  require(`../images/바이시클크런치.png`),
  require(`../images/턱걸이.png`),
  require(`../images/덤벨로우.png`),
  require(`../images/이두.png`),
  require(`../images/삼두.png`),
  require(`../images/줄넘기.png`),
  '',
  '',
  require(`../images/팔벌려높이뛰기.png`),
  require(`../images/다리찢기.png`),
  require(`../images/몸접기.png`),
];

export default function RoutineDetailScreen({route}) {
  const id = route.params.id;
  const [item, setItem] = useState({});
  const [exercises, setExercises] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [ip, setIP] = useState('');
  const [image, setImage] = useState('');
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
    console.log('id', id);
    axios
      .get(`${ip}/routine/get-exercise-info/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
      .then(res => {
        console.log('routine detail : ', res.data);
        setItem(res.data);
        setExercises(res.data.exerciseInfoList);
      })
      .catch(err => console.log(err));
  }, [id, accessToken]);

  function addTodayRoutine() {
    axios({
      method: 'post',
      url: `${ip}/routine/add-routine`,
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
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium">{item.routineName}</Text>

      <IconButton
        // mode="contained"
        icon="plus-circle-outline"
        onPress={() => {
          addTodayRoutine, console.log('오늘의 운동으로 추가');
        }}
      />
      {exercises.map(item => (
        <View>
          <View style={styles.separator} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>운동 부위</Text>
                <Text
                  style={{marginLeft: 50, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.exerciseArea} - {item.exerciseTypeName}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>세트 수</Text>
                <Text
                  style={{marginLeft: 63, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.exerciseSet} {' 세트'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>세트별 횟수</Text>
                <Text
                  style={{marginLeft: 37, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.reps}
                  {' 회'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>세트별 쉬는 시간</Text>
                <Text
                  style={{marginLeft: 8, paddingLeft: 20, borderLeftWidth: 2}}>
                  {item.restTimeMinutes} : {item.restTimeSeconds}
                </Text>
              </View>
            </View>
            {/* {console.log(images[item.exerciseId])} */}

            <Image
              source={images[item.exerciseId]}
              style={{width: 70, height: 70, backgroundColor: 'white'}}
            />
          </View>
        </View>
      ))}
      <Button
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CreateRoutineScreen',
            params: {routineInfo: routineInfo},
          })
        }>
        수정하기
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
  title: {
    fontSize: 30,
  },
});
