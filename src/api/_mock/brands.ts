export interface BrandData {
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

export const mockBrands: BrandData[] = [
  {
    id: "1",
    name: "맘스터치",
    category: "치킨·버거",
    logo: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    color: "#FF6B35",
    stats: {
      top10: 15000,
      average: 8500,
      bottom10: 3200,
    },
    description: "국내 대표 프리미엄 버거 프랜차이즈",
  },
  {
    id: "2",
    name: "컴포즈커피",
    category: "카페·디저트",
    logo: "☕",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
    color: "#8B4513",
    stats: {
      top10: 12000,
      average: 7800,
      bottom10: 4500,
    },
    description: "합리적인 가격의 커피 전문점",
  },
  {
    id: "3",
    name: "교촌치킨",
    category: "치킨",
    logo: "🍗",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",
    color: "#DC143C",
    stats: {
      top10: 18000,
      average: 9500,
      bottom10: 4000,
    },
    description: "오리지널 간장치킨의 명가",
  },
  {
    id: "4",
    name: "설빙",
    category: "디저트",
    logo: "🍧",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    color: "#FFB6C1",
    stats: {
      top10: 10000,
      average: 6200,
      bottom10: 2800,
    },
    description: "프리미엄 빙수 디저트 카페",
  },
  {
    id: "5",
    name: "본죽",
    category: "한식",
    logo: "🍲",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    color: "#228B22",
    stats: {
      top10: 11000,
      average: 7000,
      bottom10: 3500,
    },
    description: "건강한 죽 전문 프랜차이즈",
  },
  {
    id: "6",
    name: "할리스커피",
    category: "카페",
    logo: "☕",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    color: "#6B4423",
    stats: {
      top10: 13500,
      average: 8200,
      bottom10: 4200,
    },
    description: "고품질 원두 커피 전문점",
  },
];
