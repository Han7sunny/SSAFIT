import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

AsyncStorage.getItem('username', (err, result) => {
  const UserInfo = JSON.parse(result)
  const accessToken = UserInfo.token
  console.log('토큰 :' , accessToken)
})

export default function CreateArticleScreen({ navigation }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function onPost() {
    axios({
      method: 'post',
      url: 'http://70.12.246.116:8080/board/post',
      headers: {
        authorization: `${accessToken}`
      },
      data: {
        "board_id": 0,
        "category_id": 0,
        "content": content,
        "modified_time": "2023-02-01T04:25:21.613Z",
        "registered_time":"",
        "share": true,
        "title": title,
        "user_id": "asdf1234"
      }
    })
  }

  const onChangeTitle = (event) => {
    event.persist()
    // console.log(event.nativeEvent)
    setTitle(event.nativeEvent.title)
  }
  const onChangeContent = (event) => {
    event.persist()
    // console.log(event.nativeEvent)
    setContent(event.nativeEvent.content)
    }

  const [routineData, setRoutineData] = useState([])
  const [selected, setSelected] = useState('')   // selected : 선택된 routineId가 저장됨
  useEffect(() => {
    async function getData() {
      axios({
        method: 'get',
        url: 'http://70.12.246.116:8080/routine/get-user-routine/asdf1234'
      })
      .then(function (res) {
        let newData = res.data.map((item) => {
          return {key: item.routineId, value: item.name}
        })
        setRoutineData(newData)
      })
      .catch(function (error) {
        console.log(error)
      }, [])
    }
    getData()
  })
  
  // const data = [
  //   {key:'1', value:'Mobiles', disabled:false},
  //   {key:'2', value:'Appliances'},
  //   {key:'3', value:'Cameras'},
  //   {key:'4', value:'Computers', disabled:false},
  //   {key:'5', value:'Vegetables'},
  //   {key:'6', value:'Diary Products'},
  //   {key:'7', value:'Drinks'},
  // ]

  // const [createTime, setCreateTime] = useState(new Date())
  // const [modyfiedTime, setModyfiedTime] = useState(undefined)
  
  
  return (
    <View>
      <Text> Create Article </Text>
      <TextInput
        label="제목"
        value={title}
        onChange={(value) => onChangeTitle(value)}
        />
        <View style={styles.centeredView}>
          <SelectList 
            data={routineData}
            save="key"
            placeholder='루틴을 선택하세요!'
            setSelected={(key) => {setSelected(Number(key)), console.log('selected :',selected)}}
            onSelect={() => alert(selected)}
            />
        </View>

      <TextInput
        label="내용을 입력하세요"
        value={content}
        onChange={(value) => onChangeContent(value)}
        />
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('ArticleListScreen')
          onPost()
        }}
      >
        저장하기
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


// 비운의 Modal
// const [visible, setVisible] = useState(false)
// const showModal = () => setVisible(true)
// const hideModal = () => setVisible(false)
// const containerStyle = {backgroundColor: 'white', padding: 20}
{/* <Modal 
visible={visible} 
onDismiss={hideModal} 
contentContainerStyle={containerStyle}
style={{backgroundColor: "black"}}
>
<Text>선택할 나의 운동 루틴 리스트 보여주기</Text>
<View style={styles.modalView}>
<FlatList 
data={myRoutine}
    renderItem={({item}) => (
      <RoutineListItem 
      routineId={item.routineId}
      name={item.name}
      />
      )}
      >
  </FlatList>
  </View>
</Modal>
<Button style={{marginTop: 30}} onPress={() => { showModal, getRoutineList }}>
  Show
</Button> */}