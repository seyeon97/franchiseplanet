"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPageView() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // 로그인 상태 체크
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail") || "";

    if (!loggedIn) {
      // 로그인 안 되어 있으면 로그인 페이지로
      router.push("/login");
      return;
    }

    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      router.push("/");
    }
  };

  // 예시 사용자 데이터
  const user = {
    name: userEmail.split("@")[0] || "사용자",
    email: userEmail,
    joinDate: "2024.01.15",
    avatar: "👤",
  };

  const activities = [
    {
      id: 1,
      type: "칼럼",
      title: "2024년 프랜차이즈 창업 트렌드 분석",
      date: "2024.02.13",
      icon: "📰",
    },
    {
      id: 2,
      type: "자료실",
      title: "카페 프랜차이즈 입지 선정 체크리스트",
      date: "2024.02.10",
      icon: "📄",
    },
    {
      id: 3,
      type: "관심브랜드",
      title: "메가커피 매출 정보",
      date: "2024.02.08",
      icon: "⭐",
    },
  ];

  const stats = [
    { label: "조회한 브랜드", value: "12개", icon: "🏪" },
    { label: "다운로드 자료", value: "5개", icon: "📥" },
    { label: "관심 브랜드", value: "3개", icon: "💖" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 배경 */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-4">
            {/* 프로필 이미지 */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center text-5xl md:text-6xl shadow-xl">
              {user.avatar}
            </div>

            {/* 사용자 정보 */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
                {user.name}
              </h1>
              <p className="text-sm md:text-base text-blue-100 font-medium mb-2">
                {user.email}
              </p>
              <p className="text-xs md:text-sm text-blue-200 font-medium">
                가입일: {user.joinDate}
              </p>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="px-4 md:px-6 -mt-8">
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
                <div className="text-xl md:text-2xl font-black text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-8 md:px-6 md:py-12">
          {/* 최근 활동 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4">
              최근 활동
            </h2>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mb-1">
                        {activity.type}
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                        {activity.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 font-medium">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 계정 관리 */}
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4">
              계정 관리
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-white rounded-2xl p-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all">
                <span className="text-base md:text-lg font-bold text-gray-900">
                  프로필 수정
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
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

              <button className="w-full bg-white rounded-2xl p-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all">
                <span className="text-base md:text-lg font-bold text-gray-900">
                  비밀번호 변경
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
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

              <button
                onClick={handleLogout}
                className="w-full bg-white rounded-2xl p-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all"
              >
                <span className="text-base md:text-lg font-bold text-red-600">
                  로그아웃
                </span>
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
