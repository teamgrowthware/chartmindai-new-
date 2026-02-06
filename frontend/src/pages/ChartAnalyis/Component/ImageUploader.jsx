import React, { useRef, memo } from 'react';

const UploadIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
));

UploadIcon.displayName = 'UploadIcon';

const ChartIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
));

ChartIcon.displayName = 'ChartIcon';

const SpinnerIcon = memo(() => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
));

SpinnerIcon.displayName = 'SpinnerIcon';

export const ImageUploader = ({ onImageUpload, onAnalyze, onReset, imagePreviewUrl, isLoading }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 shadow-2xl h-full flex flex-col backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
          <ChartIcon className="w-6 h-6 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Trading Chart
        </h2>
      </div>

      <div className="flex-grow border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center bg-slate-950/50 relative overflow-hidden min-h-[300px] group hover:border-cyan-500/50 transition-all duration-300">
        {imagePreviewUrl ? (
          <>
            <img 
              src={imagePreviewUrl} 
              alt="Chart preview" 
              className="object-contain max-h-full max-w-full rounded-lg" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="text-center text-slate-400 p-8">
            <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 mb-6 group-hover:scale-110 transition-transform duration-300">
              <ChartIcon className="w-16 h-16 text-cyan-400" />
            </div>
            <p className="font-semibold text-white text-lg mb-2">Upload a chart image to begin</p>
            <p className="text-sm text-slate-500">PNG, JPG, or WEBP supported</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {!imagePreviewUrl ? (
          <button
            onClick={handleUploadClick}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <UploadIcon className="w-5 h-5" />
            Select Image
          </button>
        ) : (
          <>
            <button
              onClick={onReset}
              className="w-full sm:w-1/3 bg-slate-700/50 text-slate-300 font-bold py-3 px-6 rounded-xl hover:bg-slate-700 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isLoading}
            >
              Reset
            </button>

            <button
              onClick={onAnalyze}
              disabled={isLoading}
              className="w-full sm:w-2/3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Run Co-Pilot Analysis
                </>
              )}
            </button>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
      </div>
    </div>
  );
};

// Demo wrapper to showcase the component
export default function ImageUploaderDemo() {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    console.log("------")
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   alert('Analysis complete! (Demo)');
    // }, 2000);
  };

  const handleReset = () => {
    setImageUrl(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <ImageUploader
          onImageUpload={handleUpload}
          onAnalyze={handleAnalyze}
          onReset={handleReset}
          imagePreviewUrl={imageUrl}
          isLoading={loading}
        />
      </div>
    </div>
  );
}