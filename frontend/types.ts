export type Verdict = 'Bullish' | 'Bearish' | 'Neutral';
export type ScenarioType = 'Bullish Continuation' | 'Bearish Reversal' | 'Range-bound' | 'Bullish Reversal' | 'Bearish Continuation';

export interface ConfirmationChecklistItem {
  item: string;
  confirmed: boolean;
  explanation: string;
}

export interface GenerativeScenario {
  scenario: ScenarioType;
  probability: number;
  description: string;
}

export interface AnalysisResult {
  summary: {
    verdict: Verdict;
    confidence: number;
    explanation: string;
  };
  confirmationChecklist: ConfirmationChecklistItem[];
  sentiment: {
    score: number;
    summary: string;
  };
  generativeScenarios: GenerativeScenario[];
  riskManagement: {
    entryPrice: string;
    stopLoss: string;
    takeProfit: string;
    positionSizeSuggestion: string;
  };
  explainableAI: {
    reasoning: string;
    keyFactors: string[];
  };
}

export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  }
}
