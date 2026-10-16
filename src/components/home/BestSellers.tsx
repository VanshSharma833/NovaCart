import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const BestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'fashion' | 'sneakers' | 'electronics'>('all');

  const filteredProducts = products.filter((p) => {
    if (!p.isBestSeller) return false;
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-16 bg-[#070A12] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              SIGNATURE SELECTIONS • HIGH DEMAND
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Best Sellers
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-[#0E1424] p-1.5 rounded-xl border border-white/10 text-xs font-medium overflow-x-auto no-scrollbar">
            {(['all', 'fashion', 'sneakers', 'electronics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Pieces' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400">
            Showing verified bestselling essentials across global inventory
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 bg-white/10 hover:bg-white/15 text-sm font-semibold text-white transition-all cursor-pointer"
            >
              <span>View Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
