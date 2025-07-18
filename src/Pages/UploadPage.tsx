import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Camera,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useResults } from "../context/ResultsContext";
import { detectDisease } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setResults } = useResults();
  const { translate } = useLanguage();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const simulateAnalysis = async () => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await detectDisease(selectedFile!, "New York");

      const results = {
        disease: response.disease,
        confidence: response.confidence,
        heatmapUrl: response.heatmapUrl,
        originalImage: preview!,
        remedies: response.remedies,
        weatherRisk: response.weather.riskLevel,
        weatherAdvice: response.weather.advice,
        audioUrl: response.audioUrl,
        weather: response.weather,
      };

      setResults(results);
      navigate("/results");
    } catch (error) {
      console.error("Disease detection failed:", error);
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4 animate-slideInLeft">
            Plant Disease Detection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slideInRight">
            Upload a clear image of your plant leaf to get instant AI-powered
            disease detection and treatment recommendations
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-green-100 p-8 shadow-xl animate-fadeInUp relative overflow-hidden">
          <div className="absolute top-4 left-4 text-2xl animate-float">🌿</div>
          <div className="absolute top-4 right-4 text-2xl animate-sway">🍃</div>
          <div className="absolute bottom-4 left-4 text-2xl animate-bounce-slow">
            🌱
          </div>
          <div className="absolute bottom-4 right-4 text-2xl animate-float">
            🌸
          </div>

          {!preview ? (
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
                dragActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse-slow">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold font-display text-gray-900 mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse from your device
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium font-display rounded-xl hover:bg-green-700 transition-colors hover:scale-105"
                  >
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Choose File
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 font-medium font-display rounded-xl hover:bg-green-50 transition-colors hover:scale-105"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Take Photo
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative animate-fadeInUp">
                <img
                  src={preview}
                  alt="Selected plant"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg animate-float"
                />
                <button
                  onClick={clearSelection}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                  <CheckCircle className="w-6 h-6 animate-pulse-slow" />
                  <span className="font-medium font-display">
                    Image ready for analysis
                  </span>
                </div>

                <button
                  onClick={simulateAnalysis}
                  disabled={isUploading}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold font-display rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg animate-shimmer"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Plant"
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-5 h-5 animate-bounce-slow" />
                <span className="font-medium font-display">{error}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100 animate-slideInLeft hover:scale-105 transition-transform">
            <h3 className="font-semibold font-display text-gray-900 mb-3">
              📸 Photo Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Use good lighting</li>
              <li>• Focus on affected areas</li>
              <li>• Avoid blurry images</li>
            </ul>
          </div>

          <div
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100 animate-fadeInUp hover:scale-105 transition-transform"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="font-semibold font-display text-gray-900 mb-3">
              🔍 Best Results
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Single leaf images work best</li>
              <li>• Show symptoms clearly</li>
              <li>• Avoid multiple plants</li>
            </ul>
          </div>

          <div
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100 animate-slideInRight hover:scale-105 transition-transform"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="font-semibold font-display text-gray-900 mb-3">
              ⚡ Fast Processing
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Results in under 3 seconds</li>
              <li>• 95%+ accuracy rate</li>
              <li>• 50+ disease types detected</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
