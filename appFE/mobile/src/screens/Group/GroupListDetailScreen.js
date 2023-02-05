import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Button,TextInput } from 'react-native-paper'
import styled from 'styled-components/native'
import CommentScreen from './CommentScreen'
// import TextInput from '../../components/TextInput'

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function GroupDetailScreen({route}) {
  // console.log(route.params.id)
  const my = {memberid: 'lhj', isMember: false}
  const item = {id: 0, name: 'lhj', title: 'a', content: 'asdfasdf', nowNum: 2, totalNum: 10, heart: 5, heartClick: false,
                comment: [{memberid: '1234', commentText: 'asdgfasfgsdfgdf', isMember: true},{memberid: '1sadfgsd', commentText: 'a23465sdfgdf', isMember: false},{memberid: '12sdf', commentText: 'asdg145twersfgddfgdf', isMember: true}]};
  const [heartCnt, setIsHeartCnt] = useState(item.heart);
  const [isClickHeart, setIsClickHeart] = useState(item.heartClick);
  const [Reply, setReply] = useState(item.comment);
  const [text, setText] = useState('');
  const clickHeart = () => {
    if(isClickHeart) {
      setIsClickHeart(false);
      setIsHeartCnt(heartCnt-1);
    }
    else {
      setIsClickHeart(true);
      setIsHeartCnt(heartCnt+1);
  
    }
    console.log('click')
  };
  const addReply =() =>{
    // console.log(text)
    if(text.length === 0) return;
    setReply(Reply.push({memberid: my.memberid, commentText: text, isMember: my.isMember}));
    console.log(Reply)
    setText('');
  }
  return (
  <View style={{flex: 1}}>
    <Title> {item.title} </Title>
    <View style={{ margin: 20}}>
      <Title style={{fontSize: 25}}> {item.name} </Title>
      <Text style={[styles.box, {fontSize: 15, alignItems: 'flex-end'}]}>
        <Title style={{fontSize: 15}}> 인원 </Title>
        {item.nowNum}/{item.totalNum} 명
      </Text>
      <Text style={{marginBottom: 20}}>{item.content}</Text>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={clickHeart}>
            {!isClickHeart && <Image source={require('./heart.png')}/>}
            {isClickHeart && <Image source={require('./heartred.png')}/>}
            <Text style={styles.box}>{heartCnt}</Text>
          </TouchableOpacity>
    </View>
    <View style={{ flexDirection: 'row', alignContent: 'center'}}>
      <Image source={require('./comment.png')}/>
      <Text>{Reply.length}</Text>
    </View>
    <FlatList
          data={Reply}
          ItemSeparatorComponent={() => <View  />}
          renderItem={({item}) => (
            <CommentScreen comment={item}/>
          )}
          keyExtractor={item => item.id}
          style={{flex: 2}}
        />
    <View>
      <TextInput 
        label="댓글을 입력하세요"
        onChangeText={(text) => setText(text)}
      />
      <Button onPress={addReply}>
        댓글 작성하기
      </Button>
    </View>
  </View>
 ) 
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 8,
    backgroundColor: 'aliceblue',
    maxHeight: 400,
  },
  box: {
    height: 40,
    fontWeight: 'bold', 
    fontSize:25
  },
});