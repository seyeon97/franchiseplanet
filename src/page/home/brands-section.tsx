"use client";

import BrandCard from "./brand-card";

const mockBrands = [
  {
    id: "1",
    name: "메가커피",
    category: "카페",
    logo: "☕",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
    color: "#E67E22",
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
    note: "창업비용 1.5억~2억 (보증금을 제외한 추정 창업비용). 월세, 인건비, 배달 비중에 따라 순수익에 차이가 있을 수 있습니다.",
  },
  {
    id: "2",
    name: "맘스터치",
    category: "치킨·버거",
    logo: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    color: "#FF6B35",
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
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    color: "#8B4513",
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
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",
    color: "#DC143C",
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
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    color: "#FFB6C1",
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
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    color: "#228B22",
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

export default function BrandsSection() {
  return (
    <section className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {mockBrands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </section>
  );
}
