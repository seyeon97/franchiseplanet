"use client";

import HeroSection from "./hero-section";
import BrandsSection from "./brands-section";

export default function HomePage() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <HeroSection />
      <BrandsSection />
    </main>
  );
}
