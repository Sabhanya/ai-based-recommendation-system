import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  HelpCircle, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Exact Local Image Mapping to your files
const LOCAL_CROP_IMAGES = {
  maize: "/c1.jpeg",
  cotton: "/c10.jpeg",
  tomato: "/c6.jpeg",
  orange: "/c4.jpeg",
  papaya: "/c5.jpeg",
  pomegranate: "/c7.jpeg",
  potato: "/c8.jpeg",
  coconut: "/c9.jpeg",
  cabbage: "/c11.jpeg",
  sugarcane: "/c12.jpeg",
  brinjal: "/c13.jpeg",
  rice: "/c14.jpeg",
  watermelon: "/c15.jpeg",
  pineapple: "/c16.jpeg",
  wheat: "/c18.png",
  grapes: "/c19.jpeg",
  coffee: "/c20.jpeg",
  groundnut: "/c21.jpg",
  chickpea: "/c22.jpg",
  banana: "/c23.jpg",
  apple: "/c3.jpeg"
};
export const TopRecommendations = ({ recommendations = [], inputs = {}, onReset }) => {
  const langContext = useLanguage ? useLanguage() : { isTelugu: false };
  const isTelugu = langContext?.isTelugu || false;

  const [openWhy, setOpenWhy] = useState({});
  const [openGuide, setOpenGuide] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleWhy = (idx) => {
    setOpenWhy(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleGuide = (idx) => {
    setOpenGuide(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Safe resolver checking item.image -> LOCAL_CROP_IMAGES -> direct fallback
  const getCardPhoto = (item) => {
    if (item?.image && typeof item.image === 'string' && item.image.length > 3) {
      return item.image;
    }
    const rawKey = String(item?.id || item?.crop || item?.name || "").toLowerCase().trim();
    for (const [key, path] of Object.entries(LOCAL_CROP_IMAGES)) {
      if (rawKey.includes(key)) {
        return path;
      }
    }
    return "/c3.jpeg"; 
  };

  const toggleVoice = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const first = recommendations[0] || {};
    const name = isTelugu ? (first.cropTe || first.nameTe || first.crop) : (first.crop || first.name);
    const score = first.suitabilityScore || 95;

    const speech = isTelugu
      ? `మీ నేలకు సిఫార్సు చేయబడిన మొదటి పంట: ${name}. అనుకూలత: ${score} శాతం.`
      : `Top recommended crop is ${name} with ${score} percent suitability score.`;

    const utterance = new SpeechSynthesisUtterance(speech);
    utterance.lang = isTelugu ? 'te-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const badgeColors = [
    { badgeBg: "bg-amber-100 text-amber-900 border-amber-300", rankIcon: "🌾" },
    { badgeBg: "bg-indigo-50 text-indigo-900 border-indigo-200", rankIcon: "🌱" },
    { badgeBg: "bg-emerald-50 text-emerald-900 border-emerald-200", rankIcon: "🌿" }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* 1. Green Hero Banner */}
      <div className="bg-[#0b6623] rounded-3xl p-7 sm:p-9 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 text-white backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{isTelugu ? "AI పంట సిఫార్సులు సిద్ధంగా ఉన్నాయి" : "AI Crop Recommendation Ready"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-2">
              <span>🌾</span>
              <span>{isTelugu ? "మీ నేలకు టాప్ 3 సిఫార్సు చేసిన పంటలు" : "Top 3 Recommended Crops"}</span>
            </h2>

            <p className="text-sm text-emerald-100 font-medium">
              {isTelugu 
                ? "మీరు నమోదు చేసిన నేల పోషకాలు మరియు పర్యావరణ వివరాల ఆధారంగా:" 
                : "Based on your entered soil nutrients and environmental parameters:"}
            </p>

            {/* Input Parameter Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-lg bg-white/15 text-xs font-bold border border-white/10">N: {inputs.N || inputs.nitrogen || 80}</span>
              <span className="px-3 py-1 rounded-lg bg-white/15 text-xs font-bold border border-white/10">P: {inputs.P || inputs.phosphorus || 50}</span>
              <span className="px-3 py-1 rounded-lg bg-white/15 text-xs font-bold border border-white/10">K: {inputs.K || inputs.potassium || 40}</span>
              <span className="px-3 py-1 rounded-lg bg-white/15 text-xs font-bold border border-white/10">pH: {inputs.ph || inputs.pH || 6.5}</span>
              <span className="px-3 py-1 rounded-lg bg-white/15 text-xs font-bold border border-white/10">Temp: {inputs.temperature ? `${inputs.temperature}°C` : "25°C"}</span>
              <span className="px-3 py-1 rounded-lg bg-white/15 text-xs font-bold border border-white/10">Rain: {inputs.rainfall ? `${inputs.rainfall}mm` : "100mm"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-start lg:self-center">
            <button
              type="button"
              onClick={toggleVoice}
              className="px-5 py-3 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? (isTelugu ? "వాయిస్ ఆపు" : "Stop Audio") : (isTelugu ? "సిఫార్సులు వినండి" : "Read Recommendations")}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isTelugu ? "ప్రింట్" : "Print"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Top 3 Cards in a Single Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {recommendations.slice(0, 3).map((item, index) => {
          const cropName = item.crop || item.name || "Crop";
          const cropNameTe = item.cropTe || item.nameTe || cropName;
          const scientific = item.scientific || "Botanical Species";
          const category = isTelugu ? (item.categoryTe || item.category || "వ్యవసాయ పంట") : (item.category || "Agriculture");
          const season = isTelugu ? (item.seasonTe || item.season || "ఖరీఫ్ & రబీ") : (item.season || "Kharif & Rabi");
          const score = item.suitabilityScore || 90;

          const isWhyOpen = !!openWhy[index];
          const isGuideOpen = !!openGuide[index];

          const photoSrc = getCardPhoto(item);
          const badgeInfo = badgeColors[index] || badgeColors[0];
          const badgeText = isTelugu ? (item.badgeLabelTe || `#${index + 1} ఎంపిక`) : (item.badgeLabel || `#${index + 1} Best Match`);

          return (
            <div 
              key={index}
              className="bg-white rounded-[28px] border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className={`px-3.5 py-1.5 rounded-full text-xs font-black border flex items-center gap-1.5 ${badgeInfo.badgeBg}`}>
                    <span>{badgeInfo.rankIcon}</span>
                    <span>{badgeText}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-black text-[#0b6623] block leading-none">
                      {score}%
                    </span>
                    <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                      {isTelugu ? "అనుకూలత" : "SUITABILITY"}
                    </span>
                  </div>
                </div>

                {/* Crop Name & Real Local Produce Photo */}
                <div className="flex items-center gap-4 pt-1">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-inner flex items-center justify-center">
                    <img 
                      src={photoSrc} 
                      alt={cropName} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        // Try fallback to .jpg if .jpeg fails
                        if (e.target.src.endsWith('.jpeg')) {
                          e.target.src = e.target.src.replace('.jpeg', '.jpg');
                        } else if (e.target.src.endsWith('.jpg')) {
                          e.target.src = e.target.src.replace('.jpg', '.png');
                        } else {
                          e.target.src = "/c14.jpeg"; // Fallback to safe crop image
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight truncate">
                      {isTelugu ? cropNameTe : cropName}
                    </h3>
                    <p className="text-xs text-slate-400 italic truncate font-medium">
                      {scientific}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        {category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        {season}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accent Line */}
                <div className="w-full h-1 bg-gradient-to-r from-[#0b6623] to-[#22c55e] rounded-full opacity-80"></div>

                {/* Agronomic Rationale Text */}
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isTelugu ? (item.reasonTe || item.reason) : item.reason}
                </p>

                {/* Dropdown 1: Why this crop */}
                {isWhyOpen && (
                  <div className="p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1.5 animate-fadeIn">
                    <div className="font-extrabold text-[#0b6623] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isTelugu ? "శాస్త్రీయ కారణం (Scientific Rationale):" : "Scientific Rationale:"}</span>
                    </div>
                    <p className="leading-relaxed">
                      {isTelugu ? (item.reasonTe || item.reason) : item.reason}
                    </p>
                  </div>
                )}

                {/* Dropdown 2: Cultivation Guide */}
                {isGuideOpen && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 font-medium space-y-2.5 animate-fadeIn">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>{isTelugu ? `${cropNameTe} సాగు మార్గదర్శకాలు:` : `Cultivation Guide for ${cropName}:`}</span>
                    </div>
                    <div className="space-y-1.5 text-[11px] leading-relaxed">
                      <p>🚜 <strong>{isTelugu ? "నేల తయారీ:" : "Land Prep:"}</strong> {item.guide?.land || (isTelugu ? "నేలను బాగా మెత్తగా దుక్కి చేసి సిద్ధం చేయాలి." : "Fine tilth, level bed with adequate drainage.")}</p>
                      <p>🌱 <strong>{isTelugu ? "విత్తే సమయం:" : "Sowing:"}</strong> {item.guide?.sow || (isTelugu ? "సిఫార్సు చేసిన దూరంలో విత్తుకోవాలి." : "Sow with treated certified seeds at recommended spacing.")}</p>
                      <p>🌿 <strong>{isTelugu ? "ఎరువులు:" : "Fertilizer:"}</strong> {item.guide?.fert || (isTelugu ? "సమతుల్య NPK ఎరువులు వేయాలి." : "Balanced NPK as per local soil test advisory.")}</p>
                      <p>💧 <strong>{isTelugu ? "నీటి తడులు:" : "Irrigation:"}</strong> {item.guide?.water || (isTelugu ? "పూత మరియు కాయ దశల్లో సమతుల్య తేమ ఉంచాలి." : "Maintain optimum moisture during critical stages.")}</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => toggleWhy(index)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isWhyOpen 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isTelugu ? "ఈ పంట ఎందుకు?" : "Why this crop?"}</span>
                  {isWhyOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => toggleGuide(index)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isGuideOpen 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isTelugu ? "సాగు పద్ధతులు" : "Cultivation Guide"}</span>
                  {isGuideOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. Bottom Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-[#0b6623]" />
          <span>{isTelugu ? "ఈ సిఫార్సులు మీ అడ్వైజరీ చరిత్రలో భద్రపరచబడ్డాయి." : "These recommendations have been saved to your advisory history."}</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="py-2.5 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>{isTelugu ? "వివరాలు సవరించి మళ్లీ ప్రయత్నించండి" : "Modify Parameters / Try Again"}</span>
        </button>
      </div>

    </div>
  );
};

export default TopRecommendations;