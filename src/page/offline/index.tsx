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
              className="text-left group bg-gray-900 rounded-2xl overflow-hidden"
            >
              {/* 카드 상단 - 그라데이션 영역 */}
              <div className={`bg-gradient-to-br ${program.bgColor} p-6 pb-12 relative`}>
                <div className="text-xs text-white/90 mb-2">
                  ★프랜차이즈 / 상권분석 전문가와 함께
                </div>
                <h3 className="text-2xl font-black text-white leading-tight">
                  {program.title}
                </h3>

                {/* 강사 사진 - 카드 하단으로 걸쳐지도록 */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-5xl border-4 border-gray-900">
                    {program.imageUrl}
                  </div>
                </div>
              </div>

              {/* 카드 하단 정보 */}
              <div className="pt-14 pb-6 px-6 text-center">
                <h4 className="text-lg font-bold text-white mb-1">
                  {program.name}
                </h4>
                <p className="text-sm text-gray-400 mb-3">
                  {program.category}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
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
