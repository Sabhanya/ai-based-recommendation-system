import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceGuideButton } from '../common/VoiceGuideButton';
import { CropDetailsModal } from '../catalog/CropDetailsModal';
import { 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Droplet, 
  Clock, 
  Layers, 
  TrendingUp 
} from 'lucide-react';

export const CropResultCard = ({ result }) => {
  const { isTelugu, t } = useLanguage();
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!result) return null;

  const crop = result.cropDetails || {};
  const agronomic = result.agronomic || result.agronomicParameters || {};
  const ideal = crop.ideal || {};

  const cropName = isTelugu ? (result.cropTe || result.crop) : result.crop;
  const confidencePercent = result.confidencePercent || `${Math.round((result.confidence || 0.95) * 100)}%`;
  
  // Dynamic Agronomic Parameter Extractions with full Fallbacks
  const valN = agronomic.N || (ideal.N ? `${ideal.N.min} - ${ideal.N.max}` : result.n || "60 - 100");
  const valP = agronomic.P || (ideal.P ? `${ideal.P.min} - ${ideal.P.max}` : result.p || "40 - 60");
  const valK = agronomic.K || (ideal.K ? `${ideal.K.min} - ${ideal.K.max}` : result.k || "40 - 80");
  const valPH = agronomic.ph || (ideal.pH ? `${ideal.pH.min} - ${ideal.pH.max}` : result.ph || "6.0 - 7.5");

  const valTemp = agronomic.temp || (ideal.temperature ? `${ideal.temperature.min}° - ${ideal.temperature.max}°C` : result.temperature || "20° - 32°C");
  const valRain = agronomic.rainfall || (ideal.rainfall ? `${ideal.rainfall.min} - ${ideal.rainfall.max} mm` : result.rainfall || "50 - 150 mm");
  const valHumidity = agronomic.humidity || (ideal.humidity ? `${ideal.humidity.min}% - ${ideal.humidity.max}%` : result.humidity || "50% - 75%");

  const valSeason = isTelugu 
    ? (agronomic.seasonTe || crop.seasonTe || "ఖరీఫ్ & రబీ") 
    : (agronomic.season || crop.season || "Kharif & Rabi");

  const valWater = isTelugu
    ? (crop.waterRequirementTe || agronomic.water || "మితమైన నీరు (Regular watering)")
    : (crop.waterRequirement || agronomic.water || "Medium (Regular light watering)");

  const scientificName = result.scientificName || crop.scientificName || "Agronomic Species";

  const voiceScript = isTelugu
    ? `చిత్రం ద్వారా గుర్తించిన పంట: ${cropName}. ఏఐ ఖచ్చితత్వం ${confidencePercent}. ఈ పంట సాగుకు ఆదర్శ pH ${valPH}, మరియు వర్షపాతం ${valRain}.`
    : `Identified crop species: ${result.crop} with ${confidencePercent} AI confidence. Ideal pH range is ${valPH} with average rainfall requirement of ${valRain}.`;

  return (
    <div className="bg-white rounded-3xl border border-agri-200 shadow-soft-lg overflow-hidden animate-fade-in">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-agri-800 via-agri-700 to-emerald-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-emerald-100 backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>{isTelugu ? "పంటను విజయవంతంగా గుర్తించింది" : "Image Identification Successful"}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>{cropName}</span>
          </h3>

          <p className="text-xs sm:text-sm text-emerald-200 italic font-serif">
            {scientificName}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-harvest-300">
              {confidencePercent}
            </div>
            <div className="text-[10px] uppercase font-bold text-emerald-200">
              {t('identify.confidenceText')}
            </div>
          </div>

          <VoiceGuideButton 
            text={voiceScript}
            labelEn="Listen 🔊"
            labelTe="వినండి 🔊"
            className="bg-harvest-400 text-slate-950 hover:bg-harvest-300 border-none font-bold"
            size="md"
          />
        </div>

      </div>

      {/* Body: Agronomic Parameters Matched */}
      <div className="p-6 sm:p-8 space-y-6">
        
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
            {t('identify.matchedParameters')}
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">N (నత్రజని)</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {valN}
              </span>
              <span className="text-[10px] text-slate-400">kg/ha</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">P (భాస్వరం)</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {valP}
              </span>
              <span className="text-[10px] text-slate-400">kg/ha</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">K (పొటాష్)</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {valK}
              </span>
              <span className="text-[10px] text-slate-400">kg/ha</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">pH పరిధి</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {valPH}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">Optimal</span>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-center">
            
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">ఉష్ణోగ్రత (Temp)</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {valTemp}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">వర్షపాతం (Rain)</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {valRain}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">తేమ (Humidity)</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {valHumidity}
              </span>
            </div>

          </div>
        </div>

        {/* Season & Soil quick badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              🗓️ {valSeason}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
              💧 {valWater}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            className="btn-outline py-2 px-4 text-xs font-bold"
          >
            <BookOpen className="w-4 h-4 text-agri-600" />
            <span>{isTelugu ? "పూర్తి సాగు మార్గదర్శిని చూడండి" : "View Full Cultivation Guide"}</span>
          </button>
        </div>

      </div>

      {/* Details Modal */}
      {detailsOpen && (
        <CropDetailsModal
          crop={{
            ...crop,
            name: result.crop,
            nameTe: result.cropTe,
            scientificName: scientificName,
            ideal: {
              N: { min: valN.split('-')[0] || 60, max: valN.split('-')[1] || 100 },
              P: { min: valP.split('-')[0] || 40, max: valP.split('-')[1] || 60 },
              K: { min: valK.split('-')[0] || 40, max: valK.split('-')[1] || 80 },
              pH: { min: valPH.split('-')[0] || 6.0, max: valPH.split('-')[1] || 7.5 }
            }
          }}
          onClose={() => setDetailsOpen(false)}
        />
      )}

    </div>
  );
};