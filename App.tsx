
import React, { useRef, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import { Tab } from './types';

const App: React.FC = () => {
  const contractRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = useCallback(() => {
    if (contractRef.current) {
      contractRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950">
      <Header onGoToHome={handleScrollToTop} onGoToContract={handleScrollToTop} />
      <main className="flex-grow">
        <LandingPage contractRef={contractRef} onGoToContract={handleScrollToTop} />
      </main>
      <Footer onGoToHome={handleScrollToTop} onGoToContract={handleScrollToTop}/>
    </div>
  );
};

export default App;