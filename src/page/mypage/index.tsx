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
      iconType: "column",
    },
    {
      id: 2,
      type: "자료실",
      title: "카페 프랜차이즈 입지 선정 체크리스트",
      date: "2024.02.10",
      iconType: "document",
    },
    {
      id: 3,
      type: "관심브랜드",
      title: "메가커피 매출 정보",
      date: "2024.02.08",
      iconType: "star",
    },
  ];

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "column":
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="gradient-column" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                <stop offset="100%" style={{ stopColor: '#00C896' }} />
              </linearGradient>
            </defs>
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="url(#gradient-column)" strokeWidth="2" fill="url(#gradient-column)" fillOpacity="0.1" />
            <path d="M7 7H17M7 11H17M7 15H13" stroke="url(#gradient-column)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "document":
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="gradient-document" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                <stop offset="100%" style={{ stopColor: '#00C896' }} />
              </linearGradient>
            </defs>
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="url(#gradient-document)" />
            <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 13H16M8 17H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "star":
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="gradient-star" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                <stop offset="100%" style={{ stopColor: '#00C896' }} />
              </linearGradient>
            </defs>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#gradient-star)" />
          </svg>
        );
      default:
        return null;
    }
  };

  const stats = [
    { label: "조회한 브랜드", value: "12개", iconType: "store" },
    { label: "다운로드 자료", value: "5개", iconType: "download" },
    { label: "관심 브랜드", value: "3개", iconType: "heart" },
  ];

  const renderStatIcon = (type: string) => {
    switch (type) {
      case "store":
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="gradient-store" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                <stop offset="100%" style={{ stopColor: '#00C896' }} />
              </linearGradient>
            </defs>
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="url(#gradient-store)" strokeWidth="2" fill="url(#gradient-store)" fillOpacity="0.1" />
            <path d="M9 22V12H15V22" stroke="url(#gradient-store)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "download":
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="gradient-download" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                <stop offset="100%" style={{ stopColor: '#00C896' }} />
              </linearGradient>
            </defs>
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="url(#gradient-download)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10L12 15L17 10" stroke="url(#gradient-download)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15V3" stroke="url(#gradient-download)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "heart":
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="gradient-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3182F6' }} />
                <stop offset="100%" style={{ stopColor: '#00C896' }} />
              </linearGradient>
            </defs>
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.2225 22.4518 8.5C22.4518 7.7775 22.3095 7.06211 22.0329 6.39464C21.7564 5.72718 21.351 5.12084 20.84 4.61Z" fill="url(#gradient-heart)" />
          </svg>
        );
      default:
        return null;
    }
  };

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
                <div className="flex justify-center mb-2">{renderStatIcon(stat.iconType)}</div>
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center flex-shrink-0">
                      {renderActivityIcon(activity.iconType)}
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
