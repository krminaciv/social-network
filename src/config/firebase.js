import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBy2AtvCPMZs2lHXRCbWDZ6rKFu12_P-CE",
  authDomain: "neophile-project.firebaseapp.com",
  projectId: "neophile-project",
  storageBucket: "neophile-project.appspot.com",
  messagingSenderId: "62920373850",
  appId: "1:62920373850:web:608f0ce6084959594b4a63"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app)