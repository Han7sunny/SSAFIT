import React, {useState, useEffect} from 'react';
import {ScrollView, FlatList, View, StyleSheet, Pressable} from 'react-native';
import {
  Text,
  Button,
  SegmentedButtons,
  TextInput,
  RadioButton,
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 함수형 컴포넌트 내에 setState 코드를 작성하면 무한 렌더링 현상이 발생

export default function CommunityScreen({navigation, route}) {
  const [value, setValue] = useState('QA');

  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [accessToken, value, route.params]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`http://${ip}/board/${value}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    console.log(data);
    setLists(data);
    setFiltering(data);
  };

  const [lists, setLists] = useState([]);
  const [findWord, setFindWord] = useState('');
  const [checked, setChecked] = useState('title');
  const [Filtering, setFiltering] = useState([]);
  const filter = () => {
    setFiltering(
      lists.filter(
        item =>
          (checked === 'title' && item.title.includes(findWord)) ||
          (checked === 'id' && item.userName.includes(findWord)) ||
          (checked === 'two' &&
            (item.title.includes(findWord) ||
              item.userName.includes(findWord))),
      ),
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{width: 300}}
          buttons={[
            {
              value: 'QA',
              label: '질문',
            },
            {
              value: 'shareRoutine',
              label: '루틴',
            },
          ]}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CreateArticleScreen')}>
          글 쓰기
        </Button>
      </View>
      <View>
        <TextInput
          onChangeText={value => setFindWord(value)}
          onSubmitEditing={filter}
          placeholder="검색어를 입력하세요"
          style={{backgroundColor: 'white'}}
          right={<TextInput.Icon icon="magnify" onPress={filter} />}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="title"
              status={checked === 'title' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('title')}
            />
            <Text>제목</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="id"
              status={checked === 'id' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('id')}
            />
            <Text>작성자</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="two"
              status={checked === 'two' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('two')}
            />
            <Text>제목+작성자</Text>
          </View>
        </View>

        <View style={styles.listTitle}>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: 'bold',
              flex: 2.5,
              textAlign: 'center',
              fontSize: 25,
            }}>
            제목
          </Text>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: 'bold',
              flex: 1,
              textAlign: 'center',
              fontSize: 25,
            }}>
            작성자
          </Text>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: 'bold',
              flex: 1,
              textAlign: 'center',
              fontSize: 25,
            }}>
            날짜
          </Text>
        </View>
        <FlatList
          data={Filtering}
          style={{height: 520, padding: 10}}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <Pressable
              style={{flexDirection: 'row', height: 30, alignItems: 'center'}}
              onPress={() => {
                if (value === 'QA')
                  navigation.navigate('ArticleDetailScreen', {
                    id: item.boardId,
                  });
                else
                  navigation.navigate('RoutineArticleDetailScreen', {
                    boardId: item.boardId,
                  });
              }}>
              <Text style={{flex: 2.5, fontSize: 20}}>{item.title}</Text>
              <Text style={{flex: 1, textAlign: 'center', fontSize: 17}}>
                {item.userName}
              </Text>
              <Text style={{flex: 1, textAlign: 'center', fontSize: 17}}>
                {item.registeredTime.substring(0, 10)}
              </Text>
            </Pressable>
          )}
          keyExtractor={item => item.boardId.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#aaa',
    height: 1,
  },
  container: {
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
  },
  listTitle: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 3,
    marginTop: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
  },
});
