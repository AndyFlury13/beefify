// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC08OJwxIqweO1K9BkaKbK1u_Fb_5eZKic",
  authDomain: "beefify-ee540.firebaseapp.com",
  projectId: "beefify-ee540",
  storageBucket: "beefify-ee540.firebasestorage.app",
  messagingSenderId: "455730653740",
  appId: "1:455730653740:web:2b8f5d06f4c2470da1bf89",
  measurementId: "G-K6711JVLR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);