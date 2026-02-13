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
      title: "2024 프랜차이즈 시장 분석 보고서",
      description: "최신 트렌드와 성장 전망 분석",
      type: "PDF",
      size: "2.5MB",
      downloads: 1240,
      views: 3500,
      rating: 4.8,
      date: "2024.02.13",
      thumbnail: "📊",
      bgColor: "from-blue-50 to-blue-100",
      category: "market",
      badge: "인기",
      badgeColor: "bg-red-500",
    },
    {
      id: 2,
      title: "카페 프랜차이즈 입지 선정 가이드",
      description: "상권 분석부터 임대차 계약까지",
      type: "PDF",
      size: "1.8MB",
      downloads: 856,
      views: 2100,
      rating: 4.5,
      date: "2024.02.10",
      thumbnail: "☕",
      bgColor: "from-amber-50 to-orange-100",
      category: "checklist",
      badge: null,
      badgeColor: null,
    },
    {
      id: 3,
      title: "프랜차이즈 계약서 검토 체크리스트",
      description: "계약 전 반드시 확인할 필수 항목",
      type: "PDF",
      size: "3.2MB",
      downloads: 2103,
      views: 5200,
      rating: 4.9,
      date: "2024.02.05",
      thumbnail: "📋",
      bgColor: "from-green-50 to-emerald-100",
      category: "contract",
      badge: "추천",
      badgeColor: "bg-blue-500",
    },
    {
      id: 4,
      title: "치킨 프랜차이즈 수익성 분석",
      description: "매출 구조와 비용 상세 분석",
      type: "PDF",
      size: "2.1MB",
      downloads: 654,
      views: 1800,
      rating: 4.3,
      date: "2024.02.01",
      thumbnail: "🍗",
      bgColor: "from-yellow-50 to-amber-100",
      category: "market",
      badge: null,
      badgeColor: null,
    },
    {
      id: 5,
      title: "편의점 창업 완벽 가이드",
      description: "점포 선정부터 운영 노하우까지",
      type: "PDF",
      size: "4.5MB",
      downloads: 1890,
      views: 4200,
      rating: 4.7,
      date: "2024.01.28",
      thumbnail: "🏪",
      bgColor: "from-purple-50 to-purple-100",
      category: "checklist",
      badge: "인기",
      badgeColor: "bg-red-500",
    },
    {
      id: 6,
      title: "가맹점주 권리 보호 안내서",
      description: "분쟁 해결 및 법적 권리 총정리",
      type: "PDF",
      size: "1.9MB",
      downloads: 432,
      views: 1200,
      rating: 4.6,
      date: "2024.01.25",
      thumbnail: "⚖️",
      bgColor: "from-gray-50 to-gray-100",
      category: "contract",
      badge: null,
      badgeColor: null,
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
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredResources.map((resource) => (
              <button
                key={resource.id}
                onClick={() => handleDownload(resource.id, resource.title)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                {/* 썸네일 영역 */}
                <div
                  className={`relative aspect-square bg-gradient-to-br ${resource.bgColor} flex items-center justify-center`}
                >
                  <span className="text-6xl">{resource.thumbnail}</span>

                  {/* 배지 */}
                  {resource.badge && (
                    <div
                      className={`absolute top-2 left-2 ${resource.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-lg`}
                    >
                      {resource.badge}
                    </div>
                  )}
                </div>

                {/* 정보 영역 */}
                <div className="p-3 text-left">
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {resource.description}
                  </p>

                  {/* 통계 */}
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-0.5">
                      <span>👁</span>
                      <span>{(resource.views / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span>⭐</span>
                      <span>{resource.rating}</span>
                    </div>
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
