import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function MyGroup({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyGroupListScreen')}>
      <Text> OOO님의 그룹 목록 </Text>
    </TouchableOpacity>
  );
}
