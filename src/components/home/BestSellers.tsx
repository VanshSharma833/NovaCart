import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <section className="py-16 bg-white border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4] gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
              SIGNATURE SELECTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mt-1">
              Best Sellers
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-lg border border-[#E7E5E4] text-xs font-medium overflow-x-auto no-scrollbar">
            {(['all', 'fashion', 'sneakers', 'electronics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-[#171717] text-white shadow-2xs font-semibold'
                    : 'text-[#737373] hover:text-[#171717]'
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

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E7E5E4] hover:border-[#171717] bg-white text-sm font-semibold text-[#171717] transition-colors"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
