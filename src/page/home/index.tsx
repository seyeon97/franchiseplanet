"use client";

import React, { useEffect, useState } from "react";
import HeroSectionToss from "./hero-section-toss";
import BrandsSectionToss from "./brands-section-toss";
import BrandCardToss from "./brand-card-toss";

// 어드민 Brand 인터페이스
interface AdminBrand {
  id: number;
  name: string;
  category: string;
  totalCost: number;
  thumbnail: string;
  description: string;
  monthlyRevenue: number;
  logoImage?: string;
  color?: string;
  detailedCosts?: {
    variableCosts: Array<{ label: string; percentage?: string; low: number; mid: number; high: number }>;
    fixedCosts: Array<{ label: string; low: number; mid: number; high: number }>;
  };
}

const defaultMockBrands = [
  {
    id: "1",
    name: "메가커피",
    category: "카페",
    logo: "☕",
    logoImage: "/megacoffee-logo.png",
    color: "#F25C05",
    startupCost: "1.5억~2억원",
    stats: {
      top10: {
        revenue: 8000,
        cost: 6331,
        profit: 1668,
      },
      average: {
        revenue: 3560,
        cost: 3550,
        profit: 504,
      },
      bottom10: {
        revenue: 2000,
        cost: 1515,
        profit: 181,
      },
    },
    description: "합리적인 가격의 메가급 커피 전문점",
  },
  {
    id: "2",
    name: "맘스터치",
    category: "치킨·버거",
    logo: "🍔",
    color: "#FF6B35",
    startupCost: "2억~3억원",
    stats: {
      top10: {
        revenue: 15000,
        cost: 11500,
        profit: 3500,
      },
      average: {
        revenue: 8500,
        cost: 6800,
        profit: 1700,
      },
      bottom10: {
        revenue: 3200,
        cost: 2600,
        profit: 600,
      },
    },
    description: "국내 대표 프리미엄 버거 프랜차이즈",
  },
  {
    id: "3",
    name: "컴포즈커피",
    category: "카페",
    logo: "☕",
    color: "#8B4513",
    startupCost: "1억~1.5억원",
    stats: {
      top10: {
        revenue: 12000,
        cost: 9200,
        profit: 2800,
      },
      average: {
        revenue: 7800,
        cost: 6200,
        profit: 1600,
      },
      bottom10: {
        revenue: 4500,
        cost: 3700,
        profit: 800,
      },
    },
    description: "저렴한 가격의 커피 전문점",
  },
  {
    id: "4",
    name: "교촌치킨",
    category: "치킨",
    logo: "🍗",
    color: "#DC143C",
    startupCost: "2.5억~3.5억원",
    stats: {
      top10: {
        revenue: 18000,
        cost: 13500,
        profit: 4500,
      },
      average: {
        revenue: 9500,
        cost: 7200,
        profit: 2300,
      },
      bottom10: {
        revenue: 4000,
        cost: 3200,
        profit: 800,
      },
    },
    description: "오리지널 간장치킨의 명가",
  },
  {
    id: "5",
    name: "설빙",
    category: "디저트",
    logo: "🍧",
    color: "#FFB6C1",
    startupCost: "1.5억~2.5억원",
    stats: {
      top10: {
        revenue: 10000,
        cost: 7500,
        profit: 2500,
      },
      average: {
        revenue: 6200,
        cost: 4900,
        profit: 1300,
      },
      bottom10: {
        revenue: 2800,
        cost: 2300,
        profit: 500,
      },
    },
    description: "프리미엄 빙수 디저트 카페",
  },
  {
    id: "6",
    name: "본죽",
    category: "한식",
    logo: "🍲",
    color: "#228B22",
    startupCost: "1.5억~2억원",
    stats: {
      top10: {
        revenue: 11000,
        cost: 8200,
        profit: 2800,
      },
      average: {
        revenue: 7000,
        cost: 5500,
        profit: 1500,
      },
      bottom10: {
        revenue: 3500,
        cost: 2900,
        profit: 600,
      },
    },
    description: "건강한 죽 전문 프랜차이즈",
  },
];

