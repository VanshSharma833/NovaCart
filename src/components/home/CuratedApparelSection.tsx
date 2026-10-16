import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Eye, ShoppingBag, Layers, Scissors, Check, Flame } from 'lucide-react';
import { products } from '../../data/products';
import { formatPrice } from '../../lib/formatPrice';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { QuickViewModal } from '../product/QuickViewModal';
import { Product } from '../../types';

export const CuratedApparelSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'streetwear' | 'tailored' | 'casual'>('streetwear');
  const [hoveredClothId, setHoveredClothId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  // Curated cloth items
  const apparelItems = products.filter((p) => p.category === 'fashion');

  // Filter based on sub-style
  const displayedItems = apparelItems.slice(0, 4);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors?.[0]?.name, product.sizes?.[0]);
    showToast(`Added ${product.name} to cart!`, 'success', 'View Cart', () => setIsCartOpen(true));
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Editorial Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wider uppercase border border-indigo-100 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-indigo-600" />
              <span>THE APPAREL LAB • ENHANCED LOOKBOOK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Sculpted Fits. Superior Fabrics.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              Engineered with Japanese microtwill, French Normandy linen, and 450 GSM organic fleece. Hover to inspect multiple angles and fit details.
            </p>
          </div>

          <Link
            to="/shop?category=fashion"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 group transition-colors self-start md:self-end"
          >
            <span>Explore All 120+ Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Enhanced Cloth Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item, index) => {
            const isHovered = hoveredClothId === item.id;
            const hasMultipleImages = item.images && item.images.length > 1;
            const secondaryImage = hasMultipleImages ? item.images[1] : null;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredClothId(item.id)}
                onMouseLeave={() => setHoveredClothId(null)}
                className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-500/40 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Frame with Double-Exposure Motion Reveal */}
                <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    {/* Primary Photo */}
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      animate={{
                        opacity: isHovered && secondaryImage ? 0 : 1,
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Secondary Lifestyle Angle */}
                    {secondaryImage && (
                      <motion.img
                        src={secondaryImage}
                        alt={`${item.name} secondary angle`}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1.05 : 1.02,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                      />
                    )}
                  </Link>

                  {/* Top floating badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Scissors className="w-2.5 h-2.5 text-indigo-400" />
                      <span>{item.subcategory || 'Apparel'}</span>
                    </span>
                    {item.discount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                        {item.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Multi-angle indicator pill */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 2 }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-700 shadow-xs flex items-center gap-1"
                  >
                    <Layers className="w-2.5 h-2.5 text-indigo-600" />
                    <span>{item.images?.length || 2} Angles</span>
                  </motion.div>

                  {/* Interactive Quick Action Buttons on Hover */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 8,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-x-3 bottom-3 z-10 flex gap-2"
                  >
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
                      className="w-10 h-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 flex items-center justify-center shrink-0 transition-transform active:scale-95"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>

                {/* Content details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <span>{item.brand}</span>
                      <span className="text-emerald-600 font-semibold">In Stock</span>
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
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
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
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      Inspect Fit →
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
