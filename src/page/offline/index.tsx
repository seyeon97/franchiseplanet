"use client";

export default function OfflineView() {
  // 예시 멘토 데이터
  const mentors = [
    {
      id: 1,
      name: "박종훈 소장",
      category: "재테크",
      title: "박종훈의 경제토토락",
      description: "박종훈의 지식탐방 구독자 여러 분들을 환영합니다.",
      bgColor: "from-blue-600 to-blue-700",
      imageUrl: "👨‍💼", // 실제로는 강사 사진 URL
    },
    {
      id: 2,
      name: "부업남 - 바이엄",
      category: "재테크",
      title: "부업남 - 바이엄",
      description: "부동산 고인이 해결되는 공간, 바이엄",
      bgColor: "from-purple-600 to-indigo-600",
      imageUrl: "👨‍💼",
    },
    {
      id: 3,
      name: "안우창 교수",
      category: "재테크",
      title: "시대인 인사이트",
      description: "경제에 투자를 쉽게 풀어주는 안우창 교수님의 페이지에 오...",
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
            대표 멘토 👨‍🏫
          </h1>
          <p className="text-base text-gray-600">
            나의 투자멘토를 만나보세요
          </p>
        </div>

        {/* 멘토 카드 그리드 */}
        <div className="grid grid-cols-1 gap-4">
          {mentors.map((mentor) => (
            <button
              key={mentor.id}
              className="text-left group"
            >
              <div className={`bg-gradient-to-br ${mentor.bgColor} rounded-2xl p-6 pb-4 relative overflow-hidden`}>
                {/* 카드 상단 콘텐츠 */}
                <div className="relative z-10 mb-4">
                  <div className="text-xs text-white/80 mb-2">
                    {mentor.category === "재테크" && "★재테크 / 경제/금융 전문가 인사이트"}
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">
                    {mentor.title}
                  </h3>
                </div>

                {/* 강사 사진 영역 */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl border-4 border-white/30">
                    {mentor.imageUrl}
                  </div>
                </div>
              </div>

              {/* 카드 하단 정보 */}
              <div className="mt-3 px-2">
                <h4 className="text-base font-bold text-[#101828] mb-1">
                  {mentor.name}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {mentor.category}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {mentor.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
