import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
  const { content, language } = useLanguage();

  return (
    <section id="skills" className="py-2 lg:py-3 relative flex flex-col justify-center min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-[#222634] pb-2 mb-3 lg:mb-4">
          <div className="space-y-0.5">
            <span className="font-mono text-[11px] font-bold text-fuchsia-600 dark:text-orange-400 tracking-widest uppercase">
              // {content.skills.sectionNum} // CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {content.skills.title}
            </h2>
          </div>
          <p className={language === 'fa' ? "text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 md:mt-0 font-medium" : "font-serif-editorial italic text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-1 md:mt-0"}>
            {content.skills.subtitle}
          </p>
        </div>

        {/* 4-Category Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {content.skills.categories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative p-3.5 sm:p-4 lg:p-4.5 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] shadow-xs space-y-2.5 lg:space-y-3"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-[#222634] pb-2">
                <div>
                  <span className="font-mono text-[10px] text-fuchsia-600 dark:text-orange-400 font-bold uppercase tracking-wider block">
                    {cat.code}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight mt-0.5">
                    {cat.name}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 font-semibold">
                  [{cat.skills.length}_MODULES]
                </span>
              </div>

              {/* Skills Progress Rows */}
              <div className="space-y-1.5 lg:space-y-2">
                {cat.skills.map((skill, index) => (
                  <div key={index} className="space-y-1 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-800 dark:text-neutral-200 text-xs">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        {skill.tag && (
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase">
                            [{skill.tag}]
                          </span>
                        )}
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          {skill.proficiency}%
                        </span>
                      </div>
                    </div>

                    {/* Architectural Clean Progress Track */}
                    <div className="w-full h-1 bg-neutral-100 dark:bg-[#202534] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.04 }}
                        className="h-full bg-black dark:bg-orange-500 group-hover:bg-fuchsia-600 dark:group-hover:bg-amber-300 transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
