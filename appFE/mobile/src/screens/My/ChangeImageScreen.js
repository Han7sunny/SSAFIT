import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native'
import Button from '../../components/Button'
import UploadModeModal from "./UploadModeModal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const imagePickerOption = {
   mediaType: "photo",
   maxWidth: 768,
   maxHeight: 768,
   includeBase64: Platform.OS === "android",
};
export default function ChangeImageScreen({navigation}) {
 const my = {id:1, name:'이학준'}
 const [photo, setPhoto] = useState(undefined);
  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = (res) => { 
    if (res.didCancel || !res) {
      return;
    }
    console.log("PickImage", res);
  };
  
  // 카메라 촬영
  const onLaunchCamera = async () => {
    const result = launchCamera(imagePickerOption, onPickImage);
    if (result.didCancel) return null;
      
    const localUri = result.assets[0].uri;
    const uriPath = localUri.split("//").pop();
    const imageName = localUri.split("/").pop();
    setPhoto("file://"+uriPath);
  };
  
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = async () => {
    const result = await launchImageLibrary(imagePickerOption, onPickImage);
    if (result.didCancel) return null;
      
    const localUri = result.assets[0].uri;
    const uriPath = localUri.split("//").pop();
    const imageName = localUri.split("/").pop();
    setPhoto("file://"+uriPath);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);
  
  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === "android") { // 안드로이드
      setModalVisible(true); // visible = true
    } else { // iOS
      
    }
  }

 return (
  <View style={{alignItems: 'center'}}>
    <Text> 얼굴 인식 재등록</Text>
    <Text> 사진을 재등록하고 싶으신가요?</Text>
    <View style={{alignItems: 'center'}}>
        <View style={{position: 'relative', margin:0}}>
            { photo == undefined && <Image source={require('../Group/icon.png')} style={{width: 100, height: 100}}/> }
            { photo != undefined && <Image source={{uri:photo}}  style={{width: 100, height: 100}}/>}
            <Pressable 
                style={{width: 20, height: 20, bottom: 30, left: 70, zIndex: 1}}
                onPress={modalOpen}>
                <Image source={require('../Group/plus.png')} />
            </Pressable>
        </View>
    </View>
    <Button
        mode="contained"
        onPress={() => navigation.navigate('MainMyPageScreen')}
      >
        등록
      </Button>
      <UploadModeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary} />
  </View>
 ) 

}