import React from 'react'
import { StyleSheet, View, Button, TextInput, Text, ActivityIndicator, ScrollView } from 'react-native'
import LoginForm from '../../components/Login/LoginForm'

const LoginComponent = ({navigation}) => {
    state = {
        loading: false,
    }
    goWithoutLogin = () => {
        navigation.navigate('Login')
    }

    if (this.state.loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.container}>
              <View>
                <LoginForm />
              </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        backgroundColor: '#7487C5',
        padding: 130,
      },
})

export default LoginComponent