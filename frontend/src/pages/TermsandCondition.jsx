import { motion } from 'framer-motion'
import { Shield, FileText, User, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'
import { Link } from "react-router-dom"

export default function TermsAndConditions() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: "By using AI Trade Analyzer, you agree to these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of the service immediately."
    },
    {
      icon: Shield,
      title: "2. Service Description",
      content: "AI Trade Analyzer provides automated chart analysis using AI. Results are for educational purposes only and not financial advice. We do not guarantee any trading outcomes or profits."
    },
    {
      icon: User,
      title: "3. User Responsibilities",
      points: [
        "You must not misuse the platform or attempt to disrupt its operation.",
        "You must provide accurate account information and keep it up to date.",
        "You agree not to reverse-engineer or copy the AI system.",
        "You are responsible for maintaining the confidentiality of your account credentials."
      ]
    },
    {
      icon: CreditCard,
      title: "4. Token & Subscription Use",
      points: [
        "Tokens are non-refundable once used.",
        "Subscription payments are handled by trusted third-party gateways.",
        "Misuse of tokens or account sharing may result in suspension.",
        "Subscription fees are charged on a recurring basis until canceled."
      ]
    },
    {
      icon: AlertCircle,
      title: "5. Limitation of Liability",
      content: "AI Trade Analyzer is not liable for any losses incurred from using our service. Trading involves risk, and past performance does not guarantee future results. Use our tools at your own discretion."
    },
    {
      icon: CheckCircle,
      title: "6. Privacy & Data Protection",
      content: "We respect your privacy and protect your data in accordance with applicable laws. Your trading data is encrypted and never shared with third parties without your consent."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  }

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.6 }
    }
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background gradient effects */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="text-center mb-16"
        >
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="inline-block p-4 bg-blue-500/10 rounded-2xl mb-6 cursor-pointer"
          >
            <motion.div
              animate={floatingAnimation}
            >
              <Shield className="w-12 h-12 text-blue-400" />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Terms & Conditions
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Please read these terms carefully before using AI Trade Analyzer
          </motion.p>
          <motion.div 
            className="mt-4 text-sm text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Last Updated: November 2024
          </motion.div>
        </motion.div>

        {/* Terms Sections */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(96, 165, 250, 0.1)",
                transition: { duration: 0.3 }
              }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div 
                    className="p-3 bg-blue-500/10 rounded-xl"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                  >
                    <section.icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                </motion.div>
                <div className="flex-1">
                  <motion.h2 
                    className="text-2xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.2 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {section.content && (
                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                    >
                      {section.content}
                    </motion.p>
                  )}
                  
                  {section.points && (
                    <ul className="space-y-3">
                      {section.points.map((point, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index + 0.1 * idx + 0.4 }}
                          whileHover={{ x: 10 }}
                        >
                          <motion.div 
                            className="flex-shrink-0 mt-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * index + 0.1 * idx + 0.5, type: "spring" }}
                          >
                            <CheckCircle className="w-4 h-4 text-blue-400" />
                          </motion.div>
                          <span className="text-gray-300 leading-relaxed">
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.02 }}
          className="mt-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                Important Notice
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Trading cryptocurrencies and other financial instruments involves substantial risk and may result in loss of capital. 
                AI Trade Analyzer is a tool designed to assist in analysis but does not provide guaranteed results. 
                Always conduct your own research and consult with financial advisors before making investment decisions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact & Agreement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <h3 className="text-xl font-bold mb-4">Questions About Our Terms?</h3>
            <p className="text-gray-400 mb-6">
              If you have any questions or concerns about these terms, please contact our support team.
            </p>
            <motion.button 
              className="px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Support</span>
            </motion.button>
          </motion.div>

          <motion.p 
            className="mt-8 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            By continuing to use AI Trade Analyzer, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
          </motion.p>
        </motion.div>

        {/* Footer Links */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-12 flex justify-center space-x-8 text-sm"
        >
          {["Privacy Policy", "Cookie Policy", "Refund Policy"].map((link, idx) => (
            <motion.a
              key={idx}
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {link}
            </motion.a>
          ))}
        </motion.div> */}

        import Link from "next/link"

{/* Footer Links */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.8, duration: 0.6 }}
  className="mt-12 flex justify-center space-x-8 text-sm"
>
  <Link href="/privacy">
    <motion.a
      className="text-gray-400 hover:text-white transition-colors"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      Privacy Policy
    </motion.a>
  </Link>

  <Link href="/cookie-policy">
    <motion.a
      className="text-gray-400 hover:text-white transition-colors"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      Cookie Policy
    </motion.a>
  </Link>

  <Link href="/refund-policy">
    <motion.a
      className="text-gray-400 hover:text-white transition-colors"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      Refund Policy
    </motion.a>
  </Link>
</motion.div>

      </div>
    </div>
  )
}