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

export default function BrandCardTetris({ brand }: BrandCardProps) {
  const [showTop10Detail, setShowTop10Detail] = useState(false);
  const [showAverageDetail, setShowAverageDetail] = useState(false);
  const [showBottom10Detail, setShowBottom10Detail] = useState(false);
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
      className="relative min-h-screen snap-start flex items-center justify-center p-6"
      style={{
        background: "#1a1a2e",
      }}
    >
      {/* Tetris grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div
          className="relative bg-[#16213e] rounded-lg shadow-2xl overflow-hidden flex flex-col border-4 border-[#00ffff]"
          style={{
            height: "calc(100vh - 3rem)",
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.1)",
          }}
        >
          {/* Header with Logo - Tetris style */}
          <div
            className="relative h-20 flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(180deg, #ff00ff 0%, #8000ff 100%)",
              boxShadow: "0 4px 20px rgba(255, 0, 255, 0.5)",
            }}
          >
            {/* Pixel border effect */}
            <div className="absolute inset-0" style={{
              boxShadow: "inset 0 -4px 0 rgba(0, 0, 0, 0.3)",
            }}></div>

            {/* Logo */}
            {brand.logoImage ? (
              <img
                src={brand.logoImage}
                alt={`${brand.name} logo`}
                className="h-12 object-contain relative z-10"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))",
                }}
              />
            ) : (
              <div className="text-5xl drop-shadow-2xl">{brand.logo}</div>
            )}

            {/* Category badge - Tetris block style */}
            <div
              className="absolute top-2 right-2 px-3 py-1 text-xs font-black uppercase tracking-wider"
              style={{
                background: "#00ffff",
                color: "#1a1a2e",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
              }}
            >
              {brand.category}
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-4 overflow-y-auto flex-1">
            {/* Startup Cost - Tetris Block */}
            <div className="mb-4">
              <div
                className="p-4 relative overflow-hidden border-2"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 140, 0, 0.2) 100%)",
                  borderColor: "#ffd700",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center font-black text-2xl"
                    style={{
                      background: "#ffd700",
                      color: "#1a1a2e",
                      clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                      boxShadow: "0 0 15px rgba(255, 215, 0, 0.8)",
                    }}
                  >
                    💳
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#00ffff] mb-1 uppercase tracking-wide">
                      초기 투자
                    </p>
                    <p className="text-sm font-black text-white">
                      {brand.startupCost}
                    </p>
                    <p className="text-xs text-gray-400">(보증금 제외)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats - Tetris Blocks stacked */}
            <div className="space-y-3">
              {/* Top 10% - Green Tetris Block */}
              <div
                onClick={() => isMegaCoffee && setShowTop10Detail(!showTop10Detail)}
                className="relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 border-2"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 255, 0, 0.2) 0%, rgba(0, 200, 0, 0.2) 100%)",
                  borderColor: "#00ff00",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: "0 0 20px rgba(0, 255, 0, 0.4)",
                }}
              >
                <div className="p-3 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          background: "#00ff00",
                          clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                          boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
                        }}
                      >
                        <img
                          src="/planet-winner.png"
                          alt="일등"
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-lg font-black text-[#00ff00] uppercase tracking-wide">일등</span>
                        <div className="text-xs font-bold text-gray-300">상위 10%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#00ff00] font-bold mb-1 uppercase">월 순수익</div>
                      <div className="text-xl font-black text-white" style={{
                        textShadow: "0 0 10px rgba(0, 255, 0, 0.8)",
                      }}>
                        {formatMoney(brand.stats.top10.profit)}
                      </div>
                    </div>
                  </div>

                  {/* Mini blocks for stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        borderColor: "#00ff00",
                      }}
                    >
                      <div className="text-xs text-gray-400 mb-1">💰 매출</div>
                      <div className="font-black text-white text-sm">
                        {formatMoney(brand.stats.top10.revenue)}
                      </div>
                    </div>
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        borderColor: "#00ff00",
                      }}
                    >
                      <div className="text-xs text-gray-400 mb-1">💸 비용</div>
                      <div className="font-black text-white text-sm">
                        {formatMoney(brand.stats.top10.cost)}
                      </div>
                    </div>
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "#00ff00",
                        borderColor: "#00ff00",
                        boxShadow: "0 0 10px rgba(0, 255, 0, 0.6)",
                      }}
                    >
                      <div className="text-xs text-[#1a1a2e] mb-1 font-bold">✨ 수익</div>
                      <div className="font-black text-[#1a1a2e] text-sm">
                        {formatMoney(brand.stats.top10.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 10% Detail Modal - Only for MegaCoffee */}
              {isMegaCoffee && showTop10Detail && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowTop10Detail(false)}>
                  <div
                    className="bg-[#16213e] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4"
                    style={{
                      borderColor: "#00ff00",
                      boxShadow: "0 0 40px rgba(0, 255, 0, 0.6)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div
                      className="sticky top-0 p-6"
                      style={{
                        background: "linear-gradient(180deg, #00ff00 0%, #00cc00 100%)",
                        boxShadow: "0 4px 20px rgba(0, 255, 0, 0.5)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-16 h-16 flex items-center justify-center"
                            style={{
                              background: "#1a1a2e",
                              clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                            }}
                          >
                            <img
                              src="/planet-winner.png"
                              alt="일등"
                              className="w-14 h-14 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-[#1a1a2e] uppercase tracking-wide">일등</h3>
                            <p className="text-sm text-[#1a1a2e]/80 font-bold">상위 10% 상세 분석</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowTop10Detail(false)}
                          className="w-10 h-10 flex items-center justify-center transition-colors font-black text-2xl"
                          style={{
                            background: "#1a1a2e",
                            color: "#00ff00",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div
                          className="p-4 border-2"
                          style={{
                            background: "rgba(0, 255, 0, 0.1)",
                            borderColor: "#00ff00",
                          }}
                        >
                          <div className="text-xs text-[#00ff00] mb-1 font-semibold uppercase">💰 매출</div>
                          <div className="font-black text-white text-lg">
                            {formatMoney(brand.stats.top10.revenue)}
                          </div>
                        </div>
                        <div
                          className="p-4 border-2"
                          style={{
                            background: "rgba(0, 255, 0, 0.1)",
                            borderColor: "#00ff00",
                          }}
                        >
                          <div className="text-xs text-[#00ff00] mb-1 font-semibold uppercase">💸 비용</div>
                          <div className="font-black text-white text-lg">
                            {formatMoney(brand.stats.top10.cost)}
                          </div>
                        </div>
                        <div
                          className="p-4 border-2"
                          style={{
                            background: "#00ff00",
                            borderColor: "#00ff00",
                            boxShadow: "0 0 20px rgba(0, 255, 0, 0.6)",
                          }}
                        >
                          <div className="text-xs text-[#1a1a2e] mb-1 font-semibold uppercase">✨ 수익</div>
                          <div className="font-black text-[#1a1a2e] text-lg">
                            {formatMoney(brand.stats.top10.profit)}
                          </div>
                        </div>
                      </div>

                      {/* Breakdown sections */}
                      <div className="space-y-3">
                        {/* Variable Costs */}
                        <div
                          className="overflow-hidden border-2"
                          style={{
                            background: "rgba(0, 255, 0, 0.05)",
                            borderColor: "#00ff00",
                          }}
                        >
                          <button
                            onClick={() => setExpandedTop10Variable(!expandedTop10Variable)}
                            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#00ff00]/10 transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 flex items-center justify-center text-sm font-black"
                                style={{
                                  background: "#00ff00",
                                  color: "#1a1a2e",
                                }}
                              >
                                📊
                              </div>
                              <span className="text-sm font-black text-[#00ff00] uppercase">
                                변동비 상세보기
                              </span>
                            </div>
                            <div
                              className={`w-6 h-6 flex items-center justify-center transition-transform ${
                                expandedTop10Variable ? "rotate-180" : ""
                              }`}
                              style={{ color: "#00ff00" }}
                            >
                              ▼
                            </div>
                          </button>

                          {expandedTop10Variable && (
                            <div className="px-4 pb-4 border-t-2" style={{ borderColor: "#00ff00" }}>
                              <div className="mt-3 space-y-2">
                                {variableCosts.top10.map((cost, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-2.5 border"
                                    style={{
                                      background: "rgba(0, 0, 0, 0.3)",
                                      borderColor: "#00ff00",
                                    }}
                                  >
                                    <span className="text-xs text-gray-300 font-medium">
                                      {cost.label}
                                    </span>
                                    <span className="text-sm text-[#00ff00] font-bold">
                                      {formatMoney(cost.amount)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Fixed Costs */}
                        <div
                          className="overflow-hidden border-2"
                          style={{
                            background: "rgba(0, 255, 0, 0.05)",
                            borderColor: "#00ff00",
                          }}
                        >
                          <button
                            onClick={() => setExpandedTop10Fixed(!expandedTop10Fixed)}
                            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#00ff00]/10 transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 flex items-center justify-center text-sm font-black"
                                style={{
                                  background: "#00ff00",
                                  color: "#1a1a2e",
                                }}
                              >
                                🏢
                              </div>
                              <span className="text-sm font-black text-[#00ff00] uppercase">
                                고정비 상세보기
                              </span>
                            </div>
                            <div
                              className={`w-6 h-6 flex items-center justify-center transition-transform ${
                                expandedTop10Fixed ? "rotate-180" : ""
                              }`}
                              style={{ color: "#00ff00" }}
                            >
                              ▼
                            </div>
                          </button>

                          {expandedTop10Fixed && (
                            <div className="px-4 pb-4 border-t-2" style={{ borderColor: "#00ff00" }}>
                              <div className="mt-3 space-y-2">
                                {fixedCosts.top10.map((cost, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-2.5 border"
                                    style={{
                                      background: "rgba(0, 0, 0, 0.3)",
                                      borderColor: "#00ff00",
                                    }}
                                  >
                                    <span className="text-xs text-gray-300 font-medium">
                                      {cost.label}
                                    </span>
                                    <span className="text-sm text-[#00ff00] font-bold">
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

              {/* Average - Yellow Tetris Block */}
              <div
                onClick={() => isMegaCoffee && setShowAverageDetail(!showAverageDetail)}
                className="relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 border-2"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 0, 0.2) 0%, rgba(255, 200, 0, 0.2) 100%)",
                  borderColor: "#ffff00",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: "0 0 20px rgba(255, 255, 0, 0.4)",
                }}
              >
                <div className="p-3 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          background: "#ffff00",
                          clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                          boxShadow: "0 0 15px rgba(255, 255, 0, 0.8)",
                        }}
                      >
                        <img
                          src="/planet-middle.png"
                          alt="중간"
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-lg font-black text-[#ffff00] uppercase tracking-wide">중간</span>
                        <div className="text-xs font-bold text-gray-300">평균 50%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#ffff00] font-bold mb-1 uppercase">월 순수익</div>
                      <div className="text-xl font-black text-white" style={{
                        textShadow: "0 0 10px rgba(255, 255, 0, 0.8)",
                      }}>
                        {formatMoney(brand.stats.average.profit)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        borderColor: "#ffff00",
                      }}
                    >
                      <div className="text-xs text-gray-400 mb-1">💰 매출</div>
                      <div className="font-black text-white text-sm">
                        {formatMoney(brand.stats.average.revenue)}
                      </div>
                    </div>
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        borderColor: "#ffff00",
                      }}
                    >
                      <div className="text-xs text-gray-400 mb-1">💸 비용</div>
                      <div className="font-black text-white text-sm">
                        {formatMoney(brand.stats.average.cost)}
                      </div>
                    </div>
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "#ffff00",
                        borderColor: "#ffff00",
                        boxShadow: "0 0 10px rgba(255, 255, 0, 0.6)",
                      }}
                    >
                      <div className="text-xs text-[#1a1a2e] mb-1 font-bold">✨ 수익</div>
                      <div className="font-black text-[#1a1a2e] text-sm">
                        {formatMoney(brand.stats.average.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Average Detail Modal - Only for MegaCoffee */}
              {isMegaCoffee && showAverageDetail && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAverageDetail(false)}>
                  <div
                    className="bg-[#16213e] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4"
                    style={{
                      borderColor: "#ffff00",
                      boxShadow: "0 0 40px rgba(255, 255, 0, 0.6)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="sticky top-0 p-6"
                      style={{
                        background: "linear-gradient(180deg, #ffff00 0%, #cccc00 100%)",
                        boxShadow: "0 4px 20px rgba(255, 255, 0, 0.5)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-16 h-16 flex items-center justify-center"
                            style={{
                              background: "#1a1a2e",
                              clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                            }}
                          >
                            <img src="/planet-middle.png" alt="중간" className="w-14 h-14 object-contain" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-[#1a1a2e] uppercase tracking-wide">중간</h3>
                            <p className="text-sm text-[#1a1a2e]/80 font-bold">평균 50% 상세 분석</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAverageDetail(false)}
                          className="w-10 h-10 flex items-center justify-center font-black text-2xl"
                          style={{ background: "#1a1a2e", color: "#ffff00" }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 border-2" style={{ background: "rgba(255, 255, 0, 0.1)", borderColor: "#ffff00" }}>
                          <div className="text-xs text-[#ffff00] mb-1 font-semibold uppercase">💰 매출</div>
                          <div className="font-black text-white text-lg">{formatMoney(brand.stats.average.revenue)}</div>
                        </div>
                        <div className="p-4 border-2" style={{ background: "rgba(255, 255, 0, 0.1)", borderColor: "#ffff00" }}>
                          <div className="text-xs text-[#ffff00] mb-1 font-semibold uppercase">💸 비용</div>
                          <div className="font-black text-white text-lg">{formatMoney(brand.stats.average.cost)}</div>
                        </div>
                        <div className="p-4 border-2" style={{ background: "#ffff00", borderColor: "#ffff00", boxShadow: "0 0 20px rgba(255, 255, 0, 0.6)" }}>
                          <div className="text-xs text-[#1a1a2e] mb-1 font-semibold uppercase">✨ 수익</div>
                          <div className="font-black text-[#1a1a2e] text-lg">{formatMoney(brand.stats.average.profit)}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="overflow-hidden border-2" style={{ background: "rgba(255, 255, 0, 0.05)", borderColor: "#ffff00" }}>
                          <button onClick={() => setExpandedAverageVariable(!expandedAverageVariable)} className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#ffff00]/10 transition-all">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 flex items-center justify-center text-sm font-black" style={{ background: "#ffff00", color: "#1a1a2e" }}>📊</div>
                              <span className="text-sm font-black text-[#ffff00] uppercase">변동비 상세보기</span>
                            </div>
                            <div className={`w-6 h-6 flex items-center justify-center transition-transform ${expandedAverageVariable ? "rotate-180" : ""}`} style={{ color: "#ffff00" }}>▼</div>
                          </button>
                          {expandedAverageVariable && (
                            <div className="px-4 pb-4 border-t-2" style={{ borderColor: "#ffff00" }}>
                              <div className="mt-3 space-y-2">
                                {variableCosts.average.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2.5 border" style={{ background: "rgba(0, 0, 0, 0.3)", borderColor: "#ffff00" }}>
                                    <span className="text-xs text-gray-300 font-medium">{cost.label}</span>
                                    <span className="text-sm text-[#ffff00] font-bold">{formatMoney(cost.amount)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden border-2" style={{ background: "rgba(255, 255, 0, 0.05)", borderColor: "#ffff00" }}>
                          <button onClick={() => setExpandedAverageFixed(!expandedAverageFixed)} className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#ffff00]/10 transition-all">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 flex items-center justify-center text-sm font-black" style={{ background: "#ffff00", color: "#1a1a2e" }}>🏢</div>
                              <span className="text-sm font-black text-[#ffff00] uppercase">고정비 상세보기</span>
                            </div>
                            <div className={`w-6 h-6 flex items-center justify-center transition-transform ${expandedAverageFixed ? "rotate-180" : ""}`} style={{ color: "#ffff00" }}>▼</div>
                          </button>
                          {expandedAverageFixed && (
                            <div className="px-4 pb-4 border-t-2" style={{ borderColor: "#ffff00" }}>
                              <div className="mt-3 space-y-2">
                                {fixedCosts.average.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2.5 border" style={{ background: "rgba(0, 0, 0, 0.3)", borderColor: "#ffff00" }}>
                                    <span className="text-xs text-gray-300 font-medium">{cost.label}</span>
                                    <span className="text-sm text-[#ffff00] font-bold">{formatMoney(cost.amount)}</span>
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

              {/* Bottom 10% - Red Tetris Block */}
              <div
                onClick={() => isMegaCoffee && setShowBottom10Detail(!showBottom10Detail)}
                className="relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 border-2"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(200, 0, 0, 0.2) 100%)",
                  borderColor: "#ff0000",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: "0 0 20px rgba(255, 0, 0, 0.4)",
                }}
              >
                <div className="p-3 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          background: "#ff0000",
                          clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                          boxShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
                        }}
                      >
                        <img
                          src="/planet-last.png"
                          alt="꼴등"
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-lg font-black text-[#ff0000] uppercase tracking-wide">꼴등</span>
                        <div className="text-xs font-bold text-gray-300">하위 10%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#ff0000] font-bold mb-1 uppercase">월 순수익</div>
                      <div className="text-xl font-black text-white" style={{
                        textShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                      }}>
                        {formatMoney(brand.stats.bottom10.profit)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        borderColor: "#ff0000",
                      }}
                    >
                      <div className="text-xs text-gray-400 mb-1">💰 매출</div>
                      <div className="font-black text-white text-sm">
                        {formatMoney(brand.stats.bottom10.revenue)}
                      </div>
                    </div>
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        borderColor: "#ff0000",
                      }}
                    >
                      <div className="text-xs text-gray-400 mb-1">💸 비용</div>
                      <div className="font-black text-white text-sm">
                        {formatMoney(brand.stats.bottom10.cost)}
                      </div>
                    </div>
                    <div
                      className="p-2 border-2"
                      style={{
                        background: "#ff0000",
                        borderColor: "#ff0000",
                        boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
                      }}
                    >
                      <div className="text-xs text-[#1a1a2e] mb-1 font-bold">✨ 수익</div>
                      <div className="font-black text-[#1a1a2e] text-sm">
                        {formatMoney(brand.stats.bottom10.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 10% Detail Modal - Only for MegaCoffee */}
              {isMegaCoffee && showBottom10Detail && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBottom10Detail(false)}>
                  <div
                    className="bg-[#16213e] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4"
                    style={{
                      borderColor: "#ff0000",
                      boxShadow: "0 0 40px rgba(255, 0, 0, 0.6)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="sticky top-0 p-6"
                      style={{
                        background: "linear-gradient(180deg, #ff0000 0%, #cc0000 100%)",
                        boxShadow: "0 4px 20px rgba(255, 0, 0, 0.5)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-16 h-16 flex items-center justify-center"
                            style={{
                              background: "#1a1a2e",
                              clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                            }}
                          >
                            <img src="/planet-last.png" alt="꼴등" className="w-14 h-14 object-contain" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-[#1a1a2e] uppercase tracking-wide">꼴등</h3>
                            <p className="text-sm text-[#1a1a2e]/80 font-bold">하위 10% 상세 분석</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowBottom10Detail(false)}
                          className="w-10 h-10 flex items-center justify-center font-black text-2xl"
                          style={{ background: "#1a1a2e", color: "#ff0000" }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 border-2" style={{ background: "rgba(255, 0, 0, 0.1)", borderColor: "#ff0000" }}>
                          <div className="text-xs text-[#ff0000] mb-1 font-semibold uppercase">💰 매출</div>
                          <div className="font-black text-white text-lg">{formatMoney(brand.stats.bottom10.revenue)}</div>
                        </div>
                        <div className="p-4 border-2" style={{ background: "rgba(255, 0, 0, 0.1)", borderColor: "#ff0000" }}>
                          <div className="text-xs text-[#ff0000] mb-1 font-semibold uppercase">💸 비용</div>
                          <div className="font-black text-white text-lg">{formatMoney(brand.stats.bottom10.cost)}</div>
                        </div>
                        <div className="p-4 border-2" style={{ background: "#ff0000", borderColor: "#ff0000", boxShadow: "0 0 20px rgba(255, 0, 0, 0.6)" }}>
                          <div className="text-xs text-[#1a1a2e] mb-1 font-semibold uppercase">✨ 수익</div>
                          <div className="font-black text-[#1a1a2e] text-lg">{formatMoney(brand.stats.bottom10.profit)}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="overflow-hidden border-2" style={{ background: "rgba(255, 0, 0, 0.05)", borderColor: "#ff0000" }}>
                          <button onClick={() => setExpandedBottom10Variable(!expandedBottom10Variable)} className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#ff0000]/10 transition-all">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 flex items-center justify-center text-sm font-black" style={{ background: "#ff0000", color: "#1a1a2e" }}>📊</div>
                              <span className="text-sm font-black text-[#ff0000] uppercase">변동비 상세보기</span>
                            </div>
                            <div className={`w-6 h-6 flex items-center justify-center transition-transform ${expandedBottom10Variable ? "rotate-180" : ""}`} style={{ color: "#ff0000" }}>▼</div>
                          </button>
                          {expandedBottom10Variable && (
                            <div className="px-4 pb-4 border-t-2" style={{ borderColor: "#ff0000" }}>
                              <div className="mt-3 space-y-2">
                                {variableCosts.bottom10.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2.5 border" style={{ background: "rgba(0, 0, 0, 0.3)", borderColor: "#ff0000" }}>
                                    <span className="text-xs text-gray-300 font-medium">{cost.label}</span>
                                    <span className="text-sm text-[#ff0000] font-bold">{formatMoney(cost.amount)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden border-2" style={{ background: "rgba(255, 0, 0, 0.05)", borderColor: "#ff0000" }}>
                          <button onClick={() => setExpandedBottom10Fixed(!expandedBottom10Fixed)} className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#ff0000]/10 transition-all">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 flex items-center justify-center text-sm font-black" style={{ background: "#ff0000", color: "#1a1a2e" }}>🏢</div>
                              <span className="text-sm font-black text-[#ff0000] uppercase">고정비 상세보기</span>
                            </div>
                            <div className={`w-6 h-6 flex items-center justify-center transition-transform ${expandedBottom10Fixed ? "rotate-180" : ""}`} style={{ color: "#ff0000" }}>▼</div>
                          </button>
                          {expandedBottom10Fixed && (
                            <div className="px-4 pb-4 border-t-2" style={{ borderColor: "#ff0000" }}>
                              <div className="mt-3 space-y-2">
                                {fixedCosts.bottom10.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2.5 border" style={{ background: "rgba(0, 0, 0, 0.3)", borderColor: "#ff0000" }}>
                                    <span className="text-xs text-gray-300 font-medium">{cost.label}</span>
                                    <span className="text-sm text-[#ff0000] font-bold">{formatMoney(cost.amount)}</span>
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
          </div>

          {/* Disclaimer - Fixed at bottom - Tetris style */}
          <div className="px-4 pb-4 flex-shrink-0">
            <div
              className="p-3 border-2"
              style={{
                background: "rgba(0, 255, 255, 0.1)",
                borderColor: "#00ffff",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
              }}
            >
              <div className="flex items-start gap-2">
                <div
                  className="w-8 h-8 flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: "#00ffff",
                    color: "#1a1a2e",
                    clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                  }}
                >
                  💡
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black mb-1.5 text-[#00ffff] uppercase tracking-wide">
                    알아두세요
                  </h4>
                  <div className="space-y-1">
                    {[
                      "사장님 하루 10시간 / 주5일 이상 출근 기준",
                      "월세, 인건비, 배달 비중에 따라 순수익 차이 발생",
                      "이자비용 및 각종 세금 미포함",
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 mt-1.5 flex-shrink-0"
                          style={{
                            background: "#00ffff",
                            boxShadow: "0 0 5px rgba(0, 255, 255, 0.8)",
                          }}
                        ></div>
                        <p className="text-xs leading-relaxed text-gray-300 font-medium">
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
  );
}
