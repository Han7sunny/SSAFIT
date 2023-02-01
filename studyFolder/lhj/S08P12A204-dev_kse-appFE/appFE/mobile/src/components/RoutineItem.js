import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation  } from '@react-navigation/native'

export default function RoutineItem(props) {
  const navigation = useNavigation()
  // let routineId = props.id
  return (
    <View> 
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('RoutineDetailScreen', { routineId : props.id, routineTitle: props.title }) }
      >
        <Text style={styles.id}>{props.id}</Text>
        <Text>{props.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 2
  },
  id: {
    fontSize: 30
  }
})