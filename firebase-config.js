import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBshmZsNKl4RgoZQpf2aLXRKIw0f99YBvk",
  authDomain: "fir-crud-ebfc9.firebaseapp.com",
  projectId: "fir-crud-ebfc9",
  storageBucket: "fir-crud-ebfc9.appspot.com",
  messagingSenderId: "846821377083",
  appId: "1:846821377083:web:3a9fe46414bee7ba02881e",
  measurementId: "G-8L4HY157R3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
