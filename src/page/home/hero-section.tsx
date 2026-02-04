"use client";

export default function HeroSection() {
  // 가맹점 수 순위 (많은 순)
  const racingBrands = [
    { name: "컴포즈커피", logo: "☕", color: "#8B4513", speed: 25, position: 1 },
    { name: "메가커피", logo: "☕", color: "#F25C05", speed: 23, position: 2 },
    { name: "교촌치킨", logo: "🍗", color: "#DC143C", speed: 21, position: 3 },
    { name: "맘스터치", logo: "🍔", color: "#FF6B35", speed: 19, position: 4 },
    { name: "본죽", logo: "🍲", color: "#228B22", speed: 17, position: 5 },
    { name: "설빙", logo: "🍧", color: "#FFB6C1", speed: 15, position: 6 },
  ];

  return (
    <section className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
      {/* Racing Track Background */}
      <div className="absolute inset-0">
        {/* Road Lines */}
        <div className="absolute top-1/4 w-full h-1 bg-white/30 animate-pulse"></div>
        <div className="absolute top-1/2 w-full h-1 bg-white/30 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-3/4 w-full h-1 bg-white/30 animate-pulse" style={{ animationDelay: "1s" }}></div>

        {/* Moving dashed lines */}
        <div className="absolute top-1/3 w-full h-0.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[dash_3s_linear_infinite]"></div>
        </div>
        <div className="absolute top-2/3 w-full h-0.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[dash_3s_linear_infinite]" style={{ animationDelay: "1.5s" }}></div>
        </div>
      </div>

      {/* Racing Brands */}
      <div className="absolute inset-0 pointer-events-none">
        {racingBrands.map((brand, idx) => (
          <div
            key={brand.name}
            className="absolute"
            style={{
              top: `${15 + idx * 12}%`,
              left: "0",
              animation: `race ${brand.speed}s linear infinite`,
            }}
          >
            <div
              className="flex items-center gap-3 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${brand.color}dd 0%, ${brand.color} 100%)`,
                boxShadow: `0 0 20px ${brand.color}88`,
              }}
            >
              <div className="text-3xl">{brand.logo}</div>
              <div className="text-white font-black text-sm whitespace-nowrap">
                {brand.name}
                <div className="text-xs opacity-80">#{brand.position}</div>
              </div>
              {/* Speed lines */}
              <div className="flex gap-1 ml-2">
                <div className="w-2 h-0.5 bg-white/60 rounded"></div>
                <div className="w-3 h-0.5 bg-white/40 rounded"></div>
                <div className="w-4 h-0.5 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        ))}
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
