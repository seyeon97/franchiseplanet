"use client";

import { useState } from "react";

export default function ReelsView() {
  const [expandedTop10Variable, setExpandedTop10Variable] = useState(false);
  const [expandedTop10Fixed, setExpandedTop10Fixed] = useState(false);
  const [expandedAverageVariable, setExpandedAverageVariable] = useState(false);
  const [expandedAverageFixed, setExpandedAverageFixed] = useState(false);
  const [expandedBottom10Variable, setExpandedBottom10Variable] = useState(false);
  const [expandedBottom10Fixed, setExpandedBottom10Fixed] = useState(false);

  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()}만원`;
  };

  const brand = {
    name: "메가커피",
    logo: "☕",
    logoImage: "/megacoffee-logo.png",
    category: "카페",
    color: "#FF7C01",
    startupCost: "1.5억~2억원",
    stats: {
      top10: {
        revenue: 8000,
        cost: 6170,
        profit: 1830,
      },
      average: {
        revenue: 3560,
        cost: 2873.5,
        profit: 686.5,
      },
      bottom10: {
        revenue: 2000,
        cost: 1958.5,
        profit: 41.5,
      },
    },
  };

  // 변동비 데이터
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

  // 고정비 데이터
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
      className="relative flex items-center justify-center"
      style={{
        width: "1080px",
        height: "1920px",
        background: "linear-gradient(135deg, #F144BB 0%, #803CFA 33%, #0064FF 66%, #000000 100%)",
      }}
    >
      {/* Nebula effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl" style={{
          background: "radial-gradient(circle, rgba(241, 68, 187, 0.3), transparent)",
        }}></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full blur-3xl" style={{
          background: "radial-gradient(circle, rgba(0, 100, 255, 0.3), transparent)",
        }}></div>
      </div>

      <div className="relative w-full max-w-2xl px-8">
        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header with Logo */}
          <div
            className="relative h-32 flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #F144BB 0%, #803CFA 50%, #0064FF 100%)",
            }}
          >
            {/* Logo */}
            <img
              src="/megacoffee-logo.png"
              alt="메가커피 logo"
              className="h-16 object-contain"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
              }}
            />

            {/* Category badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
              {brand.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Startup Cost */}
            <div className="mb-6">
              <div className="p-5 rounded-2xl relative overflow-hidden" style={{
                background: `linear-gradient(135deg, ${brand.color}15, ${brand.color}08)`,
              }}>
                <div className="absolute -right-4 -top-4 w-32 h-32 rounded-full opacity-10" style={{
                  background: brand.color,
                }}></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                    background: `linear-gradient(135deg, ${brand.color}30, ${brand.color}20)`,
                  }}>
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      초기 투자 <span className="text-gray-400">(보증금을 제외한 추정 창업비용)</span>
                    </p>
                    <p className="text-lg font-bold" style={{ color: brand.color }}>
                      {brand.startupCost}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-6">
              {/* Top 10% */}
              <div
                className="relative overflow-hidden rounded-2xl p-5 shadow-lg border"
                style={{
                  background: "linear-gradient(135deg, #FEF9C3 0%, #FDE68A 30%, #D1FAE5 70%, #A7F3D0 100%)",
                  borderColor: "#10B981",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
                }}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl">
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
                        <span className="text-2xl font-black text-green-700">일등</span>
                        <div className="text-sm font-bold text-green-600">상위 10%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-700 font-bold mb-1">월 순수익</div>
                      <div className="text-3xl font-black text-green-700">
                        {formatMoney(brand.stats.top10.profit)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3" style={{
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}>
                      <div className="text-xs text-gray-600 mb-1 font-medium">💰 매출</div>
                      <div className="font-bold text-gray-800 text-base">
                        {formatMoney(brand.stats.top10.revenue)}
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3" style={{
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}>
                      <div className="text-xs text-gray-600 mb-1 font-medium">💸 비용</div>
                      <div className="font-bold text-gray-800 text-base">
                        {formatMoney(brand.stats.top10.cost)}
                      </div>
                    </div>
                    <div className="rounded-xl p-3 bg-green-600" style={{
                      border: "1px solid #059669",
                    }}>
                      <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                      <div className="font-bold text-white text-base">
                        {formatMoney(brand.stats.top10.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Average */}
              <div
                className="relative overflow-hidden rounded-2xl p-5 shadow-lg border"
                style={{
                  background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #EAB308 100%)",
                  borderColor: "#CA8A04",
                  boxShadow: "0 4px 12px rgba(202, 138, 4, 0.15)",
                }}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl">
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
                        <span className="text-2xl font-black text-slate-700">중간</span>
                        <div className="text-sm font-bold text-slate-600">평균 50%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-700 font-bold mb-1">월 순수익</div>
                      <div className="text-3xl font-black text-slate-700">
                        {formatMoney(brand.stats.average.profit)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3" style={{
                      border: "1px solid rgba(100, 116, 139, 0.2)",
                    }}>
                      <div className="text-xs text-gray-600 mb-1 font-medium">💰 매출</div>
                      <div className="font-bold text-gray-800 text-base">
                        {formatMoney(brand.stats.average.revenue)}
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3" style={{
                      border: "1px solid rgba(100, 116, 139, 0.2)",
                    }}>
                      <div className="text-xs text-gray-600 mb-1 font-medium">💸 비용</div>
                      <div className="font-bold text-gray-800 text-base">
                        {formatMoney(brand.stats.average.cost)}
                      </div>
                    </div>
                    <div className="rounded-xl p-3 bg-slate-600" style={{
                      border: "1px solid #475569",
                    }}>
                      <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                      <div className="font-bold text-white text-base">
                        {formatMoney(brand.stats.average.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 10% */}
              <div
                className="relative overflow-hidden rounded-2xl p-5 shadow-lg border"
                style={{
                  background: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 30%, #FCA5A5 70%, #7C2D12 100%)",
                  borderColor: "#EF4444",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
                }}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl">
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
                        <span className="text-2xl font-black text-red-700">꼴등</span>
                        <div className="text-sm font-bold text-red-600">하위 10%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-red-700 font-bold mb-1">월 순수익</div>
                      <div className="text-3xl font-black text-red-700">
                        {formatMoney(brand.stats.bottom10.profit)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3" style={{
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}>
                      <div className="text-xs text-gray-600 mb-1 font-medium">💰 매출</div>
                      <div className="font-bold text-gray-800 text-base">
                        {formatMoney(brand.stats.bottom10.revenue)}
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3" style={{
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}>
                      <div className="text-xs text-gray-600 mb-1 font-medium">💸 비용</div>
                      <div className="font-bold text-gray-800 text-base">
                        {formatMoney(brand.stats.bottom10.cost)}
                      </div>
                    </div>
                    <div className="rounded-xl p-3 bg-red-600" style={{
                      border: "1px solid #DC2626",
                    }}>
                      <div className="text-xs text-white mb-1 font-semibold">✨ 수익</div>
                      <div className="font-bold text-white text-base">
                        {formatMoney(brand.stats.bottom10.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div>
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
                  <div className="flex items-start gap-4">
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
                      <div className="space-y-2">
                        {[
                          "사장님 하루 10시간 / 주5일 이상 출근 기준",
                          "월세, 인건비, 배달 비중에 따라 순수익 차이 발생",
                          "이자비용 및 각종 세금 미포함",
                        ].map((text, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{
                              background: brand.color,
                            }}></div>
                            <p className="text-sm leading-relaxed text-gray-700 font-medium">
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

            {/* Watermark */}
            <div className="mt-6 text-center">
              <p className="text-lg font-black" style={{
                background: "linear-gradient(135deg, #F144BB 0%, #803CFA 50%, #0064FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                프차플래닛
              </p>
              <p className="text-xs text-gray-500 mt-1">가맹점 정보 플랫폼</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
