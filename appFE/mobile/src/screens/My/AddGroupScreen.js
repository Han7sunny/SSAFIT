import React from 'react';
import { View, Image, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function AddGroupScreen({navigation, route}) {
 const id = route.params.id;
 console.log(id);
 const groups =[{id:0, name:'유현준'}, {id:1, name:'송경삼'},{id:2, name:'강권우'},{id:3, name:'김성은'},{id:4, name:'한선희'}]
 return (
  <View>
    <Text variant="displaySmall" style={{margin:30}}> 그룹 초대 요청 </Text>
    <View style={{alignItems: 'center', marginTop: 40}}>
        <View style={{alignItems: 'center'}}>
            <Image source={require('../Group/icon.png')} style={{width: 150, height: 150, marginBottom: 15}}/>
            <Text variant="headlineMedium">OOO님</Text>
        </View>
        <Text variant="titleLarge" style={{margin:30}}>그룹 초대 요청을 수락하시겠습니까?</Text>
    </View>
    <View style={{alignItems: 'center'}}>
        <Button
            mode="contained"
            buttonColor='black'
            style={styles.button}
            labelStyle={styles.label}
            onPress={() => navigation.navigate('AddScreen', {id: id})}>
            수락
        </Button>
        <Button
            mode="contained"
            buttonColor='red'
            style={styles.button}
            labelStyle={styles.label}
            onPress={() => navigation.navigate('CancelScreen', {id: id})}>
            거절
        </Button>
        <Button
            mode="contained"
            buttonColor='black'
            style={styles.button}
            labelStyle={styles.label}
            onPress={() => navigation.navigate('AddGroupDetailScreen', {id: id})}>
            상세보기
        </Button>
    </View>
  </View>
 ) 
}

const styles = StyleSheet.create({
    button: {
        width:350, 
        height: 50,
        margin: 10,
        borderRadius:10
    },
    label:{
        fontSize:18, 
        fontWeight: 'bold',
        marginTop:17
    },
  });