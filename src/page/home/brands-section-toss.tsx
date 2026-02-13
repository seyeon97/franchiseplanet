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
  const [showAllBrands, setShowAllBrands] = useState(false);

  // 인기 브랜드 TOP3
  const topBrands = brands.slice(0, 3);

  // 검색 필터링
  const filteredBrands = brands.filter((brand) => {
    const query = searchQuery.toLowerCase();
    return (
      brand.name.toLowerCase().includes(query) ||
      brand.category.toLowerCase().includes(query)
    );
  });

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 md:px-6 md:py-20 snap-start">
      <div className="max-w-2xl mx-auto">
        {/* 헤딩 - 토스 스타일 */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">
          어떤 브랜드가
          <br />
          궁금하세요?
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-medium">
          인기 브랜드를 선택하거나 검색해보세요
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
        </div>

        {/* 검색 중일 때만 검색 결과 표시 */}
        {searchQuery ? (
          <>
            <p className="mb-4 text-sm md:text-base text-gray-500 font-medium">
              검색결과 {filteredBrands.length}개
            </p>
            {filteredBrands.length > 0 ? (
              <div className="space-y-2">
                {filteredBrands.map((brand, index) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      onBrandClick(brand.id);
                      setSearchQuery("");
                    }}
                    className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-400 w-6">
                        {index + 1}
                      </span>
                      {brand.logoImage ? (
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={brand.logoImage}
                            alt={brand.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                          style={{ backgroundColor: `${brand.color}15` }}
                        >
                          {brand.logo}
                        </div>
                      )}
                      <div className="text-left">
                        <h3 className="text-base font-bold text-gray-900">
                          {brand.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {brand.category}
                        </p>
                      </div>
                    </div>
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
          </>
        ) : (
          <>
            {/* 전체 브랜드 보기 버튼 */}
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="w-full bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all flex items-center justify-between mb-6"
            >
              <div className="text-left">
                <p className="text-base md:text-lg font-bold text-gray-900">
                  {showAllBrands ? "전체 브랜드 접기" : "전체 브랜드 보기"}
                </p>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  {brands.length}개의 브랜드
                </p>
              </div>
              <svg
                className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform ${
                  showAllBrands ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* 전체 브랜드 리스트 */}
            {showAllBrands && (
              <div
                className="mb-6 -mx-4 px-4 overflow-x-auto"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div className="flex flex-nowrap gap-3 pb-2">
                  {brands.map((brand, index) => (
                    <button
                      key={brand.id}
                      onClick={() => onBrandClick(brand.id)}
                      className="flex-shrink-0 w-32 bg-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
                    >
                      <span className="text-xs font-bold text-gray-400">
                        {index + 1}
                      </span>
                      {brand.logoImage ? (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={brand.logoImage}
                            alt={brand.name}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${brand.color}15` }}
                        >
                          {brand.logo}
                        </div>
                      )}
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-gray-900 truncate w-full">
                          {brand.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium truncate w-full">
                          {brand.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 인기 브랜드 TOP3 */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                인기 브랜드 TOP3
              </h3>
              <div className="space-y-3">
                {topBrands.map((brand, index) => (
                  <button
                    key={brand.id}
                    onClick={() => onBrandClick(brand.id)}
                    className={`w-full bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 flex items-center gap-4 transition-all duration-300 ${
                      selectedBrandId === brand.id
                        ? "shadow-xl scale-[1.02] ring-2 ring-blue-500"
                        : "shadow-md hover:shadow-lg hover:scale-[1.01]"
                    }`}
                  >
                    {/* TOP3 배지 */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-black text-xl md:text-2xl">
                        {index + 1}
                      </span>
                    </div>

                    {/* 로고 */}
                    {brand.logoImage ? (
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={brand.logoImage}
                          alt={brand.name}
                          className="w-12 h-12 md:w-14 md:h-14 object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl flex-shrink-0"
                        style={{ backgroundColor: `${brand.color}15` }}
                      >
                        {brand.logo}
                      </div>
                    )}

                    {/* 브랜드 정보 */}
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {brand.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500 font-medium">
                        {brand.category}
                      </p>
                    </div>

                    {/* 화살표 */}
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0"
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
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
