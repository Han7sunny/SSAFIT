import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function CommentScreen({comment}) {
  console.log(comment)
  return (
    <View style={styles.container}> 
        <View style={{ flexDirection: 'row', alignContent: 'center'}}>
            <Image source={require('../Group/icon.png')}/>
            <Text>{comment.memberid}</Text>
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