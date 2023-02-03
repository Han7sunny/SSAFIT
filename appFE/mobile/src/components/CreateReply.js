import axios from 'axios'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import TextInput from './TextInput'

export default function CreateReply(props) {
  const [reply, setReply] = useState('')
  function postReplay() {
    return (
      axios({
        method: 'post',
        url: `http://70.12.246.102:8080/reply/regist`,
        headers: {
          authorization: `${33346456}`
        },
        data: {
          "board_id": props.board_id,
          "content": reply,
          "registered_time": "2023-02-03T07:31:36.127Z",
          "reply_id": 0,
          "user_id": "asdf1234"
        }
      })
      .then(function (res) {
        console.log('댓글 post 성공')
      })
      .then(function (err) {
        console.log('댓글 post 실패',err)
      })
    )
  }

  return (
    <View>
      <Text> 댓글 입력 컴포넌트</Text>
      <TextInput 
        label="댓글을 입력하세요"
        onChangeText={(text) => setReply(text)}
      />
      <Button
        onPress={postReplay()}
      >
        댓글 작성하기
      </Button>
    </View>
  )
}