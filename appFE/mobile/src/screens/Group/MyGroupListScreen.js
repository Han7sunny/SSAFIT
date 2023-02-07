import React from "react";
import { View, StyleSheet, FlatList } from 'react-native'
import { Button, Text  } from 'react-native-paper'
import MyGroupSimple from './MyGroupSimple'

export default function MyGroupListScreen({navigation}) {
  const Lists = [
    {id: 0, title: 'a', nowNum: 2, date:'01/01/23'},
    {id: 1, title: 'b', nowNum: 1, heart: 1, date:'01/01/23'},
    {id: 2, title: 'c', nowNum: 10, heart: 10, date:'01/01/23'},
    {id: 3, title: 'd', nowNum: 1, heart: 1, date:'01/01/23'},
  ]

  return (
    <View>
      <Text variant="headlineLarge" style={{fontWeight:'bold', margin:10, marginBottom: 30}}> OOO님의 그룹 목록 </Text>
      <View style={{maxHeight:570, minHeight: 570}}>
        <FlatList
          data={Lists}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <MyGroupSimple 
              item={item}
              navigation = {navigation}/>
          )}
          keyExtractor={item => item.title.toString()}
        />

      </View>
      <Button
        mode="contained"
        buttonColor='black'
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => navigation.navigate('CreateGroupScreen')}>
        그룹 생성하기
      </Button>
    </View>
  )
}


const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  button: {
    width:350, 
    height: 50,
    borderRadius:10,
    alignSelf: 'center'
  },
    label:{
      fontSize:18, 
      fontWeight: 'bold',
      marginTop:17
  },
});