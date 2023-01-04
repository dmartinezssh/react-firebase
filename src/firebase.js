import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCGi7n22o0USHN-2yH-Up4BlPMb0ZefmKk",
    authDomain: "project-makeda-34870.firebaseapp.com",
    projectId: "project-makeda-34870",
    storageBucket: "project-makeda-34870.appspot.com",
    messagingSenderId: "140441683057",
    appId: "1:140441683057:web:a790edb4ad1be0d80387d0",
    measurementId: "G-5WQMZKWXPD"
};
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

export { app, firestore}