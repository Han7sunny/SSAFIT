import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import styled from 'styled-components/native'
import Button from '../../components/Button'

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function MyGroupListScreen({navigation}) {
  const Lists = [
    {name:'a', date:'230130', img:'', num:10}, 
    {name:'b', date:'123456', img:'', num:5}
  ]

  return (
    <View>
      <Title> OOO님의 그룹 목록 </Title>
      <FlatList
        data={Lists}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <View style={[styles.container, {padding: 10, flex: 1, height: 100, alignItems: 'center', alignContent: 'space-around', flexDirection: 'row'}]}>
            <View>
              <Text style={styles.box}>{item.name}</Text>
              <Text style={styles.box}>{item.date}</Text>
            </View>
            <View style={{padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('./icon.png')} style={{width: 50, height: 50,margin: 10}}/>
              <Text style={{fontWeight: 'bold', fontSize:25}}>{item.num} 명</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.name.toString()}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateGroupScreen')}
      >
        그룹 생성하기
      </Button> 
    </View>
  )
}


const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#26a69a',
    borderWidth: 1,
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26a69a',
  },
  lineThrough: {
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 8,
    backgroundColor: 'aliceblue',
    maxHeight: 400,
  },
  box: {
    height: 40,
    fontWeight: 'bold', 
    fontSize:25
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});