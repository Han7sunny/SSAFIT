/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens/Login';

import {
  HomeScreen,
  CreateRoutineScreen,
  MyRoutineListScreen,
  RoutineDetailScreen,
  MyGroup,
  RoutineReservationScreen,
} from './src/screens/Main';

import {
  MyGroupListScreen,
  MyGroupDetail,
  GroupListScreen,
  CreateGroupScreen,
  GroupListDetailScreen,
} from './src/screens/Group';

import {
  CommunityScreen,
  ArticleDetailScreen,
  CreateArticleScreen,
  ArticleListScreen,
  RoutineListScreen,
} from './src/screens/Community';

import {
  MainMyPageScreen,
  ChangeImageScreen,
  AddGroupScreen,
  AddGroupDetailScreen,
  AddScreen,
  CancelScreen,
} from './src/screens/My';

import {
  NoticeListScreen,
  AddNoticeScreen,
  NoticeDetailScreen,
} from './src/screens/Notice';

import {MyRecordScreen} from './src/screens/Record';

import RoutineItem from './src/components/RoutineItem';
import ArticleItem from './src/components/ArticleItem';
import {Text} from 'react-native-paper';

const Tab = createBottomTabNavigator();

const MainSide = createDrawerNavigator();
const GroupSide = createDrawerNavigator();
const CommunitySide = createDrawerNavigator();
const MyPageSide = createDrawerNavigator();
const LoginSide = createDrawerNavigator();

const Notice = createNativeStackNavigator();
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="LoginScreen">
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="CreateRoutineScreen"
        component={CreateRoutineScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="MyRoutineListScreen"
        component={MyRoutineListScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="RoutineDetailScreen"
        component={RoutineDetailScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="RoutineReservationScreen"
        component={RoutineReservationScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen name="MyGroup" component={MyGroup} />
    </MainStack.Navigator>
  );
};
const GroupStackNavigator = () => {
  return (
    <GroupStack.Navigator initialRouteName="GroupListScreen">
      <GroupStack.Screen
        name="GroupListScreen"
        component={GroupListScreen}
        options={{headerShown: false}}
      />
      <GroupStack.Screen
        name="GroupListDetailScreen"
        component={GroupListDetailScreen}
        options={{headerShown: false}}
      />
      <GroupStack.Screen
        name="MyGroupListScreen"
        component={MyGroupListScreen}
        options={{headerShown: false}}
      />
      <GroupStack.Screen
        name="MyGroupDetail"
        component={MyGroupDetail}
        options={{headerShown: false}}
      />
      <GroupStack.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{headerShown: false}}
      />
    </GroupStack.Navigator>
  );
};
const CommunityStackNavigator = () => {
  return (
    <CommunityStack.Navigator initialRouteName="CommunityScreen">
      <CommunityStack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{headerShown: false}}
      />
      <CommunityStack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{headerShown: false}}
      />
      <CommunityStack.Screen
        name="CreateArticleScreen"
        component={CreateArticleScreen}
        options={{headerShown: false}}
      />
      <CommunityStack.Screen
        name="ArticleListScreen"
        component={ArticleListScreen}
        options={{headerShown: false}}
      />
      <CommunityStack.Screen
        name="RoutineListScreen"
        component={RoutineListScreen}
        options={{headerShown: false}}
      />
    </CommunityStack.Navigator>
  );
};

const MainSideNavigator = () => {
  return (
    <MainSide.Navigator initialRouteName="HomeScreen">
      <MainSide.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <MainSide.Screen
        name="CreateRoutineScreen"
        component={CreateRoutineScreen}
        options={{headerShown: false}}
      />
      <MainSide.Screen
        name="MyRoutineListScreen"
        component={MyRoutineListScreen}
        options={{headerShown: false}}
      />
      <MainSide.Screen
        name="RoutineDetailScreen"
        component={RoutineDetailScreen}
        options={{headerShown: false}}
      />
      <MainSide.Screen name="MyGroup" component={MyGroup} />
      <MainSide.Screen name="RoutineItem" component={RoutineItem} />
    </MainSide.Navigator>
  );
};
const GroupSideNavigator = () => {
  return (
    <GroupSide.Navigator initialRouteName="GroupListScreen">
      <GroupSide.Screen
        name="GroupListScreen"
        component={GroupListScreen}
        options={{headerShown: false}}
      />
      <GroupSide.Screen
        name="GroupListDetailScreen"
        component={GroupListDetailScreen}
        options={{headerShown: false}}
      />
      <GroupSide.Screen
        name="MyGroupListScreen"
        component={MyGroupListScreen}
        options={{headerShown: false}}
      />
      <GroupSide.Screen
        name="MyGroupDetail"
        component={MyGroupDetail}
        options={{headerShown: false}}
      />
      <GroupSide.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{headerShown: false}}
      />
    </GroupSide.Navigator>
  );
};
const CommunitySideNavigator = () => {
  return (
    <CommunitySide.Navigator initialRouteName="CommunityScreen">
      <CommunitySide.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{headerShown: false}}
      />
      <CommunitySide.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{headerShown: false}}
      />
      <CommunitySide.Screen
        name="CreateArticleScreen"
        component={CreateArticleScreen}
        options={{headerShown: false}}
      />
      <CommunitySide.Screen
        name="ArticleListScreen"
        component={ArticleListScreen}
        options={{headerShown: false}}
      />
      <CommunitySide.Screen name="ArticleItem" component={ArticleItem} />
    </CommunitySide.Navigator>
  );
};

