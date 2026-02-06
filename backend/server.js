import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import handlers
import cryptoCreatePayment from './api/crypto/create-payment.js';
import cryptoPaymentStatus from './api/crypto/payment-status.js';
import cryptoWebhook from './api/crypto/webhook.js';

import razorpayCreateOrder from './api/razorpay/create-order.js';
import razorpayVerifyPayment from './api/razorpay/verify-payment.js';
import razorpayWebhook from './api/razorpay/webhook.js';

import stripeCreatePaymentIntent from './api/stripe/create-payment-intent.js';
import stripeWebhook from './api/stripe/webhook.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Raw body parser for webhooks
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use('/api/razorpay/webhook', express.raw({ type: 'application/json' }));
app.use('/api/crypto/webhook', express.raw({ type: 'application/json' }));

// Json parser for other routes
app.use((req, res, next) => {
  if (req.originalUrl.includes('/webhook')) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Helper to wrap Vercel-style handlers for Express
const wrapHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Route error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Routes
app.post('/api/crypto/create-payment', wrapHandler(cryptoCreatePayment));
app.post('/api/crypto/payment-status', wrapHandler(cryptoPaymentStatus));
app.all('/api/crypto/webhook', wrapHandler(cryptoWebhook));

app.post('/api/razorpay/create-order', wrapHandler(razorpayCreateOrder));
app.post('/api/razorpay/verify-payment', wrapHandler(razorpayVerifyPayment));
app.all('/api/razorpay/webhook', wrapHandler(razorpayWebhook));

app.post('/api/stripe/create-payment-intent', wrapHandler(stripeCreatePaymentIntent));
app.all('/api/stripe/webhook', wrapHandler(stripeWebhook));

// Health check
app.get('/', (req, res) => {
  res.send('API Backend Runnning');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
