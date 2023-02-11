import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import {
  Modal,
  Button,
  Text,
  IconButton,
  Provider,
  Portal,
  TextInput,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import GroupListSimpleScreen from './GroupListSimpleScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GroupListScreen({navigation}) {
  const [ip, setIP] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [Lists, setLists] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectText, setSelectText] = useState('');

  const [FilteredLists, setFilteredLists] = useState([]);
  const [Filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minMemberNum: '',
    maxMemberNum: '',
    minGoal: '',
    maxGoal: '',
  });

  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [ip]);
  const getData = async () => {
    if (ip === '') return;
    const data = (await axios.get(`http://${ip}/group/recruit`)).data;
    setLists(data);
    setFilteredLists(data);
    console.log(data);
  };

  const showDatePicker = date => {
    setDatePickerVisibility(true);
    setSelectText(date);
  };

  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    let day = date.toLocaleDateString().split('/');
    day = `${day[2]}-${day[0].padStart(2, '0')}-${day[1].padStart(2, '0')}`;
    switch (selectText) {
      case 'startDate':
        setFilters(pre => Object.assign({}, pre, {startDate: day}));
        break;
      case 'endDate':
        setFilters(pre => Object.assign({}, pre, {endDate: day}));
        break;
    }
    hideDatePicker();
  };

  const showModal = () => setIsOpenModal(true);
  const hideModal = () => setIsOpenModal(false);
  // onSelectionsChange = SelectFilter => {
  //   setSelectFilter(SelectFilter);
  //   // console.log(SelectFilter);
  // };
  // onDeletionsChange = value => {
  //   const filter = SelectFilter.filter(e => e !== value);
  //   setSelectFilter(filter);
  //   // console.log(filter);
  // };

  const filter = () => {
    // console.log(item);
    console.log(Filters);
    setFilteredLists(
      Lists.filter(
        item =>
          (Filters.startDate === ''
            ? 1
            : new Date(Filters.startDate) <= new Date(item.startDate)) &&
          (Filters.endDate === ''
            ? 1
            : new Date(Filters.endDate) >= new Date(item.endDate)) &&
          (Filters.minMemberNum === ''
            ? 1
            : Filters.minMemberNum <= item.maximumMember) &&
          (Filters.maxMemberNum === ''
            ? 1
            : Filters.maxMemberNum >= item.maximumMember) &&
          (Filters.minGoal === '' ? 1 : Filters.minGoal <= item.goal) &&
          (Filters.maxGoal === '' ? 1 : Filters.maxGoal <= item.goal),
      ),
    );
  };

  return (
    <Provider style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="headlineLarge"
          style={{fontWeight: 'bold', marginTop: 10}}>
          {' 그룹 모집 '}
        </Text>
        <View style={{padding: 10, flexDirection: 'row-reverse'}}>
          <IconButton
            icon="plus-circle-outline"
            iconColor="black"
            size={50}
            onPress={() =>
              navigation.navigate('CreateGroupScreen', {data: false})
            }
            style={styles.iconButton}
          />
          <IconButton
            icon="tune-variant"
            iconColor="black"
            size={50}
            onPress={showModal}
            style={styles.iconButton}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          minHeight: 50,
          maxHeight: 50,
          backgroundColor: 'red',
          padding: 0,
        }}>
        {Object.keys(Filters).forEach(key => {
          if (Filters[key] === '') return;
          console.log(key);
        })}
        {/* {Filters.map((item, idx) =>
          console.log(item),
          // <Button
          //   mode="contained"
          //   style={[
          //     styles.button,
          //     {width: Math.max((item.length + 1) * 29, 100)},
          //   ]}
          //   labelStyle={styles.label}
          //   onPress={() => onDeletionsChange(item)}>
          //   {item} X
          // </Button>
        )} */}
      </View>
      <View style={{minHeight: 550, maxHeight: 550}}>
        <FlatList
          data={FilteredLists}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <GroupListSimpleScreen item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.boardId.toString()}
        />
      </View>

      <Portal>
        <Modal
          presentationStyle={'FullScreen'}
          visible={isOpenModal}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1}}>멤버수</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 5}}>
              <TextInput
                mode="outlined"
                label="최소인원수"
                placeholder="최소인원수"
                style={{width: 150}}
                value={Filters.minMemberNum}
                onChangeText={value => {
                  if (value.length > 0 && value.match(/^\d+$/) === null) {
                    Alert.alert('입력오류', `숫자형식만 입력해주세요`);
                    setFilters(pre =>
                      Object.assign({}, pre, {minMemberNum: ''}),
                    );
                  } else
                    setFilters(pre =>
                      Object.assign({}, pre, {minMemberNum: value}),
                    );
                }}
              />
              <Text> ~ </Text>
              <TextInput
                mode="outlined"
                label="최대인원수"
                placeholder="최대인원수"
                style={{width: 150}}
                value={Filters.maxMemberNum}
                onChangeText={value => {
                  if (value.length > 0 && value.match(/^\d+$/) === null) {
                    Alert.alert('입력오류', `숫자형식만 입력해주세요`);
                    setFilters(pre =>
                      Object.assign({}, pre, {maxMemberNum: ''}),
                    );
                  } else
                    setFilters(pre =>
                      Object.assign({}, pre, {maxMemberNum: value}),
                    );
                }}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1}}>운동기간</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 5}}>
              <TextInput
                mode="outlined"
                label="시작일"
                placeholder="시작일"
                style={{width: 150}}
                value={Filters.startDate}
                onChangeText={value =>
                  setFilters(pre => Object.assign({}, pre, {startDate: value}))
                }
                onSubmitEditing={() => {
                  // console.log(Filters.startDate);
                  if (
                    Filters.startDate.length > 0 &&
                    Filters.startDate.match(/\d{4}-\d{2}-\d{2}/) === null
                  ) {
                    setFilters(pre => Object.assign({}, pre, {startDate: ''}));
                    Alert.alert(
                      '입력오류',
                      `날짜형식이 잘못 되었습니다.
                    예) 2023-02-17`,
                      [
                        {
                          text: '확인',
                          style: 'cancel',
                        },
                        {
                          text: '달력으로 가기',
                          onPress: () => showDatePicker('startDate'),
                        },
                      ],
                    );
                  }
                }}
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => showDatePicker('startDate')}
                  />
                }
              />
              <Text> ~ </Text>
              <TextInput
                mode="outlined"
                label="끝나는일"
                placeholder="끝나는일"
                style={{width: 150}}
                value={Filters.endDate}
                onChangeText={value =>
                  setFilters(pre => Object.assign({}, pre, {endDate: value}))
                }
                onSubmitEditing={() => {
                  if (
                    Filters.endDate.length > 0 &&
                    Filters.endDate.match(/\d{4}-\d{2}-\d{2}/) === null
                  ) {
                    setFilters(pre => Object.assign({}, pre, {endDate: ''}));
                    Alert.alert(
                      '입력오류',
                      `날짜형식이 잘못 되었습니다.
                    예) 2023-02-17`,
                      [
                        {
                          text: '확인',
                          style: 'cancel',
                        },
                        {
                          text: '달력으로 가기',
                          onPress: () => showDatePicker('endDate'),
                        },
                      ],
                    );
                  }
                }}
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => showDatePicker('endDate')}
                  />
                }
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1}}>목표치</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 5}}>
              <TextInput
                mode="outlined"
                label="low"
                placeholder="low"
                style={{width: 150}}
                value={Filters.minGoal}
                onChangeText={value => {
                  if (value.length > 0 && value.match(/^\d+$/) === null) {
                    Alert.alert('입력오류', `숫자형식만 입력해주세요`);
                    setFilters(pre => Object.assign({}, pre, {minGoal: ''}));
                  } else {
                    console.log(value);
                    if (
                      value.length === 0 ||
                      (0 <= Number(value) && Number(value) <= 100)
                    )
                      setFilters(pre =>
                        Object.assign({}, pre, {minGoal: value}),
                      );
                    else {
                      Alert.alert('입력오류', `0~100사이만 입력해주세요`);
                      setFilters(pre => Object.assign({}, pre, {minGoal: ''}));
                    }
                  }
                }}
              />
              <Text> ~ </Text>
              <TextInput
                mode="outlined"
                label="high"
                placeholder="high"
                style={{width: 150}}
                value={Filters.maxGoal}
                onChangeText={value => {
                  if (value.length > 0 && value.match(/^\d+$/) === null) {
                    Alert.alert('입력오류', `숫자형식만 입력해주세요`);
                    setFilters(pre => Object.assign({}, pre, {maxGoal: ''}));
                  } else {
                    console.log(value);
                    if (
                      value.length === 0 ||
                      (0 <= Number(value) && Number(value) <= 100)
                    )
                      setFilters(pre =>
                        Object.assign({}, pre, {maxGoal: value}),
                      );
                    else {
                      Alert.alert('입력오류', `0~100사이만 입력해주세요`);
                      setFilters(pre => Object.assign({}, pre, {maxGoal: ''}));
                    }
                  }
                }}
              />
            </View>
          </View>
          <Button
            mode="contained"
            buttonColor="black"
            style={styles.button}
            labelStyle={styles.label}
            onPress={() => {
              // setFilters(Filters);
              filter();
              setIsOpenModal(false);
            }}>
            적용
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  iconButton: {
    margin: 0,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: 400,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
  },
});
