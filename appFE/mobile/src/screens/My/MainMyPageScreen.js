import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Button from '../../components/Button'

export default function MainMyPageScreen({navigation}) {
 const my = {id:1, name:'이학준'}
 return (
  <View style={{alignItems: 'center'}}>
    <Text> MainMyPageScreen </Text>
    <View style={{alignItems: 'center'}}>
        <View style={{position: 'relative', margin:0}}>
            <Image source={require('../Group/icon.png')} style={{width: 100, height: 100}}/>
            <TouchableOpacity 
            style={{width: 20, height: 20, bottom: 30, left: 70, zIndex: 1}}
            onPress={() => navigation.navigate('ChangeImageScreen')}>
                <Image source={require('../Group/plus.png')} /> 
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Text style={{fontSize:25, fontWeight: 'bold', margin:0}}>{my.name}님</Text>
            <TouchableOpacity>
                <Image source={require('../Group/plus.png')} /> 
            </TouchableOpacity>
        </View>
    </View>
    <View>

    </View>
    <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateGroupScreen')}
      >
        회원 탈퇴
      </Button>
  </View>
 ) 
}