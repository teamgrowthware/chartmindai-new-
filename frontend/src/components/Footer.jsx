import { motion } from 'framer-motion'
import { Twitter, Send, MessageCircle } from 'lucide-react'
import Logo from '../assets/Aitrade.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const socialIconVariants = {
    hover: {
      scale: 1.15,
      rotate: 360,
      transition: { duration: 0.5 }
    }
  }

  return (
    <footer className="relative bg-black border-white/10 overflow-hidden">

      {/* Background lights */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -bottom-20 left-1/4 w-72 md:w-96 bg-purple-600/5 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-20 right-1/4 w-72 md:w-96 bg-blue-600/5 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        {/* Logo */}
        <div className="text-center ">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center">
            <img
              src={Logo}
              alt="Tradorr Logo"
              className="object-contain w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
            />
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.nav
          className="flex flex-wrap justify-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {['Home', 'Features', 'Why Choose Trade?', 'How it works', 'FAQ'].map((link, idx) => (
            <motion.a
              key={idx}
              href={`#${link.toLowerCase().replace(/\s+/g, '-').replace('?', '')}`}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link}
            </motion.a>
          ))}
        </motion.nav>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
            { icon: Send, href: 'https://telegram.org', label: 'Telegram' },
            { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' }
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center hover:border-white/30 transition-all group"
              variants={socialIconVariants}
              whileHover="hover"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center pt-6 border-t border-white/10 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-center space-x-6 mb-4 text-sm text-gray-400">
            <a href="/termandcondition" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="/privacyandpolicy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <p className="text-gray-500 text-sm">
            © {currentYear} Tradorr.com | hello@tradorr.com
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

