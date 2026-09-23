import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, Thermometer, Droplets, CloudRain, FlaskConical, Sparkles } from 'lucide-react';

export const CropInputForm = ({ onSubmit, isLoading }) => {
  const { isTelugu } = useLanguage();

  const [formData, setFormData] = useState({
    nitrogen: 40,
    phosphorus: 50,
    potassium: 40,
    temperature: 24,
    humidity: 60,
    ph: 6.8,
    rainfall: 70
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-[32px] border border-slate-200 shadow-soft">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
          <Sprout className="w-6 h-6 text-emerald-600" />
          <span>{isTelugu ? "నేల & వాతావరణ వివరాలు నమోదు చేయండి" : "Enter Soil & Climate Parameters"}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {isTelugu 
            ? "మీ భూమి సాయిల్ టెస్ట్ రిపోర్ట్ మరియు స్థానిక వాతావరణ వివరాలు ఇవ్వండి." 
            : "Provide soil test measurements and weather metrics for precise crop matching."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NPK Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <label className="block text-xs font-black text-emerald-950 uppercase tracking-wider mb-2">
              🌱 {isTelugu ? "నత్రజని (Nitrogen - N)" : "Nitrogen (N kg/ha)"}
            </label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              min="0"
              max="300"
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-white font-black text-slate-800 text-base focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">Optimal: 20 - 150 kg/ha</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
            <label className="block text-xs font-black text-blue-950 uppercase tracking-wider mb-2">
              🌾 {isTelugu ? "భాస్వరం (Phosphorus - P)" : "Phosphorus (P kg/ha)"}
            </label>
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              min="0"
              max="200"
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white font-black text-slate-800 text-base focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <span className="text-[10px] text-blue-700 font-semibold mt-1 block">Optimal: 15 - 90 kg/ha</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
            <label className="block text-xs font-black text-amber-950 uppercase tracking-wider mb-2">
              🌿 {isTelugu ? "పొటాషియం (Potassium - K)" : "Potassium (K kg/ha)"}
            </label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              min="0"
              max="250"
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white font-black text-slate-800 text-base focus:ring-2 focus:ring-amber-500 outline-none"
              required
            />
            <span className="text-[10px] text-amber-700 font-semibold mt-1 block">Optimal: 15 - 150 kg/ha</span>
          </div>
        </div>

        {/* Climate & Soil pH Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
              <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
              <span>{isTelugu ? "నేల పి.హెచ్ (pH)" : "Soil pH"}</span>
            </label>
            <input
              type="number"
              step="0.1"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              min="3.5"
              max="9.5"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 outline-none"
              required
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-red-500" />
              <span>{isTelugu ? "ఉష్ణోగ్రత (°C)" : "Temp (°C)"}</span>
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              min="10"
              max="50"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 outline-none"
              required
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-cyan-600" />
              <span>{isTelugu ? "తేమ (%)" : "Humidity (%)"}</span>
            </label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              min="10"
              max="100"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 outline-none"
              required
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isTelugu ? "వర్షపాతం (mm)" : "Rainfall (mm)"}</span>
            </label>
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              min="10"
              max="350"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform active:scale-98"
          >
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>
              {isLoading 
                ? (isTelugu ? "AI విశ్లేషిస్తోంది..." : "Evaluating Soil & Weather...") 
                : (isTelugu ? "🔍 ఉత్తమ పంటలను కనుగొనండి" : "🔍 Find Best Matching Crops")}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};