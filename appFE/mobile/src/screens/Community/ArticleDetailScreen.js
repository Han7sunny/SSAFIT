import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import ReplyItem from '../../components/ReplayItem'
import CreateReply from '../../components/CreateReply'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ArticleDetailScreen({ route }) {
  const [articleData, setArticleData] = useState([])
  const [replyData, setReplyData] = useState([])
  const [accessToken, setAccessToken] = useState('')
  const [boardId, setBoardId] = useState(0)
  // console.log('==== Now in [ArticleDetailScreen] : ', route.params.id)
  useEffect(()=> {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      setAccessToken(UserInfo.token)
    })
    axios({
      method: 'get',
      url: `http://70.12.246.116:8080/board/${route.params.id}`,
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
    })
    .then((res) => {
      console.log(res.data)
      setArticleData(res.data)
      setReplyData(res.data.replyList)
      setBoardId(res.data.boardId)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{articleData.title}</Text>
        <Text> 등록 시간 : {articleData.registeredTime}</Text>
        <Text> 수정 시간 : {articleData.modifiedTime}</Text>
        <Text> 조회수 : {articleData.hits}</Text>
        <Text> 좋아요 : {articleData.likes}</Text>
        <Text> 내용 : {articleData.content}</Text>
      </View>
      <View>
        <CreateReply 
          boardId={boardId}
        />
      </View>
      <FlatList 
        data={replyData}
        renderItem={({item}) => (
          <ReplyItem
            id={item.board_id}
            content={item.content}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent:"center",
    textAlign: "center"
  },
  title: {
    fontSize: 25
  },
})