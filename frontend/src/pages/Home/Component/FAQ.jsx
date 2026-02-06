import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function FAQ() {
   const [openFaq, setOpenFaq] = useState(-1)
 
  const faqs = [
    {
      question: 'What is AI Trade Analyzer?',
      answer:
        "AI Trade Analyzer is an all-in-one advanced trading platform that offers real-time charts, AI-powered analytics, customizable widgets, and gamified trading features. It's designed for traders of all levels who want a comprehensive trading solution in one place."
    },
    {
      question: "How does AI Trade Analyzer's widget system work?",
      answer:
        "AI Trade Analyzer's widget system allows you to drag and drop various trading tools and feeds onto your dashboard. You can customize your workspace with social feeds, analytical tools, charts, and more, all arranged exactly how you want them."
    },
    {
      question: 'Can I earn rewards while trading?',
      answer:
        'Yes! AI Trade Analyzer features a gamified trading system where you can earn rewards, climb leaderboards, and unlock exclusive perks based on your trading activity and achievements.'
    },
    {
      question: 'Is AI Trade Analyzer secure?',
      answer:
        'Absolutely. AI Trade Analyzer uses bank-level security measures to protect your data and transactions. We implement industry-standard encryption and security protocols to ensure your information is safe.'
    },
    {
      question: 'How do I get started?',
      answer:
        'Getting started is easy! Simply sign up for a free account, customize your dashboard, and start trading. You can try our free demo to experience the platform before subscribing.'
    }
  ]

  return (
     <section id="faq" className="py-2 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  Frequently Asked{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Questions</span>
                </h2>
                <p className="text-md text-gray-400">Get answers to your questions and learn about our platform.</p>
              </motion.div>
    
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className="glass-effect rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors"
                      type="button"
                    >
                      <span className="font-bold text-xl pr-8">{faq.question}</span>
                      <motion.svg animate={{ rotate: openFaq === idx ? 90 : 0 }} transition={{ duration: 0.3 }} className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </button>
    
                    <motion.div initial={false} animate={{ height: openFaq === idx ? 'auto' : 0, opacity: openFaq === idx ? 1 : 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
                      <div className="px-8 pb-6 text-gray-400 text-lg leading-relaxed border-t border-white/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  )
}
