// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-app-8004a.firebaseapp.com",
  projectId: "mern-estate-app-8004a",
  storageBucket: "mern-estate-app-8004a.appspot.com",
  messagingSenderId: "833364827567",
  appId: "1:833364827567:web:08695862e07923a215a35a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);