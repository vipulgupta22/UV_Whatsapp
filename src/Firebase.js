// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDWco6Sn3X43oFZH_2lMBFTmlnXzaYD7TI",
    authDomain: "uvwhatsapp.firebaseapp.com",
    projectId: "uvwhatsapp",
    storageBucket: "uvwhatsapp.appspot.com",
    messagingSenderId: "1090342616135",
    appId: "1:1090342616135:web:25a94cdae752be71cd4562",
    measurementId: "G-WXBVH7HF26"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;