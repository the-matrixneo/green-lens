import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { diseaseDetectionRouter } from "./routes/detection.js";
import { weatherRouter } from "./routes/weather.js";
import { ttsRouter } from "./routes/tts.js";
import { translationRouter } from "./routes/translation.js";
import { pricesRouter } from "./routes/prices.js";
import { soilRouter } from "./routes/soil.js";
import { authRouter } from "./routes/auth.js";
import { subscriptionRouter } from "./routes/subscription.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:8000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/static", express.static(path.join(__dirname, "static")));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

app.use("/api/auth", authRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/detection", upload.single("image"), diseaseDetectionRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/tts", ttsRouter);
app.use("/api", translationRouter);
app.use("/api/prices", pricesRouter);
app.use("/api/soil", soilRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    error: "Internal server error",
    message: error.message,
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(` GreenLens Backend running on http://localhost:${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
});
