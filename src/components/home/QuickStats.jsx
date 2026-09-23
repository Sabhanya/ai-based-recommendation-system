import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickStats = () => {
  const { isTelugu } = useLanguage();

  return (
    <section className="py-14 bg-gradient-to-r from-agri-900 via-agri-800 to-emerald-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-agri-700/60">
          
          <div className="space-y-1 md:pr-6 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-harvest-300">
              99.5%
            </div>
            <div className="text-sm font-semibold text-agri-100">
              {isTelugu ? "మోడల్ ఖచ్చితత్వం (Accuracy)" : "ML Model Test Accuracy"}
            </div>
            <p className="text-xs text-agri-300">
              {isTelugu ? "నిజమైన వ్యవసాయ డేటాసెట్‌పై శిక్షణ పొందిన రాండమ్ ఫారెస్ట్" : "Trained Random Forest Classifier on real agronomic dataset"}
            </p>
          </div>

          <div className="space-y-1 md:px-6 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-harvest-300">
              80+
            </div>
            <div className="text-sm font-semibold text-agri-100">
              {isTelugu ? "పంటల విజ్ఞాన సర్వస్వం" : "Crop Catalog Knowledgebase"}
            </div>
            <p className="text-xs text-agri-300">
              {isTelugu ? "కూరగాయలు, పండ్లు, ఆకుకూరలు, ధాన్యాలు & తోట పంటలు" : "Vegetables, Fruits, Leafy Greens, Cereals, Pulses & Plantation"}
            </p>
          </div>

          <div className="space-y-1 md:px-6 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-harvest-300">
              100%
            </div>
            <div className="text-sm font-semibold text-agri-100">
              {isTelugu ? "ద్విభాషా & వాయిస్ సదుపాయం" : "Bilingual & Spoken Audio"}
            </div>
            <p className="text-xs text-agri-300">
              {isTelugu ? "ఇంగ్లీష్ మరియు రైతు-స్నేహపూర్వక తెలుగు" : "Full parity in English and Farmer-Friendly Telugu"}
            </p>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0 flex flex-col justify-center">
            <Link
              to="/about"
              className="inline-flex items-center justify-center md:justify-start gap-2 text-harvest-300 hover:text-harvest-200 text-sm font-bold transition-all group"
            >
              <span>{isTelugu ? "క్రాప్లీ AI గురించి చదవండి" : "Learn How Croply AI Works"}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <p className="text-xs text-agri-300">
              {isTelugu ? "రైతులకు పూర్తి ఉచిత నిర్ణయ సహాయం" : "Built for real-world farmer decision support"}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
