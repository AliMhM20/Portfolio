import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import me1Img from '../assets/Me1.png';

export const Hero: React.FC = () => {
  const { content, language, isRtl } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="home"
      className="relative min-h-full flex items-center justify-center py-6 lg:py-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Editorial Content Column */}
          <div className="lg:col-span-7 space-y-5 text-start">
            
            {/* Architectural Meta Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`inline-flex items-center gap-2 px-3 py-1 bg-neutral-200/80 dark:bg-[#181b24] border border-neutral-300/80 dark:border-[#2a2e3d] text-xs ${isRtl ? 'font-semibold' : 'font-mono font-medium uppercase tracking-wider'} text-neutral-800 dark:text-neutral-200`}
            >
              <span className="w-1.5 h-1.5 bg-fuchsia-600 dark:bg-orange-500 inline-block shrink-0" />
              <span>{content.hero.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.18]">
                {language === 'en' ? (
                  <>
                    <span>{content.hero.headlinePart1} </span>
                    <span className="gradient-magenta-box mx-1 shadow-sm">
                      {content.hero.highlightWord}
                    </span>
                    <br className="hidden sm:inline" />
                    <span> {content.hero.headlinePart2}</span>
                  </>
                ) : (
                  <>
                    <span>{content.hero.headlinePart1}</span>
                    <span className="gradient-magenta-box mx-2 shadow-sm">
                      {content.hero.highlightWord}
                    </span>
                    <br className="hidden sm:inline" />
                    <span>{content.hero.headlinePart2}</span>
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className={isRtl ? "text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed" : "font-serif-editorial italic text-lg sm:text-2xl text-neutral-600 dark:text-neutral-300 font-normal"}>
                {content.hero.subheadlineEditorial}
              </p>
            </motion.div>

            {/* Interactive Form & Action Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2 pt-1 max-w-lg"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={content.hero.inputPlaceholder}
                  className="flex-1 px-4 py-3 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-orange-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-black hover:bg-neutral-800 text-white dark:bg-orange-500 dark:hover:bg-orange-400 dark:text-black text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <span>{content.hero.actionButton}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </form>

              {/* Status or Micro-Note */}
              {submitted ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {language === 'fa' ? 'ایمیل شما ثبت شد. به زودی در تماس خواهم بود.' : 'Email received! Will get in touch shortly.'}
                  </span>
                </div>
              ) : (
                <p className={`text-xs text-neutral-500 dark:text-neutral-400 leading-normal ${isRtl ? '' : 'font-mono text-[11px]'}`}>
                  {content.hero.microNote}
                </p>
              )}
            </motion.div>

            {/* Architectural Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-4 gap-4 pt-4 border-t border-neutral-200 dark:border-[#1b2234]"
            >
              {content.hero.stats.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <div className={`text-xl sm:text-2xl font-black text-neutral-900 dark:text-white ${isRtl ? '' : 'font-mono'}`}>
                    {stat.number}
                  </div>
                  <div className={`text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 ${isRtl ? '' : 'uppercase tracking-wider'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Portrait Composition Column (Matching reference image) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              {/* Main Portrait Card Viewport */}
              <div className="relative w-72 sm:w-84 md:w-92 h-84 sm:h-96 md:h-[420px] flex items-center justify-center select-none overflow-visible">
                
                {/* Background Rectangular Gradient Band (Exactly as reference image) */}
                <div className="absolute w-[86%] sm:w-[90%] h-44 sm:h-52 md:h-56 portrait-gradient-canvas rounded-none border border-neutral-300 dark:border-[#2a2e3d] shadow-2xl z-0 pointer-events-none transition-all duration-300" />

                {/* Cutout Portrait Photo (Rising above the gradient top, extending below bottom) */}
                <div className="absolute inset-0 flex items-end justify-center overflow-visible pointer-events-none z-10">
                  <img
                    src={me1Img}
                    alt="Ali Mohamadi"
                    className="max-h-[118%] sm:max-h-[126%] object-contain object-bottom filter grayscale contrast-110 drop-shadow-2xl select-none"
                    draggable={false}
                  />
                </div>

                {/* Vertical tracked-out label (reference image style: KĀRLIS MICPAPS / ALI MOHAMADI) */}
                <div className="hidden sm:block absolute -right-7 sm:-right-8 top-1/2 -translate-y-1/2 origin-center rotate-90 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-orange-300/80 select-none pointer-events-none">
                  {content.hero.portraitLabel}
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
