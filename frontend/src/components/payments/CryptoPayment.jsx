import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSubscription } from '../../context/SubscriptionContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { BaseUrl } from '../../config/BaseUrl'

export default function CryptoPayment({ plan, trial, onSuccess, onCancel }) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { updateSubscription } = useSubscription()
  const [paymentUrl, setPaymentUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize payment when component mounts
    initializePayment()
  }, [])

  const initializePayment = async () => {
    if (!currentUser) {
      toast.error('Please log in to continue')
      navigate('/login')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${BaseUrl}/api/crypto/create-payment`, {
        amount: plan.price,
        currency: 'USD',
        planId: plan.paymentId || plan.id,
        userId: currentUser.uid,
        trial: trial
      })

      setPaymentUrl(response.data.paymentUrl)
    } catch (error) {
      console.error('Payment initialization error:', error)
      const errorMsg = error.response?.data?.error || error.message || 'Unknown error'
      alert(`Payment Error: ${errorMsg}`)
      toast.error(`Failed to initialize payment: ${errorMsg}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank')

      // Poll for payment status (in production, use webhooks)
      const checkInterval = setInterval(async () => {
        try {
          const response = await axios.get(`${BaseUrl}/api/crypto/payment-status/${currentUser.uid}`)

          if (response.data.status === 'completed') {
            clearInterval(checkInterval)

            // Update subscription
            const endDate = new Date()
            endDate.setMonth(endDate.getMonth() + 1)

            const trialEndDate = trial ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null

            await updateSubscription({
              status: trial ? 'trial' : 'active',
              plan: plan.name,
              endDate: endDate.toISOString(),
              trialEndDate: trialEndDate?.toISOString()
            })

            toast.success('Payment successful!')
            onSuccess()
          }
        } catch (error) {
          console.error('Status check error:', error)
        }
      }, 5000) // Check every 5 seconds

      // Stop checking after 10 minutes
      setTimeout(() => clearInterval(checkInterval), 600000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6 text-center">
        <div className="text-4xl mb-4">₿</div>
        <h3 className="text-xl font-semibold mb-2">Crypto Payment</h3>
        <p className="text-gray-400 mb-4">
          Pay with Bitcoin, Ethereum, or other cryptocurrencies
        </p>
        <div className="text-2xl font-bold">
          ${plan.price} USD
        </div>
        <p className="text-sm text-gray-500 mt-2">
          (Approx. ₹{(plan.price * 83).toFixed(2)})
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Initializing payment...</p>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={!paymentUrl}
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay with Crypto
          </button>
        </div>
      )}
    </div>
  )
}

