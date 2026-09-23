import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useHistory } from '../../context/HistoryContext';
import { Sparkles, Camera, ArrowRight, Clock, Calendar, CheckCircle } from 'lucide-react';

export const RecentPredictions = ({ onSelectHistoryItem }) => {
  const { isTelugu, t } = useLanguage();
  const { history } = useHistory();

  const recentItems = history.slice(0, 5);

  if (recentItems.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
          🌾
        </div>
        <h4 className="font-bold text-slate-800">
          {t('history.emptyTitle')}
        </h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t('history.emptyDesc')}
        </p>
        <Link to="/recommend" className="btn-primary py-2.5 px-5 text-xs font-bold inline-flex mt-2">
          {t('hero.ctaPrimary')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
      
      <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">
            {t('dashboard.recentHeading')}
          </h3>
          <p className="text-xs text-slate-500">
            {isTelugu ? "ఇటీవలి విశ్లేషణలు మరియు సిఫార్సులు" : "Latest soil analyses and crop identification logs"}
          </p>
        </div>

        <Link
          to="/history"
          className="text-xs font-bold text-agri-700 hover:text-agri-800 flex items-center gap-1"
        >
          <span>{isTelugu ? "మొత్తం చరిత్ర చూడండి" : "View All History"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {recentItems.map((item) => {
          const isRec = item.type === "recommendation" || !item.type;
          const topCropName = isRec 
            ? (isTelugu ? (item.topCrop?.nameTe || item.topCrop?.name) : item.topCrop?.name)
            : (isTelugu ? (item.crop?.nameTe || item.crop?.name) : item.crop?.name);
          
          const dateStr = new Date(item.timestamp).toLocaleDateString(isTelugu ? 'te-IN' : 'en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <div
              key={item.id}
              onClick={() => onSelectHistoryItem && onSelectHistoryItem(item)}
              className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isRec ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {isRec ? <Sparkles className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate group-hover:text-agri-700 transition-colors">
                      {topCropName || "Recommended Crop"}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                      {isRec ? "Recommendation" : "Image Vision"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {isRec && item.inputs
                      ? `N: ${item.inputs.N} | pH: ${item.inputs.pH} | Temp: ${item.inputs.temperature}°C`
                      : `Detection Confidence: ${Math.round((item.crop?.confidence || 0.95) * 100)}%`}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-xs font-semibold text-slate-600 flex items-center justify-end gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{dateStr}</span>
                </div>
                <span className="text-[11px] font-bold text-agri-700 group-hover:underline">
                  {isTelugu ? "వివరాలు చూడండి →" : "View Details →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
