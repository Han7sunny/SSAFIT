import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import UploadModeModal from './UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Text, Button, IconButton, MD3Colors, Avatar} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
  //  storageOptions: {
  //   privateDirectory: true,
  //   skipBackup: true,
  //   path: 'images',
  // },
};
export default function ChangeImageScreen({navigation, route}) {
  const [photoUri, setPhotoUri] = useState(route.params.uri);
  const [accessToken, setAccessToken] = useState('');
  const [UserId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [UserName, setUserName] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
      setUserId(UserInfo.id);
      setRole(UserInfo.role);
      setUserName(UserInfo.username);
    });
  }, []);
  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    console.log(res);
    const localUri = res.assets[0].uri;
    const uriPath = localUri.split('//').pop();
    setPhotoUri('file://' + uriPath);
    console.log(localUri);
    console.log(res.assets[0]);
  };

  const changeImage = async () => {
    var body = new FormData();
    var photo = {
      uri: photoUri,
      type: 'multipart/form-data',
      name: `${UserId}.jpg`,
    };
    body.append('image', photo);
    const result = (
      await axios.put(`http://${ip}/user/modifyFaceAuth`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
          'content-type': 'multipart/form-data',
        },
      })
    ).data;
    console.log(result);
    if (result) {
      AsyncStorage.setItem(
        'username',
        JSON.stringify({
          username: UserName,
          id: UserId,
          token: accessToken,
          role: role,
          imageUri: photoUri,
        }),
        () => {
          console.log('AsyncStorage에 유저 정보 저장 완료');
        },
      );
      navigation.navigate('MainMyPageScreen', {state: true});
    }
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);

  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      // 안드로이드
      setModalVisible(true); // visible = true
    } else {
      // iOS
    }
  };

  return (
    <View style={{alignItems: 'center', marginTop: 100}}>
      <Text variant="displaySmall" style={{margin: 20}}>
        {' '}
        얼굴 인식 재등록
      </Text>
      <Text variant="headlineSmall"> 사진을 재등록하고 싶으신가요?</Text>
      <View style={{alignItems: 'center', margin: 30}}>
        <View style={{position: 'relative', margin: 0}}>
          <Avatar.Image
            size={150}
            source={
              photoUri === 'undefined'
                ? require('../Group/icon.png')
                : {uri: photoUri}
            }
            style={{backgroundColor: '#fff'}}
          />
          {/* <Image
            source={
              photo == undefined ? require('../Group/icon.png') : {uri: photo}
            }
            style={{width: 150, height: 150}}
          /> */}
          <IconButton
            icon="plus-circle-outline"
            iconColor={MD3Colors.error50}
            size={50}
            style={{bottom: 65, right: -75, zIndex: 1}}
            onPress={modalOpen}
          />
        </View>
      </View>
      <Button
        mode="contained"
        onPress={changeImage}
        buttonColor="black"
        style={styles.button}
        labelStyle={styles.label}>
        등록
      </Button>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 50,
    margin: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
});
