import * as React from 'react';

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
import {QuestType} from '../functions/System';
import {SelectList} from 'react-native-dropdown-select-list';
import DBquery from '../functions/DBquery';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeQuestList,
  updateMateria,
  updateQuestoes,
} from '../functions/counterReducer';

export default function PageTest4({route, navigation}) {
  const [questName, setQuestName] = useState('');
  const [questDescription, setQuestDescription] = useState('');

  const [Quantity, setQuantity] = useState(0);

  const [GettedQuestType, setQuestType] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [selectedTopico, setSelectedTopico] = useState('');

  const [topico, setTopico] = useState({});
  const activate = useSelector(state => state.counter);

  const dispatch = useDispatch();
  let updateQuery = new DBquery();
  let obj = route.params;

  const [questTypeName, setQuestTypeName] = useState();

  function setQuestoesMateria() {
    dispatch(updateQuestoes());
    dispatch(updateMateria());
  }

  useEffect(() => {
    selectedTopico &&
      activate.questoes &&
      activate.questoes.forEach(element => {
        if (element.value == selectedTopico) {
          setTopico(element);
        }
      });
  }, [selectedTopico]);

  const updateQuest = () => {
    updateQuery.updateQuests(
      obj,
      questName || obj.name,
      questDescription || obj.description,
      GettedQuestType || obj.class,
      false,
      Quantity || parseInt(obj.quantity),
      selectedTopico || obj.topic,
    );
  };

  useFocusEffect(
    useCallback(() => {
      setQuestoesMateria();
      handleQuestType(obj.class);
      return () => {
        setQuestoesMateria();
        setQuestName('');
        setQuestDescription('');
        setQuantity(0);
        setSelectedMateria('');
        setSelectedTopico('');
        setQuestType('');
        setTopico({});
      };
    }, []),
  );
  const selectData = QuestType.map((q, index) => ({
    key: index.toString(),
    name: q.name,
    value: q.value,
  }));

  function handleQuestType(val) {
    const selectedObj = selectData.find(item => item.value === val);
    setQuestTypeName(selectedObj.name);
    setQuestType(val);
  }

  return (
    <Container>
      <View style={{flexDirection: 'row-reverse'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIcon style={{color: 'white'}} />
        </TouchableOpacity>
      </View>
      <View style={{gap: 10}}>
        <View>
          <SelectList
            setSelected={val => handleQuestType(val)}
            data={QuestType}
            placeholder={questTypeName}
            save="value"
            search={false}
            dropdownTextStyles={[
              styles.textStyle,
              {fontSize: 20, width: 'auto'},
            ]}
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

        <View>
          <SelectList
            setSelected={setSelectedTopico}
            placeholder={`${obj.topic}`}
            defaultOption={{...obj.topic}}
            data={activate.materia}
            save="value"
            search={false}
            dropdownTextStyles={[
              styles.textStyle,
              {fontSize: 20, width: 'auto'},
            ]}
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
          Quantidade de exercícios / minutos{' '}
        </Text>
        <TextInput
          defaultValue={obj.quantity.toString()}
          style={[styles.questName, styles.textStyle, {fontSize: 15}]}
          onChangeText={e => setQuantity(parseInt(e))}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View>
          <Text style={[styles.textStyle, {fontSize: 16}]}>Name:</Text>
          <TextInput
            defaultValue={obj.name}
            style={[styles.questName, styles.textStyle, {fontSize: 15}]}
            onChangeText={questName => setQuestName(questName)}
          />
        </View>
        <View>
          <Text style={[styles.textStyle, {fontSize: 16}]}>Description</Text>
          <TextInput
            defaultValue={obj.description}
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
        onPress={() => updateQuest()}>
        <Text style={[styles.textStyle, {fontSize: 20}]}>Update Quest</Text>
      </TouchableOpacity>
    </Container>
  );
}
