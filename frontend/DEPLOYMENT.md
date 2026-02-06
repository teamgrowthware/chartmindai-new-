# Deployment Guide

## Prerequisites

1. Firebase project with Firestore and Authentication enabled
2. Stripe account with API keys
3. Razorpay account (for Indian payments)
4. Crypto payment provider account (Coinbase Commerce or NOWPayments)
5. Vercel account
6. Domain name (optional)

## Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google (optional)
4. Enable Firestore:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)
5. Get your Firebase config from Project Settings > General > Your apps

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 2: Environment Variables

Create a `.env` file in the root directory with all required variables (see `.env.example`).

For Vercel deployment, add these in Vercel Dashboard > Settings > Environment Variables.

## Step 3: Payment Provider Setup

### Stripe
1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Set up webhook endpoint: `https://your-domain.com/api/stripe/webhook`
3. Add webhook secret to environment variables

### Razorpay
1. Get API keys from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)
2. Set up webhook endpoint: `https://your-domain.com/api/razorpay/webhook`
3. Add webhook secret to environment variables

### Crypto Payments
1. Set up Coinbase Commerce or NOWPayments account
2. Get API keys
3. Configure webhook endpoints

## Step 4: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

4. Add all environment variables in Vercel Dashboard

5. Configure custom domain (optional):
   - Go to Vercel Dashboard > Settings > Domains
   - Add your domain
   - Update DNS records as instructed

## Step 5: Backend API Setup

The webhook handlers are in the `api/` directory. These will automatically be deployed as serverless functions on Vercel.

For local development, you'll need to set up a local backend or use a service like Render for the payment processing endpoints.

## Step 6: Update API URLs

Update the following in your environment variables:
- `VITE_ANALYZER_API_URL`: Your public candlestick API endpoint
- `VITE_FULL_ANALYZER_URL`: Your full analyzer app URL

## Step 7: Admin Access

To grant admin access to a user:
1. Go to Firestore
2. Find the user document
3. Set `isAdmin: true`

## Testing

1. Test free demo on homepage
2. Test signup/login flow
3. Test subscription with test payment methods
4. Test admin panel access
5. Verify webhooks are receiving events

## Troubleshooting

- **Webhooks not working**: Check webhook URLs in payment provider dashboards
- **Firebase errors**: Verify security rules and API keys
- **Payment failures**: Check API keys and webhook configurations
- **CORS issues**: Verify Vercel configuration

