import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/formatPrice';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { PRODUCT_FALLBACK_IMAGE } from '../../lib/helpers';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    shippingFee,
    finalTotal,
    totalItemCount,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    const res = applyCoupon(inputCoupon);
    if (res.success) {
      showToast(res.message, 'success');
      setInputCoupon('');
    } else {
      showToast(res.message, 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto bg-[#FAF9F6]">
        <div className="w-16 h-16 rounded-xl bg-white border border-[#E7E5E4] text-[#171717] flex items-center justify-center mb-5">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#171717] tracking-tight">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-2">
          Looks like you haven't added anything to your cart yet. Discover timeless silhouettes and everyday essentials.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/shop">
            <Button variant="primary" size="md">
              Start Shopping
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="outline" size="md">
              View Wishlist
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
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
              Shopping Cart ({totalItemCount})
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-[#737373] hover:text-rose-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (Left) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
            <div className="divide-y divide-[#E7E5E4]">
              {items.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] overflow-hidden shrink-0 flex items-center justify-center p-2"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onError={(e) => {
                        e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-[#737373] uppercase tracking-wider block">
                      {item.product.brand}
                    </span>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-sm font-bold text-[#171717] hover:text-black line-clamp-1 transition-colors"
                    >
                      {item.product.name}
                    </Link>

                    {/* Selected Options */}
                    <div className="flex items-center gap-3 text-xs text-[#737373] mt-1">
                      {item.selectedColor && (
                        <span>Color: <strong className="text-[#171717]">{item.selectedColor}</strong></span>
                      )}
                      {item.selectedSize && (
                        <span>Size: <strong className="text-[#171717]">{item.selectedSize}</strong></span>
                      )}
                    </div>

                    <p className="text-sm font-black text-[#171717] mt-1 sm:hidden">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center border border-[#E7E5E4] rounded-lg bg-[#FAF9F6] p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#171717] hover:bg-white rounded transition-colors"
                      title="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-[#171717]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#171717] hover:bg-white rounded transition-colors"
                      title="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="hidden sm:block text-right min-w-24">
                    <p className="text-sm font-black text-[#171717]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <p className="text-[10px] text-[#737373]">
                      {formatPrice(item.product.price)} each
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      showToast(`Removed from cart`, 'info');
                    }}
                    className="p-2 text-[#737373] hover:text-rose-600 transition-colors rounded-lg hover:bg-[#FAF9F6]"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs text-[#737373]">
              <Link to="/shop" className="font-semibold text-[#171717] hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
              <span>Authenticity guaranteed on all pieces</span>
            </div>
          </div>

          {/* Order Summary Column (Right) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 space-y-5">
              <h3 className="text-base font-bold text-[#171717]">Order Summary</h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg px-3 py-2 text-xs text-[#171717] uppercase tracking-wider focus:outline-none focus:border-[#171717]"
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    Apply
                  </Button>
                </div>

                {couponCode && (
                  <div className="flex items-center justify-between bg-[#FAF9F6] border border-[#E7E5E4] px-3 py-1.5 rounded-lg text-xs">
                    <span className="flex items-center gap-1.5 text-[#171717] font-semibold">
                      <Tag className="w-3.5 h-3.5 text-[#6554D9]" />
                      <span>{couponCode} (-15%)</span>
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[#737373] hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-[#E7E5E4] text-xs">
                <div className="flex justify-between text-[#737373]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#171717]">{formatPrice(subtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#737373]">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-[#171717]">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E7E5E4] flex justify-between text-sm font-black text-[#171717]">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-[#171717] hover:bg-black text-white font-bold rounded-lg"
                onClick={() => navigate('/checkout')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Checkout
              </Button>

              <div className="pt-2 text-center text-[11px] text-[#737373] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6554D9]" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
