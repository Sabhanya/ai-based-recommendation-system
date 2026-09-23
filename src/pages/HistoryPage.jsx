import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HistoryTable } from '../components/history/HistoryTable';
import { History, Sparkles } from 'lucide-react';

export const HistoryPage = () => {
  const { isTelugu, t } = useLanguage();

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-agri-100 text-agri-900 border border-agri-200">
            <History className="w-3.5 h-3.5 text-agri-600" />
            <span>{isTelugu ? "భూసార విశ్లేషణల రికార్డులు" : "Saved Farm Decision Logs"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('history.title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('history.subtitle')}
          </p>
        </div>

        {/* History Table Container */}
        <HistoryTable />

      </div>
    </div>
  );
};
