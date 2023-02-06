/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

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

import {
  MainMyPageScreen,
  ChangeImageScreen,
  AddGroupScreen,
  AddGroupDetailScreen,
  AddScreen,
  CancelScreen,
} from './src/screens/My'

import {
  AnnouncementListScreen,
  AddAnnouncementScreen,
  AnnouncementDetailScreen,
} from './src/screens/Announcement'

import RoutineItem from './src/components/RoutineListItem';
import ArticleItem from './src/components/ArticleItem';
import { Text } from 'react-native-paper';


const Tab = createBottomTabNavigator();

const MainSide = createDrawerNavigator()
const GroupSide = createDrawerNavigator();
const CommunitySide = createDrawerNavigator();
const MyPageSide = createDrawerNavigator();
const LoginSide = createDrawerNavigator();

const Announcement = createNativeStackNavigator();

const MainSideNavigator = () => {
  return(
  <MainSide.Navigator initialRouteName='HomeScreen'>
    <MainSide.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
    <MainSide.Screen name="CreateRoutineScreen" component={CreateRoutineScreen} options={{ headerShown: false }}/>
    <MainSide.Screen name="MyRoutineListScreen" component={MyRoutineListScreen} options={{ headerShown: false }}/>
    <MainSide.Screen name="RoutineDetailScreen" component={RoutineDetailScreen} options={{ headerShown: false }}/>
    <MainSide.Screen name="MyGroup" component={MyGroup}/>
    <MainSide.Screen name='RoutineItem' component={RoutineItem} />
  </MainSide.Navigator>
  )
}
const GroupSideNavigator = () => {
  return(
  <GroupSide.Navigator initialRouteName='GroupListScreen'>
    <GroupSide.Screen name="GroupListScreen" component={GroupListScreen} options={{ headerShown: false }}/>
    <GroupSide.Screen name="GroupListDetailScreen" component={GroupListDetailScreen} options={{ headerShown: false }}/>
    <GroupSide.Screen name="MyGroupListScreen" component={MyGroupListScreen} options={{ headerShown: false }}/>
    <GroupSide.Screen name="MyGroupDetail" component={MyGroupDetail} options={{ headerShown: false }}/>
    <GroupSide.Screen name="CreateGroupScreen" component={CreateGroupScreen} options={{ headerShown: false }}/>
  </GroupSide.Navigator>
  )
}
const CommunitySideNavigator = () => {
  return(
  <CommunitySide.Navigator initialRouteName='CommunityScreen'>
    <CommunitySide.Screen name="CommunityScreen" component={CommunityScreen} options={{ headerShown: false }}/>
    <CommunitySide.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }}/>
    <CommunitySide.Screen name="CreateArticleScreen" component={CreateArticleScreen} options={{ headerShown: false }}/>
    <CommunitySide.Screen name="ArticleListScreen" component={ArticleListScreen} options={{ headerShown: false }}/>
    <CommunitySide.Screen name='ArticleItem' component={ArticleItem} />
  </CommunitySide.Navigator>
  )
}

const MyPageSideNavigator = () =>{
  return(
  <MyPageSide.Navigator initialRouteName='MainMyPageScreen'>
    <MyPageSide.Screen name="MainMyPageScreen" component={MainMyPageScreen} options={{ headerShown: false }}/>
    <MyPageSide.Screen name="ChangeImageScreen" component={ChangeImageScreen} options={{ headerShown: false }}/>
    <MyPageSide.Screen name="AddGroupScreen" component={AddGroupScreen} options={{ headerShown: false }}/>
    <MyPageSide.Screen name="AddGroupDetailScreen" component={AddGroupDetailScreen} options={{ headerShown: false }}/>
    <MyPageSide.Screen name="AddScreen" component={AddScreen} options={{ headerShown: false }}/>
    <MyPageSide.Screen name="CancelScreen" component={CancelScreen} options={{ headerShown: false }}/>
  </MyPageSide.Navigator>
  )

}
const AnnouncementNavigator = () =>{
  return(
  <Announcement.Navigator initialRouteName='AnnouncementListScreen'>
    <Announcement.Screen name="AnnouncementListScreen" component={AnnouncementListScreen} options={{ headerShown: false }}/>
    <Announcement.Screen name="AddAnnouncementScreen" component={AddAnnouncementScreen} options={{ headerShown: false }}/>
    <Announcement.Screen name="AnnouncementDetailScreen" component={AnnouncementDetailScreen} options={{ headerShown: false }}/>
  </Announcement.Navigator>
  )
}

const LoginSideNavigator = () =>{
  return(
  <LoginSide.Navigator initialRouteName='MainMyPageScreen'>
    <LoginSide.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}/>
    <LoginSide.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
    <LoginSide.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}/>
    <LoginSide.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }}/>
    <LoginSide.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
  </LoginSide.Navigator>
  )
}


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={MainSideNavigator}/>
        <Tab.Screen name="Group" component={GroupSideNavigator}/>
        <Tab.Screen name="Community" component={CommunitySideNavigator}/>
        <Tab.Screen name="MyPage" component={MyPageSideNavigator}/>
        <Tab.Screen name="Login" component={LoginSideNavigator}/>
        <Tab.Screen name="Announcement" component={AnnouncementNavigator}/>
      
       

        {/* components */}
        
      </Tab.Navigator>
      

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
