import React from 'react';
import { ShareIcon, BookOpenIcon, DownloadIcon, ArrowUpRightIcon } from './Icons';

type CurationType = 'guide' | 'template' | 'newsletter' | 'external';

interface CurationItem {
  type: CurationType;
  title: string;
  description: string;
  linkText: string;
  icon: React.ReactElement<{ className?: string }>;
}

const newsletterData: CurationItem = {
    type: 'newsletter',
    title: '[뉴스레터] 일잘러 프리랜서를 위한 Free-letter',
    description: '최신 정책, 지원금, 생산성 툴, 업계 트렌드까지. 가장 중요한 소식만 모아 한 달에 두 번, 당신의 메일함으로 보내드려요.',
    linkText: '뉴스레터 구독하기',
    icon: <BookOpenIcon />,
};

const curationData: { title: string; items: CurationItem[] }[] = [
  {
    title: '정부 지원 & 제도',
    items: [
      {
        type: 'guide',
        title: '[정책] 2024년 프리랜서 정부지원금 총정리 (신청방법 포함)',
        description: '국민취업지원제도, 청년일자리도약장려금 등 놓치기 쉬운 지원금을 신청 자격부터 방법까지 한번에 알려드려요.',
        linkText: '가이드 전문 보기',
        icon: <BookOpenIcon />,
      },
       {
        type: 'external',
        title: '[제도] 예술인 고용보험, 무엇이 달라졌을까?',
        description: '2024년부터 달라진 예술인 고용보험! 실업급여, 출산전후급여 혜택을 받을 수 있는지 확인해보세요.',
        linkText: '고용보험 사이트 바로가기',
        icon: <ArrowUpRightIcon />,
      },
      {
        type: 'guide',
        title: '[가이드] 1인 창조기업 지원센터 입주, A to Z',
        description: '사무 공간부터 세무 지원까지! 월 10만원대로 누리는 1인 창조기업 지원센터 입주, 합격률 높이는 꿀팁을 공유합니다.',
        linkText: '입주 꿀팁 보기',
        icon: <BookOpenIcon />,
      },
    ],
  },
  {
    title: '세금 & 법률',
    items: [
      {
        type: 'guide',
        title: "[가이드] 협상의 기술! 계약서 필수 체크리스트 7",
        description: 'BATNA, ZOPA 등 협상 개념부터 작업 범위, 수정 횟수, 대금 지급 등 분쟁을 막는 7가지 필수 조항을 확인하세요.',
        linkText: '필수 조항 알아보기',
        icon: <BookOpenIcon />,
      },
      {
        type: 'template',
        title: '[템플릿] 용역 계약서 표준 양식 (IT/디자인)',
        description: '변호사가 검토한 안전한 표준 계약서 템플릿을 무료로 드려요. 분야에 맞게 수정해서 바로 사용하세요.',
        linkText: '템플릿 다운로드',
        icon: <DownloadIcon />,
      },
      {
        type: 'guide',
        title: '[가이드] 프리랜서 종합소득세 A to Z',
        description: '5월은 세금 폭탄이 아닌 환급의 달! 경비 처리부터 절세 전략까지, 프리랜서 맞춤 종합소득세 가이드.',
        linkText: '절세 전략 보기',
        icon: <BookOpenIcon />,
      },
    ],
  },
  {
    title: "커리어 성장 & 생산성",
    items: [
       {
        type: 'guide',
        title: '[가이드] 0원으로 실무 역량 UP! 무료 강의 사이트 총정리',
        description: '마케팅, 디자인, 해외 진출까지! 정부(GSEEK, 지식배움터)와 빅테크(네이버, 메타)가 제공하는 양질의 무료 강의로 경쟁력을 높이세요.',
        linkText: '무료 강의 리스트 보기',
        icon: <BookOpenIcon />,
      },
      {
        type: 'guide',
        title: '[가이드] AI로 일하는 시간 10배 단축하기',
        description: '단순 반복 업무는 이제 AI에게 맡기세요. ChatGPT, Midjourney 등 프리랜서 업무에 바로 적용 가능한 AI 활용법.',
        linkText: 'AI 활용법 보기',
        icon: <BookOpenIcon />,
      },
      {
        type: 'template',
        title: '[템플릿] 노션 포트폴리오 & 프로젝트 관리',
        description: '클라이언트의 눈길을 사로잡는 인터랙티브 포트폴리오와 칸반보드 기반의 프로젝트 관리 템플릿을 무료로 드려요.',
        linkText: '템플릿 다운로드',
        icon: <DownloadIcon />,
      },
    ]
  },
];

const getCardStyles = (type: CurationType) => {
  switch (type) {
    case 'template':
      return 'bg-emerald-900/40 border-emerald-500/30 hover:border-emerald-500';
    case 'external':
      return 'bg-cyan-900/40 border-cyan-500/30 hover:border-cyan-500';
    default:
      return 'bg-slate-800 border-slate-700 hover:border-fuchsia-500';
  }
};

const NewsletterCard: React.FC<CurationItem> = ({ title, description, linkText, icon }) => (
    <div className="mb-16 bg-gradient-to-br from-fuchsia-600/20 to-pink-600/20 border border-fuchsia-500/50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6 flex-grow flex flex-col sm:flex-row items-center text-center sm:text-left">
            <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                <div className="bg-slate-700 text-fuchsia-400 rounded-lg p-3 w-16 h-16 flex items-center justify-center">
                    {React.cloneElement(icon, { className: "h-8 w-8" })}
                </div>
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-slate-100">{title}</h3>
                <p className="mt-1 text-slate-300 max-w-xl">{description}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                <button className="bg-fuchsia-600 text-white font-bold py-2 px-5 rounded-full hover:bg-fuchsia-700 transition-colors">{linkText}</button>
            </div>
        </div>
    </div>
);


const CurationCard: React.FC<CurationItem> = ({ type, title, description, linkText, icon }) => {
  const baseClasses = "rounded-xl shadow-lg transition-all duration-300 group transform hover:-translate-y-1 flex flex-col";
  const typeClasses = getCardStyles(type);

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <a href="#" className="block p-6 flex-grow">
        <div className="flex items-start space-x-4">
          <div className="bg-slate-700 text-fuchsia-400 rounded-lg p-3">
            {React.cloneElement(icon, { className: 'h-6 w-6' })}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="mt-1 text-slate-400 text-sm">{description}</p>
          </div>
        </div>
      </a>
      <div className="border-t border-slate-700/50 p-4 flex justify-between items-center bg-slate-800/50 rounded-b-xl">
         <a href="#" className="text-sm font-semibold text-fuchsia-400 flex items-center group-hover:underline">
            {linkText}
          </a>
          <button className="text-slate-500 hover:text-fuchsia-400 transition-colors" title="공유하기">
            <ShareIcon className="h-5 w-5" />
          </button>
      </div>
    </div>
  );
};


const CurationPage: React.FC = () => {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-100">프리랜서 성공 가이드 💎</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            성공하는 프리랜서의 비밀, 필수 정보만 모았어요. <br/> 당신은 성공에만 집중하세요.
          </p>
        </div>

        <div className="mt-20">
          <NewsletterCard {...newsletterData} />

          {curationData.map((section) => (
            <div key={section.title} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-slate-200 border-l-4 border-fuchsia-500 pl-4">{section.title}</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, index) => (
                  <CurationCard key={index} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurationPage;