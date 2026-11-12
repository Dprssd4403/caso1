
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDkNGJYv2VXc8sIPQLt8UXnrtz3dC9Fyy4",
  authDomain: "cinemet-f27f4.firebaseapp.com",
  databaseURL: "https://cinemet-f27f4-default-rtdb.firebaseio.com",
  projectId: "cinemet-f27f4",
  storageBucket: "cinemet-f27f4.firebasestorage.app",
  messagingSenderId: "1048678794448",
  appId: "1:1048678794448:web:78d1d31e1929a8b9750ad5"
};


const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);