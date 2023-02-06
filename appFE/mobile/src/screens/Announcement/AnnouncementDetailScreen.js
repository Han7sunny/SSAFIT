import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import Button from '../../components/Button'
import styled from 'styled-components/native'
import CommentScreen from './CommentScreen'

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function AnnouncementDetailScreen({ navigation, route }) {
    const id = route.params.id;
    const announcements = {id:0, title:'첫번째 공지사항', date:'2023/02/01', file:undefined, content:'asfgasfhsdfhd',
    comment: [{memberid: '1234', commentText: 'asdgfasfgsdfgdf'},{memberid: '1sadfgsd', commentText: 'a23465sdfgdf'},{memberid: '12sdf', commentText: 'asdg145twersfgddfgdf'}]};
    const [Reply, setReply] = useState(announcements.comment);
    const [text, setText] = useState('');
    const addReply =() =>{
        // console.log(text)
        if(text.length === 0) return;
        setReply(Reply.push({memberid: my.memberid, commentText: text}));
        console.log(Reply)
        setText('');
      }
    return (
        <View>
            <Title>{announcements.title}</Title>
            <View style={{flexDirection: 'row'}}>
                <Text>작성일자 - </Text>
                <Text>{announcements.date}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text>첨부파일 - </Text>
                <Text>{announcements.file}</Text>
            </View>
            <View>
                <Text>내용</Text>
                <Text>{announcements.content}</Text>
            </View>
            <View>
                <Text>댓글</Text>
                <FlatList
                    data={Reply}
                    ItemSeparatorComponent={() => <View  />}
                    renderItem={({item}) => (
                        <CommentScreen comment={item}/>
                    )}
                    keyExtractor={item => item.id}
                    />
            </View>
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
  });