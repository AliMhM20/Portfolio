import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { UniScheduleAlbum } from './UniScheduleAlbum';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';

export const Projects: React.FC = () => {
  const { content, isRtl, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const flagship = content.projects.items.find((p) => p.id === 'unischedule');
  const otherProjects = content.projects.items.filter((p) => p.id !== 'unischedule');

  return (
    <section id="projects" className="py-2 lg:py-3 relative flex flex-col justify-center min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-[#222634] pb-2 mb-3 lg:mb-3.5">
          <div className="space-y-0.5">
            <span className="font-mono text-[11px] font-bold text-fuchsia-600 dark:text-orange-400 tracking-widest uppercase">
              // {content.projects.sectionNum} // WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {content.projects.title}
            </h2>
          </div>
          <p className={language === 'fa' ? "text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 md:mt-0 font-medium" : "font-serif-editorial italic text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-1 md:mt-0"}>
            {content.projects.subtitle}
          </p>
        </div>

        {/* Flagship Project Card (UniSchedule - 50/50 Split) */}
        {flagship && (
          <div className="relative mb-3 lg:mb-3.5 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-neutral-200 dark:lg:divide-[#222634]">
              
              {/* Right Column in RTL: Descriptions & Specifications */}
              <div className="p-3.5 sm:p-4 lg:p-5 space-y-2 sm:space-y-2.5 text-start flex flex-col justify-between">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black">
                      PROJECT_{flagship.number}
                    </span>
                    <span className="gradient-magenta-box text-[10px] px-2 py-0.5 rounded-none font-mono">
                      FLAGSHIP // UNI_SCHEDULE
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 ms-auto">
                      {flagship.year}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                      {flagship.title}
                    </h3>
                    <p className={language === 'fa' ? "text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-semibold" : "font-serif-editorial italic text-sm text-neutral-600 dark:text-neutral-400"}>
                      {flagship.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal line-clamp-2">
                    {flagship.description}
                  </p>

                  {/* Metrics */}
                  {flagship.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-0.5">
                      {flagship.metrics.map((m, idx) => (
                        <div key={idx} className="py-1 px-2 bg-neutral-100 dark:bg-[#1f2330] border border-neutral-200 dark:border-[#2a2e3d] text-center">
                          <div className={`text-[9px] ${language === 'fa' ? 'font-semibold' : 'font-mono uppercase'} text-neutral-400 dark:text-neutral-500`}>
                            {m.label}
                          </div>
                          <div className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 font-mono text-[10px] text-neutral-500 dark:text-neutral-400 pt-0.5">
                    {flagship.tags.map((t, idx) => (
                      <span key={idx}>#{t}</span>
                    ))}
                  </div>
                </div>

                {/* Actions & Links Bar */}
                <div className="pt-2 border-t border-neutral-200/80 dark:border-[#222634] flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(flagship)}
                    className="px-3.5 py-1.5 bg-black hover:bg-neutral-800 text-white dark:bg-orange-500 dark:hover:bg-orange-400 dark:text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{content.projects.detailsBtn}</span>
                    <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={flagship.githubUrl || 'https://github.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 border border-neutral-300 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-orange-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title={content.projects.viewGithub}
                    >
                      <GithubIcon size={14} />
                      <span className="hidden sm:inline">{content.projects.viewGithub}</span>
                    </a>

                    {flagship.liveUrl && (
                      <a
                        href={flagship.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 border border-neutral-300 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-orange-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title={content.projects.viewLive}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{content.projects.viewLive}</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>

              {/* Left Column in RTL: Interactive Photo Album */}
              <div className="min-h-[240px] sm:min-h-[260px] flex flex-col justify-center">
                <UniScheduleAlbum />
              </div>

            </div>
          </div>
        )}

        {/* Secondary Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-3.5">
          {otherProjects.map((p) => (
            <div
              key={p.id}
              className="relative p-3 sm:p-3.5 lg:p-4 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] shadow-xs flex flex-col justify-between group hover:border-black dark:hover:border-orange-500 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-fuchsia-600 dark:text-orange-400">PROJECT_{p.number}</span>
                  <span className="text-neutral-400">{p.year}</span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-black text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight">
                    {p.title}
                  </h4>
                  <p className={language === 'fa' ? "text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 font-semibold" : "font-serif-editorial italic text-xs text-neutral-500 dark:text-neutral-400"}>
                    {p.subtitle}
                  </p>
                </div>

                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal line-clamp-2">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-0.5 font-mono text-[9px] text-neutral-400">
                  {p.tags.map((t, idx) => (
                    <span key={idx}>#{t}</span>
                  ))}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-[#222634] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(p)}
                  className="text-xs font-mono font-bold text-black dark:text-white flex items-center gap-1 hover:text-fuchsia-600 dark:hover:text-orange-400 cursor-pointer"
                >
                  <span>{content.projects.detailsBtn}</span>
                  <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={p.githubUrl || 'https://github.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-neutral-400 hover:text-black dark:hover:text-orange-400 transition-colors"
                    title={content.projects.viewGithub}
                  >
                    <GithubIcon size={14} />
                  </a>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase">
                    [{p.category}]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
