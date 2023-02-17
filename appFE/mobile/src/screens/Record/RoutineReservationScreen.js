import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, Button, IconButton, Modal} from 'react-native-paper';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RoutineSimpleScreen from '../Routine/RoutineSimpleScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const date = new Date();
const reserved = {key: 'reserved', color: 'blue', selectedDotcolor: 'blue'};
export default function RoutineReservationScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');

  const [routineId, setRoutineId] = useState(0);
  const [todayRoutineList, setTodayRoutineList] = useState([]);
  const [routineList, setRoutineList] = useState([]);
  const [stringDate, setStringDate] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [getAddRoutines, setGetAddRoutines] = useState(false);
  const [getDeleteRoutines, setGetDeleteRoutines] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [acc, setAcc] = useState({});
  const [isChange, setIsChange] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const showModal = async () => {
    setIsOpenModal(true);
  };
  const hideModal = () => {
    // setData(pre => Object.assign({}, pre, {member: selectUsers}));
    setIsOpenModal(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
    const day = new Date();
    console.log(day);
    setSelectedYear(day.getFullYear());
    setSelectedMonth(day.getMonth() + 1);
    setSelectedDay(day.getDate());
  }, []);

  useEffect(() => {
    setIsChange(false);
    onChangeDay();
  }, [accessToken, isChange]);
  const onRegistration = () => {
    axios({
      method: 'post',
      url: `${ip}/record/record-registration`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
      data: {
        routineId: routineId,
        startDay: selectedDay,
        startMonth: selectedMonth,
        startYear: selectedYear,
        userId: userId,
      },
    })
      .then(res => {
        console.log(res.data);
        setIsChange(true);
        setGetAddRoutines(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onDelete = () => {
    console.log(routineId);
    axios({
      method: 'delete',
      url: `${ip}/record/remove-schedule?recordId=${routineId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log(res.data);
        setIsChange(true);
        setGetDeleteRoutines(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onChangeDay = () => {
    // 선택한 날짜에 예약된 운동 루틴 가져오기
    // console.log('예약된 운동 가져오기')
    if (accessToken === '') return;
    console.log('--', selectedYear, selectedMonth, selectedDay);
    axios({
      method: 'get',
      url: `${ip}/record/get-schedule?year=${selectedYear}&month=${selectedMonth}&day=${selectedDay}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('예약된 운동 : ', res.data);
        // 어떻게 정보 보내는지 형태 알아야 함.
        // 저장된 데이터가 있으면 정보 뿌려주고,
        // 없으면 예약 컴포넌트 띄워주기
        if (res.data.length > 0) {
          console.log('예약된 운동이 있음');
          setTodayRoutineList(res.data);
        }
        axios({
          method: 'get',
          url: `${ip}/routine/get-user-routine`,
          headers: {
            authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        })
          .then(res => {
            console.log('get my routine 요청 성공 ', res.data);
            setRoutineList(res.data);
          })
          .catch(err => {
            console.log('reservation / get my routine', err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const markedDates = stringDate => {
    // const formattedDate = format(new Date(current.date), 'yyyy-MM-dd')
    let arr = [];
    arr[stringDate] = {marked: true};
    console.log('acc : ', arr);
    setAcc(arr);
  };

  const markedSelectedDate = {
    ...markedSelectedDate,
    [stringDate]: {
      selected: true,
      marked: markedDates[stringDate]?.marked,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Calendar
        style={styles.calendar}
        // initialDate={today}
        markedDates={markedSelectedDate}
        onDayPress={day => {
          console.log('selected day', day);
          setIsDateSelected(true);
          setSelectedDay(day.day);
          setSelectedMonth(day.month);
          setSelectedYear(day.year);
          setStringDate(day.stringDate);
          markedDates(day.stringDate);
          setIsChange(true);
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />
      {todayRoutineList.length > 0 && (
        <View>
          <Text>오늘 예약된 운동 목록</Text>
          {todayRoutineList.map(item => (
            <TouchableOpacity
              onPress={() => {
                setRoutineId(item.recordId);
                setGetDeleteRoutines(true);
              }}>
              <RoutineSimpleScreen id={item.routineId} />
            </TouchableOpacity>
          ))}
          {getDeleteRoutines && (
            <View>
              <Button
                mode="contained"
                onPress={() => {
                  Alert.alert(
                    `오늘 예약운동 삭제`,
                    `선택한  운동을 삭제하시겠습니까?`,
                    [
                      {
                        text: '아니요',
                        style: 'cancel',
                      },
                      {
                        text: '확인',
                        onPress: () => onDelete(),
                      },
                    ],
                  );
                  // console.log('예약하기 누름ㅇ리ㅓㄷ라ㅣㅇ러 getRoutines : ', getRoutines)
                }}>
                루틴 삭제하기
              </Button>
            </View>
          )}
        </View>
      )}
      {!todayRoutineList && <Text>오늘 예약된 운동이 없습니다.</Text>}

      {/* 달력에서 날짜 선택하면 보여주기 */}
      {isDateSelected && (
        <View>
          <Text> 루틴 고르기 </Text>
          {/* RoutineItem 뿌려주기 */}
          {routineList.map(item => (
            <TouchableOpacity
              onPress={() => {
                setRoutineId(item.routineId);
                Alert.alert(
                  `루틴정보 보기`,
                  `${item.routinName} 루틴의 정보를 보시겠습니까?`,
                  [
                    {
                      text: '아니요',
                      style: 'cancel',
                    },
                    {
                      text: '확인',
                      onPress: () => {
                        setGetAddRoutines(true);
                        setIsOpenModal(true);
                      },
                    },
                  ],
                );
              }}>
              <RoutineSimpleScreen id={item.routineId} />
            </TouchableOpacity>
          ))}

          {getAddRoutines && (
            <View>
              <Button
                mode="contained"
                onPress={() => {
                  onRegistration();
                  // console.log('예약하기 누름ㅇ리ㅓㄷ라ㅣㅇ러 getRoutines : ', getRoutines)
                }}>
                루틴 예약하기
              </Button>
            </View>
          )}
        </View>
      )}
      <Modal
        presentationStyle={'overFullScreen'}
        visible={isOpenModal}
        animationType={'slide'}
        onDismiss={hideModal}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <ScrollView>
          <RoutineSimpleScreen id={routineId} />
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    height: '100%',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});