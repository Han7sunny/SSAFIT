import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable, StyleSheet} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';

export default function NoticeDetailScreen({navigation, route}) {
  const id = route.params.id;
  const my = {id: 1, name: '이학준', state: 'admin'};
  // const [Notices, setNotices] = useState([]);
  // const [Reply, setReply] = useState([]);
  const [text, setText] = useState('');
  useEffect(async () => {
    console.log(1);
    //   const data = (await axios.get(`http://70.12.246.116:8080/notice/${id}`))
    //     .data;
    //   setNotices(data);
    //   setReply(data.replyList);
    //   console.log(data);
  }, []);
  const Notices = {
    id: 0,
    title: '첫번째 공지사항',
    date: '2023/02/01',
    file: undefined,
    content: 'asfgasfhsdfhd',
    reply: [
      {userName: '1234', content: 'asdgfasfgsdfgdf'},
      {userName: '1sadfgsd', content: 'a23465sdfgdf'},
      {userName: '12sdf', content: 'asdg145twersfgddfgdf'},
    ],
  };
  const [Reply, setReply] = useState(Notices.reply);

  const deleteNotice = async () => {
    const data = (await axios.get(`http://70.12.246.116:8080/notice/${id}`))
      .data;
    if (data) navigation.navigate('NoticeListScreen');
  };

  const addReply = () => {
    // console.log(text)
    if (text.length === 0) return;
    setReply(Reply.push({memberid: my.memberid, replyText: text}));
    console.log(Reply);
    setText('');
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="headlineLarge"
          style={{fontWeight: 'bold', marginTop: 10}}>
          {Notices.title}
        </Text>
        {my.state === 'admin' && (
          <View style={{flexDirection: 'row'}}>
            <Button
              mode="contained"
              buttonColor="black"
              style={styles.button}
              labelStyle={styles.label}
              onPress={{}}>
              수정
            </Button>
            <Button
              mode="contained"
              buttonColor="red"
              style={styles.button}
              labelStyle={styles.label}
              onPress={{}}>
              삭제
            </Button>
          </View>
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>작성일자 - </Text>
        <Text>{Notices.modifiedTime}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>첨부파일 - </Text>
        <Text>{Notices.file}</Text>
      </View>
      <View>
        <Text>내용</Text>
        <Text>{Notices.content}</Text>
      </View>
      <View>
        <Text>댓글</Text>
        <FlatList
          data={Reply}
          // ItemSeparatorComponent={() => <View />}
          renderItem={({item}) => <ReplyScreen reply={item} />}
          keyExtractor={item => item.userName}
        />
      </View>
      <View>
        <TextInput
          label="댓글을 입력하세요"
          onChangeText={text => setText(text)}
        />
        <Button onPress={addReply}>댓글 작성하기</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  button: {
    width: 70,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
