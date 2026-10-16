import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut' as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="relative bg-[#FAF9F6] border-b border-[#E7E5E4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions with Staggered Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small Overline Tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#737373]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9]" />
              <span>THE 2026 SIGNATURE COLLECTION</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#171717] leading-[1.08]"
            >
              Everything You Love.{' '}
              <span className="font-light italic block sm:inline">
                One Cart.
              </span>
            </motion.h1>

            {/* Concise Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#737373] max-w-lg font-normal leading-relaxed"
            >
              Discover timeless silhouettes, modern electronics, and everyday luxury essentials. Carefully selected for discerning taste and enduring quality.
            </motion.p>

            {/* Two Understated CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#171717] hover:bg-black text-white text-sm font-semibold transition-all active:scale-[0.98] shadow-2xs cursor-pointer"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop?category=fashion"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white border border-[#E7E5E4] hover:border-[#171717] text-[#171717] text-sm font-medium transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Lookbook</span>
              </Link>
            </motion.div>

            {/* Subtle Metrics Row */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-[#E7E5E4] grid grid-cols-3 gap-6 max-w-md"
            >
              <div>
                <p className="text-xl font-bold text-[#171717]">25,000+</p>
                <p className="text-xs text-[#737373] mt-0.5">Curated Pieces</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#171717]">100%</p>
                <p className="text-xs text-[#737373] mt-0.5">Verified Genuine</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#171717]">4.9 / 5.0</p>
                <p className="text-xs text-[#737373] mt-0.5">Client Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Lifestyle Photography (Split Double Image Composition) */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 grid grid-cols-12 gap-4 items-center"
          >
            {/* Primary Portrait Card */}
            <div className="col-span-7 aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-[#E7E5E4]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
                alt="Editorial Fashion"
                className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Secondary Lifestyle / Detail Card */}
            <div className="col-span-5 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-[#E7E5E4]">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Studio Headphones"
                  className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Minimalist Info Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7E5E4]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#171717]">
                  <span className="w-2 h-2 rounded-full bg-[#6554D9]" />
                  <span>Curated Standard</span>
                </div>
                <p className="text-xs text-[#737373] mt-1 leading-relaxed">
                  Every product is inspected, verified, and packaged with signature care.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
