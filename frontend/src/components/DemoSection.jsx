import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiX, FiLoader } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function DemoSection() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [dailyCount, setDailyCount] = useState(() => {
    const stored = localStorage.getItem('demoDailyCount')
    const date = localStorage.getItem('demoDate')
    const today = new Date().toDateString()
    
    if (date === today && stored) {
      return parseInt(stored)
    }
    return 0
  })
  const fileInputRef = useRef(null)

  const MAX_DAILY_ANALYSES = 3
  const API_URL = import.meta.env.VITE_ANALYZER_API_URL || 'https://your-api-url.com/api/candlestick'

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      setSelectedFile(file)
      setResult(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first')
      return
    }

    const today = new Date().toDateString()
    const storedDate = localStorage.getItem('demoDate')
    
    // Reset count if it's a new day
    if (storedDate !== today) {
      localStorage.setItem('demoDate', today)
      localStorage.setItem('demoDailyCount', '0')
      setDailyCount(0)
    }

    if (dailyCount >= MAX_DAILY_ANALYSES) {
      toast.error(`You've reached the daily limit of ${MAX_DAILY_ANALYSES} free analyses. Subscribe for unlimited access!`)
      return
    }

    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setResult(response.data)
      
      // Update daily count
      const newCount = dailyCount + 1
      setDailyCount(newCount)
      localStorage.setItem('demoDailyCount', newCount.toString())
      localStorage.setItem('demoDate', today)
      
      toast.success('Analysis complete!')
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error(error.response?.data?.message || 'Failed to analyze image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const remainingAnalyses = MAX_DAILY_ANALYSES - dailyCount

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try Free Demo Analysis
            </h2>
            <p className="text-gray-400 mb-2">
              Upload a chart image for free candlestick analysis
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium">
              Free Demo – Candlestick Only
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {remainingAnalyses > 0 
                ? `${remainingAnalyses} free analysis${remainingAnalyses > 1 ? 'es' : ''} remaining today`
                : 'Daily limit reached. Subscribe for unlimited access!'
              }
            </p>
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            {!preview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
              >
                <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-300 mb-2">Click to upload chart image</p>
                <p className="text-sm text-gray-500">PNG, JPG, or WEBP (Max 10MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto rounded-xl max-h-96 object-contain bg-dark-800"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                >
                  <FiX className="text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          {selectedFile && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={loading || dailyCount >= MAX_DAILY_ANALYSES}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Analyze Chart</span>
              )}
            </motion.button>
          )}

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
              <div className="space-y-3">
                {result.analysis && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Candlestick Analysis:</p>
                    <p className="text-white">{result.analysis}</p>
                  </div>
                )}
                {result.entry && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Entry:</p>
                    <p className="text-green-400 font-semibold">{result.entry}</p>
                  </div>
                )}
                {result.stopLoss && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Stop Loss:</p>
                    <p className="text-red-400 font-semibold">{result.stopLoss}</p>
                  </div>
                )}
                {result.target && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Target:</p>
                    <p className="text-blue-400 font-semibold">{result.target}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Upgrade CTA */}
          <div className="mt-8 text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <span>Unlock Full AI (SMC, ITC, Patterns)</span>
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

