import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap, Star, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="relative bg-[#050711] text-white overflow-hidden pt-10 pb-20 lg:py-24 border-b border-slate-800/80">
      {/* Dynamic Animated Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-600/35 via-violet-600/25 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-24 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 via-blue-600/15 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 25, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-10 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-cyan-500/20 via-purple-600/15 to-transparent rounded-full blur-[130px] pointer-events-none"
      />

      {/* Cool Futuristic Cyber Matrix Grid with Radial Mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, transparent 75%)',
        }}
      />

      {/* Floating subtle glowing particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8] animate-ping" />
        <div className="absolute top-3/4 left-1/12 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8] opacity-75" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-300 rounded-full shadow-[0_0_8px_#c084fc] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs font-semibold text-indigo-300 shadow-md backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>NEW SEASON 2026</span>
              </div>

              {/* Direct Mail Prompt Pill */}
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-400/30 text-xs font-medium text-indigo-300 transition-colors cursor-pointer"
              >
                <Mail className="w-3 h-3 text-cyan-400" />
                <span>Direct Mail: support@novacart.com</span>
              </button>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Everything You Love.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                One Cart.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover premium products, curated streetwear, luxury outerwear, cutting-edge tech,
              and iconic sneakers with door-step express delivery.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 text-white font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop Now
                </Button>
              </Link>

              <Link to="/shop?category=fashion">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all backdrop-blur-md hover:text-white hover:border-slate-600 shadow-md"
                >
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  <span>Explore Apparel Lookbook</span>
                </button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="pt-8 border-t border-slate-800/70 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">25k+</p>
                <p className="text-xs text-slate-400">Curated Items</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">180k+</p>
                <p className="text-xs text-slate-400">Happy Shoppers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 flex items-center justify-center lg:justify-start gap-1">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                </p>
                <p className="text-xs text-slate-400">Average Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase with Layered Product Depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Visual Glass Frame with Electric Glow Border */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-indigo-950/50 via-slate-900/80 to-purple-950/60 p-5 border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.25)] backdrop-blur-md flex items-center justify-center">
              {/* Glowing circular rings */}
              <div className="absolute inset-6 rounded-full border border-indigo-500/25 animate-pulse-slow pointer-events-none" />
              <div className="absolute inset-14 rounded-full border border-cyan-500/20 pointer-events-none" />

              {/* Main Centerpiece Product: Headphones with Floating Animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
                  alt="Sony Studio ANC Headphones"
                  className="w-4/5 h-4/5 object-contain drop-shadow-[0_20px_40px_rgba(99,102,241,0.45)]"
                />
              </motion.div>

              {/* Floating Mini Card 1: Smartphone Top Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -top-3 -right-3 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=150&q=80"
                    alt="Smartphone"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Galaxy S24 Ultra</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">12% OFF • In Stock</p>
                </div>
              </motion.div>

              {/* Floating Mini Card 2: Enhanced Cloth Streetwear Hoodie Bottom Left */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute -bottom-4 -left-3 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=150&q=80"
                    alt="French Terry Hoodie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Heavyweight Hoodie</p>
                  <p className="text-[10px] text-indigo-400 font-semibold">450 GSM • French Terry</p>
                </div>
              </motion.div>

              {/* Verified Authentic Floating Pill */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 bg-indigo-950/90 border border-indigo-500/40 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 text-[11px] text-indigo-300 font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% Genuine</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
