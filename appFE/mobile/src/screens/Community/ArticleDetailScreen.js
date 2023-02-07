import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import ReplyItem from '../../components/ReplayItem'
import CreateReply from '../../components/CreateReply'

export default function ArticleDetailScreen({ route }) {
  const [articleData, setArticleData] = useState([])
  const [replyData, setReplyData] = useState([])
  // console.log('==== Now in [ArticleDetailScreen] : ', route.params.id)
  useEffect(()=> {
    axios({
      method: 'get',
      url: `http://70.12.246.116:8080/board/${route.params.id}`,
    })
    .then((res) => {
      setArticleData(res.data)
      setReplyData(res.data.replyList)
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
          board_id={articleData.board_id}
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