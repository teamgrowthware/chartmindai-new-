import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useSubscription } from '../../context/SubscriptionContext'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function RazorpayPayment({ plan, trial, onSuccess, onCancel }) {
  const { currentUser } = useAuth()
  const { updateSubscription } = useSubscription()

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    try {
      // Create order on your backend
      const response = await axios.post('/api/razorpay/create-order', {
        amount: plan.price * 100, // Convert to paise
        currency: 'INR',
        planId: plan.id,
        userId: currentUser.uid,
        trial: trial
      })

      const { orderId, amount, currency } = response.data

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Tradorr',
        description: `${plan.name} Subscription`,
        order_id: orderId,
        handler: async function (paymentResponse) {
          try {
            // Verify payment on backend
            await axios.post('/api/razorpay/verify-payment', {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              userId: currentUser.uid,
              planId: plan.id
            })

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
          } catch (error) {
            console.error('Payment verification error:', error)
            toast.error('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          email: currentUser.email,
        },
        theme: {
          color: '#3b82f6',
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      toast.error(error.response?.data?.message || 'Failed to initiate payment. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6 text-center">
        <div className="text-4xl mb-4">📱</div>
        <h3 className="text-xl font-semibold mb-2">UPI Payment (Razorpay)</h3>
        <p className="text-gray-400 mb-4">
          You'll be redirected to Razorpay to complete your payment
        </p>
        <div className="text-2xl font-bold">
          ₹{plan.price}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onCancel}
          className="flex-1 py-3 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handlePayment}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  )
}

