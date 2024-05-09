// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSIwco1GNY5yaHmU7AdCBHb0ZoNMv3QJc",
  authDomain: "mychat-62142.firebaseapp.com",
  projectId: "mychat-62142",
  storageBucket: "mychat-62142.appspot.com",
  messagingSenderId: "395859765093",
  appId: "1:395859765093:web:3ebfba62be99f66e4fe38c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export{auth,app}