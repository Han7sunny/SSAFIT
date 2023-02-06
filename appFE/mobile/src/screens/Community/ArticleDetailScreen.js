import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, FlatList, View } from 'react-native'
import ReplyItem from '../../components/ReplayItem'
import CreateReply from '../../components/CreateReply'

// let articleData = {
// 	success : true,
// 	board_id : 1,
// 	user_id: "asdf1234",
// 	category_id : 2,
// 	title : "Test title",
// 	content : "Test content - 아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기아무소리나 계속 하기",
// 	registered_time : "23-02-02",
// 	modified_time : "23-02-02",
// 	share : true, // 게시글 공개/비공개 여부
// 	hits : 100,
// 	likes : 20,
// 	replyList : [
//     {
//       id: 1,
//       content: '1번 댓글'
//     },
//     {
//       id: 2,
//       content: '2번 댓글'
//     },
//     {
//       id: 3,
//       content: '3번 댓글'
//     }
//   ]
// }
export default function ArticleDetailScreen({ route }) {
  const [articleData, setArticleData] = useState([])
  console.log('==== Now in [ArticleDetailScreen] : ', route.params.id)
  useEffect(() => {
    async function getData() {
      axios({
        method: 'get',
        url: `http://70.12.246.102:8080/board/${route.params.id}`,
        // headers: {
        //   authorization: `${123423647}`
        // }
      })
      .then((res) => {
        console.log(res.data)
        let newData = res.data
        setArticleData(newData)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    getData()
  })

  return (
    <View>
      <View>
        <Text>{articleData.title}</Text>
        <Text>{articleData.registered_time}</Text>
        <Text>{articleData.modified_time}</Text>
        <Text>{articleData.hits}</Text>
        <Text>{articleData.likes}</Text>
        <Text>{articleData.content}</Text>
      </View>
      <View>
        <CreateReply 
          board_id={articleData.board_id}
        />
      </View>
      <FlatList 
        data={articleData.replyList}
        renderItem={({item}) => (
          <ReplyItem
            id={item.id}
            content={item.content}
          />
        )}
      />
    </View>
  )
}