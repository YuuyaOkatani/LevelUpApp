// You can copy and paste the firebase config here.
// Você pode copiar e colar a configuração do firebase aqui.
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {
  APIKEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';
import {getFirestore} from 'firebase/firestore';

import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: `${APIKEY}`,
  authDomain: `${AUTH_DOMAIN}`,
  databaseURL: `${DATABASE_URL}`,
  projectId: `${PROJECT_ID}`,
  storageBucket: `${STORAGE_BUCKET}`,
  messagingSenderId: `${MESSAGING_SENDER_ID}`,
  appId: `${APP_ID}`,
  measurementId: `${MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firebaseAuth = auth();
// export const firebaseAuth = getAuth(app);
