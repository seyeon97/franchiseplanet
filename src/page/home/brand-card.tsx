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
              {/* Top 10% - Peaceful Green Planet */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-2xl border-2 group cursor-pointer transition-all duration-500 hover:scale-[1.02]" style={{
                background: "linear-gradient(135deg, #FEF9C3 0%, #FDE68A 30%, #D1FAE5 70%, #A7F3D0 100%)",
                borderColor: "#10B981",
                boxShadow: "0 10px 40px rgba(16, 185, 129, 0.3), 0 0 20px rgba(167, 243, 208, 0.4)",
              }}>
                {/* Stars and sparkles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full" style={{
                  animation: "glow-pulse 2s ease-in-out infinite",
                }}></div>
                <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
                <div className="absolute top-6 left-10 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse" style={{ animationDelay: "0.9s" }}></div>

                {/* Peaceful green planet with animation */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-40 transition-all duration-500 group-hover:opacity-50" style={{
                  background: "radial-gradient(circle at 30% 30%, #FDE68A 0%, #10B981 20%, #059669 50%, #047857 100%)",
                  boxShadow: "inset -10px -10px 30px rgba(0,0,0,0.3), 0 0 50px rgba(16, 185, 129, 0.4)",
                  animation: "spin-slow 60s linear infinite",
                }}></div>

                {/* Tree/plant effects */}
                <div className="absolute bottom-8 right-8 text-2xl" style={{ animation: "float 3s ease-in-out infinite" }}>🌳</div>
                <div className="absolute bottom-14 right-16 text-xl" style={{ animation: "float 3s ease-in-out infinite", animationDelay: "0.5s" }}>🌸</div>
                <div className="absolute bottom-6 right-14 text-sm" style={{ animation: "float 3s ease-in-out infinite", animationDelay: "1s" }}>🌿</div>

                {/* Cloud effects with animation */}
                <div className="absolute bottom-10 right-10 w-12 h-6 bg-white/50 rounded-full blur-sm" style={{ animation: "float 4s ease-in-out infinite" }}></div>
                <div className="absolute bottom-12 right-16 w-10 h-5 bg-white/40 rounded-full blur-sm" style={{ animation: "float 4s ease-in-out infinite", animationDelay: "0.5s" }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
                      <img
                        src="/planet-winner.png"
                        alt="일등 행성"
                        className="w-full h-full object-cover"
                        style={{
                          filter: "drop-shadow(0 4px 8px rgba(16, 185, 129, 0.5))",
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                        일등
                      </span>
                      <div className="text-xs font-bold text-green-700">상위 10%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-700 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 bg-clip-text text-transparent" style={{
                      filter: "drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))",
                    }}>
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(16, 185, 129, 0.3)",
                  }}>
                    <div className="text-xs text-green-700 mb-1 font-bold group-hover:text-green-600 transition-colors">💰 매출</div>
                    <div className="font-black text-green-800 text-sm group-hover:text-green-600 transition-colors">
                      {formatMoney(brand.stats.top10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(16, 185, 129, 0.3)",
                  }}>
                    <div className="text-xs text-green-700 mb-1 font-bold group-hover:text-green-600 transition-colors">💸 비용</div>
                    <div className="font-black text-green-800 text-sm group-hover:text-green-600 transition-colors">
                      {formatMoney(brand.stats.top10.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl group" style={{
                    background: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
                    border: "2px solid #10B981",
                  }}>
                    <div className="text-xs text-white mb-1 font-black group-hover:text-green-50 transition-colors">✨ 수익</div>
                    <div className="font-black text-white text-sm group-hover:text-green-50 transition-colors">
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

              {/* Average - Moon-like Yellow Planet */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-2xl border-2 group cursor-pointer transition-all duration-500 hover:scale-[1.02]" style={{
                background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #EAB308 100%)",
                borderColor: "#CA8A04",
                boxShadow: "0 10px 40px rgba(202, 138, 4, 0.3), 0 0 20px rgba(253, 224, 71, 0.4)",
              }}>
                {/* Dust particles */}
                <div className="absolute top-4 right-4 w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-8 right-10 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-10 left-12 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: "0.5s" }}></div>

                {/* Yellow moon-like planet with rotation */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-35 transition-all duration-500 group-hover:opacity-45" style={{
                  background: "radial-gradient(circle at 30% 30%, #FDE68A 0%, #EAB308 40%, #CA8A04 100%)",
                  boxShadow: "inset -10px -10px 30px rgba(0,0,0,0.3), 0 0 40px rgba(234, 179, 8, 0.3)",
                  animation: "spin-slow 90s linear infinite",
                }}></div>

                {/* Crater effects - scattered */}
                <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-amber-800/30 blur-[2px]"></div>
                <div className="absolute bottom-14 right-16 w-6 h-6 rounded-full bg-amber-800/25 blur-[2px]"></div>
                <div className="absolute bottom-10 right-20 w-4 h-4 rounded-full bg-amber-800/20 blur-[1px]"></div>
                <div className="absolute bottom-16 right-12 w-3 h-3 rounded-full bg-amber-800/20 blur-[1px]"></div>

                {/* Cloud effects with animation */}
                <div className="absolute bottom-10 right-10 w-14 h-7 bg-white/40 rounded-full blur-sm" style={{ animation: "float 5s ease-in-out infinite" }}></div>
                <div className="absolute bottom-12 right-16 w-12 h-6 bg-white/35 rounded-full blur-sm" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "0.5s" }}></div>
                <div className="absolute top-10 left-8 w-10 h-5 bg-white/30 rounded-full blur-sm" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                      <img
                        src="/planet-middle.png"
                        alt="중간 행성"
                        className="w-full h-full object-cover"
                        style={{
                          filter: "drop-shadow(0 4px 8px rgba(100, 116, 139, 0.5))",
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xl font-black bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                        중간
                      </span>
                      <div className="text-xs font-bold text-slate-600">평균 50%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-600 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 bg-clip-text text-transparent" style={{
                      filter: "drop-shadow(0 2px 4px rgba(100, 116, 139, 0.3))",
                    }}>
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(100, 116, 139, 0.3)",
                  }}>
                    <div className="text-xs text-slate-600 mb-1 font-bold group-hover:text-slate-500 transition-colors">💰 매출</div>
                    <div className="font-black text-slate-700 text-sm group-hover:text-slate-600 transition-colors">
                      {formatMoney(brand.stats.average.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(100, 116, 139, 0.3)",
                  }}>
                    <div className="text-xs text-slate-600 mb-1 font-bold group-hover:text-slate-500 transition-colors">💸 비용</div>
                    <div className="font-black text-slate-700 text-sm group-hover:text-slate-600 transition-colors">
                      {formatMoney(brand.stats.average.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl group" style={{
                    background: "linear-gradient(135deg, #94A3B8 0%, #64748B 100%)",
                    border: "2px solid #64748B",
                  }}>
                    <div className="text-xs text-white mb-1 font-black group-hover:text-slate-100 transition-colors">✨ 수익</div>
                    <div className="font-black text-white text-sm group-hover:text-slate-100 transition-colors">
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

              {/* Bottom 10% - Exploding Red/Brown Planet */}
              <div className="relative overflow-hidden rounded-2xl p-5 shadow-2xl border-2 group cursor-pointer transition-all duration-500 hover:scale-[1.02]" style={{
                background: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 30%, #FCA5A5 70%, #7C2D12 100%)",
                borderColor: "#EF4444",
                boxShadow: "0 10px 40px rgba(239, 68, 68, 0.4), 0 0 30px rgba(252, 165, 165, 0.5)",
                animation: "shake 0.5s ease-in-out infinite",
              }}>
                {/* Explosion sparks with glow */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse" style={{
                  boxShadow: "0 0 15px rgba(251, 146, 60, 1), 0 0 25px rgba(251, 146, 60, 0.5)",
                }}></div>
                <div className="absolute top-8 right-12 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{
                  animationDelay: "0.2s",
                  boxShadow: "0 0 12px rgba(250, 204, 21, 1), 0 0 20px rgba(250, 204, 21, 0.5)",
                }}></div>
                <div className="absolute bottom-6 left-6 w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse" style={{
                  animationDelay: "0.4s",
                  boxShadow: "0 0 15px rgba(248, 113, 113, 1), 0 0 25px rgba(248, 113, 113, 0.5)",
                }}></div>
                <div className="absolute top-12 left-8 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{
                  animationDelay: "0.6s",
                  boxShadow: "0 0 12px rgba(249, 115, 22, 1), 0 0 20px rgba(249, 115, 22, 0.5)",
                }}></div>

                {/* Exploding planet with brown crust and lava cracks */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-40 transition-all duration-500 group-hover:opacity-50" style={{
                  background: "radial-gradient(circle at 35% 35%, #FBBF24 0%, #F97316 15%, #DC2626 30%, #7C2D12 60%, #451A03 100%)",
                  boxShadow: "inset -15px -15px 40px rgba(0,0,0,0.6), 0 0 60px rgba(239, 68, 68, 0.6)",
                }}></div>

                {/* Lava cracks pattern */}
                <div className="absolute bottom-8 right-8 w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-[1px]" style={{ transform: "rotate(45deg)" }}></div>
                <div className="absolute bottom-12 right-10 w-16 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-[1px]" style={{ transform: "rotate(-30deg)" }}></div>
                <div className="absolute bottom-10 right-16 w-12 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-[1px]" style={{ transform: "rotate(60deg)" }}></div>

                {/* Flying debris */}
                <div className="absolute top-6 right-8 w-3 h-3 bg-amber-900 rounded-sm opacity-70" style={{ animation: "float 2s ease-in-out infinite" }}></div>
                <div className="absolute top-10 right-14 w-2 h-2 bg-stone-800 rounded-sm opacity-60" style={{ animation: "float 2s ease-in-out infinite", animationDelay: "0.3s" }}></div>
                <div className="absolute bottom-14 left-10 w-2.5 h-2.5 bg-amber-900 rounded-sm opacity-70" style={{ animation: "float 2s ease-in-out infinite", animationDelay: "0.6s" }}></div>

                {/* Explosion rays with glow */}
                <div className="absolute bottom-10 right-10 w-16 h-1 bg-orange-400/60 blur-sm rotate-45" style={{
                  boxShadow: "0 0 10px rgba(251, 146, 60, 0.8)",
                  animation: "glow-pulse 1.5s ease-in-out infinite",
                }}></div>
                <div className="absolute bottom-12 right-8 w-12 h-1 bg-red-400/60 blur-sm -rotate-45" style={{
                  boxShadow: "0 0 10px rgba(248, 113, 113, 0.8)",
                  animation: "glow-pulse 1.5s ease-in-out infinite",
                  animationDelay: "0.3s",
                }}></div>
                <div className="absolute bottom-8 right-14 w-10 h-1 bg-yellow-400/60 blur-sm rotate-12" style={{
                  boxShadow: "0 0 10px rgba(250, 204, 21, 0.8)",
                  animation: "glow-pulse 1.5s ease-in-out infinite",
                  animationDelay: "0.6s",
                }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative" style={{
                      background: "linear-gradient(135deg, #FCA5A5 0%, #DC2626 100%)",
                    }}>
                      <span className="text-3xl">💥</span>
                      <div className="absolute inset-0 rounded-full" style={{
                        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(239, 68, 68, 0.5)",
                      }}></div>
                    </div>
                    <div>
                      <span className="text-xl font-black bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent">
                        꼴등
                      </span>
                      <div className="text-xs font-bold text-red-700">하위 10%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-red-700 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-red-500 bg-clip-text text-transparent" style={{
                      filter: "drop-shadow(0 2px 4px rgba(239, 68, 68, 0.4))",
                    }}>
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(239, 68, 68, 0.4)",
                  }}>
                    <div className="text-xs text-red-700 mb-1 font-bold group-hover:text-red-600 transition-colors">💰 매출</div>
                    <div className="font-black text-red-800 text-sm group-hover:text-red-600 transition-colors">
                      {formatMoney(brand.stats.bottom10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl group" style={{
                    border: "1.5px solid rgba(239, 68, 68, 0.4)",
                  }}>
                    <div className="text-xs text-red-700 mb-1 font-bold group-hover:text-red-600 transition-colors">💸 비용</div>
                    <div className="font-black text-red-800 text-sm group-hover:text-red-600 transition-colors">
                      {formatMoney(brand.stats.bottom10.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl group" style={{
                    background: "linear-gradient(135deg, #FCA5A5 0%, #DC2626 100%)",
                    border: "2px solid #EF4444",
                    boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
                  }}>
                    <div className="text-xs text-white mb-1 font-black group-hover:text-red-50 transition-colors">✨ 수익</div>
                    <div className="font-black text-white text-sm group-hover:text-red-50 transition-colors">
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
