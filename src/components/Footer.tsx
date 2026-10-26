import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon, LinkedinIcon, TelegramIcon } from './icons/SocialIcons';

export const Footer: React.FC = () => {
  const { content, isRtl } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-[#222634] bg-[#f5f5f7]/80 dark:bg-[#101218]/80 backdrop-blur-xs py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isRtl ? 'font-medium' : 'font-mono'} text-neutral-500 dark:text-neutral-400`}>
          
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-black text-white dark:bg-orange-500 dark:text-black font-mono font-bold">
              AM
            </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {content.footer.signature}
            </span>
          </div>

          {/* Social Icons in Footer */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AliMhM20"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-black dark:hover:text-orange-400 transition-colors"
              title="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/ali-mohamadi-aut"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-black dark:hover:text-orange-400 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://t.me/alimhm_20"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-black dark:hover:text-orange-400 transition-colors"
              title="Telegram"
            >
              <TelegramIcon size={16} />
            </a>
          </div>

          <div>
            {content.footer.copyright}
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-black dark:hover:text-orange-400 transition-colors cursor-pointer"
          >
            {content.footer.backToTop}
          </button>

        </div>
      </div>
    </footer>
  );
};
