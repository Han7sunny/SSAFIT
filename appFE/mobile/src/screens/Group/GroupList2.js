import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'

export default function GroupList2({Lists}) {
  console.log(Lists)
  return (
    Lists.map((item,idx) =>(
      <View key={idx} styles={styles.filled}>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
          <Text>-----------------</Text>
      </View>
    ))
    // console.log(Lists)
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#26a69a',
    borderWidth: 1,
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26a69a',
  },
  lineThrough: {
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
});