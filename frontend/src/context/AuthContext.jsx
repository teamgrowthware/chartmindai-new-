import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../config/firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
      subscriptionStatus: 'inactive',
      subscriptionPlan: null,
      subscriptionEndDate: null,
      trialEndDate: null,
      isAdmin: false
    })

    return userCredential
  }

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider)
  }

  async function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data())
          } else {
            // Create user document if it doesn't exist (for Google sign-in)
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              createdAt: new Date().toISOString(),
              subscriptionStatus: 'inactive',
              subscriptionPlan: null,
              subscriptionEndDate: null,
              trialEndDate: null,
              isAdmin: false
            })
            setUserData({
              email: user.email,
              subscriptionStatus: 'inactive'
            })
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to basic user data if Firestore fails
          setUserData({ id: user.uid, email: user.email });
        }
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    // Safety timeout: If Firebase auth takes too long (e.g. network issues), allow app to load
    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 4000)

    return () => {
      unsubscribe()
      clearTimeout(timeoutId)
    }
  }, [])

  const value = {
    currentUser,
    userData,
    signup,
    login,
    loginWithGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

