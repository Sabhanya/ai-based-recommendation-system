import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TopRecommendations } from '../recommend/TopRecommendations';
import { CropResultCard } from '../identify/CropResultCard';
import { X, Calendar, MapPin, Sparkles, Camera } from 'lucide-react';

export const HistoryItemModal = ({ item, onClose }) => {
  const { isTelugu } = useLanguage();

  if (!item) return null;

  const isRec = item.type === "recommendation" || !item.type;
  const dateStr = new Date(item.timestamp).toLocaleString(isTelugu ? 'te-IN' : 'en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg ${
              isRec ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isRec ? <Sparkles className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dateStr}</span>
                </span>
                {item.inputs?.location && (
                  <span className="flex items-center gap-1 text-agri-700">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.inputs.location}</span>
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {isRec 
                  ? (isTelugu ? "పంట సిఫార్సు రికార్డు" : "Crop Recommendation Record")
                  : (isTelugu ? "పంట గుర్తింపు రికార్డు" : "Crop Identification Record")}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isRec ? (
            <TopRecommendations
              recommendations={item.recommendations || [item.topCrop]}
              inputs={item.inputs || {}}
              onReset={onClose}
            />
          ) : (
            <div className="space-y-6">
              {item.imageUrl && (
                <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-md">
                  <img src={item.imageUrl} alt="Identified crop" className="w-full h-64 object-cover" />
                </div>
              )}
              <CropResultCard
                result={{
                  crop: item.crop?.name,
                  cropTe: item.crop?.nameTe,
                  confidence: item.crop?.confidence,
                  cropDetails: item.crop
                }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
