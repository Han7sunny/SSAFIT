import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'

export default function GroupList({Lists}) {
  // console.log(Lists)
  return (
    <FlatList
      style={styles.list}
      data={Lists}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => (
        // console.log(item.name)
        <View style={styles.item}>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
          {/* console.log(item.name) */}
        </View>
        // <Text>aa</Text>
      )}
      keyExtractor={item => item.name.toString()}
    />
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