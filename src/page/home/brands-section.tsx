"use client";

import type { MutableRefObject } from "react";
import BrandCard from "./brand-card";

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

interface BrandsSectionProps {
  brands: Brand[];
  detailRefs: MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

export default function BrandsSection({
  brands,
  detailRefs,
}: BrandsSectionProps) {
  return (
    <>
      {brands.map((brand) => (
        <div
          key={brand.id}
          ref={(el) => {
            detailRefs.current[brand.id] = el;
          }}
        >
          <BrandCard brand={brand} />
        </div>
      ))}
    </>
  );
}
