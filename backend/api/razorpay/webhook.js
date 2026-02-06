// Razorpay webhook handler for Vercel serverless

import crypto from 'crypto';
import admin from 'firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  const signature = req.headers['x-razorpay-signature']

  // Verify webhook signature
  const shasum = crypto.createHmac('sha256', webhookSecret)
  shasum.update(JSON.stringify(req.body))
  const digest = shasum.digest('hex')

  if (digest !== signature) {
    return res.status(400).json({ error: 'Invalid signature' })
  }

  const event = req.body.event
  const payload = req.body.payload

  switch (event) {
    case 'payment.captured':
      // Update user subscription
      await updateUserSubscription(payload.payment.entity.notes.userId, {
        status: payload.payment.entity.notes.trial === 'true' ? 'trial' : 'active',
        plan: payload.payment.entity.notes.planId,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        trialEndDate: payload.payment.entity.notes.trial === 'true'
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          : null
      })
      break

    case 'payment.failed':
      console.error('Payment failed:', payload.payment.entity)
      break

    default:
      console.log(`Unhandled event: ${event}`)
  }

  res.json({ received: true })
}

async function updateUserSubscription(userId, subscriptionData) {
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
  await db.collection('users').doc(userId).update({
    ...subscriptionData,
    updatedAt: new Date().toISOString()
  })
}

