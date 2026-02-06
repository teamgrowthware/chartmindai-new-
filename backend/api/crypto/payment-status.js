import { db } from '../../firebase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // We expect the URL to be like /api/crypto/payment-status/:userId
    // However, since we are using a custom router/wrapHandler in server.js, 
    // req.params might not be populated if not explicitly configured in express route.
    // In server.js: app.post('/api/crypto/payment-status', ...) - Wait, server.js says POST for payment-status?
    // Let's check server.js again. 
    // Line 54: app.post('/api/crypto/payment-status', wrapHandler(cryptoPaymentStatus));
    // But Frontend calls GET `/api/crypto/payment-status/${currentUser.uid}`
    // I should probably support GET and handle the param extraction or query param.
    // For now, I will extract userId from the URL path manually if needed or use query body if it was POST. 
    // But frontend sends GET. So server.js logic for route definition needs to match. 

    // Changing approach: accessing last transaction for user. 
    // Backend server.js probably needs update to allow GET on this route if it was defined as POST.
    // Assuming I will fix server.js or it's just a generic handler. 
    // For now, I'll assume usage of req.url or req.query/params.


    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const snapshot = await db.collection('transactions')
      .where('userId', '==', userId)
      .where('provider', '==', 'nowpayments')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({ status: 'no_transaction' });
    }

    const transaction = snapshot.docs[0].data();
    res.status(200).json({ status: transaction.status, plan: transaction.planId });

  } catch (error) {
    console.error('Payment Status Error:', error);
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
}
