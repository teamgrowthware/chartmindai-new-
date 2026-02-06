import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './Component/ImageUploader';
import { AnalysisDisplay } from './Component/AnalysisDisplay';
import { analyzeChart } from '../../services/geminiService';
import InitialStateDisplay from './Component/InitialStateDisplay';
import Navbar from '../../components/Navbar';

const MainChartAnalysis = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [groundingSources, setGroundingSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitPopup, setShowLimitPopup] = useState(false);

  // Load usage count from memory on component mount
  useEffect(() => {
    const stored = sessionStorage.getItem('chartAnalysisCount');
    if (stored) {
      setUsageCount(parseInt(stored, 10));
    }
  }, []);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const base64Data = base64String.split(',')[1];

      setImage({ url: URL.createObjectURL(file), base64: base64Data });
      setAnalysis(null);
      setError(null);
      setGroundingSources([]);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = useCallback(async () => {
    if (!image) return;

    // Check if user has exceeded limit
    if (usageCount >= 3) {
      setShowLimitPopup(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setGroundingSources([]);

    try {
        // Increment usage count
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      sessionStorage.setItem('chartAnalysisCount', newCount.toString());

      // Show popup if limit reached
      if (newCount >= 3) {
        setShowLimitPopup(true);
      }
      const { result, sources } = await analyzeChart(image.base64);
      setAnalysis(result);
      setGroundingSources(sources);
      
    
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred during analysis.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [image, usageCount]);

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setGroundingSources([]);
  };

  const handleSignUp = () => {
    // Redirect to your sign-up page
    window.location.href = '/signup';
  };

  const handleClosePopup = () => {
    setShowLimitPopup(false);
  };

  return (
    <>
      <Navbar/>
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-sans text-white flex flex-col pt-20 md:pt-40">

        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          </div>
          <div className="relative z-10">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-2xl shadow-cyan-500/50 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 tracking-tight">
              Welcome to Your AI Co-Pilot
            </h1>
            <p className="text-md md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Upload a trading chart to unlock a{' '}
              <span className="text-cyan-400 font-semibold">multi-dimensional analysis</span>.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              Free trials remaining: <span className="text-cyan-400 font-bold">{3 - usageCount}</span>/3
            </p>
          </div>
        </div>

        <main className="flex-grow mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="lg:sticky top-8 self-start">
              <ImageUploader
                onImageUpload={handleImageUpload}
                onAnalyze={handleAnalyze}
                onReset={handleReset}
                imagePreviewUrl={image?.url}
                isLoading={isLoading}
              />
            </div>

            <div className="min-h-[60vh]">
              {isLoading && <AnalysisDisplay.Skeleton />}

              {error && (
                <div className="h-full flex items-center justify-center bg-brand-surface border border-brand-danger rounded-lg p-8">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-brand-danger mb-2">Analysis Failed</h3>
                    <p className="text-brand-text-secondary">{error}</p>
                  </div>
                </div>
              )}

              {!isLoading && !error && analysis && (
                <AnalysisDisplay result={analysis} groundingSources={groundingSources} />
              )}

              {!isLoading && !error && !analysis && <InitialStateDisplay />}
            </div>
          </div>
        </main>

        {/* Limit Reached Popup */}
        {showLimitPopup && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  No Tokens Available
                </h2>
                <p className="text-slate-300 text-center mb-6 leading-relaxed">
                  You've used all <span className="font-bold text-cyan-400">3 free analyses</span>. Sign up now to unlock unlimited chart analysis and premium features!
                </p>

                {/* Benefits */}
                <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Unlimited chart analyses
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Advanced AI insights
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save and track your analyses
                    </li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClosePopup}
                    className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-200 border border-slate-600"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
                  >
                    Sign Up Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainChartAnalysis;