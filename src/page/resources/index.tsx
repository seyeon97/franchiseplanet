"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  size: string;
  downloads: number;
  views: number;
  rating: number;
  reviews: number;
  date: string;
  thumbnail: string;
  bgColor: string;
  category: string;
  badge: string | null;
  badgeColor: string | null;
  provider: string;
  content: string;
}

export default function ResourcesView() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    // 로그인 상태 체크
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleResourceClick = (resource: Resource) => {
    if (!isLoggedIn) {
      // 로그인 필요 알림
      if (confirm("자료를 보려면 로그인이 필요합니다. 로그인 하시겠습니까?")) {
        router.push("/login");
      }
      return;
    }
    // 로그인된 경우 상세 페이지 보기
    setSelectedResource(resource);
  };

  const handleClose = () => {
    setSelectedResource(null);
  };

  // 카테고리
  const categories = [
    { id: "all", label: "전체", icon: "📑" },
    { id: "market", label: "시장분석", icon: "📊" },
    { id: "checklist", label: "체크리스트", icon: "✅" },
    { id: "contract", label: "계약서", icon: "📋" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  // 예시 자료 데이터
  const resources: Resource[] = [
    {
      id: 1,
      title: "프랜차이즈 시장 분석 보고서",
      description: "2024년 최신 트렌드와 성장 전망",
      type: "PDF",
      size: "2.5MB",
      downloads: 1240,
      views: 17400,
      rating: 4.8,
      reviews: 284,
      date: "2024.02.13",
      thumbnail: "📊",
      bgColor: "from-blue-400 to-blue-500",
      category: "market",
      badge: "인기",
      badgeColor: "bg-red-500",
      provider: "프차플래닛 리서치",
      content: `# 2024년 프랜차이즈 시장 전망

## 주요 트렌드

### 1. 무인 자동화 시스템 도입
- 인건비 절감 효과 30% 이상
- 24시간 운영 가능한 비즈니스 모델
- 키오스크, 로봇 활용 증가

### 2. 로컬 브랜드의 성장
- 대형 브랜드 대비 20% 낮은 초기 비용
- 지역 특화 메뉴로 차별화
- SNS 마케팅 효과적 활용

### 3. 친환경 트렌드
- ESG 경영 중요성 증가
- 재활용 가능한 포장재 사용
- 소비자 선호도 상승

## 성공 전략

✅ 차별화된 컨셉 개발
✅ 디지털 마케팅 활용
✅ 고객 경험 최적화
✅ 데이터 기반 의사결정

**결론:** 2024년은 기술과 친환경이 핵심 키워드입니다.`,
    },
    {
      id: 2,
      title: "카페 창업 입지 선정 가이드",
      description: "상권 분석, 임대차 계약, 주요 체크리스트",
      type: "PDF",
      size: "1.8MB",
      downloads: 856,
      views: 8560,
      rating: 4.5,
      reviews: 142,
      date: "2024.02.10",
      thumbnail: "☕",
      bgColor: "from-amber-400 to-orange-500",
      category: "checklist",
      badge: null,
      badgeColor: null,
      provider: "창업 컨설팅",
      content: `# 카페 창업 입지 선정 가이드

## 핵심 체크포인트

### 📍 유동인구 분석
- 주중/주말 유동인구 차이 확인
- 시간대별 유동 패턴 파악
- 최소 일 평균 500명 이상 권장

### 🏢 주변 환경
- 오피스 밀집 지역: 평일 수요 ↑
- 주거 밀집 지역: 주말 수요 ↑
- 대학가: 학기 중 집중

### 💰 임대 조건
- 월 임대료: 예상 매출의 10% 이내
- 보증금 회수 가능성 검토
- 권리금 적정성 평가

### ⚠️ 경쟁 현황
- 반경 500m 이내 경쟁점 수
- 주요 경쟁사 가격대 비교
- 차별화 포인트 발굴

**TIP:** 최소 3개월 이상 상권 조사 필수!`,
    },
    {
      id: 3,
      title: "프랜차이즈 계약서 가이드",
      description: "계약 전 반드시 확인할 필수 항목 정리",
      type: "PDF",
      size: "3.2MB",
      downloads: 2103,
      views: 21030,
      rating: 4.9,
      reviews: 512,
      date: "2024.02.05",
      thumbnail: "📋",
      bgColor: "from-green-400 to-emerald-500",
      category: "contract",
      badge: "추천",
      badgeColor: "bg-blue-500",
      provider: "법률 자문팀",
      content: `# 프랜차이즈 계약서 가이드

## 필수 확인 항목

### 📋 계약 기본사항
- 계약 기간 및 갱신 조건
- 가맹비, 로열티 구조
- 보증금 및 위약금 규정

### ⚖️ 권리와 의무
- 상표 사용권 범위
- 영업 지역 독점권
- 본사 지원 내용 명시

### 💸 비용 구조
- 초기 투자 비용 상세
- 월별 고정 비용
- 추가 부담금 여부

### 🚫 주의사항
- 일방적 계약 해지 조항
- 과도한 위약금 설정
- 불공정 거래 조항

**중요:** 계약 전 변호사 검토 권장!`,
    },
    {
      id: 4,
      title: "치킨 프랜차이즈 수익성 분석",
      description: "매출 구조, 비용 분석, 손익 시뮬레이션",
      type: "PDF",
      size: "2.1MB",
      downloads: 654,
      views: 4410,
      rating: 4.3,
      reviews: 89,
      date: "2024.02.01",
      thumbnail: "🍗",
      bgColor: "from-yellow-400 to-amber-500",
      category: "market",
      badge: "인기",
      badgeColor: "bg-red-500",
      provider: "업종 분석팀",
      content: `# 치킨 프랜차이즈 수익성 분석

## 매출 구조

### 💰 평균 매출
- 월 평균: 4,200만원
- 일 평균: 140만원
- 주말 집중도: 40%

### 📊 비용 구조
- 재료비: 35%
- 인건비: 25%
- 임대료: 10%
- 기타 고정비: 15%
- 순이익률: 15%

### ⚡ 손익분기점
- 첫 달부터 흑자 어려움
- 평균 6-8개월 소요
- 초기 투자 회수: 2-3년

**결론:** 안정적이지만 경쟁 치열`,
    },
    {
      id: 5,
      title: "편의점 창업 완벽 가이드",
      description: "점포 선정부터 운영 노하우까지 총정리",
      type: "PDF",
      size: "4.5MB",
      downloads: 1890,
      views: 18900,
      rating: 4.7,
      reviews: 356,
      date: "2024.01.28",
      thumbnail: "🏪",
      bgColor: "from-purple-400 to-purple-500",
      category: "checklist",
      badge: "인기",
      badgeColor: "bg-red-500",
      provider: "편의점 전문가",
      content: `# 편의점 창업 완벽 가이드

## 점포 선정

### 🏪 최적 입지
- 주거 밀집 지역
- 대중교통 접근성 우수
- 주차 공간 3대 이상

### 💼 초기 투자
- 가맹비: 2,000만원
- 인테리어: 3,000만원
- 초도물품: 1,500만원
- 총 6,500만원~

### 📈 운영 노하우
- 재고 관리 시스템 활용
- 시간대별 인력 배치
- POS 데이터 분석

**TIP:** 24시간 운영 vs 심야 휴무 신중 선택`,
    },
    {
      id: 6,
      title: "가맹점주 권리 보호 안내서",
      description: "분쟁 해결 절차 및 법적 권리 종합 가이드",
      type: "PDF",
      size: "1.9MB",
      downloads: 432,
      views: 4320,
      rating: 4.6,
      reviews: 78,
      date: "2024.01.25",
      thumbnail: "⚖️",
      bgColor: "from-gray-400 to-gray-500",
      category: "contract",
      badge: null,
      badgeColor: null,
      provider: "법률 상담소",
      content: `# 가맹점주 권리 보호 안내서

## 법적 권리

### ⚖️ 가맹사업법
- 정보공개서 제공 의무
- 허위·과장 광고 금지
- 불공정거래 제재

### 🛡️ 보호받을 수 있는 권리
- 영업지역 보호
- 계약 갱신 요구권
- 손해배상 청구권

### 📞 분쟁 해결
- 가맹거래사 공정위 신고
- 한국공정거래조정원 조정
- 법률구조공단 무료 상담

**중요:** 부당한 대우 시 즉시 신고!`,
    },
  ];

  const filteredResources =
    selectedCategory === "all"
      ? resources
      : resources.filter((r) => r.category === selectedCategory);

  const featuredResource = filteredResources[0];
  const otherResources = filteredResources.slice(1);

  return (
    <>
      <div className="min-h-screen bg-white pb-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
          <h1 className="text-2xl font-black text-[#101828] mb-4">
            자료실
          </h1>

          {/* 카테고리 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3">
          {/* Featured Post - 작게 */}
          {featuredResource && (
            <div className="pt-3 pb-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                FEATURED POST
              </p>
              <button
                onClick={() => handleResourceClick(featuredResource)}
                className="w-full"
              >
                {/* Featured 이미지 */}
                <div
                  className={`relative w-full aspect-[16/9] bg-gradient-to-br ${featuredResource.bgColor} rounded-2xl overflow-hidden mb-2.5`}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 w-3/4 h-2/3 flex items-center justify-center">
                      <span className="text-5xl">{featuredResource.thumbnail}</span>
                    </div>
                  </div>
                  {featuredResource.badge && (
                    <div className="absolute top-3 left-3 bg-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                      <span className="bg-gradient-to-r from-[#3098F2] via-[#25A6D9] to-[#11BFAE] bg-clip-text text-transparent">
                        {featuredResource.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Featured 정보 */}
                <div className="text-left">
                  <h2 className="text-lg font-black text-[#101828] mb-1 leading-tight line-clamp-2">
                    {featuredResource.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                    {featuredResource.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    {featuredResource.date}
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* 나머지 자료 그리드 - 2열, 간격 좁게 */}
          {otherResources.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pb-4">
              {otherResources.map((resource) => (
                <button
                  key={resource.id}
                  onClick={() => handleResourceClick(resource)}
                  className="text-left"
                >
                  {/* 카드 이미지 - 크기 축소 */}
                  <div
                    className={`relative aspect-square bg-gradient-to-br ${resource.bgColor} rounded-xl overflow-hidden mb-1.5`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 w-full h-3/4 flex items-center justify-center">
                        <span className="text-4xl">{resource.thumbnail}</span>
                      </div>
                    </div>
                    {resource.badge && (
                      <div className="absolute top-2 left-2 bg-white text-sm font-bold px-2.5 py-1 rounded-full shadow-lg">
                        <span className="bg-gradient-to-r from-[#3098F2] via-[#25A6D9] to-[#11BFAE] bg-clip-text text-transparent">
                          {resource.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 카드 정보 - 간결하게 */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Trend report</p>
                    <h3 className="text-base font-bold text-[#101828] mb-1 line-clamp-2 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1 line-clamp-1">
                      {resource.description}
                    </p>
                    <p className="text-sm text-gray-400">{resource.date}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 결과 없음 */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-lg font-bold text-[#101828] mb-2">
                자료가 없습니다
              </p>
              <p className="text-sm text-gray-500">
                다른 카테고리를 선택해보세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* 자료 상세 페이지 */}
      {selectedResource && (
        <div className={`fixed inset-0 bg-gradient-to-br ${selectedResource.bgColor} z-50 overflow-y-auto`}>
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="fixed top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#101828] hover:bg-white transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 콘텐츠 */}
          <div className="max-w-2xl mx-auto px-6 py-20">
            {/* 헤더 */}
            <div className="text-center mb-0">
              <div className="text-6xl mb-4">{selectedResource.thumbnail}</div>
              <span className="text-sm font-bold text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                {selectedResource.type}
              </span>
              <h1 className="text-3xl font-black text-[#101828] mt-4 mb-2">
                {selectedResource.title}
              </h1>
              <p className="text-sm text-gray-800 mb-2">{selectedResource.provider}</p>
              <p className="text-sm text-gray-600">{selectedResource.date}</p>
            </div>

            {/* 본문 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 mt-4">
              <div className="prose max-w-none">
                {selectedResource.content.split("\n").map((line, index) => {
                  if (line.startsWith("# ")) {
                    return null;
                  } else if (line.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-xl font-black mt-6 mb-3 text-[#101828]">
                        {line.replace("## ", "")}
                      </h2>
                    );
                  } else if (line.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-[#101828]">
                        {line.replace("### ", "")}
                      </h3>
                    );
                  } else if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={index} className="font-bold mt-4 text-[#101828]">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    );
                  } else if (line.startsWith("-") || line.startsWith("✅") || line.startsWith("⚡") || line.startsWith("🚫") || line.startsWith("⚠️")) {
                    return (
                      <p key={index} className="ml-4 mb-1 text-gray-800">
                        {line}
                      </p>
                    );
                  } else if (line.trim() === "") {
                    return <br key={index} />;
                  } else {
                    return (
                      <p key={index} className="mb-2 text-gray-800 leading-relaxed">
                        {line}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
