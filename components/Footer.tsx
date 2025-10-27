import React from 'react';
import { LogoIcon } from './Icons';
import { Tab } from '../types';

interface FooterProps {
  setActiveTab: (tab: Tab) => void;
}


const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const footerLinks = {
    solution: [
      { name: '계약', tab: Tab.Contract },
      { name: '예치', tab: Tab.Deposit },
      { name: '정산', tab: Tab.Settlement },
      { name: '보장', tab: Tab.Guarantee },
    ],
    resources: [
      { name: '가이드', tab: Tab.Curation },
      { name: '업계별', tab: Tab.Industry },
    ],
  };


  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <LogoIcon className="h-8 w-8 text-fuchsia-500" />
              <span className="text-2xl font-bold text-slate-100">FreeZone</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">
              혼자 일해도, 혼자 감당하진 않게.
            </p>
             <div className="bg-slate-800/50 p-4 rounded-lg space-y-3 text-xs text-slate-400 max-w-sm">
                <p><strong className="text-slate-300">안전결제 원칙:</strong> FreeZone은 대금을 직접 보관하지 않으며, 공인된 PG(결제 대행)사를 통해 안전하게 처리됩니다.</p>
                <p><strong className="text-slate-300">정보제공 원칙:</strong> FreeZone은 특정 상품을 판매하지 않습니다. 객관적인 정보를 제공하여 프리랜서의 합리적인 의사결정을 돕습니다.</p>
              </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">솔루션</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.solution.map(link => (
                <li key={link.name}>
                  <button onClick={() => setActiveTab(link.tab)} className="text-base text-slate-400 hover:text-white transition-colors">{link.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">리소스</h3>
            <ul className="mt-4 space-y-2">
               {footerLinks.resources.map(link => (
                <li key={link.name}>
                  <button onClick={() => setActiveTab(link.tab)} className="text-base text-slate-400 hover:text-white transition-colors">{link.name}</button>
                </li>
              ))}
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">회사</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white transition-colors">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} FreeZone Corp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;