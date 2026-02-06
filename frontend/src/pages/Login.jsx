import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader, ArrowRight } from 'lucide-react';
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../config/BaseUrl';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      // AuthContext handles state updates via onAuthStateChanged
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error);
      const msg = error.message.replace('Firebase: ', '');
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      localStorage.setItem("userEmail", user?.user?.email);
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to your AI Trade Analyzer account
            </p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-gray-600"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-white text-black rounded-xl font-semibold mt-8 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="mt-8 text-center text-sm text-gray-500">Or continue with</div>

          {/* Google Login */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-4 w-full py-4 bg-black/50 border border-white/10 rounded-xl flex items-center justify-center text-white"
          >
            Google
          </motion.button>

          {/* Sign Up */}
          <p className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white hover:text-gray-300 font-semibold">Sign up</Link>
          </p>

        </div>

        <div className="mt-6 text-center text-gray-600 text-xs">
          Protected by industry-standard encryption
        </div>
      </motion.div>
    </div>
  );
}
