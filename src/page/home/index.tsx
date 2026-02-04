"use client";

import { useRef } from "react";
import HeroSection from "./hero-section";
import BrandsSliderSection from "./brands-slider-section";
import BrandsSection from "./brands-section";

const mockBrands = [
  {
    id: "1",
    name: "메가커피",
    category: "카페",
    logo: "☕",
    logoImage: "/megacoffee-logo.png",
    color: "#E67E22",
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
  const detailRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleBrandClick = (brandId: string) => {
    const element = detailRefs.current[brandId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <HeroSection />
      <BrandsSliderSection brands={mockBrands} onBrandClick={handleBrandClick} />
      <BrandsSection brands={mockBrands} detailRefs={detailRefs} />
    </main>
  );
}
