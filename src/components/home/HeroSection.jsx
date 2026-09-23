import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  Camera, 
  Sprout, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Volume2, 
  Award,
  ArrowRight
} from 'lucide-react';

export const HeroSection = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-agri-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/60">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-agri-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-harvest-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-agri-100/90 border border-agri-300 text-agri-900 text-xs sm:text-sm font-bold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-agri-600 animate-ping" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {isTelugu ? (
                <>
                  మీ పొలానికి అనువైన <span className="text-agri-600 underline decoration-harvest-400 decoration-4 underline-offset-4">సరైన పంటను</span> ఎంచుకోండి
                </>
              ) : (
                <>
                  Smart Crop Guidance for <span className="text-agri-600 underline decoration-harvest-400 decoration-4 underline-offset-4">Maximum Harvest Yield</span>
                </>
              )}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/recommend"
                className="w-full sm:w-auto btn-primary text-base px-8 py-4 shadow-lg shadow-agri-600/25 group"
              >
                <Sparkles className="w-5 h-5 text-harvest-300 group-hover:rotate-12 transition-transform" />
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/identify"
                className="w-full sm:w-auto btn-secondary text-base px-7 py-4"
              >
                <Camera className="w-5 h-5 text-agri-700" />
                <span>{t('hero.ctaSecondary')}</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-agri-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">{t('hero.quickStats.accuracy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-agri-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">{t('hero.quickStats.crops')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-agri-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">{t('hero.quickStats.languages')}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-agri-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">{t('hero.quickStats.speed')}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Interactive Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Graphic */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 text-white">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80" 
                  alt="Indian lush green agriculture farm field" 
                  className="w-full h-80 sm:h-96 object-cover opacity-85"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Card Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-sm">
                    <Award className="w-3.5 h-3.5" />
                    <span>{isTelugu ? "టాప్ సిఫార్సు ఫలితం" : "AI Crop Recommendation"}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-white">
                        {isTelugu ? "వరి (Paddy)" : "Rice (Paddy)"}
                      </h3>
                      <p className="text-xs text-emerald-200">
                        {isTelugu ? "నేల pH: 6.5 | వర్షపాతం: 220 mm" : "Soil pH: 6.5 | Rainfall: 220 mm"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-harvest-400">96%</div>
                      <div className="text-[10px] uppercase font-bold text-slate-300">
                        {isTelugu ? "అనుకూలత" : "Suitability"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Soil Health */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-soft-lg border border-slate-100 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center font-bold text-lg">
                  🧪
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">
                    {isTelugu ? "NPK & pH విశ్లేషణ" : "NPK & pH Analysis"}
                  </div>
                  <div className="text-[11px] text-agri-600 font-medium">
                    {isTelugu ? "ఆప్టిమల్ పోషకాలు" : "Optimal Match"}
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Voice Enabled */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-soft-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-harvest-100 text-harvest-700 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">
                    {isTelugu ? "వాయిస్ సలహాదారు" : "Voice Guidance"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isTelugu ? "తెలుగు & English" : "Spoken Advisory"}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
