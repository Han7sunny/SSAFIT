import React from 'react'
import { ScrollView, Text, TouchableOpacity, FlatList, View, StyleSheet } from 'react-native'
import Button from '../../components/Button'
import ArticleItem from '../../components/ArticleItem'
import RoutineListItem from '../../components/RoutineListItem'
import axios from 'axios'

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

export default function CommunityScreen({ navigation }) {

  // axios({
  //   method: 'get',
  //   url: '',
  //   headers: {
  //     authorization: `${123423647}`
  //   }
  // })
  // .then(function (res) {
  //   console.log(res.data)
  //   articleData = res.data
  // })
  // .catch(function (err) {
  //   console.log(err)
  // })

  return (
    <View>
      <Text> Welcome to Community </Text>
      <Button
        onPress={() => navigation.navigate('CreateArticleScreen')}
      >
        글 작성하러 가기
      </Button>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ArticleListScreen')}
        >
          <Text style={styles.title}> 질문 게시판 </Text>
        </TouchableOpacity>
        <View>
          <FlatList 
            data={articleData}
            renderItem={({item}) => (
              <ArticleItem 
                id={item.board_id}
                title={item.title}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RoutineListScreen')}
        >
          <Text style={styles.title}> 다른 유저의 운동 루틴을 살펴보세용! </Text>
        </TouchableOpacity>
        <View>
          <FlatList 
            data={articleData}
            renderItem={({item}) => (
            
            <RoutineListItem 
              id={item.board_id}
              title={item.title}
            />
            )}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2
  },
  title: {
    fontSize: 20
  }
})