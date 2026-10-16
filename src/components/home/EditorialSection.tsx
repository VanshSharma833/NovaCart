import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const EditorialSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#070A12] border-b border-white/10 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#0F162A] via-[#131D36] to-[#0A0E1C] rounded-2xl border border-white/10 overflow-hidden p-6 sm:p-10 shadow-2xl">
          {/* Left: Editorial Image with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-xl overflow-hidden bg-slate-950 border border-white/15 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
              alt="Editorial Haute Fashion Collection"
              className="w-full h-full object-cover object-top hover:scale-104 transition-transform duration-700"
            />
          </motion.div>

          {/* Right: Editorial Narrative with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="lg:col-span-6 space-y-6 lg:pl-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>THE EDITORIAL LOOKBOOK</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Contemporary Aesthetics, Everyday Utility.
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We believe the modern wardrobe shouldn't compromise between immaculate tailoring and peak function. From French Terry heavyweights to Italian pebbled leather totes, discover pieces engineered to elevate your daily routine.
            </p>

            <div className="pt-2 flex flex-wrap gap-3.5">
              <Link
                to="/shop?category=fashion"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-950 text-sm font-bold shadow-lg hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop?category=accessories"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 hover:border-white/40 text-white text-sm font-semibold transition-all active:scale-95 cursor-pointer"
              >
                <span>Shop Accessories</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
