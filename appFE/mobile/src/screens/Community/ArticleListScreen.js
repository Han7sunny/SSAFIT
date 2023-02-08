
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet } from 'react-native'
import ArticleItem from '../../components/ArticleItem'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ArticleListScreen({ navigation }) {
  const [data, setData] = useState([])
  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result)
      setAccessToken(UserInfo.token)
    })
    axios({
      method: 'get',
      url: 'http://70.12.246.116:8080/board/QA',
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "X-AUTH-TOKEN":`${accessToken}`
      }
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
            replySize={item.replySize}
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