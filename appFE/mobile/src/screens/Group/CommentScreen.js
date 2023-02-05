import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function CommentScreen({comment}) {
    const [isMember, setIsMembe] = useState(comment.isMember);
    const addMember = () => {
        if(isMember) setIsMembe(false);
        else setIsMembe(true);
        console.log('click')
      };
  return (
    <View style={styles.container}> 
        <View style={{ flexDirection: 'row', alignContent: 'center'}}>
            <Image source={require('./icon.png')}/>
            <Text>{comment.memberid}</Text>
            <TouchableOpacity  onPress={addMember}>
                {isMember && <Image source={require('./heartred.png')}/>}
                {!isMember && <Image source={require('./heart.png')}/>}
            </TouchableOpacity>
        </View>
        <Text style={[styles.routineName, {marginLeft: 20}]}>{comment.commentText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 0.5
  },
  routineName: {
    fontSize: 20
  }
})