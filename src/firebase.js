import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN7Bi0ofzL0t-bOu4zVs8KOMzXHVqo2ho",
  authDomain: "chat-7e7a5.firebaseapp.com",
  projectId: "chat-7e7a5",
  storageBucket: "chat-7e7a5.appspot.com",
  messagingSenderId: "539382006721",
  appId: "1:539382006721:web:bfa93675efc89c67dd6540"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export { auth, db, provider }