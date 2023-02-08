import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from 'react-native'

import { connect } from "react-redux";
import { autoLogin } from '../redux/actions/userAction'

export default function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('username')
      .then((value) => {
        console.log(value)
        if (value != null) {
          props.goMain(value)
          props.navigation.replace('HomeScreen')
        } else {
          props.navigation.replace('LoginScreen')
          console.log(value)
        }
      })
    }, 3000)
  }, [])
}
return (
  <View>
    <Text> 스플래쉬 화면 </Text>
  </View>
)