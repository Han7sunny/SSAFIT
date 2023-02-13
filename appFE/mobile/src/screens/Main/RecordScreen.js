import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
// import Constants from 'expo-constants';
import {ProgressChart, BarChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width - 1;
const chartConfig = {
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  // backgroundGradientFromOpacity: 0,
  // backgroundGradientFrom: '#7ff591',
  backgroundGradientTo: '#efefef',
  // backgroundGradientToOpacity: 0.5,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  // strokeWidth: 2, // optional, default 3
  // barPercentage: 0.5,
  // useShadowColorFromDataset: false // optional
};

const data = {
  labels: ['전신', '상체', '하체'], // optional
  datasets: [
    {
      data: [80, 60, 70],
    },
  ],
};
const date = new Date();
const today = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

export default function RecordScreen() {
  const [recordData, setRecordData] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  // componentDidMount(() => {
  const [ip, setIP] = useState('');
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    //  사용자 정보 가져오기
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    // axios 요청 보내기
    if (accessToken === '') return;
    axios({
      method: 'get',
      url: `http://${ip}/record/get-exercise-record?year=${year}&month=${month}&day=${today}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    })
      .then(res => {
        console.log('운동기록 : ', res.data);
        setRecordData(res.data);
      })
      .catch(err => {
        console.log('record screen 실패 ', err);
      });
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> 오늘의 운동 달성률 </Text>
      {/* <ProgressChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      /> */}
      <BarChart
        style={{marginVertical: 8, borderRadius: 16}}
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel={'%'}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderWidth: 3,
  },
  title: {
    fontSize: 30,
  },
});
