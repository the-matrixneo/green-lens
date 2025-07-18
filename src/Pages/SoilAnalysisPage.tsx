import React, { useState } from "react";
import {
  Beaker,
  Droplets,
  Thermometer,
  Zap,
  Leaf,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const SoilAnalysisPage: React.FC = () => {
  const { translate } = useLanguage();
  const [soilData, setSoilData] = useState({
    nitrogen: 45,
    phosphorus: 23,
    potassium: 67,
    ph: 6.8,
    moisture: 35,
    organicMatter: 2.8,
    temperature: 24,
  });

  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: number) => {
    setSoilData((prev) => ({ ...prev, [field]: value }));
  };

  const analyzeSoil = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/soil/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(soilData),
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Soil analysis error:", error);
      // Mock recommendations
      setRecommendations(generateMockRecommendations(soilData));
    } finally {
      setLoading(false);
    }
  };

  const generateMockRecommendations = (data: any) => {
    const fertilizers = [];

    if (data.nitrogen < 50) {
      fertilizers.push({
        type: "Urea",
        quantity: 25,
        unit: "kg/acre",
        timing: "Before sowing",
        cost: 750,
        organic: false,
        reason: "Low nitrogen levels detected",
      });
    }

    if (data.phosphorus < 30) {
      fertilizers.push({
        type: "DAP (Diammonium Phosphate)",
        quantity: 15,
        unit: "kg/acre",
        timing: "At sowing",
        cost: 900,
        organic: false,
        reason: "Phosphorus deficiency",
      });
    }

    if (data.potassium < 60) {
      fertilizers.push({
        type: "Muriate of Potash",
        quantity: 20,
        unit: "kg/acre",
        timing: "Split application",
        cost: 600,
        organic: false,
        reason: "Potassium levels below optimal",
      });
    }

    // Organic alternatives
    fertilizers.push({
      type: "Vermicompost",
      quantity: 500,
      unit: "kg/acre",
      timing: "Before sowing",
      cost: 2500,
      organic: true,
      reason: "Improve soil structure and organic matter",
    });

    return {
      soilHealth: data.ph >= 6.0 && data.ph <= 7.5 ? "Good" : "Needs Attention",
      fertilizers,
      organicMatter: data.organicMatter < 3 ? "Low - Add compost" : "Adequate",
      recommendations: [
        "Apply lime if pH is below 6.0",
        "Increase organic matter through composting",
        "Consider crop rotation with legumes",
        "Maintain proper drainage",
      ],
    };
  };

  const getSoilHealthColor = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return "text-green-600 bg-green-100";
    if (value < min * 0.8 || value > max * 1.2)
      return "text-red-600 bg-red-100";
    return "text-yellow-600 bg-yellow-100";
  };

  const soilParameters = [
    {
      key: "nitrogen",
      label: "Nitrogen (N)",
      icon: Leaf,
      unit: "kg/ha",
      min: 40,
      max: 80,
      color: "#10b981",
    },
    {
      key: "phosphorus",
      label: "Phosphorus (P)",
      icon: Zap,
      unit: "kg/ha",
      min: 20,
      max: 50,
      color: "#f59e0b",
    },
    {
      key: "potassium",
      label: "Potassium (K)",
      icon: TrendingUp,
      unit: "kg/ha",
      min: 50,
      max: 100,
      color: "#8b5cf6",
    },
    {
      key: "ph",
      label: "pH Level",
      icon: Beaker,
      unit: "",
      min: 6.0,
      max: 7.5,
      color: "#06b6d4",
    },
    {
      key: "moisture",
      label: "Moisture",
      icon: Droplets,
      unit: "%",
      min: 25,
      max: 45,
      color: "#3b82f6",
    },
    {
      key: "organicMatter",
      label: "Organic Matter",
      icon: Leaf,
      unit: "%",
      min: 2.5,
      max: 5.0,
      color: "#22c55e",
    },
    {
      key: "temperature",
      label: "Soil Temperature",
      icon: Thermometer,
      unit: "°C",
      min: 20,
      max: 30,
      color: "#ef4444",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4 animate-slideInLeft">
            Soil Analysis & Fertilizer Recommendation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideInRight">
            Analyze your soil composition and get AI-powered fertilizer
            recommendations for optimal crop growth
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Soil Parameters Input */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInLeft">
              <h2 className="text-xl font-semibold font-display text-gray-900 mb-6 flex items-center">
                <Beaker className="w-6 h-6 mr-2 text-green-600" />
                Soil Parameters
              </h2>

              <div className="space-y-6">
                {soilParameters.map((param) => (
                  <div key={param.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <param.icon
                          className="w-4 h-4"
                          style={{ color: param.color }}
                        />
                        <span>{param.label}</span>
                      </label>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSoilHealthColor(
                          soilData[param.key as keyof typeof soilData],
                          param.min,
                          param.max
                        )}`}
                      >
                        {soilData[param.key as keyof typeof soilData]}
                        {param.unit}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="range"
                        min={param.min * 0.5}
                        max={param.max * 1.5}
                        step={param.key === "ph" ? 0.1 : 1}
                        value={soilData[param.key as keyof typeof soilData]}
                        onChange={(e) =>
                          handleInputChange(
                            param.key,
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, ${param.color}20 0%, ${param.color} 50%, ${param.color}20 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {param.min}
                          {param.unit}
                        </span>
                        <span>Optimal</span>
                        <span>
                          {param.max}
                          {param.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={analyzeSoil}
                disabled={loading}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold font-display rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all duration-200 shadow-lg hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  "Analyze Soil & Get Recommendations"
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {recommendations && (
              <>
                {/* Soil Health Status */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight">
                  <h3 className="text-lg font-semibold font-display text-gray-900 mb-4 flex items-center">
                    {recommendations.soilHealth === "Good" ? (
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                    )}
                    Soil Health Status
                  </h3>

                  <div
                    className={`p-4 rounded-xl ${
                      recommendations.soilHealth === "Good"
                        ? "bg-green-50 border border-green-200"
                        : "bg-yellow-50 border border-yellow-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`font-medium ${
                          recommendations.soilHealth === "Good"
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {recommendations.soilHealth}
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-2 ${
                        recommendations.soilHealth === "Good"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      Organic Matter: {recommendations.organicMatter}
                    </p>
                  </div>
                </div>

                {/* Fertilizer Recommendations */}
                <div
                  className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="text-lg font-semibold font-display text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    Fertilizer Recommendations
                  </h3>

                  <div className="space-y-4">
                    {recommendations.fertilizers.map(
                      (fertilizer: any, index: number) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border ${
                            fertilizer.organic
                              ? "bg-green-50 border-green-200"
                              : "bg-blue-50 border-blue-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {fertilizer.type}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {fertilizer.organic && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  Organic
                                </span>
                              )}
                              <span className="font-semibold text-gray-900">
                                ₹{fertilizer.cost}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Quantity:</span>{" "}
                              {fertilizer.quantity} {fertilizer.unit}
                            </div>
                            <div>
                              <span className="font-medium">Timing:</span>{" "}
                              {fertilizer.timing}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mt-2 italic">
                            {fertilizer.reason}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-700">
                        Total Estimated Cost
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      ₹
                      {recommendations.fertilizers.reduce(
                        (sum: number, f: any) => sum + f.cost,
                        0
                      )}
                    </div>
                    <p className="text-sm text-green-600">per acre</p>
                  </div>
                </div>

                {/* General Recommendations */}
                <div
                  className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="text-lg font-semibold font-display text-gray-900 mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-green-600" />
                    General Recommendations
                  </h3>

                  <ul className="space-y-2">
                    {recommendations.recommendations.map(
                      (rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysisPage;
