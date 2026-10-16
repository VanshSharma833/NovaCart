import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Layers } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const hasMultipleImages = product.images && product.images.length > 1;
  const secondaryImage = hasMultipleImages ? product.images[1] : null;

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`group relative bg-white rounded-3xl border border-slate-200/80 hover:border-indigo-500/30 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden ${
          className || ''
        }`}
      >
        {/* Image Container with Smooth Angle Reveal Animation */}
        <div className="relative aspect-square w-full bg-gradient-to-b from-slate-50 to-slate-100/70 overflow-hidden flex items-center justify-center p-3">
          <Link to={`/product/${product.id}`} className="w-full h-full relative block overflow-hidden rounded-2xl">
            {/* Primary Image */}
            <motion.img
              src={product.image}
              alt={product.name}
              loading="lazy"
              animate={{
                opacity: isHovered && secondaryImage ? 0 : 1,
                scale: isHovered ? 1.06 : 1,
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Secondary Enhanced Angle for Cloth / Gear */}
            {secondaryImage && (
              <motion.img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                loading="lazy"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.06 : 1.02,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
            )}
          </Link>

          {/* Badges (Discount / New / Cloth Fit) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.discount > 0 && (
              <Badge variant="discount">{product.discount}% OFF</Badge>
            )}
            {product.isNewArrival && (
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                New Drop
              </span>
            )}
            {product.category === 'fashion' && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: isHovered ? 1 : 0.85, x: 0 }}
                className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10"
              >
                <Layers className="w-2.5 h-2.5 text-indigo-400" />
                <span>Fit Preview</span>
              </motion.span>
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
                : 'bg-white/85 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </motion.button>

          {/* Quick Action Overlay (Desktop Hover) */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 8,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex gap-2"
          >
            <button
              onClick={handleQuickView}
              className="flex-1 py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 border border-slate-100 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 flex items-center justify-center shrink-0 transition-transform active:scale-95"
              title="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Content Details */}
        <div className="p-4 flex-1 flex flex-col justify-between">
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

            {/* Color Swatch Dots for Apparel & Lifestyle */}
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
                        ? 'ring-2 ring-indigo-500 scale-110 border-white'
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
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-baseline justify-between">
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
              className="sm:hidden p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
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
