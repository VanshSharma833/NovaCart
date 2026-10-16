import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const JustDropped: React.FC = () => {
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF9F6] border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
              SEASON RELEASES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mt-1">
              Just Dropped
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#6554D9] flex items-center gap-1 transition-colors"
          >
            <span>View All New</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
