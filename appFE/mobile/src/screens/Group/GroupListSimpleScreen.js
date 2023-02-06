import React, { useState }from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Modal } from 'react-native-paper'

export default function GroupSearchScreen({navigation, item}) {
 const [isClickHeart, setIsClickHeart] = useState(false);
 const [isOpenModal, setIsOpenModal] = useState(false);
 const [heartCnt, setIsHeartCnt] = useState(item.heart);
 const showModal = () => setIsOpenModal(true);
 const hideModal = () => setIsOpenModal(false);
 const clickHeart = () => {
  if(isClickHeart) {
    setIsClickHeart(false);
    setIsHeartCnt(heartCnt-1);
  }
  else {
    setIsClickHeart(true);
    setIsHeartCnt(heartCnt+1);

  }
  console.log('click')
};

 return (
  <TouchableOpacity 
  onPress={() => navigation.navigate('GroupListDetailScreen', {id: item.id})}>
    <View style={[styles.container, {flex: 1, flexDirection: 'row', padding: 10, flex: 1, height: 150, alignContent: 'space-around'}]}>
      <View style={{flex: 3}}>
        <Text style={styles.box}>{item.title}</Text>
        <Text style={styles.box}>{item.content}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={clickHeart}>
            {!isClickHeart && <Image source={require('./heart.png')}/>}
            {isClickHeart && <Image source={require('./heartred.png')}/>}
            <Text style={styles.box}>{heartCnt}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={showModal}>
            <Image source={require('./comment.png')}/>
            <Text style={styles.box}>{item.comment}</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Text style={[styles.box, {flex: 1, fontSize: 15, alignItems: 'flex-end'}]}>{item.nowNum}/{item.totalNum} 명</Text>
      </View>
      <Modal visible={isOpenModal} onDismiss={hideModal}>
      <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </Modal>
  </TouchableOpacity>
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