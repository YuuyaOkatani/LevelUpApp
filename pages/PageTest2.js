import * as React from 'react';
import uuid from 'react-native-uuid';
import {Container} from '../components/Container';

import {useEffect, useCallback, useState} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {BackIcon} from '../components/BackIcon';
import {styles} from '../styles/Styles';

import {useFocusEffect} from '@react-navigation/native';
import {SelectList} from '../components/react-native-dropdown-select-list';
import {MMKV} from 'react-native-mmkv';
import DBquery from '../functions/DBquery';
import {useDispatch} from 'react-redux';
import {changeQuestList} from '../functions/counterReducer';
import {QuestType} from '../functions/System';

export default function PageTest2({route, navigation}) {
  const [questName, setQuestName] = useState('');
  const [questDescription, setQuestDescription] = useState('');

  const [Quantity, setQuantity] = useState(0);
  const [error, setError] = useState(false);

  const [selectedTopico, setSelectedTopico] = useState('');
  const [topico, setTopico] = useState({});

  const dispatch = useDispatch();

  let storage = new MMKV();
  let updateQuery = new DBquery();
  let questList = route.params;

  let questoes = updateQuery.getQuests('questoes');

  const addQuest = () => {
    const collectionString = storage.getString(questList);

    let Questies = collectionString ? JSON.parse(collectionString) : [];
    try {
      if (!selectedTopico || selectedTopico == '') {
        setError(true);
        alert('Insufficient data');
        return;
      } else {
        setError(false);

        let date = new Date();

        let newKey = uuid.v4();
        let QuestRef = {
          id: newKey,
          name: questName,
          description: questDescription,
          completed: false,
          class: questList,
          quantity: Quantity,
          topic: selectedTopico,
          // subTopic: topico,
          reward: Quantity * topico.xp,
          createAt: date,
        };

        updateQuery.addQuest(QuestRef, questList);
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      setQuestName('');
      setQuestDescription('');
      questoes = updateQuery.getQuests('questoes');

      return () => {
        setQuestName('');
        setQuestDescription('');
      };
    }, []),
  );

  useEffect(() => {
    questoes &&
      questoes.forEach(element => {
        if (element.value == selectedTopico) {
          setTopico(element);
        }
      });
  }, [selectedTopico]);
  return (
    <Container>
      <View style={{flexDirection: 'row-reverse', marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            dispatch(changeQuestList(questList));
          }}>
          <BackIcon />
        </TouchableOpacity>
      </View>

      <View style={{gap: 10}}>
        <View>
          <SelectList
            setSelected={val => {
              setSelectedTopico(val);
            }}
            data={questoes}
            placeholder={
              selectedTopico == '' ? 'Select a topic' : selectedTopico
            }
            search={false}
            dropdownTextStyles={[styles.textStyle, {fontSize: 20}]}
            boxStyles={{
              backgroundColor: '#031b40',
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 0,
            }}
            inputStyles={[styles.textStyle, {fontSize: 20, width: 'auto'}]}
            dropdownStyles={{
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 0,
            }}
          />
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <Text style={[styles.textStyle, {fontSize: 16}]}>
          Quantity / minutes{' '}
        </Text>
        <TextInput
          style={[styles.textStyle, {fontSize: 15}]}
          onChangeText={e => setQuantity(parseInt(e))}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View>
          <Text style={[styles.textStyle, {fontSize: 15}]}>Quest name: </Text>
          <TextInput
            style={[styles.textStyle, {fontSize: 15}]}
            onChangeText={questName => setQuestName(questName)}
          />
        </View>
        <View>
          <Text style={[styles.textStyle, {fontSize: 15}]}>Description</Text>
          <TextInput
            style={[styles.textStyle, {fontSize: 15}]}
            multiline={true}
            onChangeText={questDescription =>
              setQuestDescription(questDescription)
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addQuestButton}
        onPress={() => addQuest()}>
        <Text style={styles.textStyle}>Add Quest</Text>
      </TouchableOpacity>
    </Container>
  );
}
