import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Pressable, StyleSheet } from 'react-native'
import Button from '../../components/Button'

export default function MainMyPageScreen({navigation}) {
 const my = {id:1, name:'이학준', state:'member'}
 const groups =[{id:0, name:'유현준'}, {id:1, name:'송경삼'},{id:2, name:'강권우'},{id:3, name:'김성은'},{id:4, name:'한선희'}]
 const announcements = [{id:0, title:'첫번째 공지사항'}, {id:1, title:'두번째 공지사항'}, {id:2, title:'세번째 공지사항'}, {id:3, title:'네번째 공지사항'}]
 return (
  <View>
    <Text> MainMyPageScreen </Text>
    {my.state==='member' && <View>
        <View  style={{alignSelf: 'center'}}>
            <View style={{position: 'relative', margin:0}}>
                <Image source={require('../Group/icon.png')} style={{width: 100, height: 100}}/>
                <TouchableOpacity 
                style={{width: 20, height: 20, bottom: 30, left: 70, zIndex: 1}}
                onPress={() => navigation.navigate('ChangeImageScreen')}>
                    <Image source={require('../Group/plus.png')} /> 
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', alignSelf: 'center'}}>
                <Text style={{fontSize:25, fontWeight: 'bold', margin:0}}>{my.name}님</Text>
                <TouchableOpacity>
                    <Image source={require('../Group/plus.png')} /> 
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <Image source={require('../Group/icon.png')} style={{width: 20, height: 20}}/>
            <Text>그룹 초대 요청</Text>
            <FlatList
                data={groups}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({item}) => (
                <Pressable 
                    onPress={() => navigation.navigate('AddGroupScreen', {id: item.id})}>
                    <Text>{item.name}님으로부터 그룹 초대 요청이 왔습니다.</Text>
                </Pressable>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    </View>}
    {my.state === 'admin' &&<View>
        <View  style={{alignSelf: 'center'}}>
            <View style={{position: 'relative', margin:0}}>
                <Image source={require('../Group/icon.png')} style={{width: 100, height: 100}}/>
                <TouchableOpacity 
                style={{width: 20, height: 20, bottom: 30, left: 70, zIndex: 1}}
                onPress={() => navigation.navigate('ChangeImageScreen')}>
                    <Image source={require('../Group/plus.png')} /> 
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', alignSelf: 'center'}}>
                <Text style={{fontSize:25, fontWeight: 'bold', margin:0}}>{my.name}님</Text>
                <TouchableOpacity>
                    <Image source={require('../Group/plus.png')} /> 
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <Image source={require('../Group/icon.png')} style={{width: 20, height: 20}}/>
            <Text>작성한 공지사항</Text>
            <FlatList
                data={announcements}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({item}) => (
                <Pressable 
                    onPress={() => navigation.navigate('AddGroupScreen', {id: item.id})}>
                    <Text>[공지]{item.title}</Text>
                </Pressable>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    </View>}

    <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateGroupScreen')}
      >
        회원 탈퇴
      </Button>
  </View>
 ) 
}

const styles = StyleSheet.create({
    separator: {
      backgroundColor: '#e0e0e0',
      height: 1,
    },
    container: {
      flex: 1,
      flexWrap: 'wrap',
      marginTop: 8,
      backgroundColor: 'aliceblue',
      maxHeight: 400,
    },
    box: {
      height: 40,
      fontWeight: 'bold', 
      fontSize:25
    },
  });