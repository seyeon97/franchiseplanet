"use client";

import { useState } from "react";

interface Brand {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoImage?: string;
  color: string;
  startupCost: string;
  stats: {
    top10: { revenue: number; cost: number; profit: number };
    average: { revenue: number; cost: number; profit: number };
    bottom10: { revenue: number; cost: number; profit: number };
  };
  description: string;
}

interface BrandsSectionTossProps {
  brands: Brand[];
  onBrandClick: (brandId: string) => void;
  selectedBrandId: string | null;
}

export default function BrandsSectionToss({
  brands,
  onBrandClick,
  selectedBrandId,
}: BrandsSectionTossProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 필터링
  const filteredBrands = brands.filter((brand) => {
    const query = searchQuery.toLowerCase();
    return (
      brand.name.toLowerCase().includes(query) ||
      brand.category.toLowerCase().includes(query)
    );
  });

  return (
    <section className="min-h-screen snap-start bg-gray-50 px-4 py-12 md:px-6 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤딩 - 토스 스타일 */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">
          어떤 브랜드가
          <br />
          궁금하세요?
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-medium">
          브랜드를 선택하면 실제 매출 정보를 볼 수 있어요
        </p>

        {/* 검색창 - 토스 스타일 */}
        <div className="mb-6 md:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="브랜드명 또는 카테고리 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-2xl md:rounded-3xl px-5 md:px-6 py-4 md:py-5 text-base md:text-lg font-medium text-gray-900 placeholder-gray-400 shadow-md focus:shadow-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
              >
                ✕
              </button>
            ) : (
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm md:text-base text-gray-500 font-medium">
              {filteredBrands.length}개 브랜드 찾음
            </p>
          )}
        </div>

        {/* 브랜드 그리드 - 많은 브랜드에 최적화 */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {filteredBrands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onBrandClick(brand.id)}
              className={`bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center text-center transition-all duration-300 ${
                selectedBrandId === brand.id
                  ? "shadow-xl scale-[1.05] ring-2 ring-blue-500"
                  : "shadow-md hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              {/* 로고 */}
              {brand.logoImage ? (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden mb-3 flex-shrink-0">
                  <img
                    src={brand.logoImage}
                    alt={brand.name}
                    className="w-14 h-14 md:w-16 md:h-16 object-contain"
                  />
                </div>
              ) : (
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-3 flex-shrink-0"
                  style={{ backgroundColor: `${brand.color}15` }}
                >
                  {brand.logo}
                </div>
              )}

              {/* 브랜드명 */}
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {brand.name}
              </h3>

              {/* 카테고리 */}
              <p className="text-xs md:text-sm text-gray-500 font-medium mb-2 line-clamp-1">
                {brand.category}
              </p>

              {/* 창업비용 */}
              <div className="text-xs md:text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {brand.startupCost}
              </div>
            </button>
          ))}
        </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <div className="text-6xl md:text-7xl mb-4">🔍</div>
            <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              검색 결과가 없습니다
            </p>
            <p className="text-sm md:text-base text-gray-500 font-medium">
              다른 검색어를 입력해보세요
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
