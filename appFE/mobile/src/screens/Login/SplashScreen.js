import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
// import { connect } from 'react-redux'
import Splash from './Splash'

export default function SplashScreen({ navigation }) {
  return (
    <View>
      <Splash navigation={navigation} />
    </View>
  )
}