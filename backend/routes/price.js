import express from "express";
import {
  predictCropPrice,
  getHistoricalPrices,
} from "../services/priceService.js";

const router = express.Router();

router.get("/predict/:cropId", async (req, res) => {
  try {
    const { cropId } = req.params;
    const { location = "Delhi" } = req.query;

    console.log(`🌾 Predicting prices for ${cropId} in ${location}`);

    const prediction = await predictCropPrice(cropId, location);

    res.json({
      success: true,
      crop: cropId,
      location: location,
      historical: prediction.historical,
      forecast: prediction.forecast,
      insights: prediction.insights,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Price prediction error:", error);
    res.status(500).json({
      error: "Failed to predict crop prices",
      message: error.message,
    });
  }
});

router.get("/historical/:cropId", async (req, res) => {
  try {
    const { cropId } = req.params;
    const { days = 30 } = req.query;

    const historicalData = await getHistoricalPrices(cropId, parseInt(days));

    res.json({
      success: true,
      crop: cropId,
      data: historicalData,
      period: `${days} days`,
    });
  } catch (error) {
    console.error("Historical price error:", error);
    res.status(500).json({
      error: "Failed to fetch historical prices",
      message: error.message,
    });
  }
});

export { router as pricesRouter };
