import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Camera, 
  Sparkles, 
  Cpu, 
  Database, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Layers
} from 'lucide-react';

export const WorkflowSection = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-harvest-100 text-harvest-800 border border-harvest-200 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{isTelugu ? "రెండు ప్రధాన పద్ధతులు" : "Dual Core Workflows"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('workflows.heading')}
          </h2>
          <p className="text-slate-600 mt-2 text-base sm:text-lg">
            {t('workflows.subheading')}
          </p>
        </div>

        {/* Workflows Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Workflow 1 Card: Image Identification */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {t('workflows.workflow1.badge')}
                </span>
                <Camera className="w-6 h-6 text-amber-600" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {t('workflows.workflow1.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isTelugu 
                    ? "ఫోటో అప్‌లోడ్ చేయండి → AI పంటను గుర్తిస్తుంది → సాగు వివరాలు & అనుకూలతను తెలుసుకోండి"
                    : "Upload photo → AI classifies plant → Match dataset → Suitability analysis"}
                </p>
              </div>

              {/* 4 Pipeline Steps */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow1.step1')}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow1.step2')}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow1.step3')}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow1.step4')}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-8">
              <Link
                to="/identify"
                className="w-full btn-secondary py-3.5 flex items-center justify-center gap-2 group"
              >
                <span>{isTelugu ? "పంటను గుర్తించే పేజీకి వెళ్లండి" : "Try Crop Identification"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Workflow 2 Card: Manual Parameters */}
          <div className="bg-white rounded-3xl p-8 border border-agri-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-agri-100/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-agri-100 text-agri-800 border border-agri-200">
                  {t('workflows.workflow2.badge')}
                </span>
                <Sparkles className="w-6 h-6 text-agri-600" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {t('workflows.workflow2.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isTelugu 
                    ? "నేల & వాతావరణం నమోదు చేయండి → ML మోడల్ విశ్లేషణ → టాప్ 3 సిఫార్సులు → పూర్తి కారణాలు"
                    : "Enter NPK & weather → ML inference → Top 3 ranked recommendations → 'Why this crop?'"}
                </p>
              </div>

              {/* 4 Pipeline Steps */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-agri-100 text-agri-800 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow2.step1')}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-agri-100 text-agri-800 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow2.step2')}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-agri-100 text-agri-800 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow2.step3')}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-agri-100 text-agri-800 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {t('workflows.workflow2.step4')}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-8">
              <Link
                to="/recommend"
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 group"
              >
                <span>{isTelugu ? "పంట సిఫార్సు ప్రారంభించండి" : "Get Crop Recommendation"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
