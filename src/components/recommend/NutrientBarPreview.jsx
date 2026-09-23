import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const NutrientBarPreview = ({ formValues }) => {
  const { isTelugu } = useLanguage();

  const getStatus = (val, lowMax, medMax) => {
    const v = Number(val);
    if (!val || isNaN(v)) return { textEn: "Not Set", textTe: "నమోదు కాలేదు", color: "bg-slate-200 text-slate-600", width: "10%" };
    if (v < lowMax) return { textEn: "Low", textTe: "తక్కువ", color: "bg-amber-500 text-white", width: "35%" };
    if (v <= medMax) return { textEn: "Medium / Balanced", textTe: "మధ్యస్థం / సమతుల్యం", color: "bg-emerald-500 text-white", width: "70%" };
    return { textEn: "High", textTe: "ఎక్కువ", color: "bg-blue-600 text-white", width: "100%" };
  };

  const getPhStatus = (val) => {
    const v = Number(val);
    if (!val || isNaN(v)) return { textEn: "Not Set", textTe: "నమోదు కాలేదు", color: "bg-slate-200 text-slate-600", width: "10%" };
    if (v < 6.0) return { textEn: "Acidic (< 6.0)", textTe: "ఆమ్ల నేల (< 6.0)", color: "bg-amber-500 text-white", width: "40%" };
    if (v <= 7.5) return { textEn: "Optimal Neutral (6.0 - 7.5)", textTe: "ఆదర్శ తటస్థ నేల (6.0 - 7.5)", color: "bg-emerald-500 text-white", width: "75%" };
    return { textEn: "Alkaline (> 7.5)", textTe: "క్షార నేల (> 7.5)", color: "bg-purple-600 text-white", width: "95%" };
  };

  const nStatus = getStatus(formValues.N, 40, 100);
  const pStatus = getStatus(formValues.P, 30, 70);
  const kStatus = getStatus(formValues.K, 30, 70);
  const phStatus = getPhStatus(formValues.pH);

  return (
    <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-agri-800">
          {isTelugu ? "📊 నేల పోషక స్థాయి ప్రత్యక్ష సూచిక" : "📊 Real-Time Soil Nutrient Indicator"}
        </h4>
        <span className="text-[11px] text-slate-500 font-medium">
          {isTelugu ? "మీరు నమోదు చేసిన విలువల ఆధారంగా" : "Live visualization of soil balance"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Nitrogen Bar */}
        <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>N: {formValues.N || '-'}</span>
            <span className="text-[10px] text-slate-500">{isTelugu ? nStatus.textTe : nStatus.textEn}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className={`h-full transition-all duration-300 ${nStatus.color}`} style={{ width: nStatus.width }}></div>
          </div>
        </div>

        {/* Phosphorus Bar */}
        <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>P: {formValues.P || '-'}</span>
            <span className="text-[10px] text-slate-500">{isTelugu ? pStatus.textTe : pStatus.textEn}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className={`h-full transition-all duration-300 ${pStatus.color}`} style={{ width: pStatus.width }}></div>
          </div>
        </div>

        {/* Potassium Bar */}
        <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>K: {formValues.K || '-'}</span>
            <span className="text-[10px] text-slate-500">{isTelugu ? kStatus.textTe : kStatus.textEn}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className={`h-full transition-all duration-300 ${kStatus.color}`} style={{ width: kStatus.width }}></div>
          </div>
        </div>

        {/* pH Bar */}
        <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>pH: {formValues.pH || '-'}</span>
            <span className="text-[10px] text-slate-500">{isTelugu ? phStatus.textTe : phStatus.textEn}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className={`h-full transition-all duration-300 ${phStatus.color}`} style={{ width: phStatus.width }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};
