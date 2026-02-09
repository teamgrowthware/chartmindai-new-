import React, { useState, useCallback } from 'react';
import { ImageUploader } from './Component/ImageUploader';
import { AnalysisDisplay } from './Component/AnalysisDisplay';
import { analyzeChart } from '../../features/AiAnalyzer/services/geminiService';
import InitialStateDisplay from './Component/InitialStateDisplay';
import Navbar from '../../components/Navbar';
import { useAnalyzerUsage } from '../../hooks/useAnalyzerUsage';
import { LimitPopup } from '../../components/LimitPopup';

const MainChartAnalysis = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [groundingSources, setGroundingSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLimitPopup, setShowLimitPopup] = useState(false);

  const { usageCount, checkAndIncrement, isSubscribed } = useAnalyzerUsage();

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

    // Check limit using hook
    const allowed = await checkAndIncrement();
    if (!allowed) {
      setShowLimitPopup(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setGroundingSources([]);

    try {
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
  }, [image, checkAndIncrement]);

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setGroundingSources([]);
  };

  return (
    <>
      <Navbar />
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
            {!isSubscribed && (
              <p className="text-sm text-slate-500 mt-4">
                Free trials remaining: <span className="text-cyan-400 font-bold">{Math.max(0, 3 - usageCount)}</span>/3
              </p>
            )}
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

        <LimitPopup show={showLimitPopup} onClose={() => setShowLimitPopup(false)} />
      </div>
    </>
  );
};

export default MainChartAnalysis;