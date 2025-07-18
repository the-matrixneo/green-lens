import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Share2,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { useResults } from "../context/ResultsContext";

const ResultsPage = () => {
  const { results } = useResults();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullRemedies, setShowFullRemedies] = useState(false);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No results found
          </h2>
          <Link
            to="/upload"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Upload New Image
          </Link>
        </div>
      </div>
    );
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-100";
    if (confidence >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/upload"
            className="inline-flex items-center px-4 py-2 text-green-600 hover:text-green-700 font-medium font-display transition-colors hover:scale-105 animate-slideInLeft"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Upload New Image
          </Link>

          <div className="flex space-x-3 animate-slideInRight">
            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors hover:scale-110">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors hover:scale-110">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Original Image */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInLeft relative overflow-hidden">
              <div className="absolute top-2 right-2 text-xl animate-float">
                🌿
              </div>
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                Original Image
              </h3>
              <img
                src={results.originalImage}
                alt="Original plant"
                className="w-full rounded-xl shadow-md animate-float"
              />
            </div>

            {/* Heatmap */}
            <div
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInLeft relative overflow-hidden"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-2 right-2 text-xl animate-pulse-slow">
                🔥
              </div>
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                AI Analysis Heatmap
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Red areas indicate regions affected by the disease
              </p>
              <img
                src={results.heatmapUrl}
                alt="Disease heatmap"
                className="w-full rounded-xl shadow-md animate-pulse-slow"
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Disease Detection */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight relative overflow-hidden">
              <div className="absolute top-2 right-2 text-xl animate-bounce-slow">
                🦠
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold font-display text-gray-900">
                  Disease Detected
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(
                    results.confidence
                  )}`}
                >
                  {results.confidence}% Confidence
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full animate-pulse-slow">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-display gradient-text">
                    {results.disease}
                  </h4>
                  <p className="text-gray-600">Fungal Disease</p>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-5 h-5 text-green-600 animate-pulse-slow" />
                    <span className="font-medium font-display text-gray-900">
                      Audio Explanation
                    </span>
                  </div>
                  <button
                    onClick={toggleAudio}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium font-display rounded-lg hover:bg-green-700 transition-colors hover:scale-105"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Listen to detailed explanation and remedies in your preferred
                  language
                </p>
              </div>
            </div>

            {/* Weather Risk */}
            <div
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight relative overflow-hidden"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-2 right-2 text-xl animate-sway">
                ☁️
              </div>
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                Weather Risk Assessment
              </h3>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Current Risk Level</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
                    results.weatherRisk
                  )}`}
                >
                  {results.weatherRisk} Risk
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg animate-float">
                  <Thermometer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium font-display text-gray-900">
                    24°C
                  </div>
                  <div className="text-xs text-gray-600">Temperature</div>
                </div>
                <div
                  className="text-center p-3 bg-cyan-50 rounded-lg animate-float"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Droplets className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <div className="text-sm font-medium font-display text-gray-900">
                    78%
                  </div>
                  <div className="text-xs text-gray-600">Humidity</div>
                </div>
                <div
                  className="text-center p-3 bg-gray-50 rounded-lg animate-float"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Wind className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm font-medium font-display text-gray-900">
                    12 km/h
                  </div>
                  <div className="text-xs text-gray-600">Wind</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  {results.weatherAdvice}
                </p>
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight relative overflow-hidden"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="absolute top-2 right-2 text-xl animate-bloom">
                💊
              </div>
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                Treatment Recommendations
              </h3>

              <div className="prose prose-sm max-w-none">
                <div
                  className={`${
                    showFullRemedies ? "" : "line-clamp-6"
                  } text-gray-700 whitespace-pre-line`}
                >
                  {results.remedies}
                </div>

                <button
                  onClick={() => setShowFullRemedies(!showFullRemedies)}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium font-display text-sm hover:scale-105 transition-transform"
                >
                  {showFullRemedies ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link
                to="/upload"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold font-display rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:scale-105 animate-shimmer"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Analyze Another Plant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
