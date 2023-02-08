import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Text, Avatar } from 'react-native-paper'

export default function AddScreen({navigation, route}) {
 const id = route.params.id;
 return (
  <View style={{marginTop:150, alignItems: 'center'}}>
    <Avatar.Icon icon="check-bold" size={150} style={{backgroundColor:'black'}}/>
    <Text variant="headlineMedium" style={{margin: 50, textAlign: "center"}}>
        <Text style={{fontWeight:'bold'}}>"{id}"</Text>에 추가되었습니다.
    </Text>
    <Button
        mode="contained"
        buttonColor='black'
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => navigation.navigate('MyGroupListScreen', {id: id})}>
        그룹 목록으로 가기
    </Button>
  </View>
 ) 
}

const styles = StyleSheet.create({
    button: {
        width:350, 
        height: 50,
        marginTop: 150,
        borderRadius:10
    },
    label:{
        fontSize:18, 
        fontWeight: 'bold',
        marginTop:17
    },
  });