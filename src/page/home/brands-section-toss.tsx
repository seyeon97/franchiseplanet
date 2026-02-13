"use client";

interface Brand {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoImage?: string;
  color: string;
  startupCost: string;
  stats: {
    top10: { revenue: number; cost: number; profit: number };
    average: { revenue: number; cost: number; profit: number };
    bottom10: { revenue: number; cost: number; profit: number };
  };
  description: string;
}

interface BrandsSectionTossProps {
  brands: Brand[];
  onBrandClick: (brandId: string) => void;
  selectedBrandId: string | null;
}

export default function BrandsSectionToss({
  brands,
  onBrandClick,
  selectedBrandId,
}: BrandsSectionTossProps) {
  return (
    <section className="min-h-screen snap-start bg-gray-50 px-4 py-12 md:px-6 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* 헤딩 - 토스 스타일 */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">
          어떤 브랜드가
          <br />
          궁금하세요?
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 font-medium">
          브랜드를 선택하면 실제 매출 정보를 볼 수 있어요
        </p>

        {/* 브랜드 리스트 - 세로 스크롤 (모바일 최적화) */}
        <div className="space-y-3 md:space-y-4">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onBrandClick(brand.id)}
              className={`w-full bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 flex items-center justify-between transition-all duration-300 ${
                selectedBrandId === brand.id
                  ? "shadow-xl scale-[1.02] ring-2 ring-blue-500"
                  : "shadow-md hover:shadow-lg hover:scale-[1.01]"
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                {/* 로고 */}
                {brand.logoImage ? (
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={brand.logoImage}
                      alt={brand.name}
                      className="w-12 h-12 md:w-14 md:h-14 object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl flex-shrink-0"
                    style={{ backgroundColor: `${brand.color}15` }}
                  >
                    {brand.logo}
                  </div>
                )}

                {/* 정보 */}
                <div className="text-left min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-0.5 md:mb-1 truncate">
                    {brand.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium truncate">
                    {brand.category} · 창업비용 {brand.startupCost}
                  </p>
                </div>
              </div>

              {/* 화살표 */}
              <svg
                className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform flex-shrink-0 ${
                  selectedBrandId === brand.id ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
