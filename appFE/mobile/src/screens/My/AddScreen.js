import React from 'react';
import { View, Text, Image } from 'react-native'
import Button from '../../components/Button'

export default function AddScreen({navigation, route}) {
 const id = route.params.id;
 return (
  <View>
    <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center'}}>
            <Image source={require('../Group/icon.png')} style={{width: 100, height: 100}}/>
            <Text>{id}에 추가되었습니다.</Text>
        </View>
    </View>

    <Button
        mode="contained"
        onPress={() => navigation.navigate('MyGroupListScreen')}>
        그룹 목록으로 가기
    </Button>
  </View>
 ) 
}