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
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  ChangePasswordScreen,
  AddFacePhotoScreen,
} from './src/screens/Login';

import {
  HomeScreen,
  CreateRoutineScreen,
  MyRoutineListScreen,
  MyGroup,
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
  RoutineArticleDetailScreen,
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

import {MyRecordScreen, RoutineReservationScreen} from './src/screens/Record';
import {RoutineDetailScreen} from './src/screens/Routine';

import RoutineItem from './src/components/RoutineItem';
import ArticleItem from './src/components/ArticleItem';
import {Text, Button} from 'react-native-paper';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

// const MainSide = createDrawerNavigator();
// const GroupSide = createDrawerNavigator();
// const CommunitySide = createDrawerNavigator();
// const MyPageSide = createDrawerNavigator();
const LoginSide = createDrawerNavigator();
// const Notice = createNativeStackNavigator();

// const MainSideNavigator = () => {
//   return (
//     <MainSide.Navigator initialRouteName={false ? 'HomeScreen' : 'LoginScreen'}>
//       <MainSide.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="CreateRoutineScreen"
//         component={CreateRoutineScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="MyRoutineListScreen"
//         component={MyRoutineListScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="RoutineDetailScreen"
//         component={RoutineDetailScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen name="MyGroup" component={MyGroup} />
//       <MainSide.Screen name="RoutineItem" component={RoutineItem} />
//       <MainSide.Screen
//         name="LoginScreen"
//         component={LoginScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="RegisterScreen"
//         component={RegisterScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="ResetPasswordScreen"
//         component={ResetPasswordScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="MyGroupListScreen"
//         component={MyGroupListScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="AddFacePhotoScreen"
//         component={AddFacePhotoScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="RoutineReservationScreen"
//         component={RoutineReservationScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="CommunityScreen"
//         component={CommunityScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="ArticleDetailScreen"
//         component={ArticleDetailScreen}
//         options={{headerShown: false}}
//       />
//       <MainSide.Screen
//         name="RoutineArticleDetailScreen"
//         component={RoutineArticleDetailScreen}
//         options={{headerShown: false}}
//       />
//     </MainSide.Navigator>
//   );
// };
// const GroupSideNavigator = () => {
//   return (
//     <GroupSide.Navigator initialRouteName="GroupListScreen">
//       <GroupSide.Screen
//         name="GroupListScreen"
//         component={GroupListScreen}
//         options={{headerShown: false}}
//       />
//       <GroupSide.Screen
//         name="GroupListDetailScreen"
//         component={GroupListDetailScreen}
//         options={{headerShown: false}}
//       />
//       <GroupSide.Screen
//         name="MyGroupListScreen"
//         component={MyGroupListScreen}
//         options={{headerShown: false}}
//       />
//       <GroupSide.Screen
//         name="MyGroupDetail"
//         component={MyGroupDetail}
//         options={{headerShown: false}}
//       />
//       <GroupSide.Screen
//         name="CreateGroupScreen"
//         component={CreateGroupScreen}
//         options={{headerShown: false}}
//       />
//     </GroupSide.Navigator>
//   );
// };
// const CommunitySideNavigator = () => {
//   return (
//     <CommunitySide.Navigator initialRouteName="CommunityScreen">
//       <CommunitySide.Screen
//         name="CommunityScreen"
//         component={CommunityScreen}
//         options={{headerShown: false}}
//       />
//       <CommunitySide.Screen
//         name="ArticleDetailScreen"
//         component={ArticleDetailScreen}
//         options={{headerShown: false}}
//       />
//       <CommunitySide.Screen
//         name="CreateArticleScreen"
//         component={CreateArticleScreen}
//         options={{headerShown: false}}
//       />
//       <CommunitySide.Screen
//         name="RoutineArticleDetailScreen"
//         component={RoutineArticleDetailScreen}
//         options={{headerShown: false}}
//       />
//     </CommunitySide.Navigator>
//   );
// };

// const MyPageSideNavigator = () => {
//   return (
//     <MyPageSide.Navigator initialRouteName="MainMyPageScreen">
//       <MyPageSide.Screen
//         name="MainMyPageScreen"
//         component={MainMyPageScreen}
//         options={{headerShown: false}}
//       />
//       <MyPageSide.Screen
//         name="ChangeImageScreen"
//         component={ChangeImageScreen}
//         options={{headerShown: false}}
//       />
//       <MyPageSide.Screen
//         name="AddGroupScreen"
//         component={AddGroupScreen}
//         options={{headerShown: false}}
//       />
//       <MyPageSide.Screen
//         name="AddGroupDetailScreen"
//         component={AddGroupDetailScreen}
//         options={{headerShown: false}}
//       />
//       <MyPageSide.Screen
//         name="AddScreen"
//         component={AddScreen}
//         options={{headerShown: false}}
//       />
//       <MyPageSide.Screen
//         name="CancelScreen"
//         component={CancelScreen}
//         options={{headerShown: false}}
//       />
//       <MyPageSide.Screen
//         name="ChangePasswordScreen"
//         component={ChangePasswordScreen}
//         options={{headerShown: false}}
//       />
//     </MyPageSide.Navigator>
//   );
// };
// const NoticeNavigator = () => {
//   return (
//     <Notice.Navigator initialRouteName="NoticeListScreen">
//       <Notice.Screen
//         name="NoticeListScreen"
//         component={NoticeListScreen}
//         options={{headerShown: false}}
//       />
//       <Notice.Screen
//         name="AddNoticeScreen"
//         component={AddNoticeScreen}
//         options={{headerShown: false}}
//       />
//       <Notice.Screen
//         name="NoticeDetailScreen"
//         component={NoticeDetailScreen}
//         options={{headerShown: false}}
//       />
//     </Notice.Navigator>
//   );
// };

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
      <LoginSide.Screen
        name="AddFacePhotoScreen"
        component={AddFacePhotoScreen}
        options={{headerShown: false}}
      />
      <Login.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
    </LoginSide.Navigator>
  );
};

