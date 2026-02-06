// Create Razorpay order endpoint

import Razorpay from 'razorpay';

// Razorpay client initialized in handler


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })

  try {
    const { amount, currency, planId, userId, trial } = req.body

    const options = {
      amount: amount, // amount in paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        planId: planId,
        userId: userId,
        trial: trial ? 'true' : 'false'
      }
    }

    const order = await razorpay.orders.create(options)

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    res.status(500).json({ error: error.message })
  }
}

