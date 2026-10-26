import React from 'react';
import { useFullpage, SECTION_KEYS } from '../context/FullpageContext';
import { useLanguage } from '../context/LanguageContext';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const FullpageNavigation: React.FC = () => {
  const { currentSection, goToSection, nextSection, previousSection } = useFullpage();
  const { isRtl, content } = useLanguage();

  const labels = [
    content.nav.home,
    content.nav.about,
    content.nav.skills,
    content.nav.projects,
    content.nav.contact,
  ];

  return (
    <aside
      aria-label="Section Navigation"
      className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 ${
        isRtl ? 'left-4 xl:left-8' : 'right-4 xl:right-8'
      } z-40 flex-col items-center gap-3 select-none`}
    >
      {/* Up Button */}
      <button
        onClick={previousSection}
        disabled={currentSection === 0}
        className="p-1.5 border border-neutral-300 dark:border-[#2a2e3d] bg-white/90 dark:bg-[#161922]/90 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-orange-400 hover:border-black dark:hover:border-orange-500 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
        aria-label="Previous Section"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Vertical Track / Ticks */}
      <div className="flex flex-col items-center gap-2 py-2">
        {SECTION_KEYS.map((_, index) => {
          const isActive = currentSection === index;
          const numStr = `0${index + 1}`;

          return (
            <button
              key={index}
              onClick={() => goToSection(index)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
              aria-label={`Go to section ${labels[index]}`}
            >
              {/* Technical Indicator */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-mono text-[10px] transition-all duration-200 ${
                    isActive
                      ? 'font-bold text-neutral-950 dark:text-white scale-110'
                      : 'text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-700 dark:group-hover:text-neutral-300'
                  }`}
                >
                  {numStr}
                </span>
                <span
                  className={`block transition-all duration-300 ${
                    isActive
                      ? 'w-4 h-0.5 bg-fuchsia-600 dark:bg-orange-500'
                      : 'w-1.5 h-0.5 bg-neutral-300 dark:bg-[#2a2e3d] group-hover:w-2.5 group-hover:bg-neutral-500'
                  }`}
                />
              </div>

              {/* Tooltip on Hover */}
              <div
                className={`absolute ${
                  isRtl ? 'left-full ml-3' : 'right-full mr-3'
                } px-2 py-1 bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-md whitespace-nowrap`}
              >
                {labels[index]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        onClick={nextSection}
        disabled={currentSection === SECTION_KEYS.length - 1}
        className="p-1.5 border border-neutral-300 dark:border-[#2a2e3d] bg-white/90 dark:bg-[#161922]/90 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-orange-400 hover:border-black dark:hover:border-orange-500 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
        aria-label="Next Section"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
