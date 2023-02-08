import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';

export default function NoticeListScreen({navigation}) {
  const my = {id: 1, name: '이학준', state: 'admin'};
  const [Notices, setNotices] = useState([
    {boardId: 0, title: '첫번째 공지사항'},
    {boardId: 1, title: '두번째 공지사항'},
    {boardId: 2, title: '세번째 공지사항'},
    {boardId: 3, title: '네번째 공지사항'},
  ]);
  //   useState([]);
  useEffect(async () => {
    const data = (await axios.get('http://70.12.246.116:8080/notice')).data;
    setNotices(data);
    console.log(data);
  }, []);
  return (
    <View>
      {my.state === 'admin' && (
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('AddNoticeScreen');
          }}>
          작성
        </Button>
      )}
      <FlatList
        data={Notices}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('NoticeDetailScreen', {id: item.boardId})
            }>
            <Text>[공지]{item.title}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.boardId.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});
