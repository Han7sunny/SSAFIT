import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, FlatList, View, StyleSheet } from 'react-native'
import Button from '../../components/Button'
import ArticleItem from '../../components/ArticleItem'
import RoutineListItem from '../../components/RoutineItem'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ArticleDataAction } from '../../redux/actions/actionCreators'

// 함수형 컴포넌트 내에 setState 코드를 작성하면 무한 렌더링 현상이 발생 

export default function CommunityScreen({ navigation }) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://70.12.246.116:8080/board/',
    })
    .then(function (res) {
      // console.log(res.data)
      const newData = res.data
      setData(newData)
      ArticleDataAction.getArticleData({
        newData,
      })
    })
    .catch(function (err) {
      console.log(err)
    })
  }, [])
  // const articleData = state => state.articleData
  
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
            data={data.slice(0,4)}
            renderItem={({item}) => (
              <ArticleItem 
                id={item.boardId}
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
            data={data.slice(4,7)}
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