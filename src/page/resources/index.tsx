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

  // 카테고리
  const categories = [
    { id: "all", label: "전체", icon: "📑" },
    { id: "market", label: "시장분석", icon: "📊" },
    { id: "checklist", label: "체크리스트", icon: "✅" },
    { id: "contract", label: "계약서", icon: "📋" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  // 예시 자료 데이터
  const resources = [
    {
      id: 1,
      title: "프랜차이즈 시장 분석 보고서",
      description: "2024년 최신 트렌드와 성장 전망",
      type: "PDF",
      size: "2.5MB",
      downloads: 1240,
      views: 17400,
      rating: 4.8,
      reviews: 284,
      date: "2024.02.13",
      thumbnail: "📊",
      bgColor: "from-blue-400 to-blue-500",
      category: "market",
      badge: "62% 특가",
      badgeColor: "bg-red-500",
      provider: "프차플래닛 리서치",
    },
    {
      id: 2,
      title: "카페 창업 입지 선정 가이드",
      description: "상권 분석, 임대차 계약, 주요 체크리스트",
      type: "PDF",
      size: "1.8MB",
      downloads: 856,
      views: 8560,
      rating: 4.5,
      reviews: 142,
      date: "2024.02.10",
      thumbnail: "☕",
      bgColor: "from-amber-400 to-orange-500",
      category: "checklist",
      badge: null,
      badgeColor: null,
      provider: "창업 컨설팅",
    },
    {
      id: 3,
      title: "프랜차이즈 계약서 검토 가이드",
      description: "계약 전 반드시 확인할 필수 항목 정리",
      type: "PDF",
      size: "3.2MB",
      downloads: 2103,
      views: 21030,
      rating: 4.9,
      reviews: 512,
      date: "2024.02.05",
      thumbnail: "📋",
      bgColor: "from-green-400 to-emerald-500",
      category: "contract",
      badge: "추천",
      badgeColor: "bg-blue-500",
      provider: "법률 자문팀",
    },
    {
      id: 4,
      title: "치킨 프랜차이즈 수익성 분석",
      description: "매출 구조, 비용 분석, 손익 시뮬레이션",
      type: "PDF",
      size: "2.1MB",
      downloads: 654,
      views: 4410,
      rating: 4.3,
      reviews: 89,
      date: "2024.02.01",
      thumbnail: "🍗",
      bgColor: "from-yellow-400 to-amber-500",
      category: "market",
      badge: "57% 특가",
      badgeColor: "bg-red-500",
      provider: "업종 분석팀",
    },
    {
      id: 5,
      title: "편의점 창업 완벽 가이드",
      description: "점포 선정부터 운영 노하우까지 총정리",
      type: "PDF",
      size: "4.5MB",
      downloads: 1890,
      views: 18900,
      rating: 4.7,
      reviews: 356,
      date: "2024.01.28",
      thumbnail: "🏪",
      bgColor: "from-purple-400 to-purple-500",
      category: "checklist",
      badge: "인기",
      badgeColor: "bg-red-500",
      provider: "편의점 전문가",
    },
    {
      id: 6,
      title: "가맹점주 권리 보호 안내서",
      description: "분쟁 해결 절차 및 법적 권리 종합 가이드",
      type: "PDF",
      size: "1.9MB",
      downloads: 432,
      views: 4320,
      rating: 4.6,
      reviews: 78,
      date: "2024.01.25",
      thumbnail: "⚖️",
      bgColor: "from-gray-400 to-gray-500",
      category: "contract",
      badge: null,
      badgeColor: null,
      provider: "법률 상담소",
    },
  ];

  const filteredResources =
    selectedCategory === "all"
      ? resources
      : resources.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-4">
          <h1 className="text-2xl font-black text-gray-900 mb-4">
            자료실
          </h1>

          {/* 카테고리 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 자료 카드 그리드 */}
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2.5">
            {filteredResources.map((resource) => (
              <button
                key={resource.id}
                onClick={() => handleDownload(resource.id, resource.title)}
                className="bg-white rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
              >
                {/* 썸네일 영역 */}
                <div
                  className={`relative aspect-square bg-gradient-to-br ${resource.bgColor} flex items-center justify-center overflow-hidden`}
                >
                  {/* 큰 이모지 썸네일 */}
                  <span className="text-7xl opacity-90">{resource.thumbnail}</span>

                  {/* 할인/배지 */}
                  {resource.badge && (
                    <div
                      className={`absolute top-2 left-2 ${resource.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md`}
                    >
                      {resource.badge}
                    </div>
                  )}
                </div>

                {/* 정보 영역 */}
                <div className="p-2.5 text-left">
                  {/* 제목 */}
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5 line-clamp-2 leading-tight min-h-[2.5rem]">
                    {resource.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-snug">
                    {resource.description}
                  </p>

                  {/* 통계 */}
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
                    <div className="flex items-center gap-0.5">
                      <span className="text-xs">👁</span>
                      <span className="font-medium">
                        {resource.views >= 10000
                          ? `${(resource.views / 10000).toFixed(1)}만`
                          : `${(resource.views / 1000).toFixed(1)}k`}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="text-xs">⭐</span>
                      <span className="font-medium">{resource.rating.toFixed(1)}</span>
                      <span className="text-gray-400">({resource.reviews})</span>
                    </div>
                  </div>

                  {/* 제공자 */}
                  <div className="text-xs text-gray-400 truncate">
                    {resource.provider}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 결과 없음 */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-lg font-bold text-gray-900 mb-2">
                자료가 없습니다
              </p>
              <p className="text-sm text-gray-500">
                다른 카테고리를 선택해보세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
