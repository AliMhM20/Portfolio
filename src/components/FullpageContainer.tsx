import React from 'react';
import { useFullpage } from '../context/FullpageContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Contact } from './Contact';
import { Footer } from './Footer';

const sections = [
  { id: 'home', component: <Hero /> },
  { id: 'about', component: <About /> },
  { id: 'skills', component: <Skills /> },
  { id: 'projects', component: <Projects /> },
  {
    id: 'contact',
    component: (
      <div className="min-h-full flex flex-col justify-between">
        <Contact />
        <Footer />
      </div>
    ),
  },
];

// Classic Minimalist Editorial Slide & Dissolve
const editorialSlideVariants: Variants = {
  initial: (dir: number) => ({
    y: dir > 0 ? 40 : -40,
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.99,
  }),
  animate: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -40 : 40,
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.99,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const FullpageContainer: React.FC = () => {
  const { currentSection, direction } = useFullpage();
  const activeId = sections[currentSection].id;
  const isNoScrollSection = activeId === 'skills' || activeId === 'projects';

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={sections[currentSection].id}
          custom={direction}
          variants={editorialSlideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`relative z-10 w-full h-full ${
            isNoScrollSection ? 'overflow-hidden' : 'overflow-y-auto allow-inner-scroll'
          } flex flex-col justify-center`}
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
