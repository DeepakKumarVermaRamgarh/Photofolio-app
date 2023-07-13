import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBou9PlqlUkiZFRTxXAzZEr88vMQ52yonw",
  authDomain: "photofolio-app-ea8c9.firebaseapp.com",
  projectId: "photofolio-app-ea8c9",
  storageBucket: "photofolio-app-ea8c9.appspot.com",
  messagingSenderId: "564498073053",
  appId: "1:564498073053:web:b1915e5c4f9bca8f7a2234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const collection_name = "photo_albums"