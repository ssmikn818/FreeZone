import React, { useState } from 'react';
import { DocumentTextIcon, PlusIcon, LightBulbIcon, CheckCircleIcon, ScopeIcon, RevisionsIcon, DollarIcon, IPRightsIcon, TerminationIcon, FeedbackIcon, EditIcon } from './Icons';

const sampleContracts = [
  { id: 'C2024-003', title: '브랜드 리뉴얼 디자인', client: '주식회사 트렌드', status: '진행중', date: '2024.07.15', isTutorial: true },
  { id: 'C2024-002', title: '마케팅 콘텐츠 제작', client: '알파 컴퍼니', status: '완료', date: '2024.06.28' },
  { id: 'C2024-001', title: '웹사이트 개발 프로젝트', client: '스타트업 밸리', status: '완료', date: '2024.05.10' },
];

const contractClauses = [
    {
        id: 'scope',
        title: '1. 작업 범위와 분량',
        icon: <ScopeIcon className="h-8 w-8 text-fuchsia-600" />,
        guidance: '어디까지가 내 일일까? 역할과 책임을 명확히 하여 불필요한 추가 업무를 방지합니다.',
        placeholder: '예시)\n- 주요 업무: 브랜드 로고 디자인 시안 3종 제안\n- 최종 산출물: AI, PDF, PNG 파일\n- 포함되지 않는 업무: 상세페이지, 목업(Mockup) 이미지 제작',
    },
    {
        id: 'revisions',
        title: '2. 수정 횟수 및 비용',
        icon: <RevisionsIcon className="h-8 w-8 text-fuchsia-600" />,
        guidance: '‘무한 수정’의 늪에서 벗어나세요. 합리적인 수정 횟수를 정하고, 추가 요청 시 비용을 명시합니다.',
        placeholder: '예시)\n- 기본 수정 횟수: 2회\n- 추가 수정 비용: 1회당 50,000원\n- 수정 범위: 컬러, 텍스트 등 간단한 수정에 한함',
    },
    {
        id: 'payment',
        title: '3. 대금과 지급 시점',
        icon: <DollarIcon className="h-8 w-8 text-fuchsia-600" />,
        guidance: '선금-중도금-잔금 비율과 지급일을 명시하고, 지연 이자까지 설정해 안정적인 현금 흐름을 확보하세요.',
        placeholder: '예시)\n- 총 금액: 3,000,000원 (VAT 별도)\n- 선금: 계약 시 50% (1,500,000원)\n- 잔금: 최종 검수 완료 후 50% (1,500,000원)\n- 지급일: 세금계산서 발행 후 7일 이내',
    },
    {
        id: 'ip',
        title: '4. 지식재산권 및 포트폴리오',
        icon: <IPRightsIcon className="h-8 w-8 text-fuchsia-600" />,
        guidance: '결과물의 저작권 귀속 주체와 포트폴리오 활용 범위를 명확히 하여, 나의 소중한 자산을 지키세요.',
        placeholder: '예시)\n- 저작권: 최종 잔금 지급 완료 시 클라이언트에게 귀속\n- 포트폴리오: 작업자(프리랜서)의 포트폴리오 사용에 동의',
    },
    {
        id: 'termination',
        title: '5. 계약 해지 및 분쟁 해결',
        icon: <TerminationIcon className="h-8 w-8 text-fuchsia-600" />,
        guidance: '해지 사유, 위약금, 진행 비용 정산 기준을 미리 정해두면, 어떤 상황에서도 내 몫을 챙길 수 있습니다.',
        placeholder: '예시)\n- 상호 협의 하에 계약 해지 가능\n- 클라이언트의 귀책사유로 해지 시, 진행된 작업 비용의 120%를 위약금으로 지급',
    },
    {
        id: 'feedback',
        title: '6. 피드백 방식과 기한',
        icon: <FeedbackIcon className="h-8 w-8 text-fuchsia-600" />,
        guidance: '‘작업물 전달 후 N일 내 피드백’처럼 기한을 정하고 소통 채널을 지정하면 프로젝트 지연을 막을 수 있습니다.',
        placeholder: '예시)\n- 피드백 기한: 작업물 발송 후 3일 이내\n- 피드백 방식: 지정된 이메일 또는 FreeZone 메시지로 통합하여 전달',
    },
    {
        id: 'review',
        title: '7. 기타 특약사항',
        icon: <CheckCircleIcon className="h-8 w-8 text-fuchsia-600" />,
        guidance: '비밀유지 의무 등 프로젝트의 특수성을 반영한 내용을 추가하여 예상치 못한 분쟁을 예방하세요.',
        placeholder: '예시)\n- 본 계약과 관련하여 알게 된 상호의 모든 정보는 외부에 유출하지 않는다 (비밀유지 의무).',
    },
];

interface ClauseEditorProps {
    id: string;
    icon: React.ReactElement;
    title: string;
    guidance: string;
    content: string;
    onContentChange: (id: string, value: string) => void;
}

