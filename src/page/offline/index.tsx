"use client";

export default function OfflineView() {
  // 예시 임장 프로그램 데이터
  const programs = [
    {
      id: 1,
      name: "김창업 컨설턴트",
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
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-20">
      {programs.map((program, index) => (
        <div
          key={program.id}
          className="min-h-screen snap-start flex items-center justify-center bg-white px-4 py-8 relative"
        >
          <div className="max-w-2xl w-full">
            <button className="text-left group w-full">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
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
                    <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center text-5xl border-3 border-white group-hover:scale-110 transition-transform duration-300">
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
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${program.bgColor} text-white font-bold px-5 py-2.5 rounded-full group-hover:shadow-lg transition-shadow duration-300`}>
                    <span>자세히 보기</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>

            {/* 스크롤 힌트 */}
            {index === 0 && (
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
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
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
