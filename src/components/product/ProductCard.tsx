import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
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
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasAdded, setHasAdded] = useState(false);

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
      <div
        className={`group relative bg-white rounded-xl border border-[#E7E5E4] hover:border-[#171717] hover:shadow-xs transition-all duration-300 flex flex-col h-full overflow-hidden ${
          className || ''
        }`}
      >
        {/* Product Image Container */}
        <div className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden flex items-center justify-center p-3 select-none">
          <Link
            to={`/product/${product.id}`}
            className="w-full h-full relative block overflow-hidden rounded-lg flex items-center justify-center"
            aria-label={`View ${product.name} details`}
          >
            <img
              src={imgSrc}
              alt={product.name}
              loading="lazy"
              onError={() => setImgSrc(PRODUCT_FALLBACK_IMAGE)}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-104 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Badges (Discount / New Drop) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.discount > 0 && (
              <span className="bg-[#171717] text-white text-[9px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase shadow-2xs">
                {product.discount}% OFF
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-white text-[#6554D9] border border-[#E7E5E4] text-[9px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase shadow-2xs">
                New
              </span>
            )}
          </div>

          {/* Animated Wishlist Heart Toggle */}
          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={handleWishlist}
            aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
              isFavorited
                ? 'bg-white border-[#171717] text-rose-600 shadow-2xs'
                : 'bg-white/95 border-[#E7E5E4] text-[#737373] hover:text-[#171717] hover:border-[#171717]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform ${
                isFavorited ? 'fill-rose-600 text-rose-600' : ''
              }`}
            />
          </motion.button>

          {/* Quick Action Overlay (Desktop Hover) */}
          <div className="absolute inset-x-2.5 bottom-2.5 z-10 hidden sm:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickView}
              className="flex-1 py-2 px-3 rounded-lg bg-white/95 hover:bg-white text-[#171717] text-xs font-medium shadow-2xs flex items-center justify-center gap-1.5 border border-[#E7E5E4] hover:border-[#171717] transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#737373]" />
              <span>Quick View</span>
            </button>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleAddToCart}
              className={`w-9 h-9 rounded-lg text-white shadow-2xs flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                hasAdded ? 'bg-emerald-600' : 'bg-[#171717] hover:bg-black'
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
            <div className="text-[10px] font-medium text-[#737373] uppercase tracking-wider mb-1 flex items-center justify-between h-4">
              <span className="truncate">{product.brand}</span>
              <span className="capitalize shrink-0">{product.category}</span>
            </div>

            {/* Product Title (Consistent 1 line height with tooltip) */}
            <Link
              to={`/product/${product.id}`}
              className="block text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#6554D9] line-clamp-1 transition-colors h-5"
              title={product.name}
            >
              {product.name}
            </Link>

            {/* Rating Stars */}
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] h-4">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-medium text-[#171717]">{product.rating.toFixed(1)}</span>
              <span className="text-[#737373]">
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
                          ? 'ring-1 ring-[#171717] scale-110 border-white'
                          : 'border-[#E7E5E4] hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-[9px] text-[#737373] font-medium ml-0.5">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-[10px] text-[#737373]">{product.inStock ? 'In Stock' : 'Pre-order'}</span>
              )}
            </div>
          </div>

          {/* Pricing Row (Fixed bottom alignment) */}
          <div className="mt-3 pt-2.5 border-t border-[#E7E5E4] flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[#171717]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#737373] line-through">
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
                  : 'bg-[#FAF9F6] border-[#E7E5E4] text-[#171717] hover:bg-white'
              }`}
              title={hasAdded ? 'Added' : 'Add to cart'}
              aria-label="Add to cart"
            >
              {hasAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};
