import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {
  emailValidator,
  passwordValidator,
  checkPasswordValidator,
} from '../../components/AuthValidator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 비밀번호 찾기 컴포넌트
export default function ResetPasswordScreen({navigation}) {
  const [id, setId] = useState('');
  const [email, setEmail] = useState({value: '', error: ''});
  const [isChecked, setIsChecked] = useState(false);
  const [checkCode1, setCheckCode1] = useState('');
  const [checkCode2, setCheckCode2] = useState({value: '', error: ''});
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
  }, []);

  const checkEmail = async () => {
    const checked = (
      await axios.post(`${ip}/user/check-code`, {
        code: checkCode2.value,
        id: checkCode1,
      })
    ).data.msg;
    console.log(checked);
    if (checked === 'true') {
      navigation.navigate('ChangePasswordScreen', {id: id.value});
    } else setCheckCode2({...checkCode2, error: '인증코드가 다릅니다.'});
  };
  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }

    const checked = (
      await axios.get(
        `${ip}/user/find-password?email=${email.value}&id=${id.value}`,
      )
    ).data.msg;
    console.log(checked);
    if (checked === 'true') {
      axios
        .post(`${ip}/user/create-code`, {
          email: email.value,
        })
        .then(res => {
          console.log(res.data);
          setCheckCode1(res.data.msg);
        })
        .catch(err => {
          console.log(err);
        });
      setIsChecked(true);
    } else
      Alert.alert('찾기 오류', '아이디와 이메일이 일치하는 계정이 없습니다.');
  };

  return (
    <View>
      <Text>비밀번호 찾기</Text>
      <TextInput
        label="ID"
        returnKeyType="next"
        value={id.value}
        onChangeText={text => setId({value: text, error: ''})}
        error={!!id.error}
        errorText={id.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Email"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
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
        style={{marginTop: 16}}>
        이메일 보내기
      </Button>
      {isChecked && (
        <View>
          <TextInput
            label="이메일로 받은 코드를 입력하세요."
            value={checkCode2}
            onChangeText={text => setCheckCode2({value: text, error: ''})}
          />
          <Button mode="contained" onPress={checkEmail} style={{marginTop: 16}}>
            인증코드 확인
          </Button>
        </View>
      )}
    </View>
  );
}
