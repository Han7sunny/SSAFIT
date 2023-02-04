import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'


export default function MyGroupSimple({item, navigation}) {
  return (
    <TouchableOpacity 
    style={[styles.container, {padding: 10, flex: 1, height: 100, alignItems: 'center', alignContent: 'space-around', flexDirection: 'row'}]}
    onPress={() => navigation.navigate('MyGroupDetail', {id: item.id})}>
        <View>
            <Text style={styles.box}>{item.title}</Text>
            <Text style={styles.box}>{item.date}</Text>
        </View>
        <View style={{padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('./icon.png')} style={{width: 50, height: 50,margin: 10}}/>
            <Text style={{fontWeight: 'bold', fontSize:25}}>{item.nowNum} 명</Text>
        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

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
});