import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto bg-[#FAF9F6]">
        <div className="w-16 h-16 rounded-xl bg-white border border-[#E7E5E4] text-[#171717] flex items-center justify-center mb-5">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#171717] tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-2">
          Save your favorite footwear, tech gadgets, and wardrobe staples to view anytime.
        </p>
        <Link to="/shop" className="mt-6">
          <Button variant="primary" size="md">
            Explore Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="p-2 rounded-lg bg-white border border-[#E7E5E4] text-[#737373] hover:text-[#171717] transition-colors"
              title="Back to shop"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
              Saved Wishlist ({wishlistCount})
            </h1>
          </div>

          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-[#737373] hover:text-rose-600 transition-colors"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 sm:p-8 space-y-4">
          <div className="divide-y divide-[#E7E5E4]">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="w-20 h-20 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] p-2 shrink-0 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </Link>

                  {/* Title & Price */}
                  <div>
                    <span className="text-[10px] font-semibold text-[#737373] uppercase tracking-wider block">
                      {product.brand}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="block text-sm sm:text-base font-bold text-[#171717] hover:text-black line-clamp-1 transition-colors"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-black text-[#171717]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#737373] line-through">
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
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 sm:flex-none bg-[#171717] hover:bg-black text-white rounded-lg font-bold"
                    onClick={() => handleMoveToCart(product)}
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
                  >
                    Move to Cart
                  </Button>

                  <button
                    onClick={() => {
                      removeFromWishlist(product.id);
                      showToast(`Removed from wishlist`, 'info');
                    }}
                    className="p-2 text-[#737373] hover:text-rose-600 rounded-lg hover:bg-[#FAF9F6] transition-colors"
                    title="Remove item"
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
