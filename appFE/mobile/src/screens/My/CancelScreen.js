import React from 'react';
import { View, Text, Image } from 'react-native'
import Button from '../../components/Button'

export default function CancelScreen({navigation, route}) {
 const id = route.params.id;
 return (
  <View>
    <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center'}}>
            <Image source={require('../Group/icon.png')} style={{width: 100, height: 100}}/>
            <Text>{id}님의 그룹 초대 요청을 거절하였습니다.</Text>
        </View>
    </View>

    <Button
        mode="contained"
        onPress={() => navigation.navigate('MainMyPageScreen')}>
        돌아 가기
    </Button>
  </View>
 ) 
}