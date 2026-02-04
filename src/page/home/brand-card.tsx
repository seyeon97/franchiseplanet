"use client";

interface BrandData {
  id: string;
  name: string;
  category: string;
  logo: string;
  image: string;
  color: string;
  stats: {
    top10: number;
    average: number;
    bottom10: number;
  };
  description: string;
}

interface BrandCardProps {
  brand: BrandData;
}

export default function BrandCard({ brand }: BrandCardProps) {
  const formatMoney = (amount: number) => {
    return `${(amount / 10000).toFixed(0)}억원`;
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
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden">
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
            <div className="absolute top-6 left-6 text-6xl drop-shadow-lg">
              {brand.logo}
            </div>

            {/* Category badge */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
              {brand.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Brand name */}
            <h2
              className="text-4xl font-black mb-2"
              style={{ color: brand.color }}
            >
              {brand.name}
            </h2>
            <p className="text-gray-600 mb-8">{brand.description}</p>

            {/* Stats */}
            <div className="space-y-6">
              {/* Top 10% */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-500">
                    상위 10%
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {formatMoney(brand.stats.top10)}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    style={{
                      width: `${(brand.stats.top10 / 20000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Average */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-500">
                    평균 50%
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatMoney(brand.stats.average)}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{
                      width: `${(brand.stats.average / 20000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Bottom 10% */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-500">
                    하위 10%
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    {formatMoney(brand.stats.bottom10)}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                    style={{
                      width: `${(brand.stats.bottom10 / 20000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 leading-relaxed">
                💡 연 매출 기준 통계입니다. 실제 수익은 임대료, 인건비 등
                운영비를 제외한 금액입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
