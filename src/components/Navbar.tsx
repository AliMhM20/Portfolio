import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useFullpage, SECTION_KEYS } from '../context/FullpageContext';
import { Sun, Moon, Globe, ArrowRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, content, isRtl } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isDesktop, currentSection, goToSection } = useFullpage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string, index?: number) => {
    setMobileMenuOpen(false);
    if (isDesktop && typeof index === 'number') {
      goToSection(index);
      return;
    }
    if (isDesktop) {
      const idx = SECTION_KEYS.indexOf(id as any);
      if (idx !== -1) {
        goToSection(idx);
        return;
      }
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { id: 'home', label: content.nav.home },
    { id: 'about', label: content.nav.about },
    { id: 'skills', label: content.nav.skills },
    { id: 'projects', label: content.nav.projects },
    { id: 'contact', label: content.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f5f5f7]/95 dark:bg-[#101218]/95 backdrop-blur-xs border-b border-neutral-200 dark:border-[#222634] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Monogram */}
          <button
            onClick={() => scrollTo('home', 0)}
            className="flex items-center gap-3 text-start group cursor-pointer"
          >
            <div className="px-2.5 py-1 bg-black text-white dark:bg-orange-500 dark:text-black font-mono font-bold text-xs tracking-wider">
              AM
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-white uppercase">
                {language === 'fa' ? 'علی محمدی' : 'Ali Mohamadi'}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                AUT // CE_STUDENT
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, idx) => {
              const isActive = isDesktop && currentSection === idx;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id, idx)}
                  className={`text-xs font-semibold ${language === 'fa' ? '' : 'uppercase tracking-wider'} ${
                    isActive
                      ? 'text-black dark:text-white font-bold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-orange-400'
                  } transition-colors relative py-1 group cursor-pointer`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-fuchsia-600 dark:bg-orange-500 transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Controls & CTA */}
          <div className="flex items-center gap-2.5">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-300 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 text-xs font-mono font-semibold transition-colors cursor-pointer bg-white dark:bg-[#171a23]"
              title={language === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>{language === 'fa' ? 'EN' : 'FA'}</span>
            </button>

            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="p-1.5 border border-neutral-300 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer bg-white dark:bg-[#171a23]"
              title={theme === 'dark' ? 'حالت روشن' : 'Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-orange-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-700" />
              )}
            </button>

            {/* Solid Contact CTA Button */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 bg-black hover:bg-neutral-800 text-white dark:bg-orange-500 dark:hover:bg-orange-400 dark:text-black text-xs font-bold tracking-tight transition-colors cursor-pointer"
            >
              <span>{content.nav.cta}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-start px-3 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
