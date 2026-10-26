import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export const SECTION_KEYS = ['home', 'about', 'skills', 'projects', 'contact'] as const;
export type SectionKey = typeof SECTION_KEYS[number];

interface FullpageContextType {
  isDesktop: boolean;
  currentSection: number;
  prevSection: number;
  direction: number; // 1 for down/next, -1 for up/previous
  goToSection: (index: number) => void;
  nextSection: () => void;
  previousSection: () => void;
}

const FullpageContext = createContext<FullpageContextType | undefined>(undefined);

export const FullpageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const [currentSection, setCurrentSection] = useState<number>(0);
  const [prevSection, setPrevSection] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const isAnimatingRef = useRef<boolean>(false);

  // Toggle between desktop fullpage and mobile continuous scrolling
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSection = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= SECTION_KEYS.length) return;
    if (targetIndex === currentSection) return;

    const dir = targetIndex > currentSection ? 1 : -1;
    setPrevSection(currentSection);
    setDirection(dir);
    setCurrentSection(targetIndex);
    isAnimatingRef.current = true;

    // Cooldown duration matching the animation transition time
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 650);
  }, [currentSection]);

  const nextSection = useCallback(() => {
    if (currentSection < SECTION_KEYS.length - 1 && !isAnimatingRef.current) {
      goToSection(currentSection + 1);
    }
  }, [currentSection, goToSection]);

  const previousSection = useCallback(() => {
    if (currentSection > 0 && !isAnimatingRef.current) {
      goToSection(currentSection - 1);
    }
  }, [currentSection, goToSection]);

  // Wheel and keyboard listeners for fullpage desktop navigation
  useEffect(() => {
    if (!isDesktop) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // If modal or dialog is open, do not intercept
      if (document.body.style.overflow === 'hidden') return;

      // Allow inner scroll on content that exceeds viewport height
      const target = e.target as HTMLElement | null;
      const scrollableParent = target?.closest('.allow-inner-scroll') as HTMLElement | null;

      if (scrollableParent) {
        const atTop = scrollableParent.scrollTop <= 2;
        const atBottom = scrollableParent.scrollTop + scrollableParent.clientHeight >= scrollableParent.scrollHeight - 4;

        if (e.deltaY < 0 && !atTop) return;
        if (e.deltaY > 0 && !atBottom) return;
      }

      if (Math.abs(e.deltaY) < 25) return;
      e.preventDefault();

      if (isAnimatingRef.current) return;

      if (e.deltaY > 0) {
        nextSection();
      } else {
        previousSection();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        previousSection();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSection(SECTION_KEYS.length - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 50 && !isAnimatingRef.current) {
        if (deltaY > 0) {
          nextSection();
        } else {
          previousSection();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDesktop, nextSection, previousSection, goToSection]);

  return (
    <FullpageContext.Provider
      value={{
        isDesktop,
        currentSection,
        prevSection,
        direction,
        goToSection,
        nextSection,
        previousSection,
      }}
    >
      {children}
    </FullpageContext.Provider>
  );
};

export const useFullpage = () => {
  const context = useContext(FullpageContext);
  if (!context) {
    throw new Error('useFullpage must be used within FullpageProvider');
  }
  return context;
};
