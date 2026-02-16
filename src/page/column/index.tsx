"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface Column {
  id: number;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
  summary: string;
  content: string;
  isNew: boolean;
  bgGradient: string;
}

// 기본 칼럼 데이터
const defaultColumns: Column[] = [
    {
      id: 1,
      title: "2024년 프랜차이즈 창업 트렌드 분석",
      category: "시장분석",
      date: "2024.02.13",
      thumbnail: "📊",
      summary: "최근 프랜차이즈 시장의 주요 트렌드와 성공 전략",
      bgGradient: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)",
      content: `# 2024년 프랜차이즈 시장 전망

## 주요 트렌드

1. **무인 자동화 시스템 도입**
   - 인건비 절감 효과 30% 이상
   - 24시간 운영 가능한 비즈니스 모델

2. **로컬 브랜드의 성장**
   - 대형 브랜드 대비 20% 낮은 초기 비용
   - 지역 특화 메뉴로 차별화

3. **친환경 트렌드**
   - ESG 경영 중요성 증가
   - 소비자 선호도 상승

## 성공 전략

✅ 차별화된 컨셉 개발
✅ 디지털 마케팅 활용
✅ 고객 경험 최적화

**결론:** 2024년은 기술과 친환경이 키워드입니다.`,
      isNew: true,
    },
    {
      id: 2,
      title: "메가커피 가맹점, 성공하는 입지 조건은?",
      category: "브랜드분석",
      date: "2024.02.10",
      thumbnail: "☕",
      summary: "메가커피 상위 10% 매장의 공통점",
      bgGradient: "linear-gradient(135deg, #FF6BA9 0%, #FFB6D9 100%)",
      content: `# 메가커피 성공 입지 분석

## 상위 10% 매장의 공통점

### 📍 위치 조건
- 역세권 도보 5분 이내
- 대학가 또는 오피스 밀집 지역
- 주차장 확보 (최소 3대 이상)

### 💰 매출 현황
- 월평균 매출: 4,500만원
- 일 평균 방문객: 250명
- 객단가: 5,800원

### 🎯 핵심 성공 요인
1. 접근성 좋은 1층 매장
2. 넓은 좌석 공간 (최소 20석)
3. 주변 500m 이내 경쟁점 없음

**TIP:** 창업 전 유동인구 분석 필수!`,
      isNew: true,
    },
    {
      id: 3,
      title: "프랜차이즈 창업, 실패하는 3가지 이유",
      category: "창업가이드",
      date: "2024.02.05",
      thumbnail: "⚠️",
      summary: "창업 실패 사례를 통해 배우는 성공 전략",
      bgGradient: "linear-gradient(135deg, #34D399 0%, #A7F3D0 100%)",
      content: `# 프랜차이즈 창업 실패 원인

## ❌ 실패 사례 TOP 3

### 1. 시장 조사 부족
- 경쟁 현황 미파악
- 타겟 고객층 분석 부재
- → 예상 매출 50% 미달

### 2. 과도한 초기 투자
- 필요 이상의 인테리어 비용
- 과다한 재고 확보
- → 자금 회전 어려움

### 3. 본사 의존도 과다
- 자체 마케팅 능력 부족
- 운영 노하우 미습득
- → 경쟁력 약화

## ✅ 성공을 위한 체크리스트

□ 3개월 이상 시장 조사
□ 예비 창업자 인터뷰
□ 재무 계획 수립
□ 가맹본부 실사

**명심:** 준비된 창업이 성공 확률 3배 높입니다.`,
      isNew: false,
    },
  ];

