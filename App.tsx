import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NatureElements from "./components/NatureElements";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import AboutPage from "./pages/AboutPage";
import CropPricePage from "./pages/CropPricePage";
import SoilAnalysisPage from "./pages/SoilAnalysisPage";
import TaskManagerPage from "./pages/TaskManagerPage";
import ClimateToolsPage from "./pages/ClimateToolsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PricingPage from "./pages/PricingPage";
import { ResultsProvider } from "./context/ResultsContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ResultsProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
              <NatureElements />
              <Header />
              <div className="relative z-10">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route
                    path="/upload"
                    element={
                      <ProtectedRoute>
                        <UploadPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/results"
                    element={
                      <ProtectedRoute>
                        <ResultsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/prices"
                    element={
                      <ProtectedRoute requiresPlan="basic">
                        <CropPricePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/soil"
                    element={
                      <ProtectedRoute requiresPlan="basic">
                        <SoilAnalysisPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tasks"
                    element={
                      <ProtectedRoute>
                        <TaskManagerPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/climate"
                    element={
                      <ProtectedRoute requiresPlan="premium">
                        <ClimateToolsPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </div>
          </Router>
        </ResultsProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
