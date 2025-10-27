import React, { useState, useMemo } from 'react';
import { ShieldCheckIcon, CalculatorIcon, BalanceIcon, LightBulbIcon } from './Icons';

const MediationStep: React.FC<{ step: number; title: string; description: string; }> = ({ step, title, description }) => (
    <div className="relative pl-12 pb-8 last:pb-0">
        <div className="absolute left-0 top-1 flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-emerald-600 to-cyan-600 text-white font-bold">
            {step}
        </div>
        <div className="absolute left-4 top-8 w-px h-full bg-emerald-700"></div>
        <h4 className="text-lg font-bold text-slate-100">{title}</h4>
        <p className="mt-1 text-slate-400">{description}</p>
    </div>
);

const SimulationCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(300);
  const [expenses, setExpenses] = useState<number>(150);
  const [coverage, setCoverage] = useState({
    accident: true,
    medical: false,
    incomeGap: true,
  });

  const handleCoverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverage({ ...coverage, [e.target.name]: e.target.checked });
  };
  
  const { emergencyFund, insuranceRate } = useMemo(() => {
    const validIncome = isNaN(income) ? 0 : income;
    const validExpenses = isNaN(expenses) ? 0 : expenses;

    const fund = validExpenses * 3;
    let rate = validIncome * 0.05;
    if (coverage.accident) rate += 1;
    if (coverage.medical) rate += 2;
    if (coverage.incomeGap) rate += 1.5;
    
    return { emergencyFund: fund, insuranceRate: Math.max(0, rate).toFixed(2) };
  }, [income, expenses, coverage]);

  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-2xl p-8 border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <CalculatorIcon className="h-8 w-8 text-emerald-400"/>
        <h3 className="text-2xl font-bold text-slate-100">나의 재정 안정성 시뮬레이터</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300">월 평균 수입 (만원)</label>
            <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">월 고정 지출 (만원)</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">어떤 리스크가 가장 걱정되시나요?</label>
            <div className="mt-2 space-y-2">
              {['accident', 'medical', 'incomeGap'].map((item) => (
                <div key={item} className="flex items-center">
                  <input id={item} name={item} type="checkbox" checked={coverage[item as keyof typeof coverage]} onChange={handleCoverageChange} className="h-4 w-4 text-emerald-500 focus:ring-emerald-400 border-slate-500 rounded bg-slate-700" />
                  <label htmlFor={item} className="ml-2 block text-sm text-slate-200">{item === 'accident' ? '상해' : item === 'medical' ? '질병' : '소득 공백'}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-emerald-900/50 rounded-lg p-6 flex flex-col justify-center text-center border border-emerald-500/30">
          <p className="text-sm text-emerald-400 font-semibold">최소한의 안전망을 위해</p>
          <div className="my-4">
            <p className="text-slate-400">최소 비상금</p>
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">{emergencyFund.toLocaleString()}<span className="text-xl font-medium ml-1 text-emerald-300">만원</span></p>
          </div>
           <div className="my-4">
            <p className="text-slate-400">월 최소 보장자산</p>
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">{insuranceRate}<span className="text-xl font-medium ml-1 text-emerald-300">만원</span></p>
          </div>
          <button className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900/50 focus:ring-emerald-500 whitespace-nowrap">
            맞춤형 보험 상품 알아보기
          </button>
        </div>
      </div>
    </div>
  );
};

const GuaranteePage: React.FC = () => {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 mb-6 ring-8 ring-emerald-500/5 border border-emerald-500/20">
            <ShieldCheckIcon className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">보장</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            예상치 못한 분쟁, 사고, 소득 공백의 위험. <br/> FreeZone이 당신의 든든한 안전망이 되어, 안정적인 활동을 보장합니다.
          </p>
        </div>
        
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left Column: CTA */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
              <h2 className="text-3xl font-bold text-slate-100">분쟁 해결 지원</h2>
              <p className="text-slate-400">
              클라이언트와의 의견 차이, 계약 내용 불이행 등 어려운 상황에 처하셨나요? 혼자 고민하지 마세요. FreeZone의 전문 중재 절차가 합리적인 해결을 도와드립니다.
              </p>
              <button className="w-full items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 transition-all transform hover:scale-105 whitespace-nowrap">
                  분쟁 중재 신청하기
              </button>
          </div>

          {/* Right Column: Mediation Steps */}
          <div className="lg:col-span-3 bg-slate-800/50 p-8 rounded-2xl shadow-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                  <BalanceIcon className="h-8 w-8 text-emerald-400"/>
                  <h2 className="text-2xl font-bold text-slate-100">3단계 전문 중재 절차</h2>
              </div>
              <div>
                  <MediationStep 
                      step={1} 
                      title="중재 요청 및 증거 제출" 
                      description="대화 내용, 작업 파일 등 모든 증거를 제출하세요. 많을수록 유리합니다."
                  />
                  <MediationStep 
                      step={2} 
                      title="객관적 자료 기반 상호 조율" 
                      description="감정싸움은 그만. 전문 중재 매니저가 팩트만 가지고 합리적인 해결책을 찾도록 돕습니다."
                  />
                   <MediationStep 
                      step={3} 
                      title="중재안 제시 및 이행 지원" 
                      description="공정한 중재안을 제시하고, 결과에 따라 예치된 대금을 지급/환불합니다. 더 이상 끌려다니지 마세요."
                  />
              </div>
          </div>
        </div>

        <div className="mt-20">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-100">분쟁 예방 & 리스크 관리</h2>
                <p className="mt-2 text-lg text-slate-500">분쟁을 사전에 방지하고, 피할 수 없는 위험에 대비하는 것이 프리랜서의 핵심 역량입니다.</p>
            </div>
            <SimulationCalculator />
        </div>
      </div>
    </div>
  );
};

export default GuaranteePage;