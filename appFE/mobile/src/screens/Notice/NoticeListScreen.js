import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable, StyleSheet} from 'react-native';
import {Button, Text, RadioButton, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoticeListScreen({navigation, route}) {
  const [accessToken, setAccessToken] = useState('');
  const [role, setRole] = useState('');
  const [ip, setIP] = useState('');
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setRole(UserInfo.role);
      setAccessToken(UserInfo.token);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [accessToken, route.params]);

  const [Notices, setNotices] = useState([]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`http://${ip}/notice/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setNotices(data);
    setFiltering(data);
  };

  const [findWord, setFindWord] = useState('');
  const [checked, setChecked] = useState('title');
  const [Filtering, setFiltering] = useState([]);
  const filter = () => {
    setFiltering(
      Notices.filter(
        item =>
          (checked === 'title' && item.title.includes(findWord)) ||
          (checked === 'id' && item.id.includes(findWord)) ||
          (checked === 'two' &&
            (item.title.includes(findWord) || item.id.includes(findWord))),
      ),
    );
  };

  return (
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
            onPress={() =>
              navigation.navigate('NoticeDetailScreen', {
                id: item.boardId,
              })
            }>
            <Text style={{flex: 2.5, fontSize: 20}}>[공지]{item.title}</Text>
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
      {role === 'ADMIN' && (
        <Button
          mode="contained"
          buttonColor="black"
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => {
            navigation.navigate('AddNoticeScreen', {data: false});
          }}>
          작성
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#aaa',
    height: 1,
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
