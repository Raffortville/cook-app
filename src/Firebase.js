import firebase from 'firebase/app'
import  'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {

    apiKey: "AIzaSyAkCPwGcg_TvQykF7pPvwsdbobCr0Z1P6g",
    authDomain: "cook-app-ef4df.firebaseapp.com",
    projectId: "cook-app-ef4df",
    storageBucket: "cook-app-ef4df.appspot.com",
    messagingSenderId: "450798936713",
    appId: "1:450798936713:web:f540b15babff037f559c58"
};
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

export const storage = firebase.storage()

export const auth = firebase.auth()

export const providerGg = new firebase.auth.GoogleAuthProvider();

export const providerFb = new firebase.auth.FacebookAuthProvider();

db.languageCode = "fr_FR";

auth.languageCode="fr_FR";

storage.languageCode ="fr_FR";