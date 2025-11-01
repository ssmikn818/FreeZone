import React, { useState } from 'react';
import { Tab } from '../types';
import { ContractIcon, DepositIcon, SettlementIcon, ShieldCheckIcon, ChevronDownIcon, NoContractIcon, DelayedPaymentIcon, NoStandardIcon, AnxietyIcon, PaletteIcon, CodeIcon, BriefcaseIcon, LightBulbIcon, ClipboardListIcon } from './Icons';

interface LandingPageProps {
  setActiveTab: (tab: Tab) => void;
}

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; }> = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-slate-700">
        <h2>
            <button
                type="button"
                className="flex justify-between items-center w-full py-5 text-left font-semibold text-slate-100"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
        </h2>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="pb-5 pr-4 text-slate-400">
                <p dangerouslySetInnerHTML={{ __html: answer }} />
            </div>
        </div>
    </div>
);

const solutionsData = {
  design_media: {
    icon: <PaletteIcon className="h-12 w-12 text-rose-500" />,
    title: '디자인 & 미디어',
    solutions: [
      {
        problem: '“느낌만 살짝…” 기준 없는 수정 요청의 늪',
        solution: 'FreeZone <strong>계약</strong>으로 작업 범위, 수정 횟수, 저작권 귀속을 명확히 하세요. 주관적인 피드백으로 인한 감정 소모를 원천 차단합니다.',
        flow: { name: '계약', details: '수정횟수 + 저작권 귀속 명시', tab: Tab.Contract },
      },
      {
        problem: '시안 작업 후 연락두절, 사라진 클라이언트',
        solution: '프로젝트 대금을 <strong>예치</strong> 기능으로 미리 받아두세요. 최소한의 디자인 착수금(Deposit) 설정으로 ‘노쇼’ 리스크를 방지할 수 있습니다.',
        flow: { name: '예치', details: '착수금 설정으로 노쇼 방지', tab: Tab.Deposit },
      },
      {
        problem: '최종.psd, 진짜최종.ai... 완료 기준이 모호할 때',
        solution: '계약 시 합의한 <strong>검수 체크리스트</strong>로 결과물 확인. 클라이언트가 승인하면 바로 <strong>정산</strong> 완료. 더 이상 잔금으로 실랑이하지 마세요.',
        flow: { name: '정산', details: '상호 검수 후 즉시 정산', tab: Tab.Settlement },
      },
    ]
  },
  it_development: {
    icon: <CodeIcon className="h-12 w-12 text-teal-500" />,
    title: 'IT & 개발',
    solutions: [
       {
        problem: '“이것도 추가요” 끝없이 늘어나는 개발 범위 (Scope Creep)',
        solution: 'FreeZone <strong>계약</strong>에 기능정의서(SOW), 개발 마일스톤을 명시하여 추가 요구사항에 대한 명확한 대응 근거를 마련하세요.',
        flow: { name: '계약', details: '기능정의서(SOW) 기반 계약', tab: Tab.Contract },
      },
      {
        problem: '중간 결과물에 대한 피드백 지연, 막혀버린 개발 일정',
        solution: '개발 단계를 마일스톤으로 설정하고, 각 단계별 <strong>예치</strong> 적용. 클라이언트의 빠른 피드백을 유도하고 프로젝트 지연을 방지합니다.',
        flow: { name: '예치', details: '마일스톤별 대금 분할 예치', tab: Tab.Deposit },
      },
       {
        problem: '“이건 버그인가요?” 유지보수 범위 분쟁',
        solution: '사전에 합의된 <strong>UAT(사용자 인수 테스트)</strong> 기준으로 기능 검수 후 <strong>정산</strong>. 완료된 프로젝트 증빙은 안전하게 보관되어, 유지보수 범위 분쟁을 막아줍니다.',
        flow: { name: '정산', details: 'UAT 완료 후 자동 정산', tab: Tab.Settlement },
      },
    ]
  },
  marketing_consulting: {
    icon: <BriefcaseIcon className="h-12 w-12 text-indigo-500" />,
    title: '마케팅 & 컨설팅',
    solutions: [
       {
        problem: '“효과가 없네요” 성과 측정이 모호한 프로젝트',
        solution: '월별 보고서, 광고 효율(ROAS) 등 구체적인 <strong>성과 측정 지표(KPI)</strong>를 <strong>계약</strong>서에 명시하여 상호 기대치를 명확하게 관리하세요.',
        flow: { name: '계약', details: '핵심성과지표(KPI) 설정', tab: Tab.Contract },
      },
       {
        problem: '월 단위 계약, 잊을 만하면 늦어지는 정산',
        solution: '월 단위 반복 <strong>정산</strong>을 설정하세요. 매월 약속된 날짜에 자동 정산 요청. 더 이상 미수금으로 스트레스받지 마세요.',
        flow: { name: '정산', details: '월 단위 반복 자동 정산', tab: Tab.Settlement },
      },
      {
        problem: '소득 증빙의 어려움, "그래서 얼마 버시는데요?"',
        solution: 'FreeZone의 모든 계약/정산 내역은 <strong>소득 증빙 자료</strong>로 활용 OK. 대출, 지원사업 신청 시 떳떳하게 제출하세요. 당신의 <strong>보장</strong>막이 되어드립니다.',
        flow: { name: '보장', details: '소득 증빙 및 공제 가입', tab: Tab.Guarantee },
      },
    ]
  },
  platform_gigworker: {
    icon: <ClipboardListIcon className="h-12 w-12 text-sky-500" />,
    title: '플랫폼 & 긱워커',
    solutions: [
       {
        problem: '건당 수수료? 거리당 요금? 불투명한 정산 기준',
        solution: 'FreeZone <strong>계약</strong>으로 운행 건당 수수료, 거리별 할증, 피크타임 인센티브 등 정산 기준을 명확히 하세요. 더 이상 앱의 일방적인 정책에 끌려다니지 마세요.',
        flow: { name: '계약', details: '명확한 수수료 정책 명시', tab: Tab.Contract },
      },
      {
        problem: '오늘 번 돈, 언제 들어올까? 기약 없는 주 단위 정산',
        solution: 'FreeZone <strong>정산</strong>을 통해 운행 완료 즉시 또는 일 단위 정산을 요청하세요. 현금 흐름을 예측하고 안정적인 수입을 관리할 수 있습니다.',
        flow: { name: '정산', details: '일/건 단위 즉시 정산', tab: Tab.Settlement },
      },
      {
        problem: '사고 나면 나만 손해, 아무도 지켜주지 않는 길 위에서',
        solution: 'FreeZone <strong>보장</strong>을 통해 라이더 맞춤형 시간제 보험에 가입하고 최소한의 안전망을 확보하세요. 사고 처리 지원 및 법률 자문도 받을 수 있습니다.',
        flow: { name: '보장', details: '시간제 보험 및 사고 지원', tab: Tab.Guarantee },
      },
    ]
  }
};

