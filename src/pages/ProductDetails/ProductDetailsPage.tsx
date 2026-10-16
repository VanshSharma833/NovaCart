import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Share2,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { products } from '../../data/products';
import { formatPrice } from '../../lib/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { RatingStars } from '../../components/ui/RatingStars';
import { ProductCard } from '../../components/product/ProductCard';
import { PRODUCT_FALLBACK_IMAGE } from '../../lib/helpers';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [mainImgSrc, setMainImgSrc] = useState<string>('');
  const [hasAdded, setHasAdded] = useState(false);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImgIndex(0);
      setMainImgSrc(product.image);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
      setQuantity(1);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#FAF9F6]">
        <h2 className="text-2xl font-bold text-[#171717]">Product Not Found</h2>
        <p className="text-[#737373] mt-2 text-xs sm:text-sm">
          The product you are looking for might have been moved or discontinued.
        </p>
        <Link to="/shop" className="mt-6">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleSelectThumbnail = (index: number, src: string) => {
    setSelectedImgIndex(index);
    setMainImgSrc(src);
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      showToast('This item is currently out of stock', 'error');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
    setHasAdded(true);
    setTimeout(() => setHasAdded(false), 1400);
    showToast(
      `Added ${quantity}x ${product.name} to cart`,
      'success',
      'View Cart',
      () => setIsCartOpen(true)
    );
  };

  const handleBuyNow = () => {
    if (!product.inStock) {
      showToast('This item is currently out of stock', 'error');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on NovaCart!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#737373] mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#171717] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E7E5E4]" />
          <Link to="/shop" className="hover:text-[#171717] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E7E5E4]" />
          <Link
            to={`/shop?category=${product.category}`}
            className="capitalize hover:text-[#171717] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E7E5E4]" />
          <span className="font-medium text-[#171717] truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Gallery Column (Left) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 items-start">
              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto w-full sm:w-20 shrink-0 no-scrollbar pb-2 sm:pb-0">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectThumbnail(idx, img)}
                      onMouseEnter={() => handleSelectThumbnail(idx, img)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border overflow-hidden shrink-0 transition-all cursor-pointer ${
                        selectedImgIndex === idx
                          ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105'
                          : 'border-white/10 hover:border-white/40 bg-slate-900'
                      }`}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        onError={(e) => {
                          e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Display with Motion Animation */}
              <div
                onClick={() => {
                  const nextIdx = (selectedImgIndex + 1) % gallery.length;
                  handleSelectThumbnail(nextIdx, gallery[nextIdx]);
                }}
                className="relative flex-1 aspect-square w-full rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center p-6 select-none cursor-pointer group/main"
                title="Click to cycle angle"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImgIndex}
                    src={mainImgSrc || product.image}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    onError={() => setMainImgSrc(PRODUCT_FALLBACK_IMAGE)}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                  {product.discount > 0 && <Badge variant="discount">{product.discount}% OFF</Badge>}
                  {product.isNewArrival && (
                    <span className="bg-[#171717] text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      New
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/90 hover:bg-white text-[#737373] hover:text-[#171717] border border-[#E7E5E4] transition-colors cursor-pointer"
                  title="Share product"
                  aria-label="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details & Actions Column (Right) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#737373] uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.sku && (
                    <span className="text-[11px] text-[#737373] font-mono">SKU: {product.sku}</span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="mt-3 flex items-center gap-3">
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
                  <span className="text-xs text-[#E7E5E4]">•</span>
                  {product.inStock ? (
                    <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> In Stock & Ready to Ship
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-amber-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Currently Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-[#E7E5E4]">
                <span className="text-3xl sm:text-4xl font-semibold text-[#171717]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#737373] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <Badge variant="discount">{product.discount}% OFF</Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#171717] block mb-2">
                    Color: <span className="font-normal text-[#737373]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'ring-2 ring-[#171717] border-white scale-105'
                            : 'border-[#E7E5E4] hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={`Select color ${c.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                      Size: <span className="font-normal text-[#737373]">{selectedSize}</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-12 py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#E7E5E4] hover:border-[#171717]'
                        }`}
                        aria-label={`Select size ${s}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E7E5E4] rounded-lg bg-[#FAF9F6] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || !product.inStock}
                      className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-white rounded text-sm font-semibold transition-colors disabled:opacity-40 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#171717]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10 || !product.inStock}
                      className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-white rounded text-sm font-semibold transition-colors disabled:opacity-40 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => {
                      toggleWishlist(product);
                      showToast(
                        isFavorited ? 'Removed from wishlist' : 'Saved to wishlist',
                        'info'
                      );
                    }}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      isFavorited
                        ? 'border-[#171717] bg-white text-rose-600'
                        : 'border-[#E7E5E4] text-[#737373] hover:text-[#171717] hover:border-[#171717]'
                    }`}
                    title="Wishlist"
                    aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </motion.button>

                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!product.inStock}
                    className={`flex-1 font-medium rounded-lg transition-colors ${
                      hasAdded ? 'bg-emerald-600 hover:bg-emerald-600' : ''
                    }`}
                    onClick={handleAddToCart}
                    leftIcon={hasAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  >
                    {hasAdded ? 'Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  disabled={!product.inStock}
                  className="w-full font-medium border-[#E7E5E4] hover:border-[#171717] rounded-lg"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E7E5E4] text-center">
                <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4]">
                  <Truck className="w-4 h-4 text-[#171717] mx-auto mb-1 stroke-1" />
                  <p className="text-[11px] font-semibold text-[#171717]">Express Delivery</p>
                  <p className="text-[10px] text-[#737373]">Free over ₹999</p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4]">
                  <ShieldCheck className="w-4 h-4 text-[#171717] mx-auto mb-1 stroke-1" />
                  <p className="text-[11px] font-semibold text-[#171717]">Verified Genuine</p>
                  <p className="text-[10px] text-[#737373]">Authentic guarantee</p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4]">
                  <RotateCcw className="w-4 h-4 text-[#171717] mx-auto mb-1 stroke-1" />
                  <p className="text-[11px] font-semibold text-[#171717]">7-Day Returns</p>
                  <p className="text-[10px] text-[#737373]">Simple pickup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Specifications Table */}
          {product.features && product.features.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E7E5E4]">
              <h3 className="text-base font-semibold text-[#171717] mb-4">
                Specifications & Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-xs text-[#171717]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9] mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6 pb-3 border-b border-[#E7E5E4]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
                  COMPLEMENTARY PIECES
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-[#171717] mt-1 tracking-tight">
                  You May Also Like
                </h3>
              </div>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-xs font-semibold text-[#171717] hover:text-[#6554D9] transition-colors"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
