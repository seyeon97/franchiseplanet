"use client";

import { useState } from "react";

export default function InstaView() {
  const [selectedBrand, setSelectedBrand] = useState<string>("megacoffee");

  // 메가커피 데이터
  const megacoffee = {
    name: "메가커피",
    logoImage: "/megacoffee.svg",
    category: "카페",
    startupCost: "1억 2천만원",
    stats: {
      top10: { revenue: 8000, cost: 6490, profit: 1510 },
      average: { revenue: 3560, cost: 3231.4, profit: 328.6 },
      bottom10: { revenue: 2000, cost: 2468.5, profit: -468.5 },
    },
  };

  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()}만원`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 인스타 피드용 - 1080x1080 (정사각형) */}
      <div
        className="mx-auto bg-white"
        style={{
          width: "1080px",
          height: "1080px",
        }}
      >
        <div className="h-full flex flex-col p-16">
          {/* 헤더 */}
          <div className="mb-12">
            <div className="flex items-center gap-6 mb-8">
              <img
                src={megacoffee.logoImage}
                alt={megacoffee.name}
                className="w-32 h-32 object-contain"
              />
              <div>
                <h1 className="text-7xl font-black text-gray-900 mb-2">
                  {megacoffee.name}
                </h1>
                <p className="text-3xl text-gray-500 font-medium">
                  {megacoffee.category} · 창업비용 {megacoffee.startupCost}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[3rem] p-8">
              <div className="text-2xl text-gray-500 font-medium mb-3">
                초기 투자금 <span className="text-gray-400">(보증금 제외)</span>
              </div>
              <div className="text-6xl font-black text-gray-900">
                {megacoffee.startupCost}
              </div>
            </div>
          </div>

          {/* 타이틀 */}
          <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight">
            실제 매출은 얼마나 될까요?
          </h2>

          {/* 통계 카드 */}
          <div className="space-y-6 flex-1">
            {/* 상위 10% */}
            <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-4 border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-28 h-28 rounded-[2rem] bg-blue-500 flex items-center justify-center">
                    <span className="text-5xl font-black text-white">A+</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">상위 10%</div>
                    <div className="text-2xl text-gray-500 font-medium">우수 매장</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-gray-500 mb-2 font-medium">월 순수익</div>
                  <div className="text-6xl font-black text-blue-600">
                    {formatMoney(megacoffee.stats.top10.profit)}
                  </div>
                </div>
              </div>
            </div>

            {/* 평균 50% */}
            <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-4 border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-28 h-28 rounded-[2rem] bg-gray-600 flex items-center justify-center">
                    <span className="text-5xl font-black text-white">B</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">평균 50%</div>
                    <div className="text-2xl text-gray-500 font-medium">일반 매장</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-gray-500 mb-2 font-medium">월 순수익</div>
                  <div className="text-6xl font-black text-gray-600">
                    {formatMoney(megacoffee.stats.average.profit)}
                  </div>
                </div>
              </div>
            </div>

            {/* 하위 10% */}
            <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-4 border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-28 h-28 rounded-[2rem] bg-red-500 flex items-center justify-center">
                    <span className="text-5xl font-black text-white">C</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">하위 10%</div>
                    <div className="text-2xl text-gray-500 font-medium">주의 필요</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-gray-500 mb-2 font-medium">월 순수익</div>
                  <div className="text-6xl font-black text-red-500">
                    {formatMoney(megacoffee.stats.bottom10.profit)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 워터마크 */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] px-8 py-4">
              <div className="text-4xl font-black text-white">프차플래닛</div>
            </div>
          </div>
        </div>
      </div>

      {/* 인스타 스토리용 - 1080x1920 */}
      <div
        className="mx-auto bg-gradient-to-br from-blue-50 to-cyan-50"
        style={{
          width: "1080px",
          height: "1920px",
        }}
      >
        <div className="h-full flex flex-col p-16">
          {/* 로고 */}
          <div className="text-center mb-16">
            <img
              src={megacoffee.logoImage}
              alt={megacoffee.name}
              className="w-48 h-48 object-contain mx-auto mb-8"
            />
            <h1 className="text-8xl font-black text-gray-900 mb-4">
              {megacoffee.name}
            </h1>
            <p className="text-4xl text-gray-600 font-medium">
              실제 매출 데이터
            </p>
          </div>

          {/* 타이틀 */}
          <div className="text-center mb-12">
            <h2 className="text-6xl font-black text-gray-900 leading-tight">
              얼마 벌 수 있을까?
            </h2>
          </div>

          {/* 통계 카드 - 세로 배치 */}
          <div className="space-y-8 flex-1">
            {/* 상위 10% */}
            <div className="bg-white rounded-[4rem] p-12 shadow-2xl">
              <div className="text-center">
                <div className="w-40 h-40 rounded-[3rem] bg-blue-500 flex items-center justify-center mx-auto mb-6">
                  <span className="text-7xl font-black text-white">A+</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">상위 10%</div>
                <div className="text-3xl text-gray-500 mb-8 font-medium">우수 매장</div>
                <div className="border-t-4 border-gray-100 pt-8">
                  <div className="text-3xl text-gray-500 mb-3 font-medium">월 순수익</div>
                  <div className="text-8xl font-black text-blue-600">
                    {formatMoney(megacoffee.stats.top10.profit)}
                  </div>
                </div>
              </div>
            </div>

            {/* 평균 50% */}
            <div className="bg-white rounded-[4rem] p-12 shadow-2xl">
              <div className="text-center">
                <div className="w-40 h-40 rounded-[3rem] bg-gray-600 flex items-center justify-center mx-auto mb-6">
                  <span className="text-7xl font-black text-white">B</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">평균 50%</div>
                <div className="text-3xl text-gray-500 mb-8 font-medium">일반 매장</div>
                <div className="border-t-4 border-gray-100 pt-8">
                  <div className="text-3xl text-gray-500 mb-3 font-medium">월 순수익</div>
                  <div className="text-8xl font-black text-gray-600">
                    {formatMoney(megacoffee.stats.average.profit)}
                  </div>
                </div>
              </div>
            </div>

            {/* 하위 10% */}
            <div className="bg-white rounded-[4rem] p-12 shadow-2xl">
              <div className="text-center">
                <div className="w-40 h-40 rounded-[3rem] bg-red-500 flex items-center justify-center mx-auto mb-6">
                  <span className="text-7xl font-black text-white">C</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">하위 10%</div>
                <div className="text-3xl text-gray-500 mb-8 font-medium">주의 필요</div>
                <div className="border-t-4 border-gray-100 pt-8">
                  <div className="text-3xl text-gray-500 mb-3 font-medium">월 순수익</div>
                  <div className="text-8xl font-black text-red-500">
                    {formatMoney(megacoffee.stats.bottom10.profit)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 워터마크 */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[3rem] px-12 py-6">
              <div className="text-6xl font-black text-white">프차플래닛</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
