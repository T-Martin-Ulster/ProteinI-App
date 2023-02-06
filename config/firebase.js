import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7XBJR89N46NCgPjo1QO_5vuDgV7IxUfU",
  authDomain: "protein-i.firebaseapp.com",
  projectId: "protein-i",
  storageBucket: "protein-i.appspot.com",
  messagingSenderId: "602736874034",
  appId: "1:602736874034:web:08cbfdd5f856c3dafe222b",
  measurementId: "G-W0MV21Z9VY"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };