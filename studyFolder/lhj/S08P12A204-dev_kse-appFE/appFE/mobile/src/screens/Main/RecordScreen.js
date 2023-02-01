import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'

export default function RecordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text> OOO님의 운동 기록 </Text>
      </TouchableOpacity>
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
  }
})