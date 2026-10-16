import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const BrandMarquee: React.FC = () => {
  const brands = [
    { name: 'NIKE LAB', label: 'Tier-0 Footwear' },
    { name: 'APPLE', label: 'Flagship Tech' },
    { name: 'SONY STUDIO', label: 'Hi-Res Audio' },
    { name: 'ZARA ATELIER', label: 'Minimalist Tailoring' },
    { name: "LEVI'S VINTAGE", label: 'Selvedge Denim' },
    { name: 'ARC’TERYX', label: 'Technical Outerwear' },
    { name: 'SAMSUNG ULTRA', label: 'Next-Gen Displays' },
    { name: 'PRADA MILANO', label: 'Luxury Leather' },
    { name: 'DYSON', label: 'Pioneering Hardware' },
    { name: 'ACNE STUDIOS', label: 'Stockholm Design' },
    { name: 'BYREDO', label: 'Artisanal Fragrance' },
  ];

  // Duplicate for seamless infinite loop
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <div className="relative py-7 bg-[#0A0D14] border-y border-white/[0.08] overflow-hidden select-none">
      {/* Left & Right Frosted Glass Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#0A0D14] via-[#0A0D14]/80 to-transparent z-10 pointer-events-none" />

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
            className="flex items-center gap-3 group cursor-default"
          >
            <span className="text-sm sm:text-base font-black tracking-widest text-slate-400 group-hover:text-white transition-colors uppercase font-mono">
              {brand.name}
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-cyan-400 font-semibold transition-colors">
              • {brand.label}
            </span>
            <span className="text-slate-700 ml-4">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
