import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Education: React.FC = () => {
  const { content, language } = useLanguage();
  const ed = content.education;

  return (
    <section id="education" className="py-8 lg:py-12 relative flex flex-col justify-center min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-[#222634] pb-4 mb-8">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-fuchsia-600 dark:text-orange-400 tracking-widest uppercase">
              // {ed.sectionNum} // ACADEMIC_CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              {ed.title}
            </h2>
          </div>
          <p className={language === 'fa' ? "text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-2 md:mt-0 font-medium" : "font-serif-editorial italic text-base sm:text-xl text-neutral-500 dark:text-neutral-400 mt-2 md:mt-0"}>
            {ed.subtitle}
          </p>
        </div>

        {/* Education Architecture Card */}
        <div className="max-w-4xl mx-auto relative p-6 sm:p-10 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 dark:border-[#222634] pb-4">
            <div>
              <div className="font-mono text-xs text-fuchsia-600 dark:text-orange-400 font-bold uppercase">
                DEGREE // {ed.degree}
              </div>
              <h3 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mt-1">
                {ed.institution}
              </h3>
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                {ed.field}
              </p>
            </div>

            <div className="font-mono text-xs text-neutral-400 text-start sm:text-end space-y-0.5">
              <div>{ed.period}</div>
              <div>{ed.location}</div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
            {ed.description}
          </p>

          {/* Key coursework in crisp tags */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
              // KEY_COURSEWORK
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ed.courses.map((course, idx) => (
                <div key={idx} className="p-3 bg-neutral-100 dark:bg-[#1b1f2b] border border-neutral-200 dark:border-[#2a2e3d] text-xs text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                  <span className="text-fuchsia-600 dark:text-orange-400 font-mono font-bold">#</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
