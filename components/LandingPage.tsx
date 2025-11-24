
import React, { useState, useEffect, useMemo, useCallback, RefObject, useRef } from 'react';
import { Tab } from '../types';
import { DocumentTextIcon, ShareIcon, SignatureIcon, ShieldCheckIcon, DocumentDuplicateIcon, ScaleIcon, PlusIcon, LightBulbIcon, CheckCircleIcon, ScopeIcon, RevisionsIcon, DollarIcon, IPRightsIcon, TerminationIcon, FeedbackIcon, ClipboardIcon, PrinterIcon, XMarkIcon, QuestionMarkCircleIcon, PencilSquareIcon, ArrowLeftIcon, PaletteIcon, CodeIcon, BriefcaseIcon, ClockIcon, BellIcon, CheckBadgeIcon, AnalysisValidIcon, AnalysisInvalidIcon, ArrowDownTrayIcon, ChatBubbleOvalLeftEllipsisIcon } from './Icons';

interface LandingPageProps {
  contractRef: RefObject<HTMLDivElement>;
  onGoToContract: () => void;
}

const INDUSTRY_OPTIONS = ['디자인', 'IT/개발', '영상/미디어', '글/콘텐츠', '마케팅', '번역', '컨설팅/교육'];

const TASK_OPTIONS: Record<string, string[]> = {
  '디자인': ['로고/브랜딩 디자인', '웹/앱 UI/UX 디자인', '상세페이지/광고 디자인', '캐릭터/일러스트', '인쇄/출판물 디자인'],
  'IT/개발': ['웹사이트 개발', '모바일 앱 개발', '백엔드/API 개발', '데이터 분석/AI', '퍼블리싱/QA'],
  '영상/미디어': ['유튜브 영상 편집', '광고/홍보 영상 제작', '모션그래픽/애니메이션', '촬영/드론 촬영'],
  '글/콘텐츠': ['블로그/SNS 원고', '카피라이팅', '기술/전문 분야 글쓰기', '대본/시나리오 작성'],
  '마케팅': ['SNS 채널 운영', '퍼포먼스 마케팅', 'SEO/콘텐츠 마케팅', '브랜드 마케팅'],
  '번역': ['일반/비즈니스 번역', '영상/자막 번역', '전문/기술 번역', '순차/동시 통역'],
  '컨설팅/교육': ['비즈니스 컨설팅', '커리어/진로 코칭', '온라인 강의 제작', '외국어/전문 과외'],
};

const DELIVERABLE_OPTIONS: Record<string, string[]> = {
    // 디자인
    '로고/브랜딩 디자인': ['AI 원본 파일', 'PNG/JPG 파일', '브랜드 가이드라인 PDF'],
    '웹/앱 UI/UX 디자인': ['Figma/XD 원본 파일', '디자인 시스템 가이드', '프로토타입 링크'],
    '상세페이지/광고 디자인': ['PSD/AI 원본 파일', '웹용 JPG 파일', '폰트 라이선스 정보'],
    '캐릭터/일러스트': ['고해상도 원본 파일 (PSD/AI)', '용도별 이미지 파일 (PNG/JPG)', '캐릭터 응용동작 3종'],
    '인쇄/출판물 디자인': ['인쇄용 PDF 파일', 'InDesign/Illustrator 원본 파일', '사양 정보(칼선, 후가공 등)'],
    
    // IT/개발
    '웹사이트 개발': ['전체 소스코드', '개발 산출물 문서', '서버 배포 지원'],
    '모바일 앱 개발': ['전체 소스코드', 'API 명세서', '스토어 심사 지원'],
    '백엔드/API 개발': ['API 명세서 (Swagger/Postman)', '서버 소스코드', '데이터베이스 스키마'],
    '데이터 분석/AI': ['분석 보고서 (PPT/PDF)', '데이터 시각화 대시보드', '모델링 소스코드 (Jupyter 등)'],
    '퍼블리싱/QA': ['HTML/CSS/JS 산출물', '크로스브라우징 테스트 결과서', 'QA 시나리오 및 결과 보고서'],
    
    // 영상/미디어
    '유튜브 영상 편집': ['최종 영상 파일 (MP4, 1080p)', '프로젝트 원본 파일 (선택사항)', '썸네일 이미지 파일'],
    '광고/홍보 영상 제작': ['최종 영상 파일 (매체별 규격)', '클린본 (자막/음악 제외)', '프로젝트 원본 파일'],
    '모션그래픽/애니메이션': ['최종 영상 파일 (MP4/MOV)', 'After Effects/Cinema 4D 원본 파일', '주요 그래픽 소스'],
    '촬영/드론 촬영': ['편집용 원본 영상 (로그 촬영본)', '정리된 클립 데이터', '현장 스케치 사진'],
    
    // 글/콘텐츠
    '블로그/SNS 원고': ['원고 HWP/DOCX 파일', '포스팅용 이미지 파일', '검수 확인서'],
    '카피라이팅': ['최종 카피 문구 리스트 (슬로건, 광고 문구 등)', '활용 가이드라인', '시안별 컨셉 설명'],
    '기술/전문 분야 글쓰기': ['최종 원고 (지정 형식)', '참고문헌 리스트', '관련 이미지/도표 자료'],
    '대본/시나리오 작성': ['최종 대본/시나리오 파일', '등장인물 및 설정 자료', '트리트먼트/시놉시스'],
    
    // 마케팅
    'SNS 채널 운영': ['월간 콘텐츠 캘린더', '채널 데이터 분석 보고서', '원본 이미지/영상 파일'],
    '퍼포먼스 마케팅': ['매체별 성과 보고서', '광고 소재 파일', '캠페인 세팅 내역'],
    'SEO/콘텐츠 마케팅': ['키워드 분석 보고서', '최적화된 콘텐츠 원고', '백링크 작업 현황 보고서'],
    '브랜드 마케팅': ['브랜드 전략 기획서', '캠페인 실행안 및 결과 보고서', '시장 조사 자료'],
    
    // 번역
    '일반/비즈니스 번역': ['번역본 파일 (원본 형식 유지)', '용어집(Glossary)', '번역가 확인서'],
    '영상/자막 번역': ['자막 파일 (SRT 형식)', '타임코드 포함 대본', '번역 노트'],
    '전문/기술 번역': ['최종 번역본', '원문/번역문 대조표', '감수 확인서'],
    '순차/동시 통역': ['행사 개요 및 발표 자료', '사전 협의 회의록', '통역 결과 보고서 (요청 시)'],

    // 컨설팅/교육
    '비즈니스 컨설팅': ['최종 컨설팅 보고서', '실행 계획(Action Plan)', '관련 시장 분석 자료'],
    '커리어/진로 코칭': ['개인별 코칭 결과 보고서', '이력서/자소서 첨삭본', '추천 액션 플랜'],
    '온라인 강의 제작': ['강의 영상 파일', '강의 교안 (PDF)', '관련 퀴즈 및 과제 자료'],
    '외국어/전문 과외': ['수업 계획서', '월별 학습 경과 보고서', '자체 제작 학습 자료'],
};