const MyPageSideNavigator = () => {
  return (
    <MyPageSide.Navigator initialRouteName="MainMyPageScreen">
      <MyPageSide.Screen
        name="MainMyPageScreen"
        component={MainMyPageScreen}
        options={{headerShown: false}}
      />
      <MyPageSide.Screen
        name="ChangeImageScreen"
        component={ChangeImageScreen}
        options={{headerShown: false}}
      />
      <MyPageSide.Screen
        name="AddGroupScreen"
        component={AddGroupScreen}
        options={{headerShown: false}}
      />
      <MyPageSide.Screen
        name="AddGroupDetailScreen"
        component={AddGroupDetailScreen}
        options={{headerShown: false}}
      />
      <MyPageSide.Screen
        name="AddScreen"
        component={AddScreen}
        options={{headerShown: false}}
      />
      <MyPageSide.Screen
        name="CancelScreen"
        component={CancelScreen}
        options={{headerShown: false}}
      />
    </MyPageSide.Navigator>
  );
};
const NoticeNavigator = () => {
  return (
    <Notice.Navigator initialRouteName="NoticeListScreen">
      <Notice.Screen
        name="NoticeListScreen"
        component={NoticeListScreen}
        options={{headerShown: false}}
      />
      <Notice.Screen
        name="AddNoticeScreen"
        component={AddNoticeScreen}
        options={{headerShown: false}}
      />
      <Notice.Screen
        name="NoticeDetailScreen"
        component={NoticeDetailScreen}
        options={{headerShown: false}}
      />
    </Notice.Navigator>
  );
};

const LoginSideNavigator = () => {
  return (
    <LoginSide.Navigator initialRouteName="MainMyPageScreen">
      <LoginSide.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <LoginSide.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <LoginSide.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <LoginSide.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <LoginSide.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </LoginSide.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Group') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'MyPage') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Login') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Notice') {
              iconName = focused ? 'home' : 'home-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={MainSideNavigator} />
        <Tab.Screen name="Group" component={GroupSideNavigator} />
        <Tab.Screen name="Community" component={CommunitySideNavigator} />
        <Tab.Screen name="MyPage" component={MyPageSideNavigator} />
        <Tab.Screen name="Login" component={LoginSideNavigator} />
        <Tab.Screen name="Notice" component={NoticeNavigator} />

        {/* components */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

// import React, { useState } from 'react';
// import { View, FlatList } from 'react-native';
// import MultiSelect from 'react-native-multiple-select';
// import { Text } from 'react-native-paper';

// function App() {
//   const items = [{
//       id: '92iijs7yta',
//       'name': 'Ondo'
//     }, {
//       id: 'a0s0a8ssbsd',
//       name: 'Ogun'
//     }, {
//       id: '16hbajsabsd',
//       name: 'Calabar'
//     }, {
//       id: 'nahs75a5sg',
//       name: 'Lagos'
//     }, {
//       id: '667atsas',
//       name: 'Maiduguri'
//     }, {
//       id: 'hsyasajs',
//       name: 'Anambra'
//     }, {
//       id: 'djsjudksjd',
//       name: 'Benue'
//     }, {
//       id: 'sdhyaysdj',
//       name: 'Kaduna'
//     }, {
//       id: 'suudydjsjd',
//       name: 'Abuja'
//       }
//   ];
//   const [selectedItems, setSelectedItems] = useState([]);

//   onSelectedItemsChange = selectedItems => {
//     setSelectedItems(selectedItems);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <MultiSelect
//         hideTags
//         items={items}
//         uniqueKey="name"
//         // ref={(component) => { this.multiSelect = component }}
//         onSelectedItemsChange={onSelectedItemsChange}
//         selectedItems={selectedItems}
//         selectText="Pick Items"
//         searchInputPlaceholderText="Search Items..."
//         onChangeInput={ (text)=> console.log(text)}
//         altFontFamily="ProximaNova-Light"
//         tagRemoveIconColor="#CCC"
//         tagBorderColor="#CCC"
//         tagTextColor="#CCC"
//         selectedItemTextColor="#CCC"
//         selectedItemIconColor="#CCC"
//         itemTextColor="#000"
//         displayKey="name"
//         searchInputStyle={{ color: '#CCC' }}
//         submitButtonColor="#CCC"
//         submitButtonText="Submit"
//       />
//       <FlatList
//           data={selectedItems}
//           renderItem={({item}) => (
//             <Text>{item}</Text>
//           )}
//           // keyExtractor={item => item.id.toString()}
//         />
//     </View>
//   );
// }
// export default App;
