
import {Container} from '../components/Container';

import {useCallback, useState, useEffect} from 'react';
import DBquery from '../functions/DBquery';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import {BackIcon, Checkbox} from '../components/BackIcon';
import {styles} from '../styles/Styles';

import {useFocusEffect} from '@react-navigation/native';
import {QuestType} from '../functions/System';
import {SelectList} from 'react-native-dropdown-select-list';
import {useDispatch, useSelector} from 'react-redux';
import {changeQuestList} from '../functions/counterReducer';

export default function PageTest3({route, navigation}) {
  const [Quests, setQuests] = useState([]);

  const [questList, setQuestList] = useState('');
  const [deleteState, setDeleteState] = useState(false);

  const activate = useSelector(state => state.counter.getQuestList);

  const dispatch = useDispatch();
  let updateQuery = new DBquery();

  // Pegar os dados caso a pagina for mudada.
  // const {questListBack} = route.params;

  const QuestDetails = item => {
    setDeleteState(false);
    navigation.navigate('questdetails', item);
  };

  const deleteQuestF = item => {
    updateQuery.deleteQuest(item);
    setQuests(updateQuery.getQuests(questList));
  };

  const setCompletedList = item => {
    updateQuery.updateQuests(
      item,
      item.name,
      item.description,
      'completedQuests',
      true,
      item.quantity,
      item.topic,
    );

    setQuests(updateQuery.getQuests(questList));
  };

  useFocusEffect(
    useCallback(() => {
      //Quando vai para outra pagina

      setQuests(updateQuery.getQuests(activate));
      setQuestList(activate);
    }, []),
  );

  useEffect(() => {
    setQuests(updateQuery.getQuests(activate)); // Carrega os dados da coleção principal quests quando a tela é ativada
    setQuestList(activate);
  }, [questList]);

  return (
    <Container>
      <View>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon />
          </TouchableOpacity>
        </View>
        <View style={{gap: 10}}>
          <View>
            <SelectList
              setSelected={val => {
                setQuestList(val);
                setQuests(updateQuery.getQuests(val));
                dispatch(changeQuestList(val));
              }}
              data={QuestType}
              placeholder="mainQuests"
              search={false}
              dropdownTextStyles={{color: 'white', fontSize: 20}}
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
      </View>
      <FlatList
        scrollEnabled={true}
        data={Quests}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.questButton}>
            {/* {   questList != 'completedQuests' &&
                                      <Checkbo  onChange={() => {setCompletedList(item), questList != 'dailyQuests' && setChecked(!isChecked)}} checked={isChecked} />
                                  } */}
            {questList != 'completedQuests' && (
              <Pressable
                style={{marginRight: 15}}
                onPress={() => {
                  setCompletedList(item);
                }}>
                <Checkbox />
              </Pressable>
            )}

            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => QuestDetails(item)}
                onLongPress={() => setDeleteState(!deleteState)}
                style={{flex: 1}}>
                <Text
                  style={[styles.textStyle, {fontSize: 25, marginLeft: 10}]}>
                  Fazer {item.quantity}
                  {' de '}
                  {item.topic}
                </Text>
              </TouchableOpacity>
              {item.topic == 'Redação' && (
                <View>
                  <Text style={[styles.textStyle, {fontSize: 16}]}>
                    Quantity / minutes{' '}
                  </Text>
                  <TextInput
                    style={styles.questName}
                    onChangeText={e =>
                      isNaN ? null : setNotaRedacao(parseInt(e))
                    }
                  />
                </View>
              )}
            </View>

            {deleteState && (
              <View style={{marginHorizontal: 15}}>
                <TouchableOpacity onPress={() => deleteQuestF(item)}>
                  <Text style={[styles.textStyle, {fontSize: 20}]}>🗑</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addQuestButton}
        onPress={() => {
          navigation.navigate('newquest', questList);
        }}>
        <Text style={styles.textStyle}>Add Quest</Text>
      </TouchableOpacity>
    </Container>
  );
}
