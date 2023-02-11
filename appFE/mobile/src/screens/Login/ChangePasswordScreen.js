import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
// import Button from '../../components/Button';
import {theme} from '../../components/theme';
import {
  passwordValidator,
  checkPasswordValidator,
} from '../../components/AuthValidator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
    });
  }, []);

  const onSubmit = async () => {
    const passwordError = passwordValidator(password.value);
    const checkPasswordError = checkPasswordValidator(
      password.value,
      checkPassword.value,
    );
    if (passwordError || checkPasswordError) {
      setPassword({...password, error: passwordError});
      setCheckPassword({...checkPassword, error: checkPasswordError});
      return;
    }
    const result = (
      await axios.put(
        `http://${ip}/user/change-password`,
        {
          password: password.value,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data.success;
    console.log(result);
  };

  return (
    <View>
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Check Password"
        returnKeyType="done"
        value={checkPassword.value}
        onChangeText={text => setCheckPassword({value: text, error: ''})}
        error={!!checkPassword.error}
        errorText={checkPassword.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onSubmit} style={{marginTop: 24}}>
        변경
      </Button>
    </View>
  );
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
});
