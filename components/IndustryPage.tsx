import React, { useState } from 'react';
import { Tab } from '../types';
import { PaletteIcon, CodeIcon, BriefcaseIcon, LightBulbIcon, ClipboardListIcon } from './Icons';

interface IndustryPageProps {
  isLandingSection?: boolean;
  setActiveTab?: (tab: Tab) => void;
}

const freelancerRoles = [
  '디자이너', '개발자', '기획자', '마케터',
  '영상 제작자', '작가', '번역가', '컨설턴트',
  'PM', '1인 사업가', 'N잡러', '긱워커',
  '강사', '포토그래퍼', '라이더', '크리에이터'
];

const IndustryContent: React.FC = () => (
    <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 px-4">
            {freelancerRoles.map((role) => (
                <div key={role} className="bg-slate-800 px-6 py-3 rounded-full shadow-sm border border-slate-700 transition-transform hover:scale-105 cursor-default hover:border-fuchsia-500">
                    <p className="text-md font-medium text-slate-300">{role}</p>
                </div>
            ))}
        </div>
        <p className="mt-12 text-center text-lg text-slate-400">
            그리고 더 많은 능력자들을 기다립니다.
        </p>
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


const IndustryPage: React.FC<IndustryPageProps> = ({ isLandingSection = false, setActiveTab }) => {
  const [activeSolution, setActiveSolution] = useState('design_media');

  if (isLandingSection) {
    return <IndustryContent />;
  }

  const currentSolution = solutionsData[activeSolution as keyof typeof solutionsData];

  const handleFlowClick = (tab: Tab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-100">당신의 분야에 최적화된, 업계별 활용 가이드</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            당신의 업계에서는 FreeZone을 이렇게 활용할 수 있어요. <br/> 아래 예시를 통해 주요 기능 사용법을 알아보세요.
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
    </div>
  );
};

export default IndustryPage;