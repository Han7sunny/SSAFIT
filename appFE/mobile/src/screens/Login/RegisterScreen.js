import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button as Btn } from 'react-native-paper'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { theme } from '../../components/theme'
import { emailValidator, nameValidator, passwordValidator, checkPasswordValidator } from "../../components/AuthValidator";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [emailCode, setEmailCode] = useState(false)   // 인증하기 버튼 눌렀을 때만 창 나타나도록 할 변수
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')

  const onSubmit = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const checkPasswordError = checkPasswordValidator(password.value, checkPassword.value)
    if (emailError || passwordError || checkPasswordError) {
      // setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setCheckPassword({ ...checkPassword, error: checkPasswordError })
      return
    }
    axios({
      method: 'post',
      url: 'http://70.12.246.116:8080/user/join',
      data: {
        "name": name.value,
        "id": id.value,
        "password": password.value,
        "email": email.value,
      }
    })
    .then((res) => {
      console.log(res.data, "성공")
      if (res.success === true) {
        navigation.push('HomeScreen')
      }
    })
    .catch((err) => {
      console.log(err)
    })
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen'}],
    })
  }
  // const onSubmit = useCallback(
  //   async (e) => {
  //     const nameError = nameValidator(name.value)
  //     const emailError = emailValidator(email.value)
  //     const passwordError = passwordValidator(password.value)
  //     const checkPasswordError = checkPasswordValidator(password.value, checkPassword.value)
  //     if (nameError || emailError || passwordError || checkPasswordError) {
  //       setName({ ...name, error: nameError })
  //       setEmail({ ...email, error: emailError })
  //       setPassword({ ...password, error: passwordError })
  //       setCheckPassword({ ...checkPassword, error: checkPasswordError })
  //       return
  //     }
  //     e.preventDefault()
  //     try {
  //       await axios
  //         .post(`http://70.12.246.116:8080/user/join`, {
  //           "name": name.value,
  //           "id": id.value,
  //           "password": password.value,
  //           "email": email.value,
  //         })
  //         .then((res) => {
  //           console.log('response:', res)
  //           if (res.success === true) {
  //             navigation.push('HomeScreen')
  //           }
  //         })
  //     } catch (err) {
  //       console.error(err)
  //     }
  //     // navigation.reset({
  //     //   index: 0,
  //     //   routes: [{ name: 'Dashboard'}],
  //     // })
  //   },
  //   [id, email, name, password]
  // )
  return (
    <View>
      <TextInput 
        label="닉네임"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => {setName({ value: text, error:'' })}}
        error={!!name.error}
        errorText={name.error}
      />
      <Btn
        onPress={() => {
          axios({
            method: 'get',
            url: `http://70.12.246.116:8080/user/name-check?name=${name.value}`
          })
          .then((res) => {
            console.log(res.data)
            const isUsable = res.data.msg
            if (isUsable === true) {
              alert("사용 가능한 닉네임입니다.")
            } else {
              alert("중복된 닉네임입니다.")
            }
          })
          .catch((err) => {
            console.log(err)
          })
        }}
      >중복확인</Btn>
      <TextInput 
        label="ID"
        returnKeyType="next"
        value={id.value}
        onChangeText={(text) => setId({ value: text, error:'' })}
        error={!!id.error}
        errorText={id.error}
        autoCapitalize="none"
      />
      <Btn
        onPress={() => {
          axios({
            method: 'get',
            url: `http://70.12.246.116:8080/user/id-check?id=${id.value}`
            // url: `http://70.12.246.102:8080/user/id-check?id=${id}`
          })
          .then((res) => {
            const isUsable = res.data.msg
            if (isUsable === "2") {
              alert("사용 가능한 아이디입니다.")
            } else if (isUsable === "1") {
              alert("유효하지 않은 아이디입니다.")
            } else {
              alert("중복된 아이디입니다.")
            }
          })
          .catch((err) => {
            console.log(err)
          })
        }}
      >중복확인</Btn>
      
      <TextInput 
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error:'' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput 
        label="Check Password"
        returnKeyType="done"
        value={checkPassword.value}
        onChangeText={(text) => setCheckPassword({ value: text, error:'' })}
        error={!!checkPassword.error}
        errorText={checkPassword.error}
        secureTextEntry
      />
      <TextInput 
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error:'' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Btn
        onPress={() => {
          axios({
            method: 'get',
            url: `http://70.12.246.116:8080/user/create-code`
          })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
          setEmailCode(true)
        }}
      >이메일 인증</Btn>
      { emailCode && <View>
        <TextInput 
        label="코드를 입력하세요."
        />
      </View>}
      <Button
        mode="contained"
        onPress={onSubmit}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>  Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})