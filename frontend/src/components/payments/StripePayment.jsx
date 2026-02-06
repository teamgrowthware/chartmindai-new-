import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useAuth } from '../../context/AuthContext'
import { useSubscription } from '../../context/SubscriptionContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function StripeCheckoutForm({ plan, trial, onSuccess, onCancel }) {
  const stripe = useStripe()
  const elements = useElements()
  const { currentUser } = useAuth()
  const { updateSubscription } = useSubscription()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)

    try {
      // Create payment intent on your backend
      const response = await axios.post('/api/stripe/create-payment-intent', {
        amount: plan.price * 100, // Convert to cents
        currency: 'inr',
        planId: plan.id,
        userId: currentUser.uid,
        trial: trial
      })

      const { clientSecret } = response.data

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: currentUser.email,
          },
        },
      })

      if (error) {
        toast.error(error.message)
        setLoading(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        // Update subscription in Firestore
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
      console.error('Payment error:', error)
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="glass-effect rounded-xl p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#fff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay ₹${plan.price}`}
        </button>
      </div>
    </form>
  )
}

export default function StripePayment({ plan, trial, onSuccess, onCancel }) {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm
        plan={plan}
        trial={trial}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  )
}

