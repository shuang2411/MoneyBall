import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBqdcAZULn67e2xDpAXw1NO-1Dux64XOp0",
    authDomain: "money-ball-1c4b7.firebaseapp.com",
    databaseURL: "https://money-ball-1c4b7.firebaseio.com",
    projectId: "money-ball-1c4b7",
    storageBucket: "money-ball-1c4b7.appspot.com",
    messagingSenderId: "680908302350",
    appId: "1:680908302350:web:666cea1087f74466d4b45f",
    measurementId: "G-5LZWLJQMG1"
  };

firebase.initializeApp(firebaseConfig);

console.log("Firebase initialized");

export const auth = firebase.auth();
export const db = firebase.firestore();
export default db;