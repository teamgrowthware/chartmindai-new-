import React, { memo } from 'react';

const FeatureItem = memo(({ title, description, icon: Icon }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="mb-5 inline-block p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-8 h-8 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
        {description}
      </p>
    </div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
  </div>
));

FeatureItem.displayName = 'FeatureItem';

const BrainIcon = memo(({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
));

BrainIcon.displayName = 'BrainIcon';

const SearchIcon = memo(({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));

SearchIcon.displayName = 'SearchIcon';

const ShieldIcon = memo(({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));

ShieldIcon.displayName = 'ShieldIcon';

const LightBulbIcon = memo(({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
));

LightBulbIcon.displayName = 'LightBulbIcon';

const features = [
  {
    icon: BrainIcon,
    title: "Generative Market Forecasting",
    description: "The AI generates plausible future chart scenarios based on market structure and sentiment."
  },
  {
    icon: SearchIcon,
    title: "Real-Time Sentiment Integration",
    description: "Harnesses live market sentiment from news and social media for a holistic view."
  },
  {
    icon: ShieldIcon,
    title: "Dynamic Risk Management",
    description: "Receive adaptive suggestions for position sizing, stop-loss, and take-profit levels."
  },
  {
    icon: LightBulbIcon,
    title: "Explainable AI (XAI)",
    description: "Understand the 'why' behind every analysis with clear, narrative-based reasoning."
  }
];

export default function InitialStateDisplay() {
  return (
    <div className=" flex items-center justify-center p-6">
      <div className="max-w-7xl w-full">
      
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <FeatureItem
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}