import React, { useState, memo } from 'react';

const VerdictIndicator = memo(({ verdict }) => {
  const configs = {
    Bullish: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/50',
    Bearish: 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/50',
    Neutral: 'bg-gradient-to-r from-slate-700/20 to-slate-600/20 text-slate-400 border-slate-500/50'
  };
  
  return (
    <span className={`text-2xl font-bold px-6 py-2 rounded-full border-2 ${configs[verdict] || configs.Neutral} shadow-lg`}>
      {verdict}
    </span>
  );
});

VerdictIndicator.displayName = 'VerdictIndicator';

const ConfidenceBar = memo(({ value }) => (
  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
    <div 
      className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-500/50" 
      style={{ width: `${value * 100}%` }}
    />
  </div>
));

ConfidenceBar.displayName = 'ConfidenceBar';

const SentimentGauge = memo(({ score }) => {
  const percentage = (score + 1) / 2 * 100;
  const colorClass = score > 0.2 
    ? 'from-emerald-500 to-green-600' 
    : score < -0.2 
    ? 'from-red-500 to-rose-600' 
    : 'from-cyan-500 to-purple-600';
  
  return (
    <div className="w-full bg-slate-800 rounded-full h-6 relative overflow-hidden shadow-inner">
      <div 
        className={`h-6 rounded-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`} 
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white drop-shadow-lg">
        {score.toFixed(2)}
      </div>
    </div>
  );
});

SentimentGauge.displayName = 'SentimentGauge';

const CheckCircleIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
));

CheckCircleIcon.displayName = 'CheckCircleIcon';

const XCircleIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
));

XCircleIcon.displayName = 'XCircleIcon';

const ChecklistItem = memo(({ item }) => (
  <div className="py-4 flex items-start hover:bg-slate-800/30 transition-colors rounded-lg px-2 -mx-2">
    {item.confirmed ? (
      <CheckCircleIcon className="w-6 h-6 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
    ) : (
      <XCircleIcon className="w-6 h-6 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
    )}
    <div>
      <p className="font-semibold text-white">{item.item}</p>
      <p className="text-sm text-slate-400 mt-1">{item.explanation}</p>
    </div>
  </div>
));

ChecklistItem.displayName = 'ChecklistItem';

const ScenarioCard = memo(({ scenario }) => {
  const { scenario: type, probability, description } = scenario;

  let colorClasses = "border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-purple-500/10";
  if (type.includes('Bullish')) colorClasses = "border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10";
  if (type.includes('Bearish')) colorClasses = "border-red-500/50 bg-gradient-to-br from-red-500/10 to-rose-500/10";

  return (
    <div className={`p-5 border-2 rounded-xl h-full flex flex-col hover:scale-105 transition-transform duration-300 shadow-lg ${colorClasses}`}>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-white">{type}</h4>
        <span className="text-sm font-mono bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          {(probability * 100).toFixed(0)}%
        </span>
      </div>
      <p className="text-sm text-slate-300 flex-grow leading-relaxed">{description}</p>
    </div>
  );
});

ScenarioCard.displayName = 'ScenarioCard';

const Section = memo(({ title, children }) => (
  <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-6 py-4 border-b border-slate-700/50">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
        {title}
      </h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
));

Section.displayName = 'Section';

const ThumbsUpIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
  </svg>
));

ThumbsUpIcon.displayName = 'ThumbsUpIcon';

const ThumbsDownIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
  </svg>
));

ThumbsDownIcon.displayName = 'ThumbsDownIcon';

const AnalysisSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="bg-slate-800 h-40 rounded-2xl" />
    <div className="bg-slate-800 h-60 rounded-2xl" />
    <div className="bg-slate-800 h-32 rounded-2xl" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-800 h-32 rounded-xl" />
      <div className="bg-slate-800 h-32 rounded-xl" />
      <div className="bg-slate-800 h-32 rounded-xl" />
    </div>
  </div>
);

