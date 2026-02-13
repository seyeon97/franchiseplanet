"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ColumnView() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 체크
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleColumnClick = (columnId: number) => {
    if (!isLoggedIn) {
      // 로그인 필요 알림
      if (confirm("칼럼을 읽으려면 로그인이 필요합니다. 로그인 하시겠습니까?")) {
        router.push("/login");
      }
      return;
    }
    // 로그인된 경우 칼럼 상세 페이지로 이동
    alert("칼럼 상세 페이지 (준비중)");
  };

  // 예시 칼럼 데이터
  const columns = [
    {
      id: 1,
      title: "2024년 프랜차이즈 창업 트렌드 분석",
      category: "시장분석",
      date: "2024.02.13",
      thumbnail: "📊",
      summary: "최근 프랜차이즈 시장의 주요 트렌드와 성공 전략을 분석합니다.",
      isNew: true,
    },
    {
      id: 2,
      title: "메가커피 가맹점, 성공하는 입지 조건은?",
      category: "브랜드분석",
      date: "2024.02.10",
      thumbnail: "☕",
      summary: "메가커피 상위 10% 매장의 공통점을 파악했습니다.",
      isNew: true,
    },
    {
      id: 3,
      title: "프랜차이즈 창업, 실패하는 3가지 이유",
      category: "창업가이드",
      date: "2024.02.05",
      thumbnail: "⚠️",
      summary: "창업 실패 사례를 통해 배우는 성공 전략",
      isNew: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            이슈 칼럼
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            프랜차이즈 시장의 최신 이슈와 인사이트
          </p>
        </div>

        {/* 칼럼 리스트 */}
        <div className="space-y-4">
          {columns.map((column) => (
            <article
              key={column.id}
              onClick={() => handleColumnClick(column.id)}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex gap-4">
                {/* 썸네일 */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
                  {column.thumbnail}
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {column.category}
                    </span>
                    {column.isNew && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                    {column.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2 line-clamp-2">
                    {column.summary}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400 font-medium">
                    {column.date}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 준비중 안내 */}
        <div className="mt-8 bg-white rounded-2xl md:rounded-3xl p-6 text-center shadow-md">
          <div className="text-5xl mb-3">📝</div>
          <p className="text-base md:text-lg font-bold text-gray-900 mb-2">
            더 많은 칼럼이 준비 중입니다
          </p>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            프랜차이즈 창업에 도움되는 다양한 콘텐츠를 준비하고 있어요
          </p>
        </div>
      </div>
    </div>
  );
}
