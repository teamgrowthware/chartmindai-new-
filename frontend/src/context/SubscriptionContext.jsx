import { createContext, useContext, useEffect, useState } from 'react'
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'

const SubscriptionContext = createContext()

export function useSubscription() {
  return useContext(SubscriptionContext)
}

export function SubscriptionProvider({ children }) {
  const { currentUser } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      setSubscription(null)
      setLoading(false)
      return
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', currentUser.uid),
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          const subscriptionData = {
            status: data.subscriptionStatus || 'inactive',
            plan: data.subscriptionPlan || null,
            endDate: data.subscriptionEndDate || null,
            trialEndDate: data.trialEndDate || null,
            isActive: false
          }

          // Check if subscription is active
          if (subscriptionData.status === 'active') {
            if (subscriptionData.endDate) {
              const endDate = new Date(subscriptionData.endDate)
              subscriptionData.isActive = endDate > new Date()
            } else {
              subscriptionData.isActive = true
            }
          }

          // Check if trial is active
          if (subscriptionData.trialEndDate) {
            const trialEnd = new Date(subscriptionData.trialEndDate)
            if (trialEnd > new Date() && subscriptionData.status === 'trial') {
              subscriptionData.isActive = true
            }
          }

          setSubscription(subscriptionData)
        }
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching subscription:', error)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [currentUser])

  const updateSubscription = async (subscriptionData) => {
    if (!currentUser) return

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        subscriptionStatus: subscriptionData.status,
        subscriptionPlan: subscriptionData.plan,
        subscriptionEndDate: subscriptionData.endDate,
        trialEndDate: subscriptionData.trialEndDate || null,
        updatedAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error updating subscription:', error)
      throw error
    }
  }

  const value = {
    subscription,
    updateSubscription,
    loading
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