const CLAUSE_PLACEHOLDERS: Record<string, string> = {
    scope: '예: 제공된 기획서 및 디자인을 기반으로 반응형 웹사이트의 프론트엔드 개발을 수행합니다. 관리자 페이지는 포함되지 않습니다.',
    revisions: '예: 최초 시안 확인 후 1회, 최종 시안 확정 후 1회로 총 2회 수정을 기본으로 제공합니다.',
    payment: '예: 선금 50% (계약 체결 후 3일 이내), 잔금 50% (최종 산출물 검수 완료 후 3일 이내).',
    ip: '예: 최종 선택된 결과물에 대한 저작재산권은 잔금 지급 완료 시 의뢰인에게 귀속됩니다.',
    termination: '예: 의뢰인의 단순 변심으로 계약 해지 시, 선금은 환불되지 않습니다.',
    feedback: '예: 각 시안 발송 후 3 영업일 이내에 피드백을 제공하며, 지정된 채널(예: 이메일, 슬랙)로 통합하여 전달합니다.',
    review: '예: 본 계약과 관련하여 알게 된 상호의 모든 정보는 외부에 유출하지 않으며, 계약 종료 후 3년간 비밀유지 의무를 가집니다.',
};

const CLAUSE_TIPS: Record<string, string> = {
    scope: "작업 범위를 명확히 할수록 '이것도 해주세요'라는 추가 요청을 방지할 수 있어요.",
    revisions: "수정 횟수와 추가 비용을 명시하는 것은 끝없는 수정을 막는 가장 효과적인 방법입니다.",
    payment: "대금 지급 시점과 방식을 명확히 해야 안정적인 수입을 계획하고 미수금 위험을 줄일 수 있습니다.",
    ip: "저작권 귀속과 포트폴리오 사용 권한을 명시해야 나의 소중한 작업물을 자산으로 활용하고 분쟁을 막을 수 있습니다.",
    termination: "계약이 중도에 해지될 경우를 대비해 책임 소재와 비용 정산 기준을 정해두어야 손해를 보지 않습니다.",
    feedback: "명확한 피드백 기한과 소통 채널 지정은 프로젝트 지연을 막고, 모든 커뮤니케이션 기록을 남겨 분쟁을 예방합니다.",
    review: "비밀유지 의무, 하자보수 기간 등 프로젝트의 특수성을 반영한 내용을 추가하여 예상치 못한 분쟁을 예방하세요.",
};

const numberToKoreanWon = (num: number): string => {
    if (typeof num !== 'number' || isNaN(num)) return '';
    if (num === 0) return '영';
    
    const numStr = String(num);
    if (num >= 10000000000000000) return '금액이 너무 큽니다.';

    const units = ['', '만', '억', '조', '경'];
    const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const smallUnits = ['', '십', '백', '천'];
    
    let result = '';
    let unitIndex = 0;
    
    for (let i = numStr.length; i > 0; i -= 4) {
        let chunkStr = numStr.substring(Math.max(0, i - 4), i);
        if (!chunkStr) continue;

        let chunkKorean = '';
        for (let j = 0; j < chunkStr.length; j++) {
            const digit = parseInt(chunkStr[j]);
            if (digit > 0) {
                chunkKorean += digits[digit];
                if (j < chunkStr.length - 1) {
                    chunkKorean += smallUnits[chunkStr.length - 1 - j];
                }
            }
        }
        
        if (chunkKorean) {
          chunkKorean = chunkKorean.replace(/일([십백천])/g, '$1');
          result = chunkKorean + units[unitIndex] + result;
        }
        
        unitIndex++;
    }

    return result.trim() || '영';
};

const getFormattedDate = (dateStr: string) => {
    const contractSigningDate = dateStr ? new Date(dateStr + 'T00:00:00') : new Date();
    const year = contractSigningDate.getFullYear();
    const month = contractSigningDate.getMonth() + 1;
    const day = contractSigningDate.getDate();
    return `${year}년 ${month}월 ${day}일`;
};

