import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import Button from '../../components/Button'
import styled from 'styled-components/native'

const Title = styled.Text`
  font-size: 60px;
  font-weight: 800;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function AddGroupScreen({navigation, route}) {
 console.log(route.params.id);
 const id = route.params.id;
  const item = {title: 'A', head:'이학준',startDate: '2023/01/01', endDate: '2023/05/01', goal: '열심히 하자', penalty: '벌금', totalResult: 40,
                member:[
                  {id: 0, name: 'a', state: false, result: 80},
                  {id: 1, name: 'b', state: true, result: 20},
                  {id: 2, name: 'c', state: false, result: 50},
                  {id: 3, name: 'd', state: true, result: 90},
                ]
              };
 return (
  <View>
    <Text> 그룹 초대 요청 </Text>
    <Title>{item.title}</Title>
      <View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../Group/icon.png')} style={{width: 70, height: 70,margin: 10}}/>
          <View>
            <Text style={{fontSize: 30, fontWeight: 600}}>닉네임</Text>
            <Text>{item.head}</Text>
          </View>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 600}}>운동 기간</Text>
          <Text>{item.startDate} ~ {item.endDate}</Text>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 600}}>그룹 목표</Text>
          <Text>{item.goal}</Text>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 600}}>그룹 패널티</Text>
          <Text>{item.penalty}</Text>
        </View>

        <Text style={{fontSize: 20, fontWeight: 600}}>그룹원</Text>
        <FlatList
          data={item.member}
          style={{height: 190}}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <Text>{item.name}</Text>
          )}
          keyExtractor={item => item.name.toString()}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddScreen', {id: id})}>
        수락
    </Button>
    <Button
        mode="contained"
        onPress={() => navigation.navigate('CancelScreen', {id: id})}>
        거절
    </Button>
  </View>
 ) 
}

const styles = StyleSheet.create({
    separator: {
      backgroundColor: '#e0e0e0',
      height: 1,
    },
  })