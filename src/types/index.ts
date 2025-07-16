export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export interface CropPrice {
  date: string;
  price: number;
  market: string;
  variety: string;
}

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  moisture: number;
  organicMatter: number;
}

export interface FertilizerRecommendation {
  type: string;
  quantity: number;
  unit: string;
  timing: string;
  cost: number;
  organic: boolean;
}

export interface TaskReminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  category: "watering" | "fertilizing" | "monitoring" | "harvesting" | "other";
  completed: boolean;
  priority: "low" | "medium" | "high";
  emoji: string;
}

export interface WeatherAlert {
  type: "warning" | "info" | "danger";
  message: string;
  severity: number;
  validUntil: Date;
}

export interface ClimateData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  uvIndex: number;
  soilTemperature: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temperature: { min: number; max: number };
  condition: string;
  humidity: number;
  rainfall: number;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: "free" | "basic" | "premium";
  subscriptionEnd?: Date;
  createdAt: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  limits: {
    diseaseDetections: number;
    priceForecasts: number;
    soilAnalyses: number;
    weatherAlerts: number;
  };
  popular?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
