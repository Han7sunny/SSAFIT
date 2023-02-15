import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Avatar, IconButton} from 'react-native-paper';
import UploadModeModal from '../My/UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
  storageOptions: {
    privateDirectory: true,
    skipBackup: true,
    path: 'images',
  },
};
export default function AddFacePhotoScreen({navigation, route}) {
  const data = route.params.data;
  const [photoUri, setPhotoUri] = useState('');
  const [ip, setIP] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
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

  const addImage = async () => {
    var body = new FormData();
    var photo = {
      uri: photoUri,
      type: 'multipart/form-data',
      name: `${data.name}.jpg`,
    };
    body.append('join', JSON.stringify(data));
    body.append('image', photo);
    console.log(body);
    axios
      .post(`${ip}/user/join`, body)
      .then(res => {
        console.log(res.data, '성공');
        if (res.success === true) {
          navigation.push('HomeScreen');
        }
      })
      .catch(err => {
        console.log(err);
      });
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'LoginScreen'}],
    // });
    // console.log(result);
    // if (result) {
    //   AsyncStorage.setItem(
    //     'username',
    //     JSON.stringify({
    //       username: '',
    //       id: '',
    //       token: '',
    //       role: '',
    //       imageUri: photoUri,
    //     }),
    //     () => {
    //       console.log('AsyncStorage에 유저 정보 저장 완료');
    //     },
    //   );
    // }
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
    <View style={{alignItems: 'center'}}>
      <Text variant="headlineLarge" style={{fontWeight: 'bold', margin: 20}}>
        얼굴 인식 등록
      </Text>
      <Text variant="titleLarge">얼굴 인식을 통해 로그인을 합니다.</Text>
      <Text variant="titleLarge">사진을 등록해주세요</Text>
      <View style={{alignItems: 'center'}}>
        <View style={{position: 'relative', marginTop: 20}}>
          {photoUri === '' && (
            <Avatar.Icon
              size={150}
              icon="account"
              style={{backgroundColor: '#000'}}
            />
          )}
          {photoUri !== '' && (
            <Avatar.Image
              size={150}
              source={{uri: photoUri}}
              style={{backgroundColor: '#fff'}}
            />
          )}
          <IconButton
            icon="plus-circle-outline"
            size={50}
            iconColor="red"
            style={{bottom: 60, right: -75, zIndex: 1}}
            onPress={modalOpen}
          />
        </View>
      </View>
      <Button
        mode="contained"
        onPress={addImage}
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
