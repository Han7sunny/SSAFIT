import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Button from '../../components/Button'

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function MyGroup() {
  return (
    <View>
      <Title> MyGroup </Title>
    </View>
  )
}