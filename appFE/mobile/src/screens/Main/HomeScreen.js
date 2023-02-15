import React, {useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text, SegmentedButtons} from 'react-native-paper';
import CommunitySimpleScreen from './CommunitySimpleScreen';
import TodayRoutine from './TodayRoutine';
import RecordScreen from './RecordScreen';
import MyGroupListScreen from '../Group/MyGroupListScreen';
import MyRoutineListScreen from './MyRoutineListScreen';

export default function HomeScreen({navigation}) {
  const [value, setValue] = useState('Exercise');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}> 운동 시작한지 N일 </Text>
      {/* <RecordScreen /> */}
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        showSelectedCheck={true}
        shadowColor="#29b6f6"
        buttons={[
          {
            value: 'Exercise',
            label: '오늘의 운동',
          },
          {
            value: 'Routine',
            label: '나의 루틴',
          },
          {
            value: 'Group',
            label: '가입된 그룹',
          },
          {
            value: 'Community',
            label: '커뮤니티',
          },
        ]}
      />
      {value === 'Exercise' && <TodayRoutine />}
      {value === 'Routine' && <MyRoutineListScreen />}
      {value === 'Group' && (
        <MyGroupListScreen navigation={navigation} route={false} />
      )}
      {value === 'Community' && (
        <CommunitySimpleScreen navigation={navigation} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  container: {
    borderWidth: 2,
    // padding: 10,
    // margin: 10,
  },
  row: {
    justifyContent: 'center',
  },
});
