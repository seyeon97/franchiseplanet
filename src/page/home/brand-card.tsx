"use client";

import { useState } from "react";

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
  const [expandedTop10Variable, setExpandedTop10Variable] = useState(false);
  const [expandedTop10Fixed, setExpandedTop10Fixed] = useState(false);
  const [expandedAverageVariable, setExpandedAverageVariable] = useState(false);
  const [expandedAverageFixed, setExpandedAverageFixed] = useState(false);
  const [expandedBottom10Variable, setExpandedBottom10Variable] = useState(false);
  const [expandedBottom10Fixed, setExpandedBottom10Fixed] = useState(false);
  const isMegaCoffee = brand.name === "메가커피";

  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()}만원`;
  };

  const maxRevenue = Math.max(
    brand.stats.top10.revenue,
    brand.stats.average.revenue,
    brand.stats.bottom10.revenue
  );

  // 변동비 데이터 (메가커피 전용)
  const variableCosts = {
    top10: [
      { label: "원가율 (36%)", amount: 2880 },
      { label: "카드수수료 (1.5%)", amount: 120 },
      { label: "배달수수료 (30%)", amount: 480 },
      { label: "플랫폼수수료 (5%)", amount: 320 },
      { label: "수도광열비 (2%)", amount: 160 },
      { label: "인건비 (21~25%)", amount: 1680 },
    ],
    average: [
      { label: "원가율 (36%)", amount: 1281.6 },
      { label: "카드수수료 (1.5%)", amount: 53.4 },
      { label: "배달수수료 (30%)", amount: 213.6 },
      { label: "플랫폼수수료 (5%)", amount: 142.4 },
      { label: "수도광열비 (2%)", amount: 71.2 },
      { label: "인건비 (21~25%)", amount: 783.2 },
    ],
    bottom10: [
      { label: "원가율 (36%)", amount: 720 },
      { label: "카드수수료 (1.5%)", amount: 30 },
      { label: "배달수수료 (30%)", amount: 120 },
      { label: "플랫폼수수료 (5%)", amount: 80 },
      { label: "수도광열비 (2%)", amount: 40 },
      { label: "인건비 (21~25%)", amount: 500 },
    ],
  };

  // 고정비 데이터 (메가커피 전용)
  const fixedCosts = {
    top10: [
      { label: "임대료", amount: 385 },
      { label: "관리비", amount: 38.5 },
      { label: "광고비", amount: 10 },
      { label: "정기 서비스", amount: 30 },
      { label: "소모품비", amount: 30 },
      { label: "로열티", amount: 16.5 },
    ],
    average: [
      { label: "임대료", amount: 220 },
      { label: "관리비", amount: 22 },
      { label: "광고비", amount: 10 },
      { label: "정기 서비스", amount: 30 },
      { label: "소모품비", amount: 30 },
      { label: "로열티", amount: 16.5 },
    ],
    bottom10: [
      { label: "임대료", amount: 352 },
      { label: "관리비", amount: 30 },
      { label: "광고비", amount: 10 },
      { label: "정기 서비스", amount: 30 },
      { label: "소모품비", amount: 30 },
      { label: "로열티", amount: 16.5 },
    ],
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
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: "calc(100vh - 3rem)" }}
        >
          {/* Header with Logo */}
          <div
            className="relative h-28 flex items-center justify-center flex-shrink-0"
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

          {/* Content - Scrollable */}
          <div className="p-6 overflow-y-auto flex-1">
            {/* Brand name */}
            <h2
              className="text-3xl font-black mb-4"
              style={{
                color: brand.color,
              }}
            >
              {brand.name}
            </h2>

            {/* Startup Cost */}
            <div className="mb-4 p-4 rounded-2xl relative overflow-hidden" style={{
              background: `linear-gradient(135deg, ${brand.color}15, ${brand.color}08)`,
            }}>
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10" style={{
                background: brand.color,
              }}></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                  background: `linear-gradient(135deg, ${brand.color}30, ${brand.color}20)`,
                }}>
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">초기 투자</p>
                  <p className="text-sm font-bold" style={{ color: brand.color }}>
                    {brand.startupCost}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{brand.description}</p>

            {/* Stats */}
            <div className="space-y-4">
              {/* Top 10% */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-lg border border-green-100" style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              }}>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 bg-green-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-black">🏆</span>
                    </div>
                    <span className="text-sm font-black text-green-700">
                      상위 10%
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-600 font-medium mb-0.5">월 순수익</div>
                    <div className="text-xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl group">
                    <div className="text-xs text-gray-500 mb-1 font-medium group-hover:text-green-100 transition-colors">💰 매출</div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-white transition-colors">
                      {formatMoney(brand.stats.top10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl group">
                    <div className="text-xs text-gray-500 mb-1 font-medium group-hover:text-green-100 transition-colors">💸 비용</div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-white transition-colors">
                      {formatMoney(brand.stats.top10.cost)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2.5 shadow-md cursor-pointer transition-all duration-300 hover:scale-110 hover:from-white hover:to-white hover:shadow-xl group">
                    <div className="text-xs text-green-100 mb-1 font-medium group-hover:text-gray-500 transition-colors">✨ 수익</div>
                    <div className="font-bold text-white text-sm group-hover:text-gray-800 transition-colors">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 10% Breakdown - Only for MegaCoffee */}
              {isMegaCoffee && (
                <div className="space-y-3">
                  {/* Variable Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-green-200/50">
                    <button
                      onClick={() => setExpandedTop10Variable(!expandedTop10Variable)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-green-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">📊</span>
                        </div>
                        <span className="text-sm font-bold text-green-700">
                          변동비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center transition-transform ${
                        expandedTop10Variable ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedTop10Variable && (
                      <div className="px-4 pb-4 border-t border-green-100/50 bg-gradient-to-b from-green-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {variableCosts.top10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-green-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-green-200/50">
                    <button
                      onClick={() => setExpandedTop10Fixed(!expandedTop10Fixed)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-green-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">🏢</span>
                        </div>
                        <span className="text-sm font-bold text-green-700">
                          고정비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center transition-transform ${
                        expandedTop10Fixed ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedTop10Fixed && (
                      <div className="px-4 pb-4 border-t border-green-100/50 bg-gradient-to-b from-green-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.top10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-green-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Average */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-lg border border-blue-100" style={{
                background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              }}>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 bg-blue-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-black">📊</span>
                    </div>
                    <span className="text-sm font-black text-blue-700">
                      평균 50%
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-600 font-medium mb-0.5">월 순수익</div>
                    <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:shadow-xl group">
                    <div className="text-xs text-gray-500 mb-1 font-medium group-hover:text-blue-100 transition-colors">💰 매출</div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-white transition-colors">
                      {formatMoney(brand.stats.average.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:shadow-xl group">
                    <div className="text-xs text-gray-500 mb-1 font-medium group-hover:text-blue-100 transition-colors">💸 비용</div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-white transition-colors">
                      {formatMoney(brand.stats.average.cost)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2.5 shadow-md cursor-pointer transition-all duration-300 hover:scale-110 hover:from-white hover:to-white hover:shadow-xl group">
                    <div className="text-xs text-blue-100 mb-1 font-medium group-hover:text-gray-500 transition-colors">✨ 수익</div>
                    <div className="font-bold text-white text-sm group-hover:text-gray-800 transition-colors">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Average Breakdown - Only for MegaCoffee */}
              {isMegaCoffee && (
                <div className="space-y-3">
                  {/* Variable Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-blue-200/50">
                    <button
                      onClick={() => setExpandedAverageVariable(!expandedAverageVariable)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-blue-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">📊</span>
                        </div>
                        <span className="text-sm font-bold text-blue-700">
                          변동비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center transition-transform ${
                        expandedAverageVariable ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedAverageVariable && (
                      <div className="px-4 pb-4 border-t border-blue-100/50 bg-gradient-to-b from-blue-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {variableCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-blue-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-blue-200/50">
                    <button
                      onClick={() => setExpandedAverageFixed(!expandedAverageFixed)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-blue-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">🏢</span>
                        </div>
                        <span className="text-sm font-bold text-blue-700">
                          고정비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center transition-transform ${
                        expandedAverageFixed ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedAverageFixed && (
                      <div className="px-4 pb-4 border-t border-blue-100/50 bg-gradient-to-b from-blue-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-blue-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom 10% */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-lg border border-orange-100" style={{
                background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
              }}>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 bg-orange-500"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-black">📉</span>
                    </div>
                    <span className="text-sm font-black text-orange-700">
                      하위 10%
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-orange-600 font-medium mb-0.5">월 순수익</div>
                    <div className="text-xl font-black bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-orange-600 hover:shadow-xl group">
                    <div className="text-xs text-gray-500 mb-1 font-medium group-hover:text-orange-100 transition-colors">💰 매출</div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-white transition-colors">
                      {formatMoney(brand.stats.bottom10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-orange-600 hover:shadow-xl group">
                    <div className="text-xs text-gray-500 mb-1 font-medium group-hover:text-orange-100 transition-colors">💸 비용</div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-white transition-colors">
                      {formatMoney(brand.stats.bottom10.cost)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2.5 shadow-md cursor-pointer transition-all duration-300 hover:scale-110 hover:from-white hover:to-white hover:shadow-xl group">
                    <div className="text-xs text-orange-100 mb-1 font-medium group-hover:text-gray-500 transition-colors">✨ 수익</div>
                    <div className="font-bold text-white text-sm group-hover:text-gray-800 transition-colors">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 10% Breakdown - Only for MegaCoffee */}
              {isMegaCoffee && (
                <div className="space-y-3">
                  {/* Variable Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-orange-200/50">
                    <button
                      onClick={() => setExpandedBottom10Variable(!expandedBottom10Variable)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-orange-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">📊</span>
                        </div>
                        <span className="text-sm font-bold text-orange-700">
                          변동비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center transition-transform ${
                        expandedBottom10Variable ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedBottom10Variable && (
                      <div className="px-4 pb-4 border-t border-orange-100/50 bg-gradient-to-b from-orange-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {variableCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-orange-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-orange-200/50">
                    <button
                      onClick={() => setExpandedBottom10Fixed(!expandedBottom10Fixed)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-orange-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">🏢</span>
                        </div>
                        <span className="text-sm font-bold text-orange-700">
                          고정비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center transition-transform ${
                        expandedBottom10Fixed ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedBottom10Fixed && (
                      <div className="px-4 pb-4 border-t border-orange-100/50 bg-gradient-to-b from-orange-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-orange-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer - Moved below stats */}
            <div className="mt-6 mb-6">
              <div
                className="relative overflow-hidden rounded-2xl p-5 shadow-lg border"
                style={{
                  background: `linear-gradient(135deg, ${brand.color}10 0%, ${brand.color}05 100%)`,
                  borderColor: `${brand.color}30`,
                }}
              >
                <div
                  className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full opacity-5"
                  style={{
                    background: brand.color,
                  }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md" style={{
                      background: `linear-gradient(135deg, ${brand.color}40, ${brand.color}30)`,
                    }}>
                      <span className="text-xl">💡</span>
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-sm font-black mb-3"
                        style={{ color: brand.color }}
                      >
                        알아두세요
                      </h4>
                      <div className="space-y-2.5">
                        {[
                          "사장님 하루 10시간 / 주5일 이상 출근 기준",
                          "월세, 인건비, 배달 비중에 따라 순수익 차이 발생",
                          "이자비용 및 각종 세금 미포함",
                        ].map((text, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{
                              background: brand.color,
                            }}></div>
                            <p className="text-xs leading-relaxed text-gray-700 font-medium">
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
