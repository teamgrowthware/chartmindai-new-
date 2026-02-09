
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAECzFVnz_a3Tj9rF61qIXaEGjY5g6p6_w";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  console.log("Checking available models for this API Key...");
  try {
    // This requires the 'model' parameter to be empty or getting the model manager
    // The SDK exposes it via getGenerativeModel usually, but let's try accessing the model list.
    // Actually, strictly speaking, the SDK doesn't have a simple 'listModels' helper exposed on the main class 
    // in all versions, but we can try to just run a generation implementation that we know prints a specific error 
    // OR we can rely on the error message we already got which said "Call ListModels".

    // NOTE: The Node.js SDK (v0.1+) doesn't always expose listModels directly in the high-level entry point 
    // conveniently without digging into the underlying manager. 
    // However, for debugging, let's try a direct REST call if SDK fails, but let's try SDK first if possible.
    // Wait, the error message from the user's previous run technically *was* the result of a call.

    // Let's try a direct fetch to the API endpoint to be 100% sure and independent of SDK quirks.
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("API Returned Error:", JSON.stringify(data.error, null, 2));
    } else if (data.models) {
      console.log("SUCCESS! Found models:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`- ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log("No models found or unexpected response:", data);
    }

  } catch (error) {
    console.error("Script failed:", error.message);
  }
}

listModels();
