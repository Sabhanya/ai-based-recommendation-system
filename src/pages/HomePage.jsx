import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeatureCard } from '../components/home/FeatureCard';
import { WorkflowSection } from '../components/home/WorkflowSection';
import { QuickStats } from '../components/home/QuickStats';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Camera, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';

export const HomePage = () => {
  const { isTelugu, t } = useLanguage();

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Dual Core Workflows */}
      <WorkflowSection />

      {/* 3. 6 Feature Cards */}
      <FeatureCard />

      {/* 4. Quick Agriculture Stats */}
      <QuickStats />

      {/* 5. Bottom Call to Action Banner */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agri-100 text-agri-800 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-agri-600" />
            <span>{isTelugu ? "ఇప్పుడే మీ పొలానికి సరైన పంటను కనుగొనండి" : "Start Precision Decision Support Today"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu 
              ? "మీ భూమికి లాభదాయకమైన పంటల ఎంపిక కేవలం ఒక్క క్లిక్‌తో" 
              : "Empowering Farmers with Transparent, AI-Driven Decisions"}
          </h2>

          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            {isTelugu
              ? "ఎలాంటి సాంకేతిక గందరగోళం లేకుండా, మీ భూమి నేల మరియు వాతావరణానికి తగిన పంటలను వెంటనే తెలుసుకోండి."
              : "Simple enough for rural farmers, rigorous enough for modern agronomy science. Discover your top-ranked crops today."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/recommend"
              className="w-full sm:w-auto btn-primary px-8 py-4 text-base shadow-lg shadow-agri-600/25"
            >
              <Sparkles className="w-5 h-5 text-harvest-300" />
              <span>{t('hero.ctaPrimary')}</span>
            </Link>

            <Link
              to="/catalog"
              className="w-full sm:w-auto btn-outline px-6 py-4 text-base"
            >
              <BookOpen className="w-5 h-5 text-slate-600" />
              <span>{t('nav.catalog')}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
