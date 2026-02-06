import { useState } from 'react'
import { Check, Zap, Star, X } from 'lucide-react'
import axios from 'axios'
import { BaseUrl } from '../config/BaseUrl'
import CryptoPayment from '../components/payments/CryptoPayment'

const plans = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: 19,
    currency: '$',
    tokens: 30,
    bonus: 0,
    total: 30,
    features: [
      'New minimum entry point',
      'Feels premium, filters serious users',
      'Best for quick testing'
    ],
    popular: false
  },
  {
    id: 'trader',
    name: 'Trader Pack',
    price: 29,
    currency: '$',
    tokens: 70,
    bonus: 10,
    total: 80,
    features: [
      'Most users upgrade here',
      'Better value than starter',
      'Perfect for intraday traders'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: 49,
    currency: '$',
    tokens: 150,
    bonus: 30,
    total: 180,
    features: [
      'Extremely attractive',
      'High revenue',
      'Recommended pack for all traders'
    ],
    popular: true,
    badge: 'Best Seller'
  },
  {
    id: 'elite',
    name: 'Elite Pack',
    price: 79,
    currency: '$',
    tokens: 300,
    bonus: 70,
    total: 370,
    features: [
      'Designed for prop traders & heavy users',
      'Very profitable for you',
      'High-value high-commitment pack'
    ],
    popular: false
  },
  {
    id: 'ultimate',
    name: 'Ultimate Mega Pack',
    price: 129,
    currency: '$',
    tokens: 600,
    bonus: 150,
    total: 750,
    features: [
      'One-time large revenue',
      'For serious professional traders',
      'Perfect upsell on checkout'
    ],
    popular: false,
    badge: 'Lifetime'
  }
]

const tokenCosts = [
  { type: 'Basic Candlestick', tokens: 2 },
  { type: 'SMC / ICT / Pattern / Indicator', tokens: 5 }
]

export default function ModernPricing() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setPaymentMethod(null)
  }

  const handlePaymentSuccess = () => {
    setSelectedPlan(null)
    setPaymentMethod(null)
  }
  const handleSubscribe = async (provider) => {
    if (!selectedPlan) return;

    if (provider === 'crypto') {
      setPaymentMethod('crypto');
      return;
    }

    console.log(" window.location.origin", window.location.origin)
    try {
      const res = await axios.post(`${BaseUrl}/billing/subscribe`, {
        tier: selectedPlan.id,
        paymentProvider: provider,           // stripe / razorpay / crypto
        successUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin + "/cancel"
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      }
      );
      // If backend returns a payment URL:
      if (res.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        alert("Subscription started!");
      }

    } catch (err) {
      console.log("Subscription Error:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
              <Zap className="text-white w-4 h-4" />
              <span className="text-sm font-medium text-gray-400">Subscription Plans</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Choose Your Trading Pack
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Select the perfect plan for your trading needs. All plans include monthly subscription with 7-day free trial.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, idx) => (
              <div
                key={plan.id}
                className={`group relative flex flex-col h-full bg-white/[0.02] backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/[0.04] ${plan.popular
                  ? 'border-white/20 shadow-xl'
                  : 'border-white/10'
                  }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Badges */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full shadow-lg">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-bold">{plan.badge}</span>
                    </div>
                  </div>
                )}
                {plan.badge && !plan.popular && (
                  <div className="absolute -top-4 right-6">
                    <div className="bg-white text-black px-4 py-2 rounded-full shadow-lg">
                      <span className="text-xs font-bold">{plan.badge}</span>
                    </div>
                  </div>
                )}

                {/* Plan Content */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black text-white">
                        {plan.currency}{plan.price}
                      </span>
                      <span className="text-gray-500 text-lg font-medium">/month</span>
                    </div>
                  </div>

                  {/* Token Box */}
                  <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="relative">
                      <div className="text-sm text-gray-400 mb-2 font-medium">Tokens</div>
                      <div className="text-4xl font-black text-white mb-2">{plan.tokens}</div>
                      {plan.bonus > 0 && (
                        <div className="inline-flex items-center gap-1 bg-white/10 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                          <Zap className="w-3 h-3" />
                          +{plan.bonus} Bonus
                        </div>
                      )}
                      <div className="text-xl font-bold text-white mt-3">
                        Total: {plan.total} Tokens
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-white/10 rounded-full p-1">
                        <Check className="text-white w-4 h-4" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-4 rounded-xl font-bold text-lg mt-auto transition-all duration-300 ${plan.popular
                    ? 'bg-white text-black hover:bg-gray-200 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          {/* Token Costs */}
          {/* <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Token Cost Per Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {tokenCosts.map((cost, idx) => (
                <div
                  key={idx}
                  className="relative group bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center overflow-hidden hover:scale-105 transition-all duration-300 hover:bg-white/[0.05]"
                >
                  <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-gray-400 mb-3 font-medium">{cost.type}</div>
                    <div className="text-4xl font-black text-white">
                      {cost.tokens} Tokens
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => {
            setSelectedPlan(null)
            setPaymentMethod(null)
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-black border border-white/10 rounded-3xl p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedPlan(null)
                setPaymentMethod(null)
              }}
              className="absolute top-6 right-6 bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-4xl font-bold mb-2">{selectedPlan.name}</h2>
            <p className="text-gray-400 text-lg mb-8">
              {selectedPlan.currency}{selectedPlan.price}/month • {selectedPlan.total} Tokens
            </p>

            {!paymentMethod ? (
              <div>
                <h3 className="text-2xl font-bold mb-6">Choose Payment Method</h3>
                <div className="grid md:grid-cols-1 gap-4">
                  <button
                    onClick={() => handleSubscribe("crypto")}
                    className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all text-left flex items-center gap-6"
                  >
                    <div className="text-5xl group-hover:scale-110 transition-transform">₿</div>
                    <div>
                      <div className="font-bold text-lg mb-1">Crypto Payment</div>
                      <div className="text-sm text-gray-400">Coinbase/NOWPayments</div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 font-medium"
                >
                  <span>←</span>
                  <span>Back to payment methods</span>
                </button>
                {paymentMethod === 'crypto' ? (
                  <CryptoPayment
                    plan={selectedPlan}
                    trial={false}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setPaymentMethod(null)}
                  />
                ) : (
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                    <p className="text-center text-gray-400">
                      Payment processing for <span className="text-white font-bold">{paymentMethod}</span> would be integrated here
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx="true">{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}