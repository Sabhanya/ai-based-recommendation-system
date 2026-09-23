import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Sprout, 
  Menu, 
  X, 
  Sparkles, 
  Camera, 
  BookOpen, 
  History, 
  LayoutDashboard, 
  ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const { t, isTelugu } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', labelKey: 'nav.home', icon: Sprout },
    { path: '/recommend', labelKey: 'nav.recommend', icon: Sparkles, highlight: true },
    { path: '/identify', labelKey: 'nav.identify', icon: Camera },
    { path: '/catalog', labelKey: 'nav.catalog', icon: BookOpen },
    { path: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { path: '/history', labelKey: 'nav.history', icon: History },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-soft-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-agri-500 rounded-xl p-1"
            onClick={closeMenu}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-agri-700 via-agri-600 to-agri-500 flex items-center justify-center text-white shadow-md shadow-agri-600/20 group-hover:scale-105 transition-all">
              <Sprout className="w-7 h-7 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-sans">
                  Croply <span className="text-agri-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-harvest-100 text-harvest-700 border border-harvest-200">
                  Agri-AI
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 hidden md:block">
                {t('brand.tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-agri-50 text-agri-700 font-bold border border-agri-200/80 shadow-sm'
                      : link.highlight
                        ? 'text-agri-700 bg-emerald-50/60 hover:bg-emerald-100/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-agri-600' : 'text-slate-400'}`} />
                  <span>{t(link.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-agri-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-agri-50 text-agri-800 border border-agri-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-agri-600' : 'text-slate-400'}`} />
                  <span>{t(link.labelKey)}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
