import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import CustomButton from '../../components/CustomButton'

function LoginForm() {
    return (
        
        <View style={styles.otherButtonContainer}>
            <CustomButton 
                onPress={onSignInPressed}
                text="Sign In"
            />
            <Pressable onPress={onForgotPasswordPressed}>
                <Text>비밀번호 찾기</Text>
            </Pressable>
            <Text>|</Text>
            <Pressable onPress={onSignUpPressed}>
                <Text>회원가입 하기</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    otherButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    otherButtonText: {
        fontWeight: '500',
        fontSize: 12,
        color: '#EEEEEE'
    }
})

export default LoginForm