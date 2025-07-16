import React, { createContext, useContext, useState, ReactNode } from "react";

interface Results {
  disease: string;
  confidence: number;
  heatmapUrl: string;
  originalImage: string;
  remedies: string;
  weatherRisk: string;
  weatherAdvice: string;
  audioUrl: string;
}

interface ResultsContextType {
  results: Results | null;
  setResults: (results: Results) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [results, setResults] = useState<Results | null>(null);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error("useResults must be used within a ResultsProvider");
  }
  return context;
};
