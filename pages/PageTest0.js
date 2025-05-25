import {TouchableOpacity, View} from 'react-native';
import {Container} from '../components/Container';
import {EpicIcon} from '../components/BackIcon';
import {ScrollView, Text, TextInput} from 'react-native-gesture-handler';
import {styles} from '../styles/Styles';
import {act, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {getApp} from '@react-native-firebase/app';
import DBquery from '../functions/DBquery';

export default function PageTest0({route, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, IsLoading] = useState(false);
  const app = getApp();
  const firebaseAuth = auth(app);
  let updateQuery = new DBquery();

  async function login() {
    if (password.trim().length < 1 || email.trim().length < 1) {
      alert('Incorrect email or password');
    } else {
      try {
        IsLoading(true);
        await firebaseAuth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            navigation.navigate('homepage');
          })
          .catch(error => {
            alert('Incorrect email or password');

            return;
          });
        IsLoading(false);
      } catch (error) {
        console.error('Algo deu errado: ', error);
      }
    }
  }
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('homepage');
      } else {
      }
    });
  }, []);

  return (
    <Container>
      {!loading && (
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  margin: 40,
                }}>
                <EpicIcon size={150} />
              </View>
            </View>
            <View style={{padding: 10}}>
              <Text style={[styles.textStyle, {fontSize: 15}]}>Email</Text>

              <TextInput
                onChangeText={e => setEmail(e)}
                style={[styles.textStyle, {fontSize: 15}]}></TextInput>
            </View>
            <View style={{padding: 10}}>
              <Text style={[styles.textStyle, {fontSize: 15}]}>Password</Text>
              <TextInput
                textContentType="password"
                secureTextEntry={true}
                onChangeText={e => setPassword(e)}
                style={[styles.textStyle, {fontSize: 15}]}></TextInput>
            </View>
            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={login} style={styles.addQuestButton}>
                <Text style={styles.textStyle}>Login</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{alignItems: 'center', marginTop: 35, marginBottom: 50}}
                onPress={() => navigation.navigate('signin')}>
                <Text style={[styles.textStyle, {fontSize: 15}]}>
                  New player? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textStyle}>Loading...</Text>
        </View>
      )}
    </Container>
  );
}
