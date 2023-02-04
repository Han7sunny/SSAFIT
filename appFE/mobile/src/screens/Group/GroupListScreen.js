import React, { useState }from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Modal, IconButton, MD3Colors } from 'react-native-paper'
import styled from 'styled-components/native'
import GroupListSimpleScreen from './GroupListSimpleScreen'


const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function GroupListScreen({navigation}) {
  const [FilterList, setFilterList] = useState([12]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const Lists = [
    {id: 0, title: 'a', content: 'asdfasdf', nowNum: 2, totalNum: 10, heart: 5, comment: 3},
    {id: 1, title: 'b', content: 'fdhjg324', nowNum: 1, totalNum:  3, heart: 1, comment: 5},
    {id: 2, title: 'c', content: 'fghjmgjkfvdh5432', nowNum: 10, totalNum:  20, heart: 10, comment: 15},
    {id: 3, title: 'd', content: '3457646 8fgd', nowNum: 1, totalNum:  8, heart: 1, comment: 5},
  ]

  const showModal = () => setIsOpenModal(true);
  const hideModal = () => setIsOpenModal(false);
  

 return (
  <View style={{flex: 1}}>
    <View>
      <Title> 그룹 모집 </Title>
      <View style={{padding: 10, flexDirection: 'row-reverse'}}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateGroupScreen')}>
          <Image source={require('./plus.png')} style={{width:50, height: 50}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={showModal}>
          <Image source={require('./icon.png')} style={{width:50, height: 50}}/>
        </TouchableOpacity>
      </View>
      {FilterList.length > 0 &&<View>
        <Text>sdfg</Text>
      </View>} 
      <FlatList
          data={Lists}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <GroupListSimpleScreen 
              item={item}
              navigation={navigation}/>
          )}
          keyExtractor={item => item.title.toString()}
        />
    </View>
    <Modal presentationStyle={"FullScreen"} visible={isOpenModal} onDismiss={hideModal} style={{backgroundColor: 'red'}}>
      <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </Modal>
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