import * as React from 'react';
import {Container} from '../components/Container';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {BackIcon} from '../components/BackIcon';
import {styles} from '../styles/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  createQuest,
  getQuestObjects,
  setQuestObject,
  updateQuest,
} from '../functions/counterReducer';

export default function PageTest7({navigation, route}) {
  const updateData = route.params;
  const dispatch = useDispatch();
  const activate = useSelector(state => state.counter);
  return (
    <Container>
      <View style={{flexDirection: 'row', marginBottom: 50}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      {/* Fazer fazer com que seja possivel criar um novo objeto */}
      <View style={{marginTop: 20, flex: 1}}>
        <Text style={[styles.textStyle, {fontSize: 20}]}>Quest Type Name:</Text>
        <TextInput
          style={[styles.textStyle, {fontSize: 20}]}
          defaultValue={updateData ? updateData.value : ''}
          onChangeText={e => {
            dispatch(setQuestObject(e));
          }}
        />
      </View>
      {/* <View>
        <Text style={[styles.textStyle, {fontSize: 20}]}>Quantidade de XP</Text>
        <TextInput
          style={[styles.textStyle, {fontSize: 20}]}
          onChangeText={e => {}}
        />
      </View> */}
      {(updateData && (
        <TouchableOpacity
          style={styles.addQuestButton}
          onPress={() => {
            // dispatch(createQuest());
            // dispatch(getQuestObjects());
            dispatch(updateQuest(updateData));
          }}>
          <Text style={styles.textStyle}>Update Quest</Text>
        </TouchableOpacity>
      )) || (
        <TouchableOpacity
          style={styles.addQuestButton}
          onPress={() => {
            dispatch(createQuest());
            dispatch(getQuestObjects());
          }}>
          <Text style={styles.textStyle}>Create Quest</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}
