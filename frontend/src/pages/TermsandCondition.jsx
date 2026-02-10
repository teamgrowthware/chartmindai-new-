import { motion } from 'framer-motion'
import { Shield, FileText, User, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'

export default function TermsAndConditions() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: "By accessing ChartMind AI (\"the Service\"), you agree to be bound by these Terms. These Terms apply to all visitors, users, and others who access or use the Service worldwide."
    },
    {
      icon: Shield,
      title: "2. Nature of Services",
      content: "ChartMind AI provides an AI-powered interface for technical analysis of financial charts.",
      points: [
        "Informational Purpose Only: The Service is strictly for educational and informational purposes.",
        "No Guarantee: The AI analysis is automated and may be inaccurate. You should not rely on it for financial decisions."
      ]
    },
    {
      icon: CreditCard,
      title: "3. Cryptocurrency Payments",
      content: "We accept payments via NOWPayments. By purchasing tokens, you agree:",
      points: [
        "Irreversible Transactions: Blockchain transactions are final. Once funds are sent, they cannot be recovered.",
        "User Responsibility: You are responsible for selecting the correct network (e.g., TRC20, ERC20) and paying all gas fees. Sending funds to the wrong address results in permanent loss.",
        "No Refunds: Due to the digital nature of the tokens, ALL SALES ARE FINAL. We do not offer refunds or cancellations."
      ]
    },
    {
      icon: AlertCircle,
      title: "4. Risk Disclaimer (Worldwide)",
      content: "IMPORTANT: READ CAREFULLY",
      points: [
        "Not Financial Advice: ChartMind AI is a software tool, not a financial advisor, broker, or registered investment analyst in any jurisdiction.",
        "Trading Risk: Trading cryptocurrencies, stocks, and forex involves a high level of risk and may result in the loss of your entire capital.",
        "No Liability: TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE OWNER SHALL NOT BE LIABLE FOR ANY DAMAGES RESULTING FROM YOUR USE OF THE SERVICE."
      ]
    },
    {
      icon: User,
      title: "5. User Conduct & Prohibited Use",
      content: "You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You are solely responsible for compliance with the laws of your specific jurisdiction regarding the use of AI and cryptocurrency."
    },
    {
      icon: CheckCircle,
      title: "6. Governing Law & Dispute Resolution",
      points: [
        "Anonymous Jurisdiction: These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where the Service Owner is established.",
        "Binding Arbitration: Any dispute arising from these Terms shall be resolved through binding arbitration.",
        "Class Action Waiver: You agree that any claim you may have against ChartMind AI must be brought individually."
      ]
    },
    {
      icon: FileText,
      title: "7. Changes to Terms",
      content: "We reserve the right to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms."
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
            Terms of Service
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Last Updated: February 2026
          </motion.p>
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
                    <ul className="space-y-3 mt-4">
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
              If you have any questions or concerns about these terms, please contact our support team at hello@tradorr.com.
            </p>
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
      </div>
    </div>
  )
}