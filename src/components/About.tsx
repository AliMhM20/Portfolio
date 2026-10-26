import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { content, language } = useLanguage();

  return (
    <section id="about" className="py-8 lg:py-12 relative flex flex-col justify-center min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header with Monospace Index */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-[#222634] pb-3 mb-6 lg:mb-8">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-fuchsia-600 dark:text-orange-400 tracking-widest uppercase">
              // {content.about.sectionNum} // BACKGROUND
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              {content.about.title}
            </h2>
          </div>
          {content.about.tagline ? (
            <p className={language === 'fa' ? "text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-2 md:mt-0 font-medium" : "font-serif-editorial italic text-base sm:text-xl text-neutral-500 dark:text-neutral-400 mt-2 md:mt-0"}>
              {content.about.tagline}
            </p>
          ) : null}
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Bio Column */}
          <div className="lg:col-span-7 space-y-4 text-start">
            <p className="text-sm sm:text-base lg:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              {content.about.bioParagraph1}
            </p>
            <p className="text-sm sm:text-base lg:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              {content.about.bioParagraph2}
            </p>
          </div>

          {/* Right Fact Sheet (Architectural Grid Box) */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-6 sm:p-7 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-[#222634] pb-3">
                <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  SPEC_SHEET // ALIMOHAMADI
                </span>
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-[#222634]">
                {content.about.facts.map((fact, index) => (
                  <div key={index} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className={`text-xs ${language === 'fa' ? 'font-semibold' : 'font-mono uppercase tracking-wider'} text-neutral-500 dark:text-neutral-400`}>
                      {fact.key}
                    </span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white text-start sm:text-end">
                      {fact.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-neutral-100 dark:bg-[#1b1f2b] border border-neutral-200 dark:border-[#2a2e3d] text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                <span>{language === 'fa' ? 'وضعیت کاری:' : 'STATUS:'}</span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {language === 'fa' ? 'آماده برای پروژه‌های جدی' : 'AVAILABLE_FOR_PROJECTS'}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
