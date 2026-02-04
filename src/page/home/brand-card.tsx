"use client";

interface BrandData {
  id: string;
  name: string;
  category: string;
  logo: string;
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
  const formatMoney = (amount: number) => {
    if (amount >= 10000) {
      return `${(amount / 10000).toFixed(1)}억원`;
    }
    return `${amount.toLocaleString()}만원`;
  };

  const maxRevenue = Math.max(
    brand.stats.top10.revenue,
    brand.stats.average.revenue,
    brand.stats.bottom10.revenue
  );

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
            <div className="text-7xl drop-shadow-2xl">{brand.logo}</div>

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
              style={{ color: brand.color }}
            >
              {brand.name}
            </h2>

            {/* Startup Cost */}
            <div className="mb-3 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-700 font-semibold">
                💰 창업비용: {brand.startupCost}
              </p>
            </div>

            <p className="text-gray-600 text-sm mb-4">{brand.description}</p>

            {/* Disclaimer */}
            <div className="mb-5 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 leading-relaxed">
                📌 사장님 하루 10시간 / 주5일 이상 출근 기준
                <br />• 월세, 인건비, 배달 비중에 따라 순수익에 차이가 있을 수
                있습니다.
                <br />• 이자비용 및 각종 세금은 계산하지 않았습니다.
              </p>
            </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
