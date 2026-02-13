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

  const featuredResource = filteredResources[0];
  const otherResources = filteredResources.slice(1);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
          <h1 className="text-2xl font-black text-gray-900 mb-4">
            자료실
          </h1>

          {/* 카테고리 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4">
          {/* Featured Post */}
          {featuredResource && (
            <div className="py-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                FEATURED POST
              </p>
              <button
                onClick={() =>
                  handleDownload(featuredResource.id, featuredResource.title)
                }
                className="w-full"
              >
                {/* Featured 이미지 */}
                <div
                  className={`relative w-full aspect-[4/3] bg-gradient-to-br ${featuredResource.bgColor} rounded-3xl overflow-hidden mb-4`}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 w-full h-3/4 flex items-center justify-center">
                      <span className="text-7xl">{featuredResource.thumbnail}</span>
                    </div>
                  </div>
                  {featuredResource.badge && (
                    <div
                      className={`absolute top-4 left-4 ${featuredResource.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
                    >
                      {featuredResource.badge}
                    </div>
                  )}
                </div>

                {/* Featured 정보 */}
                <div className="text-left">
                  <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                    {featuredResource.title}
                  </h2>
                  <p className="text-base text-gray-600 mb-2">
                    {featuredResource.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    {featuredResource.date}
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* 나머지 자료 그리드 - 2열 */}
          {otherResources.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pb-6">
              {otherResources.map((resource) => (
                <button
                  key={resource.id}
                  onClick={() => handleDownload(resource.id, resource.title)}
                  className="text-left"
                >
                  {/* 카드 이미지 */}
                  <div
                    className={`relative aspect-square bg-gradient-to-br ${resource.bgColor} rounded-2xl overflow-hidden mb-2.5`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 w-full h-3/4 flex items-center justify-center">
                        <span className="text-5xl">{resource.thumbnail}</span>
                      </div>
                    </div>
                    {resource.badge && (
                      <div
                        className={`absolute top-2.5 left-2.5 ${resource.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md`}
                      >
                        {resource.badge}
                      </div>
                    )}
                  </div>

                  {/* 카드 정보 */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Trend report</p>
                    <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">
                      {resource.description}
                    </p>
                    <p className="text-xs text-gray-400">{resource.date}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

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
