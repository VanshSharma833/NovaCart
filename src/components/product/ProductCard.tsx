import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, Layers, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../lib/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex]?.name : undefined;
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    addToCart(product, 1, color, size);
    showToast(`Added ${product.name} to cart!`, 'success', 'View Cart', () => setIsCartOpen(true));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isFavorited ? `Removed from wishlist` : `Saved ${product.name} to wishlist!`,
      'info'
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`group relative bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden ${
          className || ''
        }`}
      >
        {/* Stable Product Image Container (No glitchy image swapping on hover/click) */}
        <div className="relative aspect-square w-full bg-slate-50/80 overflow-hidden flex items-center justify-center p-4">
          <Link
            to={`/product/${product.id}`}
            className="w-full h-full relative block overflow-hidden rounded-2xl flex items-center justify-center"
          >
            {/* Consistent Main Image with Smooth Zoom on Hover */}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Badges (Discount / New / Premium Fabric) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.discount > 0 && (
              <Badge variant="discount">{product.discount}% OFF</Badge>
            )}
            {product.isNewArrival && (
              <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                New Drop
              </span>
            )}
          </div>

          {/* Wishlist Button (Top Right) */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs ${
              isFavorited
                ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 shadow-rose-200'
                : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </motion.button>

          {/* Quick Action Overlay (Smooth Slide Up on Hover) */}
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleQuickView}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 border border-slate-100 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center justify-center shrink-0 transition-transform active:scale-95"
              title="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category / Brand Row */}
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>{product.brand}</span>
              <span className="capitalize text-slate-400">{product.category}</span>
            </div>

            {/* Product Title */}
            <Link
              to={`/product/${product.id}`}
              className="block text-sm font-bold text-slate-900 hover:text-indigo-600 line-clamp-1 transition-colors"
              title={product.name}
            >
              {product.name}
            </Link>

            {/* Rating Stars */}
            <div className="mt-1.5 flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400">
                ({product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
              </span>
            </div>

            {/* Color Swatch Dots */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-2.5 flex items-center gap-1.5">
                {product.colors.slice(0, 4).map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColorIndex(idx);
                    }}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedColorIndex === idx
                        ? 'ring-2 ring-slate-900 scale-110 border-white'
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Pricing Row */}
          <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile-visible quick add button */}
            <button
              onClick={handleAddToCart}
              className="sm:hidden p-2 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
              title="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};
