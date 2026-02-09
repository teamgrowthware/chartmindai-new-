import React from 'react';

const FeatureItem = ({ title, description, icon }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center mr-4">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-brand-text-main">{title}</h4>
      <p className="text-sm text-brand-text-secondary">{description}</p>
    </div>
  </div>
);

const BrainIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>);
const SearchIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>);
const ShieldIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" /></svg>);
const LightBulbIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311V21m-3.75 0-1.087.075M12 18.75v-5.25m0 0a6.01 6.01 0 0 0-1.5-.189m1.5.189a6.01 6.01 0 0 1 1.5-.189m-3.75 7.478a12.06 12.06 0 0 0 4.5 0m-3.75 2.311V21m3.75 0 1.087.075M12 5.25a2.25 2.25 0 0 0-2.25 2.25v.283c-.457.104-.9.293-1.282.533A9.743 9.743 0 0 0 3 12a9.743 9.743 0 0 0 5.468 8.653c.47.25.98.423 1.532.533v.283a2.25 2.25 0 0 0 4.5 0v-.283c.552-.11.1.083-.23.1.532-.11.1.053-.19.1.532-.423 1.062-.533 1.532-.283V9.75A2.25 2.25 0 0 0 12 5.25Z" /></svg>);

export const InitialStateDisplay = () => {
  return (
    <div className="h-full bg-brand-surface border border-brand-border rounded-lg p-8 flex flex-col justify-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-text-main">Welcome to Your AI Co-Pilot</h2>
        <p className="text-brand-text-secondary mt-2">Upload a trading chart to unlock a multi-dimensional analysis.</p>
      </div>
      <div className="space-y-6">
        <FeatureItem
          icon={<BrainIcon className="w-5 h-5" />}
          title="Generative Market Forecasting"
          description="The AI generates plausible future chart scenarios based on market structure and sentiment."
        />
        <FeatureItem
          icon={<SearchIcon className="w-5 h-5" />}
          title="Real-Time Sentiment Integration"
          description="Harnesses live market sentiment from news and social media for a holistic view."
        />
        <FeatureItem
          icon={<ShieldIcon className="w-5 h-5" />}
          title="Dynamic Risk Management"
          description="Receive adaptive suggestions for position sizing, stop-loss, and take-profit levels."
        />
        <FeatureItem
          icon={<LightBulbIcon className="w-5 h-5" />}
          title="Explainable AI (XAI)"
          description="Understand the 'why' behind every analysis with clear, narrative-based reasoning."
        />
      </div>
    </div>
  );
};
