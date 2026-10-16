import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { categories } from '../../data/categories';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export const CategorySlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold tracking-wider uppercase mb-2">
              <Compass className="w-3 h-3 text-cyan-600" />
              <span>COLLECTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore by Department
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full hover:bg-white text-slate-700 hover:text-slate-900 transition-all shadow-2xs"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full hover:bg-white text-slate-700 hover:text-slate-900 transition-all shadow-2xs"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 flex items-center gap-1 group ml-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Horizontal Category Cards Snap Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="snap-start group flex-shrink-0 w-44 sm:w-52 bg-slate-50 hover:bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-card transition-all text-center flex flex-col items-center justify-between"
            >
              <Link to={`/shop?category=${cat.slug}`} className="w-full flex flex-col items-center">
                {/* Image Box */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 border border-slate-100 overflow-hidden shadow-xs mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  {cat.itemCount} Curated Pieces
                </p>

                <span className="mt-3 text-xs font-bold text-slate-700 group-hover:text-black flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
