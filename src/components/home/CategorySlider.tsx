import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PRODUCT_FALLBACK_IMAGE } from '../../lib/helpers';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  subtext: string;
}

export const CategorySlider: React.FC = () => {
  // Six dedicated categories matching the design requirements
  const sixCategories: CategoryItem[] = [
    {
      id: 'fashion',
      name: 'Fashion',
      slug: 'fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
      itemCount: 42,
      subtext: 'Apparel & Outerwear',
    },
    {
      id: 'sneakers',
      name: 'Sneakers',
      slug: 'sneakers',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80',
      itemCount: 28,
      subtext: 'Footwear & Streetwear',
    },
    {
      id: 'electronics',
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
      itemCount: 35,
      subtext: 'Audio & Mobile Tech',
    },
    {
      id: 'beauty',
      name: 'Beauty',
      slug: 'beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
      itemCount: 30,
      subtext: 'Body & Essentials',
    },
    {
      id: 'home',
      name: 'Home & Living',
      slug: 'home',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
      itemCount: 24,
      subtext: 'Decor & Living Objects',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80',
      itemCount: 38,
      subtext: 'Leather & Eyewear',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="py-16 bg-[#070A12] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-end justify-between mb-8 pb-4 border-b border-white/10"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              DEPARTMENTS • EXPLORE BY SPHERE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 6 Category Cards Grid with Staggered Scroll Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6"
        >
          {sixCategories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group bg-[#0E1424] rounded-xl border border-white/10 hover:border-white/30 p-3 flex flex-col h-full transition-all shadow-xl block"
              >
                {/* Product-First Photography Frame */}
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-950 mb-3 border border-white/5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Title & Item Count */}
                <div className="mt-auto">
                  <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {cat.subtext}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
