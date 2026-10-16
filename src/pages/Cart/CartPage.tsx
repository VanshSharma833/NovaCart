import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/formatPrice';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

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
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 mt-2">
          Looks like you haven't added anything to your cart yet. Explore our latest arrivals and top brands.
        </p>
        <div className="mt-8 flex gap-3">
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="outline" size="lg">
              View Wishlist
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
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
              Your Cart ({totalItemCount})
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (Left) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-6 sm:p-8 space-y-6">
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-100 p-2 shrink-0 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      {item.product.brand}
                    </span>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="block text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>

                    <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedSize && item.selectedColor && <span>•</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>

                    <div className="mt-2 text-base font-extrabold text-slate-900 sm:hidden">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg text-sm font-bold transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg text-sm font-bold transition-colors"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden sm:block text-right min-w-28">
                      <span className="text-base font-black text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-slate-400">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>

                    {/* Trash Delete */}
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        showToast(`Removed ${item.product.name} from cart`);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Column (Right) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Discount ({couponCode})
                    </span>
                    <span className="font-bold">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between text-lg font-black text-slate-900">
                  <span>Total</span>
                  <span className="text-indigo-600 text-xl font-black">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700 mb-2">Have a promo code?</p>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="e.g. NOVA15"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    Apply
                  </Button>
                </form>

                {couponCode && (
                  <div className="mt-2 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <span>Coupon <strong>{couponCode}</strong> applied</span>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-500 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout CTA */}
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold"
                onClick={() => navigate('/checkout')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Checkout
              </Button>

              {/* Security info */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
