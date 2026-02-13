"use client";

import { useRef, useState, useEffect } from "react";

export default function OfflineView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  // 스크롤 위치에 따라 현재 인덱스 업데이트
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && !isScrollingRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);

        // Clear previous timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Set a timeout to snap to the nearest card after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          if (scrollRef.current) {
            const currentScrollLeft = scrollRef.current.scrollLeft;
            const currentWidth = scrollRef.current.offsetWidth;
            const targetIndex = Math.round(currentScrollLeft / currentWidth);

            setCurrentIndex(targetIndex);

            // Ensure we're snapped to the correct position
            isScrollingRef.current = true;
            scrollRef.current.scrollTo({
              left: currentWidth * targetIndex,
              behavior: "smooth",
            });

            setTimeout(() => {
              isScrollingRef.current = false;
            }, 300);
          }
        }, 50);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, []);

  // 인디케이터 클릭 시 해당 카드로 스크롤
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      isScrollingRef.current = true;
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 300);
    }
  };

  // 예시 임장 프로그램 데이터
  const programs = [
    {
      id: 1,
      name: "장사해커 컨설턴트",
      category: "임장",
      title: "강남역 임장",
      description: "강남역 상권 분석부터 유동인구 파악까지 전문가와 함께하는 현장 답사",
      bgColor: "from-[#2F85F2] to-[#1F9CD3]",
      imageUrl: "👨‍💼", // 실제로는 강사 사진 URL
    },
    {
      id: 2,
      name: "박프차 전문가",
      category: "임장",
      title: "성수역 임장",
      description: "핫플레이스 성수동! 트렌디한 상권의 숨은 매력 찾기",
      bgColor: "from-[#1F9CD3] to-[#0BB7AD]",
      imageUrl: "👨‍💼",
    },
    {
      id: 3,
      name: "이입지 대표",
      category: "임장",
      title: "홍대입구역 임장",
      description: "젊음의 거리 홍대, 창업 전 꼭 확인해야 할 입지 포인트",
      bgColor: "from-[#0BB7AD] to-[#08C698]",
      imageUrl: "👩‍💼",
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col pb-20">
      {/* 고정 헤더 */}
      <div className="px-6 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <h1 className="text-4xl font-extrabold mb-3 leading-tight text-[#101828]">
          전문가와 함께하는
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #3182F6 0%, #00C896 100%)",
            }}
          >
            현장 임장
          </span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          성공 창업의 시작, 입지 분석부터
        </p>
      </div>

      {/* 카드 스와이프 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex h-full">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="min-w-full h-full snap-center flex flex-col px-6 py-4 relative"
              style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
            >
              <div className="max-w-2xl w-full mx-auto flex-1 flex items-center justify-center">
                <button className="text-left group w-full">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                    {/* 카드 상단 - 그라데이션 영역 */}
                    <div className={`bg-gradient-to-br ${program.bgColor} p-5 pb-10 relative`}>
                      <div className="text-xs font-bold text-white/90 mb-1.5 tracking-wide">
                        ★ 프랜차이즈 / 상권분석 전문가
                      </div>
                      <h3 className="text-3xl font-black text-white leading-tight mb-2">
                        {program.title}
                      </h3>

                      {/* 강사 사진 - 카드 하단으로 걸쳐지도록 */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center text-5xl border-3 border-white group-hover:scale-105 transition-all duration-300">
                          {program.imageUrl}
                        </div>
                      </div>
                    </div>

                    {/* 카드 하단 정보 */}
                    <div className="pt-16 pb-5 px-5 text-center bg-gradient-to-b from-gray-50 to-white">
                      <h4 className="text-xl font-black text-[#101828] mb-2">
                        {program.name}
                      </h4>
                      <div className="inline-block mb-3">
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                          {program.category}
                        </span>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed mb-4">
                        {program.description}
                      </p>

                      {/* CTA 버튼 */}
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${program.bgColor} text-white font-bold px-5 py-2.5 rounded-full group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300`}>
                        <span>자세히 보기</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 고정 하단 인디케이터 */}
      <div className="px-6 pb-4 max-w-2xl mx-auto w-full">
        {/* 페이지 인디케이터 - 클릭 가능 */}
        <div className="flex justify-center gap-2 mb-4">
          {programs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-[#101828]"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`${idx + 1}번째 카드로 이동`}
            />
          ))}
        </div>

        {/* 스와이프 힌트 - 페이지별로 다르게 표시 */}
        <div className="text-center">
          {currentIndex === 0 && (
            <div className="inline-flex items-center gap-3 text-gray-400 animate-pulse">
              <span className="text-sm font-medium">옆으로 밀기</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
          {currentIndex === programs.length - 1 && (
            <div className="inline-flex items-center gap-3 text-gray-400 animate-pulse">
              <svg
                className="w-5 h-5 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-sm font-medium">옆으로 밀기</span>
            </div>
          )}
          {currentIndex > 0 && currentIndex < programs.length - 1 && (
            <div className="inline-flex items-center gap-3 text-gray-400 animate-pulse">
              <svg
                className="w-5 h-5 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-sm font-medium">옆으로 밀기</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
