import React, { useState } from 'react';

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-6"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-medium text-slate-100">{question}</span>
                <svg
                    className={`w-6 h-6 text-slate-400 transform transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="pb-6 pr-12">
                    <p className="text-slate-400 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
};

const FaqPage: React.FC = () => {
    const faqs = [
        {
            question: 'FreeZone은 어떤 서비스인가요?',
            answer: 'FreeZone은 프리랜서와 1인 사업자를 위한 계약 솔루션입니다. 복잡한 계약 과정을 단순화하여, 누구나 1분 만에 안전한 계약서를 만들고 자신의 권리를 보호할 수 있도록 돕습니다.',
        },
        {
            question: 'FreeZone에서 만든 계약서는 법적 효력이 있나요?',
            answer: '네, FreeZone에서 생성된 계약서는 양 당사자의 합의 내용을 명확히 담고 있으며, 상호 서명 또는 날인 후에는 일반적인 계약서와 동일한 법적 효력을 가집니다. 분쟁 발생 시 중요한 법적 근거 자료로 활용될 수 있습니다.',
        },
        {
            question: '이용료는 얼마인가요?',
            answer: '현재 FreeZone의 계약서 생성 기능은 베타 기간 동안 무료로 제공됩니다. 추후 안전 예치, 자동 정산 등 부가 기능이 추가되면서 일부 유료화될 수 있으며, 변경 시 사전에 충분히 공지해 드릴 예정입니다.',
        },
        {
            question: '제가 입력한 정보는 안전하게 보관되나요?',
            answer: '네, FreeZone은 사용자의 개인정보를 매우 중요하게 생각합니다. 계약서 작성을 위해 입력하신 정보는 서버에 저장되지 않으며, 오직 사용자 본인의 브라우저 내에서만 처리됩니다. 안심하고 사용하세요.',
        },
        {
            question: '계약서 조항을 제 마음대로 수정할 수 있나요?',
            answer: '물론입니다. FreeZone은 분야별 표준 템플릿과 AI 추천 조항을 제공하지만, 모든 내용은 사용자가 자유롭게 수정하고 추가할 수 있습니다. 프로젝트의 특성에 맞게 조항을 커스터마이징하여 더 안전한 계약을 만드세요.',
        },
    ];

    return (
        <div className="bg-slate-950 py-20 sm:py-24">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-100">자주 묻는 질문 (FAQ)</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                        FreeZone에 대해 궁금한 점이 있으신가요?
                    </p>
                </div>
                <div className="mt-16">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
