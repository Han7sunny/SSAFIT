import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {IconButton, Text, TextInput, Button} from 'react-native-paper';
import RoutineInput from '../../components/RoutineInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const userData = useSelector(store=>store.userData)
export default function CreateRoutineScreen({navigation, route}) {
  // const data = route.params.data;
  const [routineName, setRoutineName] = useState(
    '',
    // data === false ? '' : route.params.data.name,
  );
  // let exerciseLists = []; // RoutineInput.js에서 사용자가 입력한 루틴 정보를 저장할 리스트
  const [exerciseLists, setExerciseLists] = useState([false]);
  const [accessToken, setAccessToken] = useState();
  const [userId, setUserId] = useState('');
  const [ip, setIP] = useState('');
  const routineInfo = sendData => {
    const arr = exerciseLists;
    if (!arr.at(-1)) arr.splice(-1, 1);
    arr.push(sendData);
    setExerciseLists(arr);
    console.log('저장한 루틴 리스트 :', arr);
  };
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      // console.log(UserInfo)
      setAccessToken(UserInfo.token);
      setUserId(UserInfo.id);
    });
  }, []);
  // axios 요청 보낼 함수
  function onPost() {
    if (accessToken === '') return;
    // let setExercise = [...new Set(exerciseLists)];
    console.log('se', setExercise);
    axios({
      method: 'post',
      url: `${ip}/routine/generate-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
      data: {
        exerciseList: setExercise,
        routineName: `${routineName}`,
        userId: userId,
        routineId: 0,
      },
    })
      .then(function (response) {
        console.log('==== 루틴 생성 성공 ======');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('==== 루틴 생성 실패 ======');
        console.log(error);
      });
  }

  // RoutineInput 컴포넌트 추가 코드
  const onAddRoutine = () => {
    const arr = [...exerciseLists, false];
    setExerciseLists(arr);
    console.log('asd', arr);
  };

  return (
    <ScrollView>
      <TextInput
        mode="outlined"
        label="루틴 이름을 설정하세요!"
        value={routineName}
        onChangeText={text => {
          setRoutineName(text);
        }}
      />
      {exerciseLists.map(item => (
        <RoutineInput routineInfo={item} func={routineInfo} />
      ))}

      <IconButton
        style={{marginHorizontal: '50%'}}
        size={20}
        onPress={onAddRoutine}
        icon="plus-outline"
      />

      <Button
        mode="contained"
        buttonColor="#29b6f6"
        onPress={() => {
          onPost();
          navigation.navigate('Home', {screen: 'MyRoutineListScreen'});
          // navigator 인덱스 초기화하기
        }}>
        저장하기
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 5,
  },
});
