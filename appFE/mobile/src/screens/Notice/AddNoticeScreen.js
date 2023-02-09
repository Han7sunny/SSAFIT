import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNoticeScreen({navigation, route}) {
  const data = route.params.data;
  const [Title, setTitle] = useState(
    data === false ? '' : route.params.data.title,
  );
  const [Content, setContent] = useState(
    data === false ? '' : route.params.data.content,
  );
  const [accessToken, setAccessToken] = useState('');
  const file = useRef();
  const content = useRef();
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
    });
  }, []);
  const addNotice = async () => {
    const result = await axios.post(
      `http://70.12.246.116:8080/notice/regist`,
      {
        categoryId: Number(1),
        content: Content,
        sharePost: true,
        title: Title,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      },
    );
    if (result) navigation.navigate('NoticeListScreen', {change: true});
  };

  const changeNotice = async () => {
    const result = await axios.put(
      `http://70.12.246.116:8080/notice/${data.boardId}`,
      {
        boardId: data.boardId,
        categoryId: data.categoryId,
        content: Content,
        sharePost: true,
        title: Title,
        registeredTime: data.registeredTime,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      },
    );
    if (result) navigation.navigate('NoticeListScreen', {change: true});
  };

  return (
    <View>
      <View>
        <Text variant="titleLarge" style={{margin: 10}}>
          제목
        </Text>
        <TextInput
          value={Title}
          onChangeText={value => setTitle(value)}
          returnKeyType="next"
          onSubmitEditing={() => {
            console.log(Title);
            if (isEnabled) file.current.focus();
          }}
        />
      </View>
      <View>
        <Text variant="titleLarge" style={{margin: 10}}>
          내용
        </Text>
        <TextInput
          value={Content}
          multiline
          textAlignVertical="top"
          style={{height: 530}}
          onChangeText={value => setContent(value)}
          returnKeyType="next"
          ref={content}
          onSubmitEditing={() => {
            console.log(Content);
          }}
        />
      </View>
      <Button
        mode="contained"
        buttonColor="black"
        style={styles.button}
        labelStyle={styles.label}
        onPress={data === false ? addNotice : changeNotice}>
        {data === false ? '등록' : '수정'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
});
