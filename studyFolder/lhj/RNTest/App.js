import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import MyButton from './components/MyButton';

export default function App() {
  const name = 'hakjun1';
  return (
    <View style={styles.container}>
      <Text>Props</Text>
      <MyButton title='Button'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
