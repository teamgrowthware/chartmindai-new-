import { Link } from 'react-router-dom'
import { FaXTwitter, FaYoutube, FaTelegram } from 'react-icons/fa6'
import Logo from '../assets/Aitrade.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                {/* <span className="text-white font-bold text-xl">T</span> */}
<img 
                  src={Logo}   
                  alt="Tradorr Logo"
                  className="w-16 h-16 object-contain"
                />

              </div>
        <span className="text-xl md:text-2xl font-bold text-white">Tradorr</span>
            </Link>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <FaXTwitter className="text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <FaYoutube className="text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <FaTelegram className="text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col md:items-end">
            <div className="flex flex-wrap gap-6 mb-4">
              <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </a>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                Features
              </a>
              <a href="#why-choose" className="text-gray-400 hover:text-white transition-colors text-sm">
                Why Choose Trade?
              </a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">
                How it works
              </a>
              <a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                FAQ
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>© {currentYear} AI Trade Analyzer.com | hello@tradorr.com</p>
        </div>
      </div>
    </footer>
  )
}

