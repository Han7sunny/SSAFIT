import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, Button as Btn} from 'react-native-paper';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {theme} from '../../components/theme';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  checkPasswordValidator,
} from '../../components/AuthValidator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({navigation}) {
  const [Data, setData] = useState({
    name: '',
    id: '',
    email: '',
    password: '',
  });
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [checkCode1, setCheckCode1] = useState('');
  // let checkCode1 = '';
  const [checkCode2, setCheckCode2] = useState('');
  const [emailCode, setEmailCode] = useState(false); // 인증하기 버튼 눌렀을 때만 창 나타나도록 할 변수
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
  }, []);

  const onSubmit = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const checkPasswordError = checkPasswordValidator(
      password.value,
      checkPassword.value,
    );
    if (emailError || passwordError || checkPasswordError) {
      // setName({ ...name, error: nameError })
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setCheckPassword({...checkPassword, error: checkPasswordError});
      return;
    }
    navigation.navigate('Home', {
      screen: 'AddFacePhotoScreen',
      params: {data: Data},
    });
  };
  return (
    <View>
      <TextInput
        label="닉네임"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => {
          setName({value: text, error: ''});
        }}
        error={!!name.error}
        errorText={name.error}
        onEndEditing={() => {
          switch (nameValidator(name.value)) {
            case `Name can't be empty.`:
              alert('닉네임을 입력하세요!');
              break;
            case `2글자 이상 10글자 미만으로 입력해주세요.`:
              alert('2글자 이상 10글자 미만으로 입력해주세요.');
              break;
          }
        }}
      />
      <Btn
        onPress={() => {
          axios({
            method: 'get',
            url: `${ip}/user/name-check?name=${name.value}`,
          })
            .then(res => {
              console.log(res.data);
              if (res.data.msg === true) {
                setName({value: '', error: ''});
                alert('중복된 닉네임입니다.');
              } else {
                alert('사용 가능한 닉네임입니다.');
                setData(pre => Object.assign({}, pre, {name: name.value}));
              }
            })
            .catch(err => {
              console.log(err);
            });
        }}>
        중복확인
      </Btn>
      <TextInput
        label="ID"
        returnKeyType="next"
        value={id.value}
        onChangeText={text => setId({value: text, error: ''})}
        error={!!id.error}
        errorText={id.error}
        autoCapitalize="none"
      />
      <Btn
        onPress={() => {
          axios({
            method: 'get',
            url: `${ip}/user/id-check?id=${id.value}`,
          })
            .then(res => {
              const isUsable = res.data.msg;
              if (isUsable === '2') {
                alert('사용 가능한 아이디입니다.');
                setData(pre => Object.assign({}, pre, {id: id.value}));
              } else if (isUsable === '1') {
                setId({value: '', error: ''});
                alert('유효하지 않은 아이디입니다.');
              } else {
                setId({value: '', error: ''});
                alert('중복된 아이디입니다.');
              }
            })
            .catch(err => {
              console.log(err);
            });
        }}>
        중복확인
      </Btn>

      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        onEndEditing={() => {
          switch (passwordValidator(password.value)) {
            case `Password can't be empty.`:
              alert('비밀번호를 입력하세요!');
              break;
            case `Password must be at least 8 characters.`:
              alert('8글자 이상 17글자 미만으로 입력해주세요.');
              break;
            default:
              axios({
                method: 'post',
                url: `${ip}/user/password-verification`,
                data: {
                  email: 'string',
                  id: 'string',
                  name: 'string',
                  password: password.value,
                },
              })
                .then(res => {
                  console.log(res.data);
                  if (res.data.msg === false) {
                    Alert.alert(
                      '비밀번호 형식이 잘못되었습니다.',
                      '영문자, 숫자, 특수기호가 최소한 하나씩 들어간 8 ~ 16자리 비밀번호를 입력해주세요',
                      [
                        {
                          text: '확인',
                          onPress: () => setPassword({value: '', error: ''}),
                        },
                      ],
                    );
                  } else
                    setData(pre =>
                      Object.assign({}, pre, {password: password.value}),
                    );
                })
                .catch(err => {
                  console.log(err);
                });
          }
        }}
      />
      <TextInput
        label="Check Password"
        returnKeyType="done"
        value={checkPassword.value}
        onChangeText={text => setCheckPassword({value: text, error: ''})}
        error={!!checkPassword.error}
        errorText={checkPassword.error}
        secureTextEntry
        onEndEditing={() => {
          if (
            checkPasswordValidator(password.value, checkPassword.value) !== ''
          ) {
            Alert.alert(
              '비밀번호가 잘못되었습니다.',
              '비밀번호가 다릅니다. 확인해주세요',
            );
          }
        }}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        onEndEditing={() => {
          switch (emailValidator(email.value)) {
            case `Email can't be empty.`:
              alert('이메일을 입력하세요!');
              break;
            case `Please check, the email is valid.`:
              alert('이메일형식을 확인해주세요');
              break;
            default:
              axios({
                method: 'get',
                url: `${ip}/user/email-check?email=${email.value}`,
              })
                .then(res => {
                  console.log(res.data);
                  if (res.data.msg === 'true') alert('중복된 이메일입니다.');
                })
                .catch(err => {
                  console.log(err);
                });
          }
        }}
      />
      <Btn
        onPress={() => {
          axios({
            method: 'post',
            url: `${ip}/user/create-code`,
            data: {
              email: email.value,
            },
          })
            .then(res => {
              console.log(res.data);
              setCheckCode1(res.data.msg);
            })
            .catch(err => {
              console.log(err);
            });
          setEmailCode(true);
        }}>
        이메일 인증
      </Btn>
      {emailCode && (
        <View>
          <TextInput
            label="이메일로 받은 코드를 입력하세요."
            value={checkCode2}
            onChangeText={text => setCheckCode2(text)}
            onEndEditing={() => {
              axios({
                method: 'post',
                url: `${ip}/user/check-code`,
                data: {
                  code: checkCode2,
                  id: checkCode1,
                },
              })
                .then(res => {
                  console.log(res.data);
                  if (res.data.msg === 'true')
                    setData(pre =>
                      Object.assign({}, pre, {email: email.value}),
                    );
                })
                .catch(err => {
                  console.log(err);
                });
            }}
          />
        </View>
      )}
      <Button mode="contained" onPress={onSubmit} style={{marginTop: 24}}>
        다음
      </Button>
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}> Login </Text>
        </TouchableOpacity>
      </View>
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
