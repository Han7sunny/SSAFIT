import React from 'react';
import { View, Text, Image } from 'react-native'
import Button from '../../components/Button'

export default function AddGroupScreen({navigation, route}) {
 const id = route.params.id;
 console.log(id);
 const groups =[{id:0, name:'유현준'}, {id:1, name:'송경삼'},{id:2, name:'강권우'},{id:3, name:'김성은'},{id:4, name:'한선희'}]
 return (
  <View>
    <Text> 그룹 초대 요청 </Text>
    <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center'}}>
            <Image source={require('../Group/icon.png')} style={{width: 100, height: 100}}/>
            <Text>OOO님</Text>
        </View>
            <Text>그룹 초대 요청을 수락하시겠습니까?</Text>
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
    <Button
        mode="contained"
        onPress={() => navigation.navigate('AddGroupDetailScreen', {id: id})}>
        상세보기
    </Button>
  </View>
 ) 
}