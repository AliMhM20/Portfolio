import React, { useEffect } from 'react';
import type { ProjectItem } from '../types/portfolio';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon } from './icons/SocialIcons';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-neutral-200 dark:border-[#222634] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-fuchsia-600 dark:text-orange-400 font-bold uppercase">
                <span>PROJECT_{project.number}</span>
                <span>//</span>
                <span>{project.year}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-300 font-medium">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 border border-neutral-300 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Metrics Chips */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 bg-neutral-100 dark:bg-[#1b1f2b] border border-neutral-200 dark:border-[#2a2e3d] text-center">
                    <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold">
                      {m.label}
                    </div>
                    <div className="text-sm font-black text-neutral-900 dark:text-white mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture Details */}
            <div className="space-y-2 text-start">
              <h4 className="text-xs font-mono font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                // ARCHITECTURE & SPECIFICATIONS
              </h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {project.fullDetails || project.description}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights && (
              <div className="space-y-2 text-start">
                <h4 className="text-xs font-mono font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                  // KEY MILESTONES
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-baseline gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="text-fuchsia-600 dark:text-orange-400 font-mono font-bold">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2 pt-2 text-start">
              <h4 className="text-xs font-mono font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                // TECH_STACK
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-neutral-100 dark:bg-[#1b1f2b] text-neutral-800 dark:text-neutral-200 text-xs font-mono border border-transparent dark:border-[#2a2e3d]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 bg-neutral-50 dark:bg-[#10131b] border-t border-neutral-200 dark:border-[#222634] flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-mono font-bold text-neutral-500 hover:text-black dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              [ CLOSE_WINDOW ]
            </button>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-neutral-300 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <GithubIcon size={14} />
                <span>GITHUB_REPO</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-black hover:bg-neutral-800 text-white dark:bg-orange-500 dark:hover:bg-orange-400 dark:text-black text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  LIVE_DEMO →
                </a>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
