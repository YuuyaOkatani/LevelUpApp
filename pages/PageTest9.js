import {Easing, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container} from '../components/Container';
import {BackIcon, EpicIcon} from '../components/BackIcon';
import {styles} from '../styles/Styles';
import {useState} from 'react';

import {ScrollView} from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import {getApp} from '@react-native-firebase/app';
export default function PageTest9({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validacao = '@gmail.com';
  const terminaCom = email.endsWith(validacao.trim());
  const app = getApp();
  const firebaseAuth = auth(app);
  async function createUser() {
    if (terminaCom && email.length > 10) {
      if (password.length > 7) {
        firebaseAuth
          .createUserWithEmailAndPassword(email, password)
          .then(firebaseAuth.signInWithEmailAndPassword(email, password))
          .then(navigation.navigate('homepage'))
          .catch(error => console.log(error));
      } else {
        alert('Put at least 7 characters');
      }
    } else {
      alert('Invalid Email');
    }
  }
  return (
    <Container>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <BackIcon />
            </TouchableOpacity>
          </View>
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
              onChangeText={e => setPassword(e)}
              secureTextEntry={true}
              style={[styles.textStyle, {fontSize: 15}]}></TextInput>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => createUser()}
              style={styles.addQuestButton}>
              <Text style={styles.textStyle}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
}
