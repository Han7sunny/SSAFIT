import axios from 'axios'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { IconButton , MD3Colors } from 'react-native-paper'
// import { useNavigation  } from '@react-navigation/native'

export default function RoutineListItem(props) {
  // const navigation = useNavigation()
  return (
    <View style={styles.container}> 
    <Text>Routine List Item</Text>
        <Text>{props.routineId}</Text>
        <Text style={styles.routineName}>{props.name}</Text>
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
    marginBottom: 0.5
  },
  routineName: {
    fontSize: 20
  }
})