// ----------------------
// 조항 추천 로직 확장
// ----------------------
const getClauseGuidance = (projectValue: number, industry: string, task: string) => {
    // 1. 공통 조항 (모든 업종 공통)
    const commonClauses = {
        termination: [
            {
                title: '책임 분배형: 귀책사유 기준',
                suggestion: '의뢰인의 단순 변심으로 계약 해지 시, 선금은 환불되지 않습니다.\n작업자의 귀책 사유로 계약 이행이 불가능할 경우, 선금 전액을 환불하고 총 계약금액의 20%를 손해배상금으로 지급합니다.',
                rationale: `🤔 문제점: 일방적인 계약 파기는 손해를 야기합니다.\n💡 해결책: 귀책사유에 따른 책임 범위를 명확히 하여 부당한 파기를 방지합니다.`,
            },
             {
                title: '진행률 정산형: 단계별 비용 정산',
                suggestion: '계약 해지 시점까지 진행된 작업량에 대해 상호 합의하여 정산합니다. (예: 착수 단계 30%, 중간 단계 70%) 단, 의뢰인 귀책 시 위약금 10%가 가산됩니다.',
                rationale: `🤔 문제점: 중도 해지 시 기여도 산정이 어렵습니다.\n💡 해결책: 단계별 가치를 정해 정산 기준을 마련합니다.`
            },
        ],
        feedback: [
            {
                title: '소통 규칙형: 피드백 채널/기한 지정',
                suggestion: '각 단계별 결과물 공유 후 3 영업일 이내에 피드백을 제공합니다. 피드백은 지정된 채널(예: 이메일, 슬랙)로 일원화하여 전달하며, 구두 요청은 효력이 없습니다.',
                rationale: `🤔 문제점: 피드백 지연과 소통 분산은 일정 지연의 주범입니다.\n💡 해결책: 기한과 채널을 고정하여 기록을 남기고 효율을 높입니다.`
            },
        ],
        review: [
            {
                title: '기본 보안형: 비밀유지 의무',
                suggestion: '양 당사자는 본 계약과 관련하여 알게 된 상대방의 영업상, 기술상 비밀을 제3자에게 누설해서는 안 되며, 이 의무는 계약 종료 후 3년간 유효합니다.',
                rationale: `🤔 문제점: 민감 정보 유출은 사업적 피해를 줍니다.\n💡 해결책: 상호 신뢰와 자산 보호를 위한 필수 장치입니다.`,
            },
        ]
    };

    // 2. 대금 지급 방식 (금액대별 추천)
    const paymentClauses = {
        standard: {
            title: '기본 분할형: 5:5 선금/잔금',
            suggestion: `총 계약금액: ${projectValue.toLocaleString()}원 (VAT 별도)\n- 선금(50%): 계약 체결 후 3일 이내 (${(projectValue * 0.5).toLocaleString()}원)\n- 잔금(50%): 최종 산출물 검수 완료 후 3일 이내 (${(projectValue * 0.5).toLocaleString()}원)`,
            rationale: `가장 표준적인 방식으로, 초기 착수금과 최종 완료금을 균형 있게 배분합니다.`,
        },
        split343: {
            title: '안전 분할형: 30/40/30 분할',
            suggestion: `총 계약금액: ${projectValue.toLocaleString()}원 (VAT 별도)\n- 착수금(30%): 계약 체결 시\n- 중도금(40%): 중간 산출물 확인 시\n- 잔금(30%): 최종 완료 시`,
            rationale: `프로젝트 기간이 길거나 금액이 클 때, 현금 흐름을 안정화하는 방식입니다.`,
        }
    };

    // 3. 업종별 특화 로직 (Revisions, IP 등)
    let industrySpecific = {};

    switch (industry) {
        case '디자인':
            industrySpecific = {
                revisions: [
                     { title: '횟수 지정형: 총 2회', suggestion: '최초 시안 확인 후 1회, 최종 시안 확정 후 1회로 총 2회의 수정을 무료로 제공합니다. 이를 초과하는 수정이나 컨셉 변경은 별도 비용이 발생합니다.', rationale: '디자인 작업의 특성상 무제한 수정은 불가능하므로 명확한 횟수 제한이 필요합니다.' },
                     { title: '단계별 제한형', suggestion: '스케치 단계 2회, 채색 단계 1회 수정 가능하며, 이전 단계로 돌아가는 수정(회귀 수정)은 불가능합니다.', rationale: '공정이 진행된 후 앞단계를 수정하는 비효율을 막습니다.' }
                ],
                ip: [
                    { title: '포트폴리오 사용형', suggestion: '최종 결과물의 저작권은 의뢰인에게 귀속되나, 작업자는 이를 포트폴리오 용도로 사용할 수 있습니다.', rationale: '저작권은 넘기되, 작가의 경력 증빙 권리를 확보합니다.' },
                    { title: '2차 저작권 별도', suggestion: '최종 결과물의 사용권은 의뢰인에게 있으나, 원본 파일의 수정 및 2차 저작물 작성권은 작업자에게 있습니다. (필요 시 별도 구매)', rationale: '원본 변형을 막고 추가 수익을 기대할 수 있습니다.' }
                ]
            };
            break;
        case 'IT/개발':
            industrySpecific = {
                 revisions: [
                    { title: '하자보수 기간형', suggestion: '최종 산출물 인도 후 1개월간 발견된 버그 및 오류에 대해 무상 유지보수를 제공합니다. 단, 새로운 기능 추가나 기획 변경은 포함되지 않습니다.', rationale: '개발은 완료 후 버그 수정이 필수적이므로 기간을 정해 책임을 다합니다.' },
                    { title: '범위 엄수형', suggestion: '기획서(요구사항 정의서)에 명시된 기능 외의 수정/추가 요청은 별도의 추가 계약(Change Request)을 통해 진행합니다.', rationale: '개발 범위 확장을(Scope Creep) 막기 위해 문서 기반 기준을 세웁니다.' }
                ],
                ip: [
                    { title: '개발 산출물 양도', suggestion: '잔금 지급과 동시에 소스코드 및 산출물 일체의 권리는 의뢰인에게 귀속됩니다.', rationale: '일반적인 SI/외주 개발의 표준입니다.' },
                    { title: '솔루션 라이선스', suggestion: '결과물의 사용권은 의뢰인에게 영구 부여되나, 사용된 핵심 모듈 및 라이브러리의 지적재산권은 작업자에게 유보됩니다.', rationale: '자체 솔루션을 활용해 개발하는 경우 핵심 기술을 보호합니다.' }
                ]
            };
            break;
        case '영상/미디어':
             industrySpecific = {
                revisions: [
                    { title: '컷 편집/종편 구분형', suggestion: '가편집본(컷편집) 단계에서 1회, 종편(자막/효과) 단계에서 1회 수정을 진행합니다. 종편 단계에서 컷 편집 수정 시 추가 비용이 발생합니다.', rationale: '영상 작업은 렌더링 후 수정이 매우 번거로우므로 단계별 확정이 중요합니다.' },
                    { title: '시간 기반 수정', suggestion: '전체 길이의 10% 이내 수정은 2회 무료이며, 전체 재편집이나 30% 이상의 수정은 신규 견적으로 처리합니다.', rationale: '수정 범위를 정량화하여 무리한 요구를 방지합니다.' }
                ],
                ip: [
                    { title: '최종본 귀속형', suggestion: '최종 렌더링된 영상 파일의 저작권은 의뢰인에게 귀속됩니다. 프로젝트 원본(프로젝트 파일, 소스 등)은 제공되지 않습니다.', rationale: '일반적으로 원본 프로젝트 파일은 작업자의 노하우가 담겨있어 제공하지 않습니다.' },
                    { title: '초상권/사용처 제한', suggestion: '제작된 영상은 합의된 매체(예: 유튜브)에서만 사용 가능하며, TV광고 등 타 매체 확장 시 별도 협의가 필요합니다.', rationale: '모델/성우의 초상권 및 사용료 이슈를 사전에 방지합니다.' }
                ]
            };
            break;
        case '글/콘텐츠':
             industrySpecific = {
                revisions: [
                    { title: '윤문/교정 중심형', suggestion: '초안 전달 후 내용의 사실관계 오류 및 윤문 수정 2회를 제공합니다. 전체적인 방향성이나 톤앤매너 변경은 재작업 비용이 청구됩니다.', rationale: '글쓰기는 주관적 영역이므로, 내용 오류 수정과 전면 재작업을 구분해야 합니다.' },
                    { title: '분량 기반형', suggestion: '전체 원고의 20% 분량 내 수정 2회를 제공합니다. 기획 방향 변경으로 인한 전면 수정은 불가합니다.', rationale: '수정 범위를 명확히 합니다.' }
                ],
                ip: [
                    { title: '고스트라이팅(양도)', suggestion: '모든 저작권은 의뢰인에게 귀속되며, 작업자는 저작인격권(성명표시권)을 행사하지 않습니다.', rationale: '마케팅 원고나 대필의 경우 저작권을 완전히 넘기는 것이 일반적입니다.' },
                    { title: '바이라인 명시형', suggestion: '저작재산권은 의뢰인에게 있으나, 발행 시 작업자의 이름(Byline)을 명시해야 합니다.', rationale: '기고문이나 칼럼 등 작가의 크레딧이 중요한 경우입니다.' }
                ]
            };
            break;
         case '마케팅':
             industrySpecific = {
                revisions: [
                    { title: '캠페인 최적화형', suggestion: '광고 세팅 후 2주간의 초기 최적화(소재 교체, 타겟팅 조정)를 지원합니다. 이후의 관리는 별도 운영 계약을 따릅니다.', rationale: '퍼포먼스 마케팅은 수정보다는 지속적인 최적화 과정임을 명시합니다.' },
                    { title: '사전 컨펌 필수', suggestion: '모든 콘텐츠 발행 전 의뢰인의 최종 승인을 득해야 하며, 승인된 콘텐츠 발행 후 발생한 문제에 대해 작업자는 책임지지 않습니다.', rationale: '마케팅 사고 방지를 위해 책임 소재를 명확히 합니다.' }
                ],
                ip: [
                    { title: '데이터 소유권', suggestion: '광고 집행을 통해 축적된 데이터 및 계정 소유권은 의뢰인에게 귀속됩니다.', rationale: '계약 종료 후 계정 소유권 분쟁을 예방합니다.' },
                    { title: '소재 사용 제한', suggestion: '제작된 마케팅 소재는 계약 기간 동안 해당 캠페인에만 사용 가능하며, 외부 배포나 상업적 재판매는 금지됩니다.', rationale: '계약 종료 후 소재 무단 사용을 막습니다.' }
                ]
            };
            break;
         case '번역':
             industrySpecific = {
                revisions: [
                    { title: '오역 수정 무제한', suggestion: '명백한 오역이나 누락에 대해서는 기간/횟수 제한 없이 무상 수정을 제공합니다. 단, 단순 표현(스타일) 선호에 따른 수정은 1회로 제한합니다.', rationale: '품질에 대한 책임을 다하되, 주관적 취향에 의한 무한 수정을 막습니다.' },
                    { title: '용어집 기반', suggestion: '사전에 합의된 용어집(Glossary)을 기준으로 작업하며, 용어집 미준수에 대한 수정은 무제한 제공합니다.', rationale: '전문 번역의 품질 기준을 세웁니다.' }
                ],
                ip: [
                    { title: '납품형', suggestion: '번역 결과물의 저작권은 잔금 지급 시 의뢰인에게 양도됩니다.', rationale: '일반적인 비즈니스 번역의 형태입니다.' }
                ]
            };
            break;
          case '컨설팅/교육':
             industrySpecific = {
                revisions: [
                    { title: '질의응답 포함형', suggestion: '최종 보고서 전달 후 1회의 수정 보완 및 1시간의 Q&A 세션을 제공합니다. 추가 자문은 시간당 비용이 청구됩니다.', rationale: '컨설팅은 결과물 자체보다 이해와 설명 과정이 중요합니다.' },
                ],
                 ip: [
                    { title: '자료 사용권', suggestion: '제공된 교육 자료 및 보고서는 의뢰인 내부 목적으로만 사용 가능하며, 외부 배포나 상업적 재판매는 금지됩니다.', rationale: '컨설턴트의 지식 자산을 보호합니다.' }
                ]
            };
            break;
        default:
             industrySpecific = {
                 revisions: [{ title: '기본 수정형', suggestion: '최종 산출물 전달 후 2회 무료 수정을 제공합니다.', rationale: '표준적인 수정 조항입니다.'}],
                 ip: [{ title: '저작권 양도', suggestion: '잔금 지급 시 저작권은 의뢰인에게 귀속됩니다.', rationale: '표준적인 저작권 조항입니다.'}]
             };
            break;
    }

    // 데이터 병합 (Payment는 공통으로 처리하되, 필요 시 industrySpecific에 추가 가능)
    return {
        ...commonClauses,
        payment: [paymentClauses.standard, paymentClauses.split343],
        ...industrySpecific
    };
};

