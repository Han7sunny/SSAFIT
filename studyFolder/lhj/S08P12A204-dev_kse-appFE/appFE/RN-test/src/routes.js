import React, {Component} from 'react'
import {createNativeStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import LoginForm from './screens/Login/LoginScreen'
// import Main from './screens/Main'
// import Profile from './screens/Profile'

const AuthStack = createNativeStackNavigator()
const MainScreenTab = createBottomTabNavigator()

const isLoggedIn = false
// isLoggedIn = false 일 때 다른 화면은 못 보도록

const AppTabComponent = () => {
    return (
        <MainScreenTab.Navigator>
            {/* <MainScreenTab.Screen name="Main" component={Main}/>
            <MainScreenTab.Screen name="Profile" component={Profile}/> */}
        </MainScreenTab.Navigator>
    )
}
export const RootNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            {isLoggedIn ? (
                // 비회원이 눌렀을 때
                <AuthStack.Screen name="Login" component={LoginForm}/>
            ) : (
                // 회원이 눌렀을 때
                <>
                    {/* <AuthStack.Screen name="Main" component={AppTabComponent}/> */}
                    {/* <AuthStack.Screen name="Profile" component={Profile}/> */}
                </>
            )}
        </AuthStack.Navigator>
    )
}