import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useHistory } from '../../context/HistoryContext';
import { HistoryItemModal } from './HistoryItemModal';
import { 
  Search, 
  Trash2, 
  Eye, 
  Calendar, 
  Sparkles, 
  Camera, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

export const HistoryTable = () => {
  const { isTelugu, t } = useLanguage();
  const { history, deleteHistoryItem, clearHistory } = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredHistory = history.filter(item => {
    const q = searchTerm.toLowerCase();
    const isRec = item.type === "recommendation" || !item.type;
    const cropName = isRec 
      ? (item.topCrop?.name || "") + " " + (item.topCrop?.nameTe || "")
      : (item.crop?.name || "") + " " + (item.crop?.nameTe || "");
    const loc = item.inputs?.location || "";
    return cropName.toLowerCase().includes(q) || loc.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Controls: Search & Clear All */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
        
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('history.filterPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
          />
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(isTelugu ? "మీరు నిజంగా మొత్తం చరిత్రను తొలగించాలనుకుంటున్నారా?" : "Are you sure you want to clear all recommendation history?")) {
                clearHistory();
              }
            }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-all"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>{t('history.clearAllBtn')}</span>
          </button>
        )}

      </div>

      {/* History Records Table / Empty State */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            📜
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {t('history.emptyTitle')}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t('history.emptyDesc')}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">{t('history.colDate')}</th>
                  <th className="px-6 py-4">{t('history.colInputs')}</th>
                  <th className="px-6 py-4">{t('history.colTopCrop')}</th>
                  <th className="px-6 py-4">{t('history.colAlternatives')}</th>
                  <th className="px-6 py-4 text-right">{t('history.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredHistory.map((item) => {
                  const isRec = item.type === "recommendation" || !item.type;
                  const dateStr = new Date(item.timestamp).toLocaleDateString(isTelugu ? 'te-IN' : 'en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  const topCropName = isRec 
                    ? (isTelugu ? (item.topCrop?.nameTe || item.topCrop?.name) : item.topCrop?.name)
                    : (isTelugu ? (item.crop?.nameTe || item.crop?.name) : item.crop?.name);

                  const altCrops = isRec && item.recommendations
                    ? item.recommendations.slice(1, 3).map(r => isTelugu ? (r.cropTe || r.crop) : r.crop).join(", ")
                    : "-";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{dateStr}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {isRec ? "Manual Params" : "Image Vision"}
                        </span>
                      </td>

                      {/* Inputs */}
                      <td className="px-6 py-4 text-xs text-slate-600">
                        {isRec && item.inputs ? (
                          <div className="space-y-0.5">
                            <div><span className="font-bold text-slate-700">NPK:</span> {item.inputs.N}-{item.inputs.P}-{item.inputs.K} | <span className="font-bold text-slate-700">pH:</span> {item.inputs.pH}</div>
                            <div><span className="font-bold text-slate-700">Temp:</span> {item.inputs.temperature}°C | <span className="font-bold text-slate-700">Rain:</span> {item.inputs.rainfall}mm</div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[11px]">
                              Vision Model
                            </span>
                            <span>{item.crop?.confidence ? `${Math.round(item.crop.confidence * 100)}% Match` : ""}</span>
                          </div>
                        )}
                      </td>

                      {/* Top Crop */}
                      <td className="px-6 py-4">
                        <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                          <span className="text-base">🌾</span>
                          <span>{topCropName}</span>
                        </span>
                        {item.topCrop?.score && (
                          <span className="text-[11px] font-bold text-agri-700">
                            {Math.round(item.topCrop.score * 100)}% Suitability
                          </span>
                        )}
                      </td>

                      {/* Alternatives */}
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {altCrops}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedItem(item)}
                            className="p-2 rounded-xl text-agri-700 hover:bg-agri-50 border border-agri-200 transition-colors"
                            title="View recommendation breakdown"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteHistoryItem(item.id)}
                            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                            title="Delete this record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <HistoryItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </div>
  );
};
