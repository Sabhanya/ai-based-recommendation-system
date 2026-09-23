import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CloudSun, Droplet, Wind, Sun, Compass, Sparkles } from 'lucide-react';

export const WeatherWidget = () => {
  const { isTelugu } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState("andhra_delta");

  const regionWeather = {
    andhra_delta: {
      nameEn: "Coastal Andhra & Delta",
      nameTe: "కోస్తా ఆంధ్ర & డెల్టా ప్రాంతం",
      temp: "29°C",
      conditionEn: "Warm & Humid (Kharif Monsoon)",
      conditionTe: "ఉక్కపోత & నైరుతి రుతుపవనాలు",
      humidity: "82%",
      rainfall: "210 mm",
      wind: "14 km/h",
      advisoryEn: "Optimal for transplanting Paddy and sowing Maize in delta canal command areas.",
      advisoryTe: "డెల్టా ఆయకట్టు పరిధిలో వరి నాట్లకు మరియు మొక్కజొన్న విత్తడానికి చాలా అనుకూలం."
    },
    telangana_black: {
      nameEn: "Telangana Black Soil Plateau",
      nameTe: "తెలంగాణ నల్ల రేగడి ప్రాంతం",
      temp: "31°C",
      conditionEn: "Moderate Sun & Humid",
      conditionTe: "మధ్యస్థ ఎండ & తేమ",
      humidity: "68%",
      rainfall: "95 mm",
      wind: "12 km/h",
      advisoryEn: "Favorable conditions for Cotton squaring and Pigeon Pea vegetative development.",
      advisoryTe: "పత్తి కాయలు తొడిగే దశకు మరియు కంది పంట పెరుగుదలకు అనుకూల పరిస్థితులు."
    },
    rayalaseema_dry: {
      nameEn: "Rayalaseema Semi-Arid",
      nameTe: "రాయలసీమ మెట్ట ప్రాంతం",
      temp: "33°C",
      conditionEn: "Dry & Warm",
      conditionTe: "పొడి వాతావరణం & ఎండ",
      humidity: "52%",
      rainfall: "45 mm",
      wind: "16 km/h",
      advisoryEn: "Adopt drip irrigation and mulch for Groundnut and Pomegranate orchards to conserve moisture.",
      advisoryTe: "వేరుశనగ మరియు దానిమ్మ తోటల్లో తేమ ఆవిరి కాకుండా మల్చింగ్ & డ్రిప్ వాడండి."
    }
  };

  const current = regionWeather[selectedRegion];

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 text-white shadow-soft-lg space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-sky-700/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-sky-700/80 rounded-xl text-harvest-300">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">
              {isTelugu ? "వ్యవసాయ వాతావరణ సమాచారం" : "Agro-Meteorological Live Feed"}
            </h3>
            <p className="text-xs text-sky-200">
              {isTelugu ? "ప్రాంతీయ వాతావరణం & రైతు సలహాలు" : "Regional crop conditions & seasonal advisories"}
            </p>
          </div>
        </div>

        {/* Region Selector */}
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-sky-800/90 border border-sky-600 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="andhra_delta">{isTelugu ? "కోస్తా ఆంధ్ర & డెల్టా" : "Coastal Andhra Delta"}</option>
          <option value="telangana_black">{isTelugu ? "తెలంగాణ నల్ల రేగడి" : "Telangana Black Soil"}</option>
          <option value="rayalaseema_dry">{isTelugu ? "రాయలసీమ మెట్ట ప్రాంతం" : "Rayalaseema Semi-Arid"}</option>
        </select>
      </div>

      {/* Main Weather Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
          <span className="text-[10px] uppercase font-bold text-sky-200 block">
            {isTelugu ? "ఉష్ణోగ్రత" : "Temperature"}
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            {current.temp}
          </span>
          <span className="text-[10px] text-sky-300">
            {isTelugu ? current.conditionTe : current.conditionEn}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
          <span className="text-[10px] uppercase font-bold text-sky-200 block flex items-center gap-1">
            <Droplet className="w-3 h-3 text-sky-300" />
            <span>{isTelugu ? "గాలిలో తేమ" : "Humidity"}</span>
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            {current.humidity}
          </span>
          <span className="text-[10px] text-sky-300">Relative Index</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
          <span className="text-[10px] uppercase font-bold text-sky-200 block">
            {isTelugu ? "వర్షపాతం" : "Rainfall (Avg)"}
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            {current.rainfall}
          </span>
          <span className="text-[10px] text-sky-300">Seasonal total</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
          <span className="text-[10px] uppercase font-bold text-sky-200 block flex items-center gap-1">
            <Wind className="w-3 h-3 text-sky-300" />
            <span>{isTelugu ? "గాలి వేగం" : "Wind Speed"}</span>
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            {current.wind}
          </span>
          <span className="text-[10px] text-sky-300">Gentle breeze</span>
        </div>

      </div>

      {/* Advisory Box */}
      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-sky-100 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-harvest-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block mb-0.5">
            {isTelugu ? "ప్రస్తుత వ్యవసాయ వాతావరణ సలహా:" : "Seasonal Farming Action Advisory:"}
          </span>
          <p className="leading-relaxed text-sky-100">
            {isTelugu ? current.advisoryTe : current.advisoryEn}
          </p>
        </div>
      </div>

    </div>
  );
};
