import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
// import Constants from 'expo-constants';
import {BarChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width - 1;
const chartConfig = {
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  decimalPlaces: 1,
  strokeWidth: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const date = new Date();
const today = date.getDate() - 6;
const month = date.getMonth() + 1;
const year = date.getFullYear();

export default function RecordScreen() {
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  const [data, setData] = useState({
    labels: [], // optional
    datasets: [
      {
        data: [0],
      },
    ],
  });
  // 마운팅 될때 한번만 실행
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    //  사용자 정보 가져오기
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    // axios 요청 보내기
    if (accessToken === '') return;
    const days = [];
    const achievementRate = [];

    const getData = async () => {
      for (let i = 0; i <= 6; i++) {
        await axios({
          method: 'get',
          url: `${ip}/record/get-exercise-record?year=${year}&month=${month}&day=${
            today + i
          }`,
          headers: {
            authorization: `Bearer ${accessToken}`,
            'X-AUTH-TOKEN': `${accessToken}`,
          },
        })
          .then(res => {
            console.log('운동기록 : ', today + i, res.data);
            days.push(month + '/' + (today + i));
            achievementRate.push(
              res.data.length > 0
                ? res.data[res.data.length - 1].totalAchievementRate
                : 0,
            );
            console.log('----', days, achievementRate);
          })
          .catch(err => {
            console.log('record screen 실패 ', err);
          });
        setData(pre =>
          Object.assign({}, pre, {
            labels: days,
            datasets: [
              {
                data: achievementRate,
              },
            ],
          }),
        );
      }
      console.log(data.datasets[0].data);
    };
    getData();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> 오늘의 운동 달성률 </Text>
      {data.labels.length === 7 && (
        <BarChart
          style={{marginVertical: 8, borderRadius: 16}}
          data={data}
          width={screenWidth - 30}
          height={220}
          yAxisLabel={'%'}
          chartConfig={chartConfig}
          verticalLabelRotation={20}
          showValuesOnTopOfBars={true}
        />
      )}
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
    color: '#000',
    fontSize: 30,
  },
});
