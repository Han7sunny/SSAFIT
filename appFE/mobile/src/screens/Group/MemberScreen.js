import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';

export default function MemberScreen({member}) {
  return (
    <View>
      {member.acceptInvitation && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {member.on_off && (
            <Image
              source={require('./on.png')}
              style={{width: 50, height: 50}}
            />
          )}
          {!member.on_off && (
            <Image
              source={require('./off.png')}
              style={{width: 50, height: 50}}
            />
          )}
          <View>
            <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
              {member.userName}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 1,
                  width: '90%',
                  height: 25,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: `${member.achievementRate}%`,
                  }}>
                  <Text> </Text>
                </View>
                <Text style={{paddingLeft: 15}}>{member.achievementRate}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
