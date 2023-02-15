import React, {useState, useCallback, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Alert} from 'react-native';
import {Text, Modal} from 'react-native-paper';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {theme} from '../../components/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [id, setId] = useState({value: '', error: ''});
  const [findId, setFindId] = useState('');
  const [password, setPassword] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
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

  const [isOpenModal, setIsOpenModal] = useState(false);
  const showModal = () => {
    setIsOpenModal(true);
  };
  const hideModal = () => {
    setIsOpenModal(false);
  };

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
    <View style={{height: '100%'}}>
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
        <TouchableOpacity onPress={() => showModal()}>
          <Text style={[styles.forgot, {marginBottom: 5}]}>
            {' '}
            아이디를 잊으셨나요?{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={[styles.forgot, {marginBottom: 24}]}>
            {' '}
            비밀번호를 잊으셨나요?{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text> 계정이 없으신가요? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}> Sign Up </Text>
        </TouchableOpacity>
      </View>
      <Modal
        presentationStyle={'FullScreen'}
        visible={isOpenModal}
        onDismiss={hideModal}
        contentContainerStyle={{backgroundColor: 'white', height: 300}}>
        {findId === '' && (
          <View>
            <Text>아이디 찾기</Text>
            <TextInput
              label="Email"
              value={email.value}
              onChangeText={text => setEmail({value: text, error: ''})}
              error={!!email.error}
              errorText={email.error}
            />
            <Button
              mode="contained"
              onPress={() => {
                axios
                  .post(`${ip}/user/findId`, {
                    email: email.value,
                  })
                  .then(res => {
                    setFindId(res.data);
                    console.log(res.data);
                  });
              }}>
              확인
            </Button>
          </View>
        )}
        {findId !== '' && (
          <View>
            <Text>ID</Text>
            <Text>{findId}</Text>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
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
