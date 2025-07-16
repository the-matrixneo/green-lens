import express from "express";
import { getWeatherData } from "../services/weatherService.js";

const router = express.Router();

router.get("/current/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const weatherData = await getWeatherData(location);

    res.json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({
      error: "Failed to fetch weather data",
      message: error.message,
    });
  }
});

export { router as weatherRouter };
