
import React from 'react';
import { Tab } from '../types';
import { NAV_TABS } from '../constants';
import { LogoIcon } from './Icons';

interface HeaderProps {
  onGoToHome: () => void;
  onGoToContract: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoToHome, onGoToContract }) => {
  const navItems = NAV_TABS.filter(tab => tab !== Tab.Home);

  return (
    <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
             <button onClick={onGoToHome} className="flex items-center space-x-2 text-fuchsia-400">
              <LogoIcon className="h-8 w-8" />
              <span className="text-2xl font-bold text-slate-100">FreeZone</span>
            </button>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((tab) => {
                return (
                  <button
                    key={tab}
                    onClick={onGoToHome}
                    className={`flex items-center text-sm font-medium transition-colors text-slate-400 hover:text-slate-100`}
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
                className="hidden md:inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500 transition-all transform hover:scale-105">
                새 계약서 작성
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
