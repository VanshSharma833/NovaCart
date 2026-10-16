import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Play, Star, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="relative bg-[#07090F] text-white overflow-hidden pt-12 pb-20 lg:py-24 border-b border-white/[0.08]">
      {/* Refined Ambient Editorial Light (No purple neon blobs) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-slate-700/15 via-blue-900/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-slate-800/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Architectural Precision Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Minimalist Season Tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-semibold text-slate-200 backdrop-blur-xl shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>SPRING / SUMMER 2026 EDITION</span>
              </div>

              {/* Direct Mail Prompt */}
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-slate-300 transition-colors cursor-pointer"
              >
                <Mail className="w-3 h-3 text-cyan-400" />
                <span>Direct Mail: support@novacart.com</span>
              </button>
            </div>

            {/* Crisp High-Contrast Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Everything You Love.{' '}
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                One Cart.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Curated luxury fashion, iconic sneakers, studio audio, and smart electronics.
              Authenticity verified on every piece.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/shop">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white hover:bg-slate-100 text-slate-950 font-extrabold shadow-xl shadow-white/10"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Shop Now
                  </Button>
                </motion.div>
              </Link>

              <Link to="/shop?category=fashion">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.15] font-semibold text-sm transition-all backdrop-blur-xl shadow-lg"
                >
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  <span>The Lookbook</span>
                </motion.button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="pt-8 border-t border-white/[0.1] grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">25,000+</p>
                <p className="text-xs text-slate-400">Curated Goods</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">180,000+</p>
                <p className="text-xs text-slate-400">Clients Served</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 flex items-center justify-center lg:justify-start gap-1">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                </p>
                <p className="text-xs text-slate-400">Client Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Frosted Glassmorphism Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Frosted Glass Main Showcase Box */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/[0.03] backdrop-blur-2xl p-6 border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden group">
              {/* Animated Light Sweep Sheen across frosted glass */}
              <motion.div
                animate={{
                  x: ['-120%', '220%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-12 pointer-events-none"
              />

              {/* Main Product: Sony Studio ANC Headphones */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Sony Studio ANC Headphones"
                  className="w-4/5 h-4/5 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
                />
              </motion.div>

              {/* Floating Mini Card 1: Smartphone (Top Right) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="absolute -top-3 -right-3 z-20 bg-slate-900/95 backdrop-blur-2xl border border-white/20 p-3 rounded-2xl shadow-2xl flex items-center gap-3"
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
                  <p className="text-[10px] text-emerald-400 font-semibold">In Stock • 12% OFF</p>
                </div>
              </motion.div>

              {/* Floating Mini Card 2: Minimalist Outerwear (Bottom Left) */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute -bottom-4 -left-3 z-20 bg-slate-900/95 backdrop-blur-2xl border border-white/20 p-3 rounded-2xl shadow-2xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=150&q=80"
                    alt="Hoodie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Heavyweight Hoodie</p>
                  <p className="text-[10px] text-cyan-400 font-semibold">450 GSM French Terry</p>
                </div>
              </motion.div>

              {/* Verified Authentic Badge */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 bg-black/85 border border-white/20 px-3.5 py-1.5 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-1.5 text-[11px] text-slate-200 font-semibold"
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
