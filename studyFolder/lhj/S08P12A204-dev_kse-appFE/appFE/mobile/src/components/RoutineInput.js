import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import TextInput from './TextInput'
import SelectDropdown from 'react-native-select-dropdown'

// Trouble issue : 이 컴포넌트를 재 렌더링 시, 이전 컴포넌트의 값이 그대로 들어옴
//                 즉, useState로 세팅해 둔 초기값이 적용이 안됨.

const categories = ["squat", "push-up", "lunge", "burpee"]

export default function RoutineInput({countNum, routineInfo}) {
  const [exercise, setExercise] = useState('')
  const [number, setNumber] = useState(0)
  const [setNum, setSetNum] = useState(0)
  const [relaxTime, setRelaxTime] = useState(0)
  const setNumChangeHandler = (e) => {
    e.persist()
    console.log('들어오는 값: ', e.nativeEvent.text)
    setSetNum(Number(e.nativeEvent.text))
    console.log('setNum :', setNum)
  }
  const numberChangeHandler = (e) => {
    e.persist()
    setNumber(Number(e.nativeEvent.text))
  }
  const relaxTimeChangeHandler = (e) => {
    e.persist()
    setRelaxTime(Number(e.nativeEvent.text))
    console.log(countNum[0])
    console.log('data :', data)
  }
  let data = [exercise.value, setNum, number, relaxTime]
  routineInfo({data})
  return (
    <View>
      {countNum && countNum.map((item, i) => (
        <View key={i} style={styles.container}>
          <SelectDropdown 
            data={categories}
            onSelect={(selectedItem, index) => setExercise({ value: selectedItem })}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              return item
            }}
            defaultButtonText="운동 부위 선택"
          />
          <TextInput 
            label="세트 횟수"
            value={setNum}
            onChange={(value) => setNumChangeHandler(value)}
            keyboardType="number-pad"
            returnKeyType="next"
          />
          <TextInput
            label="운동 횟수"
            // value={number}
            onChange={(number) => numberChangeHandler( number )}
            keyboardType="number-pad"
            returnKeyType="next"
          />
          <TextInput 
            label="세트 별 쉬는시간"
            // value={relaxTime}
            onChange={(relaxTime) => relaxTimeChangeHandler(relaxTime)}
            keyboardType="number-pad"
            returnKeyType="done"
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