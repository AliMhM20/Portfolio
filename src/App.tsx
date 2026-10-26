import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { FullpageProvider, useFullpage } from './context/FullpageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FullpageContainer } from './components/FullpageContainer';
import { FullpageNavigation } from './components/FullpageNavigation';
import { InteractiveGridBackground } from './components/InteractiveGridBackground';

const MainLayout: React.FC = () => {
  const { isDesktop } = useFullpage();

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] text-neutral-900 dark:bg-[#101218] dark:text-neutral-100 transition-colors duration-250 relative overflow-hidden">
      <InteractiveGridBackground />
      <Navbar />

      {isDesktop ? (
        // Desktop / Laptop: Full-page Section Slide & Classic Editorial Transition
        <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
          <FullpageContainer />
          <FullpageNavigation />
        </div>
      ) : (
        // Mobile / Tablet: Fluid Natural Continuous Scrolling
        <>
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FullpageProvider>
          <MainLayout />
        </FullpageProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
