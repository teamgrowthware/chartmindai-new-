import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { analyzeChart } from './services/geminiService';
import { InitialStateDisplay } from './components/InitialStateDisplay';
import { Footer } from './components/Footer';

const AiAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [groundingSources, setGroundingSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setGroundingSources([]);

    try {
      const { result, sources } = await analyzeChart(image.base64);
      setAnalysis(result);
      setGroundingSources(sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, [image]);

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setGroundingSources([]);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
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
            {!isLoading && !error && analysis && <AnalysisDisplay result={analysis} groundingSources={groundingSources} />}
            {!isLoading && !error && !analysis && <InitialStateDisplay />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiAnalyzer;
