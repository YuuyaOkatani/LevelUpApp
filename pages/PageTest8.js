import {TouchableOpacity, View, Text, FlatList, Pressable} from 'react-native';
import {Container} from '../components/Container';
import {BackIcon, Checkbox} from '../components/BackIcon';
import {styles} from '../styles/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {deleteQuestState, getQuestObjects} from '../functions/counterReducer';
import DBquery from '../functions/DBquery';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

export default function PageTest8({navigation}) {
  let storage = new DBquery();

  const activate = useSelector(state => state.counter);
  const dispatch = useDispatch();

  function getObjects() {
    dispatch(getQuestObjects(storage.getQuests('questoes')));
  }

  useFocusEffect(
    useCallback(() => {
      getObjects();
      return () => {
        dispatch(deleteQuestState(false));
      };
    }, []),
  );
  return (
    <Container>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        <FlatList
          data={activate.questTypeList}
          scrollEnabled={true}
          renderItem={({item}) => (
            <View style={styles.questButton}>
              <View>
                <TouchableOpacity
                  style={{marginRight: 15, flexDirection: 'row', flex: 1}}
                  onLongPress={() => {
                    dispatch(deleteQuestState());
                  }}
                  onPress={() => {
                    navigation.navigate('createquests', item);
                  }}>
                  <Text style={[styles.textStyle, {fontSize: 30}]}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              </View>
              {activate.deleteState && (
                <View style={{marginLeft: 'auto'}}>
                  <TouchableOpacity
                    onPress={() => {
                      storage.deleteQuest({...item, class: 'questoes'});
                      getObjects();
                    }}>
                    <Text style={{color: 'white', fontSize: 30}}>🗑</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addQuestButton}
        onPress={() => navigation.navigate('createquests')}>
        <Text style={styles.textStyle}>Add Quest type</Text>
      </TouchableOpacity>
    </Container>
  );
}
