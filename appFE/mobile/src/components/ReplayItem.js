import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ReplyItem(props) {
  return (
    <View style={styles.container}>
      <Text> 댓글 컴포넌트 </Text>
      <Text> {props.id} : {props.content} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5
  }
})