import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-inner ${className}`}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          language === 'en'
            ? 'bg-white text-agri-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-label="Switch to English"
      >
        <Globe className="w-3.5 h-3.5 text-agri-600" />
        <span>English</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('te')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          language === 'te'
            ? 'bg-white text-agri-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-label="తెలుగు భాషకు మారండి"
      >
        <span>తెలుగు</span>
      </button>
    </div>
  );
};
