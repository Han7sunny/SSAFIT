import React from 'react';
// import { Text } from 'react-native-paper'
import {View, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button';

export default function StartScreen({navigation}) {
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home', {screen: 'LoginScreen'})}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Home', {screen: 'RegisterScreen'})}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 100,
    lineHeight: 26,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
});
