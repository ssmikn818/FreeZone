import React from 'react';
import { SettlementIcon, DocumentDuplicateIcon, ArrowUpRightIcon, ScaleIcon } from './Icons';
import { Tab } from '../types';

interface SettlementPageProps {
  setActiveTab: (tab: Tab) => void;
}

const sampleSettlements = [
  { id: 'S2024-002', title: '마케팅 콘텐츠 제작', amount: '3,000,000원', status: '정산 완료', settlementDate: '2024.07.05', taxInvoice: '발행 완료', isTutorial: true },
  { id: 'S2024-001', title: '웹사이트 개발 프로젝트', amount: '12,000,000원', status: '정산 완료', settlementDate: '2024.05.15', taxInvoice: '발행 완료' },
  { id: 'S2023-015', title: '로고 디자인', amount: '1,500,000원', status: '정산 완료', settlementDate: '2023.12.20', taxInvoice: '발행 완료' },
  { id: 'S2023-014', title: 'SNS 광고 캠페인', amount: '4,500,000원', status: '정산 완료', settlementDate: '2023.11.30', taxInvoice: '발행 완료' },
];

const StatCard: React.FC<{ icon: React.ReactElement<{ className?: string }>, title: string, value: string, color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center space-x-4">
        <div className={`p-3 rounded-full bg-${color}-500/10`}>
            {React.cloneElement(icon, { className: `h-6 w-6 text-${color}-400` })}
        </div>
        <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-100">{value}</p>
        </div>
    </div>
);


const SettlementPage: React.FC<SettlementPageProps> = ({ setActiveTab }) => {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-cyan-500/10 mb-6 ring-8 ring-cyan-500/5 border border-cyan-500/20">
            <SettlementIcon className="h-10 w-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">정산</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            프로젝트 완료와 동시에, 지연 없는 정확한 정산을 경험하세요. <br/> 당신의 노력에 대한 보상은 당연하고 신속해야 합니다.
          </p>
        </div>

        <div className="mt-20 max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <StatCard icon={<SettlementIcon />} title="올해 총 정산 금액" value="15,000,000 원" color="cyan" />
                <StatCard icon={<ArrowUpRightIcon />} title="연간 예상 소득" value="~ 34,000,000 원" color="slate" />
            </div>

            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-cyan-500/20 p-8 mb-10 text-center">
                <h3 className="text-xl font-bold text-slate-100">월말 정산, 번거로우셨죠?</h3>
                <p className="text-slate-400 mt-2">클릭 한 번으로 여러 건의 세금계산서를 발행하고, 분쟁 발생 시 전문가의 도움을 받으세요.</p>
                <div className="mt-6 w-full sm:w-auto flex flex-col sm:flex-row gap-2 justify-center">
                    <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-bold rounded-full text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 transition-all transform hover:scale-105 whitespace-nowrap">
                        <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                        세금계산서 일괄 발행
                    </button>
                    <button 
                        onClick={() => setActiveTab(Tab.Guarantee)}
                        className="inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-bold rounded-full text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors whitespace-nowrap"
                    >
                       <ScaleIcon className="h-5 w-5 mr-2" />
                        분쟁 중재 요청
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-100 mb-6">최근 정산 내역</h2>
            <div className="bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                    <thead className="border-b border-slate-700">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300">프로젝트</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">정산 금액</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-center">세금계산서</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">정산일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleSettlements.map((item) => (
                            <tr key={item.id} className={`border-b border-slate-800 last:border-b-0 hover:bg-slate-800 transition-colors ${item.isTutorial ? 'ring-2 ring-fuchsia-500/50' : ''}`}>
                                <td className="px-6 py-4">
                                     <div className="flex items-center space-x-2">
                                      <p className="font-semibold text-slate-100">{item.title}</p>
                                      {item.isTutorial && <span className="text-xs bg-fuchsia-500/30 text-fuchsia-300 px-2 py-0.5 rounded-full font-bold">예시</span>}
                                    </div>
                                    <p className="text-xs text-slate-500">{item.id}</p>
                                </td>
                                <td className="px-6 py-4 text-slate-100 font-mono text-right">{item.amount}</td>
                                <td className="px-6 py-4 text-center">
                                     <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                                         item.taxInvoice === '발행 완료' ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700 text-slate-400'
                                     }`}>{item.taxInvoice}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-400 text-right">{item.settlementDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SettlementPage;