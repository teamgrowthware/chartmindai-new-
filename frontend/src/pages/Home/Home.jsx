import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import WhyChooseUs from './Component/WhyChosseUs'
import CoreFeature from './Component/CoreFeature'
import FAQ from './Component/FAQ'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'
import { LineChart, Users, Gift, Palette } from "lucide-react";


/* ---------- Floating particles ---------- */
const FloatingParticles = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200
  const height = typeof window !== 'undefined' ? window.innerHeight : 800

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{
            x: Math.random() * width,
            y: Math.random() * height,
            opacity: 0.2
          }}
          animate={{
            x: Math.random() * width,
            y: Math.random() * height,
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

/* ---------- Demo section ---------- */
const DemoSection = () => (
  <section className="py-2 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
      </motion.div>
    </div>
  </section>
)

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const { currentUser } = useAuth()

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

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .glass-effect {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .mesh-gradient {
          background:
            radial-gradient(at 27% 37%, hsla(215,98%,61%,0.2) 0px, transparent 50%),
            radial-gradient(at 97% 21%, hsla(125,98%,72%,0.15) 0px, transparent 50%),
            radial-gradient(at 52% 99%, hsla(354,98%,61%,0.2) 0px, transparent 50%),
            radial-gradient(at 10% 29%, hsla(256,96%,67%,0.2) 0px, transparent 50%);
        }
      `}</style>

      <FloatingParticles />

      {/* ---------- HERO ---------- */}
      <section className="relative flex items-center justify-center px-4 pb-4 pt-20 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        {/* Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />

        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6">
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-medium">
              Next Generation Trading Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-black mb-4 leading-tight"
          >
            The Future of{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Advanced Trading
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-sm md:text-md text-gray-400 mb-6 max-w-4xl mx-auto leading-relaxed">
            Our all-in-one trading platform offers real-time charts, advanced analytics, and fully customizable widgets – built for traders of all levels.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap gap-4 justify-center">
            <Link to="/chartAnalyis">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-2 bg-purple-700 text-white rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition-all"
              >
                Live Demo
              </motion.button>

            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- Dashboard Preview ---------- */}
      <section className="py-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl transform scale-95" />

            <div className="glass-effect rounded-3xl p-8 md:p-16 relative overflow-hidden">
              <motion.div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)' }} animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />

              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8">
                    <h2 className="text-3xl md:text-5xl font-black mb-2 leading-tight">
                      Welcome to{' '}
                      <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">AI Trade Analyzer!</span>{' '}

                    </h2>
                    <p className="text-gray-400 text-md mb-8 leading-relaxed">Your personalized trading dashboard. Access all your tools and data in one place.</p>
                    {/* <Link to="/pricing"> */}
                    {!currentUser && (
                      <Link to="/login">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold shadow-lg shadow-blue-500/50">
                          Get Started →
                        </motion.button>
                      </Link>
                    )}
                  </motion.div>

                  {/* ----- UPDATED: Lucide Icons Instead of Emojis ----- */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: 'Trading Terminal', desc: 'Access to all the essential tools.', icon: LineChart },
                      { title: 'Community Hub', desc: 'Join discussions & follow top traders.', icon: Users },
                      { title: 'Rewards Center', desc: 'Claim rewards & participate in challenges.', icon: Gift },
                      { title: 'Customize UI', desc: 'Choose skins, themes & widgets.', icon: Palette }
                    ].map((item, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }} whileHover={{ scale: 1.05, y: -5 }} className="glass-effect rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer group">

                        <item.icon className="w-8 h-8 mb-3 text-blue-400 group-hover:scale-110 transition-transform" />

                        <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full h-64 md:h-96 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">Trading Dashboard</div>
                      <div className="text-sm text-gray-400">Preview of charts, widgets & market data</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Free Demo ---------- */}
      <DemoSection />

      {/* ---------- Core Features ---------- */}
      <CoreFeature />

      {/* ---------- Why Choose ---------- */}
      <WhyChooseUs />

      {/* ---------- How It Works ---------- */}
      <section id="how-it-works" className="py-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Get Started in{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">3 Simple Steps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-4">
            {steps.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2, duration: 0.6 }} whileHover={{ y: -10 }} className="glass-effect rounded-2xl p-10 text-center relative group">
                <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.6 }} className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-black mb-6 mx-auto shadow-xl group-hover:shadow-blue-500/50">
                  {step.number}
                </motion.div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-gray-400 text-md leading-relaxed">{step.description}</p>
                {idx < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <FAQ />
      <Footer />
    </div>
  )
}
