import React from 'react';
import { ShieldCheckIcon, ScaleIcon, MedicalCrossIcon, DocumentTextIcon, PencilSquareIcon } from './Icons';

const ProblemCard: React.FC<{ icon: React.ReactElement, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col text-center items-center h-full">
    <div className="bg-slate-700 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-100">{title}</h3>
    <p className="text-sm text-slate-400 mt-2 flex-grow">{description}</p>
  </div>
);

const GuaranteePage: React.FC = () => {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 mb-6 ring-8 ring-emerald-500/5 border border-emerald-500/20">
            <ShieldCheckIcon className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">프리랜서 보호 솔루션</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
            예상치 못한 분쟁, 사고, 소득 공백의 위험. <br/> FreeZone이 당신의 든든한 안전망이 되어, 안정적인 활동을 보장합니다.
          </p>
        </div>

        {/* Problems Section */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProblemCard 
              icon={<ScaleIcon className="h-8 w-8 text-amber-400"/>}
              title="문제 1: 억울한 분쟁"
              description="대금 미지급, 부당한 계약 파기 등 분쟁 발생 시 어떻게 대응해야 할지 막막하셨죠? 최소한의 법적 보호 장치를 마련해 드립니다."
            />
            <ProblemCard 
              icon={<MedicalCrossIcon className="h-8 w-8 text-rose-400"/>}
              title="문제 2: 아프면 끊기는 수입"
              description="국민건강보험의 혜택만으로는 부족한 상해, 질병 시의 소득 공백. 막막한 병원비와 생활비 걱정을 덜어드립니다."
            />
          </div>
        </div>
        
        {/* Solutions Section */}
        <div className="mt-24 space-y-20">
          
          {/* Solution 1: Legal Dispute */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
               <h2 className="text-3xl font-bold text-slate-100">솔루션 1: 예측 가능한 분쟁 해결 시스템</h2>
               <p className="mt-4 text-lg font-semibold text-amber-300">"감정 소모는 끝, 데이터로 대응하세요"</p>
               <p className="mt-2 text-slate-400">분쟁이 발생했을 때, FreeZone 계약서와 프로젝트 기록을 바탕으로 시스템이 유형별 대응 절차를 안내합니다. 더 이상 혼자 끙끙 앓지 마세요.</p>
            </div>
            <div className="md:col-span-3 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start space-x-4">
                    <div className="bg-slate-700 p-3 rounded-lg text-amber-400"><DocumentTextIcon className="h-6 w-6"/></div>
                    <div>
                        <h4 className="font-bold text-slate-100">유형별 분쟁 해결 로드맵</h4>
                        <p className="text-sm text-slate-400 mt-1">대금 미지급, 일방적 계약 파기 등 가장 흔한 분쟁 유형에 맞춰 내용증명 발송부터 지급명령 신청, 전문가 연결까지 체계적인 해결 과정을 지원합니다.</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4 mt-6">
                    <div className="bg-slate-700 p-3 rounded-lg text-amber-400"><PencilSquareIcon className="h-6 w-6"/></div>
                    <div>
                        <h4 className="font-bold text-slate-100">객관적 데이터 기반 중재</h4>
                        <p className="text-sm text-slate-400 mt-1">계약서, 커뮤니케이션, 산출물 검수 등 FreeZone에 기록된 모든 데이터를 기반으로 전문가가 객관적인 중재안을 제시하여 불필요한 감정 소모를 줄여줍니다.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Solution 2: Income Gap */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
             <div className="md:col-span-3 bg-slate-800/50 p-6 rounded-xl border border-slate-700 order-2 md:order-1">
                 <div className="flex items-start space-x-4">
                    <div className="bg-slate-700 p-3 rounded-lg text-rose-400"><MedicalCrossIcon className="h-6 w-6"/></div>
                    <div>
                        <h4 className="font-bold text-slate-100">상해/질병 시 소득 공백 방어</h4>
                        <p className="text-sm text-slate-400 mt-1">FreeZone이 엄선한 파트너사의 단체 상해공제(보험)를 통해, 상해나 질병으로 입원/치료 시 치료비와 일당을 지원받아 소득 공백의 충격을 최소화합니다.</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4 mt-6">
                    <div className="bg-slate-700 p-3 rounded-lg text-rose-400"><ShieldCheckIcon className="h-6 w-6"/></div>
                    <div>
                        <h4 className="font-bold text-slate-100">업무 중 배상책임 보장</h4>
                        <p className="text-sm text-slate-400 mt-1">IT/디자인 프리랜서를 위해, 업무상 과실로 인한 손해배상 청구 시 최대 1억원까지 보장하여 법적 리스크로부터 당신을 보호합니다. (특약)</p>
                    </div>
                </div>
             </div>
             <div className="md:col-span-2 order-1 md:order-2">
                <h2 className="text-3xl font-bold text-slate-100">솔루션 2: 프리랜서 상생공제 (보험)</h2>
                <p className="mt-4 text-lg font-semibold text-rose-300">"아프면 쉬는 게 일, 소득 걱정은 FreeZone에"</p>
                <p className="mt-2 text-slate-400">FreeZone이 단체 계약으로 가격을 낮춘 상생공제(보험) 상품을 중개합니다. 최소한의 비용으로 당신의 건강과 소득을 지키세요.</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GuaranteePage;