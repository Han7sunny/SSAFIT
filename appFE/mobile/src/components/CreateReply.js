import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'
import TextInput from './TextInput'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function CreateReply(props) {
  const [reply, setReply] = useState('')
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  
  AsyncStorage.getItem('username', (err,result) => {
    const UserInfo = JSON.parse(result)
    setUserId(UserInfo.id)
    setAccessToken(UserInfo.token)
  })
  const postReply = () => {
    axios({
      method: 'post',
      url: `http://70.12.246.102:8080/board/${props.board_id}/regist`,
      headers: {
        authorization: `${accessToken}`
      },
      data: {
        "board_id": props.board_id,
        "content": reply,
        "registered_time": "",
        "reply_id": 0,
        "user_id": `${userId}`
      }
    })
    .then((res) => {
      console.log('댓글 post 성공')
    })
    .then((err) => {
      console.log('댓글 post 실패 :',err)
    })
  }

  return (
    <View style={styles.container}>
      <Text> 댓글 입력 컴포넌트</Text>
      <TextInput 
        label="댓글을 입력하세요"
        onChangeText={(text) => {setReply(text), console.log(reply)}}
      />
      <Button
        onPress={() => postReply()}
      >
        댓글 작성하기
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "space-between"
  }
})