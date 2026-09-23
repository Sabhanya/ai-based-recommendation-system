import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceGuideButton } from '../common/VoiceGuideButton';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sprout, 
  HelpCircle, 
  Droplet, 
  Thermometer, 
  Leaf 
} from 'lucide-react';

export const WhyThisCropModal = ({ cropResult, onClose }) => {
  const { isTelugu, t } = useLanguage();

  if (!cropResult) return null;

  const cropName = isTelugu ? (cropResult.cropTe || cropResult.crop) : cropResult.crop;
  const reasonText = isTelugu ? (cropResult.reasonTe || cropResult.reason) : cropResult.reason;
  const breakdown = cropResult.breakdown || [];

  const getStatusBadge = (item) => {
    if (item.status === 'optimal') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isTelugu ? (item.statusLabelTe || "చాలా అనుకూలం") : (item.statusLabelEn || "Optimal Match")}</span>
        </span>
      );
    } else if (item.status === 'acceptable') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>{isTelugu ? (item.statusLabelTe || "మధ్యస్థం") : (item.statusLabelEn || "Manageable")}</span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>{isTelugu ? (item.statusLabelTe || "పరిధికి భిన్నం") : (item.statusLabelEn || "Out of Range")}</span>
        </span>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-agri-100 text-agri-700 flex items-center justify-center font-bold text-xl">
              {cropResult.icon || "🌾"}
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-agri-700 uppercase tracking-wider">
                <HelpCircle className="w-3 h-3" />
                <span>{isTelugu ? "ఎందుకు ఈ పంట సిఫార్సు చేయబడింది?" : "Why this recommendation?"}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {cropName}
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

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Summary Banner with Voice Guidance */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">
                {isTelugu ? "🌿 రైతు సలహా సారాంశం" : "🌿 Agronomic Suitability Summary"}
              </span>
              <VoiceGuideButton 
                text={reasonText} 
                labelEn="Listen to Explanation 🔊" 
                labelTe="వివరణ వినండి 🔊"
                size="sm"
              />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {reasonText}
            </p>
          </div>

          {/* Detailed Parameter Comparison Table */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>{isTelugu ? "నేల & వాతావరణ పోలికల పట్టిక" : "Parameter Alignment Breakdown"}</span>
            </h4>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">{isTelugu ? "అంశం" : "Parameter"}</th>
                      <th className="px-4 py-3">{isTelugu ? "మీ నేల విలువ" : "Your Value"}</th>
                      <th className="px-4 py-3">{isTelugu ? "పంట ఆదర్శ పరిధి" : "Crop Requirement"}</th>
                      <th className="px-4 py-3">{isTelugu ? "సరిపోలే స్థితి" : "Compatibility"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {breakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {isTelugu ? item.nameTe : item.nameEn}
                        </td>
                        <td className="px-4 py-3 font-bold text-agri-800">
                          {item.yourValue}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.idealRange}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(item)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Practical Cultivation Note */}
          {cropResult.cropDetails && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-agri-600" />
                <span>{isTelugu ? "రైతుకు ముఖ్యమైన సాగు సలహా:" : "Key Cultivation Recommendation:"}</span>
              </div>
              <p className="leading-relaxed">
                {isTelugu 
                  ? (cropResult.cropDetails.cultivationTipsTe || cropResult.cropDetails.cultivationTips) 
                  : cropResult.cropDetails.cultivationTips}
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
            {isTelugu ? "మూసివేయి (Close)" : "Close Breakdown"}
          </button>
        </div>

      </div>
    </div>
  );
};
