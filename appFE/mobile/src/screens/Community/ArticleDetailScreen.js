import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, FlatList, View } from 'react-native'
import ReplyItem from '../../components/ReplayItem'
import CreateReply from '../../components/CreateReply'

export default function ArticleDetailScreen({ route }) {
  // console.log('==== Now in [ArticleDetailScreen] : ', route.params.id)
  axios({
    method: 'get',
    url: `http://70.12.246.116:8080/board/${route.params.id}`,
  })
  .then((res) => {
    console.log('디테일~~~~~~~~~~~~~~~~')
    const articleData = res.data
    console.log('아티클데이터:' ,articleData)
    // const replayList = articleData.replayList
    console.log(articleData.replyList)
  })
  .catch((err) => {
    console.log(err)
  })

  return (
    <View>
      <View>
        <Text>{this.articleData.title}</Text>
        <Text>{this.articleData.registeredTime}</Text>
        <Text>{this.articleData.modifiedTime}</Text>
        <Text>{this.articleData.hits}</Text>
        <Text>{this.articleData.likes}</Text>
        <Text>{this.articleData.content}</Text>
      </View>
      <View>
        <CreateReply 
          board_id={articleData.board_id}
        />
      </View>
      <FlatList 
        data={this.articleData.replyList}
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