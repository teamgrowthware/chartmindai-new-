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
import transactionsHandler from './api/transactions.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Raw body parser for webhooks
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

app.post('/api/crypto/create-payment', wrapHandler(cryptoCreatePayment));
app.get('/api/crypto/payment-status/:userId', wrapHandler(cryptoPaymentStatus));
app.all('/api/crypto/webhook', wrapHandler(cryptoWebhook));

app.get('/api/transactions/:userId', wrapHandler(transactionsHandler));

// Health check
app.get('/', (req, res) => {
  res.send('API Backend Runnning');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


