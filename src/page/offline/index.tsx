"use client";

export default function OfflineView() {
  // 예시 오프라인 프로그램 데이터
  const programs = [
    {
      id: 1,
      title: "실전 입지 분석 컨설팅",
      description: "전문가와 함께하는 1:1 맞춤형 점포 입지 분석",
      price: "300,000원",
      duration: "2시간",
      location: "서울/경기",
      thumbnail: "📍",
      tag: "인기",
    },
    {
      id: 2,
      title: "창업 전략 워크샵",
      description: "성공하는 프랜차이즈 창업 노하우 완벽 정리",
      price: "150,000원",
      duration: "4시간",
      location: "온/오프라인",
      thumbnail: "💼",
      tag: "추천",
    },
    {
      id: 3,
      title: "현장 답사 동행 서비스",
      description: "전문가와 함께 실제 매장을 방문하여 분석",
      price: "500,000원",
      duration: "반나절",
      location: "전국",
      thumbnail: "🚗",
      tag: "프리미엄",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            오프라인 컨설팅
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            전문가와 함께하는 실전 창업 컨설팅
          </p>
        </div>

        {/* 프로그램 리스트 */}
        <div className="space-y-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex gap-4">
                {/* 썸네일 */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-4xl md:text-5xl flex-shrink-0">
                  {program.thumbnail}
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {program.tag}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 font-medium mb-3">
                    <span>⏱️ {program.duration}</span>
                    <span>•</span>
                    <span>📍 {program.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-black text-blue-600">
                      {program.price}
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 md:px-6 rounded-xl transition-colors text-sm md:text-base">
                      문의하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 상담 신청 */}
        <div className="mt-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-xl">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-3">
            무료 상담 신청하기
          </h3>
          <p className="text-sm md:text-base text-blue-50 mb-6 font-medium">
            어떤 서비스가 필요하신지 상담해드립니다
          </p>
          <button className="bg-white text-blue-600 font-black py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors text-base md:text-lg">
            카카오톡 상담
          </button>
        </div>

        {/* 안내 */}
        <div className="mt-6 bg-white rounded-2xl md:rounded-3xl p-6 shadow-md">
          <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3">
            💡 서비스 안내
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>모든 컨설팅은 10년 이상 경력의 전문가가 진행합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>맞춤형 리포트와 상세 분석 자료를 제공합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>사후 1개월 무료 피드백 서비스를 제공합니다</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
