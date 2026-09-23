import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  CloudSun, 
  Camera, 
  Award, 
  Languages, 
  Smartphone 
} from 'lucide-react';

export const FeatureCard = () => {
  const { t } = useLanguage();

  const features = [
    {
      key: "item1",
      icon: Sparkles,
      color: "bg-emerald-100 text-emerald-700",
      border: "hover:border-emerald-300"
    },
    {
      key: "item2",
      icon: CloudSun,
      color: "bg-sky-100 text-sky-700",
      border: "hover:border-sky-300"
    },
    {
      key: "item3",
      icon: Camera,
      color: "bg-amber-100 text-amber-700",
      border: "hover:border-amber-300"
    },
    {
      key: "item4",
      icon: Award,
      color: "bg-purple-100 text-purple-700",
      border: "hover:border-purple-300"
    },
    {
      key: "item5",
      icon: Languages,
      color: "bg-rose-100 text-rose-700",
      border: "hover:border-rose-300"
    },
    {
      key: "item6",
      icon: Smartphone,
      color: "bg-teal-100 text-teal-700",
      border: "hover:border-teal-300"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-agri-600 bg-agri-50 px-3 py-1 rounded-full border border-agri-200">
            Technology & Usability
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {t('features.heading')}
          </h2>
          <p className="text-slate-600 mt-2 text-base sm:text-lg">
            {t('features.subheading')}
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ key, icon: Icon, color, border }) => (
            <div 
              key={key}
              className={`p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-200 ${border} group`}
            >
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t(`features.${key}.title`)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(`features.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