const ClauseEditor: React.FC<ClauseEditorProps> = ({ id, icon, title, guidance, content, onContentChange }) => {
    return (
      <div className="border-b border-slate-300 pb-8 last:border-b-0 last:pb-0">
        <div className="flex items-center justify-between flex-wrap gap-y-2">
            <div className="flex items-center space-x-4">
                {icon}
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-fuchsia-700 bg-fuchsia-100 rounded-full hover:bg-fuchsia-200 transition-colors">
                <EditIcon className="h-4 w-4" />
                <span>템플릿 불러오기</span>
            </button>
        </div>
        <div className="mt-4 pl-12">
            <p className="text-sm text-slate-600 mb-3">{guidance}</p>
            <textarea
                value={content}
                onChange={(e) => onContentChange(id, e.target.value)}
                rows={4}
                className="w-full bg-white rounded-md p-4 text-slate-800 border border-slate-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-shadow text-sm"
                placeholder="여기에 계약 내용을 입력하세요..."
            />
        </div>
      </div>
    );
};


const ContractPage: React.FC = () => {
    const [contractData, setContractData] = useState(() =>
        contractClauses.reduce((acc, clause) => {
            acc[clause.id] = clause.placeholder;
            return acc;
        }, {} as Record<string, string>)
    );

    const handleContentChange = (id: string, value: string) => {
        setContractData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="bg-slate-900">
            <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-fuchsia-500/10 mb-6 ring-8 ring-fuchsia-500/5 border border-fuchsia-500/20">
                        <DocumentTextIcon className="h-10 w-10 text-fuchsia-400" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">계약</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                        ‘알아서 잘’이라는 모호함은 분쟁의 시작입니다. <br/> 프로젝트 시작 전, 동등한 위치에서 명확한 규칙을 설정하세요.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
                    {/* Left Column: CTA */}
                    <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
                        <h2 className="text-3xl font-bold text-slate-100">새로운 계약 시작하기</h2>
                        <p className="text-slate-400">
                            템플릿을 사용하거나 직접 항목을 구성하여 1분 만에 맞춤 계약서를 만들 수 있습니다. 당신의 권리를 지키는 첫걸음, 지금 바로 시작하세요.
                        </p>
                        <button className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500 transition-all transform hover:scale-105">
                            <PlusIcon className="h-6 w-6 mr-3 -ml-1"/>
                            새 계약서 작성
                        </button>
                    </div>

                    {/* Right Column: Example Dashboard */}
                    <div className="lg:col-span-3">
                        <div className="bg-fuchsia-900/30 p-4 rounded-lg border border-fuchsia-700/50 mb-6 flex items-start space-x-3">
                            <LightBulbIcon className="h-6 w-6 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-fuchsia-300">대시보드 미리보기</h3>
                                <p className="text-sm text-slate-300 mt-1">
                                    실제 계약이 등록되면 이런 모습으로 관리할 수 있어요. 모든 계약 현황을 한눈에 파악하고 다음 단계를 진행하세요.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 overflow-x-auto">
                            <table className="w-full text-left min-w-[640px]">
                                <thead className="border-b border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-300">프로젝트</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-300">클라이언트</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-center">상태</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">계약일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sampleContracts.map((contract) => (
                                        <tr key={contract.id} className={`border-b border-slate-800 hover:bg-slate-800 transition-colors ${contract.isTutorial ? 'ring-2 ring-fuchsia-500/50' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-semibold text-slate-100">{contract.title}</p>
                                                    {contract.isTutorial && <span className="text-xs bg-fuchsia-500/30 text-fuchsia-300 px-2 py-0.5 rounded-full font-bold">예시</span>}
                                                </div>
                                                <p className="text-xs text-slate-500">{contract.id}</p>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">{contract.client}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                                    contract.status === '진행중' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                                                }`}>
                                                    {contract.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-right">{contract.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-100">1분 완성, 스마트 계약서</h2>
                        <p className="mt-4 text-lg text-slate-400">
                           아래 필수 항목들을 채워 나에게 꼭 맞는 맞춤 계약서를 만들어보세요. 분쟁은 막고, 당신의 권리는 지켜줍니다.
                        </p>
                    </div>
                    
                    <div className="mt-16 max-w-4xl mx-auto bg-slate-200 text-slate-800 rounded-2xl shadow-2xl p-8 sm:p-12 space-y-10">
                        {contractClauses.map((clause) => (
                            <ClauseEditor
                                key={clause.id}
                                id={clause.id}
                                icon={clause.icon}
                                title={clause.title}
                                guidance={clause.guidance}
                                content={contractData[clause.id]}
                                onContentChange={handleContentChange}
                            />
                        ))}
                         <button className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 focus:ring-fuchsia-500 transition-all transform hover:scale-105">
                            <CheckCircleIcon className="h-6 w-6 mr-3 -ml-1"/>
                            이 내용으로 계약서 생성하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractPage;