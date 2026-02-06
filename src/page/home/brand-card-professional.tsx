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

export default function BrandCardProfessional({ brand }: BrandCardProps) {
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
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="relative bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-200"
          style={{ height: "calc(100vh - 3rem)" }}
        >
          {/* Header with Logo - Clean and Professional */}
          <div
            className="relative h-24 flex items-center justify-between px-6 flex-shrink-0 border-b-2"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              borderColor: brand.color,
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              {brand.logoImage ? (
                <img
                  src={brand.logoImage}
                  alt={`${brand.name} logo`}
                  className="h-12 object-contain"
                />
              ) : (
                <div className="text-4xl">{brand.logo}</div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{brand.name}</h2>
                <p className="text-xs text-gray-500">{brand.category}</p>
              </div>
            </div>

            {/* Category badge */}
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: brand.color }}
            >
              가맹점
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 overflow-y-auto flex-1">
            {/* Startup Cost - Professional Card */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: brand.color }}
                  >
                    💳
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      초기 투자금 <span className="text-gray-400">(보증금 제외)</span>
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {brand.startupCost}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats - Clean Card Design */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">월 수익 분석</h3>

              {/* Top 10% - Success Green */}
              <div
                onClick={() => isMegaCoffee && setShowTop10Detail(!showTop10Detail)}
                className="bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-lg"
                style={{
                  borderColor: "#10b981",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center font-black text-3xl text-white"
                      style={{
                        backgroundColor: "#10b981",
                      }}
                    >
                      A+
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900">상위 10%</span>
                      <div className="text-xs text-gray-500">우수 매장</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">월 순수익</div>
                    <div className="text-2xl font-black text-green-600">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500 mb-1">매출</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {formatMoney(brand.stats.top10.revenue)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500 mb-1">비용</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {formatMoney(brand.stats.top10.cost)}
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-center"
                    style={{ backgroundColor: "#10b981" }}
                  >
                    <div className="text-xs text-white mb-1 font-semibold">수익</div>
                    <div className="font-bold text-white text-sm">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 10% Modal */}
              {isMegaCoffee && showTop10Detail && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowTop10Detail(false)}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="sticky top-0 bg-green-600 p-6 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center font-black text-3xl text-green-600">
                            A+
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">상위 10%</h3>
                            <p className="text-sm text-green-100">우수 매장 상세 분석</p>
                          </div>
                        </div>
                        <button onClick={() => setShowTop10Detail(false)} className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold">✕</button>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <div className="text-xs text-green-600 mb-1 font-semibold">매출</div>
                          <div className="font-black text-green-900 text-lg">{formatMoney(brand.stats.top10.revenue)}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <div className="text-xs text-green-600 mb-1 font-semibold">비용</div>
                          <div className="font-black text-green-900 text-lg">{formatMoney(brand.stats.top10.cost)}</div>
                        </div>
                        <div className="bg-green-600 rounded-lg p-4">
                          <div className="text-xs text-white mb-1 font-semibold">수익</div>
                          <div className="font-black text-white text-lg">{formatMoney(brand.stats.top10.profit)}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <button onClick={() => setExpandedTop10Variable(!expandedTop10Variable)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100">
                            <span className="text-sm font-bold text-gray-900">변동비 상세보기</span>
                            <span className={`transform transition-transform ${expandedTop10Variable ? "rotate-180" : ""}`}>▼</span>
                          </button>
                          {expandedTop10Variable && (
                            <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                              <div className="mt-3 space-y-2">
                                {variableCosts.top10.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-xs text-gray-700">{cost.label}</span>
                                    <span className="text-sm font-bold text-gray-900">{formatMoney(cost.amount)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <button onClick={() => setExpandedTop10Fixed(!expandedTop10Fixed)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100">
                            <span className="text-sm font-bold text-gray-900">고정비 상세보기</span>
                            <span className={`transform transition-transform ${expandedTop10Fixed ? "rotate-180" : ""}`}>▼</span>
                          </button>
                          {expandedTop10Fixed && (
                            <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                              <div className="mt-3 space-y-2">
                                {fixedCosts.top10.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-xs text-gray-700">{cost.label}</span>
                                    <span className="text-sm font-bold text-gray-900">{formatMoney(cost.amount)}</span>
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

              {/* Average - Neutral Blue */}
              <div
                onClick={() => isMegaCoffee && setShowAverageDetail(!showAverageDetail)}
                className="bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-lg"
                style={{
                  borderColor: "#3b82f6",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center font-black text-3xl text-white"
                      style={{
                        backgroundColor: "#3b82f6",
                      }}
                    >
                      B
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900">평균 50%</span>
                      <div className="text-xs text-gray-500">일반 매장</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">월 순수익</div>
                    <div className="text-2xl font-black text-blue-600">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500 mb-1">매출</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {formatMoney(brand.stats.average.revenue)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500 mb-1">비용</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {formatMoney(brand.stats.average.cost)}
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-center"
                    style={{ backgroundColor: "#3b82f6" }}
                  >
                    <div className="text-xs text-white mb-1 font-semibold">수익</div>
                    <div className="font-bold text-white text-sm">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Average Modal - Similar structure */}
              {isMegaCoffee && showAverageDetail && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowAverageDetail(false)}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="sticky top-0 bg-blue-600 p-6 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center font-black text-3xl text-blue-600">
                            B
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">평균 50%</h3>
                            <p className="text-sm text-blue-100">일반 매장 상세 분석</p>
                          </div>
                        </div>
                        <button onClick={() => setShowAverageDetail(false)} className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold">✕</button>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <div className="text-xs text-blue-600 mb-1 font-semibold">매출</div>
                          <div className="font-black text-blue-900 text-lg">{formatMoney(brand.stats.average.revenue)}</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <div className="text-xs text-blue-600 mb-1 font-semibold">비용</div>
                          <div className="font-black text-blue-900 text-lg">{formatMoney(brand.stats.average.cost)}</div>
                        </div>
                        <div className="bg-blue-600 rounded-lg p-4">
                          <div className="text-xs text-white mb-1 font-semibold">수익</div>
                          <div className="font-black text-white text-lg">{formatMoney(brand.stats.average.profit)}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <button onClick={() => setExpandedAverageVariable(!expandedAverageVariable)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100">
                            <span className="text-sm font-bold text-gray-900">변동비 상세보기</span>
                            <span className={`transform transition-transform ${expandedAverageVariable ? "rotate-180" : ""}`}>▼</span>
                          </button>
                          {expandedAverageVariable && (
                            <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                              <div className="mt-3 space-y-2">
                                {variableCosts.average.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-xs text-gray-700">{cost.label}</span>
                                    <span className="text-sm font-bold text-gray-900">{formatMoney(cost.amount)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <button onClick={() => setExpandedAverageFixed(!expandedAverageFixed)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100">
                            <span className="text-sm font-bold text-gray-900">고정비 상세보기</span>
                            <span className={`transform transition-transform ${expandedAverageFixed ? "rotate-180" : ""}`}>▼</span>
                          </button>
                          {expandedAverageFixed && (
                            <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                              <div className="mt-3 space-y-2">
                                {fixedCosts.average.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-xs text-gray-700">{cost.label}</span>
                                    <span className="text-sm font-bold text-gray-900">{formatMoney(cost.amount)}</span>
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

              {/* Bottom 10% - Warning Red */}
              <div
                onClick={() => isMegaCoffee && setShowBottom10Detail(!showBottom10Detail)}
                className="bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-lg"
                style={{
                  borderColor: "#ef4444",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center font-black text-3xl text-white"
                      style={{
                        backgroundColor: "#ef4444",
                      }}
                    >
                      C
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900">하위 10%</span>
                      <div className="text-xs text-gray-500">주의 필요</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">월 순수익</div>
                    <div className="text-2xl font-black text-red-600">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500 mb-1">매출</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {formatMoney(brand.stats.bottom10.revenue)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500 mb-1">비용</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {formatMoney(brand.stats.bottom10.cost)}
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-center"
                    style={{ backgroundColor: "#ef4444" }}
                  >
                    <div className="text-xs text-white mb-1 font-semibold">수익</div>
                    <div className="font-bold text-white text-sm">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 10% Modal */}
              {isMegaCoffee && showBottom10Detail && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowBottom10Detail(false)}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="sticky top-0 bg-red-600 p-6 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center font-black text-3xl text-red-600">
                            C
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">하위 10%</h3>
                            <p className="text-sm text-red-100">주의 필요 매장 상세 분석</p>
                          </div>
                        </div>
                        <button onClick={() => setShowBottom10Detail(false)} className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold">✕</button>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                          <div className="text-xs text-red-600 mb-1 font-semibold">매출</div>
                          <div className="font-black text-red-900 text-lg">{formatMoney(brand.stats.bottom10.revenue)}</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                          <div className="text-xs text-red-600 mb-1 font-semibold">비용</div>
                          <div className="font-black text-red-900 text-lg">{formatMoney(brand.stats.bottom10.cost)}</div>
                        </div>
                        <div className="bg-red-600 rounded-lg p-4">
                          <div className="text-xs text-white mb-1 font-semibold">수익</div>
                          <div className="font-black text-white text-lg">{formatMoney(brand.stats.bottom10.profit)}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <button onClick={() => setExpandedBottom10Variable(!expandedBottom10Variable)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100">
                            <span className="text-sm font-bold text-gray-900">변동비 상세보기</span>
                            <span className={`transform transition-transform ${expandedBottom10Variable ? "rotate-180" : ""}`}>▼</span>
                          </button>
                          {expandedBottom10Variable && (
                            <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                              <div className="mt-3 space-y-2">
                                {variableCosts.bottom10.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-xs text-gray-700">{cost.label}</span>
                                    <span className="text-sm font-bold text-gray-900">{formatMoney(cost.amount)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <button onClick={() => setExpandedBottom10Fixed(!expandedBottom10Fixed)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100">
                            <span className="text-sm font-bold text-gray-900">고정비 상세보기</span>
                            <span className={`transform transition-transform ${expandedBottom10Fixed ? "rotate-180" : ""}`}>▼</span>
                          </button>
                          {expandedBottom10Fixed && (
                            <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                              <div className="mt-3 space-y-2">
                                {fixedCosts.bottom10.map((cost, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-xs text-gray-700">{cost.label}</span>
                                    <span className="text-sm font-bold text-gray-900">{formatMoney(cost.amount)}</span>
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

          {/* Disclaimer - Fixed at bottom */}
          <div className="px-6 pb-6 flex-shrink-0 border-t border-gray-200 bg-gray-50">
            <div className="pt-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: brand.color, color: "white" }}
                >
                  ℹ
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-900 mb-2">
                    유의사항
                  </h4>
                  <div className="space-y-1.5">
                    {[
                      "사장님 하루 10시간 / 주5일 이상 출근 기준",
                      "월세, 인건비, 배달 비중에 따라 순수익 차이 발생",
                      "이자비용 및 각종 세금 미포함",
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div
                          className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: brand.color }}
                        ></div>
                        <p className="text-xs leading-relaxed text-gray-600">
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
