import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import {Button, IconButton, MD3Colors, Text, Avatar} from 'react-native-paper';

export default function MainMyPageScreen({navigation}) {
  const my = {id: 1, name: '이학준', state: 'admi'};
  const [photo, setPhoto] = useState(undefined);
  const groups = [
    {id: 0, name: '유현준'},
    {id: 1, name: '송경삼'},
    {id: 2, name: '강권우'},
    {id: 3, name: '김성은'},
    {id: 4, name: '한선희'},
    {id: 4, name: '한선희'},
    {id: 4, name: '한선희'},
  ];
  const announcements = [
    {id: 0, title: '첫번째 공지사항'},
    {id: 1, title: '두번째 공지사항'},
    {id: 2, title: '세번째 공지사항'},
    {id: 3, title: '네번째 공지사항'},
  ];
  return (
    <View>
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <View style={{width: 100, height: 100}}>
          <Avatar.Image
            size={100}
            source={
              photo == undefined ? require('../Group/icon.png') : {uri: photo}
            }
            style={{backgroundColor: '#fff'}}
          />
          <IconButton
            icon="plus-circle-outline"
            size={35}
            style={{
              bottom: 45,
              right: -55,
              zIndex: 1,
              backgroundColor: 'white',
              padding: 5,
            }}
            onPress={() => navigation.navigate('ChangeImageScreen')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            margin: 0,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', margin: 0}}>
            {my.state === 'admin' ? '관리자' : my.name + ' 님'}
          </Text>
          <IconButton
            icon="cog"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
      <View>
        <Avatar.Icon
          icon={groups.length > 0 ? 'bell' : 'bell-outline'}
          size={40}
          style={{backgroundColor: 'white'}}
          color={groups.length > 0 ? 'yellow' : ''}
        />
        <View style={styles.container}>
          <FlatList
            data={announcements}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              //   <Button
              //     textColor="black"
              //     labelstyle={{fontSize: 30}}
              //     onPress={() =>
              //       navigation.navigate('AddGroupScreen', {id: item.id})
              //     }>
              //     [공지]{item.title}
              //   </Button>
              <Pressable
                onPress={() =>
                  navigation.navigate('AddGroupScreen', {id: item.id})
                }>
                <Text variant="headlineMedium">[공지]{item.title}</Text>
              </Pressable>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>

      <Button
        mode="contained"
        buttonColor="red"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => navigation.navigate('HomeScreen')}>
        회원 탈퇴
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'black',
    height: 1,
  },
  container: {
    marginTop: 8,
    backgroundColor: 'aliceblue',
    minHeight: 400,
    maxHeight: 400,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 20,
  },
  box: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
  button: {
    width: 350,
    height: 50,
    // marginTop: 150,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
});
