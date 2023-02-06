import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import Button from '../../components/Button'

export default function AnnouncementListScreen({ navigation }) {
    const my = {id:1, name:'이학준', state:'admin'}
    const announcements = [{id:0, title:'첫번째 공지사항'}, {id:1, title:'두번째 공지사항'}, {id:2, title:'세번째 공지사항'}, {id:3, title:'네번째 공지사항'}]
    return (
        <View>
            {my.state === 'admin' && <Button
                mode="contained"
                onPress={() => {navigation.navigate('AddAnnouncementScreen');}}>
                작성
            </Button>}
            <FlatList
                    data={announcements}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({item}) => (
                    <Pressable 
                        onPress={() => navigation.navigate('AnnouncementDetailScreen', {id: item.id})}>
                        <Text>[공지]{item.title}</Text>
                    </Pressable>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
        </View>
  )
}

const styles = StyleSheet.create({
    separator: {
      backgroundColor: '#e0e0e0',
      height: 1,
    },
  });