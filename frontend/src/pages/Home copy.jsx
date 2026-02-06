import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import DemoSection from '../components/DemoSection'
import { useState } from 'react'

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)

  const features = [
    {
      icon:'',
      title: 'Advanced Trading Terminal',
      description: 'Real-time charts, multi-exchange support & smart order execution.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon:'',
      title: 'Customizable Widgets',
      description: 'Drag & drop your favourite tools, from social feeds to analytical feeds.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon:'',
      title: 'AI-Powered Analytics',
      description: 'Make informed decisions with powerful insights.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '',
      title: 'Gamified Trading',
      description: 'Earn rewards, climb leaderboards & unlock exclusive perks.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon:'',
      title: 'Personalized Skins',
      description: 'Trade with style using custom skins & themes.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon:'',
      title: 'Secure & Fast Transactions',
      description: 'Bank-level security with instant deposits & withdrawals.',
      gradient: 'from-indigo-500 to-blue-500'
    }
  ]

  const whyChoose = [
    {
      title: 'All-In-One Trading Hub',
      description: 'No more switching tabs – everything in one place.'
    },
    {
      title: 'Flexible & Personalized',
      description: 'Tailor your setup to match your trading style.'
    },
    {
      title: 'Trade to Earn',
      description: 'Get rewarded for every trade you make.'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Sign Up',
      description: 'Create your free account in seconds.'
    },
    {
      number: '2',
      title: 'Customize Your Dashboard',
      description: 'Set up your ideal trading environment.'
    },
    {
      number: '3',
      title: 'Trade, Earn & Compete!',
      description: 'Make informed decisions with powerful insights.'
    }
  ]

  const faqs = [
    {
      question: 'What is AI Trade Analyzer?',
      answer: 'AI Trade Analyzer is an all-in-one advanced trading platform that offers real-time charts, AI-powered analytics, customizable widgets, and gamified trading features. It\'s designed for traders of all levels who want a comprehensive trading solution in one place.'
    },
    {
      question: 'How does AI Trade Analyzer\'s widget system work?',
      answer: 'AI Trade Analyzer\'s widget system allows you to drag and drop various trading tools and feeds onto your dashboard. You can customize your workspace with social feeds, analytical tools, charts, and more, all arranged exactly how you want them.'
    },
    {
      question: 'Can I earn rewards while trading?',
      answer: 'Yes! AI Trade Analyzer features a gamified trading system where you can earn rewards, climb leaderboards, and unlock exclusive perks based on your trading activity and achievements.'
    },
    {
      question: 'Is AI Trade Analyzer secure?',
      answer: 'Absolutely. AI Trade Analyzer uses bank-level security measures to protect your data and transactions. We implement industry-standard encryption and security protocols to ensure your information is safe.'
    },
    {
      question: 'How do I get started?',
      answer: 'Getting started is easy! Simply sign up for a free account, customize your dashboard, and start trading. You can try our free demo to experience the platform before subscribing.'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            The Future of{' '}
            <span className="gradient-text">Advanced Trading</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Our all-in-one trading platform offers real-time charts, advanced analytics, and fully customizable widgets – built for traders of all levels.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/pricing"
              className="inline-block px-8 py-4 bg-white text-dark-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8 md:p-12 transform rotate-1 hover:rotate-0 transition-transform"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  Welcome to <span className="gradient-text">AI Trade Analyzer!</span> 
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Your personalized trading dashboard. Access all your tools and data in one place.
                </p>

                {/* <Link
                  to="/pricing"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Get Started
                </Link> */}
                

                <Link
          to="/login"
          className="text-gray-300 hover:text-white text-sm font-medium"
        >
           Get Started
        </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Trading Terminal', desc: 'Access to all the essential tools.' },
                  { title: 'Community Hub', desc: 'Join discussions & follow top traders.' },
                  { title: 'Rewards Center', desc: 'Claim rewards & participate in challenges.' },
                  { title: 'Customize UI', desc: 'Choose skins, themes & widgets.' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-effect rounded-xl p-4"
                  >
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Demo Section */}
      <DemoSection />

      {/* Core Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Core Features
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AI Trade Analyzer */}
      <section id="why-choose" className="py-20 px-4 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-8"
          >
            Why Choose AI Trade Analyzer?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            AI Trade Analyzer offers secure, hassle-free trading with the best rates and instant processing.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                    {/* <FiCheck className="text-white" /> */}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Get Started in 3 Simple Steps
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass-effect rounded-xl p-8 text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-2xl font-bold mb-6">
              Join the Future of Trading - Be a AI Trade Analyzer Today!
            </p>
            <Link
              to="/pricing"
              className="inline-block px-8 py-4 bg-white text-dark-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-dark-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-12"
          >
            Get answers to your questions and learn about our platform.
          </motion.p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {/* <FiArrowRight
                    className={`transform transition-transform ${openFaq === idx ? 'rotate-90' : ''}`}
                  /> */}
                </button>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 py-4 text-gray-300 border-t border-white/10"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Trade Smarter?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Sign up today & get early access to exclusive trading features, skins, and rewards.
            </p>
            <Link
              to="/pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Start Trading For Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

