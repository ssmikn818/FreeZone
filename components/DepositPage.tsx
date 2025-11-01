import React from 'react';
import { DollarIcon, PlusIcon, CheckCircleIcon, ClockIcon } from './Icons';

const sampleDeposits = [
  { id: 'P2024-003', title: '브랜드 리뉴얼 디자인', amount: '5,000,000원', status: '예치 완료', date: '2024.07.16', isTutorial: true },
  { id: 'P2024-004', title: '단편 영화 BGM 제작', amount: '2,500,000원', status: '입금 대기중', date: '2024.07.18' },
  { id: 'P2024-002', title: '마케팅 콘텐츠 제작', amount: '3,000,000원', status: '정산 완료', date: '2024.07.05' },
  { id: 'P2024-001', title: '웹사이트 개발', amount: '12,000,000원', status: '정산 완료', date: '2024.06.28' },

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


const DepositPage: React.FC = () => {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-violet-500/10 mb-6 ring-8 ring-violet-500/5 border border-violet-500/20">
                <DollarIcon className="h-10 w-10 text-violet-400" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">안전 예치 (에스크로)</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                대금 지급에 대한 불안감 없이, <br/> 오롯이 프로젝트의 성공에만 집중할 수 있는 환경을 제공합니다.
            </p>
        </div>

        <div className="mt-20 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={<ClockIcon />} title="예치 대기 금액" value="2,500,000 원" color="amber" />
                <StatCard icon={<DollarIcon />} title="진행중인 프로젝트 (예치완료)" value="1 건" color="violet" />
                <StatCard icon={<CheckCircleIcon />} title="총 정산 완료" value="15,000,000 원" color="slate" />
            </div>

            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-violet-500/20 p-8 mb-10 text-center">
                <h3 className="text-xl font-bold text-slate-100">새로운 프로젝트를 시작하시나요?</h3>
                <p className="text-slate-400 mt-2">안전하게 대금을 예치하고, 안심하고 작업을 시작하세요.</p>
                 <button className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 transition-all transform hover:scale-105">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    신규 예치 요청
                </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-100 mb-6">최근 예치 내역</h2>
            <div className="bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                    <thead className="border-b border-slate-700">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300">프로젝트</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">예치 금액</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-center">상태</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">요청일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleDeposits.map((deposit) => (
                            <tr key={deposit.id} className={`border-b border-slate-800 last:border-b-0 hover:bg-slate-800 transition-colors ${deposit.isTutorial ? 'ring-2 ring-fuchsia-500/50' : ''}`}>
                                <td className="px-6 py-4">
                                     <div className="flex items-center space-x-2">
                                      <p className="font-semibold text-slate-100">{deposit.title}</p>
                                      {deposit.isTutorial && <span className="text-xs bg-fuchsia-500/30 text-fuchsia-300 px-2 py-0.5 rounded-full font-bold">예시</span>}
                                    </div>
                                    <p className="text-xs text-slate-500">{deposit.id}</p>
                                </td>
                                <td className="px-6 py-4 text-slate-100 font-mono text-right">{deposit.amount}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                                        deposit.status === '예치 완료' ? 'bg-violet-500/20 text-violet-400' :
                                        deposit.status === '입금 대기중' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                        {deposit.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400 text-right">{deposit.date}</td>
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

export default DepositPage;