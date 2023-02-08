import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';

export default function MyGroupSimple({item, navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MyGroupDetail', {id: item.groupId})}>
      <View>
        <Text style={styles.box}>{item.name}</Text>
        <Text style={[styles.box, {fontSize: 20}]}>
          {item.start_date} ~ {item.end_date}
        </Text>
      </View>
      <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('./icon.png')}
          style={{width: 50, height: 50, margin: 10}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 25}}>
          {item.current_member} 명
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    backgroundColor: 'aliceblue',
    maxHeight: 400,
    padding: 10,
    height: 100,
    width: 370,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  box: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
});
