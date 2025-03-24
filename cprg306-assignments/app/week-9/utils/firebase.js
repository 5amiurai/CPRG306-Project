// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB4GSwZtVHVH-jdf1hqsTaCEoVbhZH7KI",
  authDomain: "cprg306-assignments-5f5ba.firebaseapp.com",
  projectId: "cprg306-assignments-5f5ba",
  storageBucket: "cprg306-assignments-5f5ba.firebasestorage.app",
  messagingSenderId: "893041366447",
  appId: "1:893041366447:web:1933f7916ef079b9160b5a"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig) ;
export const auth = getAuth(app);