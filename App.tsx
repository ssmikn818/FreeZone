import React, { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const contractRef = useRef<HTMLDivElement>(null);

  const handleSelectTab = (tab: Tab) => {
    // If we click a nav tab, scroll to top of new page
    if (tab !== activeTab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (tab === Tab.Contract) {
      setActiveTab(Tab.Home);
      setTimeout(() => {
        contractRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setActiveTab(tab);
    }
  };

  const handleGoToContract = useCallback(() => {
    contractRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950">
      <Header 
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onGoToContract={handleGoToContract} 
      />
      <main className="flex-grow">
        <LandingPage 
          contractRef={contractRef} 
          onGoToContract={handleGoToContract} 
          onSelectTab={handleSelectTab} 
        />
      </main>
      <Footer onGoToHome={() => handleSelectTab(Tab.Home)} onGoToContract={handleGoToContract} />
    </div>
  );
};

export default App;