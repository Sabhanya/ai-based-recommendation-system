import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ErrorMessage = ({ 
  message, 
  onRetry = null, 
  titleEn = "Unable to complete analysis",
  titleTe = "విశ్లేషణ పూర్తి కాలేదు" 
}) => {
  const { isTelugu } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 shadow-sm my-6">
      <div className="p-2.5 bg-rose-100 rounded-xl text-rose-600 flex-shrink-0">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-base text-rose-900">
          {isTelugu ? titleTe : titleEn}
        </h4>
        <p className="text-sm text-rose-700 mt-0.5">
          {message || (isTelugu 
            ? "దయచేసి నమోదు చేసిన వివరాలను సరిచూసి మళ్లీ ప్రయత్నించండి." 
            : "Please check your entered details and try again.")}
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-all shadow-sm flex-shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{isTelugu ? "మళ్లీ ప్రయత్నించండి" : "Try Again"}</span>
        </button>
      )}
    </div>
  );
};
