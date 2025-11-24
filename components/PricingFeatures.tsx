
import React, { useState } from 'react';
import { 
  ContractIcon, 
  DepositIcon, 
  SettlementIcon, 
  ShieldCheckIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  BellIcon
} from './Icons';

interface PricingFeaturesProps {
  onGoToContract?: () => void;
}

const PricingFeatures: React.FC<PricingFeaturesProps> = ({ onGoToContract }) => {
  const [isNotified, setIsNotified] = useState(false);

  const handleNotify = () => {
    setIsNotified(true);
    setTimeout(() => setIsNotified(false), 3000);
    alert("사전 알림이 신청되었습니다! 안전 기능이 출시되면 가장 먼저 알려드릴게요.");
  };

  return (
    <div className="bg-slate-950 py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-6 leading-tight">
            혼자 일하지만,<br />
            <span className="text-primary-400">보호는 대기업처럼.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            프리랜서라고 불안까지 감수할 필요는 없으니까.<br className="hidden sm:block" />
            Freezone 시스템이 계약 뒤의 리스크를 빈틈없이 방어합니다.
          </p>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr mb-16">
          
          {/* Card A: Base (Left Column, Full Height) */}
          <div 
            onClick={onGoToContract}
            className="lg:col-span-1 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 flex flex-col relative group cursor-pointer transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-2xl"></div>
            <div className="mb-6 flex items-start justify-between">
              <div className="p-3 bg-primary-900/30 rounded-xl">
                <ContractIcon className="w-8 h-8 text-primary-400" />
              </div>
              <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs font-bold rounded-full border border-primary-500/20">
                Free / Lifetime
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">표준 전자 계약</h3>
            <p className="text-primary-400 font-medium text-sm mb-4 tracking-wide uppercase">Base Module</p>
            <p className="text-slate-400 leading-relaxed mb-8">
              평생 무료, 무제한 생성.<br/>
              복잡한 절차 없이 링크 하나로 법적 효력을 만듭니다.
            </p>

            <ul className="space-y-3 mb-8 flex-grow">
              {[
                '표준 템플릿 제공', 
                'PDF 자동 변환', 
                '카카오톡 서명 요청', 
                '변경 이력 감사 로그'
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-slate-300 text-sm">
                  <CheckCircleIcon className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-bold transition-colors flex items-center justify-center group-hover:bg-primary-500">
              지금 시작하기 <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Right Column Container (Grid for B, C, D) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card B: Escrow (Full Width in Right Column) */}
            <div className="md:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 relative group transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-900/30 rounded-xl">
                    <DepositIcon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">정산 보호 (Escrow)</h3>
                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-wide">Add-on</p>
                  </div>
                </div>
                <span className="self-start px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-full border border-slate-700">
                  Coming Soon
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p className="text-lg font-bold text-slate-200 mb-2">"입금 확인 전엔, 파일도 잠깁니다."</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                    클라이언트의 입금이 시스템에 묶여야 작업물이 넘어갑니다. '먹튀'라는 변수 자체를 기술적으로 차단하세요.
                    </p>
                </div>
                <ul className="space-y-2">
                    {[
                        '가상계좌 안전 결제',
                        '단계별 조건부 승인',
                        '노쇼 방지 예약금 자동 설정'
                    ].map((feature, i) => (
                        <li key={i} className="flex items-center text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3"></div>
                        {feature}
                        </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Card C: Settlement */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 relative group transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-violet-600 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-violet-900/30 rounded-xl">
                  <SettlementIcon className="w-6 h-6 text-violet-400" />
                </div>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-[10px] font-bold rounded border border-slate-700">Coming Soon</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">자동 정산 매니저</h3>
              <p className="text-violet-400 text-xs font-bold uppercase mb-3">Add-on</p>
              <p className="text-slate-300 text-sm font-semibold mb-2">"껄끄러운 돈 얘기, AI가 대신 드라이하게."</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                '수정 비용 추가됩니다' 말하기 지치셨죠? 합의된 룰대로 시스템이 알아서 청구서를 날립니다. 감정 상할 일 없게요.
              </p>
              <ul className="space-y-1.5 border-t border-slate-800 pt-3">
                <li className="flex items-center text-slate-400 text-xs">
                    <div className="w-1 h-1 rounded-full bg-violet-500 mr-2"></div>
                    작업물 승인 체크리스트
                </li>
                <li className="flex items-center text-slate-400 text-xs">
                    <div className="w-1 h-1 rounded-full bg-violet-500 mr-2"></div>
                    추가 수정 비용 자동 합산
                </li>
              </ul>
            </div>

            {/* Card D: Protection */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 relative group transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-pink-900/30 rounded-xl">
                  <ShieldCheckIcon className="w-6 h-6 text-pink-400" />
                </div>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-[10px] font-bold rounded border border-slate-700">Coming Soon</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">법률 대응 키트</h3>
              <p className="text-pink-400 text-xs font-bold uppercase mb-3">Add-on</p>
              <p className="text-slate-300 text-sm font-semibold mb-2">"변호사 선임비 대신, 월 구독료로 방어."</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                갑작스런 분쟁이나 사고, 당황하지 마세요. 상황별 법적 대응 매뉴얼과 보상 프로그램이 내 뒤를 지킵니다.
              </p>
              <ul className="space-y-1.5 border-t border-slate-800 pt-3">
                <li className="flex items-center text-slate-400 text-xs">
                    <div className="w-1 h-1 rounded-full bg-pink-500 mr-2"></div>
                    법적 대응 키트 제공
                </li>
                <li className="flex items-center text-slate-400 text-xs">
                    <div className="w-1 h-1 rounded-full bg-pink-500 mr-2"></div>
                    사고 시뮬레이터
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Global CTA for Notifications */}
        <div className="flex justify-center">
            <button 
                onClick={handleNotify}
                disabled={isNotified}
                className={`flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl ${
                    isNotified 
                    ? 'bg-emerald-600 text-white cursor-default' 
                    : 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white border border-slate-600'
                }`}
            >
                <BellIcon className="w-6 h-6 mr-3 text-yellow-400" />
                {isNotified ? '알림 신청 완료!' : '스마트한 안전장치, 가장 먼저 켜기 (알림 신청)'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default PricingFeatures;
