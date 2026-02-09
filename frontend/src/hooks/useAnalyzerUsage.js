import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useAnalyzerUsage = () => {
  const { currentUser, userData } = useAuth();
  const [usageCount, setUsageCount] = useState(0);
  const [loadingUsage, setLoadingUsage] = useState(true);

  const isSubscribed = userData?.subscriptionStatus === 'active';

  useEffect(() => {
    const fetchUsageCount = async () => {
      setLoadingUsage(true);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUsageCount(data.analyzerUsageCount || 0);
          } else {
            setUsageCount(0);
          }
        } catch (err) {
          console.error("Error fetching usage count:", err);
        }
      } else {
        const stored = localStorage.getItem('chartAnalysisCount');
        if (stored) {
          setUsageCount(parseInt(stored, 10));
        } else {
          setUsageCount(0);
        }
      }
      setLoadingUsage(false);
    };

    fetchUsageCount();
  }, [currentUser]);

  const checkAndIncrement = async () => {
    if (isSubscribed) return true;

    if (usageCount >= 3) {
      return false;
    }

    const newCount = usageCount + 1;
    setUsageCount(newCount);

    try {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        // We use setDoc with merge to ensure document exists if it was deleted or never created
        await setDoc(userDocRef, { analyzerUsageCount: increment(1) }, { merge: true });
      } else {
        localStorage.setItem('chartAnalysisCount', newCount.toString());
      }
    } catch (error) {
      console.error("Error updating usage count:", error);
      // Ideally rollback state, but for this use case, letting it slide locally is okay-ish,
      // but we should probably rely on the assumption it worked.
    }

    return true;
  };

  return { usageCount, isSubscribed, checkAndIncrement, loadingUsage };
};
