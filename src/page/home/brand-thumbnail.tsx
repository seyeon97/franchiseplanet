"use client";

interface BrandThumbnailProps {
  logo: string;
  logoImage?: string;
  name: string;
  category: string;
  color: string;
  onClick: () => void;
}

export default function BrandThumbnail({
  logo,
  logoImage,
  name,
  category,
  color,
  onClick,
}: BrandThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-64 h-80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}dd 0%, ${color} 100%)`,
      }}
    >
      <div className="h-full flex flex-col items-center justify-center p-6 text-white">
        {/* Logo */}
        {logoImage ? (
          <img
            src={logoImage}
            alt={`${name} logo`}
            className="h-32 mb-4 object-contain drop-shadow-2xl"
          />
        ) : (
          <div className="text-8xl mb-4 drop-shadow-2xl">{logo}</div>
        )}

        {/* Brand Name */}
        <h3 className="text-2xl font-black mb-2 text-center drop-shadow-lg">
          {name}
        </h3>

        {/* Category */}
        <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
          {category}
        </div>

        {/* Call to action */}
        <div className="mt-6 text-sm opacity-80">클릭하여 자세히 보기 →</div>
      </div>
    </button>
  );
}
