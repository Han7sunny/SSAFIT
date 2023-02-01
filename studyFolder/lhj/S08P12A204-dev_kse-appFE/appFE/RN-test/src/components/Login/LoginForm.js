import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CustomInput } from '../utils/CustomInput'

function LoginForm() {
    const [type, setType] = useState('로그인')
    const [action, setAction] = useState('로그인')
    const [actionMode, setActionMode] = useState('회원가입')
    const [hasErrors, setHasErrors] = useState(false)
    const [form, setForm] = useState({
        email: {
            value: '',
        },
        password: {
            value: ''
        },
        confirmPassword: {
            value: ''
        }
    })
    const updateInput = (name, value) => {
        setHasErrors(false)
        setForm(form => {
            return {...form, value: value}
        })
        console.warn(form)
    };
    // const confirmPassword = () => {
    //     return type != '로그인' ? (
    //         <CustomInput
    //             value={form.confirmPassword.value}
    //             secureTextEntry={true}
    //             placeholder='Confirm password'
    //             placeholderTextColor={'#ddd'}
    //             onChangeText={value => updateInput('confirmPassword', value)}
    //         />
    //     )
    // };

    // const formHasError = () => {
    //     return hasErrors ? (
    //         <View style={styles.errorContainer}>
    //             <Text style={styles.errorLabel}>
    //                 이메일 / 비밀번호를 확인해주세요.
    //             </Text>
    //         </View>
    //     )
    // },
    // changeForm = () => {
    //     type === '로그인'
    //         ? (setType('등록'), setAction('등록'), setActionMode('등록'))
    //         : (setType('로그인'), setAction('로그인'), setActionMode('로그인'))    
    // }
    return (
        <View>
            <CustomInput
                value={form.email.value}
                // setValue={setUsername}
                placeholder="email"
                onChangeText={value => updateInput('email', value)}
            />,
            <CustomInput
                value={form.password.value}
                // setValue={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={value => updateInput('password', value)}
            />
            {formHasError()}
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        marginBottom: 10,
        marginTop: 30,
        padding: 20,
        backgroundColor: '#ee3344',
      },
      errorLabel: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
      },
})
export default LoginForm