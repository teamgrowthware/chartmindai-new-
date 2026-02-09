
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAECzFVnz_a3Tj9rF61qIXaEGjY5g6p6_w";

const genAI = new GoogleGenerativeAI(API_KEY);

async function testModel(modelName) {
  console.log(`\n--- Testing ${modelName} ---`);
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = "Explain how AI works in one sentence.";

    console.log("Sending request...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("SUCCESS!");
    console.log("Response:", text);
    return true;
  } catch (error) {
    console.error("FAILED:", error.message);
    return false;
  }
}

async function run() {
  console.log("Starting connectivity test...");

  // Try gemini-pro first as it's the most likely to exist if 1.5 fails
  await testModel("gemini-pro");
  // Then try 1.5 again just to see the error clearly
  await testModel("gemini-1.5-flash");
}

run();
