"use client";

import { useRouter } from "next/navigation";

export default function MoreView() {
  const router = useRouter();

  const menuItems = [
    {
      id: "mypage",
      title: "마이페이지",
      description: "내 정보 및 활동 내역",
      icon: "👤",
      path: "/mypage",
    },
    {
      id: "offline",
      title: "오프라인 컨설팅",
      description: "전문가 상담 및 입지 분석",
      icon: "📍",
      path: "/offline",
    },
    {
      id: "bookmark",
      title: "관심 브랜드",
      description: "저장한 브랜드 모아보기",
      icon: "⭐",
      path: "/bookmark",
    },
    {
      id: "notification",
      title: "알림 설정",
      description: "새로운 칼럼 및 자료 알림",
      icon: "🔔",
      path: "/settings/notification",
    },
    {
      id: "inquiry",
      title: "문의하기",
      description: "1:1 문의 및 제휴 문의",
      icon: "💬",
      path: "/inquiry",
    },
    {
      id: "about",
      title: "서비스 소개",
      description: "프차플래닛 이용 안내",
      icon: "ℹ️",
      path: "/about",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            더보기
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            다양한 서비스와 설정을 확인하세요
          </p>
        </div>

        {/* 메뉴 리스트 */}
        <div className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="w-full bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition-all"
            >
              {/* 아이콘 */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
                {item.icon}
              </div>

              {/* 텍스트 */}
              <div className="flex-1 text-left min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 font-medium">
                  {item.description}
                </p>
              </div>

              {/* 화살표 */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0"
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
            </button>
          ))}
        </div>

        {/* 버전 정보 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 font-medium">
            프차플래닛 v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
