import React, { useState } from "react";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { user } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      icon: Star,
      description: "Perfect for getting started",
      features: [
        "5 disease detections per month",
        "3 price forecasts per month",
        "2 soil analyses per month",
        "Basic weather alerts",
        "Community support",
      ],
      limits: {
        diseaseDetections: 5,
        priceForecasts: 3,
        soilAnalyses: 2,
        weatherAlerts: 10,
      },
      buttonText: "Get Started",
      popular: false,
    },
    {
      id: "basic",
      name: "Basic",
      price: { monthly: 29, yearly: 290 },
      icon: Zap,
      description: "For small to medium farms",
      features: [
        "50 disease detections per month",
        "25 price forecasts per month",
        "15 soil analyses per month",
        "Advanced weather alerts",
        "Task management",
        "Email support",
        "Multi-language support",
      ],
      limits: {
        diseaseDetections: 50,
        priceForecasts: 25,
        soilAnalyses: 15,
        weatherAlerts: 100,
      },
      buttonText: "Start Basic Plan",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: { monthly: 79, yearly: 790 },
      icon: Crown,
      description: "For large farms and enterprises",
      features: [
        "Unlimited disease detections",
        "Unlimited price forecasts",
        "Unlimited soil analyses",
        "Real-time weather monitoring",
        "Advanced task management",
        "Priority support",
        "API access",
        "Custom integrations",
        "Bulk operations",
      ],
      limits: {
        diseaseDetections: -1,
        priceForecasts: -1,
        soilAnalyses: -1,
        weatherAlerts: -1,
      },
      buttonText: "Go Premium",
      popular: false,
    },
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (planId === "free") {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/subscription/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            planId,
            billingCycle,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select the perfect plan for your farming needs. Upgrade or downgrade
            at any time.
          </p>

          <div className="flex items-center justify-center space-x-4">
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly" ? "text-green-600" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billingCycle === "yearly" ? "text-green-600" : "text-gray-500"
              }`}
            >
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 p-8 shadow-lg transition-all duration-200 hover:shadow-xl ${
                plan.popular
                  ? "border-green-500 scale-105"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    plan.popular ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <plan.icon
                    className={`w-6 h-6 ${
                      plan.popular ? "text-green-600" : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold font-display gradient-text">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={user?.plan === plan.id}
                className={`w-full py-3 px-4 rounded-xl font-semibold font-display transition-all duration-200 ${
                  user?.plan === plan.id
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : plan.popular
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {user?.plan === plan.id ? "Current Plan" : plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold font-display text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for
                annual plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, all paid plans come with a 14-day free trial. No credit
                card required.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
