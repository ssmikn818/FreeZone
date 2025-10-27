import React from 'react';
import { NAV_TABS } from '../constants';
import { Tab } from '../types';
import { LogoIcon } from './Icons';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
             <button onClick={() => setActiveTab(Tab.Home)} className="flex items-center space-x-2 text-fuchsia-400">
              <LogoIcon className="h-8 w-8" />
              <span className="text-2xl font-bold text-slate-100">FreeZone</span>
            </button>
          </div>
          <nav className="hidden md:flex space-x-2">
            {NAV_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-fuchsia-500/20 text-fuchsia-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div className="flex items-center">
             <button className="hidden md:inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500 transition-all transform hover:scale-105">
                로그인 / 회원가입
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;