import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import axios from 'axios'

export default function ArticleItem( props ) {
  navigation = useNavigation()
  console.log('댓글 : ',props.replyList)
  const [isClickHeart, setIsClickHeart] = useState(false);
  const [heartCnt, setIsHeartCnt] = useState(0);
  const clickHeart = async() => {
  const get = await axios.get(`http://70.12.246.116:8080/group/recruit/${props.id}/likes`);
    setIsClickHeart(get.data);
    setIsHeartCnt(heartCnt+ (get.data ? 1 : -1));
  };
  // console.log('Article Item : ',props.id)
  const replyNum = props.replyList
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ArticleDetailScreen', { id: props.id })}
      >
        <Text> Show Article Item </Text>
        <Text>글 번호 : {props.id}</Text>
        <Text>제목 : {props.title}</Text>
        <IconButton 
          icon={isClickHeart ? "heart":"heart-outline"}
          iconColor={isClickHeart ? "red":"black"}
          size={20}
          onPress={clickHeart}
          style={styles.iconButton}
        />
        <Text> 좋아요 수 : {heartCnt}</Text>
        <Text>댓글 개수 : {replyNum}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5
  }
})