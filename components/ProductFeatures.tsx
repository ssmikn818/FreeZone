
import React from 'react';
import { 
  DocumentTextIcon, 
  ScaleIcon, 
  ArrowDownTrayIcon, 
  LightBulbIcon, 
  ShieldCheckIcon, 
  DocumentDuplicateIcon,
  BalanceIcon 
} from './Icons';

const ProductFeatures: React.FC = () => {
  return (
    <div className="bg-slate-950 py-24 relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/30 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Steps */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-4">
              계약서 작성, 이렇게 쉬워요
            </h2>
            <p className="text-lg text-slate-400">
              단 3단계로 복잡한 계약 과정을 끝내보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center relative">
             {/* Connecting Line (Desktop only) */}
             <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-slate-800 -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 shadow-lg shadow-primary-900/10 group-hover:border-primary-500/50 group-hover:bg-primary-900/10 transition-all duration-300">
                <DocumentTextIcon className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. 정보 입력</h3>
              <p className="text-slate-400 leading-relaxed max-w-xs text-sm sm:text-base">
                프로젝트 기본 정보를 입력하고 AI 추천 조항으로 똑똑하게 계약서를 채워요.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 shadow-lg shadow-primary-900/10 group-hover:border-primary-500/50 group-hover:bg-primary-900/10 transition-all duration-300">
                <ScaleIcon className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. 조항 선택</h3>
              <p className="text-slate-400 leading-relaxed max-w-xs text-sm sm:text-base">
                업종별 표준 조항과 AI 추천 기능으로 빈틈없는 계약서를 완성하세요.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 shadow-lg shadow-primary-900/10 group-hover:border-primary-500/50 group-hover:bg-primary-900/10 transition-all duration-300">
                <ArrowDownTrayIcon className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. 간편 저장/전송</h3>
              <p className="text-slate-400 leading-relaxed max-w-xs text-sm sm:text-base">
                본문 복사, PDF 저장 또는 카톡 멘트 복사로 즉시 활용하세요.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Features Grid */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-4">
              당신의 시간을 아껴줄 강력한 기능
            </h2>
            <p className="text-lg text-slate-400">
              FreeZone은 단순한 계약서 생성을 넘어, 프리랜서를 위한 다양한 보호 장치를 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-primary-500/30 transition-colors group">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 p-3 bg-primary-900/20 rounded-xl border border-primary-500/10 group-hover:border-primary-500/30 transition-colors">
                  <LightBulbIcon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">AI 추천 조항</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    어떤 조항을 넣을지 막막한가요? 프로젝트 유형에 맞는 필수 조항을 AI가 추천해 드립니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors group">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 p-3 bg-emerald-900/20 rounded-xl border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">실시간 신뢰도 분석</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    혹시 불리한 조항은 없는지, AI가 계약서를 실시간으로 분석하여 분쟁 위험을 알려드립니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-colors group">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 p-3 bg-violet-900/20 rounded-xl border border-violet-500/10 group-hover:border-violet-500/30 transition-colors">
                  <DocumentDuplicateIcon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">다양한 업계 템플릿</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    디자인, 개발부터 컨설팅까지. 검증된 다양한 업계 표준 템플릿을 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-pink-500/30 transition-colors group">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 p-3 bg-pink-900/20 rounded-xl border border-pink-500/10 group-hover:border-pink-500/30 transition-colors">
                  <BalanceIcon className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">법적 안정성 확보</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    표준화된 계약서 양식으로 구두 계약이나 불분명한 합의로 인한 법적 분쟁을 원천 차단합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
