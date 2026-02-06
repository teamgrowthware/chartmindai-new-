import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, GroundingSource } from "../../types";

// ❗ NEVER expose API keys in frontend — move this to backend before deployment.
const API_KEY = "AIzaSyDqVjhCcdPfBm_toqV8CZV7vIACVzPzfHo";
if (!API_KEY) throw new Error("API_KEY environment variable is not set");

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      properties: {
        verdict: { type: Type.STRING, enum: ["Bullish", "Bearish", "Neutral"] },
        confidence: { type: Type.NUMBER },
        explanation: { type: Type.STRING }
      },
      required: ["verdict", "confidence", "explanation"]
    },
    confirmationChecklist: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          item: { type: Type.STRING },
          confirmed: { type: Type.BOOLEAN },
          explanation: { type: Type.STRING }
        },
        required: ["item", "confirmed", "explanation"]
      }
    },
    sentiment: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        summary: { type: Type.STRING }
      },
      required: ["score", "summary"]
    },
    generativeScenarios: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          scenario: {
            type: Type.STRING,
            enum: [
              "Bullish Continuation",
              "Bearish Reversal",
              "Range-bound",
              "Bullish Reversal",
              "Bearish Continuation"
            ]
          },
          probability: { type: Type.NUMBER },
          description: { type: Type.STRING }
        },
        required: ["scenario", "probability", "description"]
      }
    },
    riskManagement: {
      type: Type.OBJECT,
      properties: {
        entryPrice: { type: Type.STRING },
        stopLoss: { type: Type.STRING },
        takeProfit: { type: Type.STRING },
        positionSizeSuggestion: { type: Type.STRING }
      },
      required: [
        "entryPrice",
        "stopLoss",
        "takeProfit",
        "positionSizeSuggestion"
      ]
    },
    explainableAI: {
      type: Type.OBJECT,
      properties: {
        reasoning: { type: Type.STRING },
        keyFactors: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["reasoning", "keyFactors"]
    }
  },
  required: [
    "summary",
    "confirmationChecklist",
    "sentiment",
    "generativeScenarios",
    "riskManagement",
    "explainableAI"
  ]
};

const fileToGenerativePart = (base64: string, mimeType: string) => ({
  inlineData: { data: base64, mimeType }
});

/* ------------------------------------------------------------------------------------
   MAIN FUNCTION  — analyzeChart(imageBase64)
------------------------------------------------------------------------------------ */

export const analyzeChart = async (
  imageBase64: string
): Promise<{ result: AnalysisResult; sources: GroundingSource[] }> => {
  let response: GenerateContentResponse | null = null;

  try {
    const imagePart = fileToGenerativePart(imageBase64, "image/jpeg");
    const schemaText = JSON.stringify(responseSchema, null, 2);

    const promptText = {
      text: `
You are a world-class AI Trading Co-Pilot. Analyze this trading chart image using Smart Money Concepts (SMC), pattern recognition, and real-time sentiment.

Your entire output MUST be a single JSON object following this schema:

\`\`\`json
${schemaText}
\`\`\`

Follow these instructions:
1. Summary → verdict, confidence, explanation  
2. Confirmation → trends, sentiment, confluence, MS shift  
3. Sentiment → grounded Google Search sentiment  
4. Scenarios → 3 predictive scenarios  
5. Risk → entry, SL, TP, position size  
6. Explainable AI → detailed reasoning + key factors  
`
    };

    response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, promptText] },
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    /* --------------------------------------------------------------------------
        FIX — Extract text correctly (Gemini has no response.text)
    -------------------------------------------------------------------------- */

    const rawText =
      response?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text || "")
        .join(" ")
        .trim() || "";

    if (!rawText) {
      console.error("Empty GPT response:", JSON.stringify(response, null, 2));
      throw new Error("The AI model returned an empty or invalid response.");
    }

    let jsonString = rawText;

    // Remove markdown ```json blocks if present
    const jsonMatch = rawText.match(/```(json)?\s*([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[2]) {
      jsonString = jsonMatch[2];
    }

    const result: AnalysisResult = JSON.parse(jsonString);

    // Grounding Sources
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => chunk);

    return { result, sources };
  } catch (error: any) {
    console.error("Error analyzing chart:", error);

    if (error instanceof SyntaxError) {
      console.error("Invalid JSON from Gemini:", response);
      throw new Error("The AI returned malformed JSON. Please try again.");
    }

    if (error?.message?.includes("400")) {
      throw new Error("Invalid image or request format. Try a different image.");
    }

    throw new Error("AI model failed. Please try again later.");
  }
};
