
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage} from  'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAM2vKJ4spUm7ejW1tiovoof0pdflmwbrc",
  authDomain: "alewebcarros.firebaseapp.com",
  projectId: "alewebcarros",
  storageBucket: "alewebcarros.appspot.com",
  messagingSenderId: "968577427240",
  appId: "1:968577427240:web:4c236c64b180e57bd2121d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage= getStorage(app)

export {db, auth, storage}