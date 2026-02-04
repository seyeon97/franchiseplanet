"use client";

import { useState } from "react";
import BrandDetailBreakdown from "./brand-detail-breakdown";

interface BrandData {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoImage?: string;
  color: string;
  startupCost: string;
  stats: {
    top10: {
      revenue: number;
      cost: number;
      profit: number;
    };
    average: {
      revenue: number;
      cost: number;
      profit: number;
    };
    bottom10: {
      revenue: number;
      cost: number;
      profit: number;
    };
  };
  description: string;
}

interface BrandCardProps {
  brand: BrandData;
}

export default function BrandCard({ brand }: BrandCardProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const isMegaCoffee = brand.name === "메가커피";
  const totalPages = isMegaCoffee ? 2 : 1;

  const formatMoney = (amount: number) => {
    if (amount >= 10000) {
      return `${(amount / 10000).toFixed(1)}억원`;
    }
    return `${amount.toLocaleString()}만원`;
  };

  const maxRevenue = Math.max(
    brand.stats.top10.revenue,
    brand.stats.average.revenue,
    brand.stats.bottom10.revenue
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className="relative min-h-screen snap-start flex items-center justify-center p-6"
      style={{
        background: `linear-gradient(135deg, ${brand.color}22 0%, ${brand.color}44 100%)`,
      }}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{ aspectRatio: "9/16" }}
        >
          {/* Page Content */}
          <div className="relative h-full">
            {currentPage === 0 ? (
              <>
          {/* Header with Logo */}
          <div
            className="relative h-28 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${brand.color}dd 0%, ${brand.color} 100%)`,
            }}
          >
            {/* Logo */}
            {brand.logoImage ? (
              <img
                src={brand.logoImage}
                alt={`${brand.name} logo`}
                className="h-20 object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="text-7xl drop-shadow-2xl">{brand.logo}</div>
            )}

            {/* Category badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800">
              {brand.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Brand name */}
            {brand.name === "메가커피" ? (
              <div className="mb-3">
                <div
                  className="inline-block px-5 py-1.5 relative"
                  style={{
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, ${brand.color}11 0%, #FFB36611 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      borderRadius: "16px",
                      padding: "2px",
                      background: `linear-gradient(135deg, ${brand.color} 0%, #FFB366 100%)`,
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      boxShadow: `0 0 25px ${brand.color}bb, 0 0 40px ${brand.color}88, 0 0 60px ${brand.color}55`,
                    }}
                  ></div>
                  <h2
                    className="text-xl font-black relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${brand.color} 0%, #FFB366 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: `drop-shadow(0 0 15px ${brand.color}99) drop-shadow(0 0 25px ${brand.color}77)`,
                    }}
                  >
                    {brand.name}
                  </h2>
                </div>
              </div>
            ) : (
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  color: brand.color,
                }}
              >
                {brand.name}
              </h2>
            )}

            {/* Startup Cost */}
            <div className="mb-3 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-700 font-semibold">
                💰 창업비용: {brand.startupCost}
              </p>
            </div>

            <p className="text-gray-600 text-sm mb-6">{brand.description}</p>

            {/* Stats */}
            <div className="space-y-4">
              {/* Top 10% */}
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-green-700">
                    상위 10%
                  </span>
                  <span className="text-lg font-black text-green-600">
                    {formatMoney(brand.stats.top10.profit)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">매출</div>
                    <div className="font-semibold text-gray-700">
                      {formatMoney(brand.stats.top10.revenue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">비용</div>
                    <div className="font-semibold text-gray-700">
                      {formatMoney(brand.stats.top10.cost)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">순이익</div>
                    <div className="font-semibold text-green-600">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Average */}
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700">
                    평균 50%
                  </span>
                  <span className="text-lg font-black text-blue-600">
                    {formatMoney(brand.stats.average.profit)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">매출</div>
                    <div className="font-semibold text-gray-700">
                      {formatMoney(brand.stats.average.revenue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">비용</div>
                    <div className="font-semibold text-gray-700">
                      {formatMoney(brand.stats.average.cost)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">순이익</div>
                    <div className="font-semibold text-blue-600">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 10% */}
              <div className="bg-orange-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-orange-700">
                    하위 10%
                  </span>
                  <span className="text-lg font-black text-orange-600">
                    {formatMoney(brand.stats.bottom10.profit)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">매출</div>
                    <div className="font-semibold text-gray-700">
                      {formatMoney(brand.stats.bottom10.revenue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">비용</div>
                    <div className="font-semibold text-gray-700">
                      {formatMoney(brand.stats.bottom10.cost)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">순이익</div>
                    <div className="font-semibold text-orange-600">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer - Moved below stats */}
            <div className="mt-6">
              <div
                className="relative overflow-hidden rounded-2xl p-5 border-2"
                style={{
                  background: `linear-gradient(135deg, ${brand.color}08 0%, ${brand.color}15 100%)`,
                  borderColor: `${brand.color}40`,
                }}
              >
                <div
                  className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20"
                  style={{
                    background: `radial-gradient(circle, ${brand.color} 0%, transparent 70%)`,
                  }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="text-xl mt-0.5">💡</div>
                    <div className="flex-1">
                      <h4
                        className="text-sm font-bold mb-3"
                        style={{ color: brand.color }}
                      >
                        알아두세요
                      </h4>
                      <div className="space-y-2.5 text-xs text-gray-700 leading-relaxed">
                        <p>• 사장님 하루 10시간 / 주5일 이상 출근 기준</p>
                        <p>• 월세, 인건비, 배달 비중에 따라 순수익 차이 발생</p>
                        <p>• 이자비용 및 각종 세금 미포함</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
              </>
            ) : (
              <BrandDetailBreakdown brandName={brand.name} color={brand.color} />
            )}
          </div>

          {/* Navigation Buttons */}
          {isMegaCoffee && (
            <>
              {/* Page Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentPage === idx
                        ? "bg-white w-6"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Previous Button */}
              {currentPage > 0 && (
                <button
                  onClick={handlePrevPage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              {/* Next Button */}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={handleNextPage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
