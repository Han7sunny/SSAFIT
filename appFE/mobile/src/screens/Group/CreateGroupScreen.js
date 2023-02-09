import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Switch,
  Modal,
  IconButton,
  RadioButton,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateGroupScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  }, []);
  const my = {memberid: 'lhj', isMember: false, userId: {userId}};
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectDate, setselectDate] = useState('');
  const [checked, setChecked] = React.useState('id');

  const [Data, setData] = useState({
    title: '',
    name: '',
    member: [],
    maxMemberNum: 0,
    startDate: '',
    endDate: '',
    startRecruitDate: '',
    endRecruitDate: '',
    goal: '',
    penalty: '',
    content: '',
  });

  const showDatePicker = date => {
    setDatePickerVisibility(true);
    setselectDate(date);
  };

  const hideDatePicker = () => setDatePickerVisibility(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    let day = date.toLocaleDateString().split('/');
    day = `${day[2]}-${day[0].padStart(2, '0')}-${day[1].padStart(2, '0')}`;
    switch (selectDate) {
      case 'startDate':
        setData(pre => Object.assign({}, pre, {startDate: day}));
        break;
      case 'endDate':
        setData(pre => Object.assign({}, pre, {endDate: day}));
        break;
      case 'startRecruitDate':
        setData(pre => Object.assign({}, pre, {startRecruitDate: day}));
        break;
      case 'endRecruitDate':
        setData(pre => Object.assign({}, pre, {endRecruitDate: day}));
        break;
    }
    hideDatePicker();
  };

  const createGroup = async () => {
    setData(pre => Object.assign({}, pre, {title: ''}));
    const result = await axios.post(
      `http://70.12.246.116:8080/group/regist`,
      {
        categoryId: Number(0),
        content: Data.content,
        currentMember: Number(Data.member ? Data.member.length : 0),
        endDate: Data.endDate,
        endRecruitDate: Data.endRecruitDate,
        goal: Number(Data.goal),
        groupMemberId: Data.member,
        groupName: Data.name,
        groupRoutineId: ['string'],
        maximumMember: Number(Data.maxMemberNum),
        penalty: Data.penalty,
        period: Number(0),
        sharePost: isEnabled,
        startDate: Data.startDate,
        startRecruitDate: Data.startRecruitDate,
        title: Data.title,
        userId: my.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      },
    );
    console.log(result);
    if (result)
      navigation.navigate(isEnabled ? 'GroupListScreen' : 'MyGroupListScreen');
  };

  const [Lists, setLists] = useState([]);
  const [selecUsers, setSelectUsers] = useState([]);
  const [findUser, setFindUser] = useState('');
  onSelectedUsersChange = selecUsers => {
    setSelectUsers(selecUsers);
  };

  const showModal = async () => {
    // const data = (await axios.get(`http://70.12.246.116:8080/group/search?name=${findUser}`)).data;
    // setLists(data);
    // console.log(data);
    // console.log(Lists);
    setIsOpenModal(true);
  };
  const hideModal = () => {
    setData(pre => Object.assign({}, pre, {member: selecUsers}));
    setIsOpenModal(false);
  };
  // onSelectionsChange = (selectLists) => {
  //   setSelectLists(selectLists)
  //   // setData(pre => Object.assign({}, pre, {member: value}))
  //   console.log(selectLists)
  // }
  // onDeletionsChange = (value) => {
  //   const filter = selectLists.filter(e => e.value !== value)
  //   setSelectLists(filter)
  //   console.log(filter)
  // }

  const getMember = text => {
    if (text.length === 1) {
      console.log(text);
      const getData = async () => {
        const data = (
          await axios.get(
            `http://70.12.246.116:8080/group/search?name=${text}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-AUTH-TOKEN': `${accessToken}`,
              },
            },
          )
        ).data;
        setLists(data);
        console.log(data);
      };
      getData();
    }
  };

  return (
    <SafeAreaView>
      {!isEnabled && (
        <Text
          variant="headlineLarge"
          style={{fontWeight: 'bold', margin: 10, marginBottom: 30}}>
          {' 그룹 생성 '}
        </Text>
      )}
      {isEnabled && (
        <Text
          variant="headlineLarge"
          style={{fontWeight: 'bold', margin: 10, marginBottom: 30}}>
          {' 그룹 게시글 작성 '}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text variant="headlineSmall">그룹 공개여부</Text>
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
      </View>
      <View style={{maxHeight: 550, minHeight: 550}}>
        <ScrollView
          keyboardDismissMode="on-drag"
          scrollToOverflowEnabled="true">
          {isEnabled && (
            <View>
              <Text>제목</Text>
              <TextInput
                value={Data.title}
                mode="outlined"
                returnKeyType="next"
                onChangeText={value =>
                  setData(pre => Object.assign({}, pre, {title: value}))
                }
                onSubmitEditing={() => {
                  console.log(Data.title);
                }}
                clearButtonMode="always"
              />
            </View>
          )}
          <View>
            <Text>그룹명</Text>
            <TextInput
              value={Data.name}
              mode="outlined"
              returnKeyType="next"
              onChangeText={value =>
                setData(pre => Object.assign({}, pre, {name: value}))
              }
              onSubmitEditing={() => {
                console.log(Data.name);
              }}
            />
          </View>
          <View>
            <Text>그룹원</Text>
            <View>
              <IconButton icon={'plus-circle-outline'} onPress={showModal} />
            </View>
            {/* <TextInput
              value={Data.member}
              mode="outlined"
              returnKeyType="next"
              onChangeText={value => setFindUser(value)}
              right={
                <TextInput.Icon
                  icon="plus-circle-outline"
                  onPress={showModal}
                />
              }
              onSubmitEditing={() => {
                console.log(findUser);
              }}
            /> */}
          </View>
          {isEnabled && (
            <View>
              <Text>모집인원</Text>
              <TextInput
                value={Data.maxMemberNum}
                mode="outlined"
                returnKeyType="next"
                onChangeText={value =>
                  setData(pre => Object.assign({}, pre, {maxMemberNum: value}))
                }
                onSubmitEditing={() => {
                  console.log(Data.maxMemberNum);
                }}
              />
            </View>
          )}
          {isEnabled && (
            <View>
              <Text>모집 기간</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  value={Data.startRecruitDate}
                  mode="outlined"
                  onChangeText={value =>
                    setData(pre =>
                      Object.assign({}, pre, {startRecruitDate: value}),
                    )
                  }
                  returnKeyType="next"
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      onPress={() => showDatePicker('startRecruitDate')}
                    />
                  }
                  style={{width: 185}}
                  onSubmitEditing={() => {
                    console.log(Data.startRecruitDate);
                  }}
                />
                <Text variant="headlineMedium"> ~ </Text>
                <TextInput
                  value={Data.endRecruitDate}
                  mode="outlined"
                  onChangeText={value =>
                    setData(pre =>
                      Object.assign({}, pre, {endRecruitDate: value}),
                    )
                  }
                  returnKeyType="next"
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      onPress={() => showDatePicker('endRecruitDate')}
                    />
                  }
                  style={{width: 185}}
                  onSubmitEditing={() => {
                    console.log(Data.endRecruitDate);
                  }}
                />
              </View>
            </View>
          )}
          <View>
            <Text>그룹 운동 기간</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput
                value={Data.startDate}
                mode="outlined"
                onChangeText={value =>
                  setData(pre => Object.assign({}, pre, {startDate: value}))
                }
                returnKeyType="next"
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => showDatePicker('startDate')}
                  />
                }
                style={{width: 185}}
                onSubmitEditing={() => {
                  console.log(Data.startDate);
                }}
              />
              <Text variant="headlineMedium"> ~ </Text>
              <TextInput
                value={Data.endDate}
                mode="outlined"
                onChangeText={value =>
                  setData(pre => Object.assign({}, pre, {endDate: value}))
                }
                returnKeyType="next"
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => showDatePicker('endDate')}
                  />
                }
                style={{width: 185}}
                onSubmitEditing={() => {
                  console.log(Data.endDate);
                }}
              />
            </View>
          </View>
          <View>
            <Text>그룹 목표</Text>
            <TextInput
              value={Data.goal}
              returnKeyType="next"
              mode="outlined"
              onChangeText={value =>
                setData(pre => Object.assign({}, pre, {goal: value}))
              }
              onSubmitEditing={() => {
                console.log(Data.goal);
              }}
            />
          </View>
          <View>
            <Text>그룹 패널티</Text>
            <TextInput
              value={Data.penalty}
              returnKeyType="next"
              mode="outlined"
              onChangeText={value =>
                setData(pre => Object.assign({}, pre, {penalty: value}))
              }
              onSubmitEditing={() => {
                console.log(Data.penalty);
              }}
            />
          </View>

          {isEnabled && (
            <View>
              <Text>내용</Text>
              <TextInput
                value={Data.content}
                mode="outlined"
                onChangeText={value =>
                  setData(pre => Object.assign({}, pre, {content: value}))
                }
                onSubmitEditing={() => {
                  console.log(Data.content);
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <Button
        mode="contained"
        buttonColor="black"
        style={styles.button}
        labelStyle={styles.label}
        onPress={createGroup}>
        등록
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Modal
        presentationStyle={'FullScreen'}
        visible={isOpenModal}
        onDismiss={hideModal}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <RadioButton
              value="ID"
              status={checked === 'id' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('id')}
            />
            <Text>ID</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              value="NAME"
              status={checked === 'name' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('name')}
            />
            <Text>NAME</Text>
          </View>
        </View>
        <MultiSelect
          // hideTags
          items={Lists ? Lists : [{userId: '1', userName: '1'}]}
          displayKey={checked === 'id' ? 'userId' : 'userName'}
          uniqueKey="userId"
          onSelectedItemsChange={onSelectedUsersChange}
          selectedItems={selecUsers}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={text => getMember(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#999"
          tagBorderColor="#999"
          tagTextColor="#000"
          selectedItemTextColor="#999"
          selectedItemIconColor="#999"
          itemTextColor="#000"
          searchInputStyle={{color: '#999'}}
          submitButtonColor="#bbb"
          submitButtonText="Submit"
          fixedHeight={true}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  button: {
    width: 350,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
  // containerStyle: {
  //   backgroundColor: 'red',
  //   padding: 20,
  //   height: 400
  // },
});