export const AnalysisDisplay = ({ result, groundingSources = [] }) => {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="space-y-6">
      <Section title="AI Summary & Verdict">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <VerdictIndicator verdict={result.summary.verdict} />
          <div className="text-sm text-slate-400">
            Confidence: <span className="font-bold text-cyan-400 text-lg">{(result.summary.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>

        <ConfidenceBar value={result.summary.confidence} />
        <p className="mt-6 text-slate-300 leading-relaxed">{result.summary.explanation}</p>
      </Section>

      <Section title="Confirmation Checklist">
        <div className="divide-y divide-slate-700/50">
          {result.confirmationChecklist.map((item, i) => (
            <ChecklistItem key={i} item={item} />
          ))}
        </div>
      </Section>

      <Section title="Market Sentiment Analysis">
        <SentimentGauge score={result.sentiment.score} />
        <p className="mt-6 text-sm text-slate-300 leading-relaxed">{result.sentiment.summary}</p>
      </Section>

      <Section title="Generative Market Scenarios">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.generativeScenarios.map((sc, i) => (
            <ScenarioCard key={i} scenario={sc} />
          ))}
        </div>
      </Section>

      <Section title="Dynamic Risk Management">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">Entry Price</p>
            <p className="text-xl font-mono text-cyan-400">{result.riskManagement.entryPrice}</p>
          </div>

          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">Stop-Loss</p>
            <p className="text-xl font-mono text-red-400">{result.riskManagement.stopLoss}</p>
          </div>

          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">Take-Profit</p>
            <p className="text-xl font-mono text-emerald-400">{result.riskManagement.takeProfit}</p>
          </div>

          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">Position Size</p>
            <p className="text-xl font-bold text-purple-400">{result.riskManagement.positionSizeSuggestion}</p>
          </div>
        </div>
      </Section>

      <Section title="Explainable AI (XAI) Reasoning">
        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-slate-300 leading-relaxed">{result.explainableAI.reasoning}</p>

          <h4 className="text-white font-semibold mt-6 mb-3">Key Factors:</h4>
          <ul className="space-y-2">
            {result.explainableAI.keyFactors.map((factor, i) => (
              <li key={i} className="text-slate-300">{factor}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">Was this analysis helpful?</p>

          <div className="flex gap-3">
            <button
              onClick={() => setFeedback('up')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                feedback === 'up' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50 scale-110' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:scale-105'
              }`}
            >
              <ThumbsUpIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setFeedback('down')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                feedback === 'down' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50 scale-110' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:scale-105'
              }`}
            >
              <ThumbsDownIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Section>

      {groundingSources.length > 0 && (
        <Section title="Data Sources">
          <ul className="space-y-3">
            {groundingSources.map((source, i) => (
              <li key={i} className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <a
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-purple-400 hover:underline transition-colors"
                >
                  {source.web.title || source.web.uri}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
};

AnalysisDisplay.Skeleton = AnalysisSkeleton;

// Demo with sample data
export default function AnalysisDisplayDemo() {
  const sampleResult = {
    summary: {
      verdict: 'Bullish',
      confidence: 0.78,
      explanation: 'The chart shows a strong uptrend with higher highs and higher lows. Volume confirms the bullish momentum with significant buying pressure at support levels.'
    },
    confirmationChecklist: [
      {
        item: 'Higher High Formation',
        confirmed: true,
        explanation: 'Price successfully broke above the previous high at $45,200 with strong volume.'
      },
      {
        item: 'Volume Confirmation',
        confirmed: true,
        explanation: 'Trading volume increased by 34% during the breakout, indicating strong buyer interest.'
      },
      {
        item: 'RSI Divergence',
        confirmed: false,
        explanation: 'RSI is showing slight bearish divergence at the recent high, suggesting caution.'
      }
    ],
    sentiment: {
      score: 0.65,
      summary: 'Overall market sentiment is strongly positive with institutional buyers entering positions. Social media mentions have increased 156% in the last 24 hours.'
    },
    generativeScenarios: [
      {
        scenario: 'Bullish Continuation',
        probability: 0.55,
        description: 'Price continues upward trend targeting $48,000-$50,000 range within 5-7 days.'
      },
      {
        scenario: 'Neutral Consolidation',
        probability: 0.30,
        description: 'Price consolidates between $44,000-$46,000 before next major move.'
      },
      {
        scenario: 'Bearish Reversal',
        probability: 0.15,
        description: 'Failed breakout leads to retest of $42,000 support level.'
      }
    ],
    riskManagement: {
      entryPrice: '$45,800',
      stopLoss: '$43,500',
      takeProfit: '$49,200',
      positionSizeSuggestion: '2-3%'
    },
    explainableAI: {
      reasoning: 'The analysis combines technical indicators with real-time sentiment data. The strong volume profile and institutional accumulation patterns suggest sustained upward momentum, while the minor RSI divergence warrants careful position management.',
      keyFactors: [
        'Volume profile showing 67% buy-side dominance',
        'MACD golden cross formed on 4H timeframe',
        'On-chain metrics indicate whale accumulation',
        'Correlation with traditional markets trending positive'
      ]
    }
  };

  const sampleSources = [
    { web: { uri: 'https://example.com/crypto-analysis', title: 'Crypto Market Analysis - TradingView' } },
    { web: { uri: 'https://example.com/sentiment-report', title: 'Daily Sentiment Report - CoinMetrics' } }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <AnalysisDisplay result={sampleResult} groundingSources={sampleSources} />
      </div>
    </div>
  );
}