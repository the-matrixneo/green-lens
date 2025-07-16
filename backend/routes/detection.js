import express from "express";
import { processPlantImage } from "../services/aiService.js";
import { generateRemedies } from "../services/llmService.js";
import { getWeatherAdvice } from "../services/weatherService.js";
import { generateTTS } from "../services/ttsService.js";

const router = express.Router();

// Main disease detection endpoint
router.post("/predict", async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No image file provided",
      });
    }

    const imageBuffer = req.file.buffer;
    const location = req.body.location || "New York";

    console.log("🔍 Processing plant disease detection...");

    console.log("🤖 Running AI disease detection...");
    const aiResults = await processPlantImage(imageBuffer);

    console.log("🔥 Generating Grad-CAM heatmap...");
    const heatmapUrl = aiResults.heatmapUrl;

    console.log("🧠 Generating remedies with Gemini LLM...");
    const remedies = await generateRemedies(
      aiResults.disease,
      aiResults.confidence
    );

    console.log("☁️ Fetching weather data and advice...");
    const weatherData = await getWeatherAdvice(location, aiResults.disease);

    const fullResponse = `
Disease Detected: ${aiResults.disease} with ${aiResults.confidence}% confidence.

${remedies}

Weather Advisory: ${weatherData.advice}
Current conditions: Temperature ${weatherData.temperature}°C, Humidity ${weatherData.humidity}%, ${weatherData.condition}.
Risk Level: ${weatherData.riskLevel}
    `.trim();

    console.log("🔊 Generating text-to-speech audio...");
    const audioUrl = await generateTTS(fullResponse, "en");

    const response = {
      success: true,
      disease: aiResults.disease,
      confidence: aiResults.confidence,
      heatmapUrl: heatmapUrl,
      remedies: remedies,
      weather: {
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        condition: weatherData.condition,
        riskLevel: weatherData.riskLevel,
        advice: weatherData.advice,
      },
      audioUrl: audioUrl,
      timestamp: new Date().toISOString(),
    };

    console.log(" Disease detection completed successfully");
    res.json(response);
  } catch (error) {
    console.error(" Error in disease detection:", error);
    res.status(500).json({
      error: "Disease detection failed",
      message: error.message,
    });
  }
});

export { router as diseaseDetectionRouter };
