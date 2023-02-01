import React from 'react'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import Button from '../../components/Button'
import RoutineDetail from '../../components/RoutineDetail'

export default function RoutineDetailScreen({ route, navigation }) {
  let { routineId, routineTitle } = route.params
  return (
    <View>
      <Text> Routine Detail Screen! </Text>

      {/* <Text>{routineId} = {routineTitle}</Text> */}
      <RoutineDetail 
        id={routineId} title={routineTitle}
      />
      <Button>
        
      </Button>
    </View>

  )
}