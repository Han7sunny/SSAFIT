import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { theme } from '../../components/theme'
import { emailValidator, passwordValidator } from '../../components/AuthValidator'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: ''})
  const [password, setPassword] = useState({ value: '', error: ''})

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }]
    })
  }

  // const onLoginPressed = useCallback(async () => {
  //   if (loading) {
  //     return
  //   };
  //   try {
  //     setLoading(true)
  //     const response = await axios.post(
  //       ``,
  //       {
  //         email,
  //         password
  //       }
  //       )
  //   } catch(err) {
  //     console.log(err)
  //   } 
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'RoutineListScreen' }]
  //   })
  // }, [email, loading, password])

  return (
    <View>
      <Text style={styles.header}>Welcome~~</Text>
      <TextInput 
        label="Email"
        returnKeyType="next"  // 폰 키보드에 next를 띄워줌!!
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: ''})}
        error={!!email.error}   // [명시적 형변환] !!를 붙이며는... boolean 타입으로 생각해서.. 처리해준다...? 그니까 에러 여부를 확인해주는 용도
        errorText={email.error}
        autoCaplitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput 
        label="Password"
        returnKeyType="done"  // 폰 키보드에 done을 띄워줌!!
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: ''})}
        error={!!password.error}   // [명시적 형변환] !!를 붙이며는... boolean 타입으로 생각해서.. 처리해준다...? 그니까 에러 여부를 확인해주는 용도
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    header: {
      fontSize: 21,
      color: theme.colors.primary,
      fontWeight: 'bold',
      paddingVertical: 12,
    }
  })