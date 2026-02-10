import { motion } from 'framer-motion'
import { Shield, Database, Lock, Share2, UserCheck, Bell, Eye, CheckCircle } from 'lucide-react'

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: "1. Introduction",
      content: "Welcome to ChartMind AI. We operate globally and are committed to protecting your privacy in compliance with international laws, including the General Data Protection Regulation (GDPR) for European users and the California Consumer Privacy Act (CCPA) for US users."
    },
    {
      icon: Database,
      title: "2. Data We Collect",
      points: [
        "Account Data: Email address (via Login).",
        "Uploaded Content: Financial charts and images uploaded for AI analysis.",
        "Transaction Data: Public wallet addresses and Transaction Hashes (TXID) via NOWPayments. We never access your private keys or banking passwords.",
        "Cookies & Analytics: We use cookies to manage sessions and analyze site traffic anonymously."
      ]
    },
    {
      icon: Share2,
      title: "3. International Data Transfers",
      content: "By using our Service, you acknowledge that your information may be transferred to, stored, and processed in secure servers located outside of your country of residence. We ensure that appropriate safeguards are in place to protect your data during such transfers."
    },
    {
      icon: Eye,
      title: "4. For Users in Europe (GDPR Rights)",
      content: "If you are a resident of the European Economic Area (EEA), you have the following rights:",
      points: [
        "Right to Access: You can request a copy of your data.",
        "Right to Erasure ('Right to be Forgotten'): You can ask us to delete your account and all associated data.",
        "Right to Rectification: You can ask us to correct wrong information.",
        "To exercise these rights, email us at: hello@tradorr.com"
      ]
    },
    {
      icon: UserCheck,
      title: "5. For Users in the USA (CCPA Rights)",
      content: "Under the California Consumer Privacy Act (CCPA):",
      points: [
        "We do not sell your personal information.",
        "You have the right to know what personal data is being collected.",
        "You have the right to request the deletion of your personal data."
      ]
    },
    {
      icon: Lock,
      title: "6. Security",
      content: "We use enterprise-grade encryption to protect your data. However, no method of transmission over the Internet is 100% secure."
    },
    {
      icon: Bell,
      title: "7. Contact Us",
      content: "For any privacy-related inquiries, please contact:",
      points: [
        "Email: hello@tradorr.com"
      ]
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
            Effective Date: February 10, 2026
          </motion.p>
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
              <motion.a
                href="mailto:hello@tradorr.com"
                className="px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Request Data Access</span>
              </motion.a>
              <motion.a
                href="mailto:hello@tradorr.com?subject=Delete Account Request"
                className="px-8 py-3 bg-zinc-800 border border-white/10 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-all inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Delete My Account</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}