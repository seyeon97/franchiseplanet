"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResourcesView() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 체크
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleDownload = (resourceId: number, title: string) => {
    if (!isLoggedIn) {
      // 로그인 필요 알림
      if (confirm("자료를 다운로드하려면 로그인이 필요합니다. 로그인 하시겠습니까?")) {
        router.push("/login");
      }
      return;
    }
    // 로그인된 경우 다운로드 처리
    alert(`"${title}" 다운로드를 시작합니다 (준비중)`);
  };

  // 예시 자료 데이터
  const resources = [
    {
      id: 1,
      title: "2024 프랜차이즈 시장 분석 보고서",
      type: "PDF",
      size: "2.5MB",
      downloads: 1240,
      date: "2024.02.13",
      icon: "📄",
      isFree: true,
    },
    {
      id: 2,
      title: "카페 프랜차이즈 입지 선정 체크리스트",
      type: "PDF",
      size: "1.8MB",
      downloads: 856,
      date: "2024.02.10",
      icon: "✅",
      isFree: true,
    },
    {
      id: 3,
      title: "프랜차이즈 계약서 검토 가이드",
      type: "PDF",
      size: "3.2MB",
      downloads: 2103,
      date: "2024.02.05",
      icon: "📋",
      isFree: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            무료 자료실
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            창업에 도움되는 시장 분석 자료를 무료로 다운로드하세요
          </p>
        </div>

        {/* 자료 리스트 */}
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                {/* 아이콘 */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
                  {resource.icon}
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                    {resource.isFree && (
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        무료
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 font-medium mb-3">
                    <span>용량: {resource.size}</span>
                    <span>•</span>
                    <span>다운로드: {resource.downloads.toLocaleString()}회</span>
                  </div>
                  <button
                    onClick={() => handleDownload(resource.id, resource.title)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors"
                  >
                    다운로드
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 준비중 안내 */}
        <div className="mt-8 bg-white rounded-2xl md:rounded-3xl p-6 text-center shadow-md">
          <div className="text-5xl mb-3">📚</div>
          <p className="text-base md:text-lg font-bold text-gray-900 mb-2">
            더 많은 자료가 준비 중입니다
          </p>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            실전 창업에 도움되는 다양한 자료를 지속적으로 업데이트할 예정입니다
          </p>
        </div>
      </div>
    </div>
  );
}
