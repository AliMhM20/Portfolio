import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import pic1 from '../assets/UniSchedule/pic1.png';
import pic2 from '../assets/UniSchedule/pic2.png';
import pic3 from '../assets/UniSchedule/pic3.png';
import pic4 from '../assets/UniSchedule/pic4.png';
import pic5 from '../assets/UniSchedule/pic5.png';

interface Slide {
  src: string;
  titleFA: string;
  titleEN: string;
  badge: string;
}

const slides: Slide[] = [
  {
    src: pic1,
    titleFA: 'پیش‌نمایش کلی و جدول هفتگی دروس',
    titleEN: 'Interactive Weekly Timetable Grid',
    badge: 'OVERVIEW // GRID',
  },
  {
    src: pic2,
    titleFA: 'بانک دروس دانشگاه با پشتیبانی از ۵ دانشگاه',
    titleEN: 'University Course Bank (5 Universities)',
    badge: 'MODULE // COURSE_BANK',
  },
  {
    src: pic3,
    titleFA: 'تشخیص بلادرنگ و ۱۰۰٪ تداخل‌های کلاسی',
    titleEN: 'Real-time Class Conflict Detection',
    badge: 'ENGINE // CONFLICT_CHECK',
  },
  {
    src: pic4,
    titleFA: 'سامانه زمان‌بندی و تداخل امتحانات پایان‌ترم',
    titleEN: 'Final Exam Scheduling & Alerts',
    badge: 'CALENDAR // EXAMS',
  },
  {
    src: pic5,
    titleFA: 'مدیریت چند سناریوی چیدمان و تنظیمات خروجی',
    titleEN: 'Multi-scenario Schedules & Export',
    badge: 'TOOLS // EXPORT',
  },
];

export const UniScheduleAlbum: React.FC = () => {
  const { language, isRtl } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const jumpTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: 'easeIn' as const,
      },
    }),
  };

  return (
    <div className="flex flex-col h-full justify-between bg-[#fafafc] dark:bg-[#12151d] p-3 sm:p-4 select-none relative overflow-hidden">
      
      {/* Top Browser / Mock Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-[#222634] pb-2 mb-2 font-mono text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
          <span className="text-[10px] text-neutral-400 ms-1 tracking-wider uppercase hidden sm:inline">
            {currentSlide.badge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Index Counter */}
          <span className="text-[11px] font-bold px-1.5 py-0.5 bg-neutral-200 dark:bg-[#1f2433] text-neutral-700 dark:text-orange-300">
            {currentIndex + 1} / {slides.length}
          </span>
          {/* Zoom Modal Trigger */}
          <button
            onClick={() => setZoomOpen(true)}
            className="p-1 hover:text-black dark:hover:text-orange-400 transition-colors cursor-pointer text-neutral-400"
            title={language === 'fa' ? 'بزرگ‌نمایی تصویر' : 'Expand Image'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Animated Image Display Viewport */}
      <div
        onClick={() => setZoomOpen(true)}
        className="relative flex-1 min-h-[170px] sm:min-h-[190px] flex items-center justify-center overflow-hidden cursor-zoom-in group"
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={currentSlide.src}
              alt={language === 'fa' ? currentSlide.titleFA : currentSlide.titleEN}
              className="max-h-[180px] sm:max-h-[200px] w-auto max-w-full object-contain rounded-xs shadow-md border border-neutral-200/80 dark:border-[#2a2e3d] group-hover:scale-[1.01] transition-transform duration-300"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating Quick Arrow Overlays on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(-1);
          }}
          className={`absolute ${isRtl ? 'right-1' : 'left-1'} top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white dark:bg-[#181b24]/90 dark:hover:bg-orange-500 dark:hover:text-black flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 transition-all cursor-pointer`}
          aria-label="Previous image"
        >
          {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(1);
          }}
          className={`absolute ${isRtl ? 'left-1' : 'right-1'} top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white dark:bg-[#181b24]/90 dark:hover:bg-orange-500 dark:hover:text-black flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 transition-all cursor-pointer`}
          aria-label="Next image"
        >
          {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Bar: Caption + Indicator Dots */}
      <div className="pt-2 border-t border-neutral-200 dark:border-[#222634] mt-2 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        
        {/* Caption */}
        <p className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 truncate max-w-[240px] text-center sm:text-start">
          {language === 'fa' ? currentSlide.titleFA : currentSlide.titleEN}
        </p>

        {/* Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => jumpTo(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-5 h-1.5 bg-fuchsia-600 dark:bg-orange-500'
                    : 'w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      {zoomOpen && (
        <div
          onClick={() => setZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] bg-neutral-900 border border-neutral-700 shadow-2xl p-2 flex flex-col"
          >
            <div className="flex items-center justify-between p-2 border-b border-neutral-800 text-white font-mono text-xs">
              <span>{language === 'fa' ? currentSlide.titleFA : currentSlide.titleEN}</span>
              <button
                onClick={() => setZoomOpen(false)}
                className="p-1 hover:text-orange-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={currentSlide.src}
                alt="Enlarged UniSchedule screenshot"
                className="max-h-[75vh] w-auto object-contain rounded-xs"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
