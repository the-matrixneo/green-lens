import React from "react";
import {
  Brain,
  Zap,
  Shield,
  Globe,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Leaf,
  Camera,
  Cloud,
  Volume2,
} from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Detection",
      description:
        "EfficientNet-B0 neural network trained on thousands of plant disease images for accurate identification.",
      stats: "95% accuracy",
    },
    {
      icon: Camera,
      title: "Grad-CAM Visualization",
      description:
        "Visual heatmaps highlight exactly where diseases are detected on your plant leaves.",
      stats: "Pixel-level precision",
    },
    {
      icon: Shield,
      title: "Expert Remedies",
      description:
        "Google Gemini LLM provides detailed treatment plans and prevention strategies.",
      stats: "50+ diseases covered",
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description:
        "Real-time weather data helps predict disease spread and optimal treatment timing.",
      stats: "Live weather data",
    },
    {
      icon: Volume2,
      title: "Voice Guidance",
      description:
        "Multi-lingual text-to-speech makes our platform accessible to farmers worldwide.",
      stats: "10+ languages",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Get results in under 3 seconds with our optimized FastAPI backend infrastructure.",
      stats: "<3s processing",
    },
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: ["React.js", "TypeScript", "TailwindCSS", "Vite"],
    },
    {
      category: "Backend",
      technologies: ["FastAPI", "Python", "PyTorch", "Uvicorn"],
    },
    {
      category: "AI/ML",
      technologies: [
        "EfficientNet-B0",
        "Grad-CAM",
        "Google Gemini",
        "Computer Vision",
      ],
    },
    {
      category: "APIs",
      technologies: ["WeatherAPI", "Google TTS", "LangChain", "REST APIs"],
    },
    {
      category: "Deployment",
      technologies: ["Vercel", "Render", "Docker", "CI/CD"],
    },
  ];

  const workflow = [
    {
      step: 1,
      title: "Image Upload",
      description:
        "User uploads a clear image of the affected plant leaf through our intuitive interface.",
      icon: Camera,
    },
    {
      step: 2,
      title: "AI Processing",
      description:
        "EfficientNet-B0 model analyzes the image and generates Grad-CAM heatmaps for visualization.",
      icon: Brain,
    },
    {
      step: 3,
      title: "LLM Analysis",
      description:
        "Google Gemini processes the detection results and generates detailed remedies and explanations.",
      icon: Shield,
    },
    {
      step: 4,
      title: "Weather Context",
      description:
        "Real-time weather data is integrated to provide climate-specific recommendations.",
      icon: Cloud,
    },
    {
      step: 5,
      title: "Voice Output",
      description:
        "Text-to-speech converts all information into audio format for accessibility.",
      icon: Volume2,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6 animate-shimmer">
            <Leaf className="w-4 h-4 mr-2" />
            About GreenLens
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-6 animate-slideInLeft">
            AI-Powered Plant Disease Detection for{" "}
            <span className="gradient-text">Sustainable Agriculture</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slideInRight">
            GreenLens combines cutting-edge computer vision, large language
            models, and real-time weather data to deliver comprehensive plant
            disease detection and treatment recommendations for farmers
            worldwide.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white mb-16 animate-fadeInUp relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-4 left-4 text-3xl animate-float">🌍</div>
          <div className="absolute top-4 right-4 text-3xl animate-bounce-slow">
            🚀
          </div>
          <div className="absolute bottom-4 left-4 text-3xl animate-sway">
            🌱
          </div>
          <div className="absolute bottom-4 right-4 text-3xl animate-float">
            ✨
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-display mb-6 relative z-10">
              Our Mission
            </h2>
            <p className="text-xl opacity-90 leading-relaxed relative z-10">
              To democratize access to advanced agricultural technology, helping
              farmers protect their crops, increase yields, and contribute to
              global food security through AI-powered disease detection and
              intelligent treatment recommendations.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-display text-gray-900 text-center mb-12 animate-slideInLeft">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-8 hover:border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold font-display text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
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

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-display text-gray-900 text-center mb-12 animate-slideInLeft">
            How GreenLens Works
          </h2>

          <div className="space-y-8 animate-fadeInUp">
            {workflow.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-6 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-green-100 animate-slideInLeft hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold font-display text-lg rounded-full animate-pulse-slow">
                    {item.step}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <item.icon className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold font-display text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-display text-gray-900 text-center mb-12 animate-slideInLeft">
            Technology Stack
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
            {techStack.map((stack, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 animate-float hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                  {stack.category}
                </h3>
                <div className="space-y-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12 mb-20 animate-fadeInUp relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-2xl animate-float">📊</div>
          <div className="absolute top-4 right-4 text-2xl animate-bounce-slow">
            ⚡
          </div>
          <div className="absolute bottom-4 left-4 text-2xl animate-sway">
            🎯
          </div>
          <div className="absolute bottom-4 right-4 text-2xl animate-float">
            🚀
          </div>

          <h2 className="text-3xl font-bold font-display text-gray-900 text-center mb-12 relative z-10">
            Impact & Performance
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { value: "95%", label: "Detection Accuracy" },
              { value: "50+", label: "Disease Types" },
              { value: "<3s", label: "Processing Time" },
              { value: "10+", label: "Languages Supported" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-bounce-slow"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl font-bold font-display gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium font-display">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display text-gray-900 mb-6 animate-slideInLeft">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slideInRight">
            Join the agricultural revolution with AI-powered plant disease
            detection
          </p>
          <a
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold font-display rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg animate-shimmer"
          >
            Start Detection Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
