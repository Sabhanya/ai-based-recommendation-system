import React, { useState } from 'react';

export const CropSuitabilityCheck = ({ cropKey }) => {
  const [params, setParams] = useState({
    pH: "6.5",
    temperature: "26",
    rainfall: "200"
  });

  const cropNames = {
    peas: { en: "Green Peas", te: "బఠాణి" },
    kiwi: { en: "Kiwi", te: "కివి" },
    dragonfruit: { en: "Dragon Fruit", te: "డ్రాగన్ ఫ్రూట్" },
    cauliflower: { en: "Cauliflower", te: "కాలీఫ్లవర్" },
    maize: { en: "Maize (Corn)", te: "మొక్కజొన్న" },
    rice: { en: "Rice (Paddy)", te: "వరి" },
    wheat: { en: "Wheat", te: "గోధుమ" },
    cotton: { en: "Cotton", te: "పత్తి" },
    banana: { en: "Banana", te: "అరటి" },
    mango: { en: "Mango", te: "మామిడి" },
    tomato: { en: "Tomato", te: "టమాట" },
    pineapple: { en: "Pineapple", te: "అనాస పండు" }
  };

  const key = (cropKey || "peas").toString().toLowerCase();
  const currentCrop = cropNames[key] || { 
    en: cropKey ? cropKey.toString().charAt(0).toUpperCase() + cropKey.toString().slice(1) : "Identified Crop", 
    te: "ఈ పంట" 
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 my-6">
      <div>
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Field Suitability Test</span>
        <h3 className="text-xl font-bold text-slate-900 mt-1">Field Suitability for {currentCrop.en}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 flex justify-between">
            <span>Soil pH Level</span>
            <span className="text-emerald-700 font-bold">{params.pH}</span>
          </label>
          <input
            type="range" min="4.5" max="9.0" step="0.1" value={params.pH}
            onChange={(e) => setParams({ ...params, pH: e.target.value })}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 flex justify-between">
            <span>Temperature (°C)</span>
            <span className="text-emerald-700 font-bold">{params.temperature} °C</span>
          </label>
          <input
            type="range" min="10" max="45" step="1" value={params.temperature}
            onChange={(e) => setParams({ ...params, temperature: e.target.value })}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 flex justify-between">
            <span>Rainfall (mm)</span>
            <span className="text-emerald-700 font-bold">{params.rainfall} mm</span>
          </label>
          <input
            type="range" min="20" max="350" step="5" value={params.rainfall}
            onChange={(e) => setParams({ ...params, rainfall: e.target.value })}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-emerald-900">✅ Highly Suitable for Your Farm</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">85% Match</span>
        </div>
        <p className="text-xs text-emerald-900">
          <strong>Why is this suitable?:</strong> {currentCrop.en} is recommended because your soil pH ({params.pH}), temperature ({params.temperature}°C), and rainfall ({params.rainfall}mm) match optimal requirements.
        </p>
      </div>
    </div>
  );
};

export default CropSuitabilityCheck;