import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceGuideButton } from '../common/VoiceGuideButton';
import { 
  X, 
  Sprout, 
  Droplet, 
  Calendar, 
  ShieldAlert, 
  Award, 
  Clock, 
  Layers, 
  CheckCircle,
  Thermometer,
  CloudRain
} from 'lucide-react';

export const CropDetailsModal = ({ crop, onClose }) => {
  const { isTelugu, t } = useLanguage();

  if (!crop) return null;

  const cropName = isTelugu ? (crop.nameTe || crop.name) : crop.name;
  const description = isTelugu ? (crop.descriptionTe || crop.description) : crop.description;
  const ideal = crop.ideal || {};
  const stages = isTelugu ? (crop.stagesTe || crop.stages || []) : (crop.stages || []);
  const soilTypes = isTelugu ? (crop.soilTypesTe || crop.soilTypes || []) : (crop.soilTypes || []);
  const tips = isTelugu ? (crop.cultivationTipsTe || crop.cultivationTips) : crop.cultivationTips;
  const diseases = isTelugu ? (crop.diseasesTe || crop.diseases) : crop.diseases;

  const speechContent = `${cropName}. ${description}. ${tips ? (isTelugu ? "సాగు సలహా: " : "Cultivation advice: ") + tips : ""}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
        
        {/* Modal Header */}
        <div className="relative">
          {crop.image && (
            <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-slate-900">
              <img 
                src={crop.image} 
                alt={cropName} 
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10 backdrop-blur-sm"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className={`p-6 ${crop.image ? 'absolute bottom-0 inset-x-0 text-white' : 'border-b border-slate-100'}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm mb-2">
              <Sprout className="w-3.5 h-3.5" />
              <span>{isTelugu ? (crop.categoryTe || crop.category) : crop.category}</span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-black ${crop.image ? 'text-white' : 'text-slate-900'}`}>
              {cropName}
            </h3>
            <p className={`text-xs sm:text-sm italic font-serif ${crop.image ? 'text-emerald-200' : 'text-slate-500'}`}>
              {crop.scientificName}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Audio Reader & Description */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-sm text-slate-700 leading-relaxed">
              {description}
            </p>
            <VoiceGuideButton 
              text={speechContent} 
              labelEn="Listen Guide 🔊" 
              labelTe="సమాచారం వినండి 🔊"
              size="sm"
            />
          </div>

          {/* Key Agronomic Requirement Cards */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
              <span>{isTelugu ? "ఆదర్శ పోషకాలు & వాతావరణ అవసరాలు" : "Ideal Nutrient & Climate Requirements"}</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <div className="text-xs font-bold text-emerald-800 uppercase">
                  {isTelugu ? "నత్రజని (N)" : "Nitrogen (N)"}
                </div>
                <div className="text-lg font-black text-emerald-900 mt-0.5">
                  {ideal.N ? `${ideal.N.min}-${ideal.N.max}` : '-'}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">kg/ha</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <div className="text-xs font-bold text-emerald-800 uppercase">
                  {isTelugu ? "భాస్వరం (P)" : "Phosphorus (P)"}
                </div>
                <div className="text-lg font-black text-emerald-900 mt-0.5">
                  {ideal.P ? `${ideal.P.min}-${ideal.P.max}` : '-'}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">kg/ha</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <div className="text-xs font-bold text-emerald-800 uppercase">
                  {isTelugu ? "పొటాష్ (K)" : "Potassium (K)"}
                </div>
                <div className="text-lg font-black text-emerald-900 mt-0.5">
                  {ideal.K ? `${ideal.K.min}-${ideal.K.max}` : '-'}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">kg/ha</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <div className="text-xs font-bold text-emerald-800 uppercase">
                  {isTelugu ? "నేల pH విలువ" : "Soil pH"}
                </div>
                <div className="text-lg font-black text-emerald-900 mt-0.5">
                  {ideal.pH ? `${ideal.pH.min}-${ideal.pH.max}` : '-'}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">Optimal</div>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-center">
              
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80">
                <div className="text-xs font-bold text-sky-800 uppercase flex items-center justify-center gap-1">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{isTelugu ? "ఉష్ణోగ్రత" : "Temperature"}</span>
                </div>
                <div className="text-lg font-black text-sky-900 mt-0.5">
                  {ideal.temperature ? `${ideal.temperature.min}° - ${ideal.temperature.max}°C` : '-'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80">
                <div className="text-xs font-bold text-sky-800 uppercase flex items-center justify-center gap-1">
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>{isTelugu ? "సగటు వర్షపాతం" : "Rainfall"}</span>
                </div>
                <div className="text-lg font-black text-sky-900 mt-0.5">
                  {ideal.rainfall ? `${ideal.rainfall.min} - ${ideal.rainfall.max} mm` : '-'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80">
                <div className="text-xs font-bold text-sky-800 uppercase flex items-center justify-center gap-1">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>{isTelugu ? "గాలిలో తేమ" : "Humidity"}</span>
                </div>
                <div className="text-lg font-black text-sky-900 mt-0.5">
                  {ideal.humidity ? `${ideal.humidity.min}% - ${ideal.humidity.max}%` : '-'}
                </div>
              </div>

            </div>
          </div>

          {/* Quick Agronomy Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-agri-600" />
                <span>{isTelugu ? "పంట కాలం & వ్యవధి" : "Season & Duration"}</span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {isTelugu ? (crop.seasonTe || crop.season) : crop.season}
              </p>
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{isTelugu ? (crop.durationTe || crop.duration) : crop.duration}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-agri-600" />
                <span>{isTelugu ? "అనుకూలమైన నేలలు" : "Suitable Soil Types"}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {soilTypes.map((st, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200">
                    {st}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Stages of Growth */}
          {stages.length > 0 && (
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-3">
                {isTelugu ? "పంట ఎదుగుదల ముఖ్య దశలు" : "Key Growth Stages"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {stages.map((stage, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-agri-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultivation Advice & Split Fertilizers */}
          {tips && (
            <div className="p-4 rounded-2xl bg-agri-50 border border-agri-200 space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider text-agri-900 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-agri-700" />
                <span>{isTelugu ? "సాగు సలహాలు & ఎరువుల యాజమాన్యం" : "Cultivation Tips & Fertilizer Management"}</span>
              </div>
              <p className="text-xs text-agri-950 leading-relaxed font-medium">
                {tips}
              </p>
            </div>
          )}

          {/* Diseases & Remedies */}
          {diseases && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>{isTelugu ? "కీలక తెగుళ్లు & నివారణ చర్యలు" : "Major Diseases & Protection Measures"}</span>
              </div>
              <p className="text-xs text-rose-950 leading-relaxed font-medium">
                {diseases}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary py-2.5 px-6 text-sm"
          >
            {isTelugu ? "సరే (Close)" : "Close Guide"}
          </button>
        </div>

      </div>
    </div>
  );
};
