"use client";

import { useState } from "react";

interface BrandDetailBreakdownProps {
  brandName: string;
  color: string;
}

export default function BrandDetailBreakdown({
  brandName,
  color,
}: BrandDetailBreakdownProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const formatMoney = (amount: number) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(0)}천만원`;
    }
    if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`;
    }
    return `${amount.toLocaleString()}원`;
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // 합계 데이터
  const summaryData = [
    {
      label: "최저매출",
      revenue: 20000000,
      cost: 18185000,
      profit: 1815000,
      color: "red",
    },
    {
      label: "평균매출",
      revenue: 35600000,
      cost: 30554000,
      profit: 5046000,
      color: "blue",
    },
    {
      label: "최고매출",
      revenue: 80000000,
      cost: 63315000,
      profit: 16685000,
      color: "green",
    },
  ];

  // 변동비 상세
  const variableCosts = [
    { label: "원가율 (36%)", low: 7200000, mid: 12816000, high: 28800000 },
    { label: "카드수수료 (1.5%)", low: 300000, mid: 534000, high: 1200000 },
    {
      label: "배달수수료 (30%)",
      low: 1200000,
      mid: 2136000,
      high: 4800000,
    },
    {
      label: "플랫폼수수료 (5%)",
      low: 800000,
      mid: 1424000,
      high: 3200000,
    },
    {
      label: "수도광열비 (2%)",
      low: 400000,
      mid: 712000,
      high: 1600000,
    },
    {
      label: "인건비 (21~25%)",
      low: 5000000,
      mid: 7832000,
      high: 16800000,
    },
  ];

  // 고정비 상세
  const fixedCosts = [
    { label: "임대료", low: 3520000, mid: 2200000, high: 3850000 },
    { label: "관리비", low: 300000, mid: 220000, high: 385000 },
    { label: "광고비", low: 100000, mid: 100000, high: 100000 },
    { label: "정기 서비스", low: 300000, mid: 300000, high: 300000 },
    { label: "소모품비", low: 300000, mid: 300000, high: 300000 },
    { label: "로열티", low: 165000, mid: 165000, high: 165000 },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "red":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          border: "border-red-200",
          gradient: "from-red-500 to-red-600",
        };
      case "blue":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-200",
          gradient: "from-blue-500 to-blue-600",
        };
      case "green":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          border: "border-green-200",
          gradient: "from-green-500 to-green-600",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-600",
          border: "border-gray-200",
          gradient: "from-gray-500 to-gray-600",
        };
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Title */}
      <div className="mb-6 text-center">
        <h3
          className="text-2xl font-black mb-2"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #FFB366 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {brandName}
        </h3>
        <p className="text-sm text-gray-600">매출별 손익 분석</p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4 mb-6">
        {summaryData.map((item, idx) => {
          const colorClasses = getColorClass(item.color);
          return (
            <div
              key={idx}
              className={`${colorClasses.bg} border-2 ${colorClasses.border} rounded-2xl p-5 shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-bold ${colorClasses.text}`}>
                  {item.label}
                </span>
                <div
                  className={`px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${colorClasses.gradient}`}
                >
                  순이익 {formatMoney(item.profit)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">💰 월 매출</div>
                  <div className="text-lg font-black text-gray-800">
                    {formatMoney(item.revenue)}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">💸 월 지출</div>
                  <div className="text-lg font-black text-gray-800">
                    {formatMoney(item.cost)}
                  </div>
                </div>
              </div>

              {/* Profit Ratio */}
              <div className="mt-3 text-center">
                <span className="text-xs text-gray-600">
                  수익률:{" "}
                  <span className={`font-bold ${colorClasses.text}`}>
                    {((item.profit / item.revenue) * 100).toFixed(0)}%
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Breakdown - Accordion */}
      <div className="space-y-3">
        {/* Variable Costs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <button
            onClick={() => toggleSection("variable")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-800">
                📊 변동비 상세보기
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSection === "variable" ? "rotate-180" : ""
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

          {expandedSection === "variable" && (
            <div className="px-4 pb-4 border-t">
              <div className="mt-3 space-y-2">
                {variableCosts.map((cost, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600 font-medium">
                      {cost.label}
                    </span>
                    <div className="flex gap-3 text-right">
                      <span className="text-red-600 font-semibold w-16">
                        {formatMoney(cost.low)}
                      </span>
                      <span className="text-blue-600 font-semibold w-16">
                        {formatMoney(cost.mid)}
                      </span>
                      <span className="text-green-600 font-semibold w-16">
                        {formatMoney(cost.high)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Costs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <button
            onClick={() => toggleSection("fixed")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-800">
                🏢 고정비 상세보기
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSection === "fixed" ? "rotate-180" : ""
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

          {expandedSection === "fixed" && (
            <div className="px-4 pb-4 border-t">
              <div className="mt-3 space-y-2">
                {fixedCosts.map((cost, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600 font-medium">
                      {cost.label}
                    </span>
                    <div className="flex gap-3 text-right">
                      <span className="text-red-600 font-semibold w-16">
                        {formatMoney(cost.low)}
                      </span>
                      <span className="text-blue-600 font-semibold w-16">
                        {formatMoney(cost.mid)}
                      </span>
                      <span className="text-green-600 font-semibold w-16">
                        {formatMoney(cost.high)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-amber-100 rounded-xl border border-amber-300">
        <p className="text-xs text-amber-800 leading-relaxed">
          💡 실제 수익은 입지, 운영 방식, 시장 상황에 따라 달라질 수 있습니다.
        </p>
      </div>
    </div>
  );
}
