import React, { useState } from 'react'
import { View } from 'react-native'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { emailValidator } from '../../components/AuthValidator'

<<<<<<< HEAD
// 비밀번호 찾기 컴포넌트 

=======
>>>>>>> 16d5a01b1e0962cd01e85f851c39959e735c0b65
export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: ''})

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <View>
      <TextInput 
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </View>
  )
}