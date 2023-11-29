import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDJJeYhZJOEXnxTLKEUkLK-taWTc4FXIAc",
  authDomain: "gossipiapp.firebaseapp.com",
  projectId: "gossipiapp",
  storageBucket: "gossipiapp.appspot.com",
  messagingSenderId: "28711067568",
  appId: "1:28711067568:web:2a2bd709fd869b1f028075",
  measurementId: "G-9W3SXJVHV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export {storage,auth};