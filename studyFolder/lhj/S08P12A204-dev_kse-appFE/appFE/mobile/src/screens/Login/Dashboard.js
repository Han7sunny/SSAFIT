import React from "react";
import Button from "../../components/Button";
import { View } from 'react-native'

export default function Dashboard({ navigation }) {
  return (
    <View>
      <Button
        mode="outlined"
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
        }
      >
        Logout
      </Button>
    </View>
  )
}