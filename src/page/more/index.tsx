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
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="px-4 pt-12 pb-8 md:px-6 md:pt-16 md:pb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">
            전체
          </h1>
        </div>

        {/* 메뉴 리스트 - 토스 스타일 */}
        <div>
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="w-full px-4 md:px-6 py-5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {/* 왼쪽: 아이콘 + 텍스트 */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-base md:text-lg font-bold text-gray-900">
                  {item.title}
                </span>
              </div>

              {/* 오른쪽: 화살표 */}
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* 버전 정보 */}
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-gray-400 font-medium">
            프차플래닛 v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
