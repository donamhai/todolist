import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyARCGJc-mXpj6hBN3hggspKPfKCkMPqODs",
  authDomain: "myapp-221907.firebaseapp.com",
  projectId: "myapp-221907",
  storageBucket: "myapp-221907.appspot.com",
  messagingSenderId: "412953171914",
  appId: "1:412953171914:web:ffc8cab28af04cfa086133",
  measurementId: "G-QGK7J0D8Q0",
};

// Initialize Firebase
const FireBase = firebase.initializeApp(firebaseConfig);

export default FireBase;
