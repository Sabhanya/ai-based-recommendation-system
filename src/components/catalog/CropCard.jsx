import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, BookOpen } from 'lucide-react';

export const CropCard = ({ crop, onSelect }) => {
  const { isTelugu } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const cropName = isTelugu ? (crop.nameTe || crop.name) : crop.name;
  const category = isTelugu ? (crop.categoryTe || crop.category) : crop.category;
  const ideal = crop.ideal || {};

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-agri-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      <div>
        {/* Thumbnail Photo with Fallback */}
        <div className="h-44 w-full relative overflow-hidden bg-emerald-50">
          {!imageError && crop.image ? (
            <img 
              src={crop.image} 
              alt={cropName} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-50 text-agri-700 p-4 text-center">
              <Sprout className="w-12 h-12 text-agri-600 mb-1" />
              <span className="text-xs font-bold text-agri-800">{cropName}</span>
            </div>
          )}

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 backdrop-blur-sm shadow-sm">
            {category}
          </div>
        </div>

        {/* Info Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 group-hover:text-agri-700 transition-colors truncate">
              {cropName}
            </h3>
            <p className="text-xs italic font-serif text-slate-500 truncate">
              {crop.scientificName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">N-P-K (kg/ha)</span>
              <span className="font-extrabold text-slate-800">
                {ideal.N?.optimal || 80}-{ideal.P?.optimal || 40}-{ideal.K?.optimal || 40}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">pH Range</span>
              <span className="font-extrabold text-slate-800">
                {ideal.pH?.min || 5.5} - {ideal.pH?.max || 7.5}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {isTelugu ? (crop.descriptionTe || crop.description) : crop.description}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="p-5 pt-0">
        <button
          type="button"
          onClick={() => onSelect(crop)}
          className="w-full btn-outline py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 group-hover:bg-agri-50 group-hover:text-agri-700 group-hover:border-agri-200"
        >
          <BookOpen className="w-4 h-4 text-agri-600" />
          <span>{isTelugu ? "సాగు మార్గదర్శిని చూడండి" : "View Cultivation Guide"}</span>
        </button>
      </div>

    </div>
  );
};
