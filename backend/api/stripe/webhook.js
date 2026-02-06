// Stripe webhook handler for Vercel serverless
// This should be deployed as a serverless function
import Stripe from 'stripe';
import admin from 'firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      // Update user subscription in Firestore
      await updateUserSubscription(paymentIntent.metadata.userId, {
        status: paymentIntent.metadata.trial === 'true' ? 'trial' : 'active',
        plan: paymentIntent.metadata.planId,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        trialEndDate: paymentIntent.metadata.trial === 'true'
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          : null
      })
      break

    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      const subscription = event.data.object
      await updateUserSubscription(subscription.metadata.userId, {
        status: 'inactive'
      })
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
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