const SolutionCard: React.FC<{
    problem: string;
    solution: string;
    flow: { name: string; details: string; tab: Tab };
    onFlowClick: (tab: Tab) => void;
}> = ({ problem, solution, flow, onFlowClick }) => {
    return (
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
            <div className="p-6">
                <p className="font-semibold text-slate-400 text-sm mb-2">🤔 이런 문제, 겪고 계신가요?</p>
                <p className="text-slate-100 font-bold text-lg">{problem}</p>
            </div>
            <div className="bg-gradient-to-br from-fuchsia-600/10 to-pink-600/10 p-6 border-t border-fuchsia-500/30">
                <div className="flex items-start space-x-3">
                    <LightBulbIcon className="h-6 w-6 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-fuchsia-400 text-sm mb-2">✨ 맞춤 해결책</p>
                        <p className="text-slate-300" dangerouslySetInnerHTML={{ __html: solution }} />
                    </div>
                </div>
                <button 
                    onClick={() => onFlowClick(flow.tab)} 
                    className="mt-6 w-full bg-slate-900 p-3 rounded-lg shadow-sm border border-slate-700 text-left hover:shadow-md hover:border-fuchsia-500 transition-all duration-200 group flex items-center justify-between transform hover:scale-[1.02]"
                >
                    <div>
                        <span className="text-base font-bold text-fuchsia-400">{flow.name}</span>
                        <p className="text-xs text-slate-500">{flow.details}</p>
                    </div>
                    <span className="text-sm font-bold text-fuchsia-400 transform transition-transform group-hover:translate-x-1">&rarr;</span>
                </button>
            </div>
        </div>
    );
};


