// Verify Razorpay payment endpoint

import crypto from 'crypto';
import Razorpay from 'razorpay';
import admin from 'firebase-admin';

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, planId } = req.body

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex')

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' })
    }

    // Fetch payment details
    const payment = await razorpay.payments.fetch(razorpay_payment_id)

    if (payment.status === 'captured') {
      // Update user subscription in Firestore

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
          })
        })
      }

      const db = admin.firestore()
      const trial = payment.notes?.trial === 'true'

      await db.collection('users').doc(userId).update({
        subscriptionStatus: trial ? 'trial' : 'active',
        subscriptionPlan: planId,
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        trialEndDate: trial
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          : null,
        updatedAt: new Date().toISOString()
      })

      res.status(200).json({ success: true, payment })
    } else {
      res.status(400).json({ error: 'Payment not captured' })
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    res.status(500).json({ error: error.message })
  }
}

