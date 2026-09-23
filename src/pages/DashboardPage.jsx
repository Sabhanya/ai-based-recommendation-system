import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useHistory } from '../context/HistoryContext';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { RecentPredictions } from '../components/dashboard/RecentPredictions';
import { HistoryItemModal } from '../components/history/HistoryItemModal';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  Sprout, 
  Award, 
  Calendar, 
  TrendingUp, 
  Camera, 
  BookOpen, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export const DashboardPage = () => {
  const { isTelugu, t } = useLanguage();
  const { stats } = useHistory();
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const topCropDisplay = isTelugu 
    ? (stats.topCrop === "Rice (Paddy)" ? "వరి (Paddy)" : stats.topCrop)
    : stats.topCrop;

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-agri-100 text-agri-900 border border-agri-200">
              <LayoutDashboard className="w-3.5 h-3.5 text-agri-600" />
              <span>{isTelugu ? "రైతు సలహా కేంద్రం" : "Farmer Decision Center"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('dashboard.title')}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              {t('dashboard.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/recommend"
              className="btn-primary py-2.5 px-5 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-harvest-300" />
              <span>{t('hero.ctaPrimary')}</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <DashboardCard
            title={t('dashboard.kpiTotal')}
            value={stats.totalCount}
            subtitle={isTelugu ? "భద్రపరిచిన విశ్లేషణలు" : "Recorded farm queries"}
            icon={Sparkles}
            colorScheme="emerald"
            badge={{ label: "Status", val: "Active" }}
          />

          <DashboardCard
            title={t('dashboard.kpiTopCrop')}
            value={topCropDisplay}
            subtitle={isTelugu ? "అత్యధిక అనుకూలత రేటు" : "Highest frequency match"}
            icon={Sprout}
            colorScheme="amber"
            badge={{ label: "Rank", val: "#1" }}
          />

          <DashboardCard
            title={t('dashboard.kpiRecent')}
            value={stats.recentItem ? (isTelugu ? (stats.recentItem.topCrop?.nameTe || stats.recentItem.crop?.nameTe || "Rice") : (stats.recentItem.topCrop?.name || stats.recentItem.crop?.name || "Rice")) : "Rice"}
            subtitle={isTelugu ? "చివరిగా చేసిన సిఫార్సు" : "Latest executed session"}
            icon={Calendar}
            colorScheme="sky"
            badge={{ label: "Logged", val: "Recent" }}
          />

          <DashboardCard
            title={t('dashboard.kpiAccuracy')}
            value="98.2%"
            subtitle={isTelugu ? "క్రాస్-వ్యాలిడేషన్ స్కోర్" : "Model confidence metric"}
            icon={Award}
            colorScheme="purple"
            badge={{ label: "Engine", val: "ML + Vision" }}
          />

        </div>

        {/* Agro-Meteorological Weather Widget */}
        <WeatherWidget />

        {/* Tip of the Day Banner */}
        <div className="p-6 rounded-3xl bg-harvest-50/90 border border-harvest-200 text-harvest-950 shadow-soft flex items-start gap-4">
          <div className="p-3 bg-harvest-200 text-harvest-900 rounded-2xl flex-shrink-0">
            <Lightbulb className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-base text-harvest-950">
              {t('dashboard.tipTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-harvest-900 leading-relaxed font-medium">
              {t('dashboard.tipBody')}
            </p>
          </div>
        </div>

        {/* Main Content Grid: Recent Predictions + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <RecentPredictions onSelectHistoryItem={(item) => setSelectedHistoryItem(item)} />
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-4">
              <h3 className="font-extrabold text-base text-slate-900">
                {t('dashboard.quickActionsHeading')}
              </h3>

              <div className="space-y-2.5">
                <Link
                  to="/recommend"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-800 hover:text-emerald-900 text-xs font-bold transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>{isTelugu ? "కొత్త నేల విశ్లేషణ ప్రారంభించండి" : "Start New Crop Recommendation"}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/identify"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-slate-800 hover:text-amber-900 text-xs font-bold transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span>{isTelugu ? "పంట ఫోటోను గుర్తించండి" : "Identify Crop from Photo"}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/catalog"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-slate-800 hover:text-sky-900 text-xs font-bold transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span>{isTelugu ? "22+ పంటల వివరాలు చూడండి" : "Browse 22+ Crops Dataset"}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Helpline quick card */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-agri-400">
                {isTelugu ? "ఉచిత సహాయం" : "Farmer Assistance"}
              </span>
              <h4 className="font-extrabold text-sm">
                Kisan Call Center Helpline
              </h4>
              <p className="text-xs text-slate-400">
                Toll-free voice consultation with agricultural experts.
              </p>
              <a 
                href="tel:18001801551" 
                className="inline-block pt-1 text-sm font-black text-harvest-400 hover:underline"
              >
                📞 1800-180-1551
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* History Modal */}
      {selectedHistoryItem && (
        <HistoryItemModal
          item={selectedHistoryItem}
          onClose={() => setSelectedHistoryItem(null)}
        />
      )}
    </div>
  );
};
