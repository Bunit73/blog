// https://medium.com/geekculture/firebase-auth-with-react-and-typescript-abeebcd7940a

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB1EvsoEVkEsik4efDURH0FCh35KQcKMHU',
  authDomain: 'benfblog.firebaseapp.com',
  databaseURL: 'https://benfblog-default-rtdb.firebaseio.com',
  projectId: 'benfblog',
  storageBucket: 'benfblog.appspot.com',
  messagingSenderId: '815494126797',
  appId: '1:815494126797:web:34b6b564d612da21c45d84',
  measurementId: 'G-CG0XN39R10'
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const db = firebase.firestore();
export const auth = firebase.auth();
