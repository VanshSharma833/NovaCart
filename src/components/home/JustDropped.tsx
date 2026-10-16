import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const JustDropped: React.FC = () => {
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="py-16 bg-[#070A12] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-end justify-between mb-8 pb-4 border-b border-white/10"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              FRESH CATALOG • SEASON RELEASES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Just Dropped
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>View All New</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Product Cards with Staggered Scroll Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {newArrivals.map((product) => (
            <motion.div key={product.id} variants={itemVariants} className="h-full">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
