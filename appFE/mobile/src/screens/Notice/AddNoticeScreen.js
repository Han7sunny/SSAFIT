import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNoticeScreen({navigation}) {
  const [Title, setTitle] = useState('');
  const [File, setFile] = useState('');
  const [Content, setContent] = useState('');

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
    console.log(result);
    if (result) navigation.navigate(navigation.navigate('NoticeListScreen'));
  };

  return (
    <View>
      <View>
        <Text>제목</Text>
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
        <Text>내용</Text>
        <TextInput
          value={Content}
          onChangeText={value => setContent(value)}
          returnKeyType="next"
          ref={content}
          onSubmitEditing={() => {
            console.log(Content);
          }}
        />
      </View>
      <Button mode="contained" onPress={addNotice}>
        등록
      </Button>
    </View>
  );
}
