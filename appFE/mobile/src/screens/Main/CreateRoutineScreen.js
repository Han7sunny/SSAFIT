import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import RoutineInput from '../../components/RoutineInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const userData = useSelector(store=>store.userData)
let exerciseList = []; // RoutineInput.js에서 사용자가 입력한 루틴 정보를 저장할 리스트
export default function CreateRoutineScreen({navigation, route}) {
  const [routineName, setRoutineName] = useState(
    data === false ? '' : route.params.data.name,
  );
  const [routineInfo, setRoutineInfo] = useState(
    data === false ? [] : route.params.data,
  );
  const [exerciseList, setExerciseList] = useState([...exerciseList]);
  const [accessToken, setAccessToken] = useState();
  const [userId, setUserId] = useState('');
  const [ip, setIP] = useState('');
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
    console.log('루틴 생성 전 확인 = ', exerciseList);
    console.log(accessToken);
    axios({
      method: 'post',
      url: `http://${ip}/routine/generate-routine`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
      data: {
        exerciseList: exerciseList,
        routineName: routineName,
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
  const [countNum, setCountNum] = useState([0]);
  const onAddRoutine = () => {
    let countArr = [...countNum];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter);
    setCountNum(countArr);
  };

  // routine 정보 주고 받을 함수
  const savedRoutine = ({sendData}) => {
    // exerciseList.push(sendData)
    setExerciseList([...exerciseList, sendData]);
    console.log('저장한 루틴 리스트 :', exerciseList);
    // console.log('======================')
  };

  return (
    <ScrollView>
      <Text> Create New Routine! </Text>
      <TextInput
        label="루틴 이름을 설정하세요!"
        value={routineName}
        onChangeText={value => {
          setRoutineName(value);
        }}
      />
      <RoutineInput countNum={countNum} routineInfo={routineInfo} />
      <IconButton icon={plus - circle - outline} onPress={onAddRoutine} />

      <Button
        mode="contained"
        onPress={() => {
          onPost();
          navigation.navigate('MyRoutineListScreen');
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
