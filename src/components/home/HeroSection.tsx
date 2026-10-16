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
    <section className="relative bg-gradient-to-br from-[#080C16] via-[#0D1426] to-[#070A12] border-b border-white/10 overflow-hidden text-white">
      {/* Ambient Radial Lighting Glows */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-blue-600/15 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-500/12 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/5 via-transparent to-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Subtle Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bold Left-Aligned Editorial Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Overline Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-widest text-cyan-300 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>THE 2026 SIGNATURE COLLECTION</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.06]"
            >
              Everything You Love.{' '}
              <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 block sm:inline">
                One Cart.
              </span>
            </motion.h1>

            {/* Concise Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-lg font-normal leading-relaxed"
            >
              Discover timeless silhouettes, modern electronics, and everyday luxury essentials. Curated with authentic precision and tactile excellence.
            </motion.p>

            {/* Two Tactile CTA Buttons with Spring Tap Animation */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-slate-950 text-sm font-bold shadow-xl shadow-white/10 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <span>Shop The Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/shop?category=fashion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white text-sm font-semibold transition-all cursor-pointer"
                >
                  <span>Explore Lookbook</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Left-Aligned Metrics Row */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-md"
            >
              <div>
                <p className="text-2xl font-black text-white">25,000+</p>
                <p className="text-xs text-slate-400 mt-0.5">Curated Pieces</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Verified Genuine</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">4.9 / 5.0</p>
                <p className="text-xs text-slate-400 mt-0.5">Client Rating</p>
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="col-span-7 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
                alt="Editorial Fashion"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                  Editorial S/S 26
                </span>
                <span className="text-[11px] text-slate-300">New Release</span>
              </div>
            </motion.div>

            {/* Secondary Lifestyle / Detail Card */}
            <div className="col-span-5 space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl relative group"
              >
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Studio Audio"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                  Acoustic Lab
                </div>
              </motion.div>

              {/* Minimalist Glass Info Card */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Curated Standard</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
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
