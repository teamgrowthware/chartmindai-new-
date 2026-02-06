import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
   apiKey: "AIzaSyDqVjhCcdPfBm_toqV8CZV7vIACVzPzfHo",
  authDomain: "tradeweb-b09d1.firebaseapp.com",
  projectId: "tradeweb-b09d1",
  storageBucket: "tradeweb-b09d1.firebasestorage.app",
  messagingSenderId: "1044436482152",
  appId: "1:1044436482152:web:7883a3af689707643a63dd",
  measurementId: "G-0NEM6ZVQLX"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

