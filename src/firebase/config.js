import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCfcYfsCYFlMt3xPyysJeNE0XpzWNZc8Vk',
    authDomain: "fir-97862.firebaseapp.com",
    projectId: "fir-97862",
    storageBucket: "fir-97862.appspot.com",
    messagingSenderId: "100947371868",
    appId: "1:100947371868:web:e743253668ed27218c0399",
    measurementId: "G-YVQTD5Y7HQ"
  };

  export default firebase.initializeApp(firebaseConfig)