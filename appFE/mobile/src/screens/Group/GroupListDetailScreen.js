import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function GroupDetailScreen({route}) {
  console.log(route.params.id)
  const item = {id: 0, name: 'lhj', title: 'a', content: 'asdfasdf', nowNum: 2, totalNum: 10, heart: 5, heartClick: false,
                comment: [{memberid: '1234', commentText: 'asdgfasfgsdfgdf'},{memberid: '1sadfgsd', commentText: 'a23465sdfgdf'},{memberid: '12sdf', commentText: 'asdg145twersfgddfgdf'}]};
  const [heartCnt, setIsHeartCnt] = useState(item.heart);
  const [isClickHeart, setIsClickHeart] = useState(item.heartClick);
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
      <Text>{item.comment.length}</Text>
    </View>
    <FlatList
          data={item.comment}
          ItemSeparatorComponent={() => <View  />}
          renderItem={({item}) => (
            <Text>sedfg</Text>
          )}
          keyExtractor={item => item.id}
          style={{flex: 2}}
        />
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