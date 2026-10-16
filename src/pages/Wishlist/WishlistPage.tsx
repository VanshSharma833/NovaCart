import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../lib/formatPrice';
import { Button } from '../../components/ui/Button';
import { RatingStars } from '../../components/ui/RatingStars';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showToast(`Moved ${product.name} to cart!`, 'success', 'View Cart', () => setIsCartOpen(true));
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-sm text-slate-500 mt-2">
          Save your favorite sneakers, tech gadgets, and wardrobe staples to view them anytime.
        </p>
        <Link to="/shop" className="mt-8">
          <Button variant="primary" size="lg">
            Explore Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
              title="Back to shop"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Wishlist ({wishlistCount})
            </h1>
          </div>

          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-6 sm:p-8 space-y-4">
          <div className="divide-y divide-slate-100">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 p-2 shrink-0 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>

                  {/* Title & Price */}
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="block text-sm sm:text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-base font-black text-slate-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-1">
                      <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleMoveToCart(product)}
                    leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                  >
                    Move to Cart
                  </Button>

                  <button
                    onClick={() => {
                      removeFromWishlist(product.id);
                      showToast(`Removed from wishlist`);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
