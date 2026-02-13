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

export default function ColumnView() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // 예시 칼럼 데이터
  const columns: Column[] = [
    {
      id: 1,
      title: "2024년 프랜차이즈 창업 트렌드 분석",
      category: "시장분석",
      date: "2024.02.13",
      thumbnail: "📊",
      summary: "최근 프랜차이즈 시장의 주요 트렌드와 성공 전략",
      bgGradient: "from-blue-500 to-cyan-500",
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
      bgGradient: "from-orange-500 to-amber-500",
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
      bgGradient: "from-red-500 to-pink-500",
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

  const handleColumnClick = (column: Column) => {
    if (!isLoggedIn) {
      if (confirm("칼럼을 읽으려면 로그인이 필요합니다. 로그인 하시겠습니까?")) {
        router.push("/login");
      }
      return;
    }
    setSelectedColumn(column);
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
      {/* 메인 뷰 - 썸네일 그리드 */}
      <div className="min-h-screen bg-black pb-20">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <div className="px-4 pt-8 pb-4">
            <h1 className="text-2xl font-black text-white">이슈 칼럼</h1>
          </div>

          {/* 세로 스크롤 썸네일 */}
          <div className="space-y-0">
            {columns.map((column, index) => (
              <div
                key={column.id}
                onClick={() => {
                  setCurrentIndex(index);
                  handleColumnClick(column);
                }}
                className="relative h-screen w-full cursor-pointer"
              >
                {/* 배경 그라데이션 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${column.bgGradient} opacity-90`}
                />

                {/* 콘텐츠 */}
                <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
                  {/* 썸네일 아이콘 */}
                  <div className="text-8xl mb-6">{column.thumbnail}</div>

                  {/* 카테고리 */}
                  <div className="mb-4">
                    <span className="text-sm font-bold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      {column.category}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    {column.title}
                  </h2>

                  {/* 요약 */}
                  <p className="text-lg text-white/90 font-medium mb-6 max-w-md">
                    {column.summary}
                  </p>

                  {/* 날짜 */}
                  <p className="text-sm text-white/70 font-medium mb-8">
                    {column.date}
                  </p>

                  {/* 스와이프 안내 */}
                  <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center gap-2 animate-bounce">
                      <svg
                        className="w-8 h-8 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 11l5-5m0 0l5 5m-5-5v12"
                        />
                      </svg>
                      <span className="text-sm text-white/60 font-medium">
                        위로 스와이프
                      </span>
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
        <div
          className="fixed inset-0 bg-black z-50"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleScroll}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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

          {/* 진행 표시 */}
          <div className="absolute top-4 left-4 z-10 flex gap-1">
            {columns.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* 콘텐츠 영역 */}
          <div className="h-full overflow-y-auto">
            <div
              className={`min-h-screen bg-gradient-to-br ${selectedColumn.bgGradient} px-6 py-20`}
            >
              <div className="max-w-2xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{selectedColumn.thumbnail}</div>
                  <span className="text-sm font-bold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    {selectedColumn.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black text-white mt-4 mb-2">
                    {selectedColumn.title}
                  </h1>
                  <p className="text-sm text-white/70 font-medium">
                    {selectedColumn.date}
                  </p>
                </div>

                {/* 본문 */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 text-white">
                  <div className="prose prose-invert max-w-none">
                    {selectedColumn.content.split("\n").map((line, index) => {
                      if (line.startsWith("# ")) {
                        return (
                          <h1
                            key={index}
                            className="text-2xl font-black mb-4 text-white"
                          >
                            {line.replace("# ", "")}
                          </h1>
                        );
                      } else if (line.startsWith("## ")) {
                        return (
                          <h2
                            key={index}
                            className="text-xl font-black mt-6 mb-3 text-white"
                          >
                            {line.replace("## ", "")}
                          </h2>
                        );
                      } else if (line.startsWith("### ")) {
                        return (
                          <h3
                            key={index}
                            className="text-lg font-bold mt-4 mb-2 text-white"
                          >
                            {line.replace("### ", "")}
                          </h3>
                        );
                      } else if (line.startsWith("**") && line.endsWith("**")) {
                        return (
                          <p key={index} className="font-bold mt-4 text-white">
                            {line.replace(/\*\*/g, "")}
                          </p>
                        );
                      } else if (line.startsWith("-") || line.startsWith("✅") || line.startsWith("□") || line.startsWith("❌")) {
                        return (
                          <p key={index} className="ml-4 mb-1 text-white/90">
                            {line}
                          </p>
                        );
                      } else if (line.trim() === "") {
                        return <br key={index} />;
                      } else {
                        return (
                          <p key={index} className="mb-2 text-white/90 leading-relaxed">
                            {line}
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>

                {/* 네비게이션 힌트 */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-white/60 font-medium">
                    {currentIndex < columns.length - 1
                      ? "↓ 아래로 스와이프하면 다음 칼럼"
                      : "마지막 칼럼입니다"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
