import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk6ldm_ooOIoHR7KeC2-Cnvs0dbDyPMG0",
  authDomain: "whatsapp-clone-c0983.firebaseapp.com",
  projectId: "whatsapp-clone-c0983",
  storageBucket: "whatsapp-clone-c0983.appspot.com",
  messagingSenderId: "1022834322262",
  appId: "1:1022834322262:web:26b81e2a4d37c0209404f7",
  measurementId: "G-0THS27YQT1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
