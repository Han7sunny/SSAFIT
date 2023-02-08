import axios from 'axios';
import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';

export default function ReplyScreen({groupId, reply}) {
  const [isMember, setIsMembe] = useState(reply.includedGroup);
  const changeMember = async () => {
    const result = await axios.post(
      `http://70.12.246.116:8080//group/recruit/${groupId}/${reply.user_id}/` +
        (isMember ? 'delete' : 'add'),
      {
        acceptInvitation: isMember ? false : true,
        groupId: groupId,
        userId: reply.user_id,
      },
    );
    if (isMember) setIsMembe(false);
    else setIsMembe(true);

    console.log('click');
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        <Image source={require('./icon.png')} />
        <Text>{reply.userName}</Text>
        <IconButton
          icon={isMember ? 'alpha-x-circle-outline' : 'plus-circle-outline'}
          size={40}
          onPress={changeMember}
          style={styles.iconButton}
        />
      </View>
      <Text style={[styles.routineName, {marginLeft: 20}]}>
        {reply.content}
      </Text>
      <IconButton
        icon={isClickHeart ? 'heart' : 'heart-outline'}
        iconColor={isClickHeart ? 'red' : 'black'}
        size={40}
        onPress={clickHeart}
        style={styles.iconButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 30,
    borderRadius: 5,
    marginBottom: 0.5,
  },
  routineName: {
    fontSize: 20,
  },
});
