import React, {useState, useCallback, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {theme} from '../../components/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [id, setId] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [ip, setIP] = useState('');
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    async function isLogin() {
      AsyncStorage.getItem('ip', (err, result) => {
        const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
        setIP(UserInfo.ip);
      });
      AsyncStorage.getItem('username', (err, result) => {
        const UserInfo = JSON.parse(result);
        if (UserInfo) {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        }
      });
    }
    isLogin();
  });

  const onLoginPressed = () => {
    axios({
      method: 'post',
      url: `${ip}/user/login`,
      data: {
        id: id.value,
        password: password.value,
      },
    })
      .then(response => {
        console.log(response.data);
        if (response.data.success === true) {
          // response.data.token 저장
          const username = response.data.name;
          const token = response.data.token;
          const userId = response.data.id;
          const role = response.data.role;
          AsyncStorage.setItem(
            'username',
            JSON.stringify({
              username: username,
              id: userId,
              token: token,
              role: role,
            }),
            () => {
              console.log('AsyncStorage에 유저 정보 저장 완료');
              Alert.alert('OPPS', response.data.msg, [
                {
                  text: '확인',
                  onPress: () =>
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'HomeScreen'}],
                    }),
                },
              ]);
            },
          );
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'HomeScreen'}],
          // })
        } else {
          Alert.alert(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text style={styles.header}>SSAFIT</Text>
      <TextInput
        label="ID"
        returnKeyType="next"
        value={id.value}
        onChangeText={text => setId({value: text, error: ''})}
        error={!!id.error}
        errorText={id.error}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}> 비밀번호를 잊으셨나요? </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text> 계정이 없으신가요? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    fontSize: 50,
    color: theme.colors.primary,
    fontWeight: 'bold',
    // paddingVertical: 12,
    // marginLeft: ,
    padding: 50,
  },
});
