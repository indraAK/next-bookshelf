// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwvrtBhzg3BeWO_LYCoL_FaoqLEiYmwVc",
  authDomain: "bookshelf-app-86d84.firebaseapp.com",
  projectId: "bookshelf-app-86d84",
  storageBucket: "bookshelf-app-86d84.appspot.com",
  messagingSenderId: "369513781740",
  appId: "1:369513781740:web:e30ba77cc63107fd0748c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const timestamp = getFirestore;