export default function HomePage() {
  const [selectedBrandId, setSelectedBrandId] = React.useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [brands, setBrands] = useState(defaultMockBrands);

  // localStorage에서 브랜드 데이터 불러오기
  useEffect(() => {
    const loadBrands = () => {
      const stored = localStorage.getItem("brands");
      if (stored) {
        try {
          const adminBrands: AdminBrand[] = JSON.parse(stored);
          // 어드민 Brand 데이터를 홈페이지 형식으로 변환
          const convertedBrands = adminBrands.map((adminBrand) => {
            const detailedCosts = adminBrand.detailedCosts || { variableCosts: [], fixedCosts: [] };
            const variableCosts = detailedCosts.variableCosts || [];
            const fixedCosts = detailedCosts.fixedCosts || [];

            // 변동비 총합 계산
            const calcVariableCosts = (scenario: 'low' | 'mid' | 'high') => {
              return variableCosts.reduce((sum, cost) => sum + (cost[scenario] || 0), 0);
            };

            // 고정비 총합 계산
            const calcFixedCosts = (scenario: 'low' | 'mid' | 'high') => {
              return fixedCosts.reduce((sum, cost) => sum + (cost[scenario] || 0), 0);
            };

            return {
              id: String(adminBrand.id),
              name: adminBrand.name,
              category: adminBrand.category,
              logo: adminBrand.thumbnail,
              logoImage: adminBrand.logoImage,
              color: adminBrand.color || "#3B82F6",
              startupCost: `${(adminBrand.totalCost / 10).toFixed(1)}억원`,
              stats: {
                top10: {
                  revenue: adminBrand.monthlyRevenue || 3560,
                  cost: calcVariableCosts('high') + calcFixedCosts('high'),
                  profit: (adminBrand.monthlyRevenue || 3560) - (calcVariableCosts('high') + calcFixedCosts('high')),
                },
                average: {
                  revenue: adminBrand.monthlyRevenue || 3560,
                  cost: calcVariableCosts('mid') + calcFixedCosts('mid'),
                  profit: (adminBrand.monthlyRevenue || 3560) - (calcVariableCosts('mid') + calcFixedCosts('mid')),
                },
                bottom10: {
                  revenue: adminBrand.monthlyRevenue || 3560,
                  cost: calcVariableCosts('low') + calcFixedCosts('low'),
                  profit: (adminBrand.monthlyRevenue || 3560) - (calcVariableCosts('low') + calcFixedCosts('low')),
                },
              },
              description: adminBrand.description,
            };
          });
          setBrands(convertedBrands);
        } catch (error) {
          console.error("브랜드 데이터 로드 실패:", error);
          setBrands(defaultMockBrands);
        }
      }
    };

    loadBrands();

    // localStorage 변경 감지
    window.addEventListener('storage', loadBrands);
    return () => window.removeEventListener('storage', loadBrands);
  }, []);

  const handleBrandClick = (brandId: string) => {
    setSelectedBrandId(brandId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Wait for animation to finish before clearing selected brand
    setTimeout(() => {
      setSelectedBrandId(null);
    }, 300);
  };

  const selectedBrand = brands.find(
    (brand) => brand.id === selectedBrandId
  );

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-20">
        <HeroSectionToss />
        <BrandsSectionToss
          brands={brands}
          onBrandClick={handleBrandClick}
          selectedBrandId={selectedBrandId}
        />
      </main>

      {/* Modal with slide-up transition */}
      {selectedBrand && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleCloseModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className={`absolute inset-x-0 bottom-0 bg-white rounded-t-3xl transition-transform duration-300 ${
              isModalOpen ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh" }}
          >
            {/* Close button */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-3xl">
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-black text-gray-900">
                {selectedBrand.name}
              </h2>
              <div className="w-10" />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto pb-20" style={{ maxHeight: "calc(90vh - 60px)" }}>
              <BrandCardToss brand={selectedBrand} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
