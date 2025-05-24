import {Container} from '../components/Container';

import {useState} from 'react';
import DBquery from '../functions/DBquery';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {BackIcon} from '../components/BackIcon';
import {styles} from '../styles/Styles';

import {database} from '../api/firebaseConfig';
import {ref, remove, update} from 'firebase/database';
import {MMKV} from 'react-native-mmkv';

export default function PageTest5({navigation}) {
  const [deleteDocument, setDeleteDocument] = useState(false);
  const [sure, setSure] = useState(false);
  const [deleteList, setDeleteList] = useState(false);
  const [confirm, setConfirm] = useState(false);
  let updateQuery = new DBquery();
  let storage = new MMKV();

  const createDocument = () => {
    const allData = storage.getAllKeys();

    let num = 0;
    allData.forEach(async key => {
      let quests = updateQuery.getQuests(key);

      num++;

      // const refs = get(ref(database, '/main'))

      await remove(ref(database, '/main/'));

      await update(ref(database, '/main/' + key), {
        quests,
      })
        .then(() => {
          setConfirm(true);
        })
        .catch(error => {
          setConfirm(false);
          console.error('Error: ', error);
        });
    });

    if (confirm == true) {
      Alert.alert('Success', 'Your progress has been saved successfully!');
    } else {
      Alert.alert('Error', 'An error occurred while saving your progress.');
    }
  };

  return (
    <Container>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => createDocument()}>
          <Text style={styles.textStyle}>Save progress 💾</Text>
        </TouchableOpacity>
        {(!sure && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSure(!sure)}>
            <Text style={styles.textStyle}>Checkout 💿</Text>
          </TouchableOpacity>
        )) || (
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: 'blue', height: 'auto', padding: 10},
            ]}
            onPress={() => {
              updateQuery.Recover(), setSure(!sure);
            }}>
            <Text style={styles.textStyle}>Are you sure to checkout? 💿</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('statspage')}
          style={styles.button}>
          <Text style={styles.textStyle}>Stats 📊</Text>
        </TouchableOpacity>

        {(!deleteDocument && (
          <TouchableOpacity
            onPress={() => setDeleteDocument(!deleteDocument)}
            style={styles.button}>
            <Text style={styles.textStyle}> Delete All ❌</Text>
          </TouchableOpacity>
        )) || (
          <TouchableOpacity
            onPress={() => {
              setDeleteDocument(!deleteDocument),
                storage.clearAll(),
                updateQuery.setScore(),
                updateQuery.deleteAll();
            }}
            style={[
              styles.button,
              {backgroundColor: 'red', height: 'auto', padding: 10},
            ]}>
            <Text style={styles.textStyle}>
              {' '}
              Are you sure to delete all? ❌
            </Text>
          </TouchableOpacity>
        )}

        {(!deleteList && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setDeleteList(!deleteList)}>
            <Text style={styles.textStyle}>Delete all list 📚</Text>
          </TouchableOpacity>
        )) || (
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: 'red', height: 'auto', padding: 10},
            ]}
            onPress={() => {
              updateQuery.DeleteList(), setDeleteList(!deleteList);
            }}>
            <Text style={styles.textStyle}>
              Are you sure to delete all list? 📚
            </Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('createquests')}>
          <Text style={styles.textStyle}>New quest type ✏</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('questslist')}>
          <Text style={styles.textStyle}>Quest types ✏</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
