import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export const RecommendationCard = (props) => {
  const langContext = useLanguage ? useLanguage() : { isTelugu: false };
  const isTelugu = langContext?.isTelugu || false;

  const data = props.crop || props.recommendation || props.item || props || {};
  const rawKey = String(data.id || data.cropId || data.crop || data.name || "").toLowerCase();

  // ఖచ్చితమైన వ్యవసాయ ఫోటోలు - ఫామ్‌హౌస్ లింక్ పూర్తిగా తొలగించబడింది!
  let cropPhoto = "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=500&q=80"; // Default Peanuts

  if (rawKey.includes("groundnut") || rawKey.includes("peanut") || rawKey.includes("వేరుశనగ") || rawKey.includes("పల్లీ")) {
    cropPhoto = "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=500&q=80";
  } else if (rawKey.includes("tomato") || rawKey.includes("టమాట")) {
    cropPhoto = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80";
  } else if (rawKey.includes("chilli") || rawKey.includes("మిరప")) {
    cropPhoto = "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=500&q=80";
  } else if (rawKey.includes("rice") || rawKey.includes("paddy") || rawKey.includes("వరి")) {
    cropPhoto = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80";
  } else if (rawKey.includes("cotton") || rawKey.includes("పత్తి")) {
    cropPhoto = "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=500&q=80";
  } else if (rawKey.includes("maize") || rawKey.includes("corn") || rawKey.includes("మొక్కజొన్న")) {
    cropPhoto = "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=80";
  } else if (rawKey.includes("sugarcane") || rawKey.includes("చెరకు")) {
    cropPhoto = "https://images.unsplash.com/photo-1596706915220-410a8d62635a?auto=format&fit=crop&w=500&q=80";
  }

  const cropName = data.name || data.crop || "Groundnut";
  const cropNameTe = data.nameTe || data.cropTe || cropName;
  const category = data.category || (isTelugu ? "నూనెగింజలు" : "Oilseeds");
  const season = isTelugu ? (data.seasonTe || data.season || "ఖరీఫ్ & రబీ") : (data.season || "Kharif & Rabi");
  const score = data.suitabilityScore ? `${data.suitabilityScore}%` : (data.confidencePercent || "94%");

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img 
            src={cropPhoto} 
            alt={cropName} 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-2xl bg-emerald-600/90 text-white text-xs font-black flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{score} {isTelugu ? "అనుకూలత" : "Suitability"}</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              🏷️ {category}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
              🌦️ {season}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {isTelugu ? (data.reasonTe || data.reason) : (data.reason || "Optimal nutrient compatibility.")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;