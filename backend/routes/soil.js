import express from "express";
import {
  analyzeSoilData,
  getFertilizerRecommendations,
} from "../services/soilService.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const soilData = req.body;

    console.log("🧪 Analyzing soil data:", soilData);

    const requiredFields = [
      "nitrogen",
      "phosphorus",
      "potassium",
      "ph",
      "moisture",
      "organicMatter",
    ];
    for (const field of requiredFields) {
      if (soilData[field] === undefined || soilData[field] === null) {
        return res.status(400).json({
          error: `Missing required field: ${field}`,
        });
      }
    }

    const analysis = await analyzeSoilData(soilData);
    const recommendations = await getFertilizerRecommendations(
      soilData,
      analysis
    );

    res.json({
      success: true,
      soilHealth: analysis.soilHealth,
      nutrientLevels: analysis.nutrientLevels,
      fertilizers: recommendations.fertilizers,
      organicMatter: analysis.organicMatter,
      recommendations: recommendations.generalAdvice,
      totalCost: recommendations.totalCost,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Soil analysis error:", error);
    res.status(500).json({
      error: "Soil analysis failed",
      message: error.message,
    });
  }
});

router.post("/fertilizer/:cropType", async (req, res) => {
  try {
    const { cropType } = req.params;
    const soilData = req.body;

    const recommendations = await getFertilizerRecommendations(
      soilData,
      null,
      cropType
    );

    res.json({
      success: true,
      crop: cropType,
      recommendations: recommendations,
    });
  } catch (error) {
    console.error("Fertilizer recommendation error:", error);
    res.status(500).json({
      error: "Failed to get fertilizer recommendations",
      message: error.message,
    });
  }
});

export { router as soilRouter };
