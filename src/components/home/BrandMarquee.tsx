import React from 'react';
import { motion } from 'motion/react';

export const BrandMarquee: React.FC = () => {
  const brands = [
    { name: 'NIKE LAB', label: 'Tier-0' },
    { name: 'APPLE', label: 'Flagship' },
    { name: 'SONY STUDIO', label: 'Audio' },
    { name: 'ZARA ATELIER', label: 'Tailoring' },
    { name: "LEVI'S VINTAGE", label: 'Denim' },
    { name: 'ARC’TERYX', label: 'Outerwear' },
    { name: 'PRADA MILANO', label: 'Leather' },
    { name: 'DYSON', label: 'Engineering' },
    { name: 'ACNE STUDIOS', label: 'Design' },
    { name: 'BYREDO', label: 'Fragrance' },
  ];

  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <div className="relative py-4 bg-white border-b border-[#E7E5E4] overflow-hidden select-none">
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite Horizontal Sliding Marquee Track */}
      <motion.div
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex items-center gap-8 sm:gap-12 w-max whitespace-nowrap"
      >
        {marqueeItems.map((brand, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 group cursor-default"
          >
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#737373] group-hover:text-[#171717] transition-colors uppercase">
              {brand.name}
            </span>
            <span className="text-[10px] text-[#A8A29E] font-medium hidden sm:inline">
              ({brand.label})
            </span>
            <span className="text-[#E7E5E4] ml-6">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
