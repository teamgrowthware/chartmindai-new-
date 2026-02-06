import axios from 'axios';
import { db } from '../../firebase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'USD', planId, userId, trial } = req.body;

    console.log('Create Payment Request:', req.body); // DEBUG LOG

    if (!amount || !planId || !userId) {
      console.log('Missing fields:', { amount, planId, userId }); // DEBUG LOG
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Determine valid callback URL (NOWPayments rejects localhost)
    let callbackUrl = `${process.env.VITE_ANALYZER_API_URL?.replace('/api/candlestick', '')}/api/crypto/webhook`;
    if (callbackUrl.includes('localhost')) {
      callbackUrl = 'https://chartmindai-new.onrender.com/api/crypto/webhook';
    }

    // Create invoice via NOWPayments
    console.log('Calling NOWPayments API...'); // DEBUG LOG
    const response = await axios.post(
      'https://api.nowpayments.io/v1/invoice',
      {
        price_amount: amount,
        price_currency: currency, // The currency of the price_amount
        ipn_callback_url: callbackUrl,
        order_description: `Subscription for ${planId} (${trial ? 'Trial' : 'Standard'})`,
        order_id: `${userId}_${Date.now()}`, // Unique order ID
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
      },
      {
        headers: {
          'x-api-key': process.env.NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('NOWPayments Success:', response.data); // DEBUG LOG
    const { id: invoiceId, invoice_url: paymentUrl } = response.data;

    // Save transaction to Firebase
    console.log(`Saving to Firebase: transactions/${invoiceId}`); // DEBUG LOG
    await db.collection('transactions').doc(invoiceId.toString()).set({
      userId,
      planId,
      amount,
      currency,
      status: 'pending', // pending, confirmed, failed
      provider: 'nowpayments',
      createdAt: new Date().toISOString(),
      invoiceId,
      trial: !!trial,
    });

    res.status(200).json({ paymentUrl, invoiceId });
  } catch (error) {
    console.error('Create Payment Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create payment invoice' });
  }
}