const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [activeSolution, setActiveSolution] = useState('design_media');

  const features = [
    {
      keyword: '계약',
      title: '일 시작 전, 투명한 계약',
      description: "작업 범위, 수정 횟수, 금액까지. 1분 만에 완성하는 스마트 계약서로 당신의 권리를 보호하세요.",
      icon: <ContractIcon className="w-full h-auto max-w-xs md:max-w-sm" />,
      tab: Tab.Contract,
    },
    {
      keyword: '예치',
      title: '대금은 안전하게, 작업은 안심하고',
      description: "대금 지급에 대한 불안감은 이제 그만. 안전한 선입금 예치로 리스크를 없애고, 당신은 오로지 작업의 완성도에만 집중하세요.",
      icon: <DepositIcon className="w-full h-auto max-w-xs md:max-w-sm" />,
      tab: Tab.Deposit,
    },
    {
      keyword: '정산',
      title: '정산은 정확하고, 신속하게',
      description: "상호 합의된 기준으로 결과물을 검수하고, 승인 즉시 정산이 완료됩니다. 시스템이 당신의 권리를 지켜드립니다.",
      icon: <SettlementIcon className="w-full h-auto max-w-xs md:max-w-sm" />,
      tab: Tab.Settlement,
    },
    {
      keyword: '보장',
      title: '만일의 경우에도, 든든하게',
      description: "예상치 못한 분쟁, 건강 문제, 소득 공백의 막막한 순간들. 혼자 감당하지 마세요. FreeZone이 당신의 든든한 안전망이 되어드립니다.",
      icon: <ShieldCheckIcon className="w-full h-auto max-w-xs md:max-w-sm" />,
      tab: Tab.Guarantee,
    },
  ];

  const problems = [
    {
      title: '‘일단 시작하시죠’ 한마디에 시작된 프로젝트',
      description: '결국 끝없는 수정과 책임 공방으로 이어지진 않았나요?<br />소중한 당신의 시간과 노력을 지켜야 합니다.',
      illustration: <NoContractIcon className="h-24 w-24" />,
    },
    {
      title: '“곧 입금될 겁니다” 클라이언트의 말만 믿고 있나요?',
      description: '작업은 끝났지만, 정산은 기약이 없습니다.<br />더 이상 마음 졸이며 기다리지 마세요.',
      illustration: <DelayedPaymentIcon className="h-24 w-24" />,
    },
    {
      title: '‘느낌 아시죠?’ 기준 없는 피드백의 늪',
      description: '완료의 기준이 ‘감’이 되는 순간, 프로젝트의 끝은 보이지 않습니다.<br />명확한 기준만이 탈출구입니다.',
      illustration: <NoStandardIcon className="h-24 w-24" />,
    },
    {
      title: '아프면 나만 손해, 분쟁이 생겨도 나만 손해',
      description: '아무도 나를 지켜주지 않는 막막함.<br />모든 리스크를 혼자 감당해야 하는 프리랜서의 현실입니다.',
      illustration: <AnxietyIcon className="h-24 w-24" />,
    },
  ];

  const faqs = [
    {
      question: '이용 요금은 어떻게 되나요?',
      answer: "핵심 기능인 ‘계약’과 ‘정산’은 평생 무료입니다. 안전한 대금 보호를 위한 ‘예치’ 기능에만 최소한의 PG사 수수료가 발생합니다."
    },
    {
      question: '클라이언트에게 FreeZone 사용을 어떻게 제안할 수 있을까요?',
      answer: 'FreeZone은 프리랜서뿐만 아니라 클라이언트의 리스크도 줄여줍니다. 명확한 계약, 투명한 정산 과정은 상호 신뢰를 구축하는 가장 효과적인 방법입니다. 클라이언트 설득을 위한 가이드도 제공해 드릴 예정입니다.'
    },
    {
      question: '분쟁이 발생하면 어떻게 해결되나요?',
      answer: "'보장' 기능을 통해 전문가의 중재를 요청할 수 있습니다. FreeZone에 기록된 계약서, 커뮤니케이션 내역, 검수 과정 등 모든 객관적인 자료를 바탕으로 감정 소모 없이 합리적인 해결을 돕습니다."
    },
     {
      question: '프리랜서를 위한 추가적인 혜택도 있나요?',
      answer: '그럼요. ‘가이드’ 탭에서는 프리랜서가 꼭 알아야 할 정부 지원금, 절세 팁, 법률 정보 등 성장에 필요한 전문적인 콘텐츠를 정기적으로 제공합니다.'
    },
  ];

  const currentSolution = solutionsData[activeSolution as keyof typeof solutionsData];
  const handleFlowClick = (tab: Tab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/50 via-slate-900 to-slate-900"></div>
        <div className="absolute top-[-10rem] right-[-10rem] w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10rem] left-[-10rem] w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
            혼자 일해도, 혼자 감당하진 않게.
          </h1>
          <p className="mt-6 text-2xl font-bold text-fuchsia-400 sm:text-3xl">FreeZone: 프리랜서 생존 키트</p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300 sm:text-xl">
            ‘알아서 잘’이라는 모호함은 분쟁의 시작입니다. <br /> 프로젝트 시작 전, 동등한 위치에서 명확한 규칙을 설정하세요.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <button onClick={() => setActiveTab(Tab.Contract)} className="w-full sm:w-auto items-center justify-center px-8 py-3 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500 transition-all transform hover:scale-105">
                  내 권리 지키는 계약서, 1분만에 만들기
              </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 sm:py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold text-center text-slate-100 mb-20">혹시, 당신의 이야기는 아닌가요?</h2>
              <div className="relative">
                {/* Line */}
                <div className="absolute top-0 h-full w-0.5 bg-fuchsia-900 left-5 md:left-1/2 md:-translate-x-1/2" />
                <div className="space-y-20">
                  {problems.map((problem, index) => (
                    <div key={index} className="relative">
                      {/* Mobile view */}
                      <div className="md:hidden flex items-start">
                        <div className="absolute top-0 left-5 -translate-x-1/2 z-10 bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold flex-shrink-0">{index + 1}</div>
                        <div className="pl-14">
                          <div className="p-4 bg-slate-800 rounded-lg shadow-lg mb-4 border border-slate-700">
                            <p className="text-lg font-semibold text-slate-100">{problem.title}</p>
                             <p className="mt-2 text-sm text-slate-400" dangerouslySetInnerHTML={{ __html: problem.description }} />
                          </div>
                          <div className="flex justify-start pl-4">{problem.illustration}</div>
                        </div>
                      </div>

                      {/* Desktop view */}
                      <div className="hidden md:flex items-center">
                        <div className="w-1/2 flex justify-end pr-12">
                          {[0, 2].includes(index) ? (
                            <div className="p-6 bg-slate-800 rounded-lg shadow-lg text-left w-full max-w-lg border border-slate-700">
                              <p className="text-lg font-semibold text-slate-100">{problem.title}</p>
                              <p className="mt-2 text-slate-400" dangerouslySetInnerHTML={{ __html: problem.description }} />
                            </div>
                          ) : (
                            <div className="w-full max-w-lg flex justify-center">{problem.illustration}</div>
                          )}
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold flex-shrink-0">{index + 1}</div>

                        <div className="w-1/2 flex justify-start pl-12">
                          {[0, 2].includes(index) ? (
                             <div className="w-full max-w-lg flex justify-center">{problem.illustration}</div>
                          ) : (
                             <div className="p-6 bg-slate-800 rounded-lg shadow-lg text-left w-full max-w-lg border border-slate-700">
                              <p className="text-lg font-semibold text-slate-100">{problem.title}</p>
                               <p className="mt-2 text-slate-400" dangerouslySetInnerHTML={{ __html: problem.description }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
         </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">불안은 싹- 지우고, 당신은 일에만 집중하세요.</h2>
            <p className="mt-4 text-lg text-slate-400">
              FreeZone 생존 키트, 이렇게 활용하세요.
            </p>
          </div>
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="border-b border-slate-700">
              <nav className="-mb-px flex flex-wrap justify-center gap-x-2 gap-y-2 sm:gap-x-4" aria-label="Tabs">
                {features.map((feature, index) => (
                  <button
                    key={feature.title}
                    onClick={() => setActiveFeatureTab(index)}
                    className={`${
                      activeFeatureTab === index
                        ? 'border-fuchsia-500 text-fuchsia-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                    } py-3 px-4 border-b-2 font-bold text-sm transition-colors duration-200 focus:outline-none text-center`}
                  >
                    {feature.keyword}
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-8">
                <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 p-8 text-center md:text-left">
                    <div className="w-full md:w-1/2 flex-shrink-0 order-2 md:order-1">
                        <span className="inline-block bg-fuchsia-500/20 text-fuchsia-400 px-3 py-1 rounded-full text-md font-semibold mb-3">{features[activeFeatureTab].keyword}</span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">{features[activeFeatureTab].title}</h3>
                        <p className="mt-4 text-base text-slate-400 md:text-lg">{features[activeFeatureTab].description}</p>
                        <button 
                          onClick={() => setActiveTab(features[activeFeatureTab].tab)} 
                          className="mt-6 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-bold rounded-full text-fuchsia-300 bg-fuchsia-500/20 hover:bg-fuchsia-500/40 transition-colors">
                          {features[activeFeatureTab].keyword} 기능 자세히 보기 &rarr;
                        </button>
                    </div>
                     <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                        {features[activeFeatureTab].icon}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Section */}
       <section className="py-20 sm:py-24 bg-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-slate-100">어떤 분야에서 활동하시나요? <br className="hidden sm:block" /> 당신의 업계를 위한 맞춤 솔루션.</h2>
                <p className="mt-4 text-lg text-slate-400">
                    내 업계 국룰은 이거. 분야별 전문가들의 FreeZone 활용법.
                </p>
            </div>
            
            <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2 p-1 bg-slate-800 rounded-full max-w-2xl mx-auto border border-slate-700">
                {Object.keys(solutionsData).map((key) => {
                    const solution = solutionsData[key as keyof typeof solutionsData];
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveSolution(key)}
                            className={`w-full px-4 py-2 sm:px-6 sm:py-2.5 text-base sm:text-lg font-bold rounded-full transition-all duration-300 whitespace-nowrap ${
                                activeSolution === key
                                ? 'bg-slate-900 text-fuchsia-400 shadow-lg'
                                : 'bg-transparent text-slate-400 hover:text-slate-100'
                            }`}
                            >
                            {solution.title}
                        </button>
                    )
                })}
            </div>

            <div className="mt-8 max-w-5xl mx-auto">
              <div className="flex items-center gap-4 p-4 mb-8">
                <div className="flex-shrink-0 bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-700">
                  {currentSolution.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">{currentSolution.title}</h2>
                  <p className="text-slate-400 mt-1">이런 골칫거리, FreeZone이 이렇게 해결해요.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentSolution.solutions.map((item, index) => (
                    <SolutionCard
                        key={index}
                        problem={item.problem}
                        solution={item.solution}
                        flow={item.flow}
                        onFlowClick={handleFlowClick}
                    />
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 sm:py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-slate-100">프리랜서 씬의 최신 동향, 놓치지 마세요.</h2>
              <p className="mt-4 text-lg text-slate-400">
                하루가 다르게 변하는 정책, 지원금, 업계 트렌드. 가장 중요한 소식만 모아 당신의 메일함으로 보내드려요.
              </p>
              <form className="mt-8 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-5 py-3 placeholder-slate-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 border-slate-700 rounded-md bg-slate-800 text-white"
                    placeholder="이메일 주소를 입력하세요"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 w-full sm:w-auto items-center justify-center px-5 py-3 border border-transparent text-sm font-bold rounded-md text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500 transition-all transform hover:scale-105"
                  >
                    최신 소식 받기
                  </button>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  스팸은 없어요. 언제든 구독을 취소할 수 있습니다. 🤙
                </p>
              </form>
            </div>
        </div>
      </section>

       {/* FAQ Section */}
      <section className="py-20 sm:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-100">자주 묻는 질문 (FAQ)</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        FreeZone에 대해 더 궁금한 점이 있으신가요?
                    </p>
                </div>
                <div className="mt-12">
                  {faqs.map((faq, index) => (
                    <FAQItem 
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFAQ === index}
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    />
                  ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;