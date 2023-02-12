import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton, MD3Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation  } from '@react-navigation/native'

export default function RoutineListItem(props) {
  // const navigation = useNavigation()
  const id = props.routineId;

  const [item, setItem] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');
  const [Select, setSelect] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setAccessToken(UserInfo.token);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [id, accessToken]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`http://${ip}/routine/get-exercise-info/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setItem(data);
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <IconButton
        // mode="contained"
        icon="plus"
        onPress={Select ? 'minus-circle-outline' : 'plus-circle-outline'}
      />
      {/* <Text>{props.routineId}</Text>
      <Text style={styles.routineName}>{props.name}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 0.5,
  },
  routineName: {
    fontSize: 20,
  },
});
