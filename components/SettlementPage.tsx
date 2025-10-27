import React from 'react';
import { SettlementIcon, LightBulbIcon } from './Icons';
import { Tab } from '../types';

interface SettlementPageProps {
  setActiveTab: (tab: Tab) => void;
}

const sampleSettlements = [
  { id: 'S2024-002', title: '마케팅 콘텐츠 제작', amount: '3,000,000원', status: '정산 완료', settlementDate: '2024.07.05', taxInvoice: '발행 완료', isTutorial: true },
  { id: 'S2024-001', title: '웹사이트 개발 프로젝트', amount: '12,000,000원', status: '정산 완료', settlementDate: '2024.05.15', taxInvoice: '발행 완료' },
  { id: 'S2023-015', title: '로고 디자인', amount: '1,500,000원', status: '정산 완료', settlementDate: '2023.12.20', taxInvoice: '발행 완료' },
];


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

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left Column: CTA */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
            <h2 className="text-3xl font-bold text-slate-100">신속·정확한 정산</h2>
            <p className="text-slate-400">
              프로젝트가 완료되면, 계약서에 명시된 기준에 따라 검수를 진행하고 예치된 대금이 즉시 정산됩니다. 모든 내역은 투명하게 기록됩니다.
            </p>
            <div className="space-y-4">
                <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-bold rounded-full text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors">
                    세금계산서 일괄 발행
                </button>
                <div className="text-center text-sm pt-2">
                    <p className="text-slate-500">
                        혹시 문제가 생겼나요?{' '}
                        <button 
                            onClick={() => setActiveTab(Tab.Guarantee)} 
                            className="font-semibold text-cyan-400 hover:underline focus:outline-none whitespace-nowrap"
                        >
                            분쟁 중재 요청하기
                        </button>
                    </p>
                </div>
            </div>
          </div>

          {/* Right Column: Example Dashboard */}
          <div className="lg:col-span-3">
            <div className="bg-fuchsia-900/30 p-4 rounded-lg border border-fuchsia-700/50 mb-6 flex items-start space-x-3">
              <LightBulbIcon className="h-6 w-6 text-fuchsia-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-fuchsia-300">정산 내역 미리보기</h3>
                <p className="text-sm text-slate-300 mt-1">
                  완료된 프로젝트의 정산 내역이 여기에 기록됩니다. 모든 과정을 투명하게 확인하고 소득 증빙 자료로도 활용할 수 있습니다.
                </p>
              </div>
            </div>
            
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
                            <tr key={item.id} className={`border-b border-slate-800 hover:bg-slate-800 transition-colors ${item.isTutorial ? 'ring-2 ring-fuchsia-500/50' : ''}`}>
                                <td className="px-6 py-4">
                                     <div className="flex items-center space-x-2">
                                      <p className="font-semibold text-slate-100">{item.title}</p>
                                      {item.isTutorial && <span className="text-xs bg-fuchsia-500/30 text-fuchsia-300 px-2 py-0.5 rounded-full font-bold">예시</span>}
                                    </div>
                                    <p className="text-xs text-slate-500">{item.id}</p>
                                </td>
                                <td className="px-6 py-4 text-slate-100 font-mono text-right">{item.amount}</td>
                                <td className="px-6 py-4 text-center">
                                     <span className="text-sm text-slate-300">{item.taxInvoice}</span>
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
    </div>
  );
};

export default SettlementPage;