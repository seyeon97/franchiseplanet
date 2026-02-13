"use client";

export default function HeroSectionToss() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12 md:px-6 md:py-20 snap-start">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto text-center">
        {/* 토스 스타일 큰 타이포그래피 */}
        <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
          프랜차이즈,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #3182F6 0%, #00C896 100%)",
            }}
          >
            제대로 알고
          </span>
          <br />
          시작하세요
        </h1>

        {/* 설명 */}
        <p className="text-lg md:text-2xl text-gray-600 mb-12 leading-relaxed font-medium">
          상위 10%, 평균, 하위 10%
          <br />
          실제 매출 데이터로 현실적인 창업 계획을
        </p>

        {/* 스크롤 힌트 - 토스 스타일 */}
        <div className="flex flex-col items-center gap-3 animate-bounce">
          <div className="text-sm text-gray-400 font-medium">아래로 스크롤</div>
          <svg
            className="w-6 h-6 text-gray-400"
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

    </section>
  );
}
