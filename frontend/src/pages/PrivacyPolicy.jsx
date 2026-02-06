import { motion } from 'framer-motion'
import { Shield, Database, Lock, Share2, UserCheck, Bell, Eye, CheckCircle } from 'lucide-react'

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: "1. Introduction",
      content: "We value your privacy. This Privacy Policy explains how we collect, use, store, and protect information when you use the AI Trade Analyzer website and services. Your trust is important to us, and we are committed to maintaining the confidentiality and security of your personal information."
    },
    {
      icon: Database,
      title: "2. Information We Collect",
      points: [
        "Account information (email, username).",
        "Payment details are handled securely by third-party providers (Stripe, Razorpay, Crypto gateways).",
        "Uploaded chart images for AI analysis (not shared or sold).",
        "Usage data such as number of analyses performed, device type, and login history."
      ]
    },
    {
      icon: Eye,
      title: "3. How We Use Your Information",
      points: [
        "To provide AI chart analysis and deliver our core services.",
        "To manage your account, token balance, and subscription status.",
        "To improve service performance, security, and user experience.",
        "To handle billing, fraud prevention, and customer support."
      ]
    },
    {
      icon: Lock,
      title: "4. Data Storage & Security",
      points: [
        "All data is securely stored using encrypted systems.",
        "We do not store raw payment information.",
        "Uploaded images may be temporarily stored for processing but are automatically deleted.",
        "We employ industry-standard security measures to protect your data from unauthorized access."
      ]
    },
    {
      icon: Share2,
      title: "5. Sharing of Information",
      content: "We do not sell or share your personal information. Information may only be shared with:",
      points: [
        "Payment processors for transaction handling",
        "Security/anti-fraud services for platform protection",
        "Legal authorities if required by law"
      ]
    },
    {
      icon: UserCheck,
      title: "6. Your Rights",
      points: [
        "You can request deletion of your account and data at any time.",
        "You can request to view or update your information.",
        "You have the right to opt-out of marketing communications.",
        "You can export your data upon request."
      ]
    },
    {
      icon: Bell,
      title: "7. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time and will notify users of any important changes. Continued use of our services after changes constitutes acceptance of the updated policy. We encourage you to review this policy periodically."
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
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-600/5 rounded-full blur-3xl"
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
            className="inline-block p-4 bg-green-500/10 rounded-2xl mb-6 cursor-pointer"
          >
            <motion.div
              animate={floatingAnimation}
            >
              <Shield className="w-12 h-12 text-green-400" />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your privacy and data security are our top priorities
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

        {/* Privacy Sections */}
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
                boxShadow: "0 20px 60px rgba(74, 222, 128, 0.1)",
                transition: { duration: 0.3 }
              }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div 
                    className="p-3 bg-green-500/10 rounded-xl"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(74, 222, 128, 0.2)" }}
                  >
                    <section.icon className="w-6 h-6 text-green-400" />
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
                      className="text-gray-300 leading-relaxed mb-4"
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
                            <CheckCircle className="w-4 h-4 text-green-400" />
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

        {/* Data Protection Guarantee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.02 }}
          className="mt-12 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                Our Commitment to Your Privacy
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We are committed to protecting your privacy and ensuring the security of your personal information. 
                We use advanced encryption technologies and follow industry best practices to safeguard your data. 
                Your information will never be sold to third parties, and we only share it when necessary to provide our services or comply with legal obligations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* GDPR & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-6 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: Shield, color: "blue", title: "GDPR Compliant", text: "We comply with European data protection regulations" },
            { icon: Lock, color: "green", title: "256-bit Encryption", text: "Bank-level security for all your data" },
            { icon: UserCheck, color: "purple", title: "Your Control", text: "Full control over your personal data" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.5 + idx * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:border-white/30 transition-all cursor-pointer"
            >
              <motion.div
                animate={floatingAnimation}
                transition={{ delay: idx * 0.2 }}
              >
                <item.icon className={`w-8 h-8 text-${item.color}-400 mx-auto mb-3`} />
              </motion.div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact & Data Requests */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <h3 className="text-xl font-bold mb-4">Need to Access or Delete Your Data?</h3>
            <p className="text-gray-400 mb-6">
              You have full control over your personal information. Contact us to request data access, corrections, or deletion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Request Data Access</span>
              </motion.button>
              <motion.button 
                className="px-8 py-3 bg-zinc-800 border border-white/10 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-all inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Delete My Account</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.p 
            className="mt-8 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            For privacy-related inquiries, contact us at privacy@tradorr.com
          </motion.p>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-12 flex justify-center space-x-8 text-sm"
        >
          {["Terms & Conditions", "Cookie Policy", "Data Protection"].map((link, idx) => (
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
        </motion.div>
      </div>
    </div>
  )
}