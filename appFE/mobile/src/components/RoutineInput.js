import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import TextInput from './TextInput'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios'

// Trouble issue : 이 컴포넌트를 재 렌더링 시, 이전 컴포넌트의 값이 그대로 들어옴
//                 즉, useState로 세팅해 둔 초기값이 적용이 안됨.

const exerciseArea = ["전신", "상체", "하체",]
let exerciseList = []

export default function RoutineInput({countNum, routineInfo}) {
  // const [routineName, setRoutineName] = useState('')
  const [exerciseId, setExerciseId] = useState(0)
  const [exerciseSet, setExerciseSet] = useState(0)
  const [reps, setReps] = useState(0)
  const [restTimeMinutes, setRestTimeMinutes] = useState(0)
  const [restTimeSeconds, setRestTimeSeconds] = useState(0)

  const setRepsChangeHandler = (e) => {
    e.persist()
    setReps(Number(e.nativeEvent.text))
  }
  const exerciseSetChangeHandler = (e) => {
    e.persist()
    setExerciseSet(Number(e.nativeEvent.text))
  }
  const restTimeMinutesChangeHandler = (e) => {
    e.persist()
    setRestTimeMinutes(Number(e.nativeEvent.text))
  }
  const restTimeSecondsChangeHandler = (e) => {
    e.persist()
    setRestTimeSeconds(Number(e.nativeEvent.text))
    // console.log('마지막 data :', data)
  }

  let data = {"exerciseId": exerciseId.value, "exerciseSet": exerciseSet, "reps": reps, "restTimeMinutes": restTimeMinutes, "restTimeSeconds": restTimeSeconds, "name": ""}
  let sendData = undefined

  return (
    <View>
      {countNum && countNum.map((item, i) => (
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
            setSelected={(key) => setExerciseId(key)}
            onSelect={(key) => {
              // text represented after item is selected
              // console.log(selectedItem)
              console.log(exerciseId)
              axios({
                method: 'get',
                url: `http://70.12.246.102:8080/exercise/get-exercise-type?area=${exerciseId}`
              })
              .then(function (res){
                console.log('어떤 운동 종류가 ㅣㅇㅆ는댝',res.data)
                const rawData = res.data
                rawData.forEach(element => {
                  exerciseList.push({key: element.exerciseTypeId, value: element.exerciseTypeName})
                })
                console.log(exerciseList)
              })
              }}
            placeholder="운동 부위 선택"
          />
          <SelectList 
            data={exerciseList}
            save="key"
            setSelected={(value) => setExerciseId(value)}
            placeholder="운동 종류 선택"
          />
          <TextInput
            label="세트 횟수"
            value={exerciseSet}
            onChange={(value) => exerciseSetChangeHandler( value )}
            inputMode="numeric"
            returnKeyType="next"
            // onEndEditing={() => {data.push(exerciseSet), console.log(2, data)}}
          />
          <TextInput 
            label="운동 횟수"
            value={reps}
            onChange={(value) => setRepsChangeHandler(value)}
            keyboardType="number-pad"
            returnKeyType="next"
            // onEndEditing={() => {data.push(reps), console.log(3, data)}}
          />
          <TextInput 
            label="휴식 시간 (분)"
            value={restTimeMinutes}
            onChange={(value) => restTimeMinutesChangeHandler(value)}
            keyboardType="number-pad"
            returnKeyType="next"
            // onEndEditing={() => {data.push(restTimeMinutes), console.log(4, data)}}
          />
          <TextInput 
            label="휴식 시간 (초)"
            value={restTimeSeconds}
            onChange={(value) => restTimeSecondsChangeHandler(value)}
            keyboardType="number-pad"
            returnKeyType="done"
            // onEndEditing={() => {sendData = data, console.log('sendData : ', sendData)}}
            onEndEditing={() => {sendData = data, routineInfo({sendData})}}
          />
      </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 2
  },
})