"use client";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
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
