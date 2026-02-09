import React from 'react';

const BrainCircuitIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 12v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1l4.79-1.84c.13.58.21 1.17.21 1.79 0 4.08-3.05 7.44-7 7.93zM12 4c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm-3.5 2.5c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zm7 0c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1z" />
  </svg>
);


export const Header = () => {
  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm border-b border-brand-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center text-center">
        <BrainCircuitIcon className="w-8 h-8 mr-3 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold text-brand-text-main tracking-tight">AI Trading Co-Pilot</h1>
          <p className="text-sm text-brand-text-secondary">Predictive, Adaptive, and Transparent Market Analysis</p>
        </div>
      </div>
    </header>
  );
};
