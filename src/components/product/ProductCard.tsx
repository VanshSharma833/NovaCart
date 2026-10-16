import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { QuickViewModal } from './QuickViewModal';
import { PRODUCT_FALLBACK_IMAGE } from '../../lib/helpers';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [hasAdded, setHasAdded] = useState(false);

  const availableImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const currentImg = availableImages[currentImgIndex] || product.image;

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImgIndex((prev) => (prev + 1) % availableImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + availableImages.length) % availableImages.length);
  };

  const handleSelectImageIndex = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex(idx);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex]?.name : undefined;
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    addToCart(product, 1, color, size);
    setHasAdded(true);
    setTimeout(() => setHasAdded(false), 1400);
    showToast(`Added ${product.name} to cart`, 'success', 'View Cart', () => setIsCartOpen(true));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isFavorited ? `Removed from wishlist` : `Saved ${product.name} to wishlist`,
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
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={`group relative bg-[#0E1424] rounded-2xl border border-white/10 hover:border-white/30 hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden text-white ${
          className || ''
        }`}
      >
        {/* Product Image Frame with Click-to-Cycle Animation */}
        <div
          onClick={handleNextImage}
          className="relative aspect-square w-full bg-[#131A2E] overflow-hidden flex items-center justify-center p-3 select-none cursor-pointer group/image"
          title="Click to cycle angle / view"
        >
          {/* Animated Product Picture with Motion */}
          <div className="w-full h-full relative rounded-xl overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImgIndex}
                src={currentImg}
                alt={`${product.name} - Angle ${currentImgIndex + 1}`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRODUCT_FALLBACK_IMAGE;
                }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-contain rounded-xl group-hover/image:scale-105 transition-transform duration-500 ease-out pointer-events-none"
              />
            </AnimatePresence>
          </div>

          {/* Badges (Discount / New Drop) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.discount > 0 && (
              <span className="bg-white text-slate-950 text-[9px] font-black px-2 py-0.5 rounded tracking-wider uppercase shadow-md">
                {product.discount}% OFF
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-cyan-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded tracking-wider uppercase shadow-md">
                New
              </span>
            )}
          </div>

          {/* Animated Wishlist Heart Toggle */}
          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={handleWishlist}
            aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isFavorited
                ? 'bg-white border-white text-rose-600 shadow-md'
                : 'bg-[#0E1424]/90 border-white/20 text-slate-300 hover:text-white hover:border-white/40'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform ${
                isFavorited ? 'fill-rose-600 text-rose-600' : ''
              }`}
            />
          </motion.button>

          {/* Angle Switcher Controls (Prev / Next Arrows on Hover) */}
          {availableImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous angle"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0E1424]/90 hover:bg-white text-white hover:text-slate-950 border border-white/20 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next angle"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0E1424]/90 hover:bg-white text-white hover:text-slate-950 border border-white/20 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Angle Indicator Dots & View Label */}
          {availableImages.length > 1 && (
            <div className="absolute bottom-2 inset-x-0 flex flex-col items-center gap-1 z-10 pointer-events-auto">
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                {availableImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleSelectImageIndex(idx, e)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentImgIndex === idx
                        ? 'w-4 bg-cyan-400 shadow-xs'
                        : 'w-1.5 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Action Overlay (Desktop Hover) */}
          <div className="absolute inset-x-2.5 bottom-10 z-10 hidden sm:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickView}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#0E1424]/95 hover:bg-white text-white hover:text-slate-950 text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 border border-white/20 hover:border-white transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleAddToCart}
              className={`w-8 h-8 rounded-xl shadow-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                hasAdded ? 'bg-emerald-500 text-white' : 'bg-white text-slate-950 hover:bg-slate-100 font-bold'
              }`}
              title={hasAdded ? 'Added to cart' : 'Add to cart'}
              aria-label="Add to cart"
            >
              {hasAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </motion.button>
          </div>
        </div>

        {/* Content Details — Aligned layout */}
        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Category / Brand Row */}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between h-4">
              <span className="truncate">{product.brand}</span>
              <span className="capitalize shrink-0 text-slate-500">{product.category}</span>
            </div>

            {/* Product Title (Consistent 1 line height with tooltip) */}
            <Link
              to={`/product/${product.id}`}
              className="block text-xs sm:text-sm font-bold text-white hover:text-cyan-300 line-clamp-1 transition-colors h-5"
              title={product.name}
            >
              {product.name}
            </Link>

            {/* Rating Stars */}
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] h-4">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400">
                ({product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
              </span>
            </div>

            {/* Color Swatch Dots */}
            <div className="h-5 mt-2 flex items-center">
              {product.colors && product.colors.length > 1 ? (
                <div className="flex items-center gap-1">
                  {product.colors.slice(0, 4).map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedColorIndex(idx);
                      }}
                      className={`w-3 h-3 rounded-full border transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'ring-1 ring-white scale-110 border-white'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-[9px] text-slate-400 font-medium ml-0.5">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-[10px] text-slate-400">{product.inStock ? 'In Stock' : 'Pre-order'}</span>
              )}
            </div>
          </div>

          {/* Pricing Row (Fixed bottom alignment) */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-black text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile quick add button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCart}
              className={`sm:hidden p-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                hasAdded
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-[#131A2E] border-white/15 text-white hover:bg-white hover:text-slate-950'
              }`}
              title={hasAdded ? 'Added' : 'Add to cart'}
              aria-label="Add to cart"
            >
              {hasAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </motion.button>
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
