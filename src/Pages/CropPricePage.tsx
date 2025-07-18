import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  MapPin,
  Wheat,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { CROP_NAMES } from "../constants/languages";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CropPricePage: React.FC = () => {
  const { currentLanguage, translate } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("bajra");
  const [priceData, setPriceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<any>(null);

  const crops = [
    { id: "bajra", name: "Pearl Millet", emoji: "🌾", color: "#10b981" },
    { id: "jowar", name: "Sorghum", emoji: "🌾", color: "#f59e0b" },
    { id: "sugarcane", name: "Sugarcane", emoji: "🎋", color: "#06b6d4" },
    { id: "arhar", name: "Pigeon Pea", emoji: "🫘", color: "#8b5cf6" },
    { id: "moong", name: "Green Gram", emoji: "🫛", color: "#22c55e" },
    { id: "paddy", name: "Rice", emoji: "🌾", color: "#eab308" },
    { id: "ragi", name: "Finger Millet", emoji: "🌾", color: "#dc2626" },
    { id: "urad", name: "Black Gram", emoji: "🫘", color: "#374151" },
    { id: "masoor", name: "Lentil", emoji: "🫘", color: "#f97316" },
    { id: "maize", name: "Corn", emoji: "🌽", color: "#facc15" },
    { id: "jute", name: "Jute", emoji: "🌿", color: "#16a34a" },
    { id: "cotton", name: "Cotton", emoji: "🌸", color: "#f8fafc" },
    { id: "coconut", name: "Coconut", emoji: "🥥", color: "#92400e" },
  ];

  const fetchPriceData = async (cropId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/prices/predict/${cropId}`
      );
      const data = await response.json();
      setPriceData(data.historical);
      setForecast(data.forecast);
    } catch (error) {
      console.error("Error fetching price data:", error);
      // Mock data for demonstration
      const mockData = generateMockPriceData(cropId);
      setPriceData(mockData.historical);
      setForecast(mockData.forecast);
    } finally {
      setLoading(false);
    }
  };

  const generateMockPriceData = (cropId: string) => {
    const basePrice = Math.random() * 2000 + 1000;
    const historical = [];
    const forecast = [];

    // Generate 30 days of historical data
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = (Math.random() - 0.5) * 200;
      historical.push({
        date: date.toISOString().split("T")[0],
        price: Math.max(basePrice + variation, 500),
        market: "APMC Market",
        volume: Math.floor(Math.random() * 1000) + 100,
      });
    }

    // Generate 30 days of forecast data
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const trend = Math.sin(i / 10) * 100;
      const variation = (Math.random() - 0.5) * 150;
      forecast.push({
        date: date.toISOString().split("T")[0],
        price: Math.max(basePrice + trend + variation, 500),
        confidence: Math.random() * 0.3 + 0.7,
      });
    }

    return { historical, forecast };
  };

  useEffect(() => {
    fetchPriceData(selectedCrop);
  }, [selectedCrop]);

  const chartData = {
    labels: priceData
      ? [
          ...priceData.map((d: any) => new Date(d.date).toLocaleDateString()),
          ...(forecast || []).map((d: any) =>
            new Date(d.date).toLocaleDateString()
          ),
        ]
      : [],
    datasets: [
      {
        label: "Historical Prices",
        data: priceData ? priceData.map((d: any) => d.price) : [],
        borderColor:
          crops.find((c) => c.id === selectedCrop)?.color || "#10b981",
        backgroundColor: `${
          crops.find((c) => c.id === selectedCrop)?.color || "#10b981"
        }20`,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Price Forecast",
        data:
          priceData && forecast
            ? [
                ...new Array(priceData.length).fill(null),
                ...forecast.map((d: any) => d.price),
              ]
            : [],
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b20",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${
          crops.find((c) => c.id === selectedCrop)?.name
        } Price Trend & Forecast`,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `₹${context.parsed.y.toFixed(2)}/quintal`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Price (₹/quintal)",
        },
      },
    },
  };

  const currentPrice = priceData ? priceData[priceData.length - 1]?.price : 0;
  const previousPrice =
    priceData && priceData.length > 1
      ? priceData[priceData.length - 2]?.price
      : 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice
    ? (priceChange / previousPrice) * 100
    : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4 animate-slideInLeft">
            Crop Price Prediction
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideInRight">
            Real-time market prices and AI-powered forecasts for major crops
            across India
          </p>
        </div>

        {/* Crop Selection */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 mb-8 shadow-lg animate-fadeInUp">
          <h2 className="text-xl font-semibold font-display text-gray-900 mb-4 flex items-center">
            <Wheat className="w-6 h-6 mr-2 text-green-600" />
            Select Crop
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  selectedCrop === crop.id
                    ? "border-green-500 bg-green-50 shadow-lg"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                }`}
              >
                <div className="text-3xl mb-2">{crop.emoji}</div>
                <div className="text-sm font-medium text-gray-900">
                  {CROP_NAMES[currentLanguage.code]?.[crop.id] || crop.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Price Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInLeft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold font-display text-gray-900">
                  Price Trend & Forecast
                </h2>
                {loading && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                    <span className="text-sm">Loading...</span>
                  </div>
                )}
              </div>

              {priceData && (
                <div className="h-96">
                  <Line data={chartData} options={chartOptions} />
                </div>
              )}
            </div>
          </div>

          {/* Price Stats */}
          <div className="space-y-6">
            {/* Current Price */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold font-display text-gray-900">
                  Current Price
                </h3>
                <div className="text-2xl">
                  {crops.find((c) => c.id === selectedCrop)?.emoji}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-3xl font-bold font-display gradient-text">
                    ₹{currentPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-600">/quintal</span>
                </div>

                <div
                  className={`flex items-center space-x-2 ${
                    priceChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {priceChange >= 0 ? "+" : ""}₹{priceChange.toFixed(2)} (
                    {priceChangePercent.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Market Info */}
            <div
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                Market Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">APMC Market, Delhi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    Last Updated: {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wheat className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    Volume: {Math.floor(Math.random() * 1000) + 100} quintals
                  </span>
                </div>
              </div>
            </div>

            {/* Price Alerts */}
            <div
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 p-6 shadow-lg animate-slideInRight"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                Price Alerts
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-yellow-700">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Price expected to rise by 5-8% next week
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Good time to sell - above average price
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Monsoon may affect prices in 2 weeks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Table */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-fadeInUp">
          <h2 className="text-xl font-semibold font-display text-gray-900 mb-6">
            30-Day Price Forecast
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Predicted Price
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Confidence
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {forecast?.slice(0, 10).map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-green-50/50"
                  >
                    <td className="py-3 px-4">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${item.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {(item.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {index > 0 && forecast[index - 1] ? (
                        item.price > forecast[index - 1].price ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )
                      ) : (
                        <div className="w-4 h-4"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPricePage;
