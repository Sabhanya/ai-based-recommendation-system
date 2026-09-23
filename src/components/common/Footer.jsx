import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, PhoneCall, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const Footer = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Kisan Helpline Top Banner */}
      <div className="bg-agri-800 border-b border-agri-700/80 py-3.5 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-agri-700 rounded-lg text-harvest-300">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-sm">
                {isTelugu ? "కిసాన్ కాల్ సెంటర్ (టోల్ ఫ్రీ సలహాదారు):" : "Kisan Call Center (Government Toll-Free Helpline):"}
              </span>
              <a 
                href="tel:18001801551" 
                className="ml-2 font-extrabold text-harvest-300 hover:text-harvest-200 underline text-base"
              >
                1800-180-1551
              </a>
            </div>
          </div>

          <div className="text-xs text-agri-200 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-agri-400" />
            <span>{isTelugu ? "24/7 ఉచిత వ్యవసాయ సలహా సేవలు" : "24/7 Free Agricultural Advisory Support"}</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Croply <span className="text-agri-400">AI</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {t('footer.aboutText')}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-agri-400 border border-slate-700">
                🌱 Precision Agriculture
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-harvest-400 border border-slate-700">
                🌾 Real ML Models
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-sky-400 border border-slate-700">
                🗣️ English & తెలుగు
              </span>
            </div>
          </div>

          {/* Col 2: Core Workflows */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isTelugu ? "ప్రధాన సేవలు" : "AI Services"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/recommend" className="text-slate-400 hover:text-agri-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-agri-500" />
                  <span>{t('nav.recommend')}</span>
                </Link>
              </li>
              <li>
                <Link to="/identify" className="text-slate-400 hover:text-agri-400 transition-colors">
                  {t('nav.identify')}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-slate-400 hover:text-agri-400 transition-colors">
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-agri-400 transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-slate-400 hover:text-agri-400 transition-colors">
                  {t('nav.history')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Farmer Advisory */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isTelugu ? "రైతు సలహా సమాచారం" : "Farmer Resources"}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isTelugu 
                ? "నేల స్వభావం, వాతావరణం మరియు సరైన పంట ఎంపిక కోసం సులభమైన AI మార్గదర్శనం."
                : "Free decision support to help farmers evaluate soil nutrients, weather parameters, and select resilient crops."}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-agri-400 hover:text-agri-300 underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isTelugu ? "క్రాప్లీ AI గురించి చదవండి" : "Read About Croply AI"}</span>
            </Link>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for Indian agriculture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
