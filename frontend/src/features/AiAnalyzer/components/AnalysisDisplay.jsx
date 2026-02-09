import React, { useState } from 'react';

const VerdictIndicator = ({ verdict }) => {
  const baseClasses = "text-2xl font-bold px-4 py-1 rounded-full";
  if (verdict === 'Bullish') return <span className={`${baseClasses} bg-brand-success-light text-brand-success`}>Bullish</span>;
  if (verdict === 'Bearish') return <span className={`${baseClasses} bg-brand-danger-light text-brand-danger`}>Bearish</span>;
  return <span className={`${baseClasses} bg-gray-700 text-gray-300`}>Neutral</span>;
};

const ConfidenceBar = ({ value }) => (
  <div className="w-full bg-brand-border rounded-full h-2.5">
    <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${value * 100}%` }}></div>
  </div>
);

const SentimentGauge = ({ score }) => {
  const percentage = (score + 1) / 2 * 100;
  const color = score > 0.2 ? 'bg-brand-success' : score < -0.2 ? 'bg-brand-danger' : 'bg-brand-primary';
  return (
    <div className="w-full bg-brand-border rounded-full h-4 relative">
      <div className={`h-4 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {score.toFixed(2)}
      </div>
    </div>
  );
};

const CheckCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);
const XCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);

const ChecklistItem = ({ item }) => (
  <div className="py-3 flex items-start">
    {item.confirmed ? <CheckCircleIcon className="w-6 h-6 text-brand-success mr-3 mt-0.5 flex-shrink-0" /> : <XCircleIcon className="w-6 h-6 text-brand-danger mr-3 mt-0.5 flex-shrink-0" />}
    <div>
      <p className="font-semibold text-brand-text-main">{item.item}</p>
      <p className="text-sm text-brand-text-secondary">{item.explanation}</p>
    </div>
  </div>
);

