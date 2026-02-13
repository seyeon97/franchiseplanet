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
      bgColor: "from-blue-600 to-blue-700",
      imageUrl: "👨‍💼", // 실제로는 강사 사진 URL
    },
    {
      id: 2,
      name: "박프차 전문가",
      category: "임장",
      title: "성수역 임장",
      description: "핫플레이스 성수동! 트렌디한 상권의 숨은 매력 찾기",
      bgColor: "from-purple-600 to-indigo-600",
      imageUrl: "👨‍💼",
    },
    {
      id: 3,
      name: "이입지 대표",
      category: "임장",
      title: "홍대입구역 임장",
      description: "젊음의 거리 홍대, 창업 전 꼭 확인해야 할 입지 포인트",
      bgColor: "from-gray-700 to-gray-800",
      imageUrl: "👩‍💼",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#101828] mb-2">
            오프라인 임장 🚶‍♂️
          </h1>
          <p className="text-base text-gray-600">
            전문가와 함께하는 현장 답사
          </p>
        </div>

        {/* 임장 프로그램 카드 그리드 */}
        <div className="grid grid-cols-1 gap-4">
          {programs.map((program) => (
            <button
              key={program.id}
              className="text-left group"
            >
              <div className={`bg-gradient-to-br ${program.bgColor} rounded-2xl p-6 pb-4 relative overflow-hidden`}>
                {/* 카드 상단 콘텐츠 */}
                <div className="relative z-10 mb-4">
                  <div className="text-xs text-white/80 mb-2">
                    {program.category === "임장" && "★프랜차이즈 / 상권분석 전문가와 함께"}
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">
                    {program.title}
                  </h3>
                </div>

                {/* 강사 사진 영역 */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl border-4 border-white/30">
                    {program.imageUrl}
                  </div>
                </div>
              </div>

              {/* 카드 하단 정보 */}
              <div className="mt-3 px-2">
                <h4 className="text-base font-bold text-[#101828] mb-1">
                  {program.name}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {program.category}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {program.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
