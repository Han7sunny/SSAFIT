import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

const Title = styled.Text`
  font-size: 60px;
  font-weight: 800;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function MemberScreen({member}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {member.on_off && <Image source={require('./on.png')} style={{width:50, height: 50}}/>}
      {!member.on_off && <Image source={require('./off.png')} style={{width:50, height: 50}}/>}
      <Title>{member.userName}</Title>
      <Text>{member.achievementRate}</Text>
    </View>
  )
}


