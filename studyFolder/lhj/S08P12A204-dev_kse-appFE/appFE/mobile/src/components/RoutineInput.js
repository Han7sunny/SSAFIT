import React, { useState, Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import TextInput from './TextInput'
import SelectDropdown from 'react-native-select-dropdown'

const categories = ["squat", "push-up", "lunge", "burpee"]

export default function RoutineInput(props) {

  const [exercise, setExercise] = useState('')
  const [number, setNumber] = useState(0)

  return (
    <View>
      {props.countNum && props.countNum.map((item, i) => (
        <View key={i} style={styles.container}>
          <SelectDropdown 
            data={categories}
            onSelect={(selectedItem, index) => setExercise({ exercise: selectedItem })}
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
              value={number.value}
              onChangeNumber={(number) => setNumber({ value: number, error: ''})}
              keyboardType="number-pad"
              returnKeyType="done"
            />
          <TextInput 
            label="운동 횟수"
            value={number.value}
            onChangeNumber={(number) => setNumber({ value: number, error: ''})}
            keyboardType="number-pad"
            returnKeyType="done"
          />
          <TextInput 
            label="세트 별 쉬는시간"
            value={number.value}
            onChangeNumber={(number) => setNumber({ value: number, error: ''})}
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