const ScenarioCard = ({ scenario }) => {
  const { scenario: type, probability, description } = scenario;
  let colorClasses = "border-brand-primary text-brand-primary bg-brand-primary/10";
  if (type.includes('Bullish')) colorClasses = "border-brand-success text-brand-success bg-brand-success/10";
  if (type.includes('Bearish')) colorClasses = "border-brand-danger text-brand-danger bg-brand-danger/10";

  return (
    <div className={`p-4 border rounded-lg h-full flex flex-col ${colorClasses}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">{type}</h4>
        <span className="text-sm font-mono bg-white/10 px-2 py-0.5 rounded">{`${(probability * 100).toFixed(0)}%`}</span>
      </div>
      <p className="text-sm text-brand-text-secondary flex-grow">{description}</p>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-brand-surface border border-brand-border rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-brand-text-main px-6 py-4 border-b border-brand-border">{title}</h3>
    <div className="p-6">{children}</div>
  </div>
);

const ThumbsUpIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H5.904c-.66 0-1.198.538-1.198 1.198v7.504c0 .66.538 1.198 1.198 1.198h4.252c.245 0 .482.028.712.084l3.114 1.04c.258.086.542.13.828.13h2.169c.618 0 1.18-.216 1.605-.729a11.95 11.95 0 0 0 2.649-7.521c0-.435-.023-.863-.068-1.285a2.053 2.053 0 0 0-2.054-1.715Z" /></svg>);
const ThumbsDownIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904M14.25 12h-3.126c-1.026 0-1.945-.694-2.054-1.715A12.002 12.002 0 0 1 8.94 8.521c.388-.482.987-.729 1.605-.729h.009c.483 0 .964.078 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294c.618 0 1.18.216 1.605.729A11.95 11.95 0 0 1 21 12.285c0 .435-.023.863-.068 1.285a2.053 2.053 0 0 1-2.054 1.715H14.25Z" /></svg>);

const AnalysisSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="bg-brand-surface border border-brand-border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-8 bg-brand-border rounded-full w-32"></div>
        <div className="h-5 bg-brand-border rounded w-24"></div>
      </div>
      <div className="h-2.5 bg-brand-border rounded-full w-full"></div>
      <div className="h-5 bg-brand-border rounded w-3/4"></div>
    </div>
    <div className="bg-brand-surface border border-brand-border rounded-lg">
      <div className="h-14 bg-brand-surface rounded-t-lg px-6 py-4 border-b border-brand-border"><div className="h-6 bg-brand-border rounded w-48"></div></div>
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start">
            <div className="w-6 h-6 bg-brand-border rounded-full mr-3"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-brand-border rounded w-1/2"></div>
              <div className="h-3 bg-brand-border rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-brand-surface border border-brand-border rounded-lg">
      <div className="h-14 bg-brand-surface rounded-t-lg px-6 py-4 border-b border-brand-border"><div className="h-6 bg-brand-border rounded w-48"></div></div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-brand-border rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

export const AnalysisDisplay = ({ result, groundingSources }) => {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="space-y-6">
      <Section title="AI Summary & Verdict">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <VerdictIndicator verdict={result.summary.verdict} />
          <div className="w-full sm:w-auto text-sm text-brand-text-secondary">
            Confidence: <span className="font-bold text-brand-text-main">{(result.summary.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>
        <ConfidenceBar value={result.summary.confidence} />
        <p className="mt-4 text-brand-text-secondary">{result.summary.explanation}</p>
      </Section>

      <Section title="Confirmation Checklist">
        <div className="divide-y divide-brand-border">
          {result.confirmationChecklist.map((item, index) => <ChecklistItem key={index} item={item} />)}
        </div>
      </Section>

      <Section title="Market Sentiment Analysis">
        <SentimentGauge score={result.sentiment.score} />
        <p className="mt-4 text-sm text-brand-text-secondary">{result.sentiment.summary}</p>
      </Section>

      <Section title="Generative Market Scenarios">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.generativeScenarios.map((sc, index) => <ScenarioCard key={index} scenario={sc} />)}
        </div>
      </Section>

      <Section title="Dynamic Risk Management">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-brand-text-secondary">Entry Price</p>
            <p className="text-lg font-mono font-bold text-brand-text-main">{result.riskManagement.entryPrice}</p>
          </div>
          <div>
            <p className="text-sm text-brand-text-secondary">Stop-Loss</p>
            <p className="text-lg font-mono font-bold text-brand-danger">{result.riskManagement.stopLoss}</p>
          </div>
          <div>
            <p className="text-sm text-brand-text-secondary">Take-Profit</p>
            <p className="text-lg font-mono font-bold text-brand-success">{result.riskManagement.takeProfit}</p>
          </div>
          <div>
            <p className="text-sm text-brand-text-secondary">Position Size</p>
            <p className="text-lg font-bold text-brand-text-main">{result.riskManagement.positionSizeSuggestion}</p>
          </div>
        </div>
      </Section>

      <Section title="Explainable AI (XAI) Reasoning">
        <div className="prose prose-invert prose-sm max-w-none text-brand-text-secondary">
          <p>{result.explainableAI.reasoning}</p>
          <h4 className="text-brand-text-main font-semibold mt-4">Key Factors:</h4>
          <ul>
            {result.explainableAI.keyFactors.map((factor, index) => <li key={index}>{factor}</li>)}
          </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-end gap-4">
          <p className="text-sm text-brand-text-secondary">Was this analysis helpful?</p>
          <div className="flex gap-2">
            <button onClick={() => setFeedback('up')} className={`p-2 rounded-full transition-colors ${feedback === 'up' ? 'bg-brand-primary text-white' : 'hover:bg-brand-border'}`}><ThumbsUpIcon className="w-5 h-5" /></button>
            <button onClick={() => setFeedback('down')} className={`p-2 rounded-full transition-colors ${feedback === 'down' ? 'bg-brand-primary text-white' : 'hover:bg-brand-border'}`}><ThumbsDownIcon className="w-5 h-5" /></button>
          </div>
        </div>
      </Section>

      {groundingSources.length > 0 && (
        <Section title="Data Sources">
          <ul className="list-disc list-inside text-sm space-y-2">
            {groundingSources.map((source, index) => (
              <li key={index}>
                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
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
