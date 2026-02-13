"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoreView() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail") || "";

    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, [router]);

  const quickMenus = [
    {
      id: "mypage",
      title: "마이페이지",
      icon: "👤",
      bgColor: "bg-teal-500",
      path: "/mypage",
    },
    {
      id: "column",
      title: "칼럼",
      icon: "📰",
      bgColor: "bg-orange-500",
      path: "/column",
    },
    {
      id: "resources",
      title: "자료실",
      icon: "📁",
      bgColor: "bg-blue-600",
      path: "/resources",
    },
    {
      id: "offline",
      title: "오프라인",
      icon: "📍",
      bgColor: "bg-gray-700",
      path: "/offline",
    },
  ];

  const serviceMenus = [
    {
      id: "account",
      title: "계정 설정",
      subtitle: "프로필 · 알림 설정",
      icon: "⚙️",
      iconBg: "bg-blue-100",
      path: "/settings",
    },
    {
      id: "bookmark",
      title: "내 자산",
      subtitle: "관심 브랜드 · 저장한 칼럼",
      icon: "💼",
      iconBg: "bg-blue-100",
      path: "/bookmark",
    },
    {
      id: "consulting",
      title: "전문가 상담",
      subtitle: "입지 분석 · 컨설팅 예약",
      icon: "💡",
      iconBg: "bg-green-100",
      path: "/consulting",
    },
    {
      id: "inquiry",
      title: "고객센터",
      subtitle: "문의 · 제휴 · 공지사항",
      icon: "💬",
      iconBg: "bg-cyan-100",
      path: "/inquiry",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-2xl mx-auto">
        {/* 프로필 영역 */}
        <div className="px-4 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 프로필 이미지 */}
              <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
              {/* 사용자 정보 */}
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  {isLoggedIn ? "프차플래닛 회원" : "로그인이 필요합니다"}
                </h2>
                <p className="text-sm text-gray-500 font-medium mt-0.5">
                  {isLoggedIn ? userEmail : "로그인 후 이용하세요"}
                </p>
              </div>
            </div>
            {/* 설정 아이콘 */}
            <button
              onClick={() => router.push("/settings")}
              className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 빠른 메뉴 그리드 */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-4 gap-4">
            {quickMenus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => router.push(menu.path)}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className={`w-16 h-16 ${menu.bgColor} rounded-2xl flex items-center justify-center shadow-sm hover:scale-105 transition-transform`}
                >
                  <span className="text-3xl">{menu.icon}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {menu.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 금융 서비스 섹션 */}
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-lg font-black text-gray-900">금융 서비스</h3>
        </div>

        {/* 서비스 메뉴 리스트 */}
        <div className="mt-2">
          {serviceMenus.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {/* 왼쪽: 아이콘 + 텍스트 */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 ${item.iconBg} rounded-xl flex items-center justify-center`}
                >
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="text-left">
                  <div className="text-base font-bold text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
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
