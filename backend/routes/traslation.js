import express from "express";
import { translateText } from "../services/translationService.js";

const router = express.Router();

router.post("/translate", async (req, res) => {
  try {
    const { text, targetLang = "hi" } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required for translation",
      });
    }

    const translatedText = await translateText(text, targetLang);

    res.json({
      success: true,
      originalText: text,
      translatedText: translatedText,
      targetLanguage: targetLang,
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({
      error: "Translation failed",
      message: error.message,
      translatedText: text,
    });
  }
});

export { router as translationRouter };
