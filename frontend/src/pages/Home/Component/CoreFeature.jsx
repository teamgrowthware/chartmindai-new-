import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChartColumnBig,Palette,Bot,Gamepad2,Sparkles,Lock } from "lucide-react"
export default function CoreFeature() {
 
  const features = [
    {
      icon: <ChartColumnBig size={40} color="white" />,
      title: 'Advanced Trading Terminal',
      description: 'Real-time charts, multi-exchange support & smart order execution.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette size={40} color="white" />,
      title: 'Customizable Widgets',
      description: 'Drag & drop your favourite tools, from social feeds to analytical feeds.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Bot size={40} color="white" />,
      title: 'AI-Powered Analytics',
      description: 'Make informed decisions with powerful insights.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Gamepad2 size={40} color="white" />,
      title: 'Gamified Trading',
      description: 'Earn rewards, climb leaderboards & unlock exclusive perks.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Sparkles size={32} color="gold" />,
      title: 'Personalized Skins',
      description: 'Trade with style using custom skins & themes.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: <Lock size={72} color="#2931a3" />,
      title: 'Secure & Fast Transactions',
      description: 'Bank-level security with instant deposits & withdrawals.',
      gradient: 'from-indigo-500 to-blue-500'
    }
  ]


  return (
    <section id="features" className="py-2 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Core Features</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to trade like a professional</p>
            </motion.div>
  
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.6 }} whileHover={{ y: -10, transition: { duration: 0.2 } }} className="glass-effect rounded-2xl p-8 hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden">
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, rgba(59,130,246,0.06), transparent)` }} />
                  <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }} className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg relative z-10`}>
                    {feature.icon}
                  </motion.div>
  
                  <h3 className="text-2xl font-bold mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed relative z-10">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  )
}
