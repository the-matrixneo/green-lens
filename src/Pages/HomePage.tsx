import React from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Brain,
  Cloud,
  Volume2,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Leaf,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const HomePage = () => {
  const { translate } = useLanguage();

  const features = [
    {
      icon: Camera,
      title: "AI Disease Detection",
      description:
        "Upload crop images for instant disease identification using EfficientNet-B0",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Brain,
      title: "Smart Analysis",
      description: "Grad-CAM heatmaps highlight infected areas with precision",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Expert Remedies",
      description:
        "Get actionable treatment suggestions powered by Google Gemini LLM",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description:
        "Real-time weather data for climate-specific recommendations",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Volume2,
      title: "Voice Feedback",
      description:
        "Multi-lingual text-to-speech for accessibility in regional languages",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Zap,
      title: "Fast & Accurate",
      description:
        "Lightning-fast processing with high accuracy disease detection",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const stats = [
    { value: "95%", label: "Accuracy Rate" },
    { value: "50+", label: "Disease Types" },
    { value: "<3s", label: "Processing Time" },
    { value: "24/7", label: "Availability" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-500/5 to-teal-600/10">
          <div
            className="absolute top-20 left-10 text-6xl animate-float"
            style={{ animationDelay: "0s" }}
          >
            🌳
          </div>
          <div
            className="absolute top-40 right-20 text-4xl animate-bounce-slow"
            style={{ animationDelay: "1s" }}
          >
            🦋
          </div>
          <div
            className="absolute bottom-20 left-20 text-5xl animate-sway"
            style={{ animationDelay: "2s" }}
          >
            🌿
          </div>
          <div
            className="absolute bottom-40 right-10 text-4xl animate-float"
            style={{ animationDelay: "3s" }}
          >
            🌺
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeInUp">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-8 animate-shimmer">
              <Leaf className="w-4 h-4 mr-2" />
              {translate("AI-Powered Plant Disease Detection")}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-gray-900 mb-6 animate-slideInLeft">
              {translate("Protect Your Crops with")}{" "}
              <span className="gradient-text animate-pulse-slow">
                AI Intelligence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slideInRight">
              GreenLens combines computer vision, LLMs, and weather data to
              deliver instant plant disease detection, precise analysis, and
              actionable remedies for sustainable agriculture.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp"
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                to="/upload"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold font-display rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-bounce-slow"
              >
                {translate("Start Detection")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 font-semibold font-display rounded-xl hover:bg-green-50 transition-all duration-200 hover:scale-105"
              >
                {translate("Learn More")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fadeInUp">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold font-display gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium font-display">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4 animate-slideInLeft">
              Powerful Features for Modern Agriculture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideInRight">
              Our comprehensive platform combines cutting-edge AI technology
              with practical agricultural insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-float"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-200`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold font-display text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4 animate-slideInLeft">
              How GreenLens Works
            </h2>
            <p className="text-xl text-gray-600 animate-slideInRight">
              Simple, fast, and accurate plant disease detection in 4 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeInUp">
            {[
              {
                step: "01",
                title: "Upload Image",
                description:
                  "Take or upload a clear photo of the affected plant leaf",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our EfficientNet-B0 model analyzes the image for disease detection",
              },
              {
                step: "03",
                title: "Get Results",
                description:
                  "View disease identification, heatmap, and expert remedies",
              },
              {
                step: "04",
                title: "Take Action",
                description:
                  "Follow weather-aware recommendations and listen to audio guidance",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center animate-bounce-slow"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold font-display text-lg rounded-full mb-6 animate-pulse-slow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold font-display text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white animate-fadeInUp relative overflow-hidden">
            <div className="absolute top-4 left-4 text-2xl animate-float">
              🌟
            </div>
            <div className="absolute top-4 right-4 text-2xl animate-bounce-slow">
              ✨
            </div>
            <div className="absolute bottom-4 left-4 text-2xl animate-sway">
              🌱
            </div>
            <div className="absolute bottom-4 right-4 text-2xl animate-float">
              🍃
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 animate-slideInLeft relative z-10">
              Ready to Protect Your Crops?
            </h2>
            <p className="text-xl mb-8 opacity-90 animate-slideInRight relative z-10">
              Join thousands of farmers using AI-powered disease detection for
              healthier crops
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold font-display rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg animate-bounce-slow relative z-10"
            >
              Start Free Detection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
