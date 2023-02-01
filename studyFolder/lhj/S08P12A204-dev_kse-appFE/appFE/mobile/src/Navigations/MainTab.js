import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
// import MainScreen from '../screens/Main/MainScreen'
// import RoutineListScreen from '../screens/Main/RoutineListScreen'
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import {Test} from '../screens/Main'

const Tab = createBottomTabNavigator()

function Test() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> TEST </Text>
    </View>
  )
}

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Test" 
        conponent={Test}
        />
      {/* <Tab.Screen 
        name="MainScreen" 
        conponent={MainScreen}
        />
      <Tab.Screen 
        name="RoutineListScreen" 
        conponent={RoutineListScreen}
        /> */}
    </Tab.Navigator>
  )
}