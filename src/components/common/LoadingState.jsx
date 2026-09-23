import React from 'react';
import { Sparkles, Sprout } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LoadingState = ({ 
  messageEn = "Analyzing soil and environmental conditions...", 
  messageTe = "మీ నేల మరియు వాతావరణ వివరాలను విశ్లేషిస్తోంది...",
  subtextEn = "Finding the highest-yield crops for your farm",
  subtextTe = "మీ పొలానికి అత్యంత అనువైన పంటలను కనుగొంటోంది"
}) => {
  const { isTelugu } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-agri-100 shadow-soft max-w-lg mx-auto my-8 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-agri-100 flex items-center justify-center animate-pulse">
          <Sprout className="w-10 h-10 text-agri-600 animate-bounce" />
        </div>
        <div className="absolute -top-1 -right-1 p-2 bg-harvest-400 rounded-full text-slate-900 shadow-sm animate-spin">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">
        {isTelugu ? messageTe : messageEn}
      </h3>
      
      <p className="text-sm text-slate-500 max-w-sm">
        {isTelugu ? subtextTe : subtextEn}
      </p>

      {/* Progress pulse dots */}
      <div className="flex items-center gap-2 mt-6">
        <div className="w-2.5 h-2.5 rounded-full bg-agri-500 animate-ping"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-agri-600 animate-pulse"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-agri-700 animate-bounce"></div>
      </div>
    </div>
  );
};
