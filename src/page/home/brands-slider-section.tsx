"use client";

import BrandThumbnail from "./brand-thumbnail";

interface Brand {
  id: string;
  name: string;
  category: string;
  logo: string;
  color: string;
  startupCost: string;
  stats: {
    top10: { revenue: number; cost: number; profit: number };
    average: { revenue: number; cost: number; profit: number };
    bottom10: { revenue: number; cost: number; profit: number };
  };
  description: string;
}

interface BrandsSliderSectionProps {
  brands: Brand[];
  onBrandClick: (brandId: string) => void;
}

export default function BrandsSliderSection({
  brands,
  onBrandClick,
}: BrandsSliderSectionProps) {
  return (
    <section className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
      <div className="w-full px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            브랜드 선택하기
          </h2>
          <p className="text-lg text-gray-600">
            원하는 프랜차이즈를 클릭하여 상세 정보를 확인하세요
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex gap-6 px-4 md:px-12">
              {brands.map((brand) => (
                <BrandThumbnail
                  key={brand.id}
                  logo={brand.logo}
                  name={brand.name}
                  category={brand.category}
                  color={brand.color}
                  onClick={() => onBrandClick(brand.id)}
                />
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>←</span>
              <span>좌우로 스크롤하여 다른 브랜드 보기</span>
              <span>→</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
