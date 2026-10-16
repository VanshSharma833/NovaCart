import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/formatPrice';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    finalTotal,
    totalItemCount,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-xl border-l border-[#E7E5E4] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#171717]" />
                  <h2 className="text-base font-bold text-[#171717]">
                    Shopping Cart ({totalItemCount})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#FAF9F6] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-14 h-14 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] flex items-center justify-center mb-3">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="text-sm font-bold text-[#171717]">Your cart is empty</h3>
                    <p className="text-xs text-[#737373] mt-1 max-w-xs">
                      Discover our curated collections and everyday essentials.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-5"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                    >
                      Browse Catalog
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3.5 p-3 rounded-lg border border-[#E7E5E4] bg-[#FAF9F6]"
                    >
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-16 h-16 rounded-md bg-white border border-[#E7E5E4] overflow-hidden shrink-0 flex items-center justify-center p-1.5"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-[#171717] hover:text-black line-clamp-1"
                        >
                          {item.product.name}
                        </Link>

                        <div className="text-[11px] text-[#737373] mt-0.5">
                          {item.selectedColor && <span>{item.selectedColor}</span>}
                          {item.selectedColor && item.selectedSize && <span> / </span>}
                          {item.selectedSize && <span>{item.selectedSize}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Counter */}
                          <div className="flex items-center border border-[#E7E5E4] rounded bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#171717] hover:bg-[#FAF9F6]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#171717]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#171717] hover:bg-[#FAF9F6]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[#171717]">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#737373] hover:text-rose-600 p-1"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#E7E5E4] bg-white space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#737373]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#171717]">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#737373]">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-[#171717]">
                        {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-[#171717] pt-2 border-t border-[#E7E5E4]">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full bg-[#171717] hover:bg-black text-white font-bold rounded-lg"
                      onClick={handleCheckout}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Checkout Now
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full border-[#E7E5E4] hover:border-[#171717] rounded-lg"
                      onClick={handleViewCart}
                    >
                      View Cart Details
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
