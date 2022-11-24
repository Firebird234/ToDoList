import { initializeApp } from "firebase/app"; 
import { getFirestore } from 'firebase/firestore';

import { getStorage, ref} from "firebase/storage";

//конфиг firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2EOw4nHwwMrsOWNbSV40mtqEtT2wAE34",
  authDomain: "todolist-c36e4.firebaseapp.com",
  projectId: "todolist-c36e4",
  storageBucket: "todolist-c36e4.appspot.com",
  messagingSenderId: "203690839688",
  appId: "1:203690839688:web:5cb293f24adbfdc3d6193d",
  measurementId: "G-0YVMYTEKT8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const storage = getStorage(app);
export const storageRef = ref(storage, 'some-child');


