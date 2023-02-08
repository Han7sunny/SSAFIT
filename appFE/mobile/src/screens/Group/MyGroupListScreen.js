import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import MyGroupSimple from './MyGroupSimple';

export default function MyGroupListScreen({navigation}) {
  // const Lists = [
  //   {groupId: 0, title: 'a', nowNum: 2, date: '01/01/23'},
  //   {groupId: 1, title: 'b', nowNum: 1, heart: 1, date: '01/01/23'},
  //   {groupId: 2, title: 'c', nowNum: 10, heart: 10, date: '01/01/23'},
  //   {groupId: 3, title: 'd', nowNum: 1, heart: 1, date: '01/01/23'},
  // ];
  const [Lists, setLists] = useState([]);
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaGpUZXN0Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3NTgxODU4OSwiZXhwIjoxNjc1ODIyMTg5fQ.LxUTcNvKyqt3JQ1dGfi6DoB4fz4T78MBL9RVUJ5wr4Y';
  useEffect(() => {
    const getData = async () => {
      const data = (
        await axios.get(`http://70.12.246.116:8080/group/myGroupList`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-AUTH-TOKEN': `${token}`,
          },
        })
      ).data;
      setLists(data);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <View>
      <Text
        variant="headlineLarge"
        style={{fontWeight: 'bold', margin: 10, marginBottom: 30}}>
        {' '}
        OOO님의 그룹 목록{' '}
      </Text>
      <View style={{maxHeight: 570, minHeight: 570}}>
        <FlatList
          data={Lists}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <MyGroupSimple item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.name.toString()}
        />
      </View>
      <Button
        mode="contained"
        buttonColor="black"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => navigation.navigate('CreateGroupScreen')}>
        그룹 생성하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
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
