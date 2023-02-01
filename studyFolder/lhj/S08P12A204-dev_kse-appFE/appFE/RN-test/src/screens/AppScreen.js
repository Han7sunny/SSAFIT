import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginForm from '../components/Login/LoginForm'

const Stack = createNativeStackNavigator()
// createNativeStackNavigator 함수를 사용하면 객체 Stack이 만들어지고.
// 이 안에 Stack.Navigator와 Stack.Screen 컴포넌트가 있음!

export default function MainScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator>      {/* Stack.Navigator는 NavigationContainer 안에 있어야 정상 작동 */}
                {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
                <Stack.Screen name="Login" component={LoginForm} />
                {/* Stack.Screen의 name은 화면 이름, component는 이동할 화면을 설정하는 Props임.
                    Stack.Navigator의 initialRouteName으로 초기 화면을 지정할 수 있음
                기본 값은 첫번째 Stack.Screen의 컴포넌트 */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// const styles = StyleSheet.create({
//     btn: {
//         backgroundColor: '#086972',
//         padding: 10,
//         margin: 10,
//         borderRadius: 10,
//       },
// })