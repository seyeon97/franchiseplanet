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
              {/* Top 10% - Gold Medal */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-2xl border-2" style={{
                background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)",
                borderColor: "#F59E0B",
                boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3), 0 0 20px rgba(251, 191, 36, 0.4)",
              }}>
                {/* Sparkle effects */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>

                <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full opacity-20" style={{
                  background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
                }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl relative" style={{
                      background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
                    }}>
                      <span className="text-2xl">🥇</span>
                      <div className="absolute inset-0 rounded-full" style={{
                        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.2)",
                      }}></div>
                    </div>
                    <div>
                      <span className="text-lg font-black bg-gradient-to-r from-yellow-700 to-orange-600 bg-clip-text text-transparent">
                        GOLD
                      </span>
                      <div className="text-xs font-bold text-yellow-700">상위 10%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-yellow-700 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent" style={{
                      filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))",
                    }}>
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(245, 158, 11, 0.3)",
                  }}>
                    <div className="text-xs text-yellow-700 mb-1 font-bold group-hover:text-yellow-600 transition-colors">💰 매출</div>
                    <div className="font-black text-yellow-800 text-sm group-hover:text-yellow-600 transition-colors">
                      {formatMoney(brand.stats.top10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(245, 158, 11, 0.3)",
                  }}>
                    <div className="text-xs text-yellow-700 mb-1 font-bold group-hover:text-yellow-600 transition-colors">💸 비용</div>
                    <div className="font-black text-yellow-800 text-sm group-hover:text-yellow-600 transition-colors">
                      {formatMoney(brand.stats.top10.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl group" style={{
                    background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
                    border: "2px solid #FBBF24",
                  }}>
                    <div className="text-xs text-yellow-900 mb-1 font-black group-hover:text-yellow-800 transition-colors">✨ 수익</div>
                    <div className="font-black text-yellow-900 text-sm group-hover:text-yellow-800 transition-colors">
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

              {/* Average - Silver Medal */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-2xl border-2" style={{
                background: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 50%, #CBD5E1 100%)",
                borderColor: "#94A3B8",
                boxShadow: "0 10px 40px rgba(148, 163, 184, 0.3), 0 0 20px rgba(203, 213, 225, 0.4)",
              }}>
                {/* Sparkle effects */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-slate-300 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-slate-300 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>

                <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full opacity-20" style={{
                  background: "radial-gradient(circle, #94A3B8 0%, transparent 70%)",
                }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl relative" style={{
                      background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)",
                    }}>
                      <span className="text-2xl">🥈</span>
                      <div className="absolute inset-0 rounded-full" style={{
                        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.2)",
                      }}></div>
                    </div>
                    <div>
                      <span className="text-lg font-black bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
                        SILVER
                      </span>
                      <div className="text-xs font-bold text-slate-600">평균 50%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-600 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 bg-clip-text text-transparent" style={{
                      filter: "drop-shadow(0 2px 4px rgba(148, 163, 184, 0.3))",
                    }}>
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(148, 163, 184, 0.3)",
                  }}>
                    <div className="text-xs text-slate-600 mb-1 font-bold group-hover:text-slate-500 transition-colors">💰 매출</div>
                    <div className="font-black text-slate-700 text-sm group-hover:text-slate-500 transition-colors">
                      {formatMoney(brand.stats.average.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(148, 163, 184, 0.3)",
                  }}>
                    <div className="text-xs text-slate-600 mb-1 font-bold group-hover:text-slate-500 transition-colors">💸 비용</div>
                    <div className="font-black text-slate-700 text-sm group-hover:text-slate-500 transition-colors">
                      {formatMoney(brand.stats.average.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl group" style={{
                    background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)",
                    border: "2px solid #CBD5E1",
                  }}>
                    <div className="text-xs text-slate-700 mb-1 font-black group-hover:text-slate-600 transition-colors">✨ 수익</div>
                    <div className="font-black text-slate-800 text-sm group-hover:text-slate-700 transition-colors">
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

              {/* Bottom 10% - Bronze Medal */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-2xl border-2" style={{
                background: "linear-gradient(135deg, #FEF3E2 0%, #FDE6C5 50%, #E7AD77 100%)",
                borderColor: "#CD7F32",
                boxShadow: "0 10px 40px rgba(205, 127, 50, 0.3), 0 0 20px rgba(231, 173, 119, 0.4)",
              }}>
                {/* Sparkle effects */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-200 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-orange-200 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>

                <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full opacity-20" style={{
                  background: "radial-gradient(circle, #CD7F32 0%, transparent 70%)",
                }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl relative" style={{
                      background: "linear-gradient(135deg, #E7AD77 0%, #CD7F32 100%)",
                    }}>
                      <span className="text-2xl">🥉</span>
                      <div className="absolute inset-0 rounded-full" style={{
                        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.2)",
                      }}></div>
                    </div>
                    <div>
                      <span className="text-lg font-black bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                        BRONZE
                      </span>
                      <div className="text-xs font-bold text-amber-800">하위 10%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-amber-700 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 bg-clip-text text-transparent" style={{
                      filter: "drop-shadow(0 2px 4px rgba(205, 127, 50, 0.3))",
                    }}>
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(205, 127, 50, 0.3)",
                  }}>
                    <div className="text-xs text-amber-700 mb-1 font-bold group-hover:text-amber-600 transition-colors">💰 매출</div>
                    <div className="font-black text-amber-800 text-sm group-hover:text-amber-600 transition-colors">
                      {formatMoney(brand.stats.bottom10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(205, 127, 50, 0.3)",
                  }}>
                    <div className="text-xs text-amber-700 mb-1 font-bold group-hover:text-amber-600 transition-colors">💸 비용</div>
                    <div className="font-black text-amber-800 text-sm group-hover:text-amber-600 transition-colors">
                      {formatMoney(brand.stats.bottom10.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl group" style={{
                    background: "linear-gradient(135deg, #E7AD77 0%, #CD7F32 100%)",
                    border: "2px solid #D4955A",
                  }}>
                    <div className="text-xs text-amber-900 mb-1 font-black group-hover:text-amber-800 transition-colors">✨ 수익</div>
                    <div className="font-black text-amber-900 text-sm group-hover:text-amber-800 transition-colors">
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
