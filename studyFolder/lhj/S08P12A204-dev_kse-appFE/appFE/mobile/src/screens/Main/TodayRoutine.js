import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TodayRoutine() {
  return(
    <View style={styles.container}>
      <Text>Today's Routine</Text>
      {/* axios로 오늘의 운동 루틴을 가져와야 하는가? 아니면 props로 받을 것인지 */}
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