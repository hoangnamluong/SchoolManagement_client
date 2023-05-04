// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXly76pKHrmpVLOrWSjpfZ8lAmgxLRbjc",
  authDomain: "school-management-a7718.firebaseapp.com",
  projectId: "school-management-a7718",
  storageBucket: "school-management-a7718.appspot.com",
  messagingSenderId: "341549331511",
  appId: "1:341549331511:web:3e0a12e76137b73cfbbbb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
