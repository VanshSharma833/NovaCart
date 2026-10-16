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
    <div className="relative py-4 bg-[#060911] border-b border-white/10 overflow-hidden select-none">
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060911] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060911] to-transparent z-10 pointer-events-none" />

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
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-400 group-hover:text-white transition-colors uppercase">
              {brand.name}
            </span>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
              ({brand.label})
            </span>
            <span className="text-white/20 ml-6">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
