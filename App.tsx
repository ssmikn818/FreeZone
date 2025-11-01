import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import CurationPage from './components/GuidePage';
import ContractPage from './components/ContractPage';
import DepositPage from './components/DepositPage';
import SettlementPage from './components/SettlementPage';
import GuaranteePage from './components/GuaranteePage';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return <LandingPage setActiveTab={setActiveTab} />;
      case Tab.Curation:
        return <CurationPage />;
      case Tab.Contract:
        return <ContractPage />;
      case Tab.Deposit:
        return <DepositPage />;
      case Tab.Settlement:
        return <SettlementPage setActiveTab={setActiveTab} />;
      case Tab.Guarantee:
        return <GuaranteePage />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  const handleSetTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900">
      <Header activeTab={activeTab} setActiveTab={handleSetTab} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer setActiveTab={handleSetTab}/>
    </div>
  );
};

export default App;