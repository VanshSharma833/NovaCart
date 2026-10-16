import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-16 bg-[#070A12] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Understated Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Banner 1: Contemporary Fashion & Tailoring */}
          <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F162A] to-[#0A0E1C] border border-white/10 hover:border-white/25 p-8 sm:p-10 flex flex-col justify-between transition-all shadow-xl">
            <div className="space-y-3 z-10 max-w-sm text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                EDITORIAL FEATURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                The Minimalist Wardrobe
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Handcrafted wool overcoats, relaxed French terry fleece, and Italian selvedge denim tailored for everyday life.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop?category=fashion"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Product Photography Inset */}
            <div className="mt-8 aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                alt="Contemporary Apparel"
                className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Banner 2: Studio Audio & Precision Electronics */}
          <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F162A] to-[#0A0E1C] border border-white/10 hover:border-white/25 p-8 sm:p-10 flex flex-col justify-between transition-all shadow-xl">
            <div className="space-y-3 z-10 max-w-sm text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                PRECISION HARDWARE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Pure Acoustic Balance
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Custom titanium drivers, lossless wireless transmission, and studio active noise cancellation.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop?category=electronics"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>Discover Audio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Product Photography Inset */}
            <div className="mt-8 aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"
                alt="Studio Headphones"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
