// Crypto payment webhook handler (Coinbase Commerce / NOWPayments)

import admin from 'firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify webhook signature based on your crypto payment provider
  const signature = req.headers['x-signature'] || req.headers['x-nowpayments-sig']

  // Verify signature logic here (varies by provider)

  const event = req.body

  switch (event.type || event.payment_status) {
    case 'charge:confirmed':
    case 'finished':
      // Payment confirmed
      await updateUserSubscription(event.metadata?.userId || event.invoice_id, {
        status: event.metadata?.trial === 'true' ? 'trial' : 'active',
        plan: event.metadata?.planId,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        trialEndDate: event.metadata?.trial === 'true'
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          : null
      })
      break

    case 'charge:failed':
      console.error('Crypto payment failed:', event)
      break

    default:
      console.log(`Unhandled event: ${event.type || event.payment_status}`)
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

