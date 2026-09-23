import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CROPS_DATASET, CROP_CATEGORIES } from '../data/cropsDataset';
import { CropCard } from '../components/catalog/CropCard';
import { CropDetailsModal } from '../components/catalog/CropDetailsModal';
import { Search, BookOpen, Filter, ArrowDown } from 'lucide-react';

const ITEMS_PER_PAGE = 16;

export const CropCatalogPage = () => {
  const { isTelugu, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredCrops = useMemo(() => {
    return CROPS_DATASET.filter(crop => {
      const categoryMatch = selectedCategory === "all" || crop.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const searchMatch = !q || 
        crop.name.toLowerCase().includes(q) ||
        (crop.nameTe && crop.nameTe.includes(q)) ||
        crop.scientificName.toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  const displayedCrops = filteredCrops.slice(0, visibleCount);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-agri-100 text-agri-900 border border-agri-200">
            <BookOpen className="w-3.5 h-3.5 text-agri-600" />
            <span>{isTelugu ? "80+ పంటల సమగ్ర సమాచారం" : "80+ Agricultural Crops Knowledgebase"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('catalog.title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('catalog.subtitle')}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>{isTelugu ? "వర్గం:" : "Category:"}</span>
            </span>

            {CROP_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-agri-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isTelugu ? cat.nameTe : cat.nameEn}
                </button>
              );
            })}
          </div>

        </div>

        {/* Dynamic Crops Count */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-2">
          <span>
            {isTelugu 
              ? `${filteredCrops.length} పంటలు కనుగొనబడ్డాయి (చూపిస్తున్నవి: ${displayedCrops.length})` 
              : `Found ${filteredCrops.length} agricultural crops (Displaying: ${displayedCrops.length})`}
          </span>
          {(searchTerm || selectedCategory !== "all") && (
            <button
              type="button"
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); setVisibleCount(ITEMS_PER_PAGE); }}
              className="text-agri-700 font-bold hover:underline"
            >
              {isTelugu ? "ఫిల్టర్లు తొలగించండి" : "Reset Filters"}
            </button>
          )}
        </div>

        {/* Crops Grid */}
        {filteredCrops.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {isTelugu ? "ఎటువంటి పంటలు కనుగొనబడలేదు" : "No crops matching your search"}
            </h3>
            <p className="text-xs text-slate-500">
              {isTelugu ? "దయచేసి ఇతర పంట పేరుతో ప్రయత్నించండి." : "Please try searching with another crop name or keyword."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onSelect={(selected) => setSelectedCrop(selected)}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredCrops.length && (
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="btn-secondary py-3 px-8 text-sm font-bold flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4" />
              <span>{isTelugu ? `మరిన్ని పంటలను చూడండి (${filteredCrops.length - visibleCount} మిగిలి ఉన్నాయి)` : `Load More Crops (${filteredCrops.length - visibleCount} remaining)`}</span>
            </button>
          </div>
        )}

        {/* Crop Details Modal */}
        {selectedCrop && (
          <CropDetailsModal
            crop={selectedCrop}
            onClose={() => setSelectedCrop(null)}
          />
        )}

      </div>
    </div>
  );
};
