import * as React from 'react';
import {Container} from '../components/Container';

import {useEffect, useCallback, useState, useRef} from 'react';
import DBquery from '../functions/DBquery';

import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import {GearIcon, AddIcon, Checkbox} from '../components/BackIcon';
import {styles} from '../styles/Styles';
import ProgressBar from '../components/ProgressBar';

import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {changeQuestList} from '../functions/counterReducer';

import {MMKV} from 'react-native-mmkv';
export default function PageTest1({navigation}) {
  const [deleteState, setDeleteState] = useState(false);
  const [Quests, setQuests] = useState([]);
  const [level, setLevel] = useState(1);
  const [levelAdvice, setLevelAdvice] = useState(0);
  const [currentXP, setCurrentXP] = useState(0);
  const [nedeedXP, setNedeedXP] = useState(0);
  const [XP, setXP] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const dispatch = useDispatch();
  let updateQuery = new DBquery();
  let storage = new MMKV();

  const setCompletedList = itemSelect => {
    let item = updateQuery
      .getQuests('currentQuests')
      .find(x => x.id === itemSelect.id);

    updateQuery.updateQuests(
      item,
      item.name,
      item.description,
      'completedQuests',
      true,
      item.quantity,
      item.topic,
    );
    setQuests(updateQuery.getQuests('currentQuests'));
    updateLevel();
  };

  const updateLevel = () => {
    const {letlevel, letCurrentXP, letNedeedXP} = updateQuery.checkLevel();
    setQuests(updateQuery.getQuests('currentQuests'));
    setCurrentXP(letCurrentXP);
    setNedeedXP(letNedeedXP);
    setLevel(letlevel);
  };

  const showMessage = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // Sobe para a posição final
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 20, // Desce para a.GetDirectoryName
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  useEffect(() => {
    let XPs = (currentXP / nedeedXP) * 100;
    isNaN(XPs) ? setXP(0) : setXP(XPs);
  }, [currentXP, nedeedXP]);

  useEffect(() => {
    level > 1 && level > levelAdvice && levelAdvice != 0 ? showMessage() : null;

    level > 1 ? setLevelAdvice(level) : null;
  }, [level]);

  useFocusEffect(
    useCallback(() => {
      updateLevel();

      return () => {};
    }, []),
  );

  return (
    <Container>
      <View style={{flexDirection: 'row-reverse'}}>
        <TouchableOpacity onPress={() => navigation.navigate('settingspage')}>
          <GearIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.containerStats}>
        <View style={styles.statsBox}>
          <View>
            <Animated.View style={{opacity, transform: [{translateY}]}}>
              <Text style={styles.textStyle}>Level Up!</Text>
            </Animated.View>
          </View>
          <Text style={[styles.textStyle, {fontSize: 19}]}>
            {currentXP} / {nedeedXP}
          </Text>
          {/* <ProgressBar primaryColor='white' secondaryColor='#05e6ff' score={currentXP * 100 / nedeedXP} hideText={true} /> */}
          <ProgressBar progress={XP} />
        </View>
        <View style={styles.levelBox}>
          <Text style={styles.textStyle}>{level}</Text>
          <Text style={styles.textStyle}>Lvl</Text>
        </View>
      </View>
      <View style={styles.taskBox}>
        <View style={styles.taskBar}>
          <Text style={[styles.textStyle, {flex: 1}]}>Current Quests</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('questquery');
              dispatch(changeQuestList('mainQuests'));
            }}>
            <AddIcon />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginTop: 10}}>
          {Quests && (
            <FlatList
              data={Quests}
              scrollEnabled={true}
              renderItem={({item}) =>
                item && (
                  <View style={styles.questButton}>
                    <Pressable
                      style={{marginRight: 15}}
                      onPress={() => {
                        setCompletedList(item);
                      }}>
                      <Checkbox />
                    </Pressable>

                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {
                          setDeleteState(false);
                          navigation.navigate('questdetails', item);
                        }}
                        onLongPress={() => setDeleteState(!deleteState)}>
                        {(item.topic != 'Redação' && (
                          <Text
                            style={[
                              styles.textStyle,
                              {
                                fontSize: 20,
                                marginLeft: 10,
                              },
                            ]}>
                            {' '}
                            Do {item.quantity}x{' of '} {item.topic}
                          </Text>
                        )) || (
                          <Text style={{color: 'white', fontSize: 20}}>
                            {' '}
                            {item.topic}{' '}
                          </Text>
                        )}
                      </TouchableOpacity>
                      {item.topic == 'Redação' && (
                        <TextInput
                          placeholder="Nota"
                          style={styles.textStyle}
                          onChangeText={e => {
                            setNotaRedacao(parseInt(e));
                          }}
                        />
                      )}
                    </View>

                    {deleteState && (
                      <View style={{marginHorizontal: 15}}>
                        <TouchableOpacity
                          onPress={() => {
                            updateQuery.deleteQuest(item);
                            setQuests(updateQuery.getQuests(item.class));
                          }}>
                          <Text style={{color: 'white', fontSize: 40}}>🗑</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )
              }
            />
          )}
          <TouchableOpacity
            style={styles.addQuestButton}
            onPress={() => navigation.navigate('newquest', 'currentQuests')}>
            <Text style={styles.textStyle}>Add Quest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
