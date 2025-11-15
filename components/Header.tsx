
import React from 'react';
import { Tab } from '../types';
import { NAV_TABS } from '../constants';
import { LogoIcon } from './Icons';

interface HeaderProps {
  activeTab: Tab;
  onSelectTab: (tab: Tab) => void;
  onGoToContract: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onGoToContract }) => {
  const navItems = NAV_TABS;

  return (
    <header className="bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
             <button onClick={() => onSelectTab(Tab.Home)} className="flex items-center space-x-2 text-primary-400">
              <LogoIcon className="h-8 w-8" />
              <span className="text-2xl font-bold text-slate-100">FreeZone</span>
            </button>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((tab) => {
                return (
                  <button
                    key={tab}
                    onClick={() => onSelectTab(tab)}
                    className={`flex items-center text-sm font-medium transition-colors ${activeTab === tab ? 'text-primary-400' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
              <button 
                onClick={onGoToContract}
                className="hidden md:inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-primary-500 transition-all transform hover:scale-105">
                새 계약서 작성
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
