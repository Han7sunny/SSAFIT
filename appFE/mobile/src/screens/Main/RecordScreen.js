import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
// import Constants from 'expo-constants';
import {ProgressChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: '#cc14aa',
  backgroundGradientFromOpacity: 0,
  backgroundGradientFrom: '#7ff591',
  backgroundGradientTo: '#f0f716',
  backgroundGradientToOpacity: 0.5,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = {
  labels: ['전신', '상체', '하체'], // optional
  data: [0.8, 0.6, 0.3],
};

export default function RecordScreen({route}) {
  const [recordData, setRecordData] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const [ip, setIP] = useState('');
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
  }, []);
  useEffect(() => {
    getData();
  }, [accessToken, route]);
  const getData = async () => {
    if (accessToken === '') return;
    await axios({
      method: 'get',
      url: `http://${ip}/record/get-exercise-record?year=2023&month=2&day=8r`,
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> OOO 님의 운동 기록 </Text>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
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
