import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Language } from "../types";
import { SUPPORTED_LANGUAGES } from "../constants/languages";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const fallbackTranslations: Record<string, Record<string, string>> = {
  hi: {
    "Disease Detected": "रोग का पता चला",
    "Treatment Recommendations": "उपचार की सिफारिशें",
    "Weather Risk Assessment": "मौसम जोखिम मूल्यांकन",
    "Soil Analysis": "मिट्टी विश्लेषण",
    "Crop Price Prediction": "फसल मूल्य पूर्वानुमान",
    "Task Manager": "कार्य प्रबंधक",
    "Climate Tools": "जलवायु उपकरण",
    "High Risk": "उच्च जोखिम",
    "Medium Risk": "मध्यम जोखिम",
    "Low Risk": "कम जोखिम",
    "Apply fertilizer": "उर्वरक डालें",
    "Water plants": "पौधों को पानी दें",
    "Check for pests": "कीटों की जांच करें",
    "Harvest crops": "फसल काटें",
    "Plant Disease Detection": "पौधे की बीमारी का पता लगाना",
    "Upload Image": "छवि अपलोड करें",
    "Analyze Plant": "पौधे का विश्लेषण करें",
    "Current Weather": "वर्तमान मौसम",
    Forecast: "पूर्वानुमान",
  },
  te: {
    "Disease Detected": "వ్యాధి గుర్తించబడింది",
    "Treatment Recommendations": "చికిత్స సిఫార్సులు",
    "Weather Risk Assessment": "వాతావరణ ప్రమాద అంచనా",
    "Soil Analysis": "మట్టి విశ్లేషణ",
    "Crop Price Prediction": "పంట ధర అంచనా",
    "High Risk": "అధిక ప్రమాదం",
    "Medium Risk": "మధ్యస్థ ప్రమాదం",
    "Low Risk": "తక్కువ ప్రమాదం",
    "Plant Disease Detection": "మొక్క వ్యాధి గుర్తింపు",
    "Upload Image": "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    "Analyze Plant": "మొక్కను విశ్లేషించండి",
  },
  pa: {
    "Disease Detected": "ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਲਗਾਇਆ",
    "Treatment Recommendations": "ਇਲਾਜ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ",
    "Weather Risk Assessment": "ਮੌਸਮ ਜੋਖਮ ਮੁਲਾਂਕਣ",
    "Soil Analysis": "ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ",
    "High Risk": "ਉੱਚ ਜੋਖਮ",
    "Medium Risk": "ਮੱਧਮ ਜੋਖਮ",
    "Low Risk": "ਘੱਟ ਜੋਖਮ",
    "Plant Disease Detection": "ਪੌਧੇ ਦੀ ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ",
  },
  es: {
    "Disease Detected": "Enfermedad Detectada",
    "Treatment Recommendations": "Recomendaciones de Tratamiento",
    "Weather Risk Assessment": "Evaluación de Riesgo Climático",
    "Soil Analysis": "Análisis del Suelo",
    "High Risk": "Alto Riesgo",
    "Medium Risk": "Riesgo Medio",
    "Low Risk": "Bajo Riesgo",
    "Plant Disease Detection": "Detección de Enfermedades de Plantas",
    "Upload Image": "Subir Imagen",
    "Analyze Plant": "Analizar Planta",
  },
  fr: {
    "Disease Detected": "Maladie Détectée",
    "Treatment Recommendations": "Recommandations de Traitement",
    "Weather Risk Assessment": "Évaluation des Risques Météorologiques",
    "Soil Analysis": "Analyse du Sol",
    "High Risk": "Risque Élevé",
    "Medium Risk": "Risque Moyen",
    "Low Risk": "Faible Risque",
    "Plant Disease Detection": "Détection des Maladies des Plantes",
    "Upload Image": "Télécharger une Image",
    "Analyze Plant": "Analyser la Plante",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[0]
  );
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = async (text: string): Promise<string> => {
    if (currentLanguage.code === "en") return text;

    setIsTranslating(true);
    try {
      const API_BASE_URL = import.meta.env.PROD
        ? "/api"
        : "http://localhost:8000/api";
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang: currentLanguage.code }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.translatedText || text;
      }
    } catch (error) {
      console.error("Translation API failed, using fallback:", error);
    }

    const langTranslations = fallbackTranslations[currentLanguage.code];
    if (langTranslations && langTranslations[text]) {
      return langTranslations[text];
    }

    setIsTranslating(false);
    return text;
  };

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem("selectedLanguage", JSON.stringify(language));
  };

  useEffect(() => {
    const saved = localStorage.getItem("selectedLanguage");
    if (saved) {
      try {
        setCurrentLanguage(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, translate, isTranslating }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