// 색상의 밝기 계산 (0-255)
function getColorBrightness(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // 인간의 눈이 인식하는 밝기 계산 (0-255)
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// 배경 그라데이션에서 가장 진한 색상 추출
function extractColorFromGradient(gradient: string): string {
  // linear-gradient(...) 형식에서 모든 색상 추출
  const linearMatches = gradient.match(/#[0-9A-Fa-f]{6}/g);
  if (linearMatches && linearMatches.length >= 2) {
    // 두 색상의 밝기 비교하여 더 진한 색 반환
    const brightness1 = getColorBrightness(linearMatches[0]);
    const brightness2 = getColorBrightness(linearMatches[1]);
    return brightness1 < brightness2 ? linearMatches[0] : linearMatches[1];
  }
  if (linearMatches && linearMatches.length === 1) {
    return linearMatches[0];
  }

  // from-[#색상] to-[#색상] 형식에서 색상 추출
  const tailwindMatches = gradient.match(/\[#([0-9A-Fa-f]{6})\]/g);
  if (tailwindMatches && tailwindMatches.length >= 2) {
    const color1 = `#${tailwindMatches[0].match(/([0-9A-Fa-f]{6})/)![1]}`;
    const color2 = `#${tailwindMatches[1].match(/([0-9A-Fa-f]{6})/)![1]}`;
    const brightness1 = getColorBrightness(color1);
    const brightness2 = getColorBrightness(color2);
    return brightness1 < brightness2 ? color1 : color2;
  }

  // 기본 색상 반환
  return '#3098F2';
}

export default function ColumnView() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // localStorage에서 칼럼 데이터 불러오기
    const loadColumns = () => {
      const stored = localStorage.getItem("columns");
      if (stored) {
        try {
          const adminColumns: Column[] = JSON.parse(stored);
          setColumns(adminColumns);
        } catch (error) {
          console.error("칼럼 데이터 로드 실패:", error);
          setColumns(defaultColumns);
        }
      }
    };

    loadColumns();

    // localStorage 변경 감지
    window.addEventListener('storage', loadColumns);
    return () => window.removeEventListener('storage', loadColumns);
  }, []);

  const handleColumnClick = (column: Column, index: number) => {
    // 처음 2개 칼럼은 무료, 3번째부터 로그인 필요
    if (index >= 2 && !isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setSelectedColumn(column);
  };

  const handleLoginConfirm = () => {
    setShowLoginModal(false);
    router.push("/login");
  };

  const handleLoginCancel = () => {
    setShowLoginModal(false);
  };

  const handleClose = () => {
    setSelectedColumn(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < columns.length - 1) {
        // 왼쪽 스와이프 - 다음
        const nextColumn = columns[currentIndex + 1];
        setCurrentIndex(currentIndex + 1);
        setSelectedColumn(nextColumn);
      } else if (diff < 0 && currentIndex > 0) {
        // 오른쪽 스와이프 - 이전
        const prevColumn = columns[currentIndex - 1];
        setCurrentIndex(currentIndex - 1);
        setSelectedColumn(prevColumn);
      }
    }
  };

  const handleScroll = (e: React.WheelEvent) => {
    const delta = e.deltaY;
    const threshold = 100;

    if (Math.abs(delta) > threshold) {
      if (delta > 0 && currentIndex < columns.length - 1) {
        // 아래 스크롤 - 다음
        const nextColumn = columns[currentIndex + 1];
        setCurrentIndex(currentIndex + 1);
        setSelectedColumn(nextColumn);
      } else if (delta < 0 && currentIndex > 0) {
        // 위 스크롤 - 이전
        const prevColumn = columns[currentIndex - 1];
        setCurrentIndex(currentIndex - 1);
        setSelectedColumn(prevColumn);
      }
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes scale-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
      `}</style>
      {/* 메인 뷰 - 썸네일 그리드 */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-white">
        <div className="max-w-2xl mx-auto">
          {/* 세로 스크롤 썸네일 */}
          <div className="">
            {columns.map((column, index) => (
              <div
                key={column.id}
                onClick={() => {
                  setCurrentIndex(index);
                  handleColumnClick(column, index);
                }}
                className="relative h-screen w-full cursor-pointer snap-start snap-always"
              >
                {/* 배경 그라데이션 */}
                <div
                  className="absolute inset-0 opacity-90"
                  style={{ background: column.bgGradient }}
                />

                {/* 콘텐츠 */}
<div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
                  {/* 썸네일 아이콘 */}
                  <div className="text-7xl mb-3">{column.thumbnail}</div>

                  {/* 카테고리 */}
                  <div className="mb-2">
                    <span className="text-sm font-bold text-gray-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                      {column.category}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-tight break-keep">
                    {column.title}
                  </h2>

                  {/* 요약 */}
                  <p className="text-lg text-gray-800 font-medium mb-3 max-w-md break-keep">
                    {column.summary}
                  </p>

                  {/* 날짜 */}
                  <p className="text-sm text-gray-700 font-medium mb-36">
                    {column.date}
                  </p>

                  {/* 로그인 필요 표시 */}
                  {index >= 2 && !isLoggedIn && (
                    <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="text-sm font-bold text-gray-900">
                        로그인하고 읽기
                      </span>
                    </div>
                  )}

                  {/* 클릭 힌트 */}
                  <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 w-full px-6">
                    <div
                      className="bg-white rounded-2xl px-5 py-3 shadow-xl mx-auto max-w-xs"
                      style={{
                        animation: "scale-pulse 1.5s ease-in-out infinite",
                      }}
                    >
                      <p className="text-base font-bold text-center" style={{
                        color: extractColorFromGradient(column.bgGradient),
                      }}>
                        칼럼을 눌러보세요!
                      </p>
                      <p className="text-xs text-gray-600 text-center mt-1 font-medium">
                        상세 내용 확인하기
                      </p>
                    </div>
                  </div>

                  {/* 스크롤 힌트 */}
                  <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center gap-2" style={{ animation: "bounce 3s infinite" }}>
                      <div className="text-sm text-white font-medium">아래로 스크롤</div>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 상세 뷰 - 스와이프로 내용 보기 */}
      {selectedColumn && (
        <div className="fixed inset-0 bg-white z-50">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 콘텐츠 영역 */}
          <div className="h-full overflow-y-auto">
            <div
              className="min-h-screen px-6 py-20"
              style={{ background: selectedColumn.bgGradient }}
            >
              <div className="max-w-2xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{selectedColumn.thumbnail}</div>
                  <span className="text-sm font-bold text-gray-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    {selectedColumn.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-2 break-keep">
                    {selectedColumn.title}
                  </h1>
                  <p className="text-sm text-gray-700 font-medium">
                    {selectedColumn.date}
                  </p>
                </div>

                {/* 본문 */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 text-gray-900">
                  <div className="prose max-w-none">
                    {selectedColumn.content.split("\n").map((line, index) => {
                      if (line.startsWith("# ")) {
                        return (
                          <h1
                            key={index}
                            className="text-2xl font-black mb-4 text-gray-900"
                          >
                            {line.replace("# ", "")}
                          </h1>
                        );
                      } else if (line.startsWith("## ")) {
                        return (
                          <h2
                            key={index}
                            className="text-xl font-black mt-6 mb-3 text-gray-900"
                          >
                            {line.replace("## ", "")}
                          </h2>
                        );
                      } else if (line.startsWith("### ")) {
                        return (
                          <h3
                            key={index}
                            className="text-lg font-bold mt-4 mb-2 text-gray-900"
                          >
                            {line.replace("### ", "")}
                          </h3>
                        );
                      } else if (line.startsWith("**") && line.endsWith("**")) {
                        return (
                          <p key={index} className="font-bold mt-4 text-gray-900">
                            {line.replace(/\*\*/g, "")}
                          </p>
                        );
                      } else if (line.startsWith("-") || line.startsWith("✅") || line.startsWith("□") || line.startsWith("❌")) {
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
          </div>
        </div>
      )}

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full">
            {/* 아이콘 */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {/* 제목 */}
            <h3 className="text-2xl font-black text-gray-900 text-center mb-3">
              로그인이 필요해요
            </h3>

            {/* 설명 */}
            <p className="text-base text-gray-600 text-center mb-8 leading-relaxed">
              이 칼럼을 읽으려면
              <br />
              로그인이 필요합니다
            </p>

            {/* 버튼 */}
            <div className="space-y-3">
              <button
                onClick={handleLoginConfirm}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all"
              >
                로그인하러 가기
              </button>
              <button
                onClick={handleLoginCancel}
                className="w-full bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
