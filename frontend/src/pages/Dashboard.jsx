import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

// Mock hooks for demo
const useAuth = () => ({ currentUser: { email: 'trader@example.com', uid: 'abc123def456ghi789jkl012' } });
const useSubscription = () => ({ 
  subscription: { isActive: true, plan: 'Pro', endDate: '2025-12-31' }, 
  loading: false 
});

const FiTrendingUp = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const FiCalendar = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FiZap = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const FiArrowRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const format = (date, formatStr) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { subscription, loading } = useSubscription();
  const fullAnalyzerUrl = 'https://your-analyzer-app.com';

  const handleOpenAnalyzer = () => {
    if (subscription?.isActive) {
      window.open(fullAnalyzerUrl, '_blank');
    } else {
      window.location.href = '/pricing';
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200% auto' }}
          >
            Welcome back, {currentUser?.email?.split('@')[0]}! 
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg"
          >
            Manage your trading account and access your tools
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Subscription Status Card */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="rest"
            className="relative group"
          >
            <motion.div
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      Subscription Status
                    </h2>
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full"
                        />
                        <p className="text-slate-400">Loading...</p>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="flex items-center space-x-3"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: subscription?.isActive 
                              ? ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 10px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0)']
                              : ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`w-4 h-4 rounded-full ${
                            subscription?.isActive ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                        <span className="text-xl font-bold text-white">
                          {subscription?.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </motion.div>
                    )}
                  </div>
                  {subscription?.isActive && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-right bg-slate-800/50 rounded-2xl p-4 backdrop-blur-sm"
                    >
                      <p className="text-sm text-slate-400 mb-1">Plan</p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {subscription?.plan || 'Pro'}
                      </p>
                    </motion.div>
                  )}
                </div>

                {subscription?.isActive && subscription?.endDate && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center space-x-3 text-slate-400 bg-slate-800/30 rounded-xl p-4"
                  >
                    <FiCalendar className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">
                      Expires: {format(new Date(subscription.endDate), 'MMM dd, yyyy')}
                    </span>
                  </motion.div>
                )}

                {!subscription?.isActive && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="mt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/50 transition-all"
                    >
                      <span>Subscribe Now</span>
                      <FiArrowRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className="relative group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 shadow-2xl h-full backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/50"
                  >
                    <FiZap className="text-3xl text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Full AI Analyzer</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Access advanced SMC, ITC, and pattern analysis with entry, stop loss, and target predictions.
                  </p>
                  <motion.button
                    onClick={handleOpenAnalyzer}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/50 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Open Full Analyzer</span>
                    <FiArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className="relative group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 shadow-2xl h-full backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/50"
                  >
                    <FiTrendingUp className="text-3xl text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Trading Dashboard</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    View your trading statistics, performance metrics, and account details.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full py-4 bg-slate-800/50 border border-slate-700 rounded-xl font-bold text-lg text-white hover:bg-slate-700/50 transition-all"
                  >
                    Go to Dashboard
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Account Info */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="rest"
            className="relative group"
          >
            <motion.div
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center bg-slate-800/30 rounded-xl p-4"
                  >
                    <span className="text-slate-400 font-medium">Email:</span>
                    <span className="font-bold text-white">{currentUser?.email}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center bg-slate-800/30 rounded-xl p-4"
                  >
                    <span className="text-slate-400 font-medium">User ID:</span>
                    <span className="font-mono text-sm text-cyan-400">{currentUser?.uid?.substring(0, 20)}...</span>
                  </motion.div>
                  {subscription?.plan && (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center bg-slate-800/30 rounded-xl p-4"
                    >
                      <span className="text-slate-400 font-medium">Current Plan:</span>
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {subscription.plan}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </>
  );
}