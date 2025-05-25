import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import PageTest1 from './pages/PageTest1';

import PageTest2 from './pages/PageTest2.js';
import PageTest3 from './pages/PageTest3.js';
import PageTest4 from './pages/PageTest4.js';
import PageTest5 from './pages/PageTest5.js';
import PageTest6 from './pages/PageTest6.js';
import {Provider} from 'react-redux';
import store from './functions/store.js';
import PageTest7 from './pages/PageTest7.js';
import PageTest8 from './pages/PageTest8.js';
import PageTest0 from './pages/PageTest0.js';
import PageTest9 from './pages/PageTest9.js';

/// Atualizado em 05/04/2025
export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="login" component={PageTest0} />
          <Stack.Screen name="signin" component={PageTest9} />
          <Stack.Screen name="homepage" component={PageTest1} />
          <Stack.Screen name="newquest" component={PageTest2} />
          <Stack.Screen name="questquery" component={PageTest3} />
          <Stack.Screen name="questdetails" component={PageTest4} />
          <Stack.Screen name="settingspage" component={PageTest5} />
          <Stack.Screen name="statspage" component={PageTest6} />
          <Stack.Screen name="createquests" component={PageTest7} />
          <Stack.Screen name="questslist" component={PageTest8} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
