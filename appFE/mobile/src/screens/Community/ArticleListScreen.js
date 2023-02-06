import React from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet } from 'react-native'
import ArticleItem from '../../components/ArticleItem'

let articleData = [
  {
	  success : true,
	  board_id : 1,
	  user_id: "asdf1234",
	  category_id : 2,
	  title : "Test title",
	  content : "Test content",
	  registered_time : "23-02-02",
	  modified_time : "23-02-02",
	  share : true, // 게시글 공개/비공개 여부
	  hits : 100,
	  likes : 20,
	  replyList : [
      {
        id: 1,
        content: '1번 댓글'
      },
      {
        id: 2,
        content: '2번 댓글'
      },
      {
        id: 3,
        content: '3번 댓글'
      }
  ]
}]

export default function ArticleListScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={articleData}
        renderItem={({item}) => (
          <ArticleItem 
            id={item.board_id}
            title={item.title}
            replyList={item.replyList}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2
  }
})