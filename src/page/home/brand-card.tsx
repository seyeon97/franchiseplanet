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
  const [showTop10Detail, setShowTop10Detail] = useState(false);
  const [showAverageDetail, setShowAverageDetail] = useState(false);
  const [showBottom10Detail, setShowBottom10Detail] = useState(false);
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
              background: "linear-gradient(135deg, #F144BB 0%, #803CFA 50%, #0064FF 100%)",
            }}
          >
            {/* Logo */}
            {brand.logoImage ? (
              <img
                src={brand.logoImage}
                alt={`${brand.name} logo`}
                className="h-14 object-contain"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                }}
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
            {/* Brand name and Startup Cost in one row */}
            <div className="mb-4 flex items-start justify-between gap-4">
              {/* Brand name */}
              <div className="inline-block relative">
                <h2
                  className="text-2xl font-bold px-5 py-2.5 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #F144BB 0%, #803CFA 50%, #0064FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {brand.name}
                </h2>
                {/* Gradient border box */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, #F144BB 0%, #803CFA 50%, #0064FF 100%)",
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    boxShadow: "0 0 15px rgba(241, 68, 187, 0.4), 0 0 25px rgba(128, 60, 250, 0.3)",
                  }}
                />
              </div>

              {/* Startup Cost */}
              <div className="p-3 rounded-2xl relative overflow-hidden flex-shrink-0" style={{
                background: `linear-gradient(135deg, ${brand.color}15, ${brand.color}08)`,
              }}>
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10" style={{
                  background: brand.color,
                }}></div>
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{
                    background: `linear-gradient(135deg, ${brand.color}30, ${brand.color}20)`,
                  }}>
                    <span className="text-lg">💳</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-0.5">
                      초기 투자 <span className="text-gray-400">(보증금을 제외한 추정 창업비용)</span>
                    </p>
                    <p className="text-sm font-bold" style={{ color: brand.color }}>
                      {brand.startupCost}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              {/* Top 10% - Peaceful Green Planet */}
              <div
                onClick={() => isMegaCoffee && setShowTop10Detail(!showTop10Detail)}
                className="relative overflow-hidden rounded-2xl p-5 shadow-lg border group cursor-pointer transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #FEF9C3 0%, #FDE68A 30%, #D1FAE5 70%, #A7F3D0 100%)",
                  borderColor: "#10B981",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15), 0 0 20px rgba(91, 72, 255, 0.15)",
                }}>
                {/* Signature color accent - subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                  boxShadow: "inset 0 0 0 2px rgba(91, 72, 255, 0.4), 0 0 25px rgba(91, 72, 255, 0.25)",
                }}></div>
                {/* Content wrapper */}
                <div className="relative z-10">

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
                      <img
                        src="/planet-winner.png"
                        alt="일등 행성"
                        className="w-full h-full object-contain"
                        style={{
                          filter: "drop-shadow(0 4px 8px rgba(16, 185, 129, 0.5))",
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xl font-black text-green-700">
                        일등
                      </span>
                      <div className="text-xs font-bold text-green-600">상위 10%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-700 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black text-green-700">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5" style={{
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}>
                    <div className="text-xs text-gray-600 mb-1 font-medium">💰 매출</div>
                    <div className="font-bold text-gray-800 text-sm">
                      {formatMoney(brand.stats.top10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5" style={{
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}>
                    <div className="text-xs text-gray-600 mb-1 font-medium">💸 비용</div>
                    <div className="font-bold text-gray-800 text-sm">
                      {formatMoney(brand.stats.top10.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 bg-green-600" style={{
                    border: "1px solid #059669",
                  }}>
                    <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                    <div className="font-bold text-white text-sm">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Top 10% Detail Modal - Only for MegaCoffee */}
              {isMegaCoffee && showTop10Detail && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowTop10Detail(false)}>
                  <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-t-3xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl bg-white/20 backdrop-blur-sm">
                            <img
                              src="/planet-winner.png"
                              alt="일등 행성"
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white">일등</h3>
                            <p className="text-sm text-white/80">상위 10% 상세 분석</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowTop10Detail(false)}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          <span className="text-white text-xl">✕</span>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                          <div className="text-xs text-green-600 mb-1 font-semibold">💰 매출</div>
                          <div className="font-black text-green-800 text-lg">
                            {formatMoney(brand.stats.top10.revenue)}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                          <div className="text-xs text-green-600 mb-1 font-semibold">💸 비용</div>
                          <div className="font-black text-green-800 text-lg">
                            {formatMoney(brand.stats.top10.cost)}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 shadow-lg">
                          <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                          <div className="font-black text-white text-lg">
                            {formatMoney(brand.stats.top10.profit)}
                          </div>
                        </div>
                      </div>

                      {/* Breakdown sections */}
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
                    </div>
                  </div>
                </div>
              )}

              {/* Average - Moon-like Yellow Planet */}
              <div
                onClick={() => isMegaCoffee && setShowAverageDetail(!showAverageDetail)}
                className="relative overflow-hidden rounded-2xl p-5 shadow-lg border group cursor-pointer transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #EAB308 100%)",
                  borderColor: "#CA8A04",
                  boxShadow: "0 4px 12px rgba(202, 138, 4, 0.15), 0 0 20px rgba(28, 91, 255, 0.15)",
                }}>
                {/* Signature color accent - subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                  boxShadow: "inset 0 0 0 2px rgba(28, 91, 255, 0.4), 0 0 25px rgba(28, 91, 255, 0.25)",
                }}></div>
                {/* Content wrapper */}
                <div className="relative z-10">

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                      <img
                        src="/planet-middle.png"
                        alt="중간 행성"
                        className="w-full h-full object-contain"
                        style={{
                          filter: "drop-shadow(0 4px 8px rgba(100, 116, 139, 0.5))",
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xl font-black text-slate-700">
                        중간
                      </span>
                      <div className="text-xs font-bold text-slate-600">평균 50%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-700 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black text-slate-700">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5" style={{
                    border: "1px solid rgba(100, 116, 139, 0.2)",
                  }}>
                    <div className="text-xs text-gray-600 mb-1 font-medium">💰 매출</div>
                    <div className="font-bold text-gray-800 text-sm">
                      {formatMoney(brand.stats.average.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5" style={{
                    border: "1px solid rgba(100, 116, 139, 0.2)",
                  }}>
                    <div className="text-xs text-gray-600 mb-1 font-medium">💸 비용</div>
                    <div className="font-bold text-gray-800 text-sm">
                      {formatMoney(brand.stats.average.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 bg-slate-600" style={{
                    border: "1px solid #475569",
                  }}>
                    <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                    <div className="font-bold text-white text-sm">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Average Detail Modal - Only for MegaCoffee */}
              {isMegaCoffee && showAverageDetail && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAverageDetail(false)}>
                  <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-amber-600 p-6 rounded-t-3xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl bg-white/20 backdrop-blur-sm">
                            <img
                              src="/planet-middle.png"
                              alt="중간 행성"
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white">중간</h3>
                            <p className="text-sm text-white/80">평균 50% 상세 분석</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAverageDetail(false)}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          <span className="text-white text-xl">✕</span>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                          <div className="text-xs text-yellow-600 mb-1 font-semibold">💰 매출</div>
                          <div className="font-black text-yellow-800 text-lg">
                            {formatMoney(brand.stats.average.revenue)}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                          <div className="text-xs text-yellow-600 mb-1 font-semibold">💸 비용</div>
                          <div className="font-black text-yellow-800 text-lg">
                            {formatMoney(brand.stats.average.cost)}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl p-4 shadow-lg">
                          <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                          <div className="font-black text-white text-lg">
                            {formatMoney(brand.stats.average.profit)}
                          </div>
                        </div>
                      </div>

                      {/* Breakdown sections */}
                      <div className="space-y-3">
                  {/* Variable Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-yellow-200/50">
                    <button
                      onClick={() => setExpandedAverageVariable(!expandedAverageVariable)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-yellow-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">📊</span>
                        </div>
                        <span className="text-sm font-bold text-yellow-700">
                          변동비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center transition-transform ${
                        expandedAverageVariable ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-yellow-600"
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
                      <div className="px-4 pb-4 border-t border-yellow-100/50 bg-gradient-to-b from-yellow-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {variableCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-yellow-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-yellow-200/50">
                    <button
                      onClick={() => setExpandedAverageFixed(!expandedAverageFixed)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-yellow-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">🏢</span>
                        </div>
                        <span className="text-sm font-bold text-yellow-700">
                          고정비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center transition-transform ${
                        expandedAverageFixed ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-yellow-600"
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
                      <div className="px-4 pb-4 border-t border-yellow-100/50 bg-gradient-to-b from-yellow-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-yellow-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom 10% - Exploding Red/Brown Planet */}
              <div
                onClick={() => isMegaCoffee && setShowBottom10Detail(!showBottom10Detail)}
                className="relative overflow-hidden rounded-2xl p-5 shadow-lg border group cursor-pointer transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 30%, #FCA5A5 70%, #7C2D12 100%)",
                  borderColor: "#EF4444",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15), 0 0 20px rgba(91, 72, 255, 0.15)",
                }}>
                {/* Signature color accent - subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                  boxShadow: "inset 0 0 0 2px rgba(91, 72, 255, 0.4), 0 0 25px rgba(91, 72, 255, 0.25)",
                }}></div>
                {/* Content wrapper */}
                <div className="relative z-10">

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                      <img
                        src="/planet-last.png"
                        alt="꼴등 행성"
                        className="w-full h-full object-contain"
                        style={{
                          filter: "drop-shadow(0 4px 8px rgba(239, 68, 68, 0.5))",
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xl font-black text-red-700">
                        꼴등
                      </span>
                      <div className="text-xs font-bold text-red-600">하위 10%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-red-700 font-bold mb-0.5">월 순수익</div>
                    <div className="text-2xl font-black text-red-700">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5" style={{
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}>
                    <div className="text-xs text-gray-600 mb-1 font-medium">💰 매출</div>
                    <div className="font-bold text-gray-800 text-sm">
                      {formatMoney(brand.stats.bottom10.revenue)}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5" style={{
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}>
                    <div className="text-xs text-gray-600 mb-1 font-medium">💸 비용</div>
                    <div className="font-bold text-gray-800 text-sm">
                      {formatMoney(brand.stats.bottom10.cost)}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 bg-red-600" style={{
                    border: "1px solid #DC2626",
                  }}>
                    <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                    <div className="font-bold text-white text-sm">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Bottom 10% Detail Modal - Only for MegaCoffee */}
              {isMegaCoffee && showBottom10Detail && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBottom10Detail(false)}>
                  <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-red-500 to-rose-600 p-6 rounded-t-3xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl bg-white/20 backdrop-blur-sm">
                            <img
                              src="/planet-last.png"
                              alt="꼴등 행성"
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white">꼴등</h3>
                            <p className="text-sm text-white/80">하위 10% 상세 분석</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowBottom10Detail(false)}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          <span className="text-white text-xl">✕</span>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-200">
                          <div className="text-xs text-red-600 mb-1 font-semibold">💰 매출</div>
                          <div className="font-black text-red-800 text-lg">
                            {formatMoney(brand.stats.bottom10.revenue)}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-200">
                          <div className="text-xs text-red-600 mb-1 font-semibold">💸 비용</div>
                          <div className="font-black text-red-800 text-lg">
                            {formatMoney(brand.stats.bottom10.cost)}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-4 shadow-lg">
                          <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                          <div className="font-black text-white text-lg">
                            {formatMoney(brand.stats.bottom10.profit)}
                          </div>
                        </div>
                      </div>

                      {/* Breakdown sections */}
                      <div className="space-y-3">
                  {/* Variable Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-red-200/50">
                    <button
                      onClick={() => setExpandedBottom10Variable(!expandedBottom10Variable)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-red-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">📊</span>
                        </div>
                        <span className="text-sm font-bold text-red-700">
                          변동비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center transition-transform ${
                        expandedBottom10Variable ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-red-600"
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
                      <div className="px-4 pb-4 border-t border-red-100/50 bg-gradient-to-b from-red-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {variableCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-red-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-red-200/50">
                    <button
                      onClick={() => setExpandedBottom10Fixed(!expandedBottom10Fixed)}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-red-50/50 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm">🏢</span>
                        </div>
                        <span className="text-sm font-bold text-red-700">
                          고정비 상세보기
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center transition-transform ${
                        expandedBottom10Fixed ? "rotate-180" : ""
                      }`}>
                        <svg
                          className="w-4 h-4 text-red-600"
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
                      <div className="px-4 pb-4 border-t border-red-100/50 bg-gradient-to-b from-red-50/30 to-transparent">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                            >
                              <span className="text-xs text-gray-700 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-sm text-red-700 font-bold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                      </div>
                    </div>
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
