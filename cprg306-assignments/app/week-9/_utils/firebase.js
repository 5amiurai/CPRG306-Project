
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";
 

const firebaseConfig = {
  apiKey: "AIzaSyAB4GSwZtVHVH-jdf1hqsTaCEoVbhZH7KI",
  authDomain: "cprg306-assignments-5f5ba.firebaseapp.com",
  projectId: "cprg306-assignments-5f5ba",
  storageBucket: "cprg306-assignments-5f5ba.firebasestorage.app",
  messagingSenderId: "893041366447",
  appId: "1:893041366447:web:1933f7916ef079b9160b5a"
};
 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
