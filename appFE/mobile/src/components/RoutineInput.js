import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import TextInput from './TextInput';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Trouble issue : 이 컴포넌트를 재 렌더링 시, 이전 컴포넌트의 값이 그대로 들어옴
//                 즉, useState로 세팅해 둔 초기값이 적용이 안됨.

const exerciseArea = [
  '전신',
  '하체',
  '가슴',
  '코어',
  '어깨',
  '등',
  '팔',
  '전신',
  '스트레칭',
];
// let exerciseList = []

export default function RoutineInput({countNum, routineInfo}) {
  // const [routineName, setRoutineName] = useState('')
  const [exerciseId, setExerciseId] = useState(
    routineInfo === false ? '' : routineInfo.exerciseId,
  );
  const [exerciseSet, setExerciseSet] = useState(
    routineInfo === false ? '' : routineInfo.exerciseSet,
  );
  const [exerciseList, setExerciseList] = useState([]);
  const [reps, setReps] = useState(
    routineInfo === false ? '' : routineInfo.reps,
  );
  const [restTimeMinutes, setRestTimeMinutes] = useState(
    routineInfo === false ? '' : routineInfo.restTimeMinutes,
  );
  const [restTimeSeconds, setRestTimeSeconds] = useState(
    routineInfo === false ? '' : routineInfo.restTimeMinutes,
  );
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
  }, []);
  const setRepsChangeHandler = e => {
    e.persist();
    setReps(e.nativeEvent.text);
  };
  const exerciseSetChangeHandler = e => {
    e.persist();
    setExerciseSet(e.nativeEvent.text);
  };
  const restTimeMinutesChangeHandler = e => {
    e.persist();
    setRestTimeMinutes(e.nativeEvent.text);
  };
  const restTimeSecondsChangeHandler = e => {
    e.persist();
    setRestTimeSeconds(e.nativeEvent.text);
    // console.log('마지막 data :', data)
  };

  let data = {
    exerciseId: exerciseId,
    exerciseSet: exerciseSet,
    reps: reps,
    restTimeMinutes: restTimeMinutes,
    restTimeSeconds: restTimeSeconds,
    name: 'exercise',
  };
  let sendData = undefined;

  return (
    <View>
      {countNum &&
        countNum.map((item, i) => (
          <View key={i} style={styles.container}>
            {/* <TextInput
            onChangeText={(text) => setRoutineName(text)}
            placeholder= "루틴 이름을 설정하세요!"
            // maxLength="20"
            // onEndEditing={() => {data.push(routineName), console.log(0, data)}}
          /> */}
            <SelectList
              data={exerciseArea}
              save="key"
              setSelected={key => setExerciseId(key)}
              inputStyles={{color: '#000'}}
              dropdownTextStyles={{color: '#000'}}
              onSelect={key => {
                // text represented after item is selected
                // console.log(selectedItem)
                console.log(exerciseId);
                axios({
                  method: 'get',
                  url: `${ip}/exercise/get-exercise-type?area=${exerciseId}`,
                  headers: {
                    authorization: `Bearer ${accessToken}`,
                    'X-AUTH-TOKEN': `${accessToken}`,
                  },
                }).then(function (res) {
                  console.log('어떤 운동 종류가 ㅣㅇㅆ는댝', res.data);
                  let rawData = [];
                  res.data.forEach(element => {
                    rawData.push({
                      key: element.exerciseTypeId,
                      value: element.exerciseTypeName,
                    });
                  });
                  setExerciseList(rawData);
                  // console.log(exerciseList)
                });
              }}
              placeholder="운동 부위 선택"
            />
            <SelectList
              inputStyles={{color: '#000'}}
              dropdownTextStyles={{color: '#000'}}
              data={exerciseList}
              save="key"
              setSelected={value => {
                setExerciseId(value), console.log(exerciseId);
              }}
              placeholder="운동 종류 선택"
            />
            <TextInput
              label="세트 횟수"
              value={exerciseSet}
              onChange={value => exerciseSetChangeHandler(value)}
              inputMode="numeric"
              returnKeyType="next"
              // onEndEditing={() => {data.push(exerciseSet), console.log(2, data)}}
            />
            <TextInput
              label="운동 횟수"
              value={reps}
              onChange={value => setRepsChangeHandler(value)}
              keyboardType="number-pad"
              returnKeyType="next"
              // onEndEditing={() => {data.push(reps), console.log(3, data)}}
            />
            <TextInput
              label="휴식 시간 (분)"
              value={restTimeMinutes}
              onChange={value => restTimeMinutesChangeHandler(value)}
              keyboardType="number-pad"
              returnKeyType="next"
              // onEndEditing={() => {data.push(restTimeMinutes), console.log(4, data)}}
            />
            <TextInput
              label="휴식 시간 (초)"
              value={restTimeSeconds}
              onChange={value => restTimeSecondsChangeHandler(value)}
              keyboardType="number-pad"
              returnKeyType="done"
              // onEndEditing={() => {sendData = data, console.log('sendData : ', sendData)}}
              onEndEditing={() => {
                (sendData = data), routineInfo({sendData});
              }}
            />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 2,
  },
});
