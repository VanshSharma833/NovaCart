import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const TrendingNow: React.FC = () => {
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 5);

  return (
    <section className="py-16 bg-white border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
              POPULAR THIS WEEK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mt-1">
              Trending Products
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#6554D9] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clean Aligned Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
