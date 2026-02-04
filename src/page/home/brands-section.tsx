"use client";

import type { MutableRefObject } from "react";
import BrandCard from "./brand-card";

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

interface BrandsSectionProps {
  brands: Brand[];
  detailRefs: MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

export default function BrandsSection({
  brands,
  detailRefs,
}: BrandsSectionProps) {
  return (
    <section className="snap-y snap-mandatory h-screen overflow-y-scroll">
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
    </section>
  );
}
