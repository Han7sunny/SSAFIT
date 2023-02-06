import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import Button from '../../components/Button'

export default function AddAnnouncementScreen({ navigation }) {
  const [Title, setTitle] = useState('');
  const [File, setFile] = useState('');
  const [Content, setContent] = useState('');

  const file = useRef();
  const content = useRef();

  return (
    <View>
      <View>
          <Text>제목</Text>
          <TextInput 
              value={Title}
              onChangeText={(value) => setTitle(value)}
              returnKeyType="next"
              onSubmitEditing={()=>{
                console.log(Title);
                if(isEnabled) file.current.focus()
              }}
            />
        </View>
        <View>
          <Text>첨부파일</Text>
          <TextInput 
              value={File}
              onChangeText={(value) => setFile(value)}
              returnKeyType="next"
              ref={file}
              onSubmitEditing={()=>{
                console.log(File);
                if(isEnabled) content.current.focus()
              }}
            />
        </View>
        <View>
          <Text>내용</Text>
          <TextInput 
              value={Content}
              onChangeText={(value) => setContent(value)}
              returnKeyType="next"
              ref={content}
              onSubmitEditing={()=>{
                console.log(Content);
              }}
            />
        </View>
      <Button
          mode="contained"
          onPress={() => {navigation.navigate('AnnouncementListScreen');}}>
          등록
      </Button>
    </View>
  )
}