export const LandingPage: React.FC<LandingPageProps> = ({ contractRef, onGoToContract }) => {
    const [step, setStep] = useState(1);
    const [infoStep, setInfoStep] = useState(0);
    const [clauseStep, setClauseStep] = useState(0);
    const [showAnalysisModal, setShowAnalysisModal] = useState(false); // New: Modal State
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    
    const [formData, setFormData] = useState({
        clientName: '',
        freelancerName: '',
        projectName: '',
        industry: '',
        task: '',
        deliverables: [] as string[],
        projectValue: 100000,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        contractDate: new Date().toISOString().split('T')[0],
    });
    const [clauses, setClauses] = useState({
        scope: '',
        revisions: '',
        payment: '',
        ip: '',
        termination: '',
        feedback: '',
        review: '',
    });
    const [activeClauseHelp, setActiveClauseHelp] = useState<string | null>(null);
    const [dateError, setDateError] = useState('');
    const clauseTitleRef = useRef<HTMLDivElement>(null);

    // Update: Pass industry to getClauseGuidance
    const clauseGuidance = useMemo(() => getClauseGuidance(formData.projectValue, formData.industry, formData.task), [formData.projectValue, formData.industry, formData.task]);
    
    // Update: Logic to retrieve suggestions is now simplified as structure is normalized
    // No need for "guidanceForTask" derived state as getClauseGuidance returns the flat object for the selected inputs
    
    const infoFields = useMemo(() => [
        { key: 'definition', title: '프로젝트 정의', description: '가장 중요한 프로젝트 종류를 먼저 선택해주세요.' },
        { key: 'parties', title: '계약 당사자 및 산출물', description: '누가 무엇을 전달해야 하는지 명확히 해요.' },
        { key: 'schedule', title: '일정 및 대금', description: '언제까지, 얼마에 진행하는지 명확히 정의해요.' },
    ], []);

    const clauseFields = useMemo(() => [
        { key: 'scope', title: '작업의 범위와 내용', icon: <ScopeIcon /> },
        { key: 'revisions', title: '수정 횟수 및 범위', icon: <RevisionsIcon /> },
        { key: 'payment', title: '대금 지급 방식', icon: <DollarIcon /> },
        { key: 'ip', title: '저작권 귀속 및 활용', icon: <IPRightsIcon /> },
        { key: 'termination', title: '계약의 중도 해지', icon: <TerminationIcon /> },
        { key: 'feedback', title: '피드백 및 소통 방식', icon: <FeedbackIcon /> },
        { key: 'review', title: '기타 특약사항 (비밀유지 등)', icon: <PencilSquareIcon /> }
    ], []);

    useEffect(() => {
        if (step === 2 && clauseTitleRef.current) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight + 24 : 96;
            const y = clauseTitleRef.current.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        // Trigger Modal on Step 3
        if (step === 3) {
            setShowAnalysisModal(true);
        }
    }, [clauseStep, step]);

    const handleStepChange = (newStep: number) => {
        if (newStep === 2) {
            setClauseStep(0);
        }
        setStep(newStep);
        onGoToContract();
    };

    const handleNextInfoStep = () => {
        if (infoStep < infoFields.length - 1) {
            setInfoStep(prev => prev + 1);
            onGoToContract();
        } else {
            handleStepChange(2);
        }
    };

    const handlePrevInfoStep = () => {
        if (infoStep > 0) {
            setInfoStep(prev => prev - 1);
            onGoToContract();
        }
    };

    const handleBackToClauses = () => {
        setClauseStep(clauseFields.length - 1);
        setStep(2);
        onGoToContract();
    };
    
    const handleNextClause = () => {
        if (clauseStep < clauseFields.length - 1) {
            setClauseStep(clauseStep + 1);
        } else {
            handleStepChange(3);
        }
    };

    const handlePrevClause = () => {
        if (clauseStep > 0) {
            setClauseStep(clauseStep - 1);
        } else {
            setInfoStep(infoFields.length - 1);
            handleStepChange(1);
        }
    };

    useEffect(() => {
        if(formData.industry) {
            const newTasks = TASK_OPTIONS[formData.industry];
            if (newTasks && !newTasks.includes(formData.task)) {
                setFormData(prev => ({ ...prev, task: '', deliverables: [] }));
            }
        }
    }, [formData.industry, formData.task]);

    useEffect(() => {
        const newDeliverables = DELIVERABLE_OPTIONS[formData.task];
        setFormData(prev => ({ ...prev, deliverables: newDeliverables || [] }));
        
        // Update: Apply suggestions from the expanded guidance
        const newClauses: any = {};
        Object.keys(clauses).forEach(key => {
            const suggestions = (clauseGuidance as any)[key];
            if (suggestions && suggestions.length > 0) {
                newClauses[key] = suggestions[0].suggestion;
            } else {
                newClauses[key] = '';
            }
        });
        setClauses(newClauses);

    }, [formData.task, clauseGuidance]);

    useEffect(() => {
        if (formData.startDate && formData.endDate && formData.contractDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const contract = new Date(formData.contractDate);
            if (end < start) {
                setDateError('종료일은 시작일보다 빠를 수 없습니다.');
            } else if (start < contract) {
                setDateError('시작일은 계약 체결일보다 빠를 수 없습니다.');
            } else {
                setDateError('');
            }
        }
    }, [formData.startDate, formData.endDate, formData.contractDate]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'projectValue') {
            const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
            setFormData(prev => ({ ...prev, [name]: isNaN(numericValue) ? 0 : numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleClauseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClauses(prev => ({ ...prev, [name]: value }));
    };

    const handleDeliverableChange = (index: number, value: string) => {
        const newDeliverables = [...formData.deliverables];
        newDeliverables[index] = value;
        setFormData(prev => ({ ...prev, deliverables: newDeliverables }));
    };
    
    const addDeliverable = () => {
        setFormData(prev => ({ ...prev, deliverables: [...prev.deliverables, ''] }));
    };

    const removeDeliverable = (index: number) => {
        setFormData(prev => ({ ...prev, deliverables: prev.deliverables.filter((_, i) => i !== index) }));
    };

    const handleApplySuggestion = (clauseKey: string, suggestion: string) => {
        setClauses(prev => ({ ...prev, [clauseKey]: suggestion }));
    };
    
    const generateContractText = useCallback(() => {
        const formattedDate = getFormattedDate(formData.contractDate);

        return `
용역 계약서

본 계약은 아래의 당사자 간에 체결된다.

- 의뢰인 (이하 "갑"): ${formData.clientName || '(의뢰인 이름)'}
- 작업자 (이하 "을"): ${formData.freelancerName || '(작업자 이름)'}

제 1 조 (계약의 목적)
"을"은 "갑"의 의뢰에 따라 ‘${formData.projectName || '(프로젝트명)'}’ 프로젝트(이하 "본 용역")를 수행하고, "갑"은 이에 대한 보수를 지급하는 것을 목적으로 한다.

제 2 조 (용역의 범위 및 내용)
"을"이 수행할 용역의 범위는 다음 각 호와 같다.
1. 주요 과업: ${formData.task}
2. 최종 산출물:
${formData.deliverables.map(d => `   - ${d}`).join('\n')}
3. 기타:
${clauses.scope || '(상호 협의 하에 정한 구체적인 작업 내용)'}

제 3 조 (계약 기간)
본 용역의 수행 기간은 ${formData.startDate}부터 ${formData.endDate}까지로 한다.

제 4 조 (계약 금액 및 지급 방법)
1. 총 계약 금액: 총 ${formData.projectValue.toLocaleString('ko-KR')} 원 (금 ${numberToKoreanWon(formData.projectValue)} 원정), 부가가치세 별도
2. 지급 방법:
${clauses.payment || CLAUSE_PLACEHOLDERS.payment}

제 5 조 (수정 및 검수)
${clauses.revisions || CLAUSE_PLACEHOLDERS.revisions}

제 6 조 (저작권 귀속)
${clauses.ip || CLAUSE_PLACEHOLDERS.ip}

제 7 조 (피드백 및 소통)
${clauses.feedback || CLAUSE_PLACEHOLDERS.feedback}

제 8 조 (계약의 해지)
${clauses.termination || CLAUSE_PLACEHOLDERS.termination}

제 9 조 (비밀유지 의무 및 기타)
${clauses.review || CLAUSE_PLACEHOLDERS.review}

본 계약의 내용을 증명하기 위하여 계약서 2부를 작성하여 "갑"과 "을"이 서명 또는 날인한 후 각각 1부씩 보관한다.

${formattedDate}

갑 (의뢰인): ${formData.clientName || '________________'} (서명/인)
을 (작업자): ${formData.freelancerName || '________________'} (서명/인)
    `}, [formData, clauses]);

    const handleCopy = useCallback(() => {
        const contractText = generateContractText();
        navigator.clipboard.writeText(contractText.trim()).then(() => {
            alert('계약서 내용이 클립보드에 복사되었습니다.');
        }, () => {
            alert('복사에 실패했습니다. 브라우저 설정을 확인해주세요.');
        });
    }, [generateContractText]);

    const handleDownloadPdf = () => {
        const element = document.getElementById('contract-print-area');

        if (!element) {
            alert("⚠️ 오류: 출력할 계약서 영역을 찾을 수 없습니다.");
            return;
        }

        // 1. Start loading state
        setIsGeneratingPdf(true);

        // 2. Wait for state update, then takeover screen
        setTimeout(() => {
            // Save original styles
            const originalStyle = element.getAttribute('style') || '';
            const innerDiv = element.firstElementChild as HTMLElement;
            const originalInnerStyle = innerDiv ? innerDiv.getAttribute('style') || '' : '';

            // Apply "Screen Takeover" styles with forced visibility and height
            // This ensures html2canvas sees the full content expanded
            element.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: 210mm !important;
                height: auto !important;
                min-height: 100vh !important;
                z-index: 99999 !important;
                background-color: white !important;
                color: black !important;
                margin: 0 !important;
                overflow: visible !important;
                display: block !important;
            `;

            // Ensure inner div also expands and doesn't scroll
            if (innerDiv) {
                innerDiv.style.cssText = `
                    width: 100% !important;
                    height: auto !important;
                    background-color: white !important;
                    padding: 10mm 25mm 20mm 25mm !important;
                    box-shadow: none !important;
                    margin: 0 auto !important;
                    overflow: visible !important;
                `;
            }

            const safeProjectName = formData.projectName.trim().replace(/[^a-zA-Z0-9가-힣\s]/g, '') || '프로젝트';
            const filename = `${safeProjectName}_표준계약서.pdf`;

            const opt = {
                margin: [15, 0, 15, 0], // Top, Left, Bottom, Right
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    logging: false, 
                    useCORS: true, 
                    scrollY: 0, // Critical: capture from the top
                    windowWidth: document.documentElement.offsetWidth, // Ensure responsive width is correct
                    height: element.scrollHeight, // Force full height capture
                    windowHeight: element.scrollHeight // Force full height capture
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // @ts-ignore
            if (window.html2pdf) {
                // @ts-ignore
                window.html2pdf().set(opt).from(element).save()
                    .then(() => {
                        // Success
                    })
                    .catch((err: any) => {
                        console.error(err);
                        alert("PDF 생성 중 오류가 발생했습니다.");
                    })
                    .finally(() => {
                        // Restore styles
                        element.setAttribute('style', originalStyle);
                        if (innerDiv) {
                            innerDiv.setAttribute('style', originalInnerStyle);
                        }
                        setIsGeneratingPdf(false);
                    });
            } else {
                alert("PDF 생성 라이브러리를 로드하는 중입니다. 잠시 후 다시 시도해주세요.");
                // Restore styles
                element.setAttribute('style', originalStyle);
                if (innerDiv) {
                    innerDiv.setAttribute('style', originalInnerStyle);
                }
                setIsGeneratingPdf(false);
            }
        }, 100);
    };

    const handleCopyKakao = () => {
        const message = `안녕하세요, 요청하신 계약서 초안 송부드립니다.
파일 확인 부탁드립니다.

(본 계약서는 '1분 간편 전자계약 서비스 Freezone'을 통해 작성되었습니다)
🌐 무료로 작성하기: https://freezone-1061689217082.us-west1.run.app/`;
    
        navigator.clipboard.writeText(message).then(() => {
            alert("전송 멘트가 복사되었습니다! 카톡 채팅창에 붙여넣으세요.");
        });
    };

    const AnalysisItem: React.FC<{ title: string; description: string; isValid: boolean }> = ({ title, description, isValid }) => (
        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex-shrink-0 mt-0.5">
                {isValid ? (
                    <AnalysisValidIcon className="h-5 w-5 text-emerald-500" />
                ) : (
                    <AnalysisInvalidIcon className="h-5 w-5 text-rose-500" />
                )}
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            </div>
        </div>
    );
    
    // Updated: Analysis is now a Modal Content
    const AnalysisModalContent = () => {
        const checks = {
            parties: formData.clientName.trim() !== '' && formData.freelancerName.trim() !== '',
            scope: formData.task.trim() !== '' && formData.deliverables.length > 0 && formData.deliverables.every(d => d.trim() !== ''),
            payment: formData.projectValue > 0 && clauses.payment.trim() !== '',
            ip: clauses.ip.trim() !== '',
            expert: true, 
        };

        const allValid = Object.values(checks).every(Boolean);

        return (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full mx-4">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                         <div className="bg-white/20 p-2 rounded-lg">
                            <ShieldCheckIcon className="h-6 w-6 text-white" />
                         </div>
                         <div>
                            <h3 className="text-lg font-bold text-white">AI 계약서 신뢰도 분석</h3>
                            <p className="text-primary-100 text-xs">FreeZone AI Engine</p>
                         </div>
                    </div>
                    <button onClick={() => setShowAnalysisModal(false)} className="text-white/70 hover:text-white transition-colors">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        작성하신 계약서의 법적 안정성을 실시간으로 분석했습니다. <br/>
                        <span className="font-bold text-slate-800">분쟁 발생 위험도: {allValid ? '매우 낮음 (안전)' : '중간 (확인 필요)'}</span>
                    </p>

                    <div className="space-y-2">
                        <AnalysisItem isValid={checks.parties} title="핵심 당사자 명시" description="책임 소재가 명확한가요?" />
                        <AnalysisItem isValid={checks.scope} title="구체적인 과업 범위" description="추가 과업 방지가 가능한가요?" />
                        <AnalysisItem isValid={checks.payment} title="명확한 대금 지급 조건" description="미수금 위험이 관리되고 있나요?" />
                        <AnalysisItem isValid={checks.ip} title="저작권 귀속 명시" description="소유권 분쟁 가능성이 없나요?" />
                        <AnalysisItem isValid={checks.expert} title="업계 표준 준수" description="불공정 조항이 포함되지 않았나요?" />
                    </div>

                     {allValid ? (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-1">
                            <p className="font-bold text-emerald-700 text-sm">✨ 완벽한 보호 장치가 마련되었어요!</p>
                            <p className="text-xs text-emerald-600 leading-relaxed">
                                이 계약서는 당신의 권리를 강력하게 보호합니다.
                            </p>
                        </div>
                    ) : (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-center space-y-1">
                             <p className="font-bold text-rose-700 text-sm">⚠️ 일부 정보가 부족합니다</p>
                             <p className="text-xs text-rose-600 leading-relaxed">
                                빈칸이나 모호한 표현이 있으면 추후 분쟁의 소지가 있습니다. 이전 단계로 돌아가 내용을 보완하는 것을 추천합니다.
                             </p>
                        </div>
                    )}
                    
                    <button 
                        onClick={() => setShowAnalysisModal(false)}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
                    >
                        확인 완료 (계약서 보기)
                    </button>
                </div>
            </div>
        );
    };


  return (
    <div className="bg-slate-950 text-slate-300">
      {/* PDF Generation Overlay */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
            <h2 className="text-2xl font-bold text-slate-900">계약서 PDF 생성 중...</h2>
            <p className="text-slate-500 mt-2">잠시만 기다려주세요.</p>
        </div>
      )}

      {/* Analysis Modal Overlay */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
            <AnalysisModalContent />
        </div>
      )}

      <section ref={contractRef} className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-slate-950 to-slate-950"></div>
        <div className="absolute top-[-10rem] right-[-10rem] w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10rem] left-[-10rem] w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-6 sm:py-32 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
            가장 쉬운 계약서 작성
          </h1>
          <p className="mt-6 text-2xl font-bold text-primary-400 sm:text-3xl">혼자 일해도, 혼자 감당하진 않게.</p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300 sm:text-xl">
            구두 계약, 복잡한 서류는 이제 그만. <br /> 1분 만에 계약서를 만들고 당신의 권리를 지키세요.
          </p>
        </div>

        <div className="relative -mt-16 sm:-mt-24 pb-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto">
                {[1, 2, 3].map(s => (
                    <React.Fragment key={s}>
                        <div className="flex flex-col items-center z-10">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${step >= s ? 'bg-primary-500 border-primary-500 text-white' : 'bg-slate-200 border-slate-300 text-slate-500'}`}>
                                {step > s ? <CheckCircleIcon className="h-6 w-6" /> : s}
                            </div>
                            <p className={`mt-2 text-sm font-semibold ${step >= s ? 'text-primary-500' : 'text-slate-500'}`}>{['기본정보', '세부조항', '검토 및 완성'][s-1]}</p>
                        </div>
                        {s < 3 && <div className={`flex-1 h-1 mx-4 transition-colors duration-300 ${step > s ? 'bg-primary-500' : 'bg-slate-300'}`}></div>}
                    </React.Fragment>
                ))}
            </div>

            {step === 1 && (() => {
                const currentInfoField = infoFields[infoStep];
                return (
                    <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-2xl space-y-8 max-w-5xl mx-auto">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">기본 정보 입력 ({infoStep + 1}/{infoFields.length})</h2>
                            <p className="text-slate-600">{currentInfoField.description}</p>
                        </div>

                        {infoStep === 0 && (
                            <div className="space-y-8 pt-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                        <label htmlFor="industry" className="font-semibold text-slate-700">분야</label>
                                        <select id="industry" name="industry" value={formData.industry} onChange={handleFormChange} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                            <option value="" disabled>분야를 선택하세요</option>
                                            {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                        <label htmlFor="task" className="font-semibold text-slate-700">주요 과업</label>
                                        <select id="task" name="task" value={formData.task} onChange={handleFormChange} disabled={!formData.industry} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50">
                                            <option value="" disabled>주요 과업을 선택하세요</option>
                                            {TASK_OPTIONS[formData.industry]?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                        <label htmlFor="projectName" className="font-semibold text-slate-700">프로젝트명</label>
                                        <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleFormChange} placeholder="예: 2024년 브랜드 리뉴얼" className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {infoStep === 1 && (
                            <div className="space-y-8 pt-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                            <label htmlFor="clientName" className="font-semibold text-slate-700">의뢰인 (갑)</label>
                                            <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleFormChange} placeholder="클라이언트 이름 또는 회사명" className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                            <label htmlFor="freelancerName" className="font-semibold text-slate-700">작업자 (을)</label>
                                            <input type="text" id="freelancerName" name="freelancerName" value={formData.freelancerName} onChange={handleFormChange} placeholder="본인 이름 또는 활동명" className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-4">
                                        <label className="font-semibold text-slate-700">최종 산출물</label>
                                        {formData.deliverables.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input type="text" value={item} onChange={(e) => handleDeliverableChange(index, e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                                <button type="button" onClick={() => removeDeliverable(index)} className="p-2 text-slate-500 hover:text-rose-500"><XMarkIcon className="h-5 w-5"/></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={addDeliverable} className="text-sm font-semibold text-primary-600 hover:text-primary-500 flex items-center space-x-1 pt-2"><PlusIcon className="h-4 w-4"/><span>산출물 추가</span></button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {infoStep === 2 && (
                            <div className="space-y-8 pt-4">
                                <div>
                                    <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                        <label htmlFor="projectValue" className="font-semibold text-slate-700">총 계약 금액 (VAT 별도)</label>
                                        <div className="relative">
                                            <input type="text" id="projectValue" name="projectValue" value={formData.projectValue.toLocaleString('ko-KR')} onChange={handleFormChange} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 pl-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₩</span>
                                        </div>
                                        <p className="text-right text-sm text-slate-600">금 {numberToKoreanWon(formData.projectValue)} 원정</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                        <label htmlFor="contractDate" className="font-semibold text-slate-700">계약 체결일</label>
                                        <input type="date" id="contractDate" name="contractDate" value={formData.contractDate} onChange={handleFormChange} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-slate-50 p-4 rounded-md border border-slate-300 space-y-2">
                                        <label className="font-semibold text-slate-700">계약 기간</label>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleFormChange} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleFormChange} className={`w-full bg-white text-slate-900 border rounded-md p-3 transition-colors ${dateError ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-300 focus:ring-primary-500 focus:border-primary-500'}`} />
                                        </div>
                                        {dateError && <p className="text-sm text-rose-500 text-center pt-2">{dateError}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-4">
                            <button 
                                onClick={handlePrevInfoStep}
                                className={`inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-bold rounded-full text-slate-700 bg-white hover:bg-slate-100 transition-colors ${infoStep === 0 ? 'invisible' : 'visible'}`}>
                                이전
                            </button>
                            <button 
                                onClick={handleNextInfoStep}
                                disabled={(infoStep === 0 && !formData.task) || (infoStep === infoFields.length - 1 && !!dateError)}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full text-white bg-primary-600 hover:bg-primary-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                {infoStep === infoFields.length - 1 ? '다음: 세부 조항 작성' : '다음'}
                            </button>
                        </div>
                    </div>
                );
            })()}
            
            {step === 2 && (() => {
                const currentClauseField = clauseFields[clauseStep];
                const suggestions = (clauseGuidance as any)?.[currentClauseField.key] || [];

                return (
                    <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-2xl space-y-8 max-w-5xl mx-auto">
                        <div ref={clauseTitleRef}>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">세부 조항 선택 ({clauseStep + 1}/{clauseFields.length})</h2>
                            <p className="text-slate-600">분쟁을 막는 핵심 조항들을 꼼꼼하게 선택하고, 필요하다면 직접 수정하세요.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <div className="flex items-center space-x-2 text-lg font-semibold text-slate-900 mb-2">
                                {React.cloneElement(currentClauseField.icon, { className: "h-6 w-6 text-primary-500" })}
                                <span>{currentClauseField.title}</span>
                                <button type="button" onMouseEnter={() => setActiveClauseHelp(currentClauseField.key)} onMouseLeave={() => setActiveClauseHelp(null)} className="group relative">
                                    <QuestionMarkCircleIcon className="h-5 w-5 text-slate-500" />
                                    {activeClauseHelp === currentClauseField.key && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-slate-800 text-slate-100 text-xs rounded-lg p-3 z-10 shadow-lg border border-slate-600">
                                            {CLAUSE_TIPS[currentClauseField.key]}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
                                        </div>
                                    )}
                                </button>
                            </div>
                            
                             {currentClauseField.key === 'scope' ? (
                                <>
                                    <p className="text-sm text-slate-600 my-4">
                                        최종 산출물 외에, 어떤 작업을 수행할지 구체적으로 작성해주세요. '알아서 잘'은 분쟁의 씨앗이 될 수 있습니다.
                                    </p>
                                    <textarea
                                        id="scope"
                                        name="scope"
                                        value={clauses.scope}
                                        onChange={handleClauseChange}
                                        rows={6}
                                        placeholder={CLAUSE_PLACEHOLDERS.scope}
                                        className="w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </>
                            ) : (
                                <>
                                    {suggestions.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-sm font-semibold text-cyan-700 mb-2 flex items-center space-x-1.5">
                                                <LightBulbIcon className="h-4 w-4" />
                                                <span>유형별 추천 조항</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mb-4">
                                                아래 추천 조항 중 프로젝트에 가장 적합한 것을 선택하세요.
                                            </p>
                                            <div className="space-y-4">
                                                {suggestions.map((item: any, index: number) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => handleApplySuggestion(currentClauseField.key, item.suggestion)}
                                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out transform ${(clauses as any)[currentClauseField.key] === item.suggestion ? 'bg-primary-50 border-primary-500 scale-[1.01]' : 'bg-slate-100 border-slate-200 hover:border-slate-400'}`}
                                                    >
                                                        <h4 className="font-bold text-md text-slate-900">{item.title}</h4>
                                                        <div className="mt-2 p-3 bg-white rounded-md border border-slate-200">
                                                            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">{item.suggestion}</pre>
                                                        </div>
                                                        <div className="mt-3 p-3 bg-slate-100/70 rounded-md text-xs text-slate-600 border-l-4 border-slate-300">
                                                            <pre className="whitespace-pre-wrap font-sans">{item.rationale}</pre>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-cyan-700 mb-2 flex items-center space-x-1.5">
                                            <PencilSquareIcon className="h-4 w-4" />
                                            <span>내용 확인 및 직접 수정</span>
                                        </h3>
                                        <textarea
                                            id={currentClauseField.key}
                                            name={currentClauseField.key}
                                            value={(clauses as any)[currentClauseField.key]}
                                            onChange={handleClauseChange}
                                            rows={6}
                                            placeholder={CLAUSE_PLACEHOLDERS[currentClauseField.key]}
                                            className="mt-2 w-full bg-white text-slate-900 border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handlePrevClause} className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-bold rounded-full text-slate-700 bg-white hover:bg-slate-100 transition-colors">이전</button>
                            <button onClick={handleNextClause} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full text-white bg-primary-600 hover:bg-primary-500 transition-all transform hover:scale-105">
                                {clauseStep === clauseFields.length - 1 ? '다음: 계약서 검토' : '다음'}
                            </button>
                        </div>
                    </div>
                )
            })()}

            {step === 3 && (
                <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto">
                     <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">계약서 검토 및 완성</h2>
                            <p className="text-slate-600">최종 내용을 확인하고 계약을 완성하세요.</p>
                        </div>
                        <button 
                            onClick={() => setShowAnalysisModal(true)}
                            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-bold bg-primary-50 px-4 py-2 rounded-full transition-colors"
                        >
                            <ShieldCheckIcon className="h-5 w-5" />
                            <span>분석 리포트 다시 보기</span>
                        </button>
                    </div>
                    
                    <div className="mt-8">
                        <div className="relative">
                            <div className="p-8 bg-slate-50 border border-slate-200 rounded-lg max-h-[70vh] overflow-y-auto transition-all duration-300">
                                <pre id="contract-content" className="whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed">
                                    {generateContractText()}
                                </pre>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex flex-col items-center space-y-3 w-full max-w-lg mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            {/* Copy Text Button - Style Enhanced */}
                            <button onClick={handleCopy} className="flex-1 flex items-center justify-center px-6 py-3.5 border-2 border-slate-100 text-sm font-bold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 hover:border-slate-300 transition-all">
                                <DocumentDuplicateIcon className="h-5 w-5 mr-2 text-slate-600" />
                                텍스트만 복사
                            </button>
                            {/* PDF Button - Primary */}
                            <button onClick={handleDownloadPdf} className="flex-1 flex items-center justify-center px-6 py-3.5 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-500 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                                PDF로 저장하기
                            </button>
                        </div>

                        {/* Sending Helper Section - Yellow Theme & One-line layout */}
                        <div className="w-full bg-yellow-50 rounded-xl p-3 border border-yellow-200 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-lg">
                            <div className="text-center sm:text-left flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="text-sm font-bold text-slate-800 whitespace-nowrap">계약서를 보내시나요?</span>
                                <span className="text-xs text-slate-600 sm:truncate">파일만 덜렁 보내기 민망하다면 활용해보세요.</span>
                            </div>
                            <button 
                                onClick={handleCopyKakao} 
                                className="flex-shrink-0 flex items-center justify-center px-4 py-2 text-xs font-bold rounded-lg text-[#3c1e1e] bg-[#FEE500] hover:bg-[#FDD835] transition-all shadow-sm whitespace-nowrap"
                            >
                                <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4 mr-1.5" />
                                전송 멘트 복사
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-between">
                         <button onClick={handleBackToClauses} className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-bold rounded-full text-slate-700 bg-white hover:bg-slate-100 transition-colors">이전</button>
                    </div>
                </div>
            )}
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-20 sm:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">계약서 작성, 이렇게 쉬워요</h2>
            <p className="mt-4 text-lg text-slate-400">단 3단계로 복잡한 계약 과정을 끝내보세요.</p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-500/10 border-2 border-primary-500/30 text-primary-400">
                <DocumentTextIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-100">1. 정보 입력</h3>
              <p className="mt-2 text-slate-400">프로젝트 기본 정보를 입력하고 AI 추천 조항으로 똑똑하게 계약서를 채워요.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-500/10 border-2 border-primary-500/30 text-primary-400">
                <ScaleIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-100">2. 조항 선택</h3>
              <p className="mt-2 text-slate-400">업종별 표준 조항과 AI 추천 기능으로 빈틈없는 계약서를 완성하세요.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-500/10 border-2 border-primary-500/30 text-primary-400">
                <ArrowDownTrayIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-100">3. 간편 저장/전송</h3>
              <p className="mt-2 text-slate-400">본문 복사, PDF 저장 또는 카톡 멘트 복사로 즉시 활용하세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">당신의 시간을 아껴줄 강력한 기능</h2>
            <p className="mt-4 text-lg text-slate-400">FreeZone은 단순한 계약서 생성을 넘어, 프리랜서를 위한 다양한 보호 장치를 제공합니다.</p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex space-x-6">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500/10 text-cyan-400">
                <LightBulbIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">AI 추천 조항</h3>
                <p className="mt-1 text-slate-400">어떤 조항을 넣을지 막막한가요? 프로젝트 유형에 맞는 필수 조항을 AI가 추천해 드립니다.</p>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex space-x-6">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheckIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">실시간 신뢰도 분석</h3>
                <p className="mt-1 text-slate-400">혹시 불리한 조항은 없는지, AI가 계약서를 실시간으로 분석하여 분쟁 위험을 알려드립니다.</p>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex space-x-6">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-violet-500/10 text-violet-400">
                <DocumentDuplicateIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">다양한 업계 템플릿</h3>
                <p className="mt-1 text-slate-400">디자인, 개발부터 컨설팅까지. 검증된 다양한 업계 표준 템플릿을 제공합니다.</p>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex space-x-6">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-pink-500/10 text-pink-400">
                <ScaleIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">법적 안정성 확보</h3>
                <p className="mt-1 text-slate-400">표준화된 계약서 양식으로 구두 계약이나 불분명한 합의로 인한 법적 분쟁을 원천 차단합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-primary-600/20 to-cyan-600/20 p-10 rounded-2xl border border-primary-500/30">
              <h2 className="text-3xl font-extrabold text-slate-100">이제, 계약 때문에 불안해하지 마세요.</h2>
              <p className="mt-4 text-lg text-slate-300">
                FreeZone과 함께 당신의 소중한 시간과 노력을 지키고, <br/>일에만 온전히 집중하는 즐거움을 되찾으세요.
              </p>
              <div className="mt-8">
                  <button 
                    onClick={onGoToContract} 
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-bold rounded-full text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 transition-all transform hover:scale-105">
                      무료로 계약 시작하기
                  </button>
              </div>
            </div>
        </div>
      </section>
      
      {/* Contract Print Area - Hidden source for PDF generation */}
      <div id="contract-print-area" style={{ position: 'fixed', top: 0, left: '-10000px', width: '210mm', backgroundColor: 'white', zIndex: -1 }}>
           <div style={{ padding: '20mm', backgroundColor: 'white', color: 'black', fontFamily: 'Batang, serif', lineHeight: '1.6', wordBreak: 'keep-all' }}>
            <h1 style={{ textAlign: 'center', fontSize: '24pt', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid black', paddingBottom: '10px' }}>용역 계약서</h1>
            
            <p style={{ marginBottom: '20px' }}>본 계약은 아래의 당사자 간에 체결된다.</p>
            
            <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>의뢰인 (갑):</span>
                    <span>{formData.clientName || '(의뢰인 성함)'}</span>
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>작업자 (을):</span>
                    <span>{formData.freelancerName || '(작업자 성함)'}</span>
                 </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 1 조 (계약의 목적)</h2>
                    <p style={{ textAlign: 'justify' }}>
                        "을"은 "갑"의 의뢰에 따라 <strong>‘{formData.projectName || '(프로젝트명)'}’</strong> 프로젝트(이하 "본 용역")를 수행하고, "갑"은 이에 대한 보수를 지급하는 것을 목적으로 한다.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 2 조 (용역의 범위 및 내용)</h2>
                    <p style={{ marginBottom: '4px' }}>"을"이 수행할 용역의 범위는 다음 각 호와 같다.</p>
                    <ol style={{ listStyleType: 'decimal', marginLeft: '20px' }}>
                        <li style={{ marginBottom: '4px' }}><strong>주요 과업:</strong> {formData.task}</li>
                        <li style={{ marginBottom: '4px' }}><strong>최종 산출물:</strong>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginTop: '4px' }}>
                                {formData.deliverables.length > 0 ? formData.deliverables.map((d, i) => <li key={i}>{d}</li>) : <li>(산출물 없음)</li>}
                            </ul>
                        </li>
                        <li><strong>기타:</strong> <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}>{clauses.scope || '(내용 없음)'}</div></li>
                    </ol>
                </section>

                <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 3 조 (계약 기간)</h2>
                    <p>본 용역의 수행 기간은 <strong>{formData.startDate}</strong>부터 <strong>{formData.endDate}</strong>까지로 한다.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 4 조 (계약 금액 및 지급 방법)</h2>
                    <ol style={{ listStyleType: 'decimal', marginLeft: '20px' }}>
                        <li style={{ marginBottom: '4px' }}><strong>총 계약 금액:</strong> 일금 {numberToKoreanWon(formData.projectValue)} 원정 (₩{formData.projectValue.toLocaleString()}), 부가가치세 별도</li>
                        <li><strong>지급 방법:</strong>
                             <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px', padding: '8px', backgroundColor: '#f9fafb' }}>{clauses.payment || CLAUSE_PLACEHOLDERS.payment}</div>
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 5 조 (수정 및 검수)</h2>
                    <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{clauses.revisions || CLAUSE_PLACEHOLDERS.revisions}</div>
                </section>

                <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 6 조 (저작권 귀속)</h2>
                    <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{clauses.ip || CLAUSE_PLACEHOLDERS.ip}</div>
                </section>
                
                 <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 7 조 (피드백 및 소통)</h2>
                    <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{clauses.feedback || CLAUSE_PLACEHOLDERS.feedback}</div>
                </section>

                 <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 8 조 (계약의 해지)</h2>
                    <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{clauses.termination || CLAUSE_PLACEHOLDERS.termination}</div>
                </section>

                 <section>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>제 9 조 (비밀유지 의무 및 기타)</h2>
                    <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{clauses.review || CLAUSE_PLACEHOLDERS.review}</div>
                </section>
            </div>

            <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid black' }}>
                <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '14pt' }}>{getFormattedDate(formData.contractDate)}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: '20px', borderBottom: '1px solid #9ca3af', paddingBottom: '8px' }}>갑 (의뢰인)</h3>
                        <div style={{ marginBottom: '30px' }}>
                            <span style={{ fontSize: '10pt', color: '#6b7280' }}>성함/상호</span>
                            <p style={{ fontSize: '16pt', fontFamily: 'serif', marginTop: '4px' }}>{formData.clientName}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '4px' }}>
                            <span style={{ fontSize: '10pt', color: '#6b7280' }}>(서명 또는 인)</span>
                            <span style={{ height: '30px' }}></span>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: '20px', borderBottom: '1px solid #9ca3af', paddingBottom: '8px' }}>을 (작업자)</h3>
                        <div style={{ marginBottom: '30px' }}>
                            <span style={{ fontSize: '10pt', color: '#6b7280' }}>성함/상호</span>
                            <p style={{ fontSize: '16pt', fontFamily: 'serif', marginTop: '4px' }}>{formData.freelancerName}</p>
                        </div>
                         <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '4px' }}>
                            <span style={{ fontSize: '10pt', color: '#6b7280' }}>(서명 또는 인)</span>
                            <span style={{ height: '30px' }}></span>
                        </div>
                    </div>
                </div>
            </div>
            
             <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '9pt', color: '#9ca3af' }}>
                본 계약서는 FreeZone 서비스를 통해 작성되었습니다.
            </div>
      </div>
    </div>
  );
};
