import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getDatabase} from 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyCPsk7CraHR_l4iZphvwXFo9sg4oO8IYRE",
    authDomain: "espmindeqfirebase.firebaseapp.com",
    databaseURL: "https://espmindeqfirebase-default-rtdb.firebaseio.com",
    projectId: "espmindeqfirebase",
    storageBucket: "espmindeqfirebase.appspot.com",
    messagingSenderId: "876945044749",
    appId: "1:876945044749:web:c673ab7cf1d0e33e1c2c44"
  };

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase();

export {db};