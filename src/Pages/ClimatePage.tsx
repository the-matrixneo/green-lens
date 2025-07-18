import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import { format, addDays } from "date-fns";

const ClimateToolsPage: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [location, setLocation] = useState("New Delhi");
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/weather/current/${location}`
      );
      const data = await response.json();
      setCurrentWeather(data.data);

      // Generate mock forecast data
      const mockForecast = generateMockForecast();
      setForecast(mockForecast);

      // Generate weather alerts
      const weatherAlerts = generateWeatherAlerts(data.data, mockForecast);
      setAlerts(weatherAlerts);
    } catch (error) {
      console.error("Weather fetch error:", error);
      // Use mock data
      const mockWeather = {
        location: location,
        temperature: 28,
        humidity: 65,
        condition: "Partly cloudy",
        windSpeed: 15,
        pressure: 1013,
        uvIndex: 6,
      };
      setCurrentWeather(mockWeather);
      setForecast(generateMockForecast());
      setAlerts(generateWeatherAlerts(mockWeather, generateMockForecast()));
    } finally {
      setLoading(false);
    }
  };

  const generateMockForecast = () => {
    const conditions = [
      "Sunny",
      "Partly cloudy",
      "Cloudy",
      "Light rain",
      "Heavy rain",
      "Thunderstorm",
    ];
    const icons = ["☀️", "⛅", "☁️", "🌦️", "🌧️", "⛈️"];

    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(new Date(), i + 1);
      const conditionIndex = Math.floor(Math.random() * conditions.length);
      const baseTemp = 25 + Math.random() * 10;

      return {
        date: format(date, "yyyy-MM-dd"),
        condition: conditions[conditionIndex],
        icon: icons[conditionIndex],
        temperature: {
          min: Math.round(baseTemp - 5),
          max: Math.round(baseTemp + 5),
        },
        humidity: Math.round(50 + Math.random() * 40),
        rainfall: Math.random() * 20,
        windSpeed: Math.round(5 + Math.random() * 20),
      };
    });
  };

  const generateWeatherAlerts = (current: any, forecast: any[]) => {
    const alerts = [];

    // High humidity alert
    if (current.humidity > 80) {
      alerts.push({
        type: "warning",
        title: "High Humidity Alert",
        message: `Humidity at ${current.humidity}% increases fungal disease risk. Improve ventilation and reduce watering.`,
        severity: 3,
        icon: "💧",
      });
    }

    // Temperature alert
    if (current.temperature > 35) {
      alerts.push({
        type: "danger",
        title: "Heat Stress Warning",
        message: `Temperature at ${current.temperature}°C may stress crops. Increase watering and provide shade.`,
        severity: 4,
        icon: "🌡️",
      });
    }

    // Rain forecast alert
    const rainDays = forecast.filter((day) => day.rainfall > 10).length;
    if (rainDays >= 3) {
      alerts.push({
        type: "info",
        title: "Heavy Rain Expected",
        message: `${rainDays} days of heavy rain forecasted. Prepare drainage and protect crops.`,
        severity: 2,
        icon: "🌧️",
      });
    }

    // Wind alert
    if (current.windSpeed > 25) {
      alerts.push({
        type: "warning",
        title: "Strong Wind Alert",
        message: `Wind speed at ${current.windSpeed} km/h may damage crops. Secure support structures.`,
        severity: 3,
        icon: "💨",
      });
    }

    return alerts;
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const getWeatherIcon = (condition: string) => {
    const iconMap: Record<string, string> = {
      sunny: "☀️",
      clear: "☀️",
      "partly cloudy": "⛅",
      cloudy: "☁️",
      overcast: "☁️",
      "light rain": "🌦️",
      rain: "🌧️",
      "heavy rain": "🌧️",
      thunderstorm: "⛈️",
      snow: "❄️",
      fog: "🌫️",
    };

    return iconMap[condition.toLowerCase()] || "⛅";
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "danger":
        return "bg-red-50 border-red-200 text-red-700";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4 animate-slideInLeft">
            Climate Tools & Weather Monitoring
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideInRight">
            Real-time weather data, forecasts, and climate-based agricultural
            insights
          </p>
        </div>

        {/* Location Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-100 p-4 shadow-lg animate-fadeInUp">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Location:
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              <button
                onClick={fetchWeatherData}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 animate-fadeInUp">
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              Weather Alerts
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${getAlertColor(
                    alert.type
                  )} animate-slideInLeft`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{alert.icon}</span>
                    <div>
                      <h3 className="font-semibold mb-1">{alert.title}</h3>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInLeft">
              <h2 className="text-xl font-semibold font-display text-gray-900 mb-6 flex items-center">
                <Cloud className="w-6 h-6 mr-2 text-green-600" />
                Current Weather
              </h2>

              {currentWeather && (
                <div className="space-y-6">
                  {/* Main Weather Display */}
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-float">
                      {getWeatherIcon(currentWeather.condition)}
                    </div>
                    <div className="text-4xl font-bold font-display gradient-text mb-2">
                      {currentWeather.temperature}°C
                    </div>
                    <div className="text-gray-600 capitalize">
                      {currentWeather.condition}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {currentWeather.location}
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 animate-pulse-slow">
                      <div className="flex items-center space-x-2 mb-1">
                        <Droplets className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Humidity
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-blue-700">
                        {currentWeather.humidity}%
                      </div>
                    </div>

                    <div
                      className="bg-green-50 rounded-lg p-3 animate-pulse-slow"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Wind className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Wind
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-green-700">
                        {currentWeather.windSpeed} km/h
                      </div>
                    </div>

                    <div
                      className="bg-purple-50 rounded-lg p-3 animate-pulse-slow"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Thermometer className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Pressure
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-purple-700">
                        {currentWeather.pressure} mb
                      </div>
                    </div>

                    <div
                      className="bg-yellow-50 rounded-lg p-3 animate-pulse-slow"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Sun className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-gray-700">
                          UV Index
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-yellow-700">
                        {currentWeather.uvIndex}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight">
              <h2 className="text-xl font-semibold font-display text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-green-600" />
                7-Day Forecast
              </h2>

              <div className="space-y-4">
                {forecast.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200 animate-slideInLeft"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <span
                        className="text-2xl animate-float"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {day.icon}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {format(new Date(day.date), "EEEE, MMM dd")}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {day.condition}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Temp</div>
                        <div className="font-semibold text-gray-900">
                          {day.temperature.max}° / {day.temperature.min}°
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">
                          Humidity
                        </div>
                        <div className="font-semibold text-blue-600">
                          {day.humidity}%
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Rain</div>
                        <div className="font-semibold text-cyan-600">
                          {day.rainfall.toFixed(1)}mm
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Wind</div>
                        <div className="font-semibold text-green-600">
                          {day.windSpeed} km/h
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Insights */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Crop Recommendations */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-fadeInUp">
            <h3 className="text-lg font-semibold font-display text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Weather-Based Crop Insights
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-700 mb-2">
                  🌾 Recommended Actions
                </h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Current humidity levels favor rice cultivation</li>
                  <li>• Good conditions for applying organic fertilizers</li>
                  <li>• Monitor for fungal diseases due to moisture</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-700 mb-2">
                  ⚠️ Precautions
                </h4>
                <ul className="text-sm text-yellow-600 space-y-1">
                  <li>• Avoid overhead watering during high humidity</li>
                  <li>• Increase ventilation in greenhouse crops</li>
                  <li>• Prepare drainage for expected rainfall</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seasonal Calendar */}
          <div
            className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-lg font-semibold font-display text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Seasonal Agricultural Calendar
            </h3>

            <div className="space-y-3">
              {[
                {
                  month: "Current",
                  activity: "Kharif sowing season",
                  crop: "Rice, Cotton, Sugarcane",
                  emoji: "🌱",
                },
                {
                  month: "Next Month",
                  activity: "Monsoon cultivation",
                  crop: "Maize, Pulses",
                  emoji: "🌧️",
                },
                {
                  month: "Season End",
                  activity: "Harvest preparation",
                  crop: "Early varieties",
                  emoji: "🌾",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {item.month}: {item.activity}
                    </div>
                    <div className="text-sm text-gray-600">{item.crop}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateToolsPage;
