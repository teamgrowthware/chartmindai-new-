import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Vite environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY environment variable is not set. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Construct the JSON schema string directly for the prompt
const jsonSchemaString = JSON.stringify({
  type: "OBJECT",
  properties: {
    summary: {
      type: "OBJECT",
      properties: {
        verdict: { type: "STRING", enum: ['Bullish', 'Bearish', 'Neutral'], description: "The overall market verdict." },
        confidence: { type: "NUMBER", description: "Confidence level from 0.0 to 1.0." },
        explanation: { type: "STRING", description: "A brief explanation of the verdict." }
      },
      required: ['verdict', 'confidence', 'explanation']
    },
    confirmationChecklist: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          item: { type: "STRING", description: "The checklist item name." },
          confirmed: { type: "BOOLEAN", description: "Whether the item is confirmed." },
          explanation: { type: "STRING", description: "Brief reason for confirmation status." }
        },
        required: ['item', 'confirmed', 'explanation']
      }
    },
    sentiment: {
      type: "OBJECT",
      properties: {
        score: { type: "NUMBER", description: "Sentiment score from -1.0 (very negative) to 1.0 (very positive)." },
        summary: { type: "STRING", description: "Summary of the market sentiment based on news and social media." }
      },
      required: ['score', 'summary']
    },
    generativeScenarios: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          scenario: { type: "STRING", enum: ['Bullish Continuation', 'Bearish Reversal', 'Range-bound', 'Bullish Reversal', 'Bearish Continuation'], description: "The type of projected scenario." },
          probability: { type: "NUMBER", description: "Probability of this scenario occurring (0.0 to 1.0)." },
          description: { type: "STRING", description: "Description of the potential price action in this scenario." }
        },
        required: ['scenario', 'probability', 'description']
      }
    },
    riskManagement: {
      type: "OBJECT",
      properties: {
        entryPrice: { type: "STRING", description: "Suggested entry price zone." },
        stopLoss: { type: "STRING", description: "Suggested stop-loss level." },
        takeProfit: { type: "STRING", description: "Suggested take-profit level." },
        positionSizeSuggestion: { type: "STRING", description: "Recommendation for position sizing based on volatility." }
      },
      required: ['entryPrice', 'stopLoss', 'takeProfit', 'positionSizeSuggestion']
    },
    explainableAI: {
      type: "OBJECT",
      properties: {
        reasoning: { type: "STRING", description: "Detailed, narrative-style reasoning for the entire analysis." },
        keyFactors: { type: "ARRAY", items: { type: "STRING" }, description: "Bulleted list of the most influential factors." }
      },
      required: ['reasoning', 'keyFactors']
    }
  },
  required: ['summary', 'confirmationChecklist', 'sentiment', 'generativeScenarios', 'riskManagement', 'explainableAI']
}, null, 2);

async function fileToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType
    },
  };
}

export const analyzeChart = async (imageBase64) => {
  try {
    // Models confirmed available for this key:
    // Prioritizing experimental/preview models (2.5) which might have fresh quota
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-exp-1206",
      "gemini-2.0-flash-lite-001",
      "gemini-2.0-flash",
      "gemini-1.5-flash"
    ];
    let lastError = null;

    const prompt = `You are a world-class AI Trading Co-Pilot. Analyze this trading chart image using advanced Smart Money Concepts (SMC), quantum-inspired pattern recognition, and real-time market sentiment. 
    Your analysis must be multi-dimensional and predictive. Your entire response MUST be a single, valid JSON object that adheres strictly to the following schema. Do not include any text, markdown, or explanations outside of the JSON object.

    JSON Schema:
    \`\`\`json
    ${jsonSchemaString}
    \`\`\`
    
    Analysis Instructions:
    1.  **Summary:** Provide a clear verdict (Bullish, Bearish, Neutral), a confidence score, and a concise explanation.
    2.  **Confirmation Checklist:** Evaluate the following items:
        - High-Timeframe Trend & Structure
        - Real-Time Sentiment Alignment (Use Google Search grounding to get this if possible, otherwise infer from chart context)
        - Key Level Confluence (Order Blocks, FVG)
        - Lower-Timeframe Market Structure Shift (MSS/CHoCH)
    3.  **Sentiment Analysis:** Determine market sentiment. Provide a score from -1.0 to 1.0 and a summary.
    4.  **Generative Scenarios:** Based on the current structure and sentiment, generate 3 plausible future scenarios (e.g., Bullish Continuation, Bearish Reversal) with probabilities.
    5.  **Dynamic Risk Management:** Suggest precise entry, stop-loss, and take-profit levels. Also provide a position sizing suggestion based on perceived volatility.
    6.  **Explainable AI (XAI):** In a detailed narrative, explain the reasoning behind your entire analysis. Pinpoint the specific SMC principles, patterns, and sentiment indicators that led to your conclusion. List the key determining factors.`;

    const imagePart = await fileToGenerativePart(imageBase64, "image/jpeg");

    const errors = [];
    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting analysis with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        let jsonString = text.trim();
        const jsonMatch = jsonString.match(/```(json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[2]) {
          jsonString = jsonMatch[2];
        }

        const parsedResult = JSON.parse(jsonString);
        const sources = [];
        return { result: parsedResult, sources };

      } catch (error) {
        console.warn(`Model ${modelName} failed:`, error.message);
        errors.push({ model: modelName, message: error.message });
      }
    }

    // If all models fail, prioritize showing a non-404 error if one exists (e.g. Quota Exceeded)
    // Otherwise show the first error or a summary.
    if (errors.length > 0) {
      const non404Error = errors.find(e => !e.message.includes('404') && !e.message.includes('not found'));
      if (non404Error) {
        throw new Error(`Model ${non404Error.model} failed: ${non404Error.message}`);
      }
      // If all are 404s, list them
      throw new Error(`All models failed. Details: ${errors.map(e => `${e.model}: ${e.message}`).join(', ')}`);
    }
  } catch (error) {
    console.error("Error analyzing chart with Gemini:", error);
    console.log("API Key present:", !!API_KEY);
    if (error instanceof SyntaxError) {
      throw new Error("The AI model returned an invalid response format. Please try again.");
    }
    throw new Error(`Failed to get analysis. Last error: ${error.message}. \n\nTIP: Your API Key might be invalid or missing permissions. Get a valid key here: https://aistudio.google.com/app/apikey`);
  }
};
