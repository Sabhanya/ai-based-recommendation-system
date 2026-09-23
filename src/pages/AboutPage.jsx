import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Sparkles, 
  Camera, 
  Globe2, 
  CheckCircle2,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

export const AboutPage = () => {
  const { isTelugu, t } = useLanguage();

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
        
        {/* 1. Header Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-agri-100 text-agri-900 border border-agri-200 shadow-2xs">
            <Sprout className="w-4 h-4 text-agri-700" />
            <span>RythuMitra AI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('about.title')}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {t('about.subtitle')}
          </p>
        </div>

        {/* 2. Short Description Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-agri-700">
            <Sparkles className="w-4 h-4 text-agri-600" />
            <span>{t('about.descriptionTitle')}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {isTelugu 
              ? "భారతీయ రైతుల కోసం సులభమైన స్మార్ట్ వ్యవసాయ సహాయకుడు" 
              : "Smart & Reliable Agricultural Decision Support for Farmers"}
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            {t('about.descriptionText')}
          </p>
        </div>

        {/* 3. How It Helps Farmers (Core Features) */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('about.howItHelpsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Feature 1: Image Identification */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:border-agri-300 transition-all flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                {t('about.features.0.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('about.features.0.desc')}
              </p>
            </div>

            {/* Feature 2: Soil & Weather Recommendation */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:border-agri-300 transition-all flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-agri-100 text-agri-700 flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                {t('about.features.1.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('about.features.1.desc')}
              </p>
            </div>

            {/* Feature 3: Bilingual Support */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:border-agri-300 transition-all flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                {t('about.features.2.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('about.features.2.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Farmer-Friendly Mission & Purpose Statement */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-agri-900 to-emerald-900 text-white shadow-soft-lg space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-harvest-300">
            <HeartHandshake className="w-4 h-4" />
            <span>{t('about.purposeTitle')}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            {isTelugu 
              ? "రైతుల శ్రేయస్సు మరియు లాభదాయక సాగు కోసం సాంకేతిక సేవలు" 
              : "Empowering Farmers with Simple, Accessible & Actionable Advice"}
          </h3>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            {t('about.purposeText')}
          </p>
        </div>

        {/* 5. Quick Navigation Call-to-Action */}
        <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-black text-agri-950">
            {isTelugu ? "ఇప్పుడే మీ వ్యవసాయ సలహాలను ప్రారంభించండి" : "Start Using RythuMitra AI Today"}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/recommend" className="btn-primary py-3 px-6 text-xs font-bold flex items-center gap-2">
              <Sprout className="w-4 h-4 text-harvest-300" />
              <span>{isTelugu ? "పంట సిఫార్సు పొందండి" : "Get Crop Recommendation"}</span>
            </Link>
            <Link to="/identify" className="btn-secondary py-3 px-6 text-xs font-bold flex items-center gap-2">
              <Camera className="w-4 h-4 text-agri-700" />
              <span>{isTelugu ? "పంట ఫోటోను గుర్తించండి" : "Identify Crop Image"}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
