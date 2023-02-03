/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { MainTab } from './src/Navigations';
// import LogContext from './contexts/LogContext';

import { 
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens/Login';

import {
  MyGroup,
  MainScreen,
  CreateRoutineScreen,
  RoutineListScreen,
  RoutineDetailScreen,
} from './src/screens/Main';

import {
  MyGroupListScreen,
  MyGroupDetail,
  GroupListScreen,
  CreateGroupScreen,
  GroupListDetailScreen
} from './src/screens/Group';

import RoutineItem from './src/components/RoutineItem';
import { Text } from 'react-native-paper';

const Stack = createNativeStackNavigator()

function App() {
  const NAME = 'lhj'
  return (
    <NavigationContainer>
      {/* <RootStack /> */}
      {/* <LogContext.Provider value="Hi">
      </LogContext.Provider> */}

      <Stack.Navigator>
        {/* <Stack.Screen 
          name="MainTab" 
          component={MainTab} 
          options={{ headershown: false }}/> */}
        {/* Main */}
        <Stack.Screen name="MainScreen" component={MainScreen}/>
        <Stack.Screen name="CreateRoutineScreen" component={CreateRoutineScreen}/>
        <Stack.Screen name="RoutineListScreen" component={RoutineListScreen}/>
        <Stack.Screen name="RoutineDetailScreen" component={RoutineDetailScreen}/>

        {/* Auth(Login) */}
        <Stack.Screen name="StartScreen" component={StartScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>

        {/* Group */}
        {/* <Stack.Screen name="MyGroup" component={MyGroup}/> */}
        <Stack.Screen name="MyGroupListScreen" component={MyGroupListScreen}/>
        <Stack.Screen name="MyGroupDetail" component={MyGroupDetail}/>
        
        <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen}/>

        <Stack.Screen name="GroupListScreen" component={GroupListScreen}/>
        <Stack.Screen name="GroupListDetailScreen" component={GroupListDetailScreen}/>

        {/* components */}
        {/* <Stack.Screen name='RoutineItem' component={RoutineItem} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;