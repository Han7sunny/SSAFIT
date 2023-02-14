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
import RoutineInput from '../../components/RoutineInput';

export default function CreateGroupScreen({navigation, route}) {
  const data = route.params.data;
  let exerciseLists = []; // RoutineInput.js에서 사용자가 입력한 루틴 정보를 저장할 리스트
  const [routineName, setRoutineName] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setselectDate] = useState('');
  const [CheckedMember, setCheckedMember] = useState('id');
  const [CheckedRoutine, setCheckedRoutine] = useState('my');
  const [myRoutines, setMyRoutines] = useState([]);

  const [Data, setData] = useState({
    title: '',
    name: '',
    member: [],
    routine: [],
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
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); //
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    setIsEnabled(data === false ? false : true);
    setData(
      data === false
        ? {
            title: '',
            name: '',
            member: [],
            routine: [],
            maxMemberNum: '',
            startDate: '',
            endDate: '',
            startRecruitDate: '',
            endRecruitDate: '',
            goal: '',
            penalty: '',
            content: '',
          }
        : {
            title: data.title,
            name: data.groupName,
            member: data.groupMemberId, // 수정필요
            routine: data.routine, // 수정필요
            maxMemberNum: data.maximumMember + '',
            startDate: data.startDate,
            endDate: data.endDate,
            startRecruitDate: data.startRecruitDate,
            endRecruitDate: data.endRecruitDate,
            goal: data.goal + '',
            penalty: data.penalty,
            content: data.content,
          },
    );
  }, [route.params]);

  useEffect(() => {
    getRoutine();
  }, [accessToken, addRoutine]);

  const getRoutine = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`${ip}/routine/get-user-routine`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    console.log(data);
    setMyRoutines(data);
    setAddRoutine(false);
  };
  const onPost = async () => {
    if (accessToken === '') return;
    let setExercise = [...new Set(exerciseLists)];
    console.log('se', setExercise);
    const result = (
      await axios.post(
        `${ip}/routine/generate-routine`,
        {
          routineName: `${routineName}`,
          userId: userId,
          exerciseList: setExercise,
          routineId: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        },
      )
    ).data;
    let change = [...Data.routine, Number(result.msg)];
    console.log(change);
    setData(pre => Object.assign({}, pre, {routine: change}));
    setAddRoutine(true);
    hideModal();
  };

  const hideDatePicker = () => setDatePickerVisibility(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [countNum, setCountNum] = useState([0]);
  const [addRoutine, setAddRoutine] = useState(false);
  const onAddRoutine = () => {
    let countArr = [...countNum];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter);
    setCountNum(countArr);
  };

  const routineInfo = ({sendData}) => {
    exerciseLists.push(sendData);
    console.log('저장한 루틴 리스트 :', exerciseLists);
  };

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
      `${ip}/group/regist`,
      {
        categoryId: isEnabled ? Number(4) : Number(0),
        content: Data.content,
        currentMember: Number(Data.member ? Data.member.length : 0),
        endDate: Data.endDate,
        endRecruitDate: Data.endRecruitDate,
        goal: Number(Data.goal),
        groupMemberId: Data.member,
        groupName: Data.name,
        groupRoutineId: Data.routine,
        maximumMember: Number(Data.maxMemberNum),
        penalty: Data.penalty,
        period: Number(0),
        sharePost: isEnabled,
        startDate: Data.startDate,
        startRecruitDate: Data.startRecruitDate,
        title: Data.title,
        userId: userId,
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
      navigation.navigate(isEnabled ? 'GroupListScreen' : 'MyGroupListScreen', {
        change: true,
      });
  };

  const [Lists, setLists] = useState([]);
  onSelectedUsersChange = selectUsers => {
    setData(pre => Object.assign({}, pre, {member: selectUsers}));
  };
  onSelectedRoutineChange = selectRoutine => {
    setData(pre => Object.assign({}, pre, {routine: selectRoutine}));
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const showModal = async () => {
    setIsOpenModal(true);
  };
  const hideModal = () => {
    // setData(pre => Object.assign({}, pre, {member: selectUsers}));
    setCheckedRoutine('my');
    setIsOpenModal(false);
  };

  const getMember = text => {
    if (text.length !== 1) return;
    const getData = async () => {
      const data = (
        await axios.get(`${ip}/group/search?name=${text}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        })
      ).data;
      setLists(data);
      console.log(data);
    };
    getData();
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>그룹원</Text>
            <View>
              {/* <IconButton icon={'plus-circle-outline'} onPress={showModal} /> */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <RadioButton
                    value="ID"
                    status={CheckedMember === 'id' ? 'checked' : 'unchecked'}
                    onPress={() => setCheckedMember('id')}
                  />
                  <Text>ID</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    value="NAME"
                    status={CheckedMember === 'name' ? 'checked' : 'unchecked'}
                    onPress={() => setCheckedMember('name')}
                  />
                  <Text>NAME</Text>
                </View>
              </View>
            </View>
          </View>
          <MultiSelect
            // hideTags
            items={Lists ? Lists : [{userId: '1', userName: '1'}]}
            displayKey={CheckedMember === 'id' ? 'userId' : 'userName'}
            uniqueKey="userId"
            onSelectedItemsChange={onSelectedUsersChange}
            selectedItems={Data.member}
            selectText="Pick Users"
            searchInputPlaceholderText="Search Users..."
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
          />
          <View>
            <Text>루틴추가</Text>
            <View>
              {/* <IconButton icon={'plus-circle-outline'} onPress={showModal} /> */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <RadioButton
                    value="my"
                    status={CheckedRoutine === 'my' ? 'checked' : 'unchecked'}
                    onPress={() => setCheckedRoutine('my')}
                  />
                  <Text>나의 루틴</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    value="new"
                    status={CheckedRoutine === 'new' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      showModal();
                      setCheckedRoutine('new');
                    }}
                  />
                  <Text>루틴만들기</Text>
                </View>
              </View>
            </View>
          </View>
          <MultiSelect
            // hideTags
            items={myRoutines ? myRoutines : [{name: ' ', routineId: '-1'}]}
            displayKey={'name'}
            uniqueKey="routineId"
            onSelectedItemsChange={onSelectedRoutineChange}
            selectedItems={Data.routine}
            selectText="Pick Routines"
            searchInputPlaceholderText="Search Routines..."
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
            // fixedHeight={true}
          />

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
        {data === false ? '등록' : '수정'}
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
        <ScrollView>
          <TextInput
            label="루틴 이름을 설정하세요!"
            value={routineName}
            onChangeText={text => {
              setRoutineName(text);
            }}
          />
          <RoutineInput countNum={countNum} routineInfo={routineInfo} />
          <IconButton
            style={{marginHorizontal: '50%'}}
            size={20}
            onPress={onAddRoutine}
            icon="plus-outline"
          />

          <Button
            mode="contained"
            onPress={() => {
              onPost();
              // navigation.navigate('MyRoutineListScreen');
              // navigator 인덱스 초기화하기
            }}>
            저장하기
          </Button>
        </ScrollView>
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
