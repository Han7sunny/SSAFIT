import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'

export default function ArticleItem( props ) {
  navigation = useNavigation()
  // console.log('Article Item : ',props.id)
  const replyNum = props.replyList
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ArticleDetailScreen', { id: props.id })}
      >
        <Text> Show Article Item </Text>
        <Text>글 번호 : {props.id}</Text>
        <Text>제목 : {props.title}</Text>
        <Text>댓글 개수 : {replyNum}</Text>
      </TouchableOpacity>
    </View>
  )
}