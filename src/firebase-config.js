// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from "firebase/firestore";

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
//app.firestore().settings({ experimentalForceLongPolling: true });

export const db = initializeFirestore(app, {
  useFetchStreams: false,
});
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);