import React from 'react';
import { DollarIcon, LightBulbIcon } from './Icons';

const sampleDeposits = [
  { id: 'P2024-003', title: '브랜드 리뉴얼 디자인', amount: '5,000,000원', status: '예치 완료', date: '2024.07.16', isTutorial: true },
  { id: 'P2024-004', title: '단편 영화 BGM 제작', amount: '2,500,000원', status: '입금 대기중', date: '2024.07.18' },
  { id: 'P2024-002', title: '마케팅 콘텐츠 제작', amount: '3,000,000원', status: '정산 완료', date: '2024.07.05' },
];

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

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
            <h2 className="text-3xl font-bold text-slate-100">안전한 대금 보호</h2>
            <p className="text-slate-400">
              프로젝트 대금을 FreeZone이 제3자로서 안전하게 보관합니다. 클라이언트는 결과물을 받기 전까지, 프리랜서는 대금을 받기 전까지 안심할 수 있는 환경을 만듭니다.
            </p>
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
              <p className="text-sm text-slate-300">
                대금 예치는 계약 단계에서 프로젝트 성격에 맞게 마일스톤(단계별) 또는 선금/잔금 형태로 자유롭게 설정할 수 있습니다.
              </p>
            </div>
          </div>

          {/* Right Column: Example Dashboard */}
          <div className="lg:col-span-3">
             <div className="bg-fuchsia-900/30 p-4 rounded-lg border border-fuchsia-700/50 mb-6 flex items-start space-x-3">
              <LightBulbIcon className="h-6 w-6 text-fuchsia-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-fuchsia-300">예치 현황판 미리보기</h3>
                <p className="text-sm text-slate-300 mt-1">
                  계약이 체결되면 이곳에서 프로젝트 대금 예치 현황을 관리하게 됩니다. 각 프로젝트의 입금 상태를 투명하게 추적할 수 있습니다.
                </p>
              </div>
            </div>

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
                            <tr key={deposit.id} className={`border-b border-slate-800 hover:bg-slate-800 transition-colors ${deposit.isTutorial ? 'ring-2 ring-fuchsia-500/50' : ''}`}>
                                <td className="px-6 py-4">
                                     <div className="flex items-center space-x-2">
                                      <p className="font-semibold text-slate-100">{deposit.title}</p>
                                      {deposit.isTutorial && <span className="text-xs bg-fuchsia-500/30 text-fuchsia-300 px-2 py-0.5 rounded-full font-bold">예시</span>}
                                    </div>
                                    <p className="text-xs text-slate-500">{deposit.id}</p>
                                </td>
                                <td className="px-6 py-4 text-slate-100 font-mono text-right">{deposit.amount}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
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
    </div>
  );
};

export default DepositPage;