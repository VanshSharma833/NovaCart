import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Eye, ShoppingBag, Scissors, Layers, Check } from 'lucide-react';
import { products } from '../../data/products';
import { formatPrice } from '../../lib/formatPrice';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { QuickViewModal } from '../product/QuickViewModal';
import { Product } from '../../types';

export const CuratedApparelSection: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  // Curated fashion pieces
  const apparelItems = products.filter((p) => p.category === 'fashion').slice(0, 4);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors?.[0]?.name, product.sizes?.[0]);
    showToast(`Added ${product.name} to cart!`, 'success', 'View Cart', () => setIsCartOpen(true));
  };

  return (
    <section className="py-20 relative bg-white border-b border-slate-200/80 overflow-hidden">
      {/* Subtle Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-slate-100 text-[11px] font-bold tracking-widest uppercase">
              <Scissors className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE APPAREL LAB • EDITORIAL COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Sculpted Fits. Superior Fabrics.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              Engineered with Japanese microtwill, French Normandy flax linen, and 450 GSM organic French terry.
            </p>
          </div>

          <Link
            to="/shop?category=fashion"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-indigo-600 group transition-colors self-start md:self-end"
          >
            <span>Explore All 120+ Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Cloth Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apparelItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Stable Product Image Frame with Smooth Scale */}
                <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Layers className="w-3 h-3 text-cyan-400" />
                      <span>{item.subcategory || 'Fashion'}</span>
                    </span>
                    {item.discount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                        {item.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Interactive Quick Action Buttons on Hover */}
                  <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickViewProduct(item);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-2xl bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 border border-slate-200/80 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className="w-10 h-10 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center justify-center shrink-0 transition-transform active:scale-95"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <span>{item.brand}</span>
                      <span className="text-emerald-600 font-semibold">Verified Fit</span>
                    </div>

                    <Link
                      to={`/product/${item.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-indigo-600 line-clamp-1 transition-colors"
                    >
                      {item.name}
                    </Link>

                    {/* Color Preview Swatches */}
                    {item.colors && item.colors.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-1.5">
                        {item.colors.map((c) => (
                          <span
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                        <span className="text-[10px] text-slate-400 font-medium ml-1">
                          {item.colors.length} shades
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-slate-900">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/product/${item.id}`}
                      className="text-xs font-bold text-slate-700 hover:text-black hover:underline"
                    >
                      View Piece →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};
