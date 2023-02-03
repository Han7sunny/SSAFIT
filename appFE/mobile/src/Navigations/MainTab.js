import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import HomeScreen from '../screens/Main/HomeScreen'
import MyRoutineListScreen from '../screens/Main/MyRoutineListScreen'
import  GroupListScreen  from '../screens/Group/GroupListScreen'
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import {Test} from '../screens/Main'

const Routes = {
  HomeScreen,
  MyRoutineListScreen,
  GroupListScreen
}

const MainStack = createNativeStackNavigator(Routes)

const Tab = createBottomTabNavigator(
  {
    MainScreen: {
      screen: MainStack
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'HomeScreen'
  }
)

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
        name="MyRoutineListScreen" 
        conponent={MyRoutineListScreen}
        /> */}
    </Tab.Navigator>
  )
}