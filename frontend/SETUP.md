# Tradorr Setup Guide

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment Variables**
- Copy `.env.example` to `.env`
- Fill in all required API keys and configuration

3. **Run Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
trading-web/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── DemoSection.jsx
│   │   └── payments/     # Payment components
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Pricing.jsx
│   │   └── Admin.jsx
│   ├── context/         # React contexts
│   │   ├── AuthContext.jsx
│   │   └── SubscriptionContext.jsx
│   ├── config/          # Configuration files
│   │   └── firebase.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── api/                 # Serverless API functions
│   ├── stripe/
│   ├── razorpay/
│   └── crypto/
├── public/              # Static assets
└── package.json
```

## Features Implemented

✅ **Homepage**
- Modern landing page with animations
- Free demo section (3 analyses per day)
- Features showcase
- FAQ section
- Responsive design

✅ **Authentication**
- Email/Password signup and login
- Google OAuth (optional)
- Firebase Authentication integration

✅ **Dashboard**
- Subscription status display
- Quick access to full analyzer
- Account information

✅ **Pricing Page**
- 5 subscription plans
- Token-based pricing
- 7-day free trial option
- Multiple payment methods

✅ **Payment Integration**
- Stripe (Card payments)
- Razorpay (UPI - India)
- Crypto payments (Coinbase/NOWPayments)
- Webhook support for all providers

✅ **Admin Panel**
- User management
- Subscription status overview
- CSV export functionality
- Manual activation/deactivation

✅ **Animations & Transitions**
- Framer Motion animations
- Smooth page transitions
- Hover effects
- Loading states

## Environment Variables Required

See `.env.example` for the complete list. Key variables:

- Firebase configuration (6 variables)
- Stripe keys (3 variables)
- Razorpay keys (3 variables)
- Crypto payment keys (2 variables)
- API URLs (2 variables)

## Next Steps

1. **Configure Firebase**
   - Create Firebase project
   - Enable Authentication
   - Set up Firestore
   - Add security rules

2. **Set Up Payment Providers**
   - Create Stripe account
   - Create Razorpay account (if targeting India)
   - Set up crypto payment provider
   - Configure webhooks

3. **Deploy**
   - Deploy to Vercel
   - Configure environment variables
   - Set up custom domain (optional)
   - Test all payment flows

4. **Update API URLs**
   - Add your candlestick API URL
   - Add your full analyzer app URL

## Testing Checklist

- [ ] Free demo works (3 analyses limit)
- [ ] User signup/login works
- [ ] Google OAuth works (if enabled)
- [ ] Dashboard shows subscription status
- [ ] Pricing page displays all plans
- [ ] Stripe payment flow works
- [ ] Razorpay payment flow works
- [ ] Crypto payment flow works
- [ ] Webhooks update subscriptions
- [ ] Admin panel accessible
- [ ] CSV export works
- [ ] Mobile responsive design
- [ ] All animations work smoothly

## Support

For issues or questions, check:
- `DEPLOYMENT.md` for deployment instructions
- `README.md` for general information
- Firebase documentation for auth setup
- Payment provider docs for webhook configuration

