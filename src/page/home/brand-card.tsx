"use client";

interface BrandData {
  id: string;
  name: string;
  category: string;
  logo: string;
  image: string;
  color: string;
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
  note?: string;
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
          {/* Header Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, ${brand.color}88 100%)`,
              }}
            ></div>

            {/* Logo */}
            <div className="absolute top-4 left-4 text-5xl drop-shadow-lg">
              {brand.logo}
            </div>

            {/* Category badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800">
              {brand.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Brand name */}
            <h2
              className="text-3xl font-black mb-1"
              style={{ color: brand.color }}
            >
              {brand.name}
            </h2>
            <p className="text-gray-600 text-sm mb-6">{brand.description}</p>

            {/* Stats */}
            <div className="space-y-5">
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

            {/* Note */}
            {brand.note && (
              <div className="mt-5 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 leading-relaxed">
                  💡 {brand.note}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
