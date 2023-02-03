import React, { useState, useRef } from "react";
import { View, Text, Switch, ScrollView, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-paper'
import styled from 'styled-components/native'
import Button from '../../components/Button'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function CreateGroupScreen({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const [groupTitle, setgroupTitle] = useState('');
  const [groupName, setgroupName] = useState('');
  const [groupMember, setgroupMember] = useState('');
  const [groupPeopleNum, setgroupPeopleNum] = useState('');
  const [groupStartDate, setgroupStartDate] = useState('');
  const [groupEndDate, setgroupEndDate] = useState('');
  // const [groupStartDate, setgroupStartDate] = useState('');
  // const [groupEndDate, setgroupEndDate] = useState('');
  const [groupGoal, setgroupGoal] = useState('');
  const [groupPenalty, setgroupPenalty] = useState('');
  const [groupContent, setgroupContent] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const Name = useRef();
  const Member = useRef();
  const PeopleNum = useRef();
  const StartDate = useRef();
  const EndDate = useRef();
  const Goal = useRef();
  const Penalty = useRef();
  const content = useRef();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
    console.log('af')
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setgroupStartDate(date.toLocaleDateString());
    Goal.current.focus()
    hideDatePicker();
  };
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView >
      <Title> 그룹 생성 </Title>
      <View>
        <Text>그룹 공개여부</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <ScrollView
        keyboardDismissMode = 'on-drag'
        scrollToOverflowEnabled = 'true'
      >
        { isEnabled && <View>
          <Text>제목</Text>
          <TextInput 
              value={groupTitle}
              // autoFocus={isEnabled &&true}
              onChangeText={(value) => setgroupTitle(value)}
              onSubmitEditing={()=>{
                console.log(groupTitle);
                Name.current.focus()
              }}
              returnKeyType="next"
            />
        </View>
        }
        <View>
          <Text>그룹명</Text>
          <TextInput 
              value={groupName}
              autoFocus={ true}
              onChangeText={(value) => setgroupName(value)}
              onSubmitEditing={()=>{
                console.log(groupName);
                Member.current.focus()
              }}
              returnKeyType="next"
            />
        </View>
        <View>
          <Text>그룹원</Text>
          <TextInput 
              value={groupMember}
              onChangeText={(value) => setgroupMember(value)}
              returnKeyType="next"
              right={<TextInput.Icon icon='text-long' onPress={() => navigation.navigate('MyGroupListScreen')}/>}
              ref={Member}
              onSubmitEditing={()=>{
                console.log(groupMember);
                if(isEnabled) PeopleNum.current.focus()
                else StartDate.current.focus()
              }}
            />
        </View>
        { isEnabled && <View>
          <Text>모집인원</Text>
          <TextInput 
              value={groupPeopleNum}
              autoFocus={true}
              onChangeText={(value) => setgroupPeopleNum(value)}
              onSubmitEditing={()=>{
                console.log(groupPeopleNum);
                StartDate.current.focus()
              }}
              returnKeyType="next"
              ref={PeopleNum}
              
            />
        </View>
        }
        { isEnabled && <View>
          <Text>모집 기간</Text>
          <View>
            <TextInput 
                value={groupStartDate}
                onChangeText={(value) => setgroupStartDate(value)}
                returnKeyType="next"
                right={<TextInput.Icon icon='calendar' onPress={showDatePicker}/>}
                ref={StartDate}
                onSubmitEditing={()=>{
                  console.log(groupName);
                  StartDate.current.focus()
                }}
              />
              {/* <Text>~</Text>
              <TextInput 
                value={groupEndDate}
                onChangeText={(value) => setgroupEndDate(value)}
                returnKeyType="next"
                right={<TextInput.Icon icon='calendar' onPress={showDatePicker}/>}
              /> */}
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        }
        <View>
          <Text>그룹 운동 기간</Text>
          <View>
            <TextInput 
                value={groupStartDate}
                onChangeText={(value) => setgroupStartDate(value)}
                returnKeyType="next"
                right={<TextInput.Icon icon='calendar' onPress={showDatePicker}/>}
                ref={StartDate}
                onSubmitEditing={()=>{
                  console.log(groupName);
                  Goal.current.focus()
                }}
              />
              {/* <Text>~</Text>
              <TextInput 
                value={groupEndDate}
                onChangeText={(value) => setgroupEndDate(value)}
                returnKeyType="next"
                right={<TextInput.Icon icon='calendar' onPress={showDatePicker}/>}
              /> */}
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View>
          <Text>그룹 목표</Text>
          <TextInput 
              value={groupGoal}
              onChangeText={(value) => setgroupGoal(value)}
              returnKeyType="next"
              ref={Goal}
              onSubmitEditing={()=>{
                console.log(groupName);
                Penalty.current.focus()
              }}
            />
        </View>
        <View>
          <Text>그룹 패널티</Text>
          <TextInput 
              value={groupPenalty}
              onChangeText={(value) => setgroupPenalty(value)}
              returnKeyType="next"
              ref={Penalty}
              onSubmitEditing={()=>{
                console.log(groupName);
                if(isEnabled) content.current.focus()
              }}
            />
        </View>
        
        { isEnabled && <View>
          <Text>내용</Text>
          <TextInput 
              value={groupContent}
              autoFocus={true}
              onChangeText={(value) => setgroupContent(value)}
              onSubmitEditing={()=>{
                console.log(groupContent);
              }}
              ref={content}
            />
        </View>
        }
       <Button
        mode="contained"
        onPress={() => navigation.navigate('GroupListScreen')}
        style={{marginBottom: 150}}
      >
        등록
      </Button>

      </ScrollView>
    </SafeAreaView >
  )
}

