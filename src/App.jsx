import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { HistoryProvider } from './context/HistoryContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { RecommendPage } from './pages/RecommendPage';
import { IdentifyPage } from './pages/IdentifyPage';
import { CropCatalogPage } from './pages/CropCatalogPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  return (
    <LanguageProvider>
      <HistoryProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen flex flex-col bg-[#F9FBF8] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recommend" element={<RecommendPage />} />
                <Route path="/identify" element={<IdentifyPage />} />
                <Route path="/catalog" element={<CropCatalogPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </HistoryProvider>
    </LanguageProvider>
  );
}

export default App;
