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
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{ aspectRatio: "9/16" }}
        >
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
            <h2
              className="text-3xl font-black mb-2"
              style={{
                color: brand.color,
              }}
            >
              {brand.name}
            </h2>

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

              {/* Top 10% Breakdown - Only for MegaCoffee */}
              {isMegaCoffee && (
                <div className="space-y-2">
                  {/* Variable Costs */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-200">
                    <button
                      onClick={() => setExpandedTop10Variable(!expandedTop10Variable)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-green-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-green-700">
                        📊 변동비 상세보기
                      </span>
                      <svg
                        className={`w-4 h-4 text-green-600 transition-transform ${
                          expandedTop10Variable ? "rotate-180" : ""
                        }`}
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
                    </button>

                    {expandedTop10Variable && (
                      <div className="px-4 pb-3 border-t border-green-100 bg-green-50/50">
                        <div className="mt-2 space-y-1.5">
                          {variableCosts.top10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1.5"
                            >
                              <span className="text-gray-600 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-green-700 font-semibold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-200">
                    <button
                      onClick={() => setExpandedTop10Fixed(!expandedTop10Fixed)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-green-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-green-700">
                        🏢 고정비 상세보기
                      </span>
                      <svg
                        className={`w-4 h-4 text-green-600 transition-transform ${
                          expandedTop10Fixed ? "rotate-180" : ""
                        }`}
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
                    </button>

                    {expandedTop10Fixed && (
                      <div className="px-4 pb-3 border-t border-green-100 bg-green-50/50">
                        <div className="mt-2 space-y-1.5">
                          {fixedCosts.top10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1.5"
                            >
                              <span className="text-gray-600 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-green-700 font-semibold">
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

              {/* Average Breakdown - Only for MegaCoffee */}
              {isMegaCoffee && (
                <div className="space-y-2">
                  {/* Variable Costs */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-200">
                    <button
                      onClick={() => setExpandedAverageVariable(!expandedAverageVariable)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-blue-700">
                        📊 변동비 상세보기
                      </span>
                      <svg
                        className={`w-4 h-4 text-blue-600 transition-transform ${
                          expandedAverageVariable ? "rotate-180" : ""
                        }`}
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
                    </button>

                    {expandedAverageVariable && (
                      <div className="px-4 pb-3 border-t border-blue-100 bg-blue-50/50">
                        <div className="mt-2 space-y-1.5">
                          {variableCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1.5"
                            >
                              <span className="text-gray-600 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-blue-700 font-semibold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-200">
                    <button
                      onClick={() => setExpandedAverageFixed(!expandedAverageFixed)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-blue-700">
                        🏢 고정비 상세보기
                      </span>
                      <svg
                        className={`w-4 h-4 text-blue-600 transition-transform ${
                          expandedAverageFixed ? "rotate-180" : ""
                        }`}
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
                    </button>

                    {expandedAverageFixed && (
                      <div className="px-4 pb-3 border-t border-blue-100 bg-blue-50/50">
                        <div className="mt-2 space-y-1.5">
                          {fixedCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1.5"
                            >
                              <span className="text-gray-600 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-blue-700 font-semibold">
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

              {/* Bottom 10% Breakdown - Only for MegaCoffee */}
              {isMegaCoffee && (
                <div className="space-y-2">
                  {/* Variable Costs */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-200">
                    <button
                      onClick={() => setExpandedBottom10Variable(!expandedBottom10Variable)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-orange-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-orange-700">
                        📊 변동비 상세보기
                      </span>
                      <svg
                        className={`w-4 h-4 text-orange-600 transition-transform ${
                          expandedBottom10Variable ? "rotate-180" : ""
                        }`}
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
                    </button>

                    {expandedBottom10Variable && (
                      <div className="px-4 pb-3 border-t border-orange-100 bg-orange-50/50">
                        <div className="mt-2 space-y-1.5">
                          {variableCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1.5"
                            >
                              <span className="text-gray-600 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-orange-700 font-semibold">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed Costs */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-200">
                    <button
                      onClick={() => setExpandedBottom10Fixed(!expandedBottom10Fixed)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-orange-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-orange-700">
                        🏢 고정비 상세보기
                      </span>
                      <svg
                        className={`w-4 h-4 text-orange-600 transition-transform ${
                          expandedBottom10Fixed ? "rotate-180" : ""
                        }`}
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
                    </button>

                    {expandedBottom10Fixed && (
                      <div className="px-4 pb-3 border-t border-orange-100 bg-orange-50/50">
                        <div className="mt-2 space-y-1.5">
                          {fixedCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1.5"
                            >
                              <span className="text-gray-600 font-medium">
                                {cost.label}
                              </span>
                              <span className="text-orange-700 font-semibold">
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
                      <div className="space-y-2.5 text-xs leading-relaxed" style={{ color: "#FF7C01" }}>
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
        </div>
      </div>
    </div>
  );
}
