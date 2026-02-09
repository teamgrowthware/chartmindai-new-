import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-brand-text-secondary text-xs">
        <p>&copy; {new Date().getFullYear()} AI Trading Co-Pilot. All Rights Reserved.</p>
        <p className="mt-2">Disclaimer: This tool is for informational and educational purposes only. It is not financial advice. Trading involves significant risk. Always do your own research.</p>
      </div>
    </footer>
  );
};
