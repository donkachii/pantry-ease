// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLkHmAlW63RSbSayQElKNMPFbN7CnWQ0U",
  authDomain: "pantry-ease-app.firebaseapp.com",
  projectId: "pantry-ease-app",
  storageBucket: "pantry-ease-app.appspot.com",
  messagingSenderId: "252650989858",
  appId: "1:252650989858:web:88f3769caa55fe6a58dd7b",
  measurementId: "G-VPYLB7V3NQ",
};

// Initialize Firebase
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const firestore = getFirestore(firebaseApp);
export { firestore };

export const firebaseAuth = getAuth(firebaseApp);
