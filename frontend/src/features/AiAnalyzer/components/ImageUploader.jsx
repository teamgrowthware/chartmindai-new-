import React, { useRef } from 'react';

const UploadIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

const ChartIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);


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
    <div className="bg-brand-surface border border-brand-border rounded-lg p-6 shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold text-brand-text-main mb-4">Trading Chart</h2>
      <div className="flex-grow border-2 border-dashed border-brand-border rounded-lg flex items-center justify-center bg-brand-bg/50 relative overflow-hidden min-h-[300px]">
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Chart preview" className="object-contain max-h-full max-w-full" />
        ) : (
          <div className="text-center text-brand-text-secondary">
            <ChartIcon className="w-16 h-16 mx-auto mb-4" />
            <p className="font-semibold">Upload a chart image to begin</p>
            <p className="text-sm">PNG, JPG, or WEBP supported</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {!imagePreviewUrl ? (
          <button
            onClick={handleUploadClick}
            className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-secondary transition-colors flex items-center justify-center gap-2"
          >
            <UploadIcon className="w-5 h-5" />
            Select Image
          </button>
        ) : (
          <>
            <button
              onClick={onReset}
              className="w-full sm:w-1/3 bg-brand-text-secondary/50 text-brand-text-main font-bold py-2 px-4 rounded-md hover:bg-brand-text-secondary/80 transition-colors"
              disabled={isLoading}
            >
              Reset
            </button>
            <button
              onClick={onAnalyze}
              disabled={isLoading}
              className="w-full sm:w-2/3 bg-brand-success text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 transition-colors flex items-center justify-center gap-2 disabled:bg-brand-text-secondary disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Run Co-Pilot Analysis'
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
