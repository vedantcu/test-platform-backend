import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjb4SQq6V6x3x06ol5d5pUaw1X6ZX5s_s",
  authDomain: "test-jee-cet.firebaseapp.com",
  projectId: "test-jee-cet",
  storageBucket: "test-jee-cet.firebasestorage.app",
  messagingSenderId: "667783036518",
  appId: "1:667783036518:web:6d8fea05e7e741407537a7",
  measurementId: "G-J4Y5SN9XR6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
