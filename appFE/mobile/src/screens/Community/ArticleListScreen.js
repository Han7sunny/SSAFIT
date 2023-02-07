import React, { useState, useEffect } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet } from 'react-native'
import ArticleItem from '../../components/ArticleItem'
import axios from 'axios'


export default function ArticleListScreen({ navigation }) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://70.12.246.116:8080/board/QA',
    })
    .then(function (res) {
      // console.log(res.data)
      const newData = res.data
      setData(newData)
      // ArticleDataAction.getArticleData({
      //   newData,
      // })
    })
    .catch(function (err) {
      console.log(err)
    })
  }, [])
  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
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