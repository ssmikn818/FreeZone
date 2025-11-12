
import React from 'react';
import { LogoIcon } from './Icons';
// Fix: Replaced Page enum with the consolidated Tab enum for consistent props.
import { Tab } from '../types';

interface FooterProps {
  onGoToHome: () => void;
  onGoToContract: () => void;
}


const Footer: React.FC<FooterProps> = ({ onGoToHome, onGoToContract }) => {

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="space-y-4">
            <button onClick={onGoToHome} className="flex items-center space-x-2">
              <LogoIcon className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-slate-100">FreeZone</span>
            </button>
            <p className="text-slate-400 text-sm font-medium">
              혼자 일해도, 혼자 감당하진 않게.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg space-y-3 text-xs text-slate-400 max-w-sm">
             <p><strong className="text-slate-300">핵심 가치:</strong> FreeZone은 복잡한 계약 과정을 단순화하여 프리랜서가 자신의 권리를 쉽게 보호할 수 있도록 돕습니다.</p>
             <p><strong className="text-slate-300">정보제공 원칙:</strong> FreeZone은 특정 상품을 판매하지 않습니다. 객관적인 정보를 제공하여 프리랜서의 합리적인 의사결정을 돕습니다.</p>
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