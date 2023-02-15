import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Checkbox, Button, TextInput} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateArticleScreen({navigation, route}) {
  const data = route.params.data;
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [registeredTime, setRegisteredTime] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [routineData, setRoutineData] = useState([]);
  const [selectedroutine, setSelectedRoutine] = useState(0); // selected : 선택된 routineId가 저장됨
  const [share, setShare] = useState(true);
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      // console.log(UserInfo)
      setAccessToken(UserInfo.token);
      setUserId(UserInfo.id);
      // console.log('게시글 작성학 ㅣ위해 필요한 토큰 :' , accessToken)
    });
  }, []);
  useEffect(() => {
    setCategoryId(route.params.categoryId);
    setTitle(data === false ? '' : data.title);
    setContent(data === false ? '' : data.content);
    setBoardId(data === false ? 0 : Number(data.boardId));
    setSelectedRoutine(data === false ? 0 : Number(data.routineId));
    setRegisteredTime(
      data === false ? '2023-02-15T14:28:14.974Z' : data.registeredTime,
    );
    console.log(route.params.categoryId);
    console.log('---------', data);
  }, [data, route.params.categoryId]);
  useEffect(() => {
    if (accessToken === '') return;
    axios({
      method: 'get',
      url: `${ip}/routine/get-user-routine`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(function (res) {
        console.log('a', res.data);
        let newData = res.data.map(item => {
          return {key: item.routineId, value: item.name};
        });
        setRoutineData(newData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

  async function onPost(state) {
    const result = (
      await axios({
        method: state === 'add' ? 'post' : 'put',
        url: `${ip}/board/` + (state === 'add' ? `regist` : `${boardId}`),
        headers: {
          authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
        data: {
          boardId: Number(boardId),
          categoryId: Number(categoryId),
          content: content,
          groupId: 0,
          modifiedTime: '2023-02-15T14:28:14.974Z',
          registeredTime: registeredTime,
          routineId: Number(selectedroutine),
          sharePost: share,
          title: title,
          userId: `${userId}`,
        },
      })
    ).data;
    console.log('123412341243', result);
    if (result)
      navigation.navigate('CommunityScreen', {
        community: category === 2 ? 'QA' : 'shareRoutine',
        state: true,
      });
  }

  const category = [
    {key: 2, value: '질문'},
    {key: 3, value: '루틴 공유'},
  ];
  return (
    <ScrollView>
      <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
        <SelectList
          data={category}
          save="key"
          placeholder="글 타입 선택"
          setSelected={value => setCategoryId(value)}
          defaultOption={{
            key: categoryId,
            value: categoryId === 2 ? '질문' : '루틴 공유',
          }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Text variant="titleLarge" style={{margin: 10 }}>
          제목
        </Text>
        <TextInput
          value={title}
          onChangeText={value => setTitle(value)}
          returnKeyType="next"
          onSubmitEditing={() => {
            console.log(title);
            if (isEnabled) file.current.focus();
          }}
          style={{ borderRadius: 15, borderTopEndRadius: 15, borderTopStartRadius: 15 }}
        />
        <Text variant="titleLarge" style={{margin: 10, marginTop: 20}}>
          내용
        </Text>
        <TextInput
          value={content}
          multiline={true}
          textAlignVertical="top"
          style={{ height: 300, maxHeight: 500, borderRadius: 15, borderTopEndRadius: 15, borderTopStartRadius: 15 }}
          onChangeText={value => setContent(value)}
          returnKeyType="next"
          onSubmitEditing={() => {
            console.log(content);
          }}
          
        />
        {categoryId === 3 && (
          <View style={styles.centeredView}>
            <SelectList
              data={routineData}
              save="key"
              placeholder="루틴을 선택하세요!"
              setSelected={key => {
                setSelectedRoutine(Number(key)),
                  console.log('selected :', selectedroutine);
              }}
              onSelect={() => alert(selectedroutine, '번 루틴을 선택하셨습니다.')}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text>비공개</Text>
        <Checkbox
          status={share ? 'checked' : 'unchecked'}
          onPress={() => {
            setShare(!share);
          }}
        />
      </View>
      <Button
        mode="contained"
        buttonColor="black"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => onPost(data === false ? 'add' : 'change')}>
        {data === false ? '등록' : '수정'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
