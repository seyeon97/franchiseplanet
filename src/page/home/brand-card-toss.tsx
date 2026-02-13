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

export default function BrandCardToss({ brand }: BrandCardProps) {
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
    <section className="min-h-screen snap-start bg-white px-6 py-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 - 토스 스타일 큰 타이포그래피 */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            {brand.logoImage ? (
              <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={brand.logoImage}
                  alt={brand.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ) : (
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
                style={{ backgroundColor: `${brand.color}15` }}
              >
                {brand.logo}
              </div>
            )}
            <div>
              <h2 className="text-4xl font-black text-gray-900">{brand.name}</h2>
              <p className="text-lg text-gray-500 font-medium mt-1">{brand.category}</p>
            </div>
          </div>

          {/* 초기 투자금 - 토스 스타일 카드 */}
          <div className="bg-gray-50 rounded-3xl p-6 mb-8">
            <div className="text-sm text-gray-500 font-medium mb-2">
              초기 투자금 <span className="text-gray-400">(보증금 제외)</span>
            </div>
            <div className="text-3xl font-black text-gray-900">{brand.startupCost}</div>
          </div>

          <h3 className="text-3xl font-black text-gray-900 mb-2">
            실제 매출은
            <br />
            얼마나 될까요?
          </h3>
          <p className="text-lg text-gray-600 font-medium">
            상위 10%, 평균, 하위 10% 매장의 실제 데이터예요
          </p>
        </div>

        {/* 통계 카드들 */}
        <div className="space-y-4 mb-8">
          {/* 상위 10% */}
          <div
            onClick={() => isMegaCoffee && setShowTop10Detail(!showTop10Detail)}
            className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 transition-all hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center">
                  <span className="text-2xl font-black text-white">A+</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">상위 10%</div>
                  <div className="text-sm text-gray-500 font-medium">우수 매장</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1 font-medium">월 순수익</div>
                <div className="text-3xl font-black text-blue-600">
                  {formatMoney(brand.stats.top10.profit)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">매출</div>
                <div className="font-bold text-gray-900">{formatMoney(brand.stats.top10.revenue)}</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">비용</div>
                <div className="font-bold text-gray-900">{formatMoney(brand.stats.top10.cost)}</div>
              </div>
              <div className="bg-blue-500 rounded-2xl p-3 text-center">
                <div className="text-xs text-white mb-1 font-bold">수익</div>
                <div className="font-bold text-white">{formatMoney(brand.stats.top10.profit)}</div>
              </div>
            </div>
          </div>

          {/* 평균 50% */}
          <div
            onClick={() => isMegaCoffee && setShowAverageDetail(!showAverageDetail)}
            className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 transition-all hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gray-600 flex items-center justify-center">
                  <span className="text-2xl font-black text-white">B</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">평균 50%</div>
                  <div className="text-sm text-gray-500 font-medium">일반 매장</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1 font-medium">월 순수익</div>
                <div className="text-3xl font-black text-gray-600">
                  {formatMoney(brand.stats.average.profit)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">매출</div>
                <div className="font-bold text-gray-900">{formatMoney(brand.stats.average.revenue)}</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">비용</div>
                <div className="font-bold text-gray-900">{formatMoney(brand.stats.average.cost)}</div>
              </div>
              <div className="bg-gray-600 rounded-2xl p-3 text-center">
                <div className="text-xs text-white mb-1 font-bold">수익</div>
                <div className="font-bold text-white">{formatMoney(brand.stats.average.profit)}</div>
              </div>
            </div>
          </div>

          {/* 하위 10% */}
          <div
            onClick={() => isMegaCoffee && setShowBottom10Detail(!showBottom10Detail)}
            className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 transition-all hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center">
                  <span className="text-2xl font-black text-white">C</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">하위 10%</div>
                  <div className="text-sm text-gray-500 font-medium">주의 필요</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1 font-medium">월 순수익</div>
                <div className="text-3xl font-black text-red-500">
                  {formatMoney(brand.stats.bottom10.profit)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">매출</div>
                <div className="font-bold text-gray-900">{formatMoney(brand.stats.bottom10.revenue)}</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">비용</div>
                <div className="font-bold text-gray-900">{formatMoney(brand.stats.bottom10.cost)}</div>
              </div>
              <div className="bg-red-500 rounded-2xl p-3 text-center">
                <div className="text-xs text-white mb-1 font-bold">수익</div>
                <div className="font-bold text-white">{formatMoney(brand.stats.bottom10.profit)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 유의사항 - 토스 스타일 */}
        <div className="bg-gray-50 rounded-3xl p-6">
          <h4 className="text-sm font-bold text-gray-900 mb-3">알아두세요</h4>
          <ul className="space-y-2">
            {[
              "사장님 하루 10시간 / 주5일 이상 출근 기준",
              "월세, 인건비, 배달 비중에 따라 순수익 차이 발생",
              "이자비용 및 각종 세금 미포함",
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-sm text-gray-600 leading-relaxed font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top 10% Modal */}
        {isMegaCoffee && showTop10Detail && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowTop10Detail(false)}
          >
            <div
              className="bg-white rounded-t-[2rem] md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-blue-500 p-6 rounded-t-[2rem] md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                      <span className="text-2xl font-black text-blue-500">A+</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">상위 10%</h3>
                      <p className="text-sm text-blue-100 font-medium">우수 매장 상세 분석</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTop10Detail(false)}
                    className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-100">
                    <div className="text-xs text-blue-600 mb-1 font-bold">매출</div>
                    <div className="font-black text-blue-900 text-lg">
                      {formatMoney(brand.stats.top10.revenue)}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-100">
                    <div className="text-xs text-blue-600 mb-1 font-bold">비용</div>
                    <div className="font-black text-blue-900 text-lg">
                      {formatMoney(brand.stats.top10.cost)}
                    </div>
                  </div>
                  <div className="bg-blue-500 rounded-2xl p-4">
                    <div className="text-xs text-white mb-1 font-bold">수익</div>
                    <div className="font-black text-white text-lg">
                      {formatMoney(brand.stats.top10.profit)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedTop10Variable(!expandedTop10Variable)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="text-sm font-bold text-gray-900">변동비 상세보기</span>
                      <span
                        className={`transform transition-transform ${
                          expandedTop10Variable ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedTop10Variable && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                        <div className="mt-3 space-y-2">
                          {variableCosts.top10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            >
                              <span className="text-sm text-gray-700 font-medium">{cost.label}</span>
                              <span className="text-sm font-bold text-gray-900">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedTop10Fixed(!expandedTop10Fixed)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="text-sm font-bold text-gray-900">고정비 상세보기</span>
                      <span
                        className={`transform transition-transform ${
                          expandedTop10Fixed ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedTop10Fixed && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.top10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            >
                              <span className="text-sm text-gray-700 font-medium">{cost.label}</span>
                              <span className="text-sm font-bold text-gray-900">
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

        {/* Average Modal */}
        {isMegaCoffee && showAverageDetail && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowAverageDetail(false)}
          >
            <div
              className="bg-white rounded-t-[2rem] md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-600 p-6 rounded-t-[2rem] md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                      <span className="text-2xl font-black text-gray-600">B</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">평균 50%</h3>
                      <p className="text-sm text-gray-100 font-medium">일반 매장 상세 분석</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAverageDetail(false)}
                    className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                    <div className="text-xs text-gray-600 mb-1 font-bold">매출</div>
                    <div className="font-black text-gray-900 text-lg">
                      {formatMoney(brand.stats.average.revenue)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                    <div className="text-xs text-gray-600 mb-1 font-bold">비용</div>
                    <div className="font-black text-gray-900 text-lg">
                      {formatMoney(brand.stats.average.cost)}
                    </div>
                  </div>
                  <div className="bg-gray-600 rounded-2xl p-4">
                    <div className="text-xs text-white mb-1 font-bold">수익</div>
                    <div className="font-black text-white text-lg">
                      {formatMoney(brand.stats.average.profit)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedAverageVariable(!expandedAverageVariable)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="text-sm font-bold text-gray-900">변동비 상세보기</span>
                      <span
                        className={`transform transition-transform ${
                          expandedAverageVariable ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedAverageVariable && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                        <div className="mt-3 space-y-2">
                          {variableCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            >
                              <span className="text-sm text-gray-700 font-medium">{cost.label}</span>
                              <span className="text-sm font-bold text-gray-900">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedAverageFixed(!expandedAverageFixed)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="text-sm font-bold text-gray-900">고정비 상세보기</span>
                      <span
                        className={`transform transition-transform ${
                          expandedAverageFixed ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedAverageFixed && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.average.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            >
                              <span className="text-sm text-gray-700 font-medium">{cost.label}</span>
                              <span className="text-sm font-bold text-gray-900">
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

        {/* Bottom 10% Modal */}
        {isMegaCoffee && showBottom10Detail && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowBottom10Detail(false)}
          >
            <div
              className="bg-white rounded-t-[2rem] md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-red-500 p-6 rounded-t-[2rem] md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                      <span className="text-2xl font-black text-red-500">C</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">하위 10%</h3>
                      <p className="text-sm text-red-100 font-medium">주의 필요 매장 상세 분석</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBottom10Detail(false)}
                    className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-red-50 rounded-2xl p-4 border-2 border-red-100">
                    <div className="text-xs text-red-600 mb-1 font-bold">매출</div>
                    <div className="font-black text-red-900 text-lg">
                      {formatMoney(brand.stats.bottom10.revenue)}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-4 border-2 border-red-100">
                    <div className="text-xs text-red-600 mb-1 font-bold">비용</div>
                    <div className="font-black text-red-900 text-lg">
                      {formatMoney(brand.stats.bottom10.cost)}
                    </div>
                  </div>
                  <div className="bg-red-500 rounded-2xl p-4">
                    <div className="text-xs text-white mb-1 font-bold">수익</div>
                    <div className="font-black text-white text-lg">
                      {formatMoney(brand.stats.bottom10.profit)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedBottom10Variable(!expandedBottom10Variable)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="text-sm font-bold text-gray-900">변동비 상세보기</span>
                      <span
                        className={`transform transition-transform ${
                          expandedBottom10Variable ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedBottom10Variable && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                        <div className="mt-3 space-y-2">
                          {variableCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            >
                              <span className="text-sm text-gray-700 font-medium">{cost.label}</span>
                              <span className="text-sm font-bold text-gray-900">
                                {formatMoney(cost.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedBottom10Fixed(!expandedBottom10Fixed)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="text-sm font-bold text-gray-900">고정비 상세보기</span>
                      <span
                        className={`transform transition-transform ${
                          expandedBottom10Fixed ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedBottom10Fixed && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                        <div className="mt-3 space-y-2">
                          {fixedCosts.bottom10.map((cost, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            >
                              <span className="text-sm text-gray-700 font-medium">{cost.label}</span>
                              <span className="text-sm font-bold text-gray-900">
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
    </section>
  );
}
