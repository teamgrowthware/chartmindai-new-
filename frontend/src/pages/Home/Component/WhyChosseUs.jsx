import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function WhyChooseUs() {
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

  return (
    <div className="">
      {/* ---------- Why Choose ---------- */}
      <section id="why-choose" className="py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black mb-2">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">?</span>
            </h2>
            <p className="text-md text-gray-400 max-w-3xl mx-auto">AI Trade Analyzer offers secure, hassle-free trading with the best rates and instant processing.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2, duration: 0.6 }} whileHover={{ scale: 1.05 }} className="glass-effect rounded-2xl p-8 group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }} className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
