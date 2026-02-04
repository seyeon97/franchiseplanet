"use client";

import { useMemo } from "react";

export default function HeroSection() {
  // 가맹점 수 순위 (많은 순)
  const racingBrands = [
    { name: "컴포즈커피", color: "#8B4513", speed: 25, lane: 1 },
    { name: "메가커피", color: "#F25C05", speed: 23, lane: 2 },
    { name: "교촌치킨", color: "#DC143C", speed: 21, lane: 3 },
    { name: "맘스터치", color: "#FF6B35", speed: 19, lane: 4 },
    { name: "본죽", color: "#228B22", speed: 17, lane: 5 },
    { name: "설빙", color: "#FFB6C1", speed: 15, lane: 6 },
  ];

  // Generate stars - fixed positions
  const stars = useMemo(() => {
    const starPositions = [
      { top: 15, left: 20, delay: 0.5, opacity: 0.6 },
      { top: 25, left: 75, delay: 1.2, opacity: 0.8 },
      { top: 35, left: 40, delay: 2.1, opacity: 0.5 },
      { top: 45, left: 85, delay: 0.8, opacity: 0.7 },
      { top: 55, left: 10, delay: 1.5, opacity: 0.9 },
      { top: 65, left: 60, delay: 0.3, opacity: 0.4 },
      { top: 75, left: 30, delay: 1.8, opacity: 0.6 },
      { top: 85, left: 90, delay: 2.5, opacity: 0.7 },
      { top: 10, left: 50, delay: 1.0, opacity: 0.8 },
      { top: 20, left: 95, delay: 0.6, opacity: 0.5 },
      { top: 30, left: 15, delay: 2.2, opacity: 0.9 },
      { top: 40, left: 65, delay: 1.4, opacity: 0.6 },
      { top: 50, left: 45, delay: 0.9, opacity: 0.7 },
      { top: 60, left: 80, delay: 1.7, opacity: 0.4 },
      { top: 70, left: 25, delay: 2.3, opacity: 0.8 },
      { top: 80, left: 55, delay: 0.4, opacity: 0.5 },
      { top: 90, left: 70, delay: 1.9, opacity: 0.6 },
      { top: 12, left: 35, delay: 1.1, opacity: 0.7 },
      { top: 22, left: 88, delay: 2.6, opacity: 0.9 },
      { top: 32, left: 5, delay: 0.7, opacity: 0.4 },
      { top: 42, left: 48, delay: 1.6, opacity: 0.8 },
      { top: 52, left: 92, delay: 2.4, opacity: 0.5 },
      { top: 62, left: 18, delay: 0.2, opacity: 0.6 },
      { top: 72, left: 72, delay: 1.3, opacity: 0.7 },
      { top: 82, left: 38, delay: 2.7, opacity: 0.9 },
      { top: 92, left: 58, delay: 0.5, opacity: 0.4 },
      { top: 8, left: 28, delay: 1.0, opacity: 0.8 },
      { top: 18, left: 82, delay: 2.0, opacity: 0.6 },
      { top: 28, left: 52, delay: 0.8, opacity: 0.5 },
      { top: 38, left: 12, delay: 1.5, opacity: 0.7 },
    ];
    return starPositions.map((star, i) => ({ ...star, id: i }));
  }, []);

  return (
    <section className="min-h-screen snap-start flex items-center justify-center text-white relative overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #F144BB 0%, #803CFA 33%, #0064FF 66%, #000000 100%)",
      }}>
        {/* Stars */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.delay}s`,
                opacity: star.opacity,
              }}
            ></div>
          ))}
        </div>

        {/* Nebula effects */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl" style={{
          background: "radial-gradient(circle, rgba(241, 68, 187, 0.3), transparent)",
        }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{
          background: "radial-gradient(circle, rgba(0, 100, 255, 0.3), transparent)",
        }}></div>
      </div>

      {/* Racing Track - Circular */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative" style={{ width: "800px", height: "800px" }}>
          {/* Track lanes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/20"
              style={{
                width: `${800 - i * 100}px`,
                height: `${800 - i * 100}px`,
              }}
            ></div>
          ))}

          {/* Racing Brands on Track */}
          {racingBrands.map((brand) => {
            const radius = 400 - brand.lane * 50;
            return (
              <div
                key={brand.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  animation: `orbit ${brand.speed}s linear infinite`,
                  transformOrigin: "0 0",
                }}
              >
                <div
                  className="font-black text-xl whitespace-nowrap"
                  style={{
                    color: brand.color,
                    textShadow: `0 0 20px ${brand.color}aa, 0 0 40px ${brand.color}66, 0 0 60px ${brand.color}44`,
                    transform: `translateX(${radius}px) translateY(-50%) rotate(0deg)`,
                  }}
                >
                  {brand.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo/Icon */}
        <div className="mb-8 text-8xl animate-bounce">🌍</div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          프차플래닛
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-light mb-4 text-purple-100">
          프랜차이즈의 모든 것
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto mb-12">
          탑브랜드 매출 정보를 한눈에!
          <br />
          상위 10%, 평균, 하위 10% 데이터로 현실적인 창업 계획을 세우세요.
        </p>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <p className="text-sm text-purple-200">스크롤하여 브랜드 보기</p>
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
