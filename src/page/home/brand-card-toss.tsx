"use client";

import { useState, useEffect } from "react";

interface BrandData {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoImage?: string;
  color: string;
  startupCost: string;
  initialCosts?: {
    franchise: number;
    interior: number;
    equipment: number;
  };
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

  // 모달이 열릴 때 모든 확장 상태 초기화
  useEffect(() => {
    if (showTop10Detail) {
      setExpandedTop10Variable(false);
      setExpandedTop10Fixed(false);
    }
  }, [showTop10Detail]);

  useEffect(() => {
    if (showAverageDetail) {
      setExpandedAverageVariable(false);
      setExpandedAverageFixed(false);
    }
  }, [showAverageDetail]);

  useEffect(() => {
    if (showBottom10Detail) {
      setExpandedBottom10Variable(false);
      setExpandedBottom10Fixed(false);
    }
  }, [showBottom10Detail]);

  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()}만원`;
  };

  // 브랜드별 변동비/고정비 데이터 생성
  const getBrandCosts = () => {
    const { top10, average, bottom10 } = brand.stats;

    // 변동비 비율 설정 (브랜드 카테고리별 차이)
    const isFood = brand.category.includes("치킨") || brand.category.includes("버거") || brand.category.includes("한식");
    const isCafe = brand.category.includes("카페");
    const isDessert = brand.category.includes("디저트");

    const variableRates = {
      food: { cogs: 0.38, card: 0.015, delivery: 0.32, platform: 0.05, utility: 0.025, labor: 0.23 },
      cafe: { cogs: 0.36, card: 0.015, delivery: 0.30, platform: 0.05, utility: 0.02, labor: 0.22 },
      dessert: { cogs: 0.34, card: 0.015, delivery: 0.28, platform: 0.05, utility: 0.022, labor: 0.20 },
    };

    const rates = isFood ? variableRates.food : isCafe ? variableRates.cafe : variableRates.dessert;

    return {
      variable: {
        top10: [
          { label: `원가율 (${(rates.cogs * 100).toFixed(0)}%)`, amount: Math.round(top10.revenue * rates.cogs) },
          { label: `카드수수료 (${(rates.card * 100).toFixed(1)}%)`, amount: Math.round(top10.revenue * rates.card) },
          { label: `배달수수료 (${(rates.delivery * 100).toFixed(0)}%)`, amount: Math.round(top10.revenue * rates.delivery * 0.4) },
          { label: `플랫폼수수료 (${(rates.platform * 100).toFixed(0)}%)`, amount: Math.round(top10.revenue * rates.platform) },
          { label: `수도광열비 (${(rates.utility * 100).toFixed(1)}%)`, amount: Math.round(top10.revenue * rates.utility) },
          { label: `인건비 (${(rates.labor * 100).toFixed(0)}%)`, amount: Math.round(top10.revenue * rates.labor) },
        ],
        average: [
          { label: `원가율 (${(rates.cogs * 100).toFixed(0)}%)`, amount: Math.round(average.revenue * rates.cogs) },
          { label: `카드수수료 (${(rates.card * 100).toFixed(1)}%)`, amount: Math.round(average.revenue * rates.card) },
          { label: `배달수수료 (${(rates.delivery * 100).toFixed(0)}%)`, amount: Math.round(average.revenue * rates.delivery * 0.4) },
          { label: `플랫폼수수료 (${(rates.platform * 100).toFixed(0)}%)`, amount: Math.round(average.revenue * rates.platform) },
          { label: `수도광열비 (${(rates.utility * 100).toFixed(1)}%)`, amount: Math.round(average.revenue * rates.utility) },
          { label: `인건비 (${(rates.labor * 100).toFixed(0)}%)`, amount: Math.round(average.revenue * rates.labor) },
        ],
        bottom10: [
          { label: `원가율 (${(rates.cogs * 100).toFixed(0)}%)`, amount: Math.round(bottom10.revenue * rates.cogs) },
          { label: `카드수수료 (${(rates.card * 100).toFixed(1)}%)`, amount: Math.round(bottom10.revenue * rates.card) },
          { label: `배달수수료 (${(rates.delivery * 100).toFixed(0)}%)`, amount: Math.round(bottom10.revenue * rates.delivery * 0.4) },
          { label: `플랫폼수수료 (${(rates.platform * 100).toFixed(0)}%)`, amount: Math.round(bottom10.revenue * rates.platform) },
          { label: `수도광열비 (${(rates.utility * 100).toFixed(1)}%)`, amount: Math.round(bottom10.revenue * rates.utility) },
          { label: `인건비 (${(rates.labor * 100).toFixed(0)}%)`, amount: Math.round(bottom10.revenue * rates.labor) },
        ],
      },
      fixed: {
        top10: [
          { label: "임대료", amount: Math.round(top10.revenue * 0.048) },
          { label: "관리비", amount: Math.round(top10.revenue * 0.0048) },
          { label: "광고비", amount: Math.round(top10.revenue * 0.012) },
          { label: "정기 서비스", amount: 30 },
          { label: "소모품비", amount: Math.round(top10.revenue * 0.004) },
          { label: "로열티", amount: Math.round(top10.revenue * 0.002) },
        ],
        average: [
          { label: "임대료", amount: Math.round(average.revenue * 0.062) },
          { label: "관리비", amount: Math.round(average.revenue * 0.0062) },
          { label: "광고비", amount: Math.round(average.revenue * 0.0028) },
          { label: "정기 서비스", amount: 30 },
          { label: "소모품비", amount: Math.round(average.revenue * 0.0084) },
          { label: "로열티", amount: Math.round(average.revenue * 0.0046) },
        ],
        bottom10: [
          { label: "임대료", amount: Math.round(bottom10.revenue * 0.176) },
          { label: "관리비", amount: Math.round(bottom10.revenue * 0.015) },
          { label: "광고비", amount: Math.round(bottom10.revenue * 0.005) },
          { label: "정기 서비스", amount: 30 },
          { label: "소모품비", amount: Math.round(bottom10.revenue * 0.015) },
          { label: "로열티", amount: Math.round(bottom10.revenue * 0.008) },
        ],
      },
    };
  };

  const costs = getBrandCosts();
  const variableCosts = costs.variable;
  const fixedCosts = costs.fixed;

  return (
    <section className="min-h-screen bg-white px-4 py-8 md:px-6 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 - 토스 스타일 큰 타이포그래피 */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            {brand.logoImage ? (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={brand.logoImage}
                  alt={brand.name}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
            ) : (
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-3xl md:text-4xl flex-shrink-0"
                style={{ backgroundColor: `${brand.color}15` }}
              >
                {brand.logo}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 truncate">{brand.name}</h2>
              <p className="text-sm md:text-lg text-gray-500 font-medium mt-1">{brand.category}</p>
            </div>
          </div>

          {/* 초기 투자금 - 토스 스타일 카드 */}
          <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm md:text-base text-gray-500 font-medium">
                초기 투자금 <span className="text-gray-400 text-xs md:text-sm">(보증금 제외)</span>
              </div>
              <div className="text-lg md:text-xl font-black text-gray-900">{brand.startupCost}</div>
            </div>
            {brand.initialCosts && (
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1 font-medium">가맹비</div>
                  <div className="text-sm md:text-base font-bold text-gray-900">
                    {brand.initialCosts.franchise.toLocaleString()}만원
                  </div>
                </div>
                <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1 font-medium">인테리어</div>
                  <div className="text-sm md:text-base font-bold text-gray-900">
                    {brand.initialCosts.interior.toLocaleString()}만원
                  </div>
                </div>
                <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1 font-medium">장비</div>
                  <div className="text-sm md:text-base font-bold text-gray-900">
                    {brand.initialCosts.equipment.toLocaleString()}만원
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 통계 카드들 */}
        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {/* 상위 10% */}
          <div
            onClick={() =>  setShowTop10Detail(!showTop10Detail)}
            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border-2 border-gray-100 transition-all hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-2xl font-black text-white">A+</span>
                </div>
                <div>
                  <div className="text-base md:text-lg font-bold text-gray-900">상위 10%</div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium">우수 매장</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">월 순수익</div>
                <div className="text-xl md:text-3xl font-black text-blue-600">
                  {formatMoney(brand.stats.top10.profit)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3">
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">매출</div>
                <div className="text-sm md:text-base font-bold text-gray-900">{formatMoney(brand.stats.top10.revenue)}</div>
              </div>
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">비용</div>
                <div className="text-sm md:text-base font-bold text-gray-900">{formatMoney(brand.stats.top10.cost)}</div>
              </div>
              <div className="bg-blue-500 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-white mb-1 font-bold">수익</div>
                <div className="text-sm md:text-base font-bold text-white">{formatMoney(brand.stats.top10.profit)}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 text-gray-700 text-sm font-medium">
              <span>자세히 보기</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 평균 50% */}
          <div
            onClick={() =>  setShowAverageDetail(!showAverageDetail)}
            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border-2 border-gray-100 transition-all hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-2xl font-black text-white">B</span>
                </div>
                <div>
                  <div className="text-base md:text-lg font-bold text-gray-900">평균 50%</div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium">일반 매장</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">월 순수익</div>
                <div className="text-xl md:text-3xl font-black text-gray-600">
                  {formatMoney(brand.stats.average.profit)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3">
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">매출</div>
                <div className="text-sm md:text-base font-bold text-gray-900">{formatMoney(brand.stats.average.revenue)}</div>
              </div>
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">비용</div>
                <div className="text-sm md:text-base font-bold text-gray-900">{formatMoney(brand.stats.average.cost)}</div>
              </div>
              <div className="bg-gray-600 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-white mb-1 font-bold">수익</div>
                <div className="text-sm md:text-base font-bold text-white">{formatMoney(brand.stats.average.profit)}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 text-gray-700 text-sm font-medium">
              <span>자세히 보기</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 하위 10% */}
          <div
            onClick={() =>  setShowBottom10Detail(!showBottom10Detail)}
            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border-2 border-gray-100 transition-all hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-2xl font-black text-white">C</span>
                </div>
                <div>
                  <div className="text-base md:text-lg font-bold text-gray-900">하위 10%</div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium">주의 필요</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">월 순수익</div>
                <div className="text-xl md:text-3xl font-black text-red-500">
                  {formatMoney(brand.stats.bottom10.profit)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3">
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">매출</div>
                <div className="text-sm md:text-base font-bold text-gray-900">{formatMoney(brand.stats.bottom10.revenue)}</div>
              </div>
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-gray-500 mb-1 font-medium">비용</div>
                <div className="text-sm md:text-base font-bold text-gray-900">{formatMoney(brand.stats.bottom10.cost)}</div>
              </div>
              <div className="bg-red-500 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                <div className="text-xs text-white mb-1 font-bold">수익</div>
                <div className="text-sm md:text-base font-bold text-white">{formatMoney(brand.stats.bottom10.profit)}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 text-gray-700 text-sm font-medium">
              <span>자세히 보기</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 유의사항 - 토스 스타일 */}
        <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-6">
          <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-3">알아두세요</h4>
          <ul className="space-y-1.5 md:space-y-2">
            {[
              "사장님 하루 10시간 / 주5일 이상 출근 기준",
              "월세, 인건비, 배달 비중에 따라 순수익 차이 발생",
              "이자비용 및 각종 세금 미포함",
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5 md:mt-1 text-xs md:text-sm">•</span>
                <span className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top 10% Modal */}
        { showTop10Detail && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowTop10Detail(false)}
          >
            <div
              className="bg-white rounded-t-[2rem] md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto pb-24"
              onClick={(e) => e.stopPropagation()}
              style={{ WebkitOverflowScrolling: 'touch' }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedTop10Variable(!expandedTop10Variable);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition-colors"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedTop10Fixed(!expandedTop10Fixed);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition-colors"
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
        { showAverageDetail && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowAverageDetail(false)}
          >
            <div
              className="bg-white rounded-t-[2rem] md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto pb-24"
              onClick={(e) => e.stopPropagation()}
              style={{ WebkitOverflowScrolling: 'touch' }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedAverageVariable(!expandedAverageVariable);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition-colors"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedAverageFixed(!expandedAverageFixed);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition-colors"
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
        { showBottom10Detail && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowBottom10Detail(false)}
          >
            <div
              className="bg-white rounded-t-[2rem] md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto pb-24"
              onClick={(e) => e.stopPropagation()}
              style={{ WebkitOverflowScrolling: 'touch' }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedBottom10Variable(!expandedBottom10Variable);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition-colors"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedBottom10Fixed(!expandedBottom10Fixed);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition-colors"
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
