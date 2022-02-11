// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxQ9S_gNfOjPbrEq72A2BJ3NmKpKyK1gQ",
  authDomain: "blog-app-project-e5c5c.firebaseapp.com",
  projectId: "blog-app-project-e5c5c",
  storageBucket: "blog-app-project-e5c5c.appspot.com",
  messagingSenderId: "117376566653",
  appId: "1:117376566653:web:adf73b92de669375fb3814"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();