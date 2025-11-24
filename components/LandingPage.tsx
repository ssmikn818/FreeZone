
import React, { useState, useEffect, useMemo, useCallback, RefObject, useRef } from 'react';
import { Tab } from '../types';
import PricingFeatures from './PricingFeatures';
import ProductFeatures from './ProductFeatures';
import FaqPage from './FaqPage';
import { CheckCircleIcon, ArrowLeftIcon, PrinterIcon, ClipboardIcon, ArrowDownTrayIcon, ChatBubbleOvalLeftEllipsisIcon, AnalysisValidIcon, AnalysisInvalidIcon, XMarkIcon, BellIcon, ShieldCheckIcon, ExclamationTriangleIcon, XCircleIcon } from './Icons';

interface LandingPageProps {
  contractRef: RefObject<HTMLDivElement>;
  onGoToContract: () => void;
  onSelectTab?: (tab: Tab) => void;
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
    scope: '어떤 작업을 수행해야 하는지 구체적으로 작성해주세요. 모호한 표현은 피하는 것이 좋습니다.',
    revisions: '무제한 수정은 프로젝트 종료를 어렵게 합니다. 횟수와 범위를 명확히 제한하세요.',
    payment: '금액뿐만 아니라 "언제" 지급하는지가 중요합니다. 선금/잔금 비율을 정하는 것을 추천합니다.',
    ip: '작업물의 주인은 누구일까요? 저작권 양도 여부와 포트폴리오 사용 권한을 체크하세요.',
    termination: '혹시 모를 상황에 대비해 계약 해지 조건과 환불 규정을 미리 정해두세요.',
    feedback: '피드백이 늦어지면 마감도 늦어집니다. 피드백 제공 기한을 정해두세요.',
    review: '프로젝트 비밀 유지나 상호 비방 금지 등 추가적으로 필요한 약속을 적어주세요.',
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

interface ClauseSuggestion {
    title: string;
    suggestion: string;
    problem: string;
    solution: string;
}

const getClauseGuidance = (projectValue: number, industry: string, task: string) => {
    const commonClauses = {
        termination: [
            {
                title: '책임 분배형: 귀책사유 기준',
                suggestion: '의뢰인의 단순 변심으로 계약 해지 시, 선금은 환불되지 않습니다.\n작업자의 귀책 사유로 계약 이행이 불가능할 경우, 선금 전액을 환불하고 총 계약금액의 20%를 손해배상금으로 지급합니다.',
                problem: '일방적인 계약 파기는 손해를 야기합니다.',
                solution: '귀책사유에 따른 책임 범위를 명확히 하여 부당한 파기를 방지합니다.',
            },
             {
                title: '진행률 정산형: 단계별 비용 정산',
                suggestion: '계약 해지 시점까지 진행된 작업량에 대해 상호 합의하여 정산합니다. (예: 착수 단계 30%, 중간 단계 70%) 단, 의뢰인 귀책 시 위약금 10%가 가산됩니다.',
                problem: '중도 해지 시 기여도 산정이 어렵습니다.',
                solution: '단계별 가치를 정해 정산 기준을 마련합니다.'
            },
        ],
        feedback: [
            {
                title: '소통 규칙형: 피드백 채널/기한 지정',
                suggestion: '각 단계별 결과물 공유 후 3 영업일 이내에 피드백을 제공합니다. 피드백은 지정된 채널(예: 이메일, 슬랙)로 일원화하여 전달하며, 구두 요청은 효력이 없습니다.',
                problem: '피드백 지연과 소통 분산은 일정 지연의 주범입니다.',
                solution: '기한과 채널을 고정하여 기록을 남기고 효율을 높입니다.'
            },
            {
                title: '책임 제한형: 피드백 미회신 시',
                suggestion: '작업자가 피드백을 요청하였으나 5 영업일 이상 회신이 없을 경우, 해당 단계는 승인된 것으로 간주하고 다음 단계 작업을 진행합니다.',
                problem: '무응답으로 인해 프로젝트가 무기한 지연될 수 있습니다.',
                solution: '자동 승인 조항을 통해 프로젝트 진행 속도를 확보합니다.'
            },
        ],
        review: [
            {
                title: '기본 보안형: 비밀유지 의무',
                suggestion: '양 당사자는 본 계약과 관련하여 알게 된 상대방의 영업상, 기술상 비밀을 제3자에게 누설해서는 안 되며, 이 의무는 계약 종료 후 3년간 유효합니다.',
                problem: '민감 정보 유출은 사업적 피해를 줍니다.',
                solution: '상호 신뢰와 자산 보호를 위한 필수 장치입니다.',
            },
            {
                title: '상호 존중형: 비방 금지',
                suggestion: '양 당사자는 계약 기간 및 종료 후에도 온/오프라인 상에서 상대방의 명예를 훼손하는 일체의 비방 행위를 하여서는 안 됩니다.',
                problem: '감정적 분쟁이 평판 저하로 이어질 수 있습니다.',
                solution: '최소한의 상호 존중 의무를 명시하여 평판을 보호합니다.'
            }
        ]
    };

    const paymentClauses = {
        standard: {
            title: '기본 분할형: 5:5 선금/잔금',
            suggestion: `총 계약금액: ${projectValue.toLocaleString()}원 (VAT 별도)\n- 선금(50%): 계약 체결 후 3일 이내 (${(projectValue * 0.5).toLocaleString()}원)\n- 잔금(50%): 최종 산출물 검수 완료 후 3일 이내 (${(projectValue * 0.5).toLocaleString()}원)`,
            problem: '한 번에 큰 금액을 주고받는 것은 양측 모두에게 부담입니다.',
            solution: '초기 착수금과 최종 완료금을 균형 있게 배분하여 리스크를 줄입니다.',
        },
        split343: {
            title: '안전 분할형: 30/40/30 분할',
            suggestion: `총 계약금액: ${projectValue.toLocaleString()}원 (VAT 별도)\n- 착수금(30%): 계약 체결 시\n- 중도금(40%): 중간 산출물 확인 시\n- 잔금(30%): 최종 완료 시`,
            problem: '기간이 긴 프로젝트는 현금 흐름이 막힐 수 있습니다.',
            solution: '중도금을 두어 안정적인 운영 자금을 확보합니다.',
        }
    };

    let industrySpecific: Record<string, ClauseSuggestion[]> = {};

    switch (industry) {
        case '디자인':
            industrySpecific = {
                revisions: [
                     { 
                         title: '횟수 지정형: 총 2회', 
                         suggestion: '최초 시안 확인 후 1회, 최종 시안 확정 후 1회로 총 2회의 수정을 무료로 제공합니다. 이를 초과하는 수정이나 컨셉 변경은 별도 비용이 발생합니다.', 
                         problem: '끝없는 수정 요구로 프로젝트가 끝나지 않습니다.',
                         solution: '명확한 횟수 제한으로 작업 범위를 확정합니다.' 
                     },
                     { 
                         title: '단계별 제한형', 
                         suggestion: '스케치 단계 2회, 채색 단계 1회 수정 가능하며, 이전 단계로 돌아가는 수정(회귀 수정)은 불가능합니다.', 
                         problem: '공정이 많이 진행된 후 처음부터 다시 하자는 요구가 발생합니다.',
                         solution: '단계별 확정(Sign-off) 절차를 통해 역진행을 방지합니다.' 
                     }
                ],
                ip: [
                    { 
                        title: '포트폴리오 사용형', 
                        suggestion: '최종 결과물의 저작권은 의뢰인에게 귀속되나, 작업자는 이를 포트폴리오 용도로 사용할 수 있습니다.', 
                        problem: '작업물을 포트폴리오로 쓸 수 없어 경력 증빙이 어렵습니다.',
                        solution: '저작권은 넘기되, 작가의 경력 홍보 권리를 확보합니다.' 
                    },
                    { 
                        title: '2차 저작권 별도', 
                        suggestion: '최종 결과물의 사용권은 의뢰인에게 있으나, 원본 파일의 수정 및 2차 저작물 작성권은 작업자에게 있습니다. (필요 시 별도 구매)', 
                        problem: '원본이 무분별하게 변형되어 원작자의 의도가 훼손될 수 있습니다.',
                        solution: '원본 변형을 막고 추가 수익 기회를 남겨둡니다.' 
                    }
                ]
            };
            break;
        case 'IT/개발':
            industrySpecific = {
                 revisions: [
                    { 
                        title: '하자보수 기간형', 
                        suggestion: '최종 산출물 인도 후 1개월간 발견된 버그 및 오류에 대해 무상 유지보수를 제공합니다. 단, 새로운 기능 추가나 기획 변경은 포함되지 않습니다.', 
                        problem: '완료 후에도 기능 추가 요청이 버그 수정으로 위장될 수 있습니다.',
                        solution: '오류 수정과 기능 추가를 명확히 구분합니다.' 
                    },
                    { 
                        title: '범위 엄수형 (CR)', 
                        suggestion: '기획서(요구사항 정의서)에 명시된 기능 외의 수정/추가 요청은 별도의 추가 계약(Change Request)을 통해 진행합니다.', 
                        problem: '개발 도중 요구사항이 계속 늘어나는 스코프 크립(Scope Creep) 현상.',
                        solution: '문서 기반 기준을 세워 추가 요청에 대한 정당한 대가를 요구합니다.' 
                    }
                ],
                ip: [
                    { 
                        title: '개발 산출물 양도', 
                        suggestion: '잔금 지급과 동시에 소스코드 및 산출물 일체의 권리는 의뢰인에게 귀속됩니다.', 
                        problem: '의뢰인은 개발 결과물에 대한 완전한 소유권을 원합니다.',
                        solution: '일반적인 SI/외주 개발의 표준인 턴키(Turn-key) 방식을 적용합니다.' 
                    },
                    { 
                        title: '솔루션 라이선스', 
                        suggestion: '결과물의 사용권은 의뢰인에게 영구 부여되나, 사용된 핵심 모듈 및 라이브러리의 지적재산권은 작업자에게 유보됩니다.', 
                        problem: '개발자의 핵심 기술(엔진, 프레임워크)까지 넘어갈 위험이 있습니다.',
                        solution: '결과물 사용권만 부여하여 핵심 기술 자산을 보호합니다.' 
                    }
                ]
            };
            break;
        case '영상/미디어':
             industrySpecific = {
                revisions: [
                    { 
                        title: '컷 편집/종편 구분형', 
                        suggestion: '가편집본(컷편집) 단계에서 1회, 종편(자막/효과) 단계에서 1회 수정을 진행합니다. 종편 단계에서 컷 편집 수정 시 추가 비용이 발생합니다.', 
                        problem: '렌더링 후 컷 편집 수정은 작업량이 큽니다.',
                        solution: '공정 단계별로 수정 가능한 범위를 제한합니다.' 
                    },
                    { 
                        title: '비율 기반 수정', 
                        suggestion: '전체 길이의 10% 이내 수정은 2회 무료이며, 전체 재편집이나 30% 이상의 수정은 신규 견적으로 처리합니다.', 
                        problem: '모호한 "약간 수정" 요청이 사실상 재작업인 경우가 많습니다.',
                        solution: '수정 범위를 수치화하여 과도한 요청을 방지합니다.' 
                    }
                ],
                ip: [
                    { 
                        title: '최종본 귀속형', 
                        suggestion: '최종 렌더링된 영상 파일의 저작권은 의뢰인에게 귀속됩니다. 프로젝트 원본(프로젝트 파일, 소스 등)은 제공되지 않습니다.', 
                        problem: '원본 프로젝트 파일(소스) 요구 시 노하우 유출 우려가 있습니다.',
                        solution: '결과물(영상)과 원본 소스를 분리하여 계약합니다.' 
                    },
                    { 
                        title: '초상권/사용처 제한', 
                        suggestion: '제작된 영상은 합의된 매체(예: 유튜브)에서만 사용 가능하며, TV광고 등 타 매체 확장 시 별도 협의가 필요합니다.', 
                        problem: '웹용으로 제작된 영상이 TV 광고 등에 무단 사용될 수 있습니다.',
                        solution: '사용 매체를 한정하여 모델료/저작권 이슈를 예방합니다.' 
                    }
                ]
            };
            break;
        case '글/콘텐츠':
             industrySpecific = {
                revisions: [
                    { 
                        title: '윤문/교정 중심형', 
                        suggestion: '초안 전달 후 내용의 사실관계 오류 및 윤문 수정 2회를 제공합니다. 전체적인 방향성이나 톤앤매너 변경은 재작업 비용이 청구됩니다.', 
                        problem: '단순 수정 요청이 글 전체를 다시 쓰는 재작업이 될 수 있습니다.',
                        solution: '오류 수정과 전면 재작업(Rewrite)을 명확히 구분합니다.' 
                    },
                    { 
                        title: '분량 기반형', 
                        suggestion: '전체 원고의 20% 분량 내 수정 2회를 제공합니다. 기획 방향 변경으로 인한 전면 수정은 불가합니다.', 
                        problem: '수정의 범위가 모호하여 분쟁이 발생합니다.',
                        solution: '수정 가능한 분량 비율을 정해 둡니다.' 
                    }
                ],
                ip: [
                    { 
                        title: '고스트라이팅(양도)', 
                        suggestion: '모든 저작권은 의뢰인에게 귀속되며, 작업자는 저작인격권(성명표시권)을 행사하지 않습니다.', 
                        problem: '마케팅 원고 등에서 작가 이름 노출을 꺼리는 경우가 있습니다.',
                        solution: '저작권을 완전히 양도하여 의뢰인의 자유로운 활용을 돕습니다.' 
                    },
                    { 
                        title: '바이라인 명시형', 
                        suggestion: '저작재산권은 의뢰인에게 있으나, 발행 시 작업자의 이름(Byline)을 명시해야 합니다.', 
                        problem: '기획 기사나 칼럼에서 작가의 크레딧이 누락될 수 있습니다.',
                        solution: '성명표시권을 명시하여 작가로서의 권리를 지킵니다.' 
                    }
                ]
            };
            break;
         case '마케팅':
             industrySpecific = {
                revisions: [
                    { 
                        title: '캠페인 최적화형', 
                        suggestion: '광고 세팅 후 2주간의 초기 최적화(소재 교체, 타겟팅 조정)를 지원합니다. 이후의 관리는 별도 운영 계약을 따릅니다.', 
                        problem: '마케팅은 일회성 수정보다 지속적인 관리가 필요합니다.',
                        solution: '초기 세팅과 지속적 운영 관리(Retainer)를 구분합니다.' 
                    },
                    { 
                        title: '사전 컨펌 필수', 
                        suggestion: '모든 콘텐츠 발행 전 의뢰인의 최종 승인을 득해야 하며, 승인된 콘텐츠 발행 후 발생한 문제에 대해 작업자는 책임지지 않습니다.', 
                        problem: '승인된 광고 문구로 인한 법적 문제가 발생할 수 있습니다.',
                        solution: '최종 승인 책임자를 의뢰인으로 지정하여 면책 조항을 둡니다.' 
                    }
                ],
                ip: [
                    { 
                        title: '데이터 소유권', 
                        suggestion: '광고 집행을 통해 축적된 데이터 및 계정 소유권은 의뢰인에게 귀속됩니다.', 
                        problem: '계약 종료 후 광고 계정과 데이터를 돌려받지 못하는 경우가 있습니다.',
                        solution: '계정과 데이터의 소유권을 의뢰인에게 명확히 귀속시킵니다.' 
                    },
                    { 
                        title: '소재 사용 제한', 
                        suggestion: '제작된 마케팅 소재는 계약 기간 동안 해당 캠페인에만 사용 가능하며, 외부 배포나 상업적 재판매는 금지됩니다.', 
                        problem: '계약 종료 후에도 제작한 소재를 무단으로 계속 사용할 수 있습니다.',
                        solution: '소재의 사용 기간과 범위를 계약 기간 내로 한정합니다.' 
                    }
                ]
            };
            break;
         case '번역':
             industrySpecific = {
                revisions: [
                    { 
                        title: '오역 수정 무제한', 
                        suggestion: '명백한 오역이나 누락에 대해서는 기간/횟수 제한 없이 무상 수정을 제공합니다. 단, 단순 표현(스타일) 선호에 따른 수정은 1회로 제한합니다.', 
                        problem: '단순 취향 차이로 인한 수정 요청이 반복될 수 있습니다.',
                        solution: '오역(품질 문제)과 선호(취향 문제)를 구분하여 대응합니다.' 
                    },
                    { 
                        title: '용어집 기반', 
                        suggestion: '사전에 합의된 용어집(Glossary)을 기준으로 작업하며, 용어집 미준수에 대한 수정은 무제한 제공합니다.', 
                        problem: '전문 용어 통일이 안 되어 품질 저하가 발생합니다.',
                        solution: '합의된 용어집을 기준으로 삼아 수정 책임을 명확히 합니다.' 
                    }
                ],
                ip: [
                    { 
                        title: '납품형 양도', 
                        suggestion: '번역 결과물의 저작권은 잔금 지급 시 의뢰인에게 양도됩니다.', 
                        problem: '번역물의 2차 활용 권한이 불분명할 수 있습니다.',
                        solution: '잔금 지급을 조건으로 저작권을 깔끔하게 넘깁니다.' 
                    },
                    {
                        title: '2차적 저작물 작성권',
                        suggestion: '번역물에 대한 저작권은 의뢰인에게 있으나, 이를 바탕으로 한 2차적 저작물 작성권(출판 등)은 별도 합의합니다.',
                        problem: '단순 번역 의뢰가 출판권까지 포함하는 것으로 오해될 수 있습니다.',
                        solution: '용역 범위와 출판 권리를 분리합니다.'
                    }
                ]
            };
            break;
          case '컨설팅/교육':
             industrySpecific = {
                revisions: [
                    { 
                        title: '질의응답 포함형', 
                        suggestion: '최종 보고서 전달 후 1회의 수정 보완 및 1시간의 Q&A 세션을 제공합니다. 추가 자문은 시간당 비용이 청구됩니다.', 
                        problem: '보고서 납품 후에도 무제한 자문 요청이 들어올 수 있습니다.',
                        solution: '후속 지원 범위를 시간 단위나 횟수로 제한합니다.' 
                    },
                    {
                        title: '범위 한정형',
                        suggestion: '수정은 오탈자 및 사실관계 오류 정정에 한하며, 새로운 분석이나 리서치 추가는 별도 계약으로 진행합니다.',
                        problem: '단순 수정을 넘어 새로운 리서치를 요구하는 경우가 있습니다.',
                        solution: '수정의 범위가 모호하여 기존 산출물 내 오류 정정으로 한정합니다.'
                    }
                ],
                 ip: [
                    { 
                        title: '자료 사용권 (비독점)', 
                        suggestion: '제공된 교육 자료 및 보고서는 의뢰인 내부 목적으로만 사용 가능하며, 외부 배포나 상업적 재판매는 금지됩니다.', 
                        problem: '컨설팅 자료가 경쟁사나 외부에 유출될 수 있습니다.',
                        solution: '사용 범위를 내부용으로 제한하여 지적 자산을 보호합니다.' 
                    },
                    {
                        title: '방법론 소유권',
                        suggestion: '산출물은 의뢰인에게 귀속되나, 산출물을 만드는 데 사용된 작업자의 고유한 방법론, 프레임워크 등에 대한 권리는 작업자에게 있습니다.',
                        problem: '컨설턴트의 핵심 노하우(방법론)까지 뺏길 수 있습니다.',
                        solution: '결과물과 도구(방법론)의 권리를 분리합니다.'
                    }
                ]
            };
            break;
        default:
             industrySpecific = {
                 revisions: [
                     { title: '기본 수정형', suggestion: '최종 산출물 전달 후 2회 무료 수정을 제공합니다.', problem: '수정 횟수 제한이 없으면 프로젝트가 끝나지 않습니다.', solution: '표준적인 2회 수정으로 마무리를 유도합니다.' },
                     { title: '추가 수정 유료화', suggestion: '기본 2회 수정 후 추가 수정 시 건당 비용이 발생합니다.', problem: '수정 요청이 남발될 수 있습니다.', solution: '추가 업무에 대한 비용을 명시합니다.' }
                ],
                 ip: [
                     { title: '저작권 양도', suggestion: '잔금 지급 시 저작권은 의뢰인에게 귀속됩니다.', problem: '저작권 귀속 시점이 불분명하면 잔금을 못 받을 수 있습니다.', solution: '잔금 지급 완료 시점을 권리 이전 시점으로 못 박습니다.' },
                     { title: '포트폴리오 사용', suggestion: '저작권은 양도하되, 포트폴리오 사용권은 작업자가 가집니다.', problem: '경력 증빙이 어려울 수 있습니다.', solution: '작업자의 홍보 권리를 확보합니다.' }
                ]
             };
            break;
    }

    return {
        ...commonClauses,
        payment: [paymentClauses.standard, paymentClauses.split343],
        ...industrySpecific
    };
};

export const LandingPage: React.FC<LandingPageProps> = ({ contractRef, onGoToContract, onSelectTab }) => {
    const [step, setStep] = useState(1);
    const [infoStep, setInfoStep] = useState(0);
    const [clauseStep, setClauseStep] = useState(0);
    const [showAnalysisModal, setShowAnalysisModal] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [isNotified, setIsNotified] = useState(false);

    const [formData, setFormData] = useState({
        clientName: '',
        clientContact: '',
        clientAddress: '',
        freelancerName: '',
        freelancerContact: '',
        freelancerAddress: '',
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
    const [dateError, setDateError] = useState('');
    const clauseTitleRef = useRef<HTMLDivElement>(null);

    const clauseGuidance = useMemo(() => getClauseGuidance(formData.projectValue, formData.industry, formData.task), [formData.projectValue, formData.industry, formData.task]);
    
    // Check validation result
    const analysisResult = useMemo(() => {
        const checks = [
            {
                id: 'parties',
                label: '핵심 당사자 명시',
                desc: '책임 소재가 명확한가요?',
                isValid: !!(formData.clientName.trim() && formData.freelancerName.trim())
            },
            {
                id: 'scope',
                label: '구체적인 과업 범위',
                desc: '추가 과업 방지가 가능한가요?',
                isValid: !!(formData.task && formData.deliverables.length > 0 && clauses.scope.trim().length > 10)
            },
            {
                id: 'payment',
                label: '명확한 대금 지급 조건',
                desc: '미수금 위험이 관리되고 있나요?',
                isValid: !!(formData.projectValue > 0 && clauses.payment.trim().length > 10)
            },
            {
                id: 'ip',
                label: '저작권 귀속 명시',
                desc: '소유권 분쟁 가능성이 없나요?',
                isValid: !!(clauses.ip.trim().length > 10)
            },
            {
                id: 'standard',
                label: '업계 표준 준수',
                desc: '불공정 조항이 포함되지 않았나요?',
                isValid: true // Template based, assume true
            }
        ];
        
        const validCount = checks.filter(c => c.isValid).length;
        const total = checks.length;
        const isRisk = validCount < total;
        
        return { checks, isRisk, validCount, total };
    }, [formData, clauses]);

    const infoFields = useMemo(() => [
        { key: 'definition', title: '프로젝트 정의', description: '가장 중요한 프로젝트 종류를 먼저 선택해주세요.' },
        { key: 'parties', title: '계약 당사자 및 산출물', description: '누가 무엇을 전달해야 하는지 명확히 해요.' },
        { key: 'schedule', title: '일정 및 대금', description: '언제까지, 얼마에 진행하는지 명확히 정의해요.' },
    ], []);

    const clauseFields = useMemo(() => [
        { key: 'scope', title: '작업의 범위와 내용' },
        { key: 'revisions', title: '수정 횟수 및 범위' },
        { key: 'payment', title: '대금 지급 방식' },
        { key: 'ip', title: '저작권 귀속 및 활용' },
        { key: 'termination', title: '계약의 중도 해지' },
        { key: 'feedback', title: '피드백 및 소통 방식' },
        { key: 'review', title: '기타 특약사항 (비밀유지 등)' }
    ], []);

    useEffect(() => {
        if (step === 2 && clauseTitleRef.current) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight + 24 : 96;
            const y = clauseTitleRef.current.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
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

    const handleNotify = () => {
        setIsNotified(true);
        setTimeout(() => setIsNotified(false), 3000);
        alert("사전 알림이 신청되었습니다! 안전 기능이 출시되면 가장 먼저 알려드릴게요.");
    };
    
    const generateContractText = useCallback(() => {
        const formattedDate = getFormattedDate(formData.contractDate);

        return `
용역 계약서

의뢰인 "${formData.clientName || '(의뢰인)'}"(이하 "갑")과 작업자 "${formData.freelancerName || '(작업자)'}"(이하 "을")은 상호 신뢰를 바탕으로 다음과 같이 용역 계약을 체결한다.

제 1 조 (목적)
본 계약은 "갑"이 의뢰한 '${formData.projectName || '(프로젝트명)'}'(이하 "본 용역")을 "을"이 수행하고, "갑"이 이에 대한 대가를 지급함에 있어 필요한 제반 사항을 규정함을 목적으로 한다.

제 2 조 (용역의 범위 및 내용)
"을"이 수행할 용역의 범위는 다음 각 호와 같다.
1. 주요 과업: ${formData.task}
2. 최종 산출물:
${formData.deliverables.map(d => `   - ${d}`).join('\n')}
3. 상세 내용:
${clauses.scope || '(상호 협의 하에 정한 구체적인 작업 내용)'}

제 3 조 (계약 기간)
본 용역의 수행 기간은 ${getFormattedDate(formData.startDate)}부터 ${getFormattedDate(formData.endDate)}까지로 한다.

제 4 조 (계약 금액 및 지급 방법)
1. 총 계약 금액: 일금 ${numberToKoreanWon(formData.projectValue)} 원정 (₩${formData.projectValue.toLocaleString('ko-KR')}), 부가가치세 별도
2. 지급 방법:
${clauses.payment || CLAUSE_PLACEHOLDERS.payment}

제 5 조 (수정 및 검수)
${clauses.revisions || CLAUSE_PLACEHOLDERS.revisions}

제 6 조 (지식재산권의 귀속)
${clauses.ip || CLAUSE_PLACEHOLDERS.ip}

제 7 조 (상호 협조 및 소통)
${clauses.feedback || CLAUSE_PLACEHOLDERS.feedback}

제 8 조 (계약의 해지)
${clauses.termination || CLAUSE_PLACEHOLDERS.termination}

제 9 조 (비밀유지)
${clauses.review || CLAUSE_PLACEHOLDERS.review}

제 10 조 (분쟁의 해결)
본 계약과 관련하여 분쟁이 발생한 경우 당사자 간의 합의에 의해 해결함을 원칙으로 하며, 합의가 이루어지지 않을 경우 "갑"의 소재지를 관할하는 법원을 전속 관할 법원으로 한다.

제 11 조 (기타)
본 계약에 명시되지 않은 사항은 상관례 및 관계 법령에 따른다.

본 계약의 성립을 증명하기 위하여 계약서 2부를 작성하여 "갑"과 "을"이 기명날인 후 각각 1부씩 보관한다.

${formattedDate}

[의뢰인 (갑)]
성명/상호: ${formData.clientName || '________________'} (서명/인)
연락처: ${formData.clientContact ? formData.clientContact : ' '}
주소: ${formData.clientAddress ? formData.clientAddress : ' '}

[작업자 (을)]
성명/상호: ${formData.freelancerName || '________________'} (서명/인)
연락처: ${formData.freelancerContact ? formData.freelancerContact : ' '}
주소: ${formData.freelancerAddress ? formData.freelancerAddress : ' '}
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
        // 1. Safety Check: Ensure the element exists
        const originalElement = document.getElementById('contract-print-area');
        if (!originalElement) {
            alert("⚠️ 오류: 'contract-print-area' ID를 가진 태그를 찾을 수 없습니다. HTML 코드를 확인해주세요.");
            return;
        }

        setIsGeneratingPdf(true);

        // 2. Create Overlay (The "Visible White Screen" Strategy)
        // This container covers the entire viewport, forcing a white background and blocking user interaction.
        const wrapper = document.createElement('div');
        wrapper.style.position = 'fixed';
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.width = '100vw';
        wrapper.style.height = '100vh';
        wrapper.style.zIndex = '99999';
        wrapper.style.backgroundColor = '#ffffff';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.overflow = 'auto'; // Allow scrolling if content overflows

        
        // 3. Clone content
        const clone = originalElement.cloneNode(true) as HTMLElement;

        // 4. Force Print Styles on Clone (Strict A4 Simulation)
        clone.style.width = '210mm'; // Exact A4 width
        clone.style.minHeight = '297mm'; // A4 Height
        // Change: Remove vertical padding from clone, let PDF margin handle top/bottom spacing
        clone.style.padding = '0mm 20mm'; 
        clone.style.boxSizing = 'border-box'; // Ensure padding is included in width
        clone.style.backgroundColor = '#ffffff';
        clone.style.color = '#000000';
        clone.style.boxShadow = 'none';
        clone.style.border = 'none';
        clone.style.margin = '0 auto';

        // Force text color on ALL children recursively to override Dark Mode CSS
        const allElements = clone.querySelectorAll('*');
        allElements.forEach((el) => {
            const e = el as HTMLElement;
            // PRESERVE GRAY TEXT for signature placeholders
            if (e.classList.contains('text-gray-300')) {
                 e.style.color = '#d1d5db !important'; // Force light gray (Tailwind gray-300)
            } else {
                 e.style.color = '#000000';
            }
            
            e.style.backgroundColor = 'transparent';
             // Fix borders if they exist
            if (getComputedStyle(e).borderColor !== 'rgba(0, 0, 0, 0)') {
                 e.style.borderColor = '#000000';
            }
        });
        
        // Specific fix for the header border
         const header = clone.querySelector('h1');
         if(header) {
             header.style.borderBottom = '2px solid #000000';
             header.style.color = '#000000';
         }

        // Append clone to wrapper, and wrapper to body
        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        // 5. Wait for Render (Critical Step)
        // We allow the browser 500ms to paint the new DOM elements before capturing.
        setTimeout(() => {
            const safeProjectName = formData.projectName.trim().replace(/[^a-zA-Z0-9가-힣\s]/g, '') || '프로젝트';
            const filename = `${safeProjectName}_용역계약서.pdf`;

            const opt = {
                margin: [15, 0, 15, 0], // Top, Left, Bottom, Right (mm) - Adds whitespace at page breaks
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    logging: false, 
                    useCORS: true,
                    scrollX: 0, // CRITICAL: Reset scroll offset to capture from top-left
                    scrollY: 0, // CRITICAL: Reset scroll offset to capture from top-left
                    windowWidth: document.body.scrollWidth, // Ensure capture context is wide enough
                    backgroundColor: '#ffffff'
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // @ts-ignore
            html2pdf().set(opt).from(clone).save()
            .then(() => {
                // Success: Remove wrapper
                document.body.removeChild(wrapper);
                setIsGeneratingPdf(false);
            })
            .catch((err: any) => {
                console.error("PDF Generation Error:", err);
                alert('PDF 생성 중 오류가 발생했습니다: ' + err.message);
                // Error: Remove wrapper
                if (document.body.contains(wrapper)) {
                    document.body.removeChild(wrapper);
                }
                setIsGeneratingPdf(false);
            });
        }, 500); // 0.5s delay
    };

    // Render Logic for Steps
    const renderInfoStep = () => {
        return (
            <div className="space-y-6 animate-fadeIn">
                 {infoStep === 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-100 flex items-center">
                            <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                            어떤 프로젝트인가요?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">프로젝트명</label>
                                <input 
                                    type="text" name="projectName" value={formData.projectName} onChange={handleFormChange}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="예: 반응형 웹사이트 구축"
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">계약 체결일</label>
                                <input 
                                    type="date" name="contractDate" value={formData.contractDate} onChange={handleFormChange}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">업종(카테고리)</label>
                                <select 
                                    name="industry" value={formData.industry} onChange={handleFormChange}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    <option value="">선택해주세요</option>
                                    {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                            {formData.industry && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">주요 과업</label>
                                    <select 
                                        name="task" value={formData.task} onChange={handleFormChange}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500 outline-none"
                                    >
                                        <option value="">선택해주세요</option>
                                        {TASK_OPTIONS[formData.industry]?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {infoStep === 1 && (
                     <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-100 flex items-center">
                            <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                            누가 계약하나요?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                <h4 className="font-semibold text-primary-400 mb-4">의뢰인 (Client)</h4>
                                <div className="space-y-3">
                                    <input type="text" name="clientName" placeholder="상호명 또는 성함" value={formData.clientName} onChange={handleFormChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-1 focus:ring-primary-500 outline-none"/>
                                    
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">연락처 (선택사항)</label>
                                        <input type="text" name="clientContact" placeholder="미입력 시 공란으로 표시됩니다" value={formData.clientContact} onChange={handleFormChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-1 focus:ring-primary-500 outline-none placeholder-slate-600"/>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">주소 (선택사항)</label>
                                        <input type="text" name="clientAddress" placeholder="미입력 시 공란으로 표시됩니다" value={formData.clientAddress} onChange={handleFormChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-1 focus:ring-primary-500 outline-none placeholder-slate-600"/>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                <h4 className="font-semibold text-primary-400 mb-4">작업자 (Freelancer)</h4>
                                <div className="space-y-3">
                                    <input type="text" name="freelancerName" placeholder="상호명 또는 성함" value={formData.freelancerName} onChange={handleFormChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-1 focus:ring-primary-500 outline-none"/>
                                    
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">연락처 (선택사항)</label>
                                        <input type="text" name="freelancerContact" placeholder="미입력 시 공란으로 표시됩니다" value={formData.freelancerContact} onChange={handleFormChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-1 focus:ring-primary-500 outline-none placeholder-slate-600"/>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">주소 (선택사항)</label>
                                        <input type="text" name="freelancerAddress" placeholder="미입력 시 공란으로 표시됩니다" value={formData.freelancerAddress} onChange={handleFormChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-1 focus:ring-primary-500 outline-none placeholder-slate-600"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-slate-400">최종 산출물 (결과물)</label>
                                {formData.deliverables.length === 0 && (
                                    <span className="text-xs text-primary-400">💡 팁: 주요 과업 선택 시 추천 예시가 자동 입력됩니다.</span>
                                )}
                            </div>
                            <div className="space-y-2">
                                {formData.deliverables.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input 
                                            type="text" value={item} onChange={(e) => handleDeliverableChange(idx, e.target.value)}
                                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-1 focus:ring-primary-500 outline-none"
                                            placeholder="예: 원본 파일, 완료 보고서 등"
                                        />
                                        <button onClick={() => removeDeliverable(idx)} className="text-red-400 hover:text-red-300 px-2">
                                            <XMarkIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ))}
                                <button onClick={addDeliverable} className="text-sm text-primary-400 font-medium hover:text-primary-300 flex items-center mt-2">
                                    + 산출물 직접 추가하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {infoStep === 2 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-100 flex items-center">
                            <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                            일정과 금액은 어떻게 되나요?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">시작일</label>
                                <input 
                                    type="date" name="startDate" value={formData.startDate} onChange={handleFormChange}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">종료일</label>
                                <input 
                                    type="date" name="endDate" value={formData.endDate} onChange={handleFormChange}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                        </div>
                        {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">총 계약 금액 (VAT 별도)</label>
                            <div className="relative">
                                <input 
                                    type="text" name="projectValue" 
                                    value={formData.projectValue.toLocaleString()} 
                                    onChange={handleFormChange}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500 outline-none pr-12 font-mono text-lg"
                                />
                                <span className="absolute right-4 top-3.5 text-slate-500 font-bold">KRW</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-right">
                                {numberToKoreanWon(formData.projectValue)} 원
                            </p>
                        </div>
                    </div>
                )}
                
                <div className="flex justify-between pt-6 border-t border-slate-800">
                    <button 
                        onClick={handlePrevInfoStep} disabled={infoStep === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${infoStep === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                        이전
                    </button>
                    <button 
                        onClick={handleNextInfoStep}
                        className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary-900/20 transition-all transform hover:scale-105"
                    >
                        {infoStep === infoFields.length - 1 ? '다음: 조항 검토하기' : '다음'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-950 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-950 pt-16 sm:pt-24 pb-12 text-center">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-6">
                    <div className="inline-flex items-center space-x-2 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-full px-4 py-1.5 mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">Beta: 무료로 계약서 생성 중</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-violet-400">1분 만에 끝내는</span><br/>
                        안전한 프리랜서 계약
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        법률 용어 몰라도 괜찮아요. 업종별 표준 템플릿과 AI 조항 추천으로 <br className="hidden sm:block"/>
                        가장 빠르고 완벽한 용역 계약서를 만들어보세요.
                    </p>
                     <button onClick={() => {
                            contractRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }} className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105">
                        지금 계약서 만들기
                    </button>
                </div>
            </div>

            {/* Main Tool Container */}
            <div ref={contractRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                    {/* Progress Bar */}
                    <div className="flex border-b border-slate-800">
                         {[1, 2, 3].map((s) => (
                            <div key={s} className={`flex-1 py-4 text-center text-sm font-medium transition-colors relative ${step === s ? 'text-primary-400' : step > s ? 'text-slate-300' : 'text-slate-600'}`}>
                                <div className="flex items-center justify-center space-x-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${step === s ? 'border-primary-400 bg-primary-400/10' : step > s ? 'border-slate-500 bg-slate-800' : 'border-slate-700 bg-slate-800'}`}>
                                        {step > s ? <CheckCircleIcon className="w-4 h-4" /> : s}
                                    </div>
                                    <span>{s === 1 ? '정보 입력' : s === 2 ? '조항 검토' : '완료 및 다운로드'}</span>
                                </div>
                                {step === s && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400"></div>}
                            </div>
                        ))}
                    </div>

                    <div className="p-6 sm:p-10">
                        {step === 1 && renderInfoStep()}

                        {step === 2 && (
                            <div className="space-y-8 animate-fadeIn" ref={clauseTitleRef}>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-slate-100">계약서의 핵심 조항을 확인하세요</h3>
                                    <p className="text-slate-400 mt-2">선택한 업종({formData.industry})에 딱 맞는 조항을 추천해드렸어요.</p>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                    {/* Sidebar Navigation - Fixed width on desktop */}
                                    <div className="lg:w-72 flex-shrink-0 space-y-2">
                                        {clauseFields.map((field, idx) => (
                                            <button
                                                key={field.key}
                                                onClick={() => setClauseStep(idx)}
                                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all ${
                                                    clauseStep === idx 
                                                    ? 'bg-primary-900/30 text-primary-400 border border-primary-500/30' 
                                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                                }`}
                                            >
                                                {/* Simplified Icon: Number Badge */}
                                                <div className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold border transition-colors ${
                                                     clauseStep === idx 
                                                     ? 'border-primary-400 bg-primary-400/20' 
                                                     : 'border-slate-600 bg-slate-800'
                                                }`}>
                                                    {idx + 1}
                                                </div>
                                                <span className="font-medium text-sm whitespace-nowrap">{field.title}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-6 relative min-h-[400px]">
                                        <div className="mb-6 flex items-center justify-between">
                                            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                    {clauseStep + 1}
                                                </span>
                                                {clauseFields[clauseStep].title}
                                            </h4>
                                        </div>

                                        {/* Help/Tip Box - Always Visible */}
                                        {CLAUSE_TIPS[clauseFields[clauseStep].key] && (
                                            <div className="mb-4 bg-primary-900/20 border border-primary-500/30 rounded-lg p-4 animate-fadeIn">
                                                <p className="text-sm text-primary-300 font-medium mb-1 flex items-center gap-2">
                                                    <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4"/>
                                                    작성 팁
                                                </p>
                                                <p className="text-sm text-slate-300 pl-6">{CLAUSE_TIPS[clauseFields[clauseStep].key]}</p>
                                            </div>
                                        )}

                                        <textarea
                                            name={clauseFields[clauseStep].key}
                                            value={(clauses as any)[clauseFields[clauseStep].key]}
                                            onChange={handleClauseChange}
                                            className="w-full h-48 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-100 focus:ring-2 focus:ring-primary-500 outline-none leading-relaxed resize-none"
                                            placeholder={CLAUSE_PLACEHOLDERS[clauseFields[clauseStep].key]}
                                        />

                                        {/* Recommendations */}
                                        <div className="mt-6">
                                            {((clauseGuidance as any)[clauseFields[clauseStep].key] || []).length > 0 && (
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">추천 조항 (클릭하여 적용)</p>
                                            )}
                                            <div className="space-y-4">
                                                {((clauseGuidance as any)[clauseFields[clauseStep].key] || []).map((item: ClauseSuggestion, i: number) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleApplySuggestion(clauseFields[clauseStep].key, item.suggestion)}
                                                        className="w-full text-left bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-primary-500 transition-all group shadow-sm hover:shadow-md"
                                                    >
                                                        {/* Header */}
                                                        <div className="px-4 py-3 border-b border-slate-700/50 bg-slate-800/80">
                                                            <div className="flex items-center">
                                                                <span className="text-sm font-bold text-primary-400">{item.title}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Body */}
                                                        <div className="p-4 space-y-4">
                                                            {/* Clause Text */}
                                                            <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                                                                {item.suggestion}
                                                            </p>

                                                            {/* Context Box: Problem & Solution */}
                                                            <div className="flex flex-col sm:flex-row gap-3 text-xs bg-slate-700/30 rounded-lg p-3">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center text-orange-300 font-bold mb-1">
                                                                        <span className="mr-1">🤔</span> 문제점
                                                                    </div>
                                                                    <p className="text-slate-400 leading-snug">{item.problem}</p>
                                                                </div>
                                                                <div className="hidden sm:block w-px bg-slate-600/50"></div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center text-emerald-300 font-bold mb-1">
                                                                        <span className="mr-1">💡</span> 해결책
                                                                    </div>
                                                                    <p className="text-slate-400 leading-snug">{item.solution}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between pt-6 border-t border-slate-800">
                                    <button onClick={handlePrevClause} className="text-slate-400 hover:text-white px-4 py-2">이전</button>
                                    <button 
                                        onClick={handleNextClause}
                                        className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary-900/20 transition-all transform hover:scale-105"
                                    >
                                        {clauseStep === clauseFields.length - 1 ? '계약서 완성하기' : '다음 조항'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fadeIn">
                                 <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                                            <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
                                            계약서가 완성되었습니다!
                                        </h3>
                                        <p className="text-slate-400 mt-1">내용을 확인하고 PDF로 저장하거나 복사하세요.</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button onClick={handleCopy} className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">
                                            <ClipboardIcon className="w-5 h-5" />
                                            <span>복사</span>
                                        </button>
                                        <button 
                                            onClick={handleDownloadPdf} 
                                            disabled={isGeneratingPdf}
                                            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors shadow-lg shadow-primary-900/20"
                                        >
                                            {isGeneratingPdf ? (
                                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                            ) : (
                                                <ArrowDownTrayIcon className="w-5 h-5" />
                                            )}
                                            <span>PDF 저장</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Preview Area (Wider Screen View) */}
                                <div className="bg-slate-200 p-4 md:p-8 rounded-xl overflow-hidden overflow-x-auto">
                                    <div 
                                        id="contract-print-area" 
                                        className="bg-white text-black p-12 md:p-16 shadow-sm w-full max-w-5xl mx-auto min-h-[800px] text-[11pt] leading-relaxed relative"
                                    >
                                        <h1 className="text-3xl font-bold text-center mb-12 border-b-2 border-black pb-6">용역 계약서</h1>
                                        
                                        {/* Consolidated Preamble */}
                                        <div className="text-left mb-8 leading-relaxed">
                                            <p>
                                                의뢰인 <span className="font-bold text-black">{formData.clientName || '________________'}</span>(이하 "갑")과
                                                작업자 <span className="font-bold text-black">{formData.freelancerName || '________________'}</span>(이하 "을")은
                                                상호 신뢰를 바탕으로 다음과 같이 용역 계약을 체결한다.
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 1 조 (목적)</h3>
                                                <p className="text-justify">
                                                    본 계약은 "갑"이 의뢰한 '<span className="text-black">{formData.projectName || '(프로젝트명)'}</span>'(이하 "본 용역")을 "을"이 수행하고, "갑"이 이에 대한 대가를 지급함에 있어 필요한 제반 사항을 규정함을 목적으로 한다.
                                                </p>
                                            </div>

                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 2 조 (용역의 범위 및 내용)</h3>
                                                <p>"을"이 수행할 용역의 범위는 다음 각 호와 같다.</p>
                                                <ol className="list-decimal list-inside mt-2 space-y-1 ml-2">
                                                    <li>주요 과업: <span className="text-black">{formData.task}</span></li>
                                                    <li>최종 산출물:
                                                        {/* Standard List Style */}
                                                        <ul className="list-disc list-inside mt-1 space-y-1 ml-4">
                                                            {formData.deliverables.map((d, i) => (
                                                                <li key={i} className="text-black">
                                                                    {d}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                    <li>상세 내용: <br/><span className="whitespace-pre-wrap text-black block mt-1">{clauses.scope}</span></li>
                                                </ol>
                                            </div>

                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 3 조 (계약 기간)</h3>
                                                <p>본 용역의 수행 기간은 <span className="text-black">{getFormattedDate(formData.startDate)}</span>부터 <span className="text-black">{getFormattedDate(formData.endDate)}</span>까지로 한다.</p>
                                            </div>

                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 4 조 (계약 금액 및 지급 방법)</h3>
                                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                                    <li>총 계약 금액: 일금 <span className="text-black">{numberToKoreanWon(formData.projectValue)}</span> 원정 (<span className="text-black">₩{formData.projectValue.toLocaleString()}</span>), 부가가치세 별도</li>
                                                    <li>지급 방법: <br/><span className="whitespace-pre-wrap text-black block mt-1">{clauses.payment}</span></li>
                                                </ol>
                                            </div>

                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 5 조 (수정 및 검수)</h3>
                                                <p className="whitespace-pre-wrap text-black">{clauses.revisions}</p>
                                            </div>

                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 6 조 (지식재산권의 귀속)</h3>
                                                <p className="whitespace-pre-wrap text-black">{clauses.ip}</p>
                                            </div>

                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 7 조 (상호 협조 및 소통)</h3>
                                                <p className="whitespace-pre-wrap text-black">{clauses.feedback}</p>
                                            </div>

                                             <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 8 조 (계약의 해지)</h3>
                                                <p className="whitespace-pre-wrap text-black">{clauses.termination}</p>
                                            </div>

                                             <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 9 조 (비밀유지)</h3>
                                                <p className="whitespace-pre-wrap text-black">{clauses.review}</p>
                                            </div>
                                            
                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 10 조 (분쟁의 해결)</h3>
                                                <p className="text-justify">본 계약과 관련하여 분쟁이 발생한 경우 당사자 간의 합의에 의해 해결함을 원칙으로 하며, 합의가 이루어지지 않을 경우 "갑"의 소재지를 관할하는 법원을 전속 관할 법원으로 한다.</p>
                                            </div>

                                            <div className="break-inside-avoid">
                                                <h3 className="font-bold text-lg mb-2">제 11 조 (기타)</h3>
                                                <p>본 계약에 명시되지 않은 사항은 상관례 및 관계 법령에 따른다.</p>
                                            </div>
                                        </div>

                                        <div className="break-inside-avoid mt-16 pt-8 border-t border-black">
                                            <p className="text-center mb-8">{getFormattedDate(formData.contractDate)}</p>
                                            
                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <h4 className="font-bold text-lg mb-4 text-[#444444] border-b border-gray-300 pb-2">의뢰인 (갑)</h4>
                                                    <table className="w-full text-sm">
                                                        <tbody>
                                                            <tr>
                                                                <td className="py-2 text-[#444444] w-20">성명/상호</td>
                                                                <td className="py-2 font-bold text-black">
                                                                    {formData.clientName || '________________'}
                                                                    <span className="text-gray-300 ml-1 font-normal">(서명/인)</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-2 text-[#444444]">연락처</td>
                                                                <td className="py-2 font-bold text-black">{formData.clientContact || ''}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-2 text-[#444444]">주소</td>
                                                                <td className="py-2 font-bold text-black">{formData.clientAddress || ''}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg mb-4 text-[#444444] border-b border-gray-300 pb-2">작업자 (을)</h4>
                                                    <table className="w-full text-sm">
                                                        <tbody>
                                                            <tr>
                                                                <td className="py-2 text-[#444444] w-20">성명/상호</td>
                                                                <td className="py-2 font-bold text-black">
                                                                    {formData.freelancerName || '________________'}
                                                                    <span className="text-gray-300 ml-1 font-normal">(서명/인)</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-2 text-[#444444]">연락처</td>
                                                                <td className="py-2 font-bold text-black">{formData.freelancerContact || ''}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-2 text-[#444444]">주소</td>
                                                                <td className="py-2 font-bold text-black">{formData.freelancerAddress || ''}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 bg-slate-900 rounded-2xl p-8 border border-slate-700 text-center relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-32 bg-primary-500/10 rounded-full blur-3xl -z-0"></div>
                                     <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/20">
                                            <BellIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">곧 출시될 안전 기능도 놓치지 마세요</h3>
                                        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                            먹튀 방지 <strong>예치금(Escrow)</strong>, 체불 걱정 없는 <strong>자동 정산</strong>, <br/>
                                            그리고 법적 <strong>보장 보험</strong>까지. 가장 먼저 소식을 전해드릴까요?
                                        </p>
                                        <button 
                                            onClick={handleNotify}
                                            disabled={isNotified}
                                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${isNotified ? 'bg-emerald-600 text-white cursor-default' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
                                        >
                                            {isNotified ? '알림 신청이 완료되었습니다!' : '안전 기능 출시 알림 받기'}
                                        </button>
                                     </div>
                                </div>
                                
                                <div className="text-center mt-8">
                                    <button onClick={handleBackToClauses} className="text-slate-500 hover:text-slate-300 underline">
                                        내용 수정하기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Features Section */}
            <div className="mt-0">
                <ProductFeatures />
            </div>

            {/* Pricing / Modular Features Section */}
            <div className="mt-0">
                <PricingFeatures onGoToContract={onGoToContract} />
            </div>

            <div className="mt-0">
                <FaqPage />
            </div>

            {/* Analysis Modal */}
            {showAnalysisModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md relative">
                        {/* Header */}
                        <div className="bg-blue-600 p-6 relative">
                            <button onClick={() => setShowAnalysisModal(false)} className="absolute top-6 right-6 text-blue-100 hover:text-white transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="bg-white/20 p-1.5 rounded-lg">
                                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">AI 계약서 신뢰도 분석</h3>
                            </div>
                            <p className="text-blue-100 text-sm font-medium">FreeZone AI Engine</p>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {/* Summary Box */}
                            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
                                <p className="text-slate-600 text-sm mb-1">작성하신 계약서의 법적 안정성을 실시간으로 분석했습니다.</p>
                                <p className="text-slate-900 font-bold">
                                    분쟁 발생 위험도: 
                                    <span className={analysisResult.isRisk ? "text-orange-500 ml-1" : "text-emerald-500 ml-1"}>
                                        {analysisResult.isRisk ? "중간 (확인 필요)" : "낮음 (안전)"}
                                    </span>
                                </p>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-5 mb-8">
                                {analysisResult.checks.map((check) => (
                                    <div key={check.id} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            {check.isValid ? (
                                                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                                            ) : (
                                                <XCircleIcon className="w-6 h-6 text-red-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className={`font-bold text-sm ${check.isValid ? 'text-slate-800' : 'text-red-500'}`}>
                                                {check.label}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5">{check.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Warning Box (Only if risk) */}
                            {analysisResult.isRisk && (
                                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 flex gap-3">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-red-600 mb-1">일부 정보가 부족합니다</p>
                                        <p className="text-xs text-red-400 leading-relaxed">
                                            빈칸이나 모호한 표현이 있으면 추후 분쟁의 소지가 있습니다. 이전 단계로 돌아가 내용을 보완하는 것을 추천합니다.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <button 
                                onClick={() => setShowAnalysisModal(false)}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                            >
                                확인 완료 (계약서 보기)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
