// src/firebase.js
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'; 

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
