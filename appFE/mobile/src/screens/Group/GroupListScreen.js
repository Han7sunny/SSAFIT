import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  Modal,
  Button,
  Text,
  IconButton,
  Provider,
  Portal,
} from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import GroupListSimpleScreen from './GroupListSimpleScreen';

export default function GroupListScreen({navigation}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [SelectFilter, setSelectFilter] = useState([]);
  const [Lists, setLists] = useState([]);
  const Filters = [
    {id: 1, name: '인원'},
    {id: 2, name: '패널티'},
    {id: 3, name: '모집인원'},
    {id: 4, name: '운동기간'},
  ];

  useEffect(() => {
    const getData = async () => {
      const data = (await axios.get('http://70.12.246.116:8080/group/recruit'))
        .data;
      setLists(data);
      console.log(data);
    };
    getData();
  }, []);

  const showModal = () => setIsOpenModal(true);
  const hideModal = () => setIsOpenModal(false);
  onSelectionsChange = SelectFilter => {
    setSelectFilter(SelectFilter);
    console.log(SelectFilter);
  };
  onDeletionsChange = value => {
    const filter = SelectFilter.filter(e => e !== value);
    setSelectFilter(filter);
    console.log(filter);
  };

  return (
    <Provider style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="headlineLarge"
          style={{fontWeight: 'bold', marginTop: 10}}>
          {' '}
          그룹 모집{' '}
        </Text>
        <View style={{padding: 10, flexDirection: 'row-reverse'}}>
          <IconButton
            icon="plus-circle-outline"
            iconColor="black"
            size={50}
            onPress={() => navigation.navigate('CreateGroupScreen')}
            style={styles.iconButton}
          />
          <IconButton
            icon="tune-variant"
            iconColor="black"
            size={50}
            onPress={showModal}
            style={styles.iconButton}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          minHeight: 50,
          maxHeight: 50,
          backgroundColor: 'red',
          padding: 0,
        }}>
        {SelectFilter.map((item, idx) => (
          <Button
            mode="contained"
            style={[
              styles.button,
              {width: Math.max((item.length + 1) * 29, 100)},
            ]}
            labelStyle={styles.label}
            onPress={() => onDeletionsChange(item)}>
            {item} X
          </Button>
        ))}
      </View>
      <View style={{minHeight: 550, maxHeight: 550}}>
        <FlatList
          data={Lists}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <GroupListSimpleScreen item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.boardId.toString()}
        />
      </View>

      <Portal>
        <Modal
          presentationStyle={'FullScreen'}
          visible={isOpenModal}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <MultiSelect
            // hideTags
            items={Filters}
            uniqueKey="name"
            onSelectedItemsChange={onSelectionsChange}
            selectedItems={SelectFilter}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#999"
            tagBorderColor="#999"
            tagTextColor="#999"
            selectedItemTextColor="#999"
            selectedItemIconColor="#999"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#999'}}
            submitButtonColor="#999"
            submitButtonText="Submit"
          />
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  iconButton: {
    margin: 0,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: 400,
  },
  button: {
    width: 130,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
