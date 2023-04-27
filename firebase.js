// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { doc, addDoc, getDoc, setDoc, getDocs, getCount, getFirestore, collection } from 'firebase/firestore/lite'
import { getAuth, updatePassword, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, beforeAuthStateChanged, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Ovdje ubacite svoj config
const firebaseConfig = {
  apiKey: "AIzaSyB7QJUZV0_5jKkM50ECX4AX6cb14ZwbPBc",
  authDomain: "animal-shelter-pi-2223.firebaseapp.com",
  projectId: "animal-shelter-pi-2223",
  storageBucket: "animal-shelter-pi-2223.appspot.com",
  messagingSenderId: "46524683192",
  appId: "1:46524683192:web:ddaab757ab8afb1ebb354d",
  measurementId: "G-4LYD71Z86E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage,
  getAuth,
	db,
  doc,
  getDoc,
	setDoc,
  addDoc,
	createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  updatePassword

}