const Main = createNativeStackNavigator();
const Group = createNativeStackNavigator();
const Community = createNativeStackNavigator();
const MyPage = createNativeStackNavigator();
const Login = createNativeStackNavigator();
const Notice = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Main.Navigator initialRouteName={false ? 'HomeScreen' : 'LoginScreen'}>
      <Main.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="CreateRoutineScreen"
        component={CreateRoutineScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="MyRoutineListScreen"
        component={MyRoutineListScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="RoutineDetailScreen"
        component={RoutineDetailScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="RoutineItem"
        component={RoutineItem}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="MyGroupListScreen"
        component={MyGroupListScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="AddFacePhotoScreen"
        component={AddFacePhotoScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="RoutineReservationScreen"
        component={RoutineReservationScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="RoutineArticleDetailScreen"
        component={RoutineArticleDetailScreen}
        options={{headerShown: false}}
      />
    </Main.Navigator>
  );
};
const GroupNavigator = () => {
  return (
    <Group.Navigator initialRouteName="GroupListScreen">
      <Group.Screen
        name="GroupListScreen"
        component={GroupListScreen}
        options={{headerShown: false}}
      />
      <Group.Screen
        name="GroupListDetailScreen"
        component={GroupListDetailScreen}
        options={{headerShown: false}}
      />
      <Group.Screen
        name="MyGroupListScreen"
        component={MyGroupListScreen}
        options={{headerShown: false}}
      />
      <Group.Screen
        name="MyGroupDetail"
        component={MyGroupDetail}
        options={{headerShown: false}}
      />
      <Group.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{headerShown: false}}
      />
    </Group.Navigator>
  );
};
const CommunityNavigator = () => {
  return (
    <Community.Navigator initialRouteName="CommunityScreen">
      <Community.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{headerShown: false}}
      />
      <Community.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{headerShown: false}}
      />
      <Community.Screen
        name="CreateArticleScreen"
        component={CreateArticleScreen}
        options={{headerShown: false}}
      />
      <Community.Screen
        name="RoutineArticleDetailScreen"
        component={RoutineArticleDetailScreen}
        options={{headerShown: false}}
      />
    </Community.Navigator>
  );
};

const MyPageNavigator = () => {
  return (
    <MyPage.Navigator initialRouteName="MainMyPageScreen">
      <MyPage.Screen
        name="MainMyPageScreen"
        component={MainMyPageScreen}
        options={{headerShown: false}}
      />
      <MyPage.Screen
        name="ChangeImageScreen"
        component={ChangeImageScreen}
        options={{headerShown: false}}
      />
      <MyPage.Screen
        name="AddGroupScreen"
        component={AddGroupScreen}
        options={{headerShown: false}}
      />
      <MyPage.Screen
        name="AddGroupDetailScreen"
        component={AddGroupDetailScreen}
        options={{headerShown: false}}
      />
      <MyPage.Screen
        name="AddScreen"
        component={AddScreen}
        options={{headerShown: false}}
      />
      <MyPage.Screen
        name="CancelScreen"
        component={CancelScreen}
        options={{headerShown: false}}
      />
      {/* <MyPage.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      /> */}
    </MyPage.Navigator>
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

const LoginNavigator = () => {
  return (
    <Login.Navigator initialRouteName="MainMyPageScreen">
      <Login.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <Login.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Login.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Login.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Login.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Login.Screen
        name="AddFacePhotoScreen"
        component={AddFacePhotoScreen}
        options={{headerShown: false}}
      />
      <Login.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
    </Login.Navigator>
  );
};

function App() {
  AsyncStorage.setItem(
    'ip',
    JSON.stringify({
      // ip: 'http://192.168.35.75:8090/api', // 집
      ip: 'http://70.12.246.83:8090/api', // 싸피
      // ip: 'http://192.168.0.13:8090/api', // 롯l데
      // ip: 'https://i8a204.p.ssafy.io/api', // aws
    }),
    () => {
      console.log('ip등록성공');
    },
  );
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        unmountOnBlur={true}
        tabBarScrollEnabled={true}
        screenOptions={({route}) => ({
          tabBarKeyBoardHidesTabBar: true,
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
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
        })}>
        <Tab.Screen
          name="Home"
          component={MainNavigator} //{MainSideNavigator}
          options={{
            unmountOnBlur: true,
            headerTitle: props => (
              <Pressable
                onPress={() =>
                  navigation.navigate('HomeScreen', {change: true})
                }>
                <Text
                  variant="displayMedium"
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}>
                  SSAFIT
                </Text>
              </Pressable>
            ),
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 500,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Group"
          component={GroupNavigator} //{GroupSideNavigator}
          options={{
            unmountOnBlur: true,
            headerTitle: props => (
              <Pressable
                onPress={() =>
                  navigation.navigate('HomeScreen', {change: true})
                }>
                <Text
                  variant="displayMedium"
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}>
                  SSAFIT
                </Text>
              </Pressable>
            ),
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 500,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityNavigator} //{CommunitySideNavigator}
          options={{
            unmountOnBlur: true,
            headerTitle: props => (
              <Pressable
                onPress={() =>
                  navigation.navigate('HomeScreen', {change: true})
                }>
                <Text
                  variant="displayMedium"
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}>
                  SSAFIT
                </Text>
              </Pressable>
            ),
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 500,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageNavigator} //{MyPageSideNavigator}
          options={{
            unmountOnBlur: true,
            headerTitle: props => (
              <Pressable
                onPress={() =>
                  navigation.navigate('HomeScreen', {change: true})
                }>
                <Text
                  variant="displayMedium"
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}>
                  SSAFIT
                </Text>
              </Pressable>
            ),
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 500,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginSideNavigator} // {LoginNavigator} //
          options={{
            unmountOnBlur: true,
            headerTitle: props => (
              <Pressable
                onPress={() =>
                  navigation.navigate('HomeScreen', {change: true})
                }>
                <Text
                  variant="displayMedium"
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}>
                  SSAFIT
                </Text>
              </Pressable>
            ),
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 500,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Notice"
          component={NoticeNavigator}
          options={{
            unmountOnBlur: true,
            headerTitle: props => (
              <Pressable
                onPress={() =>
                  navigation.navigate('HomeScreen', {change: true})
                }>
                <Text
                  variant="displayMedium"
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}>
                  SSAFIT
                </Text>
              </Pressable>
            ),
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 500,
            },
            headerTitleAlign: 'center',
          }}
        />

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
