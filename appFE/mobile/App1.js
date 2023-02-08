/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  HomeScreen,
  CreateRoutineScreen,
  MyRoutineListScreen,
  RoutineDetailScreen,
  MyGroup,
} from './src/screens/Main';

import {
  MyGroupListScreen,
  MyGroupDetail,
  GroupListScreen,
  CreateGroupScreen,
  GroupListDetailScreen
} from './src/screens/Group'

import {
  CommunityScreen,
  ArticleDetailScreen,
  CreateArticleScreen,
  ArticleListScreen,
} from './src/screens/Community'

import RoutineItem from './src/components/RoutineItem';
import ArticleItem from './src/components/ArticleItem';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const TabNavigator = () =>{
  <Tab.Navigator initialRouteName="HomeScreen">
    <Tab.Screen name="HomeScreen" component={HomeScreen} />
    <Tab.Screen name="MyGroupListScreen" component={MyGroupListScreen} />
    <Tab.Screen name="GroupListScreen" component={GroupListScreen} />
  </Tab.Navigator>
}

function App() {
  return (
    <NavigationContainer>
      {/* <RootStack /> */}
      {/* <LogContext.Provider value="Hi">
      </LogContext.Provider> */}

      <Stack.Navigator initialRouteName='HomeScreen'>
        {/* <Stack.Screen 
          name="MainTab" 
          component={MainTab} 
          options={{ headershown: false }}/> */}
        {/* Main */}
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="CreateRoutineScreen" component={CreateRoutineScreen}/>
        <Stack.Screen name="MyRoutineListScreen" component={MyRoutineListScreen}/>
        <Stack.Screen name="RoutineDetailScreen" component={RoutineDetailScreen}/>
        <Stack.Screen name="MyGroup" component={MyGroup}/>

        {/* Auth(Login) */}
        <Stack.Screen name="StartScreen" component={StartScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>

        {/* Group */}
        <Stack.Screen name="MyGroupListScreen" component={MyGroupListScreen}/>
        <Stack.Screen name="MyGroupDetail" component={MyGroupDetail}/>
        
        <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen}/>

        <Stack.Screen name="GroupListScreen" component={GroupListScreen}/>
        <Stack.Screen name="GroupListDetailScreen" component={GroupListDetailScreen}/>

        {/* Community */}
        <Stack.Screen name="CommunityScreen" component={CommunityScreen}/>
        <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen}/>
        <Stack.Screen name="CreateArticleScreen" component={CreateArticleScreen}/>
        <Stack.Screen name="ArticleListScreen" component={ArticleListScreen}/>

        {/* components */}
        <Stack.Screen name='RoutineItem' component={RoutineItem} />
        <Stack.Screen name='ArticleItem' component={ArticleItem} />

        <Stack.Screen name='TabNavigator' component={TabNavigator} />
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
