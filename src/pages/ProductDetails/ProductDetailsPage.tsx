import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Share2,
  ChevronRight,
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

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImgIndex(0);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
      setQuantity(1);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-slate-500 mt-2">The product you are looking for might have been moved or discontinued.</p>
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

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    showToast(
      `Added ${quantity}x ${product.name} to cart!`,
      'success',
      'View Cart',
      () => setIsCartOpen(true)
    );
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on NovaCart!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/shop" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to={`/shop?category=${product.category}`}
            className="capitalize hover:text-slate-900 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Gallery Column (Left) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 items-start">
              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto w-full sm:w-20 shrink-0 no-scrollbar pb-2 sm:pb-0">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 overflow-hidden shrink-0 transition-all ${
                        selectedImgIndex === idx
                          ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-400 bg-slate-50'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Display */}
              <div className="relative flex-1 aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-6">
                <img
                  src={gallery[selectedImgIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discount > 0 && <Badge variant="discount">{product.discount}% OFF</Badge>}
                  {product.isNewArrival && (
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      New
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-600 shadow-sm transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details & Actions Column (Right) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.sku && (
                    <span className="text-[11px] text-slate-400 font-mono">SKU: {product.sku}</span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-3">
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
                  <span className="text-xs text-slate-300">•</span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock & Ready to Dispatch
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-slate-100">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <Badge variant="discount">{product.discount}% OFF</Badge>
                )}
              </div>

              {/* Short description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                    Color: <span className="text-indigo-600 font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          selectedColor === c.name
                            ? 'border-indigo-600 ring-2 ring-indigo-500/20 scale-110'
                            : 'border-slate-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Size: <span className="text-indigo-600 font-bold">{selectedSize}</span>
                    </label>
                    <span className="text-xs text-indigo-600 hover:underline cursor-pointer font-medium">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-12 py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                          selectedSize === s
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & CTA Buttons */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg text-sm font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg text-sm font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      toggleWishlist(product);
                      showToast(
                        isFavorited ? 'Removed from wishlist' : 'Saved to wishlist!',
                        'info'
                      );
                    }}
                    className={`p-3 rounded-xl border transition-colors ${
                      isFavorited
                        ? 'border-rose-200 bg-rose-50 text-rose-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                  </button>

                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 font-bold"
                    onClick={handleAddToCart}
                    leftIcon={<ShoppingBag className="w-5 h-5" />}
                  >
                    Add to Cart
                  </Button>
                </div>

                <Button
                  variant="dark"
                  size="lg"
                  className="w-full font-bold"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              {/* Value Props & Guarantees */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">Premium Quality</span>
                  <span className="text-[10px] text-slate-500">100% Authentic</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <Truck className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">Fast Delivery</span>
                  <span className="text-[10px] text-slate-500">3-5 Business Days</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">Easy Returns</span>
                  <span className="text-[10px] text-slate-500">7-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features and Specs */}
          {product.features && product.features.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Highlights & Specifications</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
